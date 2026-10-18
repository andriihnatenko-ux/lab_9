import { toggle, watchlist } from './state.js';
import { openDetails } from './details.js';

export function initList(refresh) {
  const results = document.querySelector('#results');
  
  results.addEventListener('click', (event) => {
    const btn = event.target.closest('button');
    if (!btn) return;

    const id = Number(btn.closest('li').dataset.id);

    if (btn.dataset.action === 'toggle') {
      toggle(id);
      document.querySelector('#watchlist-count').textContent = watchlist.size;
      btn.setAttribute('aria-pressed', watchlist.has(id));
      refresh(); // Це перемалює список, але зб'є фокус клавіатури
    } else if (btn.dataset.action === 'details') {
      openDetails(id);
    }
  });
}