import PropTypes from "prop-types"
import { useSelector } from "react-redux"

const Notification = () => {
  const { message, type } = useSelector(state => state.notification)

  if (message === "") {
    return null
  }

  return <div className={type === "success" ? "notification" : "error"}>{message}</div>
}

Notification.propTypes = {
  message: PropTypes.string,
}

export default Notification
