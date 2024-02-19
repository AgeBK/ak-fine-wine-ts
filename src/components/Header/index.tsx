import AutoComplete from "../AutoComplete";
import { Link } from "react-router-dom";
import Nav from "../Nav";
import Img from "../Image";
import Cart from "../Cart";
import styles from "./Header.module.css";

const Header = () => {
  const path = location.hostname;
  console.log(path);

  return (
    <header className={styles.header}>
      <div>The path is: {path}</div>
      <img
        src="./src/assets/img/wine/4267851.jpg"
        style={{ height: "30px", width: "30px" }}
        alt="Moscato 750ml"
      ></img>
      <div className={styles.headerRow}>
        <div className={styles.logo}>
          <Link to="/">
            <Img
              image={"logos/AK.png"}
              imageStyle="logo"
              imageAlt="AK Fine Wines"
            />
          </Link>
          <Img
            image={"wine/12041.jpg"}
            imageStyle="logo"
            imageAlt="AK Fine Wines"
          />
          <Img
            image={"logos/AK.png"}
            imageStyle="logo"
            imageAlt="AK Fine Wines"
          />
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
