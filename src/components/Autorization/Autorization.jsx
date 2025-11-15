import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
 } from "firebase/auth";
import { addRegData } from "../../services/FB";
import iconGoogle from "../../assets/icons/google.png";
import style from "./autorization.module.scss";

export default function Autorization({ dataAuth, setRegdata }) {
  const [errAuth, setErrAuth] = useState({
    status: false,
    message: "",
  });
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
        setErrAuth({ status: true, message: "Неверный e-mail или пароль" });
      });
  };

  const loginGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        addRegData(user);
        setRegdata({ data: user, status: true });

        navigate("/");
      })
      .catch((error) => {
        console.error(error.message);
        setErrAuth({ status: true, message: "Ошибка авторизации Google" });
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
          {errAuth.status && (
            <div className={`${style.errorField} ${style.auth}`}>{errAuth.message}</div>
          )}
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

          <input type="submit" value="Войти" />
        </form>
        <div onClick={loginGoogle} className={style["autorization-google"]}>
          <img src={iconGoogle} alt="google" title="Войти с помощью Google" />
        </div>
      </div>
    </div>
  );
}
