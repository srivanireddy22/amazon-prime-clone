import {useCallback, useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import Cookies from 'js-cookie'
import {TailSpin} from 'react-loader-spinner'
import {HiOutlineSearch} from 'react-icons/hi'

import Header from '../Header'
import Footer from '../Footer'
import MovieItem from '../MovieItem'
import {
  apiStatusConstants,
  formatMovie,
  getRequestOptions,
  loaderColor,
  searchMoviesApiUrl,
} from '../endpoints'

import './index.css'

const Search = () => {
  const location = useLocation()
  const searchText = new URLSearchParams(location.search).get('search') ?? ''

  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [moviesList, setMoviesList] = useState([])

  const fetchSearchResults = useCallback(async () => {
    if (searchText === '') {
      setMoviesList([])
      setApiStatus(apiStatusConstants.initial)
      return
    }

    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `${searchMoviesApiUrl}?search=${encodeURIComponent(
      searchText,
    )}`

    try {
      const response = await fetch(apiUrl, getRequestOptions(jwtToken))

      if (response.ok) {
        const data = await response.json()
        setMoviesList(data.results.map(formatMovie))
        setApiStatus(apiStatusConstants.success)
        return
      }

      setApiStatus(apiStatusConstants.failure)
    } catch {
      setApiStatus(apiStatusConstants.failure)
    }
  }, [searchText])

  useEffect(() => {
    fetchSearchResults()
  }, [fetchSearchResults])

  const renderLoadingView = () => (
    <div className="loader-container" testid="loader" data-testid="loader">
      <TailSpin color={loaderColor} height={50} width={50} />
    </div>
  )

  const renderFailureView = () => (
    <div className="failure-view">
      <img
        className="failure-image"
        src="/failure-view.svg"
        alt="failure view"
      />
      <h1 className="failure-description">
        Something went wrong. Please try again
      </h1>
      <button
        className="retry-button"
        type="button"
        onClick={fetchSearchResults}
      >
        Try Again
      </button>
    </div>
  )

  const renderNoResultsView = () => (
    <div className="no-results-view">
      <img className="no-movies-image" src="/no-movies.svg" alt="no movies" />
      <p className="no-results-description">
        {`Your search for ${searchText} did not find any matches.`}
      </p>
    </div>
  )

  const renderInitialView = () => (
    <div className="search-initial-view">
      <span className="search-initial-icon">
        <HiOutlineSearch />
      </span>
      <h1 className="search-initial-heading">Find something to watch</h1>
      <p className="search-initial-description">
        Search movies by name using the search bar in the header.
      </p>
    </div>
  )

  const renderSearchResultsView = () => {
    if (moviesList.length === 0) {
      return renderNoResultsView()
    }

    return (
      <ul className="movies-grid">
        {moviesList.map(movie => (
          <li key={movie.id} className="movies-grid-item">
            <MovieItem movieDetails={movie} />
          </li>
        ))}
      </ul>
    )
  }

  const renderSearchRoute = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSearchResultsView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return renderInitialView()
    }
  }

  return (
    <div className="page-container">
      <Header />
      <main className="page-content search-route content-wrapper">
        {renderSearchRoute()}
      </main>
      <Footer />
    </div>
  )
}

export default Search
