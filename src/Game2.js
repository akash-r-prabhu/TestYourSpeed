import React, { useState, useEffect } from "react";
import "./Game.css";
import db from "./firebase";

const directions = ["right", "left", "straight"];
const directionArrow = ["→", "←", "↑"];
const Game2 = () => {
  const [backgroundColor, setBackgroundColor] = useState("");
  const [jsonData, setJsonData] = useState([]);
  const [answerResult, setAnswerResult] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [arrowChange, setArrowChange] = useState("");
  // start time in seconds

  const [total, setTotal] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [startTime, setStartTime] = useState(0);
  const [averageTime, setAverageTime] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      // if not gameover
      if (!gameEnded) {
        const randomdir =
          directions[Math.floor(Math.random() * directions.length)];
        const arrow = directionArrow[directions.indexOf(randomdir)];
        setArrowChange(arrow);
        setBackgroundColor(randomdir);
        setTotal((prev) => prev + 1);
        setStartTime(new Date().getTime());
      }
    }, 2000);

    setTimeout(() => {
      setGameEnded(true);
      clearInterval(interval);
      console.log(jsonData);
    }, 30000);

    return () => clearInterval(interval);
  }, [jsonData]);

  const handleDirectionClick = (direction) => {
    const input = {
      direction,
      correct: backgroundColor === direction,
      time: new Date().getTime() - startTime,
    };

    setJsonData((prevData) => [...prevData, input]);
    setAnswerResult(input.correct ? "Correct" : "Wrong");
    if (!gameEnded) {
      const randomdir =
        directions[Math.floor(Math.random() * directions.length)];
      const arrow = directionArrow[directions.indexOf(randomdir)];
      setArrowChange(arrow);
      setBackgroundColor(randomdir);
      setTotal((prev) => prev + 1);
      setStartTime(new Date().getTime());
    }
  };
  const [timeArray, setTimeArray] = useState([]);
  useEffect(() => {
    jsonData.forEach((data) => {
      setTimeArray((prevData) => [...prevData, data.time]);
      if (data.correct) {
        setCorrect((prev) => prev + 1);
        // remove the data
        setJsonData((prevData) => prevData.filter((item) => item !== data));
      } else {
        setWrong((prev) => prev + 1);
        setJsonData((prevData) => prevData.filter((item) => item !== data));
      }
    });
  }, [jsonData]);
  useEffect(() => {
    if (correct > 0 || wrong > 0) {
      db.collection("monocolor").add({
        timestamp: new Date().getTime(),
        correct: correct,
        wrong: wrong,
        averageTime: timeArray.reduce((a, b) => a + b, 0) / timeArray.length,
      });
    }
  }, [gameEnded]);

  return (
    <div className="container">
      <h1>Direction Game</h1>

      {gameEnded ? (
        <div className="result-container">
          <h2>Game Result</h2>
          <p>
            {/* <h3>Score = {correct / total} %</h3> */}
            <br />
            Correct: {correct} <br />
            Wrong: {wrong}
            <h3>
              {" "}
              Average time ={" "}
              {timeArray.reduce((a, b) => a + b, 0) / timeArray.length} ms
            </h3>
          </p>
          <button onClick={() => window.location.href="/game"}>
         Play again
          </button>
          <p>
            Please share your feedback <a href="/feedback">here </a>
          </p>
        </div>
      ) : (
        <>
          <div className="arrow-container">
            <div
              className="arrow"
              onClick={() => handleDirectionClick("left")}
              //   style={{ color: backgroundColor === "left" ? "white" : "black" }}
            >
              &#8592;
            </div>
            <div
              className="arrow"
              onClick={() => handleDirectionClick("straight")}
              //   style={{
              //     color: backgroundColor === "straight" ? "white" : "black",
              //   }}
            >
              &#8593;
            </div>
            <div
              className="arrow"
              onClick={() => handleDirectionClick("right")}
              //   style={{ color: backgroundColor === "right" ? "black" : "white" }}
            >
              &#8594;
            </div>
          </div>

          <div id="screen">{arrowChange}</div>
        </>
      )}
    </div>
  );
};

export default Game2;
