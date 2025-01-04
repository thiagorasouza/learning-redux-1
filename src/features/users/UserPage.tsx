import { useAppSelector } from '@/app/hooks'
import { Post, useGetPostsQuery } from '@/features/api/apiSlice'
import { selectUserById } from '@/features/users/usersSlice'
import { createSelector } from '@reduxjs/toolkit'
import { TypedUseQueryStateResult } from '@reduxjs/toolkit/query/react'
import { Link, useParams } from 'react-router-dom'

type Result = TypedUseQueryStateResult<Post[], any, any>

export const selectPostsForUser = createSelector(
  (result: Result) => result.data,
  (result: Result, userId: string) => userId,
  (posts, userId) => posts?.filter((post) => post.user === userId),
)

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

  const { postsForUser } = useGetPostsQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      postsForUser: selectPostsForUser(result, userId!),
    }),
  })

  return (
    <section>
      <h2>{user.name}</h2>
      <ul>
        {postsForUser?.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
