import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";

const Home = lazy(() => import("./pages/Home"));
const Auth = lazy(() => import("./pages/Auth"));

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
      <Toaster />
    </>
  );
}

export default App;

const Loader = () => {
  return (
    <>
      <div className="flex justify-center items-center py-2 font-bold font-kanit text-3xl">
        Loading...
      </div>
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/auth",
    element: (
      <Suspense fallback={<Loader />}>
        <Auth />
      </Suspense>
    ),
  },
  {
    path: "/u",
    element: (
      <Suspense fallback={<Loader />}>
        <Profile />
      </Suspense>
    ),
  },
]);
