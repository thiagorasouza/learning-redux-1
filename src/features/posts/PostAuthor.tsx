import { useAppSelector } from '@/app/hooks'
import { selectUserById } from '@/features/users/usersSlice'

export const PostAuthor = ({ userId }: { userId: string }) => {
  const author = useAppSelector((state) => selectUserById(state, userId))

  return <span>by {author?.name || 'Unknown author'}</span>
}
