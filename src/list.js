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
      // C3.7: Запам'ятовуємо сусідні картки до перемальовування
      const allCards = Array.from(resultsList.children);
      const currentIndex = allCards.indexOf(card);
      const fallbackCard = allCards[currentIndex + 1] || allCards[currentIndex - 1];

      const inList = toggle(id);
      countElement.textContent = watchlist.size;
      
      refresh();
      
      const newButton = document.querySelector(`li[data-id="${id}"] button[data-action="toggle"]`);
      if (newButton) {
        // Картка залишилась — фокус на ній
        newButton.focus();
        newButton.setAttribute('aria-pressed', inList.toString());
      } else {
        // C3.7: Картка зникла (бо увімкнено "Лише мій список") — фокус на сусідню
        if (fallbackCard) {
          const targetId = fallbackCard.dataset.id;
          const targetBtn = document.querySelector(`li[data-id="${targetId}"] button[data-action="toggle"]`);
          if (targetBtn) {
            targetBtn.focus();
            return;
          }
        }
        // Якщо карток більше немає — фокус на заголовок
        const heading = document.querySelector('#results-heading');
        heading.tabIndex = -1;
        heading.focus();
      }
    } else if (button.dataset.action === 'details') {
      openDetails(id);
    }
  });
}