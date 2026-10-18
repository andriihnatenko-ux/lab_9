import { getShow, saveNote } from './state.js';

export function openDetails(id) {
  const show = getShow(id);
  const dialog = document.querySelector('#details');

  document.querySelector('#details-title').textContent = show.name;
  // ШІ помилка: використання innerHTML для даних з API
  document.querySelector('#details-summary').innerHTML = show.summary; 
  document.querySelector('#details-link').href = show.url;

  // ШІ помилка: використовує show() замість showModal()
  dialog.show();

  const form = document.querySelector('#note-form');
  form.onsubmit = (event) => {
    event.preventDefault();
    const rating = form.elements.rating.valueAsNumber;
    
    // ШІ помилка: використовує alert замість доступного тексту помилки
    if (rating < 1 || rating > 10) {
      alert('Помилка валідації');
      return;
    }

    saveNote(id, { rating, text: form.elements.note.value });
    dialog.close();
  };
}

export function initDetails(refresh) {
  const dialog = document.querySelector('#details');
  document.querySelector('#note-form').addEventListener('reset', () => {
    dialog.close();
  });
}