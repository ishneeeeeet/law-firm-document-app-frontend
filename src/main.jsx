
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InputPage from "./pages/InputPage.jsx";
import DocumentPage from "./pages/DocumentPage.jsx";
import MyDeal from "./pages/MyDeal.jsx";
import AddressLookup from "./utils/AddressLookup.jsx";
import Navbar from "./pages/Navbar.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<InputPage/>} />
        <Route path="/input-page" element={<InputPage />} />
        <Route path="/MyDeal" element={<MyDeal />} />
        <Route path="/document" element={<DocumentPage />} />
        <Route path="/addresslookup" element={<AddressLookup />} />
      </Routes>
    </Router>
);
