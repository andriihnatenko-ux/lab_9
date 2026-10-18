import { getShow, saveNote, notes } from './state.js';

let currentShowId = null;

export function openDetails(id) {
  currentShowId = id;
  const show = getShow(id);
  const dialog = document.querySelector('#details');
  const form = document.querySelector('#note-form');
  const errorMsg = document.querySelector('#note-rating-error');

  document.querySelector('#details-title').textContent = show.name;
  document.querySelector('#details-link').href = show.url;

  const cleanSummary = show.summary ? show.summary.replace(/<[^>]*>?/gm, '') : '';
  document.querySelector('#details-summary').textContent = cleanSummary;

  form.reset();
  errorMsg.textContent = '';
  form.elements.rating.removeAttribute('aria-invalid');

  if (notes.has(id)) {
    const note = notes.get(id);
    form.elements.rating.value = note.rating;
    form.elements.note.value = note.text;
  }

  dialog.showModal();
}

export function initDetails(refresh) {
  const dialog = document.querySelector('#details');
  const form = document.querySelector('#note-form');
  const errorMsg = document.querySelector('#note-rating-error');
  const statusText = document.querySelector('#status');

  form.noValidate = true;

  form.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' && e.target.textContent.trim() === 'Скасувати') {
      e.preventDefault();
      dialog.close();
    }
  });

  form.addEventListener('reset', () => {
    dialog.close();
  });

  dialog.addEventListener('close', () => {
    const btn = document.querySelector(`li[data-id="${currentShowId}"] button[data-action="details"]`);
    if (btn) btn.focus();
  });

  form.elements.rating.addEventListener('input', () => {
    errorMsg.textContent = '';
    form.elements.rating.removeAttribute('aria-invalid');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ratingInput = form.elements.rating;
    const ratingVal = ratingInput.valueAsNumber;

    if (Number.isNaN(ratingVal) || ratingVal < 1 || ratingVal > 10 || !Number.isInteger(ratingVal)) {
      errorMsg.textContent = 'Оцінка має бути цілим числом від 1 до 10';
      ratingInput.setAttribute('aria-invalid', 'true');
      ratingInput.setAttribute('aria-describedby', 'note-rating-error');
      ratingInput.focus();
      return;
    }

    saveNote(currentShowId, {
      rating: ratingVal,
      text: form.elements.note.value.trim()
    });

    const show = getShow(currentShowId);
    
    // ВАЖЛИВО: міняємо порядок. Спочатку рендер, ПОТІМ статус!
    refresh(); 
    statusText.textContent = `Нотатку до ${show.name} збережено`;
    dialog.close();
  });
}