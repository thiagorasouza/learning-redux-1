import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import postsReducer from '@/features/posts/postsSlice'
import usersReducer from '@/features/users/usersSlice'
import authReducer from '@/features/auth/authSlice'
import notificationsReducer from '@/features/notifications/notificationsSlice'
import { listenerMiddleware } from '@/app/listenerMiddleware'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    auth: authReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk = ThunkAction<void, RootState, unknown, Action>
