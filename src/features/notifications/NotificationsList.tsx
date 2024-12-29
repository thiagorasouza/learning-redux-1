import { useAppSelector } from '@/app/hooks'
import { TimeAgo } from '@/components/TimeAgo'
import { selectAllNotifications } from '@/features/notifications/notificationsSlice'
import { PostAuthor } from '@/features/posts/PostAuthor'

export const NotificationsList = () => {
  const notifications = useAppSelector(selectAllNotifications)

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {notifications.map((notification) => (
        <div key={notification.id} className="notification">
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
