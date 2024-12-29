import { useAppSelector } from '@/app/hooks'
import { selectUserById } from '@/features/users/usersSlice'

export const PostAuthor = ({ userId, showPrefix = true }: { userId: string; showPrefix?: boolean }) => {
  const author = useAppSelector((state) => selectUserById(state, userId))

  return (
    <span>
      {showPrefix ? 'by' : null} {author?.name || 'Unknown author'}
    </span>
  )
}
