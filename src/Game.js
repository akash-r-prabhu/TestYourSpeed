import React, { useState, useEffect } from "react";
import "./Game.css";
import db from "./firebase";

const colors = ["red", "green", "white"];
const directions = ["right", "left", "straight"];
const directionArrow = ["→", "←", "↑"];
const Game = () => {
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [jsonData, setJsonData] = useState([]);
  const [answerResult, setAnswerResult] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  // start time in seconds

  const [total, setTotal] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [startTime, setStartTime] = useState(0);
  const [averageTime, setAverageTime] = useState(0);
  const [arrowChange, setArrowChange] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      // if not gameover
      if (!gameEnded) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setArrowChange(directionArrow[colors.indexOf(randomColor)]);
        setBackgroundColor(randomColor);
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
    const correctColor = colors[directions.indexOf(direction)];

    const input = {
      direction,
      correct: backgroundColor === correctColor,
      time: new Date().getTime() - startTime,
    };

    setJsonData((prevData) => [...prevData, input]);
    setAnswerResult(input.correct ? "Correct" : "Wrong");
    if (!gameEnded) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setArrowChange(directionArrow[colors.indexOf(randomColor)]);
      setBackgroundColor(randomColor);
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
      db.collection("data").add({
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
          {/* level2 */}
          <button onClick={() => window.location.href="/game2"}>
            Level 2
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
              // style={{ color: backgroundColor === "red" ? "white" : "black" }}
            >
              &#8592;
            </div>
            <div
              className="arrow"
              onClick={() => handleDirectionClick("straight")}
              // style={{ color: backgroundColor === "green" ? "white" : "black" }}
            >
              &#8593;
            </div>
            <div
              className="arrow"
              onClick={() => handleDirectionClick("right")}
              // style={{ color: backgroundColor === "white" ? "black" : "white" }}
            >
              &#8594;
            </div>
          </div>

          <div
            id="screen"
            style={{
              backgroundColor,
              color: answerResult === "Correct" ? "green" : "red",
            }}
          >
            {/* if (arrowChange === "left") {
                &#8592;
              } */}
            {/* {arrowChange === "green" && (
              <div className="arrowInScreen">&#8592; </div>
            )}
            {arrowChange === "white" && (
              <div className="arrowInScreen">&#8593;</div>
            )}
            {arrowChange === "red" && (
              
            )} */}
            <div className="arrowInScreen">{arrowChange}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
