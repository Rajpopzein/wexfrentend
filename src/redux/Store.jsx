import { configureStore } from "@reduxjs/toolkit";
import drawerReducer from "../redux/slice/drawerslice.jsx";

const Store = configureStore({
  reducer: {
        drawer: drawerReducer,
  },
});

export default Store;