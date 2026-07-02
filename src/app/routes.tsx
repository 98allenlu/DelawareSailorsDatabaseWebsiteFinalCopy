import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { AdvancedSearch } from "./components/AdvancedSearch";
import { SailorProfile } from "./components/SailorProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "search", Component: AdvancedSearch },
      { path: "sailor/:id", Component: SailorProfile },
    ],
  },
]);