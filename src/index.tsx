import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store";
import { Provider } from "react-redux";
import axios from "axios";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./routes/Home";
import Login from "./routes/Login";
import TaskDetail from "./routes/TaskDetail";
import AddModal from "./components/molecule/AddModal";
import EditModal from "./components/molecule/EditModal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "add",
        element: <AddModal />,
      },
    ],
  },
  {
    path: "/:repoOwner/:repoName",
    element: <Home />,
    children: [
      {
        path: "add",
        element: <AddModal />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/:repoOwner/:repoName/:number",
    element: <TaskDetail />,
    children: [
      {
        path: "edit",
        element: <EditModal />,
      },
    ],
  },
]);

if (process.env.REACT_APP_API === "prod") {
  axios.defaults.baseURL = "https://taskapp-pbqx.onrender.com";
} else {
  axios.defaults.baseURL = "http://127.0.0.1:5000";
}
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
