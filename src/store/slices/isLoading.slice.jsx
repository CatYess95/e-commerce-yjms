import { createSlice } from "@reduxjs/toolkit";

export const isLoadingSlice = createSlice({
    name: 'isLoading',
    initialState: false,
    reducers:{
        //HACEMOS UN ACTION PARA MANDAR LA PANTALLA DE CARGA
        setIsLoading: (state, action) => {
            return action.payload
        }
    }
})

export const {setIsLoading} = isLoadingSlice.actions;
export default isLoadingSlice.reducer;