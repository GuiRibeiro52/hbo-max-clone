import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Home from "./Pages/Home.tsx";
import MovieDetail from "./Pages/MovieDetail.tsx";
import SerieDetail from "./Pages/SerieDetail.tsx";
import SeasonEpisodes from "./Pages/SeasonEpisodes.tsx";
import Movies from "./Pages/Movies.tsx";
import Series from "./Pages/Series.tsx"; 
import GenrePage from "./Pages/GenrePage.tsx";

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
      {
        path: "/serie/:id/season/:seasonNumber",
        element: <SeasonEpisodes />,
      },
      {
        path: "/movies",
        element: <Movies />, 
      },
      {
        path: "/series",
        element: <Series />, 
      },
      {
        path: "/genre/:genreName",
        element: <GenrePage />, 
      },
    ],
  },
]);
