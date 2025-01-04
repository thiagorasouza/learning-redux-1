import { AppStartListening } from '@/app/listenerMiddleware'
import { apiSlice } from '@/features/api/apiSlice'
import { EntityState } from '@reduxjs/toolkit'

export interface PostsState extends EntityState<Post, string> {
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

export type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>

export type NewPost = Pick<Post, 'title' | 'content' | 'user'>

export type ReactionName = keyof Reactions

export const addPostsListeners = (startAppListening: AppStartListening) => {
  startAppListening({
    matcher: apiSlice.endpoints.addNewPost.matchFulfilled,
    effect: async (action, listenerApi) => {
      const { toast } = await import('react-tiny-toast')

      const toastId = toast.show('New post added!', {
        variant: 'success',
        position: 'bottom-right',
        pause: true,
      })

      await listenerApi.delay(4000)
      toast.remove(toastId)
    },
  })
}
