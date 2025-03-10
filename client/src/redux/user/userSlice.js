import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser:null,
    error:null,
    loading:false,
}

const userSlice = createSlice(
    {
        name:'user',
        initialState,
        reducers:{
            // --- for sign in --- 
            signInStart:(state)=>{
                state.loading= true;
                state.error=null;
            },
            signInSuccess:(state,action)=>{
                state.currentUser= action.payload;
                state.loading=false;
                state.error=null;
            },
            signInFailure:(state, action)=>{
                state.loading=false;
                state.error = action.payload;
            },
            // --- for sign out --- 
            signOut:(state,action)=>{
                state.currentUser=null;
                state.loading=false;
                state.error=null;
            }

        }
    }
)


export const {
    signInStart,
    signInSuccess,
    signInFailure,
    signOut,
    
} = userSlice.actions;
export default userSlice.reducer;