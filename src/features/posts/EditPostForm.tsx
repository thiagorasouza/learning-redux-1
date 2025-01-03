import { useEditPostMutation, useGetPostQuery } from '@/features/api/apiSlice'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

interface EditPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
}

interface EditPostFormElements extends HTMLFormElement {
  readonly elements: EditPostFormFields
}

export const EditPostForm = () => {
  const { postId } = useParams()
  const navigate = useNavigate()

  const { data: post } = useGetPostQuery(postId!)
  const [editPost] = useEditPostMutation()

  if (!post) {
    return (
      <section>
        <h2>Post not found.</h2>
      </section>
    )
  }

  const handleSubmit = async (e: React.FormEvent<EditPostFormElements>) => {
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value

    if (title && content) {
      await editPost({ id: post.id, title, content })
      navigate(`/posts/${post.id}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" name="postTitle" id="postTitle" defaultValue={post.title} />
        <label htmlFor="postContent">Content:</label>
        <textarea name="postContent" id="postContent">
          {post.content}
        </textarea>
        <button>Save</button>
      </form>
    </section>
  )
}
