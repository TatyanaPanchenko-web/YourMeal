import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Autorization from "../../components/Autorization/Autorization";
import style from "./authorizationPage.module.scss";

export default function AuthorizationPage({ setShowHeader, dataAuth, setRegdata }) {
  useEffect(() => {
    setShowHeader(false);
    return () => setShowHeader(true);
  }, []);

  return (
    <div className={style.autorization}>
      <Autorization dataAuth={dataAuth} setRegdata={setRegdata} />
      <Link to="/registration" className="link underline">
        Регистрация
      </Link>
    </div>
  );
}
