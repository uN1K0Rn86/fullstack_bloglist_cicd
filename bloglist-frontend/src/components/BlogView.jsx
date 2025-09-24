import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { likeBlog, commentBlog, deleteBlog } from "../reducers/blogReducer"

const BlogView = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  if (!user) return <div>Loading user...</div>
  if (!blogs.length) return <div>Loading blogs...</div>
  const blog = blogs.find(blog => blog.id === id)

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

  const handleAddComment = event => {
    event.preventDefault()
    const text = event.target.comment.value
    dispatch(commentBlog(blog.id, text))
    event.target.comment.value = ""
  }

  const formstyle = {
    display: "flex",
    gap: "10px",
  }

  if (!blog) return <div>Loading...</div>

  const owner = blog.user
  const isOwner = owner ? user.username === owner.username : false

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <Link to={blog.url}>{blog.url}</Link>
      </div>
      <div>
        {blog.likes} likes
        <button type='submit' onClick={handleLike} style={{ marginLeft: "8px" }}>
          Like
        </button>
        {isOwner && (
          <>
            <button type='submit' onClick={removeBlog} style={{ marginLeft: "8px" }}>
              Remove
            </button>
          </>
        )}
      </div>
      {blog.user && (
        <div>
          Added by <Link to={`/users/${blog.user.id}`}>{blog.user.username}</Link>
        </div>
      )}
      <div>
        <h3>Comments</h3>
        <form onSubmit={handleAddComment} style={formstyle}>
          <input type='text' name='comment'></input>
          <button type='submit'>Comment</button>
        </form>
        <ul>
          {blog.comments.map(c => (
            <li key={c.id}>{c.text}</li>
          ))}
        </ul>
      </div>
      <div>
        <Link to='/'>Front page</Link>
      </div>
    </div>
  )
}

export default BlogView
