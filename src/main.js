import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');
let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', async e => {
  e.preventDefault();
  currentQuery = form.elements['search-text'].value.trim();
  if (!currentQuery) return;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  await fetchAndRender();
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  await fetchAndRender(true);
});

async function fetchAndRender(isLoadMore = false) {
  showLoader();
  try {
    const { hits, totalHits } = await getImagesByQuery(
      currentQuery,
      currentPage
    );
    if (!hits.length) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }
    createGallery(hits);
    const totalPages = Math.ceil(totalHits / 15);
    if (currentPage < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message:
          "We're sorry, but you've reached the end of search results.",
      });
    }
    if (isLoadMore) {
      const card = document.querySelector('.gallery').firstElementChild;
      const { height } = card.getBoundingClientRect();
      window.scrollBy({ top: height * 2, behavior: 'smooth' });
    }
  } catch {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong!',
    });
  } finally {
    hideLoader();
  }
}