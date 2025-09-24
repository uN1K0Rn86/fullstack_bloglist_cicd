import { useSelector, useDispatch } from "react-redux"
import { setUser } from "../reducers/userReducer"
import { setNotification } from "../reducers/notificationReducer"
import { useNavigate } from "react-router-dom"

const User = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const navigate = useNavigate()

  const handleLogout = async event => {
    event.preventDefault()

    const loggedOutUserJSON = window.localStorage.getItem("loggedBlogappUser")
    const loggedOutUser = JSON.parse(loggedOutUserJSON)

    window.localStorage.removeItem("loggedBlogappUser")

    dispatch(setUser(null))
    dispatch(setNotification(`${loggedOutUser.username} successfully logged out`, "success"))
    navigate("/")
  }

  if (!user) {
    return null
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
      {user.name} logged in
      <form onSubmit={handleLogout}>
        <button type='submit'>Logout</button>
      </form>
    </div>
  )
}

export default User
