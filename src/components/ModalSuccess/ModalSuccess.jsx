import style from "./modalSuccess.module.scss";

export default function modalSuccess({ setSubmittedSuccess }) {
  return (
    <div>
      <div
        className={style.modal}
        onClick={() => {
          setSubmittedSuccess(false);
        }}
      >
        <div
          className={style["modal-container"]}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={style["modal-close"]}
            onClick={() => {
              setSubmittedSuccess(false);
            }}
          ></div>
          <div className={style["modal-title"]}>Спасибо!</div>
          <div className={style["modal-inner"]}>
            <div>Ваш заказ оформлен</div>
          </div>
        </div>
      </div>
    </div>
  );
}
