
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InputPage from "./pages/InputPage.jsx";
import DocumentPage from "./pages/DocumentPage.jsx";
import MyDeal from "./pages/MyDeal.jsx";
import AddressLookup from "./utils/AddressLookup.jsx";
import Navbar from "./pages/Navbar.jsx"
import Calender from "./components/Calendar";
import rootReducer from "./slices";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import UiModal from "./pages/UiModel.jsx";

const store = configureStore({ reducer: rootReducer, devTools: true });

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<InputPage/>} />
        <Route path="/input-page" element={<InputPage />} />
        <Route path="/MyDeal" element={<MyDeal />} />
        <Route path="/document" element={<DocumentPage />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/addresslookup" element={<AddressLookup />} />
        <Route path="/uimodal" element={<UiModal />} />
      </Routes>
    </Router>
    </Provider>
);
