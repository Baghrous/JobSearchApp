import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";

const middleware = [thunkMiddleware];
const enhancer = composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(reducer, enhancer);

export default store;
