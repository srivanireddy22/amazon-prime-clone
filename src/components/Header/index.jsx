import {Link, useLocation} from 'react-router-dom'

import MoviesSearch from '../MoviesSearch'

import './index.css'

const Header = () => {
  const {pathname} = useLocation()

  const getNavLinkClassName = route =>
    pathname === route ? 'nav-link active-nav-link' : 'nav-link'

  return (
    <header className="app-header">
      <div className="header-left">
        <Link className="header-logo-link" to="/">
          <img
            className="header-logo"
            src="/prime-video-logo.svg"
            alt="website logo"
          />
        </Link>
        <nav>
          <ul className="header-nav">
            <li>
              <Link className={getNavLinkClassName('/')} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className={getNavLinkClassName('/popular')} to="/popular">
                Popular
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="header-right">
        <MoviesSearch />
        <Link className="profile-link" to="/account">
          <img
            className="profile-image"
            src="/profile-avatar.svg"
            alt="profile"
          />
        </Link>
      </div>
    </header>
  )
}

export default Header
