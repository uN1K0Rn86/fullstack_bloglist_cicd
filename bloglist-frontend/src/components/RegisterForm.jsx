import { useState } from "react"
import { registerUser } from "../reducers/userReducer"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const RegisterForm = () => {
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRegister = async event => {
    event.preventDefault()
    const user = { username, name, password }
    dispatch(registerUser(user))
    setUsername("")
    setName("")
    setPassword("")
    navigate("/")
  }

  const formstyle = {
    display: "grid",
    gridTemplateColumns: "100px 150px",
    gap: "5px",
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister} style={formstyle}>
        <div>
          <label htmlFor='Username'>Username: </label>
        </div>
        <div>
          <input
            data-testid='username'
            type='text'
            value={username}
            id='Username'
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor='Name'>Name: </label>
        </div>
        <div>
          <input
            data-testid='name'
            type='text'
            value={name}
            id='Name'
            name='Name'
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          <label htmlFor='Password'>Password: </label>
        </div>
        <div>
          <input
            data-testid='password'
            type='password'
            value={password}
            id='Password'
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default RegisterForm
