import React, { useEffect } from "react";
import style from "./errorPage.module.scss";

export default function ErrorPage({ setShowHeader }) {
  useEffect(() => {
    setShowHeader(false);
    return () => setShowHeader(true);
  }, []);
  return <div className={style.error}>Такой страницы нет</div>;
}
