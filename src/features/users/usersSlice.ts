import { client } from '@/api/client'
import { RootState } from '@/app/store'
import { createAppAsyncThunk } from '@/app/withTypes'
import { selectCurrentUsername } from '@/features/auth/authSlice'
import { createSlice } from '@reduxjs/toolkit'

interface User {
  id: string
  name: string
}

const initialState: User[] = []

export const fetchUsers = createAppAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get<User[]>('/fakeApi/users')
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export default usersSlice.reducer

export const selectCurrentUser = (state: RootState) => {
  const currentUsername = selectCurrentUsername(state)
  return currentUsername ? selectUserById(state, currentUsername) : undefined
}
export const selectAllUsers = (state: RootState) => state.users
export const selectUserById = (state: RootState, userId: string) => state.users.find((user) => user.id === userId)
