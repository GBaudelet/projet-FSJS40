import { Routes, Route } from "react-router-dom";
import Dashboard from "../Components/Admin";
import Header from "../Components/Partial/Header";
import Footer from "../Components/Partial/Footer";
import Home from "../Components/Home";
import Drag from "../Components/Drag";
import Bible from "../Components/Bible";
import Sheet from "../Components/sheet/Sheet";

function AdminRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drag" element={<Drag />} />
        <Route path="/bible" element={<Bible />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="sheet" element={<Sheet />} />

        <Route path="*" element={<p>NOT FOUND</p>} />
      </Routes>
      <Footer />
    </>
  );
}

export default AdminRouter;
