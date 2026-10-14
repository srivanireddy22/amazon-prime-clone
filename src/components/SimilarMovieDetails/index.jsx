import {Link} from 'react-router-dom'
import {FaPlay} from 'react-icons/fa'

import './index.css'

const SimilarMovieDetails = ({movieDetails}) => {
  const {id, title, posterPath} = movieDetails

  return (
    <div className="similar-movie-item">
      <Link className="similar-movie-link" to={`/movies/${id}`}>
        <div className="similar-movie-thumbnail">
          <img
            className="similar-movie-image"
            src={posterPath}
            alt={title}
          />
          <span className="similar-movie-play-icon">
            <FaPlay />
          </span>
        </div>
        <p className="similar-movie-title">{title}</p>
      </Link>
    </div>
  )
}

export default SimilarMovieDetails
