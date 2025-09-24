import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import { setNotification } from "./notificationReducer"

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state
        .map(blog => (blog.id !== updatedBlog.id ? blog : updatedBlog))
        .sort((a, b) => b.likes - a.likes)
    },
    removeBlog(state, action) {
      const blogToRemove = action.payload
      return state.filter(blog => blog.id !== blogToRemove.id)
    },
  },
})

export const { setBlogs, appendBlog, updateBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = newBlog => {
  return async dispatch => {
    try {
      const returnedBlog = await blogService.create(newBlog)
      dispatch(appendBlog(returnedBlog.data))
      dispatch(
        setNotification(
          `Blog '${returnedBlog.data.title}' by ${returnedBlog.data.author} successfully added.`,
          "success"
        )
      )
    } catch (exception) {
      let exceptionMessage = "Unable to add blog"
      if (exception.response.data) {
        exceptionMessage = exception.response.data.error || exceptionMessage
      }

      dispatch(setNotification(exceptionMessage, "error"))
    }
  }
}

export const likeBlog = likedBlog => {
  return async dispatch => {
    try {
      const returnedBlog = await blogService.update(likedBlog)
      dispatch(updateBlog(returnedBlog))
      dispatch(
        setNotification(`Liked '${returnedBlog.title}' by ${returnedBlog.author}`, "success")
      )
    } catch (exception) {
      let exceptionMessage = "Could not like this blog"
      dispatch(setNotification(exceptionMessage, "error"))
    }
  }
}

export const deleteBlog = blogToDelete => {
  return async dispatch => {
    try {
      await blogService.remove(blogToDelete.id)
      dispatch(removeBlog(blogToDelete))
      dispatch(
        setNotification(
          `Blog '${blogToDelete.title}' by ${blogToDelete.author} successfully deleted`,
          "success"
        )
      )
    } catch (exception) {
      console.error("Removal failed: ", exception)
      let exceptionMessage = "Could not delete this blog"
      dispatch(setNotification(exceptionMessage), "error")
    }
  }
}

export const commentBlog = (blogId, text) => {
  return async dispatch => {
    try {
      const returnedBlog = await blogService.comment(blogId, text)
      dispatch(updateBlog(returnedBlog))
      dispatch(setNotification("Comment added", "success"))
    } catch (exception) {
      dispatch(setNotification("Could not add comment", "error"))
    }
  }
}

export default blogSlice.reducer
