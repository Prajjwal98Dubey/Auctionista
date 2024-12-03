import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import './App.css'
function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);
