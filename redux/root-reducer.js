import { persistCombineReducers } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userReducer from "./user/reducers";
import settingsReducer from "./settings/reducers";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user", "setting"],
};
const rootReducer = {
  user: userReducer,
  setting: settingsReducer,
};

export default persistCombineReducers(persistConfig, rootReducer);
