import { client } from '@/api/client'
import { RootState } from '@/app/store'
import { createAppAsyncThunk } from '@/app/withTypes'
import { logout } from '@/features/auth/authSlice'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface PostsState {
  posts: Post[]
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
}

export interface Reactions {
  thumbsUp: number
  tada: number
  heart: number
  rocket: number
  eyes: number
}

export interface Post {
  id: string
  title: string
  content: string
  user: string
  date: string
  reactions: Reactions
}

type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>

type NewPost = Pick<Post, 'title' | 'content' | 'user'>

const initialReactions: Reactions = {
  thumbsUp: 0,
  tada: 0,
  heart: 0,
  rocket: 0,
  eyes: 0,
}

export type ReactionName = keyof Reactions

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null,
}

export const fetchPosts = createAppAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await client.get<Post[]>('/fakeApi/posts')
    return response.data
  },
  {
    condition(arg, thunkApi) {
      const postStatus = selectPostsStatus(thunkApi.getState())
      if (postStatus !== 'idle') {
        return false
      }
    },
  },
)

export const addNewPost = createAppAsyncThunk('posts/addNewPost', async (initialPost: NewPost) => {
  const response = await client.post<Post>('/fakeApi/posts', initialPost)
  return response.data
})

const postsSlices = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postUpdated(state, action: PayloadAction<PostUpdate>) {
      const existingPost = state.posts.find((post) => post.id === action.payload.id)
      if (existingPost) {
        existingPost.title = action.payload.title
        existingPost.content = action.payload.content
      }
    },
    reactionAdded(state, action: PayloadAction<{ postId: string; reaction: ReactionName }>) {
      const { postId, reaction } = action.payload
      const post = state.posts.find((post) => post.id === postId)
      if (post && Reflect.has(post.reactions, reaction)) {
        post.reactions[reaction]++
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        return initialState
      })
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts.push(...action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unknown Error'
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload)
      })
  },
})

export default postsSlices.reducer

export const { postUpdated, reactionAdded } = postsSlices.actions

export const selectAllPosts = (state: RootState) => state.posts.posts
export const selectPostById = (state: RootState, postId: string) => state.posts.posts.find((post) => post.id === postId)
// export const selectPostsByUser = (state: RootState, user: string) => {
//   const allPosts = selectAllPosts(state)
//   return allPosts.filter((post) => post.user === user)
// }

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state: RootState, userId: string) => userId],
  (allPosts, userId) => allPosts.filter((post) => post.user === userId),
)

export const selectPostsStatus = (state: RootState) => state.posts.status
export const selectPostsError = (state: RootState) => state.posts.error
