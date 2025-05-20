import style from "./footer.module.scss";
import footerLogo from "../../assets/footer/footer-logo.svg";
import telegram from "../../assets/footer/telegram.png";
import vk from "../../assets/footer/vk.png";
import Registration from "../Registration/Registration";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style["footer-container"]}>
        <div className={style["footer-wrapper"]}>
          <div className={style["footer-logo"]}>
            <img src={footerLogo} alt="footerLogo" />
          </div>
          <div className={style["footer-inner"]}>
            <div className={style["footer-phone"]}>
              <div className={style["footer-title"]}>Номер для заказа</div>
              <div className={style["footer-content"]}>+7(930)833-38-11</div>
            </div>
            <div className={style["footer-social"]}>
              <div className={style["footer-title"]}>Мы в соцсетях</div>
              <div className={style["footer-content"]}>
                <img src={telegram} alt="telegram" />
                <img src={vk} alt="telegvkram" />
              </div>
            </div>
          </div>
        </div>
        <div className={style["footer-bottom"]}>
          <div>© YouMeal, 2022</div>
          <div>Design: Anastasia Ilina</div>
        </div>
      </div>
    </footer>
  );
}
