import { RootState } from '@/app/store'
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

export interface Post {
  id: string
  title: string
  content: string
  user: string
}

type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>

const initialState: Post[] = [
  { id: '1', title: 'First Post!', content: 'Hello!', user: '0' },
  { id: '2', title: 'Second Post', content: 'More text', user: '2' },
]

const postsSlices = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      prepare(title: string, content: string, userId: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId,
          },
        }
      },
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload)
      },
    },
    postUpdated(state, action: PayloadAction<PostUpdate>) {
      const existingPost = state.find((post) => post.id === action.payload.id)
      if (existingPost) {
        existingPost.title = action.payload.title
        existingPost.content = action.payload.content
      }
    },
  },
})

export default postsSlices.reducer

export const { postAdded, postUpdated } = postsSlices.actions

export const selectAllPosts = (state: RootState) => state.posts
export const selectPostById = (state: RootState, postId: string) => state.posts.find((post) => post.id === postId)
