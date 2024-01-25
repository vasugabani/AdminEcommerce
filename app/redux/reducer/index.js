import { combineReducers } from "redux";
import { counterReducer } from "./counter.reducer";
import counterSlice from "../slice/counter.slice";
import categorySlice from "../slice/category.slice";
import subCategorySlice from "../slice/subCategory.slice";
import productSlice from "../slice/product.slice";

export const rootReducer = combineReducers({
    // Add your reducers here.
    count:counterSlice,
    category:categorySlice,
    subCategory:subCategorySlice,
    product:productSlice,
})