import { useEffect } from "react";
import style from "./errorPage.module.scss";

export default function ErrorPage({ setShowHeader }) {
  useEffect(() => {
    setShowHeader(false);
    return () => setShowHeader(true);
  }, []);
  return (
    <div className={style.error}>
      <div className={style["error-title"]}> Такой страницы нет</div>

      <div className={style["error-img"]}>
        <img src="/src/assets/icons/pizza.png" alt="pizza"></img>
      </div>
    </div>
  );
}
