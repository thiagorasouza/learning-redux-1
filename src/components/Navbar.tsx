import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { UserIcon } from '@/components/UserIcon'
import { logout } from '@/features/auth/authSlice'
import { selectCurrentUser } from '@/features/users/usersSlice'
import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  const user = useAppSelector(selectCurrentUser)
  const dispatch = useAppDispatch()
  const isLoggedIn = !!user

  const onLogoutClick = async () => {
    await dispatch(logout())
  }

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        {isLoggedIn && (
          <div className="navContent">
            <div className="navLinks">
              <Link to="/posts">Posts</Link>
              <Link to="/users">Users</Link>
            </div>
            <div className="userDetails">
              <UserIcon size={32} />
              {user.name}
              <button className="button small" onClick={onLogoutClick}>
                Logout
              </button>
            </div>
          </div>
        )}
      </section>
    </nav>
  )
}
