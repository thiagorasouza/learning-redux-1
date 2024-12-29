import { useAppSelector } from '@/app/hooks'
import { selectAllUsers } from '@/features/users/usersSlice'
import { Link } from 'react-router-dom'

export const UsersList = () => {
  const users = useAppSelector(selectAllUsers)

  return (
    <section>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
