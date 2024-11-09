import { createBrowserRouter } from "react-router-dom";
import { Home } from "../components/home";
import { Auth } from "../components/auth";
import { Book } from "../components/book";
import { Author } from "../components/author";
import { Users } from "../components/users";
import { User } from "../components/user";

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
	{
		path: "/author/:id",
		element: <Author />,
	},
	{
		path: "/users",
		element: <Users />,
	},
	{
		path: "/user/:id",
		element: <User />,
	},
]);
