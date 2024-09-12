import { Route, Routes } from "react-router-dom";

import Header from "./Components/Partial/Header";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Footer from "./Components/Partial/Footer";
import Admin from "./Components/Admin";
import "./assets/scss/app.css";
import Drag from "./Components/Drag";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/drag" element={<Drag />} />
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
