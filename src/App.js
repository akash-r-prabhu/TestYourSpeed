import React, { useState, useEffect } from "react";
// import react router navigate button
import { redirect } from "react-router-dom";

const App = () => {
  return (
    <>
      <div className="container">
        <h1>Direction Game Instructions</h1>
        {/* table with color and direction as columns */}
        {/* red is right, white is straight, green is left */}
        <table>
          <thead>
            <tr>
              <th>Color</th>
              <th>Direction</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Red</td>
              <td>Right</td>
            </tr>
            <tr>
              <td>White</td>
              <td>Straight</td>
            </tr>
            <tr>
              <td>Green</td>
              <td>Left</td>
            </tr>
          </tbody>
        </table>

        <ul>
          <li>Click the corresponding direction according to the color</li>
          <li>For each correct answer, you will get a point</li>
          <li>Game will end after 30 seconds</li>
        </ul>

        <button>
          <a href="/game">Start Game</a>
        </button>
      </div>
    </>
  );
};

export default App;
