import { useState } from "react";
import { getItemsCount } from "../../common/cartHandler";
import { deleteAllCart } from "../../services/FB";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import CartItem from "../CartItem/CartItem";
import ModalDelivery from "../ModalDelivery/ModalDelivery";
import ModalSuccess from "..//ModalSuccess/ModalSuccess";
import style from "./cart.module.scss";

export default function Cart({
  cartElements,
  upload,
  activeTab,
  dataAuth,
  userUid,
}) {
  const [modalDeliveryStatus, setModalDeliveryStatus] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const navigate = useNavigate();

  const checkPromo = cartElements.filter((item) => item.promotion === true);
  const handleOrder = () => {
    if (!userUid) {
      navigate("/authorization");
    }
    setModalDeliveryStatus(true);
  };

  const handleDeleteCart = (userUid) => {
    deleteAllCart(userUid);
    upload.setStatus((prev) => !prev);
  };
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
        {submittedSuccess && (
          <ModalSuccess setSubmittedSuccess={setSubmittedSuccess} />
        )}
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
                  userUid={userUid}
                />
              );
            })}
          </div>
        </div>
        <div className={style["cart-bottom"]}>
          <div
            className={style["cart-delete"]}
            onClick={() => {
              handleDeleteCart(userUid);
            }}
          >
            Очистить корзину
          </div>
          <div className={style["cart-total"]}>
            <span>Итого</span>
            <div className={style["cart-totalPrice"]}>
              {getItemsCount(cartElements, upload, true)}₽
            </div>
          </div>
          <button className={style["cart-order"]} onClick={handleOrder}>
            Оформить заказ
          </button>
          {checkPromo.length > 0 ||
          getItemsCount(cartElements, upload) > 3 ||
          getItemsCount(cartElements, upload, true) > 1000 ? (
            <div className={style["cart-delivery"]}>Бесплатная доставка</div>
          ) : null}
        </div>
      </div>

      {modalDeliveryStatus && (
        <ModalDelivery
          setModalDeliveryStatus={setModalDeliveryStatus}
          setSubmittedSuccess={setSubmittedSuccess}
          dataAuth={dataAuth}
          upload={upload}
        />
      )}
    </div>
  );
}
