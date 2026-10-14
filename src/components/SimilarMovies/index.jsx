import SimilarMovieDetails from '../SimilarMovieDetails'

import './index.css'

const SimilarMovies = ({similarMovies}) => (
  <section className="similar-movies-section content-wrapper">
    <h1 className="section-heading">More like this</h1>
    <ul className="similar-movies-grid">
      {similarMovies.map(movie => (
        <li key={movie.id} className="similar-movies-grid-item">
          <SimilarMovieDetails movieDetails={movie} />
        </li>
      ))}
    </ul>
  </section>
)

export default SimilarMovies
