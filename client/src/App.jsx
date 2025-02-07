import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Bid from "./pages/Bid";
import DemoLogin from "./pages/DemoLogin";
import AddProduct from "./pages/AddProduct";
import SingleProductDisplay from "./pages/SingleProductDisplay";
import Profile from "./pages/Profile";
function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/bid",
    element: <Bid />,
  },
  {
    path: "/login",
    element: <DemoLogin />,
  },
  {
    path: "/add",
    element: <AddProduct />,
  },
  {
    path: "/product",
    element: <SingleProductDisplay />,
  },
  {
    path: "/me",
    element: <Profile />,
  },
]);
