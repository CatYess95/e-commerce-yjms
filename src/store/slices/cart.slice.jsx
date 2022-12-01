import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./isLoading.slice";
import getConfig from '../../utils/getConfig';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            return action.payload
        }
    }
})
//CREAR EL THUNK
export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://e-commerce-api.academlo.tech/api/v1/cart', getConfig())
    .then((res) => dispatch(setCart(res.data.data.cart.products)))
    .finally(() => dispatch(setIsLoading(false)));
}

//AGREGANDO PRODUCTO AL CARRITO
export const addCartThunk = (cuantity) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post(
        'https://e-commerce-api.academlo.tech/api/v1/cart',
        cuantity, getConfig())
    .then(() => dispatch(getCartThunk()))
    .finally(() => dispatch(setIsLoading(false)));
}

//MOSTRANDO COMPRAS REALIZADAS POR EL USUARIO    
export const purchaseCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://e-commerce-api.academlo.tech/api/v1/purchases',{},getConfig())
    .then (() => dispatch(setCart([])))
    .finally(() => dispatch(setIsLoading(false)));
}

//ELIMINANDO UN PRODUCTO DEL CARRITO
/*
export const deleteProductThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
   return axios.delete(`https://e-commerce-api.academlo.tech/api/v1/cart/${id}`,getConfig())
    .then (() => dispatch(getCartThunk()))
    .finally(() => dispatch(setIsLoading(false)));
}
*/

export const {setCart} = cartSlice.actions;
export default cartSlice.reducer;