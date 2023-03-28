import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import App from "./pages/App";
import Hub from "./pages/Hub";
import Calendar from "./pages/Calendar";
import QuoteCalulator from "./pages/QuoteCalulator";
import "./index.css";




ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/hub" element={<Hub />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/Quote" element={<QuoteCalulator />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
