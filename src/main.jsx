import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import { ThemeProvider, LanguageProvider } from "./utils/contexts";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <PrimeReactProvider>
          <App />
        </PrimeReactProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>
);