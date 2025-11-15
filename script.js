
const movies = [
  {
    "id": 1,
    "title": "Interstellar",
    "year": 2014,
    "genre": ["Sci-Fi", "Adventure", "Drama"],
    "rating": 8.6,
    "poster": "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    "overview": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    "imdb": "https://www.imdb.com/title/tt0816692/"
  },
  {
    "id": 2,
    "title": "The Dark Knight",
    "year": 2008,
    "genre": ["Action", "Crime", "Drama"],
    "rating": 9.0,
    "poster": "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    "overview": "Batman sets out to dismantle the remaining criminal organizations that plague Gotham.",
    "imdb": "https://www.imdb.com/title/tt0468569/"
  },
  {
    "id": 3,
    "title": "Inception",
    "year": 2010,
    "genre": ["Action", "Sci-Fi", "Thriller"],
    "rating": 8.8,
    "poster": "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    "overview": "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    "imdb": "https://www.imdb.com/title/tt1375666/"
  },
  {
    "id": 4,
    "title": "Parasite",
    "year": 2019,
    "genre": ["Thriller", "Drama"],
    "rating": 8.6,
    "poster": "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    "overview": "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    "imdb": "https://www.imdb.com/title/tt6751668/"
  },
  {
    "id": 5,
    "title": "The Matrix",
    "year": 1999,
    "genre": ["Action", "Sci-Fi"],
    "rating": 8.7,
    "poster": "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    "overview": "A hacker discovers the nature of his reality and his role in the war against its controllers.",
    "imdb": "https://www.imdb.com/title/tt0133093/"
  },
  {
    "id": 6,
    "title": "The Shawshank Redemption",
    "year": 1994,
    "genre": ["Drama"],
    "rating": 9.3,
    "poster": "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    "overview": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    "imdb": "https://www.imdb.com/title/tt0111161/"
  },
  {
    "id": 7,
    "title": "Spirited Away",
    "year": 2001,
    "genre": ["Animation", "Family", "Fantasy"],
    "rating": 8.6,
    "poster": "https://image.tmdb.org/t/p/w500/dL11DBPcRhWWnJcFXl9A07MrqTI.jpg",
    "overview": "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods and spirits.",
    "imdb": "https://www.imdb.com/title/tt0245429/"
  },
  {
    "id": 8,
    "title": "Pulp Fiction",
    "year": 1994,
    "genre": ["Crime", "Drama"],
    "rating": 8.9,
    "poster": "https://image.tmdb.org/t/p/w500/dM2w364MScsjFf8pfMbaWUcWrR.jpg",
    "overview": "The lives of two mob hitmen, a boxer, a gangster's wife and a pair of diner bandits intertwine in tales of violence and redemption.",
    "imdb": "https://www.imdb.com/title/tt0110912/"
  },
  {
    "id": 9,
    "title": "Forrest Gump",
    "year": 1994,
    "genre": ["Drama", "Romance"],
    "rating": 8.8,
    "poster": "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
    "overview": "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other history are seen through the eyes of an Alabama man.",
    "imdb": "https://www.imdb.com/title/tt0109830/"
  },
  {
    "id": 10,
    "title": "The Godfather",
    "year": 1972,
    "genre": ["Crime", "Drama"],
    "rating": 9.2,
    "poster": "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    "overview": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    "imdb": "https://www.imdb.com/title/tt0068646/"
  }
];


const moviesGrid = document.getElementById('moviesGrid');
const searchInput = document.getElementById('searchInput');
const genreSelect = document.getElementById('genreSelect');
const sortSelect = document.getElementById('sortSelect');
const ratingRange = document.getElementById('ratingRange');
const ratingValue = document.getElementById('ratingValue');
const countEl = document.getElementById('count');
const emptyState = document.getElementById('emptyState');

const modal = document.getElementById('movieModal');
const closeModalBtn = document.getElementById('closeModal');
const modalPoster = document.getElementById('modalPoster');
const modalTitle = document.getElementById('modalTitle');
const modalYear = document.getElementById('modalYear');
const modalGenre = document.getElementById('modalGenre');
const modalRating = document.getElementById('modalRating');
const modalOverview = document.getElementById('modalOverview');
const imdbLink = document.getElementById('imdbLink');
const favBtn = document.getElementById('favBtn');

let currentList = [...movies];
let favorites = new Set();

function buildGenreOptions() {
  const allGenres = new Set();
  movies.forEach(m => m.genre.forEach(g => allGenres.add(g)));
  const genres = Array.from(allGenres).sort();
  genres.forEach(g => {
    const opt = document.createElement('option');
    opt.value = g;
    opt.textContent = g;
    genreSelect.appendChild(opt);
  });
}

