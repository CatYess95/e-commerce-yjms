import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./isLoading.slice";

export const productSlice = createSlice({
    name: 'product',
    initialState: [],
    reducers: {
        setProduct: (state, action) => {
            return action.payload
        }
    }
})
//CREAR EL THUNK
export const getProductThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://e-commerce-api.academlo.tech/api/v1/products')
    .then((res) => dispatch(setProduct(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
}

//PRODUCT ID
export const filterProductThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://e-commerce-api.academlo.tech/api/v1/products/?category=${id}`)
    .then ((res) => dispatch(setProduct(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
}

//SEARCH PRODUCTS
export const filterItemThunk = (inputSearch) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://e-commerce-api.academlo.tech/api/v1/products/?query=${inputSearch}`)
    .then ((res) => dispatch(setProduct(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
}



export const {setProduct } = productSlice.actions;
export default productSlice.reducer;