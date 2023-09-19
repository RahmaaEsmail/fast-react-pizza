import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userName : ''
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        updateName(state,action) {
            state.userName = action.payload
        }
    }
})

export const {updateName} = userSlice.actions;

export const getUserName = state => state.user.userName;

export default userSlice.reducer;