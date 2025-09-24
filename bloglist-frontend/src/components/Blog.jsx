import PropTypes from "prop-types"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { likeBlog, deleteBlog } from "../reducers/blogReducer"
import { Link } from "react-router-dom"

const Blog = ({ blog }) => {
  const [showInfo, setShowInfo] = useState(false)

  const dispatch = useDispatch()
  const username = useSelector(state => state.user.username)

  const infoShown = { display: showInfo ? "" : "none" }
  const infoHidden = { display: showInfo ? "none" : "" }

  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }

  const handleLike = () => {
    const likedBlog = { ...blog }
    likedBlog.likes = blog.likes + 1
    dispatch(likeBlog(likedBlog))
  }

  const removeBlog = () => {
    if (window.confirm(`Delete '${blog.title}' by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
    }
  }

  const user = blog.user

  const isOwner = user ? username === user.username : false

  return (
    <>
      <tr style={infoHidden}>
        <td>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </td>
        <td>{blog.author}</td>
        <td>
          <button type='submit' onClick={toggleInfo}>
            Show More
          </button>
          <br />
        </td>
      </tr>
      <tr style={infoShown}>
        <td>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          <br />
          {blog.url}
          <br />
          <span>Likes: {blog.likes} </span>
          <button type='submit' onClick={handleLike}>
            Like
          </button>
          <br />
          {user?.username || "User not found"}
        </td>
        <td>{blog.author}</td>
        <td>
          <button type='submit' onClick={toggleInfo}>
            Show Less
          </button>
          <br />
          {isOwner && (
            <>
              <br />
              <button type='submit' onClick={removeBlog}>
                Remove
              </button>
            </>
          )}
        </td>
      </tr>
    </>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
