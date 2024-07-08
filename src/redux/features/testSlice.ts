import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    tests : [],
};

const testSlice = createSlice({
    name: "test",
initialState,
reducers: {}
})

export default testSlice.reducer