import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    count : 0
}

const countSlice = createSlice({
    name: "count",
    initialState:initialState,
    reducers:{
        incrementSlice: (state,action) => {
            state.count = state.count + 1
        },
        decrementSlice: (state,action) => {
            state.count = state.count - 1
        }
    }
})

export const {incrementSlice,decrementSlice} = countSlice.actions
export default countSlice.reducer