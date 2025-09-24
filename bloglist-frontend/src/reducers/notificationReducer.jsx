import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  message: "",
  type: "",
}

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessage(state, action) {
      state.message = action.payload.message
      state.type = action.payload.type
    },
    clearNotification(state) {
      state.message = ""
      state.type = ""
    },
  },
})

export const { setMessage, clearNotification } = notificationSlice.actions

export const setNotification = (message, type, seconds = 5) => {
  return async dispatch => {
    dispatch(setMessage({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
