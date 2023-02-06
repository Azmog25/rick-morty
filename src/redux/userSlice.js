import { createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: null
}

const store = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        logOutUser: state => {
            state.user = initialState
        }
    }
})

export const { setUser, logOutUser } = store.actions
export default store.reducer