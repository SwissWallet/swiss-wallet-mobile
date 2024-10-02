import { createSlice } from "@reduxjs/toolkit";

export const reloadUser = createSlice({
    name: 'reload',
    initialState: {
        value: false
    },
    reducers: {
        reload: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {reload} = reloadUser.actions;
export default reloadUser.reducer;
