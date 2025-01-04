import { RootState } from '@/app/store'
import { apiSlice } from '@/features/api/apiSlice'
import { selectCurrentUsername } from '@/features/auth/authSlice'
import { createEntityAdapter, createSelector, EntityState } from '@reduxjs/toolkit'

export interface User {
  id: string
  name: string
}

const usersAdapter = createEntityAdapter<User>()
const initialState = usersAdapter.getInitialState()

export const apiSliceWithUsers = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<EntityState<User, string>, void>({
      query: () => '/users',
      transformResponse: (response: User[]) => {
        return usersAdapter.setAll(initialState, response)
      },
    }),
  }),
})

export const { useGetUsersQuery } = apiSliceWithUsers

export const selectUsersResult = apiSliceWithUsers.endpoints.getUsers.select()
const selectUsersData = createSelector(selectUsersResult, (result) => result.data ?? initialState)

// export const selectAllUsers = createSelector(selectUsersResult, (userResult) => userResult?.data ?? [])

// export const selectUserById = createSelector(
//   selectAllUsers,
//   (state: RootState, userId: string) => userId,
//   (users, userId) => users.find((user) => user.id === userId),
// )

export const { selectAll: selectAllUsers, selectById: selectUserById } = usersAdapter.getSelectors(selectUsersData)

export const selectCurrentUser = (state: RootState) => {
  const currentUsername = selectCurrentUsername(state)
  return currentUsername ? selectUserById(state, currentUsername) : undefined
}
