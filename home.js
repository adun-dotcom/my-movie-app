const isLogged = localStorage.getItem('userData')
if(!isLogged){
   window.location.assign('/index.html')
  }
// DOM ELEMENTS
const trendingApi =
  'https://api.themoviedb.org/3/trending/all/day?api_key=62bbe343222b3551f9b15d712b4d6b68&page=1'
const apiTrending =
  'https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2021-01-10&primary_release_date.lte=2021-02-22&api_key=62bbe343222b3551f9b15d712b4d6b68&page=1'
const popularApi =
  'https://api.themoviedb.org/3/movie/popular?api_key=62bbe343222b3551f9b15d712b4d6b68&language=en-US&page=1'
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
const profile = document.querySelector('#user')
const signUserOut = document.querySelector('#sign-out-user')


// get user data from local storage
let user = getUser()
user = JSON.parse(user)
if (user) {
  profile.innerHTML = `
<li>${user.fullname}</li>
<li>${user.registerEmail}</li>
`}
// sign user out
signUserOut.addEventListener('click', ()=>{
  deleteUser()
})

// FETCH MOVIE API
const getMovies = async (url) => {
  try {
    const res = await fetch(url)
    const data = await res.json()
    console.log(data.results)
    return data.results
  } catch (e) {
    console.log({ e })
  }
}

// GET MOVIE Fetch

getMovies()
async function displayMovies1(api, selector) {
  try {
    let movieData = await getMovies(api)

    // document.querySelector(selector).innerHTML = ''
    movieData.forEach((movie, i) => {
      key = i
      const {
        poster_path,
        id,
        title,
        name,
        release_date,
        first_air_date,
        vote_average,
        overview,
      } = movie
      const slider = document.createElement('div')
      slider.classList.add('movie-div')
      slider.innerHTML = `
                   <img class="img-${i} main-img" src="${
        IMAGE_URL + poster_path
      }" alt="">
       <div class="img-overview">
   <h4>${title ? title : name}</h4>
    </div>
   <div class="movie-overlay">
      <h5>About Movie</h5>
      <p>Rating: <i class="fas fa-star"></i> ${vote_average}</p>
      <p>Release Date: ${release_date ? release_date : first_air_date}</p>
      <p class="img-summary">${overview}</p>
      <i class="fas fa-play-circle play" data-id="${id}"></i> Trailer
      <p></p>
 </div>
        `
      document.querySelector(selector).append(slider)
    })

    // SCROLL FUNCTION
    $(document).ready(function () {
      $('.gallery-div').slick({
        slidesToShow: 5,
        slidesToScroll: 5,
      })
    })
  } catch (e) {
    console.log({ e })
  }
}

// CALLING THE DISPLAY MOVIE FUNCTION

displayMovies1(trendingApi, '.galleries1')
displayMovies1(popularApi, '.galleries2')
displayMovies1(apiComedy, '.galleries3')
displayMovies1(apiTopLists, '.galleries4')
displayMovies1(apiFavorite, '.galleries5')

// SEARCH MOVIES
async function searchMovies(url) {
  try {
    let movieData = await getMovies(url)
    document.querySelector('.searching').innerHTML = ''
    movieData.map((movie, i) => {
      key = i
      const {
        poster_path,
        id,
        title,
        name,
        release_date,
        first_air_date,
        vote_average,
        overview,
      } = movie
      const slider2 = document.createElement('div')
      slider2.classList.add('search-div')
      slider2.innerHTML = `
               <img class="img-${i} search-img" src="${
        IMAGE_URL + poster_path
      }" alt="">
         <div class="img-overview">
   <h4>${title ? title : name}</h4>
    </div>
   <div class="movie-overlay">
      <h5>About Movie</h5>
      <p>Rating: ${vote_average}</p>
      <p>Release Date: ${release_date ? release_date : first_air_date}</p>
      <p class="img-summary">${overview}</p>
     <i class="fas fa-play-circle play" data-id="${id}"></i> Trailer
      <p></p>
 </div>
      `
      document.querySelector('.searching').append(slider2)
    })
  } catch (e) {
    console.log({ e })
  }
}

// search event listener
form.addEventListener('keyup', (e) => {
  e.preventDefault()
    const searchTerm = search.value
    if(searchTerm && searchTerm !== '') {
        searchMovies(searchUrl + searchTerm)
        search.value = search.value
        document.querySelector('.searching').classList.remove('hidden')
        document.querySelector('main').innerHTML = ''
    } else {
        return
    }
})

// GET MOVIE TRAILERS
const getMovieVideos = async (id) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=62bbe343222b3551f9b15d712b4d6b68`
    )
    const data = await res.json()
    return data.results
  } catch (e) {
    console.log({ e })
  }
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
        `
      } else {
         modalImage.innerHTML = `
         <p>Video Not Available To View</p>
         `
      }
    }
  } catch (e) {
    modalContainer.classList.add('hidden')
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

// swiper showcase j-query
$(document).ready(
 new Swiper('.swiper-container', {
   effect: 'coverflow',
   grabCursor: true,
   centeredSlides: true,
   slidesPerView: 'auto',
   coverflowEffect: {
     rotate: 90,
     stretch: 200,
     depth: 70,
     modifier: 1,
     slideShadows: true,
   },
   loop: true,
   autoplay: {
     delay: 2000,
     disableOnInteraction: false,
   },
 }))


// function to hide or show menu toggle
const menuList = document.querySelectorAll('.nav')
 const menuToggle = document.querySelector('.menu-toggle')
 menuToggle.addEventListener('click', ()=>{
   if (!menuToggle.classList.contains('active')) {
    menuToggle.classList.add('active')
     menuList.forEach(menu=> {menu.classList.add('visible')})
   } else{
     menuToggle.classList.remove('active')
     menuList.forEach(menu=> {menu.classList.remove('visible')})
   }
   })

   document.querySelector('#home').addEventListener('click', () => {
    
       menuToggle.classList.remove('active')
       menuList.forEach((menu) => {
         menu.classList.remove('visible')
       })
     
   })
  