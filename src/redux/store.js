import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'

const persistConfig = {
    key: 'user',
    storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer)
const store = configureStore({
    reducer: persistedReducer,
})
export const persist =  persistStore(store)
export const delUser = () => {
    console.log("test")
    persist.purge().then(r => console.log(r))
}

export default store
