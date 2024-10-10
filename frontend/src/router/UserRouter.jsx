import { Routes, Route } from "react-router-dom";

import Header from "../Components/Partial/Header";
import Home from "../Components/Home";
import Login from "../Components/Login";
import Register from "../Components/Register";
import Footer from "../Components/Partial/Footer";
import Drag from "../Components/Drag";
import Bible from "../Components/Bible";
import Sheet from "../Components/sheet/Sheet";
import Profil from "../Components/Profil";
import ProtectedRoute from "../HOC/ProtectedRoute";

function UserRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drag" element={<Drag />} />
        <Route path="/bible" element={<Bible />} />

        <Route
          path="/profil"
          element={<ProtectedRoute element={<Profil />} allowedRoles={[2]} />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sheet" element={<Sheet />} allowedRoles={[2]} />

        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default UserRouter;
