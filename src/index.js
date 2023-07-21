import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Game from "./Game";
import Game2 from "./Game2";
import Feedback from "./Feedback";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/game",
    element: <Game />,
  },
  {
    path: "/game2",
    element: <Game2 />,
  },
  {
    path: "/feedback",
    element: <Feedback />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
