// DOM ELEMENTS
const apiTrending =
  'https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2021-01-10&primary_release_date.lte=2021-02-22&api_key=62bbe343222b3551f9b15d712b4d6b68&page=1'
const apiWatchLater =
  'https://api.themoviedb.org/3/discover/movie?certification_country=US&certification=R&sort_by=revenue.desc&with_cast=3896&api_key=62bbe343222b3551f9b15d712b4d6b68&page=1'
const apiComedy =
  'https://api.themoviedb.org/3/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc&api_key=62bbe343222b3551f9b15d712b4d6b68&page=1'
const apiTopLists =
  'https://api.themoviedb.org/3/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&api_key=62bbe343222b3551f9b15d712b4d6b68&page=1'
const apiFavorite =
  'https://api.themoviedb.org/3/discover/movie?with_genres=878&with_cast=500&sort_by=vote_average.desc&api_key=62bbe343222b3551f9b15d712b4d6b68&page=1'
const SEARCH_URL =
  'https://api.themoviedb.org/3/search/movie?api_key=62bbe343222b3551f9b15d712b4d6b68&query="'
const IMAGE_URL = 'https://image.tmdb.org/t/p/w1280'
const form = document.querySelector('#form')
const modalContainer = document.querySelector('.modal-container')
const modalOverlay = document.querySelector('.modal-overlay')
const modalImage = document.querySelector('.modal-image')
const modalOverview = document.querySelector('.modal-overview')
const overView = document.querySelector('.overview')
const gallerydiv = document.querySelector('.gallery-div')

// FETCH MOVIE API
const getMovies = async (url) => {
  const res = await fetch(url)
  const data = await res.json()
  return data.results
}

// GET MOVIE Fectch

getMovies()
async function displayMovies1(api, selector) {
  try {
    let movieData = await getMovies(api)

    document.querySelector(selector).innerHTML = ''
    movieData.forEach((movie, i) => {
      key = i
      const { poster_path, id } = movie
      const slider = document.createElement('div')
      slider.classList.add('movie-div')
      slider.innerHTML = `
               <img class="img-${i} main-img" src="${IMAGE_URL + poster_path}" alt="">
      
      <div class="overview">
        <div class="icon-text">          
        Watch Trailer <i class="fas fa-play play" data-id="${id}"></i>
      </div>
      <img class="movie-img"  src='${IMAGE_URL + poster_path}' alt="">
      </div>
                    
     
        `
      document.querySelector(selector).append(slider)
    })

    $(document).ready(function () {
      $('.gallery-div').slick({
        slidesToShow: 10,
        slidesToScroll: 5,
      })
    })
  } catch (e) {
    console.log({ e })
  }
}
displayMovies1(apiTrending, '.galleries1')
displayMovies1(apiWatchLater, '.galleries2')
displayMovies1(apiComedy, '.galleries3')
displayMovies1(apiTopLists, '.galleries4')
displayMovies1(apiFavorite, '.galleries5')

// slide show

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const searchInput = document.querySelector('.input').value
  if (searchInput && searchInput !== '') {
    displayMovies1(SEARCH_URL + searchInput, '.gallery-div')
    searchInput.value = ''
  } else window.location.reload()
})

// GET MOVIE TRAILERS
const getMovieVideos = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=62bbe343222b3551f9b15d712b4d6b68`
  )
  const data = await res.json()
  return data.results
}

document.onclick = async function (event) {
  try {
    const target = event.target
    if (target.classList.contains('play')) {
      const movieID = target.dataset.id
      modalContainer.classList.remove('hidden')
      modalImage.innerHTML = `
        <p style="color:white;">
        loading...
        </p>
        `
      const data = await getMovieVideos(movieID)

      if (data.length) {
        console.log(data)
        const { key } = data[0]
        modalImage.innerHTML = `
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${key}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <p>
        `
      } else {
        modalContainer.classList.add('hidden')
      }
    }
  } catch (e) {
    modalContainer.classList.add('hidden')
    console.log({ e })
  }
}

modalOverlay.addEventListener('click', () => {
  if (!modalContainer.classList.contains('hidden')) {
    modalContainer.classList.add('hidden')
    modalImage.innerHTML = ''
  }
})
