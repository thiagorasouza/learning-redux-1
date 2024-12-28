import { RootState } from '@/app/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  username: string | null
}

const initialState = {
  username: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn(state: User, action: PayloadAction<string>) {
      state.username = action.payload
    },
    userLoggedOut(state: User) {
      state.username = null
    },
  },
})

export default authSlice.reducer

export const { userLoggedIn, userLoggedOut } = authSlice.actions

export const selectCurrentUsername = (state: RootState) => state.auth.username
