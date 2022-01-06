import {createSlice} from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        userState: false
    },
    reducers: {
        logUser(state, action) {
            state.userState = true;
        },
        notLogUser(state, action) {
            state.userState = false;
        },
    }
});

export const {logUser, notLogUser} = loginSlice.actions;

export default loginSlice.reducer;