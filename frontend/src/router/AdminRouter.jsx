import { Routes, Route } from "react-router-dom";
import Dashboard from "../Components/Admin";
import Header from "../Components/Partial/Header";
import Footer from "../Components/Partial/Footer";
import Home from "../Components/Home";
import Drag from "../Components/Drag";
import Bible from "../Components/Bible";
import Sheet from "../Components/sheet/Sheet";
import ProtectedRoute from "../HOC/ProtectedRoute";

function AdminRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drag" element={<Drag />} allowedRoles={[1]} />
        <Route path="/bible" element={<Bible />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute element={<Dashboard />} allowedRoles={[1]} />
          }
        />
        <Route path="/sheet" element={<Sheet />} allowedRoles={[1]} />

        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default AdminRouter;
