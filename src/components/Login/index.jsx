import {useState} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

import {loginApiUrl} from '../endpoints'

import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const onChangeUsername = event => setUsername(event.target.value)

  const onChangePassword = event => setPassword(event.target.value)

  const onSubmitForm = async event => {
    event.preventDefault()
    setErrorMsg('')
    setIsSubmitting(true)

    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(loginApiUrl, options)
      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('username', username)
        localStorage.setItem('password', password)
        Cookies.set('jwt_token', data.jwt_token, {expires: 30, path: '/'})
        setIsSubmitting(false)
        navigate('/', {replace: true})
        return
      }

      setErrorMsg(data.error_msg)
      setIsSubmitting(false)
    } catch {
      setErrorMsg('Something went wrong. Please try again')
      setIsSubmitting(false)
    }
  }

  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="login-route">
      <div className="login-backdrop" />
      <div className="login-content">
        <form className="login-form" onSubmit={onSubmitForm}>
          <img
            className="login-logo"
            src="/prime-video-logo.svg"
            alt="login website logo"
          />
          <h1 className="login-heading">Sign in</h1>
          <p className="login-subheading">
            Watch thousands of movies and originals, anywhere you go.
          </p>

          <div className="input-group">
            <label className="input-label" htmlFor="username">
              USERNAME
            </label>
            <input
              className="login-input"
              type="text"
              id="username"
              value={username}
              onChange={onChangeUsername}
              placeholder="Enter your username"
              autoComplete="username"
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="login-input"
              type="password"
              id="password"
              value={password}
              onChange={onChangePassword}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          {errorMsg !== '' && <p className="login-error-message">{errorMsg}</p>}

          <button
            className="login-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Login'}
          </button>

          <p className="login-terms">
            By signing in you agree to the Terms of Use and Privacy Notice.
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
