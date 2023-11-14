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
        },
        updateUserStart: (state)=>{
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.error = null;
            state.loading = false;
        },
        updateUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteUserStart: (state)=>{
            state.loading = true;
        },
        deleteUserSuccess: (state, action) => {
            state.currentUser = null;
            state.error = null;
            state.loading = false;
        },
        deleteUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signOutStart: (state)=>{
            state.loading = true;
        },
        signOutSuccess: (state, action) => {
            state.currentUser = null;
            state.error = null;
            state.loading = false;
        },
        signOutFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

    }
});


export const {siginStart, signinSuccess, signinFailure, updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutStart, signOutSuccess, signOutFailure} = userSlice.actions;

export default userSlice.reducer;

