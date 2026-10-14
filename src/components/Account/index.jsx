import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const Account = () => {
  const navigate = useNavigate()

  const username = localStorage.getItem('username') ?? ''
  const password = localStorage.getItem('password') ?? ''
  const maskedPassword = '*'.repeat(password.length)

  const onClickLogout = () => {
    Cookies.remove('jwt_token', {path: '/'})
    localStorage.removeItem('username')
    localStorage.removeItem('password')
    navigate('/login', {replace: true})
  }

  return (
    <div className="page-container">
      <Header />
      <main className="page-content account-route content-wrapper">
        <h1 className="account-heading">Account</h1>
        <div className="account-card">
          <div className="account-row">
            <p className="account-label">Member ship</p>
            <div className="account-value-container">
              <p className="account-value">{username}</p>
              <p className="account-password">Password</p>
              <p className="masked-password">{maskedPassword}</p>
            </div>
          </div>

          <div className="account-row">
            <p className="account-label">Plan details </p>
            <div className="account-value-container">
              <div className="plan-details">
                <p className="account-value">Premium</p>
                <p className="plan-badge">Ultra HD</p>
              </div>
            </div>
          </div>
        </div>

        <button className="logout-button" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </main>
      <Footer />
    </div>
  )
}

export default Account
