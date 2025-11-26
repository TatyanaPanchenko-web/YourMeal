import ProductItem from "../ProductItem/ProductItem";
import { DataProductsType, UploadType, NavItemType } from "../../types/index";
import style from "./mealMenu.module.scss";

type MealMenuPropsType = {
  products: DataProductsType[];
  upload: UploadType;
  cartElements: DataProductsType[];
  activeTab: NavItemType;
  userUid: string | undefined;
};
export default function MealMenu({
  products,
  upload,
  cartElements,
  activeTab,
  userUid,
}: MealMenuPropsType) {

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
