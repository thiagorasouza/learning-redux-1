import { useAppSelector } from '@/app/hooks'
import { TimeAgo } from '@/components/TimeAgo'
import { selectCurrentUsername } from '@/features/auth/authSlice'
import { PostAuthor } from '@/features/posts/PostAuthor'
import { selectPostById } from '@/features/posts/postsSlice'
import { ReactionButtons } from '@/features/posts/ReactionButtons'
import { Link, useParams } from 'react-router-dom'

export const SinglePostPage = () => {
  const { postId } = useParams()

  const post = useAppSelector((state) => selectPostById(state, postId!))
  const currentUsername = useAppSelector(selectCurrentUsername)

  if (!post) {
    return (
      <section>
        <h2>Post not found.</h2>
      </section>
    )
  }

  const canEdit = currentUsername === post.user

  return (
    <section>
      <article>
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <p>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </p>
        <p>
          <ReactionButtons post={post} />
        </p>
        {canEdit && <Link to={`/posts/${post.id}/edit`}>Edit Post</Link>}
      </article>
    </section>
  )
}
