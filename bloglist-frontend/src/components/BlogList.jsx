import { useSelector } from "react-redux"
import Blog from "./Blog"
import { Table } from "react-bootstrap"

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  const columnStyle = {
    minWidth: "250px",
  }

  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th style={columnStyle}>Info</th>
            <th>Author</th>
            <th>Functions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList
