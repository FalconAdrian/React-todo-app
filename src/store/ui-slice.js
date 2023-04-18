import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        modalIsVisible: false,
        notifications:null,
    },
    reducers: {
        showModal(state)
        {
            state.modalIsVisible = true;
        },
        hideModal(state)
        {
            state.modalIsVisible = false;
        }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;