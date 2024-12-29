import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { TimeAgo } from '@/components/TimeAgo'
import { allNotificationsRead, selectAllNotifications } from '@/features/notifications/notificationsSlice'
import { PostAuthor } from '@/features/posts/PostAuthor'
import classNames from 'classnames'
import { useEffect, useLayoutEffect } from 'react'

export const NotificationsList = () => {
  const notifications = useAppSelector(selectAllNotifications)
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {notifications.map((notification) => (
        <div key={notification.id} className={classNames('notification', { new: notification.isNew })}>
          <div>
            <b>
              <PostAuthor userId={notification.user} showPrefix={false} />
            </b>{' '}
            {notification.message}
          </div>
          <TimeAgo timestamp={notification.date} />
        </div>
      ))}
    </section>
  )
}
