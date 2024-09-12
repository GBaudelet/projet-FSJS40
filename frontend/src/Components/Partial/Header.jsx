import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <p>c'est le header</p>
      <nav>
        <Link to={"/"}>
          <p>Home</p>
        </Link>
        <Link to={"/login"}>
          <p>Login</p>
        </Link>
        <Link to={"/register"}>
          <p>Register</p>
        </Link>
        <Link to={"/admin"}>
          <p>Admin</p>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
