import CartItem from "../CartItem/CartItem";
import { useState } from "react";
import { getItemsCount } from "../../common/cartHandler";
import ModalDelivery from "../ModalDelivery/ModalDelivery";
import style from "./cart.module.scss";

export default function Cart({ cartElements, upload, activeTab, dataAuth }) {
  const [modalDeliveryStatus, setModalDeliveryStatus] = useState(false);
  const checkPromo = cartElements.filter((item) => item.promotion === true);

  if (cartElements.length === 0) {
    return (
      <div className={style.cart}>
        <div className={style["cart-wrapper"]}>
          <div className={style["cart-top"]}>
            <div className={style["cart-title"]}>Корзина</div>
            <div className={style["cart-totalCount"]}>
              <span>0</span>
            </div>
          </div>
          <div className={style["cart-empty"]}>Тут пока пусто :(</div>
        </div>
      </div>
    );
  }
  return (
    <div className={style.cart}>
      <div className={style["cart-wrapper"]}>
        <div className={style["cart-top"]}>
          <div className={style["cart-title"]}>Корзина</div>
          <div className={style["cart-totalCount"]}>
            <span>{getItemsCount(cartElements, upload)}</span>
          </div>
        </div>
        <div className={style["cart-inner"]}>
          <div className={style["cart-items"]}>
            {cartElements.map((item, index) => {
              return (
                <CartItem
                  key={index}
                  indexElement={index}
                  item={item}
                  upload={upload}
                  activeTab={activeTab}
                />
              );
            })}
          </div>
        </div>
        <div className={style["cart-bottom"]}>
          <div className={style["cart-total"]}>
            <span>Итого</span>
            <div className={style["cart-totalPrice"]}>
              {getItemsCount(cartElements, upload, true)}₽
            </div>
          </div>
          <button
            className={style["cart-order"]}
            onClick={() => {
              setModalDeliveryStatus(true);
            }}
          >
            Оформить заказ
          </button>
          {checkPromo.length > 0 ||
          getItemsCount(cartElements, upload) > 3 ||
          getItemsCount(cartElements, upload, true) > 1000 ? (
            <div className={style["cart-delivery"]}>Бесплатная доставка</div>
          ) : null}
        </div>
      </div>
      {console.log(modalDeliveryStatus)}
      {modalDeliveryStatus && (
        <ModalDelivery
          setModalDeliveryStatus={setModalDeliveryStatus}
          dataAuth={dataAuth}
          upload={upload}
        />
      )}
    </div>
  );
}
