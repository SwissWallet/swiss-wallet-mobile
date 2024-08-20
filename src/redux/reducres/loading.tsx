import { createSlice } from "@reduxjs/toolkit";

export const loadingUser = createSlice({
    name: 'loading',
    initialState: {
        value: false
    },
    reducers: {
        loading: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {loading} = loadingUser.actions;
export default loadingUser.reducer;
