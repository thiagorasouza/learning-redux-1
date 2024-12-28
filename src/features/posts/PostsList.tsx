import { useAppSelector } from '@/app/hooks'
import { PostAuthor } from '@/features/posts/PostAuthor'
import { selectAllPosts } from '@/features/posts/postsSlice'
import { Link } from 'react-router-dom'

export const PostsList = () => {
  const posts = useAppSelector(selectAllPosts)

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {posts.map((post) => (
        <article className="post-excerpt" key={post.id}>
          <h3>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </h3>
          <p className="post-content">{post.content.substring(0, 100)}</p>
          <p>
            <PostAuthor userId={post.user} />
          </p>
        </article>
      ))}
    </section>
  )
}
