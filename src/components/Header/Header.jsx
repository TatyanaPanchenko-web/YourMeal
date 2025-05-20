import style from "./header.module.scss";
import logo from "../../assets/header/logo.svg";

export default function Header() {
  return (
    <header className={style.header}>
      <div className={style["header-container"]}>
        <div className={style["header-logo"]}>
          <img src={logo} alt="logo" />
        </div>
      </div>
    </header>
  );
}
