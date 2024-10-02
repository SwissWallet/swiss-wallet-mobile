import { createSlice } from "@reduxjs/toolkit";

export const userObject = createSlice({
    name: 'user',
    initialState: {
        value: {}
    },
    reducers: {
        user: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {user} = userObject.actions;
export default userObject.reducer;
