import ProductItem from "../ProductItem/ProductItem";
import style from "./mealMenu.module.scss";

export default function MealMenu({
  products,
  upload,
  cartElements,
  activeTab,
  userUid,
}) {
  return (
    <div className={style["meal-menu"]}>
      <div className={style["meal-menu-title"]}>{activeTab.name}</div>
      <div className={style["meal-menu-wrapper"]}>
        {products.map((item, index) => {
          return (
            <ProductItem
              key={index}
              item={item}
              index={index}
              upload={upload}
              cartElements={cartElements}
              activeTab={activeTab}
              userUid={userUid}
            />
          );
        })}
      </div>
    </div>
  );
}
