import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { PostsMainPage } from '@/features/posts/PostsMainPage'
import { SinglePostPage } from '@/features/posts/SinglePostPage'
import { EditPostForm } from '@/features/posts/EditPostForm'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<PostsMainPage />} />
          <Route path="/posts/:postId" element={<SinglePostPage />} />
          <Route path="/posts/:postId/edit" element={<EditPostForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
