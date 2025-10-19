import style from "./registration.module.scss";

import { useForm, Controller } from "react-hook-form";
import { Checkbox } from "antd";
import { addRegData } from "../../services/FB";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Registration({ setRegdata }) {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      checkbox: false,
    },
  });

  const auth = getAuth();
  const onSubmit = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;

        addRegData(data, user.uid);
        setRegdata({ data: data, status: true });
      })
      .catch((error) => {
        console.error(error);
      });
    reset();
  };

  return (
    <div className={style["registration-wrapper"]}>
      <div className={style["registration-title"]}>Регистрация</div>
      <form
        className={style["registration-form"]}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={style["registration-inner"]}>
          <input
            placeholder="Имя"
            {...register("name", {
              required: "Необходимо заполнить данное поле",
              maxLength: 30,
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Поле содержит недопустимые символы",
              },
            })}
          />
          {errors.name && (
            <p className={style.errorField}>{errors.name?.message}</p>
          )}

          <input
            placeholder="E-mail"
            {...register("email", {
              required: "Необходимо заполнить данное поле",
              pattern: {
                value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                message: "Поле содержит недопустимые символы",
              },
            })}
          />
          {errors.email && (
            <p className={style.errorField}>{errors.email?.message}</p>
          )}

          <label className={style["registration-date"]}>
            <p> Дата рождения</p>

            <input
              placeholder="Дата рождения"
              type="date"
              {...register("date", {
                required: "Необходимо заполнить данное поле",
              })}
            />
            {errors.date && (
              <p className={style.errorField}>{errors.date?.message}</p>
            )}
          </label>

          <input
            placeholder="Пароль"
            type="password"
            {...register("password", {
              required: "Необходимо заполнить данное поле",
              minLength: {
                value: 6,
                message: "Поле должно содержать не менее 6 символов",
              },
            })}
          />
          {errors.password && (
            <p className={style.errorField}>{errors.password?.message}</p>
          )}
          <input
            placeholder="Подтверждение пароля"
            type="password"
            {...register("confirmPassword", {
              required: "Необходимо заполнить данное поле",
              minLength: {
                value: 6,
                message: "Поле должно содержать не менее 6 символов",
              },
              validate: (value) => {
                const { password } = getValues();
                return password === value || "Пароли не совпадают";
              },
            })}
          />
          {errors.confirmPassword && (
            <p className={style.errorField}>
              {errors.confirmPassword?.message}
            </p>
          )}
        </div>
        <label>
          <Controller
            name="checkbox"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Checkbox {...field} />}
          />
          Согласие на обработку персональных данных
          {errors.checkbox && (
            <p className={style.errorField}>Необходимо отметить данное поле</p>
          )}
        </label>
        <label>
          <Controller
            name="checkbox"
            control={control}
            rules={{ required: false }}
            render={({ field }) => <Checkbox {...field} />}
          />
          Согласие на получение акционных предложений
        </label>

        <input type="submit" />
      </form>
    </div>
  );
}
