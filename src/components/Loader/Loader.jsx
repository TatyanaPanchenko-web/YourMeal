import style from "./loader.module.scss";

function Loader() {
  return (
    <div className={style["spinner-container"]}>
      <div className={style.spinner}></div>
    </div>
  );
}

export default Loader;
