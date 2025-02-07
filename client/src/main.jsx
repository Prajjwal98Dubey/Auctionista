import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserInfoContextProvider from "./context/userInfoContextProvider.jsx";
import ProductContextProvider from "./context/ProductContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <UserInfoContextProvider>
    <ProductContextProvider>
      <App />
    </ProductContextProvider>
  </UserInfoContextProvider>
);
