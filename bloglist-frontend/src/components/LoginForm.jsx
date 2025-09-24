import { useState } from "react"
import { useDispatch } from "react-redux"
import { loginUser } from "../reducers/userReducer"
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async event => {
    event.preventDefault()
    dispatch(loginUser(username, password))
    setUsername("")
    setPassword("")
  }

  const formstyle = {
    display: "grid",
    gridTemplateColumns: "100px 150px",
    gap: "5px",
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={formstyle}>
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
        <button type='submit'>Login</button>
        <button type='button' onClick={() => navigate("/register")}>
          Register
        </button>
      </form>
    </div>
  )
}

export default LoginForm
