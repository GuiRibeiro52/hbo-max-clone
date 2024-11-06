import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Home from "./Pages/Home.tsx";
import MovieDetail from "./Pages/MovieDetail.tsx";
import SerieDetail from "./Pages/SerieDetail.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movie/:id",
        element: <MovieDetail />,
      },
      {
        path: "/serie/:id",
        element: <SerieDetail />,
      },
    ],
  },
]);
