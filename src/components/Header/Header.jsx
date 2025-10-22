import { Link } from "react-router-dom";
import logo from "../../assets/header/logo.svg";
import style from "./header.module.scss";

export default function Header() {
  return (
    <header className={style.header}>
      <div className={style["header-container"]}>
        <div className={style["header-logo"]}>
          <Link to="/" className="link">
            <img src={logo} alt="logo" />
          </Link>
        </div>
      </div>
    </header>
  );
}
