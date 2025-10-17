import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import firstscreenImg from "../../assets/firstscreen/firstscreenImg.png";
import iconUser from "../../assets/icons/user.svg";
import style from "./firstscreen.module.scss";

export default function Firstscreen() {
  const [user, setUser] = useState(null);
  const [isOpenInfo, setIsOpenInfo] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    const listenUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        navigate("/authorization");
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
        navigate("/authorization");
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
          {user && (
            <>
              <img
                onClick={() => setIsOpenInfo((prev) => !prev)}
                src={iconUser}
                className={style["firstscreen-login-icon"]}
                alt="user"
              />
              {isOpenInfo && (
                <div className={style["firstscreen-login-inner"]}>
                  {user.email}
                  <div
                    onClick={userSignOut}
                    className={style["firstscreen-login-btn"]}
                  >
                    Выход
                  </div>
                </div>
              )}
            </>
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
