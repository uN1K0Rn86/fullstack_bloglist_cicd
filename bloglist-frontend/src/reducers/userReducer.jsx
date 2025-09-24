import { createSlice } from "@reduxjs/toolkit"
import { setNotification } from "./notificationReducer"
import loginService from "../services/login"
import blogService from "../services/blogs"
import usersService from "../services/users"

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      blogService.setToken(user.token)

      dispatch(setUser(user))
      dispatch(setNotification(`${user.username} successfully logged in`, "success"))
    } catch (exception) {
      dispatch(setNotification("Incorrect username or password", "error"))
    }
  }
}

export const registerUser = user => {
  return async dispatch => {
    try {
      const createdUser = await usersService.create(user)
      console.log(createdUser)
      if (createdUser) {
        dispatch(setNotification(`User ${user.username} successfully created`, "success"))
      }
    } catch (exception) {
      dispatch(setNotification(exception, "error"))
    }
  }
}

export default userSlice.reducer
