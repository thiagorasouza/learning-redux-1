import { RootState } from '@/app/store'
import { apiSlice } from '@/features/api/apiSlice'
import { selectCurrentUsername } from '@/features/auth/authSlice'
import { createSelector } from '@reduxjs/toolkit'

export interface User {
  id: string
  name: string
}

export const selectUsersResult = apiSlice.endpoints.getUsers.select()

export const selectAllUsers = createSelector(selectUsersResult, (userResult) => userResult?.data ?? [])

export const selectUserById = createSelector(
  selectAllUsers,
  (state: RootState, userId: string) => userId,
  (users, userId) => users.find((user) => user.id === userId),
)

export const selectCurrentUser = (state: RootState) => {
  const currentUsername = selectCurrentUsername(state)
  return currentUsername ? selectUserById(state, currentUsername) : undefined
}

// export const { selectAll: selectAllUsers, selectById: selectUserById } = usersAdapter.getSelectors(
//   (state: RootState) => state.users,
// )
