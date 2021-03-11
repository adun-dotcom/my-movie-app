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
const modalImage = document.querySelector('.modal-image')
const modalOverview = document.querySelector('.modal-overview')

async function getMovies(url) {
  const res = await fetch(url)
  const data = await res.json()
  console.log(data.results)
  return data.results
}

getMovies()
async function displayMovies1(api, selector) {
  let movieData = await getMovies(api)

  document.querySelector(selector).innerHTML = ''
  movieData.forEach((movie) => {
    const { poster_path } = movie
    const movieDiv = document.createElement('div')
    movieDiv.classList.add('movie-div')
    movieDiv.innerHTML = `
            <img class='movie-img'  src="${IMAGE_URL + poster_path}" alt="">
            <div class="scaled-icons ">
                <div>
                  <i class="fas fa-play"></i>
                  <i class="fas fa-plus-circle"></i>
                  <i class="far fa-thumbs-up"></i>
                  <i class="far fa-thumbs-down"></i>
                </div>
                <div><i class="fas fa-chevron-down"></i></div>
              </div>
        `
    document.querySelector(selector).appendChild(movieDiv)
   
    
// modal reveal
    // movieDiv.addEventListener('click', () => {
    //   modalContainer.classList.remove('hidden')
    //   modalImage.src = IMAGE_URL + poster_path
    //  modalOverview.innerHTML = `<p>${movie.overview}</p>`
   
    // })


    // movieDiv.addEventListener('mouseover', ()=>{
    //   movieDiv.innerHTML = `
    //   <div class='overlay-scale hidden >
    //    <img class="scaled-image" src="${IMAGE_URL + poster_path}">
    //             <div class="scaled-content">
    //               <div class="scaled-icons">
    //               <div>
    //               <i class="fas fa-play"></i>
    //               <i class="fas fa-plus-circle"></i>
    //               <i class="far fa-thumbs-up"></i>
    //               <i class="far fa-thumbs-down"></i>
    //               </div>
    //               <div><i class="fas fa-chevron-down"></i></div>
    //             </div>
    //             </div>
    //             </div>
    //   `
    //   movieDiv.classList.add('scaled-div')
    
    // })
    // modal hide
    // modalContainer.addEventListener('click', ()=>{
    //   modalContainer.classList.add('hidden')
    // })
  })
}

displayMovies1(apiTrending, '.galleries1')
displayMovies1(apiWatchLater, '.galleries2')
displayMovies1(apiComedy, '.galleries3')
displayMovies1(apiTopLists, '.galleries4')
displayMovies1(apiFavorite, '.galleries5')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const searchInput = document.querySelector('.input').value
  if (searchInput && searchInput !== '') {
    displayMovies1(SEARCH_URL + searchInput, '.gallery-div')
    searchInput.value = ''
  } else window.location.reload()
})

// modal

// open modal eventlistener


//close modal eventlistener
// closeModal.addEventListener('click', ()=>{
//     modalContainer.classList.add('hidden')
// })
