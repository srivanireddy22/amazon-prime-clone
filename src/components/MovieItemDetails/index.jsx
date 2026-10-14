import {useCallback, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie'
import {TailSpin} from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import MovieDetails from '../MovieDetails'
import SimilarMovies from '../SimilarMovies'
import {
  apiStatusConstants,
  formatMovie,
  getRequestOptions,
  loaderColor,
  movieDetailsApiUrl,
} from '../endpoints'

import './index.css'

const formatMovieDetails = data => {
  const details = data.movie_details

  return {
    adult: details.adult,
    backdropPath: details.backdrop_path,
    budget: details.budget,
    genres: details.genres,
    id: details.id,
    overview: details.overview,
    posterPath: details.poster_path,
    releaseDate: details.release_date,
    runtime: details.runtime,
    similarMovies: details.similar_movies.map(formatMovie),
    spokenLanguages: details.spoken_languages.map(language => ({
      id: language.id,
      englishName: language.english_name,
    })),
    title: details.title,
    voteAverage: details.vote_average,
    voteCount: details.vote_count,
  }
}

const MovieItemDetails = () => {
  const {id} = useParams()
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [movieDetails, setMovieDetails] = useState(null)

  const fetchMovieDetails = useCallback(async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')

    try {
      const response = await fetch(
        `${movieDetailsApiUrl}/${id}`,
        getRequestOptions(jwtToken),
      )

      if (response.ok) {
        const data = await response.json()
        setMovieDetails(formatMovieDetails(data))
        setApiStatus(apiStatusConstants.success)
        return
      }

      setApiStatus(apiStatusConstants.failure)
    } catch {
      setApiStatus(apiStatusConstants.failure)
    }
  }, [id])

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchMovieDetails()
  }, [fetchMovieDetails])

  const renderLoadingView = () => (
    <div className="details-loader-wrapper">
      <div className="loader-container" testid="loader" data-testid="loader">
        <TailSpin color={loaderColor} height={50} width={50} />
      </div>
    </div>
  )

  const renderFailureView = () => (
    <div className="details-failure-wrapper">
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
          onClick={fetchMovieDetails}
        >
          Try Again
        </button>
      </div>
    </div>
  )

  const renderMovieDetailsView = () => (
    <>
      <MovieDetails movieDetails={movieDetails} />
      <SimilarMovies similarMovies={movieDetails.similarMovies} />
    </>
  )

  const renderMovieItemDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderMovieDetailsView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return renderLoadingView()
    }
  }

  return (
    <div className="page-container">
      <Header />
      <main className="page-content">{renderMovieItemDetails()}</main>
      <Footer />
    </div>
  )
}

export default MovieItemDetails
