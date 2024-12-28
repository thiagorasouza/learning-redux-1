import { useAppSelector } from '@/app/hooks'
import { TimeAgo } from '@/components/TimeAgo'
import { PostAuthor } from '@/features/posts/PostAuthor'
import { selectAllPosts } from '@/features/posts/postsSlice'
import { ReactionButtons } from '@/features/posts/ReactionButtons'
import { Link } from 'react-router-dom'

export const PostsList = () => {
  const posts = useAppSelector(selectAllPosts)
  const orderedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {orderedPosts.map((post) => (
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
      ))}
    </section>
  )
}
