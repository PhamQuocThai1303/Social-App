import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Register from './pages/register'
import Login from './pages/login'
import Home from './pages/home'
import Profile from './pages/profile'
import Post from './pages/post'

function App() {
  return (
    <div>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          // element={isAuth ? <Home /> : <Navigate to="/" />}
          element={<Home />}
        />
        <Route
          path="/profile/:userId"
          // element={isAuth ? <Profile /> : <Navigate to="/" />}
          element={<Profile />}
        />
        <Route
          path="/post/:postId"
          // element={isAuth ? <Post /> : <Navigate to="/" />}
          element={<Post />}
        />
      </Routes>
    </div>
  )
}

export default App