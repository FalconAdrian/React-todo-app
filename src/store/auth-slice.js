import {createSlice} from '@reduxjs/toolkit';

const initialAuthState = {
    collectionId: undefined,
};
const authSlice = createSlice({
    name : 'auth',
    initialState:initialAuthState,
    reducers: {
        setCollectionId(state, action)
        {
            state.collectionId = action.payload;
        },
        resetState(state, action)
        {
            state.collectionId = undefined;
        }
    }
})

export default authSlice.reducer;
export const authActions = authSlice.actions;
