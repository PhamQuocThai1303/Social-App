import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useRefreshMutation } from './redux/actions/authAction'
import { useGetPostQuery } from './redux/actions/postAction'
import { useLazyGetNotifyQuery } from './redux/actions/notifyAction'
import { Link, useNavigate } from 'react-router-dom'
import { setSocket } from './redux/reducers/socketReducer'
import { io } from 'socket.io-client'

import Register from './pages/register'
import Login from './pages/login'
import Home from './pages/home'
import Posts from './components/home/Posts'
import Header from './components/header/Header'
import NotFound from './pages/NotFound'
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
import useAuth from './utils/useAuth'
import Alert from './components/alert/Alert'

function App() {

  const { user, token } = useSelector((state) => state.auth)
  const { status } = useSelector((state) => state.status)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [refresh] = useRefreshMutation()
  const firstLogin = localStorage.getItem("firstLogin")
  const { role, isAdmin } = useAuth()

  const { posts, isLoading } = useGetPostQuery({ id: user._id })
  const [getNotify] = useLazyGetNotifyQuery({ id: user._id })


  useEffect(() => {
    if (user._id) {
      getNotify({ id: user._id })
    }
  }, [user._id, user])

  useEffect(() => {
    if (firstLogin) {
      refresh()
      const socket = io('https://social-app-api.vercel.app',
        {
          transports: ['websocket', 'polling', 'flashsocket']
        }
      );
      // const socket = io('http://localhost:3500');
      dispatch(setSocket({ socket }))
      return () => socket.close()
    }
  }, [dispatch])

  return (
    <>
      {token && <Header isAdmin={isAdmin} />}
      {status && <StatusModal />}
      {token && <SocketClient />}
      <Alert />

      <Routes>

        <Route path="/register" element={<Register />} />
        <Route path="/" element={token ? <Home user={user} /> : <Login />} />


        {/* check role to enter in app */}
        {role &&
          <Route exact path='/' element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} role={role} />}>

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

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} role={role} />}>
              <Route
                path="/admin"
                element={<AdminPage />}
              />
            </Route>

          </Route>
        }
        <Route path="*" element={<NotFound />} />
      </Routes>

    </>
  )
}

export default App