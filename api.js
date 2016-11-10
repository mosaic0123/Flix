const API_KEY = '464749d1b922c21d04dfde44911c1fec'
const URL_PREFIX = 'https://api.themoviedb.org/3/movie/'
const NOW_PLAYING_URL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=464749d1b922c21d04dfde44911c1fec'
const TOP_RATED_URL = 'https://api.themoviedb.org/3/movie/top_rated?api_key=464749d1b922c21d04dfde44911c1fec'

const imageURIPrefix = 'https://image.tmdb.org/t/p/original'
const imageURIPrefixLow = 'https://image.tmdb.org/t/p/w45'

export const getPosterUrl = posterPath => `${imageURIPrefix}/${posterPath}`
export const getPosterUrlLow = posterPath => `${imageURIPrefixLow}/${posterPath}`

export const fetchMovies = () => (
  fetch(NOW_PLAYING_URL)
    .then((response) => response.json())
    .then((response) => response.results)
    .catch(error => console.error(error))
)

export const fetchTopRated = () => (
  fetch(TOP_RATED_URL)
    .then((response) => response.json())
    .then((response) => response.results)
    .catch(error => console.error(error))
)
