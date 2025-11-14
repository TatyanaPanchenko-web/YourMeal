import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  onValue,
  push,
  update,
  remove,
} from "firebase/database";
import { firebaseConfig } from "../../firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export function getData(path) {

  const dataRef = ref(database, "/" + path);
  return new Promise((resolve, reject) => {
    onValue(
      dataRef,
      (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      },
      (error) => reject(error)
    );
  });
}

export function updateCart(item, uid) {
  const dataRef = ref(database, "/cart/" + uid);
  const refKey = push(dataRef).key;
  return push(dataRef, { ...item, key: refKey });
}

export function changeItemCart(item, uid, key) {
  const dataRef = ref(database, "/cart/" + uid + "/" + key);
  return update(dataRef, item);
}

export function deleteItemCart(uid, key) {
  const dataRef = ref(database, "/cart/" + uid + "/" + key);
  return remove(dataRef);
}

// export function addRegData(item, uid) {
//   const dataRef = ref(database, "/users");
//   // return push(dataRef, { ...item, key: uid });
//   return push(dataRef, { ...item });
// }

// export function addRegData(uid, data) {
//   set(ref(database, "users/"), {
//     uid: { name: data.name },
//   });
// }

export function addRegData(user) {
  const userInfo = {
    name: user.displayName,
    email: user.email,
    data: new Date().toLocaleString(),
    // promo: data.promo,
    // agreement: data.agreement,
    uid: user.uid,
  };
  return update(ref(database, "users/" + user.uid), userInfo);
}
export function addOrderData(address, cartItems, uid) {
  const order = {
    address: address,
    cartItems: cartItems,
  };
  return update(ref(database, "users/" + uid + "/order"), order);
}

export function updateOrderData(item) {
  const dataRef = ref(database, "/order");
  const refKey = push(dataRef).key;
  return push(dataRef, { ...item, key: refKey });
}
export function deleteAllCart(uid) {
  const dataRef = ref(database, "/cart/" + uid);
  return remove(dataRef);
}
