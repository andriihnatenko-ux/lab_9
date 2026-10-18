import { toggle, watchlist } from './state.js';
import { openDetails } from './details.js';

export function initList(refresh) {
  const resultsList = document.querySelector('#results');
  const countElement = document.querySelector('#watchlist-count');
  
  resultsList.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;

    const card = button.closest('li');
    if (!card) return;

    const id = Number(card.dataset.id);

    if (button.dataset.action === 'toggle') {
      const inList = toggle(id);
      countElement.textContent = watchlist.size;
      
      // Перемальовуємо список (бо фільтри можуть вимагати приховати картку)
      refresh();
      
      // Відновлюємо фокус на новій кнопці після перемальовування (ТЗ C2.7)
      const newButton = document.querySelector(`li[data-id="${id}"] button[data-action="toggle"]`);
      if (newButton) {
        newButton.focus();
        newButton.setAttribute('aria-pressed', inList.toString());
      }
    } else if (button.dataset.action === 'details') {
      openDetails(id);
    }
  });
}