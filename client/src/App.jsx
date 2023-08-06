import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useRefreshMutation } from './redux/actions/authAction'

import Register from './pages/register'
import Login from './pages/login'
import Home from './pages/home'
import Profile from './pages/profile'
import Post from './pages/post'

import Alert from './components/alert/Alert'

function App() {

  const { user, token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [refresh] = useRefreshMutation()
  const firstLogin = localStorage.getItem("firstLogin")

  useEffect(() => {
    if (token !== null) {
      localStorage.setItem("firstLogin", true)
    }
    else {
      localStorage.setItem("firstLogin", false)
    }
  }, [token])

  useEffect(() => {
    if (firstLogin) {
      refresh()
    }
  }, [])

  return (
    <div>

      <Alert />

      <Routes>
        <Route exact path="/" element={token ? <Home /> : <Login />} />
        <Route exact path="/register" element={<Register />} />

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