import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useRefreshMutation } from './redux/actions/authAction'
import { useGetPostQuery } from './redux/actions/postAction'
import { useLazyGetNotifyQuery } from './redux/actions/notifyAction'
import { Navigate } from 'react-router-dom'
import { setSocket } from './redux/reducers/socketReducer'
import { io } from 'socket.io-client'

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
import Conversation from './pages/message/[id]'
import StatusModal from './components/StatusModal'
import Loading from './components/alert/Loading'
import AdminPage from './pages/admin'
import SocketClient from './SocketClient'

import { ROLES } from './utils/config'
import RequireAuth from './redux/actions/RequireAuth'
import PrivateRouter from './redux/actions/PrivateRouter'
import Alert from './components/alert/Alert'

function App() {

  const { user, token } = useSelector((state) => state.auth)
  const { status } = useSelector((state) => state.status)
  const dispatch = useDispatch()
  const [refresh] = useRefreshMutation()
  const firstLogin = localStorage.getItem("firstLogin")

  const { posts, isLoading } = useGetPostQuery({ id: user._id })
  const [getNotify] = useLazyGetNotifyQuery({ id: user._id })


  useEffect(() => {
    if (token !== null) {
      localStorage.setItem("firstLogin", true)
    }
    else {
      localStorage.setItem("firstLogin", false)
    }
  }, [token])

  useEffect(() => {
    if (user._id) {
      getNotify({ id: user._id })
    }
  }, [user._id, user])

  useEffect(() => {
    if (firstLogin) {
      refresh()
      const socket = io("http://localhost:3500");
      // console.log(socket);
      dispatch(setSocket({ socket }))
      return () => socket.close()
    }
  }, [])

  return (
    <>
      {token && <Header />}
      {status && <StatusModal />}
      {token && <SocketClient />}
      <Alert />

      <Routes>
        <Route path="/" element={token ? <Home user={user} /> : <Login />} />
        <Route path="/register" element={<Register />} />

        {/* check role to enter in app */}
        <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
          <Route exact path='/' element={<PrivateRouter />}>

            <Route path='/message' element={<Message />} />
            <Route path='/discover' element={user?._id ? <Discover userId={user?._id} /> : <Loading />} />
            <Route
              path="/profile/:userId"
              element={<Profile />}
            />
            <Route
              path="/post/:postId"
              element={<Post />}
            />
            <Route
              path="/message/:userId"
              element={<Conversation />}
            />

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route
                path="/admin"
                element={<AdminPage />}
              />
            </Route>
            <Route path="*" element={<NotFound />} />

          </Route>
        </Route>
      </Routes>

    </>
  )
}

export default App