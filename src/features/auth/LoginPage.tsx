import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { userLoggedIn } from '@/features/auth/authSlice'
import { selectAllUsers } from '@/features/users/usersSlice'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface LoginPageFormFields extends HTMLFormControlsCollection {
  username: HTMLSelectElement
}

interface LoginPageElements extends HTMLFormElement {
  readonly elements: LoginPageFormFields
}

export const LoginPage = () => {
  const users = useAppSelector(selectAllUsers)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<LoginPageElements>) => {
    e.preventDefault()

    const { elements } = e.currentTarget
    const username = elements.username.value

    dispatch(userLoggedIn(username))
    navigate('/posts')
  }

  return (
    <section>
      <h2>Welcome to Socialy</h2>
      <p>Please login:</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <select name="username" id="username">
          <option value=""></option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <button>Login</button>
      </form>
    </section>
  )
}