function createMovieCard(m) {
  const card = document.createElement('article');
  card.className = 'card';
  card.tabIndex = 0;

  const img = document.createElement('img');
  img.className = 'poster';
  img.alt = `${m.title} poster`;
  img.src = m.poster;
  img.loading = 'lazy';
  img.onerror = () => {
    img.src = createFallbackPoster(m.title);
  };

  const info = document.createElement('div');
  info.className = 'card-info';

  const title = document.createElement('h3');
  title.className = 'title';
  title.textContent = m.title;

  const meta = document.createElement('div');
  meta.className = 'meta';
  meta.textContent = `${m.year}`;

  const rating = document.createElement('div');
  rating.className = 'badge';
  rating.textContent = m.rating.toFixed(1);

  info.appendChild(title);
  info.appendChild(meta);

  const bottom = document.createElement('div');
  bottom.style.display = 'flex';
  bottom.style.justifyContent = 'space-between';
  bottom.style.alignItems = 'center';

  const small = document.createElement('div');
  small.className = 'meta';
  small.textContent = m.genre.join(', ');

  bottom.appendChild(small);
  bottom.appendChild(rating);

  card.appendChild(img);
  card.appendChild(info);
  card.appendChild(bottom);

  card.addEventListener('click', () => openModal(m));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') openModal(m);
  });

  return card;
}

function createFallbackPoster(title) {
  const initials = title.split(' ').slice(0,3).map(w=>w[0]).join('').toUpperCase();
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='500' height='750'>
    <rect width='100%' height='100%' fill='#0b1220'/>
    <text x='50%' y='55%' font-size='70' fill='#e6eef6' dominant-baseline='middle' text-anchor='middle' font-family='Arial, Helvetica, sans-serif'>${initials}</text>
  </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

function render(list) {
  moviesGrid.innerHTML = '';
  if (!list.length) {
    emptyState.hidden = false;
  } else {
    emptyState.hidden = true;
    list.forEach(m => moviesGrid.appendChild(createMovieCard(m)));
  }
  countEl.textContent = list.length;
}

function applyFilters() {
  const q = searchInput.value.trim().toLowerCase();
  const genre = genreSelect.value;
  const minRating = parseFloat(ratingRange.value);
  const sortBy = sortSelect.value;

  let filtered = movies.filter(m => {
    const matchesQuery = m.title.toLowerCase().includes(q) || m.genre.join(' ').toLowerCase().includes(q) || m.overview.toLowerCase().includes(q);
    const matchesGenre = (genre === 'all') ? true : m.genre.includes(genre);
    const matchesRating = m.rating >= minRating;
    return matchesQuery && matchesGenre && matchesRating;
  });

  if (sortBy === 'rating-desc') {
    filtered.sort((a,b) => b.rating - a.rating);
  } else if (sortBy === 'rating-asc') {
    filtered.sort((a,b) => a.rating - b.rating);
  } else if (sortBy === 'year-desc') {
    filtered.sort((a,b) => b.year - a.year);
  } else if (sortBy === 'year-asc') {
    filtered.sort((a,b) => a.year - b.year);
  }

  currentList = filtered;
  render(filtered);
}

function openModal(m) {
  modalPoster.src = m.poster;
  modalPoster.onerror = () => { modalPoster.src = createFallbackPoster(m.title); };
  modalTitle.textContent = m.title;
  modalYear.textContent = m.year;
  modalGenre.textContent = m.genre.join(', ');
  modalRating.textContent = m.rating.toFixed(1);
  modalOverview.textContent = m.overview;
  imdbLink.href = m.imdb || '#';
  favBtn.textContent = favorites.has(m.id) ? 'Remove Favorite' : 'Add to Favorites';
  favBtn.dataset.movieId = m.id;
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

favBtn.addEventListener('click', () => {
  const id = Number(favBtn.dataset.movieId);
  if (!id) return;
  if (favorites.has(id)) {
    favorites.delete(id);
    favBtn.textContent = 'Add to Favorites';
  } else {
    favorites.add(id);
    favBtn.textContent = 'Remove Favorite';
  }
  flashFavCount();
});

function flashFavCount(){
  const old = document.title;
  document.title = `⭐ ${favorites.size} favorites • ${old}`;
  setTimeout(()=> document.title = old, 1200);
}

closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });


function init() {
  buildGenreOptions();
  ratingValue.textContent = ratingRange.value;
  render(movies);


  searchInput.addEventListener('input', debounce(applyFilters, 200));
  genreSelect.addEventListener('change', applyFilters);
  sortSelect.addEventListener('change', applyFilters);
  ratingRange.addEventListener('input', () => {
    ratingValue.textContent = ratingRange.value;
    applyFilters();
  });
}


function debounce(fn, delay=200){
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(()=> fn.apply(this, args), delay);
  };
}

init();
