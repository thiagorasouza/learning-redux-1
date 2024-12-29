import { useAppSelector } from '@/app/hooks'
import { selectPostsByUser } from '@/features/posts/postsSlice'
import { selectUserById } from '@/features/users/usersSlice'
import { Link, useParams } from 'react-router-dom'

export const UserPage = () => {
  const { userId } = useParams()
  const user = useAppSelector((state) => selectUserById(state, userId!))
  if (!user) {
    return (
      <section>
        <h2>User not found</h2>
      </section>
    )
  }

  const posts = useAppSelector((state) => selectPostsByUser(state, user.id))

  return (
    <section>
      <h2>{user.name}</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
