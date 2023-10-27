/* eslint-disable no-unused-vars */
import { configureStore} from '@reduxjs/toolkit'

import userReducers from './user/userSlice.js'

export const store = configureStore({
  reducer: {
    user: userReducers
  },

})