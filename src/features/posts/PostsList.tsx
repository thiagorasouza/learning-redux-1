import { Spinner } from '@/components/Spinner'
import { TimeAgo } from '@/components/TimeAgo'
import { useGetPostsQuery } from '@/features/api/apiSlice'
import { PostAuthor } from '@/features/posts/PostAuthor'
import { Post } from '@/features/posts/postsSlice'
import { ReactionButtons } from '@/features/posts/ReactionButtons'
import { ReactNode, useMemo } from 'react'
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
  const { data: posts = [], isLoading, isSuccess, isError, error } = useGetPostsQuery()

  const sortedPosts = useMemo(() => [...posts].sort((a, b) => b.date.localeCompare(a.date)), [posts])

  let content: ReactNode

  if (isLoading) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    content = sortedPosts.map((post) => <PostExcerpt post={post} key={post.id} />)
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
