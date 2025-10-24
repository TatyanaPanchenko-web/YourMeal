import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import MealMenu from "../../components/MealMenu/MealMenu";
import Cart from "../../components/Cart/Cart";
import Firstscreen from "../../components/Firstscreen/Firstscreen";
import Nav from "../../components/Nav/Nav";
import Loader from "../../components/Loader/Loader";
import { getData } from "../../services/FB.js";
import nav from "../../data/nav.json";
import style from "./mainPage.module.scss";

export default function MainPage({ dataAuth }) {
  const [products, setProducts] = useState({ data: [], status: false });
  const [cartElements, setCartElements] = useState({
    data: [],
    dataKeys: [],
    status: false,
  });
  const [userUid, setUserUid] = useState(null);
  console.log(userUid, cartElements);
  const [status, setStatus] = useState(false);
  const upload = {
    status,
    setStatus,
    dataKeys: cartElements.dataKeys,
  };

  const [activeTab, setActiveTab] = useState({
    img: "./nav/burgers.png",
    name: "Бургеры",
    product_name: "burgers",
  });

  const auth = getAuth();
  useEffect(() => {
    const listenUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUid(user.uid);
      }
    });
    return () => {
      listenUser();
    };
  }, []);

  useEffect(() => {
    const productsServer = getData(`products/${activeTab.product_name}`);
    const cartServer = getData("cart/" + userUid);
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
  }, [status, activeTab, userUid]);

  return (
    <>
      <Firstscreen />
      <Nav nav={nav} activeTab={activeTab} setActiveTab={setActiveTab} />
      {!cartElements.status || !products.status ? (
        <div className={style.loading}>
          <Loader />
        </div>
      ) : (
        <section className={style.main}>
          <div className={style["main-container"]}>
            <div className={style["main-wrapper"]}>
              <Cart
                cartElements={cartElements.data}
                upload={upload}
                activeTab={activeTab.product_name}
                dataAuth={dataAuth}
                userUid={userUid}
              />
              <MealMenu
                products={products.data}
                cartElements={cartElements.data}
                upload={upload}
                activeTab={activeTab}
                userUid={userUid}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
