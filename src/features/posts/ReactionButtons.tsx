import { useAppDispatch } from '@/app/hooks'
import { Post, reactionAdded, ReactionName } from '@/features/posts/postsSlice'

const reactionEmoji: Record<ReactionName, string> = {
  thumbsUp: '👍',
  tada: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

export const ReactionButtons = ({ post }: { post: Post }) => {
  const dispatch = useAppDispatch()

  const handleClick = (reaction: ReactionName) => {
    dispatch(reactionAdded({ postId: post.id, reaction }))
  }

  return (
    <div>
      {Object.entries(reactionEmoji).map(([reaction, emoji]) => (
        <button
          type="button"
          className="muted-button reaction-button"
          key={reaction}
          onClick={() => handleClick(reaction as ReactionName)}
        >
          {emoji} {post.reactions[reaction as ReactionName]}
        </button>
      ))}
    </div>
  )
}
