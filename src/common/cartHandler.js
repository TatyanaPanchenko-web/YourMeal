import { updateCart, changeItemCart, deleteItemCart } from "../services/FB";

export function addItemCart(item, cartElements, upload, imgUrl) {
  const fullItem = { ...item, imgUrl };
  let indexElement;
  const checkedItem = cartElements.find((el, index) => {
    indexElement = index;
    return el.id === fullItem.id;
  });
  if (!checkedItem) {
    updateCart(fullItem).then(() => {
      upload.setStatus((prev) => !prev);
    });
    return;
  }
  const newItem = { ...checkedItem, count: checkedItem.count + 1 };
  changeItemCart(newItem, upload.dataKeys[indexElement]).then(() => {
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

export function changeCountCartItem(flag, item, upload, indexElement) {
  let newItem;
  if (flag) {
    newItem = { ...item, count: item.count + 1 };
  } else {
    newItem = { ...item, count: item.count - 1 };
    if (newItem.count < 1) {
      deleteItemCart(upload.dataKeys[indexElement]).then(() =>
        upload.setStatus((prev) => !prev)
      );
      return null;
    }
  }

  changeItemCart(newItem, upload.dataKeys[indexElement]).then(() =>
    upload.setStatus((prev) => !prev)
  );
}
