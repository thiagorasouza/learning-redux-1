import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { PostsMainPage } from '@/features/posts/PostsMainPage'
import { SinglePostPage } from '@/features/posts/SinglePostPage'
import { EditPostForm } from '@/features/posts/EditPostForm'
import { LoginPage } from '@/features/auth/LoginPage'
import { useAppSelector } from '@/app/hooks'
import { selectCurrentUsername } from '@/features/auth/authSlice'
import { ReactNode } from 'react'
import { UsersList } from '@/features/users/UsersList'
import { UserPage } from '@/features/users/UserPage'
import { NotificationsList } from '@/features/notifications/NotificationsList'
import { ToastContainer } from 'react-tiny-toast'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const username = useAppSelector(selectCurrentUsername)

  if (!username) {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/posts" element={<PostsMainPage />} />
                  <Route path="/posts/:postId" element={<SinglePostPage />} />
                  <Route path="/posts/:postId/edit" element={<EditPostForm />} />
                  <Route path="/users" element={<UsersList />} />
                  <Route path="/users/:userId" element={<UserPage />} />
                  <Route path="/notifications" element={<NotificationsList />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  )
}

export default App
