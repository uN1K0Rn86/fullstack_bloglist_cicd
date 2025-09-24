import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"

const UsersView = () => {
  const users = useSelector(state => state.users)

  const columnStyle = {
    minWidth: "250px",
  }

  return (
    <div>
      <h2>Users</h2>
      <div>
        <Table striped>
          <thead>
            <tr>
              <th style={columnStyle}>Username</th>
              <th>Name</th>
              <th>Blogs Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </td>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default UsersView
