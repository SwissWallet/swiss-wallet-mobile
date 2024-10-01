//@ts-nocheck
import { createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Content {
    id: number
    points: number
}


export const points = createSlice({
    name: 'pointsProduct',
    initialState: {
        value: []
    },
    reducers: {
        addPoints: {
            reducer: (state, action: PayloadAction<Content>) => {
                state.value.push({
                    id: action.payload.id,
                    points: action.payload.points
                });
            },
            prepare: (id: number, points: number) => {
                return {payload: {id, points}}
            }
        },
        removePoints: (state, action) => {
            state.value.forEach((item, index) => {
                if (item.id === action.payload) state.value.splice(index, 1);
            });
        },
        clearList: (state, action) => {
            state.value.splice(0, action.payload);
        }

    }
});

export const {addPoints, removePoints, clearList} = points.actions;
export default points.reducer;