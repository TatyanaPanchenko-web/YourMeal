import { useState, useEffect } from "react";
import MealMenu from "../../components/MealMenu/MealMenu";
import Cart from "../../components/Cart/Cart";
import Firstscreen from "../../components/Firstscreen/Firstscreen";
import Nav from "../../components/Nav/Nav";
import style from "./mainPage.module.scss";
import { getData } from "../../services/FB.js";
import nav from "../../data/nav.json";

export default function MainPage({ dataAuth }) {
  const [products, setProducts] = useState({ data: [], status: false });
  const [cartElements, setCartElements] = useState({
    data: [],
    dataKeys: [],
    status: false,
  });
  const [status, setStatus] = useState(false);
  const upload = {
    status,
    setStatus,
    dataKeys: cartElements.dataKeys,
  };
  console.log(upload);
  const [activeTab, setActiveTab] = useState({
    img: "./nav/burgers.png",
    name: "Бургеры",
    product_name: "burgers",
  });
  useEffect(() => {
    const productsServer = getData(activeTab.product_name);
    const cartServer = getData("cart");
    Promise.allSettled([productsServer, cartServer]).then((results) => {
      if (results[0].status === "fulfilled") {
        setProducts({ data: results[0].value || [], status: true });
      }
      if (results[1].status === "fulfilled") {
        setCartElements({
          data: results[1].value ? Object.values(results[1]?.value) : [],
          dataKeys: results[1].value ? Object.keys(results[1]?.value) : [],
          status: true,
        });
      }
    });
  }, [status, activeTab]);

  return (
    <>
      <Firstscreen />
      <Nav nav={nav} activeTab={activeTab} setActiveTab={setActiveTab} />
      {!cartElements.status || !products.status ? (
        <div className={style.loading}>Loading...</div>
      ) : (
        <section className={style.main}>
          <div className={style["main-container"]}>
            <div className={style["main-wrapper"]}>
              <Cart
                cartElements={cartElements.data}
                upload={upload}
                activeTab={activeTab.product_name}
                dataAuth={dataAuth}
              />
              <MealMenu
                products={products.data}
                cartElements={cartElements.data}
                upload={upload}
                activeTab={activeTab}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
