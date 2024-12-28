import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Post {
  id: string
  title: string
  content: string
}

const initialState: Post[] = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' },
]

const postsSlices = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded(state, action: PayloadAction<Post>) {
      state.push(action.payload)
    },
    postUpdated(state, action: PayloadAction<Post>) {
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
