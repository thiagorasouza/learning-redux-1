import { client } from '@/api/client'
import { RootState } from '@/app/store'
import { createAppAsyncThunk } from '@/app/withTypes'
import { createSlice } from '@reduxjs/toolkit'

export interface ServerNotification {
  id: string
  user: string
  message: string
  date: string
}

const initialState: ServerNotification[] = []

export const fetchNotifications = createAppAsyncThunk('notifications/fetchNotifications', async (arg, thunkApi) => {
  const allNotifications = selectAllNotifications(thunkApi.getState())
  const [latestNotification] = allNotifications
  const latestTimestamp = latestNotification ? latestNotification.date : ''
  const response = await client.get<ServerNotification[]>(`/fakeApi/notifications?since?=${latestTimestamp}`)
  return response.data
})

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.push(...action.payload)
      state.sort((a, b) => b.date.localeCompare(a.date))
    })
  },
})

export default notificationsSlice.reducer

export const selectAllNotifications = (state: RootState) => state.notifications
