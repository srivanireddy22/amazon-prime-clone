export const loginApiUrl = 'https://apis.ccbp.in/login'

export const trendingMoviesApiUrl =
  'https://apis.ccbp.in/movies-app/trending-movies'

export const topRatedMoviesApiUrl =
  'https://apis.ccbp.in/movies-app/top-rated-movies'

export const originalsApiUrl = 'https://apis.ccbp.in/movies-app/originals'

export const popularMoviesApiUrl =
  'https://apis.ccbp.in/movies-app/popular-movies'

export const movieDetailsApiUrl = 'https://apis.ccbp.in/movies-app/movies'

export const searchMoviesApiUrl =
  'https://apis.ccbp.in/movies-app/movies-search'

export const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

export const loaderColor = '#D81F26'

export const formatMovie = movie => ({
  id: movie.id,
  title: movie.title,
  overview: movie.overview,
  posterPath: movie.poster_path,
  backdropPath: movie.backdrop_path,
})

export const getRequestOptions = jwtToken => ({
  method: 'GET',
  headers: {
    Authorization: `Bearer ${jwtToken}`,
  },
})
