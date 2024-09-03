const apiKey = "0740754ec87fa9f7cacc2469d9e267f2";
const apiUrl = `https://api.themoviedb.org/3`;

//Fetch top movies
async function fetchTopMovies() {
  try {
    const response = await fetch(
      `${apiUrl}/trending/movie/week?api_key=${apiKey}`
      );
      const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching top movies:", error);
  }
}

//Display top movies
// Function to sort movies based on the selected option
function sortMovies() {
  const sortOrder = document.getElementById("sortOrderSelect").value;
  displayMovies(sortOrder);
}

// Updated displayMovies function to handle sorting based on the selected option
async function displayMovies(order = 'default') {
  const moviesContainer = document.getElementById("movies");
  const movies = await fetchTopMovies();
  
  // Sort movies based on the selected option
  if (order === 'highToLow') {
    movies.sort((a, b) => b.vote_average - a.vote_average);
  } else if (order === 'lowToHigh') {
    movies.sort((a, b) => a.vote_average - b.vote_average);
  }
  
  moviesContainer.innerHTML = "";
  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movieContainer");
    movieElement.innerHTML = `
    <div class="movie">
    <div class="poster-container">
    <h2 style="text-align: center;">${movie.title}</h2>
    <img class="moviePoster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title} Poster">
    <div class="details">                
    <p class="score">Score: ${movie.vote_average.toFixed(1)}</p>
    <p class="overview">${movie.overview}</p>
    </div>
    </div>
    <p>Released: ${movie.release_date}</p>
    </div>
    `;
    moviesContainer.appendChild(movieElement);
  });
}

//Search for movie
function searchMovies() {
  const searchQuery = document.getElementById("searchInput").value;
  fetchTopMoviesSearch(searchQuery).then((movies) =>
  displayMoviesSeach(movies)
  );
}

async function fetchTopMoviesSearch(searchQuery) {
  try {
    const response = await fetch(
      `${apiUrl}/search/movie?query=${searchQuery}&api_key=${apiKey}`
      );
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }
  
  //Display searched movie
  function displayMoviesSeach(movies) {
    const moviesContainer = document.getElementById("movies");
    moviesContainer.innerHTML = "";
    
    if (movies && movies.length > 0) {
      const firstMovie = movies.slice(0, 1);
      const movieElement = document.createElement("div");
      movieElement.classList.add("movieSeachedContainer");
      movieElement.innerHTML = `
      <div id="searchedMovieContainer" class="poster-container">
      <h2 style="text-align: center;">${firstMovie[0].title}</h2>
      <img id="searchMoviePoster" class="moviePoster" src="https://image.tmdb.org/t/p/w500/${firstMovie[0].poster_path}" alt="${firstMovie[0].title} Poster">
      <div class="details">                
      <p class="score">Score: ${firstMovie[0].vote_average.toFixed(1)}</p>
      <p class="overview">${firstMovie[0].overview.replace(/\n/g, "<br>")}</p>
      </div>
      </div>
      <p>Released: ${firstMovie[0].release_date}</p>
      </div>
      `;
      moviesContainer.appendChild(movieElement);
    } else {
      searchInput.placeholder = "Enter a search query to find movies.";
    }
  }
  
  displayMovies();
  displayMoviesSeach();
  
  // Get the button:
  let mybutton = document.getElementById("myBtn");
  
  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
  };
  
  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }
  
  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  
// Function to handle key press event
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent default form submission behavior
    document.getElementById('searchButton').click(); // Simulate a click on the search button
  }
}
