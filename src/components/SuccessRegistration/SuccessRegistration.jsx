import React from "react";
import style from "./successRegistration.module.scss";

export default function SuccessRegistration({ regdata }) {
  return (
    <>
      {!regdata ? (
        <div className={style.loading}>Loading...</div>
      ) : (
        <div>
          <div className={style.title}>Регистрация прошла успешно</div>
        </div>
      )}
    </>
  );
}
