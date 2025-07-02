import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CarrinhoProvider } from "./contexts/CarrinhoContext.tsx";

const container = document.getElementById("root")!;
const root = createRoot(container);

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

root.render(
  <StrictMode>
    <CarrinhoProvider>
      <App />
      <ToastContainer />
    </CarrinhoProvider>
  </StrictMode>
);
