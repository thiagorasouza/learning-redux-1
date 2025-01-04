import { forceGenerateNotifications } from '@/api/server'
import { AppThunk, RootState } from '@/app/store'
import { apiSlice } from '@/features/api/apiSlice'
import { createAction, createEntityAdapter, createSelector, createSlice, isAnyOf } from '@reduxjs/toolkit'

export interface ServerNotification {
  id: string
  user: string
  message: string
  date: string
}

export interface NotificationMetadata {
  id: string
  read: boolean
  isNew: boolean
}

export const fetchNotificationsWebsocket = (): AppThunk => {
  return (dispatch, getState) => {
    const allNotifications = selectNotificationsData(getState())
    const [latestNotification] = allNotifications
    const latestTimestamp = latestNotification.date
    forceGenerateNotifications(latestTimestamp)
  }
}

const metadataAdapter = createEntityAdapter<NotificationMetadata>()

const initialState = metadataAdapter.getInitialState()

const notificationsReceived = createAction<ServerNotification[]>('notifications/notificationsReceived')

export const apiSliceWithNotifications = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<ServerNotification[], void>({
      query: () => '/notifications',
      onCacheEntryAdded: async (arg, lifecycleApi) => {
        const ws = new WebSocket('ws://localhost')
        try {
          await lifecycleApi.cacheDataLoaded

          ws.addEventListener('message', (event: MessageEvent<string>) => {
            const message: {
              type: 'notifications'
              payload: ServerNotification[]
            } = JSON.parse(event.data)

            switch (message.type) {
              case 'notifications':
                lifecycleApi.updateCachedData((draft) => {
                  draft.push(...message.payload)
                  draft.sort((a, b) => b.date.localeCompare(a.date))
                })
                lifecycleApi.dispatch(notificationsReceived(message.payload))
                break
              default:
                break
            }
          })
        } catch (error) {
          console.log(error)
        }

        await lifecycleApi.cacheEntryRemoved
        ws.close()
      },
    }),
  }),
})

export const { useGetNotificationsQuery } = apiSliceWithNotifications

const matchNotificationsReceived = isAnyOf(
  apiSliceWithNotifications.endpoints.getNotifications.matchFulfilled,
  notificationsReceived,
)

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    allNotificationsRead: (state) => {
      Object.values(state.entities).forEach((metadata) => {
        metadata.read = true
      })
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(matchNotificationsReceived, (state, action) => {
      const notificationsMetadata: NotificationMetadata[] = action.payload.map((notification) => ({
        id: notification.id,
        read: false,
        isNew: true,
      }))

      Object.values(state.entities).forEach((metadata) => {
        metadata.isNew = !metadata.read
      })

      metadataAdapter.upsertMany(state, notificationsMetadata)
    })
  },
})

export default notificationsSlice.reducer

export const { allNotificationsRead } = notificationsSlice.actions

export const selectNotificationsResult = apiSliceWithNotifications.endpoints.getNotifications.select()

const emptyNotifications: ServerNotification[] = []

export const selectNotificationsData = createSelector(
  selectNotificationsResult,
  (notificationResult) => notificationResult.data ?? emptyNotifications,
)

export const { selectAll: selectAllNotificationsMetadata, selectEntities: selectMetadataEntities } =
  metadataAdapter.getSelectors((state: RootState) => state.notifications)

export const selectUnreadNotificationsCount = (state: RootState) => {
  const allMetadata = selectAllNotificationsMetadata(state)
  const unreadNotifications = allMetadata.filter((notification) => !notification.read)
  return unreadNotifications.length
}
