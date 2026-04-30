import { createBrowserRouter } from "react-router-dom";
import { Landing } from "../screens/Landing";
import { Login } from "../screens/Login";
import { Register } from "../screens/Register";
import { Dashboard } from "../screens/Dashboard";
import { Modes } from "../screens/Modes";
import { Lobby } from "../screens/Lobby";
import { Game } from "../screens/Game";
import { Results } from "../screens/Results";
import { Leaderboard } from "../screens/Leaderboard";
import { Profile } from "../screens/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/modes",
    Component: Modes,
  },
  {
    path: "/lobby/:id",
    Component: Lobby,
  },
  {
    path: "/game/:id",
    Component: Game,
  },
  {
    path: "/results/:id",
    Component: Results,
  },
  {
    path: "/leaderboard",
    Component: Leaderboard,
  },
  {
    path: "/profile",
    Component: Profile,
  },
]);