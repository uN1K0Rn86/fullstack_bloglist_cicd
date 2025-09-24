import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

const UserView = () => {
  const id = useParams().id
  const users = useSelector(state => state.users)
  const user = users.find(user => user.id === id)

  if (!user) return <div>Loading user...</div>

  return (
    <div>
      <h2>{user.username}</h2>
      <div>Name: {user.name}</div>
      <h3>Added Blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserView
