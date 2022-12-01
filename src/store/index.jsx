import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart.slice";
import isLoadingSlice from "./slices/isLoading.slice";
import productSlice from "./slices/product.slice";
import purchasesSlice from "./slices/purchases.slice";


export default configureStore({
  reducer: {
    product: productSlice,
    isLoading: isLoadingSlice,
    purchases : purchasesSlice,
    cart: cartSlice
  }
})