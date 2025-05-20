import React from "react";
import style from "./cartItem.module.scss";
import { changeCountCartItem } from "../../common/cartHandler";

export default function CartItem({ upload, item, indexElement }) {
  const { name, weight, price, count, imgUrl } = item;
  return (
    <div className={style["cart-item"]}>
      <div className={style["item-about"]}>
        <div className={style["item-img"]}>
          <img src={imgUrl} alt={name} />
        </div>
        <div className={style["item-description"]}>
          <div className={style["item-name"]}>{name}</div>
          <div className={style["item-weight"]}>{weight}</div>
          <div className={style["item-price"]}>{price}₽</div>
        </div>
      </div>
      <div className={style["item-counter"]}>
        <button
          onClick={() => changeCountCartItem(false, item, upload, indexElement)}
        >
          -
        </button>
        <div>{count}</div>
        <button
          onClick={() => changeCountCartItem(true, item, upload, indexElement)}
        >
          +
        </button>
      </div>
    </div>
  );
}
