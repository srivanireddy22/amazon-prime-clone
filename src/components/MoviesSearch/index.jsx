import {useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'

import './index.css'

const MoviesSearch = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const isSearchRoute = location.pathname === '/search'

  const [searchInput, setSearchInput] = useState(
    () => new URLSearchParams(location.search).get('search') ?? '',
  )

  const onChangeSearchInput = event => setSearchInput(event.target.value)

  const onSubmitSearch = event => {
    event.preventDefault()

    if (!isSearchRoute) {
      navigate('/search')
      return
    }

    navigate(`/search?search=${encodeURIComponent(searchInput.trim())}`)
  }

  return (
    <form
      className={isSearchRoute ? 'search-form expanded-search-form' : 'search-form'}
      onSubmit={onSubmitSearch}
    >
      {isSearchRoute && (
        <input
          className="search-input"
          type="search"
          value={searchInput}
          onChange={onChangeSearchInput}
          placeholder="Search"
        />
      )}
      <button
        className="search-icon-button"
        type="submit"
        testid="searchButton"
        data-testid="searchButton"
      >
        <HiOutlineSearch className="search-icon" />
      </button>
    </form>
  )
}

export default MoviesSearch
