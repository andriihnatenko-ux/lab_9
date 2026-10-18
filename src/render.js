export function renderShows(shows) {
  const resultsList = document.querySelector('#results');
  const statusText = document.querySelector('#status');
  const template = document.querySelector('#show-card');

  // Очищаємо список безпечним методом
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

    // Заповнюємо дані (якщо даних немає - ставимо прочерк)
    clone.querySelector('[data-field="name"]').textContent = show.name || '—';
    clone.querySelector('[data-field="year"]').textContent = show.year || '—';
    clone.querySelector('[data-field="genres"]').textContent = show.genres && show.genres.length > 0 ? show.genres.join(', ') : '—';
    clone.querySelector('[data-field="rating"]').textContent = show.rating || '—';

    // Додаємо доступні назви для скрінрідерів (ТЗ C1.5)
    const toggleBtn = clone.querySelector('[data-action="toggle"]');
    if (toggleBtn) toggleBtn.setAttribute('aria-label', `До списку: ${show.name}`);

    const detailsBtn = clone.querySelector('[data-action="details"]');
    if (detailsBtn) detailsBtn.setAttribute('aria-label', `Детальніше про ${show.name}`);

    resultsList.appendChild(clone);
  });
}