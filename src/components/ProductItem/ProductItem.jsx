import { useState } from "react";
import { addItemCart } from "../../common/cartHandler";
import ModalProduct from "../../components/ModalProduct/ModalProduct";
import style from "./productItem.module.scss";

export default function ProductItem({
  item,
  index,
  upload,
  cartElements,
  activeTab,
  userUid,
}) {
  const [modalProductStatus, setModalProductStatus] = useState(false);
  const imgUrl = `products/${activeTab.product_name}/${activeTab.product_name}_${index}.png`;
  const { name, weight, price, promotion } = item;
  return (
    <>
      <div className={style["meal-menu-item"]} key={index}>
        <div
          className={style["meal-menu-inner"]}
          onClick={() => {
            setModalProductStatus(true);
          }}
        >
          {promotion && (
            <div className={style["meal-menu-promotion"]}>
              <span>Акция</span>
            </div>
          )}
          <div className={style["meal-menu-img"]}>
            <img src={imgUrl} alt={name} />
          </div>
          <div className={style["meal-menu-price"]}>{price}₽</div>
          <div className={style["meal-menu-name"]}>{name}</div>
          <div className={style["meal-menu-weight"]}>{weight}</div>
        </div>
        <button
          onClick={() =>
            addItemCart(item, userUid, cartElements, upload, imgUrl)
          }
          className={style["meal-menu-btn"]}
        >
          Добавить
        </button>
        {modalProductStatus ? (
          <ModalProduct
            item={item}
            imgUrl={imgUrl}
            upload={upload}
            cartElements={cartElements}
            modalProductStatus={modalProductStatus}
            setModalProductStatus={setModalProductStatus}
            userUid={userUid}
          />
        ) : null}
      </div>
    </>
  );
}
