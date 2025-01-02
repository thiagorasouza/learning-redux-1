import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { RootState } from '@/app/store'
import { Spinner } from '@/components/Spinner'
import { TimeAgo } from '@/components/TimeAgo'
import { PostAuthor } from '@/features/posts/PostAuthor'
import {
  fetchPosts,
  selectPostById,
  selectPostsError,
  selectPostsIds,
  selectPostsStatus,
} from '@/features/posts/postsSlice'
import { ReactionButtons } from '@/features/posts/ReactionButtons'
import { ReactNode, useEffect } from 'react'
import { Link } from 'react-router-dom'

export const PostExcerpt = ({ postId }: { postId: string }) => {
  const post = useAppSelector((state: RootState) => selectPostById(state, postId))
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <p>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </p>
      <p>
        <ReactionButtons post={post} />
      </p>
    </article>
  )
}

export const PostsList = () => {
  const orderedIds = useAppSelector(selectPostsIds)
  const postsStatus = useAppSelector(selectPostsStatus)
  const postsError = useAppSelector(selectPostsError)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [dispatch, postsStatus, fetchPosts])

  if (postsStatus === 'pending') {
    return <Spinner text="Loading..." />
  }

  let content: ReactNode

  if (postsStatus === 'succeeded') {
    content = orderedIds.map((postId) => <PostExcerpt postId={postId} key={postId} />)
  } else if (postsStatus === 'failed') {
    content = <div>{postsError}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
