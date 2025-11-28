import { useState, useEffect } from "react";
import MealMenu from "../../components/MealMenu/MealMenu";
import Cart from "../../components/Cart/Cart";
import Firstscreen from "../../components/Firstscreen/Firstscreen";
import Nav from "../../components/Nav/Nav";
import Loader from "../../components/Loader/Loader";
import { getData } from "../../services/FB.js";
import { UserInfoType, DataProductsType, NavItemType } from "../../types/index";
import style from "./mainPage.module.scss";

type MainPagePropsType = {
  dataAuth: UserInfoType | null;
};

export type ProductsState = {
  data: DataProductsType[];
  status: boolean;
};

export type CartState = {
  data: DataProductsType[];
  dataKeys: string[] | null;
  status: boolean;
};
export default function MainPage({ dataAuth }: MainPagePropsType) {
  const [products, setProducts] = useState<ProductsState>({
    data: [],
    status: false,
  });
  const [cartElements, setCartElements] = useState<CartState>({
    data: [],
    dataKeys: [],
    status: false,
  });
  const [status, setStatus] = useState<boolean>(false);
  const upload = {
    status,
    setStatus,
    dataKeys: cartElements.dataKeys,
  };

  const [activeTab, setActiveTab] = useState<NavItemType>({
    img: "./nav/burgers.png",
    name: "Бургеры",
    product_name: "burgers",
  });

  useEffect(() => {
    const productsServer: Promise<DataProductsType[] | null> = getData(
      `products/${activeTab.product_name}`
    );
    const cartServer: Promise<DataProductsType[] | null> = getData(
      `cart/${dataAuth?.uid ? dataAuth.uid : ""}`
    );

    Promise.allSettled([productsServer, cartServer]).then((results) => {
      if (results[0].status === "fulfilled") {
        setProducts({ data: results[0].value || [], status: true });
      }
      if (results[1].status === "fulfilled" && dataAuth?.uid) {
        setCartElements({
          data: results[1].value ? Object.values(results[1]?.value) : [],
          dataKeys: results[1].value ? Object.keys(results[1]?.value) : [],
          status: true,
        });
      }
    });

    if (!dataAuth?.uid) {
      const storedCartStr = localStorage.getItem("cart");
      if (storedCartStr) {
        try {
          const localCart: DataProductsType[] = JSON.parse(storedCartStr);
          setCartElements({ data: localCart, dataKeys: null, status: true });
        } catch (error) {
          console.error("Ошибка парсинга корзины из localStorage:", error);
          setCartElements({ data: [], dataKeys: null, status: true });
        }
      } else {
        setCartElements({ data: [], dataKeys: null, status: true });
      }
    }
  }, [status, activeTab, dataAuth?.uid]);

  return (
    <>
      <Firstscreen />
      <Nav activeTab={activeTab} setActiveTab={setActiveTab} />
      {!cartElements.status || !products.status ? (
        <section className={style.main}>
          <div className={style.loading}>
            <Loader />
          </div>
        </section>
      ) : (
        <section className={style.main}>
          <div className={style["main-container"]}>
            <div className={style["main-wrapper"]}>
              <Cart
                cartElements={cartElements.data}
                upload={upload}
                dataAuth={dataAuth}
              />
              <MealMenu
                products={products.data}
                cartElements={cartElements.data}
                upload={upload}
                activeTab={activeTab}
                userUid={dataAuth?.uid}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
