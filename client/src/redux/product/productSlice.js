import { createSlice } from "@reduxjs/toolkit";


const initialState= {
    productImages:null,
    bag:null,
    itemsInBag:null,
}


const productSlice= createSlice(
    {
        name:'product',
        initialState,
        reducers:{
            keepImgs:(state,action)=>{
                // console.log('performing',action.payload)

                state.productImages=action.payload;
            },
            emptyKeepImgs:(state)=>{
                state.productImages=null
            },
            putInBag:(state, action)=>{
                state.bag=action.payload;
            },
            emptyBag:(state)=>{
                state.bag=[];
                state.itemsInBag=null;
            },
            totalItems:(state,action)=>{
                state.itemsInBag=action.payload
            }


        }
    }
)

export const {
    keepImgs,
    emptyKeepImgs,
    putInBag,
    emptyBag,
    totalItems,
} = productSlice.actions

export default productSlice.reducer;