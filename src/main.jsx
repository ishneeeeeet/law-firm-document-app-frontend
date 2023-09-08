import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InputPage from "./pages/InputPage.jsx";
import DocumentPage from "./pages/DocumentPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/input-page" element={<InputPage />} />
        <Route path="/document" element={<DocumentPage />} />
      </Routes>
    </Router>
  
);
