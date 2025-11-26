import { changeCountCartItem } from "../../common/cartHandler";
import { addItemCart } from "../../common/cartHandler";
import { DataProductsType, UploadType } from "../../types/index";
import style from "./modalProduct.module.scss";

type ModalProductPropsType = {
  item: DataProductsType;
  imgUrl: string;
  upload: UploadType;
  cartElements: DataProductsType[];
  setModalProductStatus:React.Dispatch<React.SetStateAction<boolean>>;
  userUid: string | undefined;
};

export default function ModalProduct({
  item,
  imgUrl,
  upload,
  cartElements,
  setModalProductStatus,
  userUid,
}:ModalProductPropsType) {
  const { name, weight, price, description, colorie, ingredients } = item;

  return (
    <div>
      <div
        className={style.modal}
        onClick={() => {
          setModalProductStatus(false);
        }}
      >
        <div
          className={style["modal-container"]}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={style["modal-close"]}
            onClick={() => {
              setModalProductStatus(false);
            }}
          ></div>
          <div className={style["modal-title"]}>{name}</div>
          <div className={style["modal-inner"]}>
            <div className={style["modal-img"]}>
              <img src={imgUrl} alt={name} />
            </div>

            <div className={style["modal-about"]}>
              <div className={style["modal-description"]}>{description}</div>
              <div className={style["modal-caption-ingredients"]}>Состав:</div>
              <div className={style["modal-ingredients"]}>
                {ingredients
                  ? ingredients.map((el, index) => {
                      return <div key={index}>{el}</div>;
                    })
                  : null}
              </div>
              <div className={style["modal-info"]}>
                {weight}, {colorie}
              </div>
            </div>
          </div>
          <div className={style["modal-bottom"]}>
            <button
              className={style["modal-btn"]}
              onClick={() =>
                addItemCart(item, userUid, cartElements, upload, imgUrl)
              }
            >
              Добавить
            </button>
            <div className={style["modal-total"]}>
              <div className={style["modal-counter"]}>
                <button
                  onClick={() => {
                    cartElements.map((el, index) => {
                      if (el.id === item.id) {
                        changeCountCartItem(
                          cartElements,
                          false,
                          userUid,
                          el,
                          upload,
                          index
                        );
                      }
                    });
                  }}
                >
                  -
                </button>
                {cartElements.length === 0 ||
                !cartElements.find((el) => el.id === item.id) ? (
                  <div> 0 </div>
                ) : (
                  <div>
                    {cartElements.map((el) => {
                      if (el.id === item.id) {
                        return el.count;
                      }
                    })}
                  </div>
                )}

                <button
                  onClick={() => {
                    if (cartElements.length === 0) {
                      addItemCart(item, userUid, cartElements, upload, imgUrl);
                      return;
                    }
                    const checkedItem = cartElements.find((el) => {
                      return el.id === item.id;
                    });
                    if (!checkedItem) {
                      addItemCart(item, userUid, cartElements, upload, imgUrl);
                      return;
                    }
                    cartElements.map((el, index) => {
                      if (el.id === item.id) {
                        changeCountCartItem(
                          cartElements,
                          true,
                          userUid,
                          el,
                          upload,
                          index
                        );
                      }
                    });
                  }}
                >
                  +
                </button>
              </div>
              <div className={style["modal-price"]}>{price} ₽</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
