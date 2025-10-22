import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import validator from "validator";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import CustomizedCheckbox from "./CustomizedCheckbox";
import { addRegData } from "../../services/FB";
import style from "./registration.module.scss";

export default function Registration({ setRegdata }) {
  const [errorDate, setErrorDate] = useState("");
  const {
    register,
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      promo: false,
    },
  });

  const auth = getAuth();
  const onSubmit = (data) => {
    console.log(data);
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

  const validateDate = (value) => {
    // Check if the input has at least 10 characters (e.g., "YYYY-MM-DD")
    if (value.length === 10) {
      // Validate date using validator's isDate function
      if (
        validator.isDate(value, {
          format: "DD-MM-YYYY",
          strictMode: true,
        })
      ) {
        setErrorDate("Valid Date :)");
      } else {
        setErrorDate("Enter Valid Date! Use format YYYY-MM-DD.");
      }
    } else {
      setErrorDate("Enter Valid Date! Use format YYYY-MM-DD.");
    }
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
              minLength: {
                value: 2,
                message: "Некорректное значение",
              },
              pattern: {
                value: /^[A-Za-z, А-Яа-я]+$/i,
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
              maxLength: 40,
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
            <span> Дата рождения</span>

            <input
              onChange={(e) => {
                validateDate(e.target.value);
              }}
              placeholder="Дата рождения"
              type="date"
              min="1900-01-01"
              max="2025-01-01"
              {...register("date", {
                required: "Необходимо заполнить данное поле",
              })}
            />
            {errors.date && (
              <p className={style.errorField}>{errors.date?.message}</p>
            )}
            {errorDate && <p className={style.errorField}>{errorDate}</p>}
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
            name="agreement"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomizedCheckbox
                {...field}
                label={"Согласие на обработку персональных данных"}
              />
            )}
          />
          {errors.agreement && (
            <p className={style.errorField}>Необходимо отметить данное поле</p>
          )}
        </label>

        <label>
          <Controller
            name="promo"
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <CustomizedCheckbox
                {...field}
                label={"Согласие на получение акционных предложений"}
              />
            )}
          />
        </label>

        <input type="submit" />
      </form>
    </div>
  );
}
