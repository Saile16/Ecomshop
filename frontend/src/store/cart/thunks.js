import { addToCart, removeFromCart, saveShippingAddress } from "./cartSlice";

export const startAddingToCart = (product, qty) => {
  return async (dispatch, getState) => {
    //pasamos el producto y le agregamos un parametro de cantidad
    const tempProduct = { ...product, qty: parseInt(qty) };
    dispatch(addToCart(tempProduct));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

export const startRemovingFromCart = (productId) => {
  return async (dispatch, getState) => {
    dispatch(removeFromCart(productId));
    //y aqui guardamos el nuevo estado del carrito en el localstorage
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

export const startSavingShippingAddress = (data) => {
  return async (dispatch) => {
    dispatch(saveShippingAddress(data));
    localStorage.setItem("shippingAddress", JSON.stringify(data));
  };
};
