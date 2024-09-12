import "../assets/scss/home.css";
import DropdownMenu from "./Partial/Menu";
import { Link } from "react-router-dom";
import myImage from "../assets/images/404.png";

const Home = () => {
  return (
    <main>
      <section className="bloc">
        <DropdownMenu />
      </section>
      <section className="sheet">
        <div>
          <p>
            <Link to={"/drag"}>
              <p>drag</p>
            </Link>
            <img src={myImage} alt="" />
          </p>
        </div>
      </section>
      <section className="css">
        <ul>
          <li>1er bloc</li>
          <li>2eme bloc</li>
          <li>3eme bloc</li>
          <li>4eme bloc</li>
        </ul>
      </section>
    </main>
  );
};

export default Home;
