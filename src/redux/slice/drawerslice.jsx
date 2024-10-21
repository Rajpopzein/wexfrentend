import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
};

const DrawerSlice = createSlice({
    name:"drawer",
    initialState,
    reducers: {
        openDrawer: (state) => {
            state.isOpen = true;
        },
        closeDrawer: (state) => {
            state.isOpen = false;
        }
    }
})

export const { openDrawer, closeDrawer } = DrawerSlice.actions;
export default DrawerSlice.reducer;