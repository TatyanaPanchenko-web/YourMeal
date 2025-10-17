import React from "react";
import style from "./successRegistration.module.scss";

export default function SuccessRegistration({ regdata }) {
  return (
    <>
      {!regdata ? (
        <div className={style.loading}>Loading...</div>
      ) : (
        <div className={style["registration-info"]}>
         Регистрация прошла успешно
        </div>
      )}
    </>
  );
}
