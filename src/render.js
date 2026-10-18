import { watchlist, notes } from './state.js';

export function renderShows(shows) {
  const resultsList = document.querySelector('#results');
  const statusText = document.querySelector('#status');
  const template = document.querySelector('#show-card');

  resultsList.replaceChildren();

  if (!shows || shows.length === 0) {
    statusText.textContent = 'Нічого не знайдено';
    return;
  }

  statusText.textContent = `Знайдено: ${shows.length} з 30`;

  shows.forEach(show => {
    const clone = template.content.cloneNode(true);
    const li = clone.querySelector('li');
    li.dataset.id = show.id;

    // Заповнюємо ВСІ поля з ім'ям (заголовок + прихований текст у кнопках)
    const nameFields = clone.querySelectorAll('[data-field="name"]');
    nameFields.forEach(el => el.textContent = show.name || '—');

    clone.querySelector('[data-field="year"]').textContent = show.year || '—';
    clone.querySelector('[data-field="genres"]').textContent = show.genres && show.genres.length > 0 ? show.genres.join(', ') : '—';
    clone.querySelector('[data-field="rating"]').textContent = show.rating || '—';

    // Кнопка "До списку" (aria-label вже не треба, бо ми заповнили data-field="name" всередині неї)
    const toggleBtn = clone.querySelector('[data-action="toggle"]');
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-pressed', watchlist.has(show.id).toString());
    }

    // Вивід збереженої нотатки та оцінки
    const ratingParent = clone.querySelector('.card__mine');
    const noteParent = clone.querySelector('.card__note');
    const myRatingEl = clone.querySelector('[data-field="my-rating"]');
    const myNoteEl = clone.querySelector('[data-field="note"]');
    
    if (notes.has(show.id)) {
      const noteData = notes.get(show.id);
      
      // Вставляємо лише цифру і текст, бо решта фрази вже є в HTML
      myRatingEl.textContent = noteData.rating;
      myNoteEl.textContent = noteData.text;
      
      // Знімаємо атрибут hidden, щоб блок стало видно
      ratingParent.hidden = false;
      // Знімаємо hidden для нотатки, лише якщо текст дійсно є
      noteParent.hidden = !noteData.text; 
    } else {
      // Якщо нотатки немає - ховаємо блоки
      ratingParent.hidden = true;
      noteParent.hidden = true;
      myRatingEl.textContent = '';
      myNoteEl.textContent = '';
    }

    resultsList.appendChild(clone);
  });
}