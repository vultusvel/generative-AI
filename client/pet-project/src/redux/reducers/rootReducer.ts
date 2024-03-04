import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userCollections from "./userCollections";
import chatReducer from "./chatReducer";
import productsReducer from "./productsReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    collections: userCollections,
    chat: chatReducer,
    products: productsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
