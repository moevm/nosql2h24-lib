import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./router/router.tsx";
import { RouterProvider } from "react-router";
import { Provider } from "./components/ui/provider.tsx";
import "./style.css";
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
