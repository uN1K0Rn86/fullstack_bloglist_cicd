import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Routes, Route } from "react-router-dom"

import NavBar from "./components/NavBar"
import Togglable from "./components/Togglable"
import BlogList from "./components/BlogList"
import LoginForm from "./components/LoginForm"
import AddBlogForm from "./components/AddBlogForm"
import Notification from "./components/Notification"
import blogService from "./services/blogs"
import UsersView from "./components/UsersView"
import UserView from "./components/UserView"
import BlogView from "./components/BlogView"
import RegisterForm from "./components/RegisterForm"

import { initializeBlogs } from "./reducers/blogReducer"
import { setUser } from "./reducers/userReducer"
import { initializeUsers } from "./reducers/usersReducer"
import "./index.css"

const App = () => {
  const user = useSelector(state => state.user)
  const formRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const users = useSelector(state => state.users)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedUser))
      blogService.setToken(loggedUser.token)
    }
  }, [dispatch])

  return (
    <div className='container'>
      <Notification />
      <NavBar />

      <Routes>
        <Route
          path='/'
          element={
            user ? (
              <div>
                <h2>Blogs</h2>
                <br />
                <div>
                  <Togglable buttonLabel='Add New Blog' ref={formRef}>
                    <AddBlogForm formRef={formRef} />
                  </Togglable>
                  <br />
                  <BlogList />
                </div>
              </div>
            ) : (
              <LoginForm />
            )
          }
        />
        <Route path='/users' element={<UsersView />} />
        <Route path='/users/:id' element={<UserView />} />
        <Route path='/blogs/:id' element={<BlogView />} />
        <Route path='/register' element={<RegisterForm />} />
      </Routes>
    </div>
  )
}

export default App
