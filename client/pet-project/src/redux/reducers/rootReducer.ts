import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userCollections from "./userCollections";

const rootReducer = combineReducers({
    auth: authReducer,
    collections: userCollections
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
