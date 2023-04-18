import { configureStore } from "@reduxjs/toolkit";
import dynamicListsReducer from './dynamicLists-slice';
import inboxReducer from "./inbox-slice";
import uiReducer from "./ui-slice";
import authReducer from "./auth-slice";

const store = configureStore({
    reducer:
    {
        dynamicLists: dynamicListsReducer,
        inbox: inboxReducer, 
        ui: uiReducer,
        auth: authReducer,
    }
});

export default store;