import { client } from '@/api/client'
import { RootState } from '@/app/store'
import { createAppAsyncThunk } from '@/app/withTypes'
import { selectCurrentUsername } from '@/features/auth/authSlice'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

interface User {
  id: string
  name: string
}

export const fetchUsers = createAppAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get<User[]>('/fakeApi/users')
  return response.data
})

const usersAdapter = createEntityAdapter<User>()

const initialState = usersAdapter.getInitialState()

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
  },
})

export default usersSlice.reducer

export const { selectAll: selectAllUsers, selectById: selectUserById } = usersAdapter.getSelectors(
  (state: RootState) => state.users,
)

export const selectCurrentUser = (state: RootState) => {
  const currentUsername = selectCurrentUsername(state)
  return currentUsername ? selectUserById(state, currentUsername) : undefined
}
