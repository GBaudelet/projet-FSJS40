import useCheckAuth from "./Hook/useCheckAuth";
import AdminRouter from "./router/AdminRouter";
import UserRouter from "./router/userRouter";
import "./assets/scss/app.css";
function App() {
  const [user] = useCheckAuth();

  if (user.role_id === 1) {
    return <AdminRouter />;
  } else return <UserRouter />;
}

export default App;
