import {FaPlay} from 'react-icons/fa'

import './index.css'

const getRuntimeText = runtime => {
  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60

  return `${hours}h ${minutes}m`
}

const MovieDetails = ({movieDetails}) => {
  const {
    adult,
    backdropPath,
    budget,
    genres,
    overview,
    releaseDate,
    runtime,
    spokenLanguages,
    title,
    voteAverage,
    voteCount,
  } = movieDetails

  const censorRating = adult ? 'A' : 'U/A'
  const releaseYear = new Date(releaseDate).getFullYear()

  return (
    <>
      <section className="details-hero">
        <div
          className="details-backdrop"
          style={{backgroundImage: `url(${backdropPath})`}}
        />
        <div className="details-gradient" />
        <div className="details-hero-content content-wrapper">
          <p className="prime-badge">Included with Prime</p>
          <h1 className="details-title">{title}</h1>
          <div className="details-meta">
            <p className="details-meta-item">{getRuntimeText(runtime)}</p>
            <p className="censor-rating">{censorRating}</p>
            <p className="details-meta-item">{releaseYear}</p>
          </div>
          <p className="details-overview">{overview}</p>
          <button className="primary-button" type="button">
            <FaPlay />
            Play
          </button>
        </div>
      </section>

      <section className="details-info-section content-wrapper">
        <div className="details-info-grid">
          <div className="info-column">
            <h1 className="info-heading">genres</h1>
            <ul className="info-list">
              {genres.map(genre => (
                <li className="info-item" key={genre.id}>
                  <p>{genre.name}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="info-column">
            <h1 className="info-heading">Audio Available</h1>
            <ul className="info-list">
              {spokenLanguages.map(language => (
                <li className="info-item" key={language.id}>
                  <p>{language.englishName}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="info-column">
            <h1 className="info-heading">Rating Count</h1>
            <p className="info-item">{voteCount}</p>
            <h1 className="info-heading info-heading-spaced">Rating Average</h1>
            <p className="info-item">{voteAverage}</p>
          </div>

          <div className="info-column">
            <h1 className="info-heading">Budget</h1>
            <p className="info-item">{budget}</p>
            <h1 className="info-heading info-heading-spaced">Release Date</h1>
            <p className="info-item">{releaseDate}</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default MovieDetails
