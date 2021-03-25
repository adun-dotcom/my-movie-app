// DOM ELEMENTS
const showcaseImg =
  'https://api.themoviedb.org/3/trending/all/day?api_key=62bbe343222b3551f9b15d712b4d6b68&page=1'
const apiTrending =
  'https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2021-01-10&primary_release_date.lte=2021-02-22&api_key=62bbe343222b3551f9b15d712b4d6b68&page=1'
const apiWatchLater =
  'https://api.themoviedb.org/3/discover/movie?certification_country=US&certification=R&sort_by=revenue.desc&with_cast=3896&api_key=62bbe343222b3551f9b15d712b4d6b68&page=1'
const apiComedy =
  'https://api.themoviedb.org/3/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc&api_key=62bbe343222b3551f9b15d712b4d6b68&page=1'
const apiTopLists =
  'https://api.themoviedb.org/3/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&api_key=62bbe343222b3551f9b15d712b4d6b68&page=1'
const apiFavorite =
  'https://api.themoviedb.org/3/discover/movie?primary_release_year=2020&sort_by=vote_average.desc&api_key=62bbe343222b3551f9b15d712b4d6b68&page=1'
  const searchUrl =
    'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'
const IMAGE_URL = 'https://image.tmdb.org/t/p/w1280'
const form = document.querySelector('#form')
const modalContainer = document.querySelector('.modal-container')
const modalOverlay = document.querySelector('.modal-overlay')
const modalImage = document.querySelector('.modal-image')
const modalOverview = document.querySelector('.modal-overview')
const overView = document.querySelector('.overview')
const gallerydiv = document.querySelector('.gallery-div')
const movieShowcase = document.querySelector('.movie-showcase')
const search = document.querySelector('.input')
const showcase = document.querySelector('.showcase')

// FETCH MOVIE API
const getMovies = async (url) => {
  const res = await fetch(url)
  const data = await res.json()
  console.log(data.results)
  return data.results
}

// GET MOVIE Fectch

getMovies()
async function displayMovies1(api, selector) {
  try {
    let movieData = await getMovies(api)

    // document.querySelector(selector).innerHTML = ''
    movieData.forEach((movie, i) => {
      key = i
      const { poster_path, id, title, name} = movie
      const slider = document.createElement('div')
      slider.classList.add('movie-div')
      slider.innerHTML = `
                   <img class="img-${i} main-img" src="${
        IMAGE_URL + poster_path
      }" alt="">
      <i class="far fa-play-circle play" data-id="${id}"></i>
      <div class="img-title-div">
      <p>${title ? title: name}</p>
      </div>
        `
      document.querySelector(selector).append(slider)
    })

    // SCROLL FUNCTION
    $(document).ready(function () {
      $('.gallery-div').slick({
        slidesToShow: 7,
        slidesToScroll: 5,
      })
    })
  } catch (e) {
    console.log({ e })
  }
}

// CALLING THE DISPLAY MOVIE FUNCTION

displayMovies1(showcaseImg, '.galleries1')
displayMovies1(apiWatchLater, '.galleries2')
displayMovies1(apiComedy, '.galleries3')
displayMovies1(apiTopLists, '.galleries4')
displayMovies1(apiFavorite, '.galleries5')

// SEARCH MOVIES
async function searchMovies(url) {
  let movieData = await getMovies(url)
  document.querySelector('.searching').innerHTML = ''
  movieData.map((movie, i) => {
      key = i
      const { poster_path, id } = movie
      const slider2 = document.createElement('div')
      slider2.classList.add('movie-div')
      slider2.innerHTML = `
               <img class="img-${i} search-img" src="${
        IMAGE_URL + poster_path
      }" alt="">
      <i class="fas fa-play play" data-id="${id}"></i>
               
        `
      document.querySelector('.searching').append(slider2)
})
}

// search event listener
form.addEventListener('submit', (e) => {
  e.preventDefault()
    const searchTerm = search.value
    console.log(searchTerm)
    if(searchTerm && searchTerm !== '') {
        searchMovies(searchUrl + searchTerm)
        search.value = ''
        document.querySelector('.searching').classList.remove('hidden')
        document.querySelector('main').innerHTML = ''
    } else {
        window.location.reload()
    }
})

// GET MOVIE TRAILERS
const getMovieVideos = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=62bbe343222b3551f9b15d712b4d6b68`
  )
  const data = await res.json()
  return data.results
}

// modal container holding trailer
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

document.querySelector('.modal-close').addEventListener('click', () => {
  if (!modalContainer.classList.contains('hidden')) {
    modalContainer.classList.add('hidden')
    modalImage.innerHTML = ''
  }
})

modalContainer.addEventListener('click', () => {
    if (!modalContainer.classList.contains('hidden')) {
      modalContainer.classList.add('hidden')
      modalImage.innerHTML = ''
    }
  })
const open_btn = document.querySelector('.open-btn')
const close_btn = document.querySelector('.close-btn')
const nav = document.querySelectorAll('.nav')

open_btn.addEventListener('click', () => {
  nav.forEach((nav_el) => nav_el.classList.add('visible'))
})

close_btn.addEventListener('click', () => {
  nav.forEach((nav_el) => nav_el.classList.remove('visible'))
})