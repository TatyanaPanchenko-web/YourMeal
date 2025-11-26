import { createRoot, Root } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App/App";
import "./style/index.scss";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root: Root = createRoot(rootElement);
  root.render(  <BrowserRouter>
    <App />
  </BrowserRouter>)
}
else {
  console.error("Элемент с ID 'root' не найден");
}
