import { createSlice } from "@reduxjs/toolkit";

export const userLoged = createSlice({
    name: 'logado',
    initialState: {
        value: false
    },
    reducers: {
        isLoged: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {isLoged} = userLoged.actions;
export default userLoged.reducer;
