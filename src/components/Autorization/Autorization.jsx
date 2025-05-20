import style from "./autorization.module.scss";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
      </div>
    </div>
  );
}
