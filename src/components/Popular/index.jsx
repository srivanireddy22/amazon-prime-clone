import {useCallback, useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import {TailSpin} from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import MovieItem from '../MovieItem'
import {
  apiStatusConstants,
  formatMovie,
  getRequestOptions,
  loaderColor,
  popularMoviesApiUrl,
} from '../endpoints'

import './index.css'

const Popular = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [moviesList, setMoviesList] = useState([])

  const fetchPopularMovies = useCallback(async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')

    try {
      const response = await fetch(
        popularMoviesApiUrl,
        getRequestOptions(jwtToken),
      )

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
  }, [])

  useEffect(() => {
    fetchPopularMovies()
  }, [fetchPopularMovies])

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
      <p className="failure-description">
        Something went wrong. Please try again
      </p>
      <button
        className="retry-button"
        type="button"
        onClick={fetchPopularMovies}
      >
        Try Again
      </button>
    </div>
  )

  const renderMoviesGridView = () => (
    <ul className="movies-grid">
      {moviesList.map(movie => (
        <li key={movie.id} className="movies-grid-item">
          <MovieItem movieDetails={movie} />
        </li>
      ))}
    </ul>
  )

  const renderPopularMovies = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderMoviesGridView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return renderLoadingView()
    }
  }

  return (
    <div className="page-container">
      <Header />
      <main className="page-content popular-route content-wrapper">
        <h1 className="popular-heading">Popular</h1>
        <p className="popular-subheading">
          Most watched movies on Prime this week
        </p>
        {renderPopularMovies()}
      </main>
      <Footer />
    </div>
  )
}

export default Popular
