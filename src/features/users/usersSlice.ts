import { RootState } from '@/app/store'
import { selectCurrentUsername } from '@/features/auth/authSlice'
import { createSlice } from '@reduxjs/toolkit'

interface User {
  id: string
  name: string
}

const initialState: User[] = [
  { id: '0', name: 'Tianna Jenkins' },
  { id: '1', name: 'Kevin Grant' },
  { id: '2', name: 'Madison Price' },
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
})

export default usersSlice.reducer

export const selectCurrentUser = (state: RootState) => {
  const currentUsername = selectCurrentUsername(state)
  return currentUsername ? selectUserById(state, currentUsername) : undefined
}
export const selectAllUsers = (state: RootState) => state.users
export const selectUserById = (state: RootState, userId: string) => state.users.find((user) => user.id === userId)
