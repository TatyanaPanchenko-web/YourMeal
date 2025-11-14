import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getData } from "../../services/FB";
import logo from "../../assets/icons/logo.svg";
import iconUser from "../../assets/icons/user.svg";
import style from "./header.module.scss";

export default function Header() {
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
        console.error(error);
      });
  };
  return (
    <header className={style.header}>
      <div className={style["header-container"]}>
        <Link to="/" className={style["header-logo"]}>
          <img src={logo} alt="logo" />
        </Link>
        <div ref={ref} className={style["header-login"]}>
          {userInfo ? (
            <>
              <img
                onClick={() => setIsOpenInfo((prev) => !prev)}
                src={iconUser}
                className={style["header-login-icon"]}
                alt="user"
              />
              {isOpenInfo && (
                <div className={style["header-login-inner"]}>
                  <div className={style["header-login-info"]}>
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
                    className={style["header-signout-btn"]}
                  >
                    Выход
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className={style["header-signin-btn"]}>
              <Link to="/authorization" className="link">
                Авторизация
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
