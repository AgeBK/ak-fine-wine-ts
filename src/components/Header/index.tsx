import AutoComplete from "../AutoComplete";
import { Link } from "react-router-dom";
import Nav from "../Nav";
import Img from "../Image";
import Cart from "../Cart";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerRow}>
        <img
          src="./AK.png"
          alt="test"
          style={{ height: "30px", width: "30px" }}
        />
        <img
          src="/AK.png"
          alt="test2"
          style={{ height: "30px", width: "30px" }}
        />
        <img
          src="./src/assets/img/logos/AK.png"
          alt="test3"
          style={{ height: "30px", width: "30px" }}
        />

        <div className={styles.logo}>
          <Link to="/">
            <Img
              image={"logos/AK.png"}
              imageStyle="logo"
              imageAlt="AK Fine Wines"
            />
          </Link>
        </div>
        <h1 className={styles.hdr}>
          AK <span>FINE WINES</span>
        </h1>
        <AutoComplete />
        <div className={styles.cartCont}>
          <Cart />
        </div>
      </div>
      <Nav />
    </header>
  );
};

export default Header;
