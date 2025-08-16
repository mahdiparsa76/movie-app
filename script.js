const apiKey = '55e97bdd'; 
const searchBtn = document.getElementById('search-btn');
const movieInput = document.getElementById('movie-name');
const loading = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const movieList = document.getElementById('movie-list');
const movieDetail = document.getElementById('movie-detail');
const titleEl = document.getElementById('title');
const yearEl = document.getElementById('year');
const genreEl = document.getElementById('genre');
const ratingEl = document.getElementById('rating');
const posterEl = document.getElementById('poster');

searchBtn.addEventListener('click', async () => {
  const movieName = movieInput.value.trim();
  if(!movieName) return alert('لطفا نام فیلم را وارد کنید');

  loading.classList.remove('hidden');
  errorDiv.classList.add('hidden');
  movieList.classList.add('hidden');
  movieDetail.classList.add('hidden');
  movieList.innerHTML = '';

  try {
    const res = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(movieName)}&apikey=${apiKey}`);
    const data = await res.json();
    if(data.Response === "False") throw new Error(data.Error);

    movieList.classList.remove('hidden');
    data.Search.forEach(movie => {
      const li = document.createElement('li');
      li.textContent = `${movie.Title} (${movie.Year})`;
      li.addEventListener('click', async () => {
        // نمایش جزئیات فیلم
        const detailRes = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`);
        const detailData = await detailRes.json();
        titleEl.textContent = detailData.Title;
        yearEl.textContent = `سال: ${detailData.Year}`;
        genreEl.textContent = `ژانر: ${detailData.Genre}`;
        ratingEl.textContent = `رتبه IMDb: ${detailData.imdbRating}`;
        posterEl.src = detailData.Poster !== "N/A" ? detailData.Poster : "";
        movieDetail.classList.remove('hidden');
        // اسکرول به بخش جزئیات
    movieDetail.scrollIntoView({ behavior: 'smooth' });
      });
      movieList.appendChild(li);
    });
  } catch(err) {
    errorDiv.textContent = err.message;
    errorDiv.classList.remove('hidden');
  } finally {
    loading.classList.add('hidden');
  }
});

