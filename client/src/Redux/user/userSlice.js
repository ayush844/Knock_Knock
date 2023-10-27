/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  error: null,
  loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        siginStart: (state)=>{
            state.loading = true;
        },
        signinSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.error = null;
            state.loading = false;
        },
        signinFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }

    }
});


export const {siginStart, signinSuccess, signinFailure} = userSlice.actions;

export default userSlice.reducer;

