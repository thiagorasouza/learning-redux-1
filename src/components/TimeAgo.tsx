import { formatDistanceToNow, parseISO } from 'date-fns'

export const TimeAgo = ({ timestamp }: { timestamp: string }) => {
  let timeAgo = ''
  if (timestamp) {
    const date = parseISO(timestamp)
    const timePeriod = formatDistanceToNow(date)
    timeAgo = `${timePeriod} ago`
  }

  return (
    <time dateTime={timestamp} title={timestamp}>
      &nbsp;<i>{timeAgo}</i>
    </time>
  )
}
