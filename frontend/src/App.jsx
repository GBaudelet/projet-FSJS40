import useCheckAuth from "./Hook/useCheckAuth";
import AdminRouter from "./router/AdminRouter";
import UserRouter from "./router/userRouter";
import "./assets/scss/app.css";
import Header from "./Components/Partial/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Bible from "./Components/Bible";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Footer from "./Components/Partial/Footer";
function App() {
  const [user] = useCheckAuth();

  if (user.role_id === 1) {
    return <AdminRouter />;
  }
  if (user.role_id === 2) {
    return <UserRouter />;
  } else {
    return (
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bible" element={<Bible />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="*" element={<h1>404 - Not Found</h1>} />
        </Routes>
        <Footer />
      </>
    );
  }
}

export default App;
