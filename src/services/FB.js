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

export function updateCart(item) {
  const dataRef = ref(database, "/cart");
  const refKey = push(dataRef).key;
  return push(dataRef, { ...item, key: refKey });
}

export function changeItemCart(item, key) {
  const dataRef = ref(database, "/cart/" + key);
  return update(dataRef, item);
}

export function deleteItemCart(key) {
  const dataRef = ref(database, "/cart/" + key);
  return remove(dataRef);
}

export function addRegData(item, uid) {
  const dataRef = ref(database, "/users");
  // return push(dataRef, { ...item, key: uid });
  return push(dataRef, { ...item });
}

export function updateOrderData(item) {
  const dataRef = ref(database, "/order");
  const refKey = push(dataRef).key;
  return push(dataRef, { ...item, key: refKey });
}
export function deleteAllCart() {
  const dataRef = ref(database, "/cart");
  return remove(dataRef);
}
