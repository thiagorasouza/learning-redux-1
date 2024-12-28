import { RootState } from '@/app/store'
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

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

const initialReactions: Reactions = {
  thumbsUp: 0,
  tada: 0,
  heart: 0,
  rocket: 0,
  eyes: 0,
}

export type ReactionName = keyof Reactions

const initialState: Post[] = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!',
    user: '0',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: initialReactions,
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    user: '2',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: initialReactions,
  },
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
            date: new Date().toISOString(),
            reactions: initialReactions,
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
    reactionAdded(state, action: PayloadAction<{ postId: string; reaction: ReactionName }>) {
      const { postId, reaction } = action.payload
      const post = state.find((post) => post.id === postId)
      if (post && Reflect.has(post.reactions, reaction)) {
        post.reactions[reaction]++
      }
    },
  },
})

export default postsSlices.reducer

export const { postAdded, postUpdated, reactionAdded } = postsSlices.actions

export const selectAllPosts = (state: RootState) => state.posts
export const selectPostById = (state: RootState, postId: string) => state.posts.find((post) => post.id === postId)
