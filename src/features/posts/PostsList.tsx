import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { Spinner } from '@/components/Spinner'
import { TimeAgo } from '@/components/TimeAgo'
import { PostAuthor } from '@/features/posts/PostAuthor'
import { fetchPosts, Post, selectAllPosts, selectPostsError, selectPostsStatus } from '@/features/posts/postsSlice'
import { ReactionButtons } from '@/features/posts/ReactionButtons'
import { ReactNode, useEffect } from 'react'
import { Link } from 'react-router-dom'

export const PostExcerpt = ({ post }: { post: Post }) => {
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
  const posts = useAppSelector(selectAllPosts)
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
    const orderedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date))
    content = orderedPosts.map((post) => <PostExcerpt post={post} />)
  } else if (postsStatus === 'failed') {
    content = <div>postsError</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
    </section>
  )
}
