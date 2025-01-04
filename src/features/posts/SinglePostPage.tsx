import { useAppSelector } from '@/app/hooks'
import { Spinner } from '@/components/Spinner'
import { TimeAgo } from '@/components/TimeAgo'
import { useGetPostQuery } from '@/features/api/apiSlice'
import { selectCurrentUsername } from '@/features/auth/authSlice'
import { PostAuthor } from '@/features/posts/PostAuthor'
import { selectPostById } from '@/features/posts/postsSlice'
import { ReactionButtons } from '@/features/posts/ReactionButtons'
import { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'

export const SinglePostPage = () => {
  const { postId } = useParams()
  const { data: post, isFetching, isError, isSuccess } = useGetPostQuery(postId!)

  const currentUsername = useAppSelector(selectCurrentUsername)

  const canEdit = currentUsername === post?.user

  let content: ReactNode

  if (isFetching) {
    content = <Spinner text="Loading..." />
  } else if (isError) {
    content = <h2>Post not found.</h2>
  } else if (isSuccess) {
    content = (
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

  return <section>{content}</section>
}
