import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useRefreshMutation } from './redux/actions/authAction'
import { useGetPostQuery } from './redux/actions/postAction'
import { Navigate } from 'react-router-dom'

import Register from './pages/register'
import Login from './pages/login'
import Home from './pages/home'
// import Post from './pages/post'
import Posts from './components/home/Posts'
import Header from './components/header/Header'
import NotFound from './pages/notFound'
import Message from './pages/message/message'
import Discover from './pages/discover'
import Profile from './pages/profile/[id]'
import Post from './pages/post/[id]'
import StatusModal from './components/StatusModal'

import PrivateRouter from './redux/actions/PrivateRouter'
import Alert from './components/alert/Alert'

function App() {

  const { user, token } = useSelector((state) => state.auth)
  const { status } = useSelector((state) => state.status)
  const dispatch = useDispatch()
  const [refresh] = useRefreshMutation()
  const firstLogin = localStorage.getItem("firstLogin")

  const { posts, isLoading } = useGetPostQuery({ id: user._id })

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
    <>
      {token && <Header />}
      {status && <StatusModal />}
      <Alert />

      <Routes>
        <Route path="/" element={token ? <Home /> : <Login />} />
        <Route path="/register" element={<Register />} />

        <Route exact path='/' element={<PrivateRouter />}>

          <Route path='/message' element={<Message />} />
          <Route path='/discover' element={<Discover />} />
          <Route
            path="/profile/:userId"
            element={<Profile />}
          />
          <Route
            path="/post/:postId"
            element={<Post />}
          />
          <Route path="*" element={<NotFound />} />

        </Route>
      </Routes>

    </>
  )
}

export default App