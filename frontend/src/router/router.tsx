import { createBrowserRouter } from "react-router-dom";
import { Home } from "../components/home";
import { Auth } from "../components/auth";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/auth",
		element: <Auth />,
	},
]);
