import {configureStore, combineReducers} from '@reduxjs/toolkit'
import {persistReducer, persistStore} from 'redux-persist'
import  storage from 'redux-persist/lib/storage'


import userSlice from './user/userSlice'
import productSlice from './product/productSlice'


// ----one 
const rootReducer = combineReducers(
    {
        user : userSlice,
        product: productSlice,
    }
)

// ---- two 
const p_config= {
    key:'root', storage, version:1
}

// ---- three 
const p_reducer= persistReducer(p_config, rootReducer)

// ---- four 
export const store = configureStore(
    {
        reducer: p_reducer,
        middleware: (getDefaultMiddleware)=> getDefaultMiddleware({serializableCheck:false})
    }
)


// ---- five 
export const persistor = persistStore(store)


// -------------fake down 
 