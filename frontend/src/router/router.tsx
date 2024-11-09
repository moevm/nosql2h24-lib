import { createBrowserRouter } from "react-router-dom";
import { Home } from "../components/home";
import { Auth } from "../components/auth";
import { Book } from "../components/book";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/auth",
		element: <Auth />,
	},
	{
		path: "/registration",
		element: <Home />,
	},
	{
		path: "/book/:id",
		element: <Book />,
	},
]);
