import  { useEffect } from "react";
import { Link } from "react-router-dom";
import Registration from "../../components/Registration/Registration";
import SuccessRegistration from "../../components/SuccessRegistration/SuccessRegistration";
import style from "./registrationPage.module.scss";

export default function RegistrationPage({
  setShowHeader,
  regdata,
  setRegdata,
}) {
  useEffect(() => {
    setShowHeader(false);
    return () => setShowHeader(true);
  }, []);

  return (
    <>
      {!regdata.status ? (
        <div className={style.registration}>
          <Registration setRegdata={setRegdata} />
          <Link to="/authorization" className="link underline">
            Авторизация
          </Link>
        </div>
      ) : (
        <div className={style.registration}>
          <SuccessRegistration regdata={regdata} />
          <Link to="/authorization" className="link">
            Авторизация
          </Link>
        </div>
      )}
    </>
  );
}
