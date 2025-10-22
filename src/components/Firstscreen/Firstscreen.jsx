import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getData } from "../../services/FB";
import firstscreenImg from "../../assets/firstscreen/firstscreenImg.png";
import iconUser from "../../assets/icons/user.svg";
import style from "./firstscreen.module.scss";

export default function Firstscreen() {
  const [userInfo, setUserInfo] = useState(null);
  const [isOpenInfo, setIsOpenInfo] = useState(false);

  const auth = getAuth();
  const ref = useRef(null);

  useEffect(() => {
    const listenUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        const getUserFromBD = getData(`users/${user.uid}`);
        getUserFromBD.then((result) => setUserInfo(result));
      } else {
        setUserInfo(null);
      }
    });
    document.addEventListener("click", handleClick);
    return () => {
      listenUser();
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsOpenInfo(false);
    }
  };
  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        setUserInfo(null);
           })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className={style["firstscreen"]}>
      <div className={style["firstscreen-bg"]}></div>
      <div className={style["firstscreen-container"]}>
        <div ref={ref} className={style["firstscreen-login"]}>
          {userInfo ? (
            <>
              <img
                onClick={() => setIsOpenInfo((prev) => !prev)}
                src={iconUser}
                className={style["firstscreen-login-icon"]}
                alt="user"
              />
              {isOpenInfo && (
                <div className={style["firstscreen-login-inner"]}>
                  <div className={style["firstscreen-login-info"]}>
                    <div>
                      <b>Имя: </b>
                      {userInfo.name}
                    </div>
                    <div>
                      <b>Email:</b> {userInfo.email}
                    </div>
                  </div>

                  <div
                    onClick={userSignOut}
                    className={style["firstscreen-signout-btn"]}
                  >
                    Выход
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className={style["firstscreen-signin-btn"]}>
              <Link to="/authorization" className="link">
                Авторизация
              </Link>
            </div>
          )}
        </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
