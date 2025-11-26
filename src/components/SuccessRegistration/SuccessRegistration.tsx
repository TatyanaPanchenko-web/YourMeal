import style from "./successRegistration.module.scss";

type SuccessRegistrationPropsType = {
  regdata: boolean;
};
export default function SuccessRegistration({
  regdata,
}: SuccessRegistrationPropsType) {
  return (
    <>
      {!regdata ? (
        <div className={style.loading}>Loading...</div>
      ) : (
        <div className={style["registration-info"]}>
          Регистрация прошла успешно
        </div>
      )}
    </>
  );
}
