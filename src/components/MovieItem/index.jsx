import {Link} from 'react-router-dom'
import {FaPlay} from 'react-icons/fa'

import './index.css'

const MovieItem = ({movieDetails}) => {
  const {id, title, posterPath} = movieDetails

  return (
    <div className="movie-item">
      <Link className="movie-item-link" to={`/movies/${id}`}>
        <img className="movie-item-poster" src={posterPath} alt={title} />
        <div className="movie-item-overlay">
          <span className="movie-item-play-icon">
            <FaPlay />
          </span>
          <p className="movie-item-title">{title}</p>
        </div>
      </Link>
    </div>
  )
}

export default MovieItem
