/* eslint-disable no-unused-vars */
import { combineReducers, configureStore} from '@reduxjs/toolkit'

import userReducers from './user/userSlice.js'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({user: userReducers});

const persistConfig = {
  key: 'root',
  storage,
  verion: 1
}


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  

})


export const persistor = persistStore(store);