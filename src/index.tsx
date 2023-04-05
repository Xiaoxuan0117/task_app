import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store";
import { Provider } from "react-redux";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./routes/Home";
import Login from "./routes/Login";
import TaskDetail from "./routes/TaskDetail";
import Error from "./routes/Error";
import AddModal from "./components/molecule/AddModal";
import EditModal from "./components/molecule/EditModal";
import Instructions from "./components/organisms/Instructions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        path: "add",
        element: <AddModal />,
      },
      {
        path: "instructions",
        element: <Instructions />,
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
      {
        path: "instructions",
        element: <Instructions />,
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
      {
        path: "instructions",
        element: <Instructions />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

reportWebVitals();
