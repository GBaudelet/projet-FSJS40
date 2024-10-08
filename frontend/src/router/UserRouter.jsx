import { Routes, Route } from "react-router-dom";

import Header from "../Components/Partial/Header";
import Home from "../Components/Home";
import Login from "../Components/Login";
import Register from "../Components/Register";
import ProtectedRoute from "../HOC/ProtectedRoute";
import Footer from "../Components/Partial/Footer";
import Drag from "../Components/Drag";
import Bible from "../Components/Bible";
import Dashboard from "../Components/Admin";
import Sheet from "../Components/sheet/Sheet";

function UserRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drag" element={<Drag />} />
        <Route path="/bible" element={<Bible />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="sheet" element={<Sheet />} />
        <Route
          path="dashboard"
          element={<ProtectedRoute element={Dashboard} />}
        />

        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default UserRouter;
