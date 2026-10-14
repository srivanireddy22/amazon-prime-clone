import {useCallback, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'
import ReactSlick from '../ReactSlick'
import {
  apiStatusConstants,
  formatMovie,
  getRequestOptions,
  originalsApiUrl,
  topRatedMoviesApiUrl,
  trendingMoviesApiUrl,
} from '../endpoints'

import './index.css'

const Home = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [featuredMovie, setFeaturedMovie] = useState(null)

  const fetchFeaturedMovie = useCallback(async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    console.log('JWT Token:', jwtToken)
    console.log('Fetching:', originalsApiUrl)

    try {
      const response = await fetch(originalsApiUrl, getRequestOptions(jwtToken))
      console.log('Response status:', response.status)
      if (response.ok) {
        const data = await response.json()
        const moviesList = data.results.map(formatMovie)
        const randomIndex = Math.floor(Math.random() * moviesList.length)
        setFeaturedMovie(moviesList[randomIndex])
        setApiStatus(apiStatusConstants.success)
        return
      }
      const errorData = await response.text()
      console.log('Error:', errorData)
      setApiStatus(apiStatusConstants.failure)
    } catch (e) {
      console.log('Catch error:', e)
      setApiStatus(apiStatusConstants.failure)
    }
  }, [])

  useEffect(() => {
    fetchFeaturedMovie()
  }, [fetchFeaturedMovie])

  const renderLoadingView = () => (
    <div className="hero-fallback-view">
      <div style={{color: 'white', padding: '100px', textAlign: 'center'}}>
        Loading...
      </div>
    </div>
  )

  const renderFailureView = () => (
    <div className="hero-fallback-view">
      <div className="failure-view" style={{textAlign: 'center', padding: '50px'}}>
        <p className="failure-description" style={{color: 'white'}}>
          Something went wrong. Please try again
        </p>
        <button
          className="retry-button"
          type="button"
          onClick={fetchFeaturedMovie}
          style={{background: '#00b9f5', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', marginTop: '10px'}}
        >
          Try Again
        </button>
      </div>
    </div>
  )

  const renderFeaturedMovieView = () => {
    const {id, title, overview, backdropPath} = featuredMovie
    return (
      <section className="home-hero">
        <div
          className="hero-backdrop"
          style={{backgroundImage: `url(${backdropPath})`}}
        />
        <div className="hero-gradient" />
        <div className="hero-content content-wrapper">
          <p className="prime-badge">Included with Prime</p>
          <h1 className="hero-title">{title}</h1>
          <p className="hero-overview">{overview}</p>
          <div className="hero-buttons">
            <Link className="primary-button" to={`/movies/${id}`}>
              Play
            </Link>
            <Link className="secondary-button" to={`/movies/${id}`}>
              More info
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const renderHeroSection = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderFeaturedMovieView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return renderLoadingView()
    }
  }

  return (
    <div className="page-container">
      <Header />
      <main className="page-content">
        {renderHeroSection()}
        <div className="home-sliders content-wrapper">
          <ReactSlick title="Trending Now" apiUrl={trendingMoviesApiUrl} />
          <ReactSlick title="Originals" apiUrl={originalsApiUrl} />
          <ReactSlick title="Top Rated" apiUrl={topRatedMoviesApiUrl} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Home