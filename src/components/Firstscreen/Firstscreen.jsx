import style from "./firstscreen.module.scss";
import firstscreenImg from "../../assets/firstscreen/firstscreenImg.png";
export default function Firstscreen() {
  return (
    <div className={style["firstscreen"]}>
      <div className={style["firstscreen-bg"]}></div>
      <div className={style["firstscreen-container"]}>
        <div className={style["firstscreen-wrapper"]}>
          <div className={style["firstscreen-img"]}>
            <img src={firstscreenImg} alt="firstscreen-burger" />
          </div>
          <div className={style["firstscreen-about"]}>
            <div className={style["firstscreen-title"]}>
              Только самые<span>сочные бургеры!</span>
            </div>
            <div className={style["firstscreen-subtitle"]}>
              Бесплатная доставка от 599₽
            </div>
            {/* <button className={style["firstscreen-btn"]}>Добавить</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
