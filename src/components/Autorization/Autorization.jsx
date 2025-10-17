import style from "./autorization.module.scss";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import firebase from "firebase/compat/app";

export default function Autorization({ dataAuth }) {
  const [errBase, setErrBase] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const auth = getAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    signInWithEmailAndPassword(auth, data.mail, data.password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error.message);
        setErrBase(true);
      });
  };
  const loginGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        navigate("/");
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div className={style.autorization}>
      <div className={style["autorization-wrapper"]}>
        <div className={style["autorization-title"]}>Авторизация</div>
        <form
          className={style["autorization-form"]}
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            placeholder="E-mail"
            {...register("mail", {
              required: "Необходимо заполнить данное поле",
              value: `${dataAuth.mail ? dataAuth.mail : ""}`,
              pattern: {
                value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                message: "Поле содержит недопустимые символы",
              },
            })}
          />
          {errors.mail && (
            <p className={style.errorField}>{errors.mail?.message}</p>
          )}
          <input
            placeholder="Пароль"
            type="password"
            {...register("password", {
              required: "Необходимо заполнить данное поле",
              // value: `${dataAuth.password}`,
              value: `${dataAuth.password ? dataAuth.password : ""}`,
              minLength: {
                value: 6,
                message: "Поле должно содержать не менее 6 символов",
              },
            })}
          />
          {errors.password && (
            <p className={style.errorField}>{errors.password?.message}</p>
          )}
          {errBase && (
            <div className={style.errorField}>Неверный e-mail или пароль</div>
          )}

          <input type="submit" value="Войти" />
        </form>
        <div onClick={loginGoogle} className={style["autorization-google"]}>
          <img src="src/assets/icons/google.png" alt="google" />
        </div>
      </div>
    </div>
  );
}
