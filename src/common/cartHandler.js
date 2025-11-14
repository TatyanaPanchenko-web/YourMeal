import { updateCart, changeItemCart, deleteItemCart } from "../services/FB";

export function addItemCart(item, uid, cartElements, upload, imgUrl) {
 
  const fullItem = { ...item, imgUrl };
  let indexElement;
  const checkedItem = cartElements.find((el, index) => {
    indexElement = index;
    return el.id === fullItem.id;
  });

  if (!checkedItem) {
    if (!uid) {
      const checkLocaleCart = localStorage.getItem("cart");
    if (checkLocaleCart) {
      localStorage.setItem("cart", JSON.stringify([...cartElements, fullItem]));
    } else {
      localStorage.setItem("cart", JSON.stringify([fullItem]));
    }
      upload.setStatus((prev) => !prev);
      return;
    }

    updateCart(fullItem, uid).then(() => {
      upload.setStatus((prev) => !prev);
    });
    return;
  }
  
  const newItem = { ...checkedItem, count: checkedItem.count + 1 };

  if (!uid) {
    if (indexElement !== -1) {
      const newCartArr = [
        ...cartElements.slice(0, indexElement),
        newItem,
        ...cartElements.slice(indexElement + 1),
      ];
      localStorage.setItem("cart", JSON.stringify(newCartArr));
    }
    upload.setStatus((prev) => !prev);
    return;
  }
  changeItemCart(newItem, uid, upload.dataKeys[indexElement]).then(() => {
    upload.setStatus((prev) => !prev);
    return;
  });
}

export function getItemsCount(cartElements, upload, price = false) {
  let allTotalCount = 0;
  let allTotalPrice = 0;
  cartElements.forEach((item) => {
    allTotalCount += item.count;
    allTotalPrice += item.price * item.count;
  });
  return price ? allTotalPrice : allTotalCount;
}

export function changeCountCartItem(
  cartElements,
  flag,
  uid,
  item,
  upload,
  indexElement
) {

  if (!uid) {
    let indexElement;
    const checkedItem = cartElements.find((el, index) => {
      indexElement = index;
      return el.id === item.id;
    });

    let newItem;
    if (flag) {
      newItem = { ...checkedItem, count: item.count + 1 };
         } else {
      newItem = { ...checkedItem, count: item.count - 1 };
      if (newItem.count < 1) {
        if (indexElement !== -1) {
          const newCartArr = [
            ...cartElements.slice(0, indexElement),
            ...cartElements.slice(indexElement + 1),
          ];
          localStorage.setItem("cart", JSON.stringify(newCartArr));
          upload.setStatus((prev) => !prev);
          return;
        }
      }
    }
    if (indexElement !== -1) {
   
      const newCartArr = [
        ...cartElements.slice(0, indexElement),
        newItem,
        ...cartElements.slice(indexElement + 1),
      ];
      localStorage.setItem("cart", JSON.stringify(newCartArr));
      upload.setStatus((prev) => !prev);
      return;
    }
    return;
  }

  let newItem;
  if (flag) {
    newItem = { ...item, count: item.count + 1 };
  } else {
    newItem = { ...item, count: item.count - 1 };
    if (newItem.count < 1) {
      deleteItemCart(uid, upload.dataKeys[indexElement]).then(() =>
        upload.setStatus((prev) => !prev)
      );
      return null;
    }
  }
  changeItemCart(newItem, uid, upload.dataKeys[indexElement]).then(() =>
    upload.setStatus((prev) => !prev)
  );
}
