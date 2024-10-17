import useCheckAuth from "./Hook/useCheckAuth";
import "./assets/scss/all.css";
import Header from "./Components/Partial/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Bible from "./Components/Bible";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Footer from "./Components/Partial/Footer";
import UserRouter from "./router/UserRouter";

function App() {
  const [user] = useCheckAuth();

  if (user.role_id === 1 || user.role_id === 2) {
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
