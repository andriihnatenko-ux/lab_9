export function readFilters() {
  const form = document.querySelector('#filters');
  return {
    query: form.elements.query.value,
    genre: form.elements.genre.value,
    mine: form.elements.mine.checked
  };
}

export function initFilters(refresh) {
  const form = document.querySelector('#filters');

  // ШІ робить помилку: використовує 'change' замість 'input' для тексту
  form.addEventListener('change', () => {
    refresh();
  });

  // ШІ не скасовує стандартну поведінку форми (preventDefault)
  form.addEventListener('submit', () => {
    refresh();
  });
}