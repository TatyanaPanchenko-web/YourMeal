import style from "./loader.module.scss";

function Loader() {
  return (
    <div class={style["spinner-container"]}>
      <div class={style.spinner}></div>
    </div>
  );
}

export default Loader;
