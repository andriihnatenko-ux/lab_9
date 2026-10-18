export function readFilters() {
  const form = document.querySelector('#filters');
  return {
    query: form.elements.query.value.trim(),
    genre: form.elements.genre.value,
    mine: form.elements.mine.checked
  };
}

export function initFilters(refresh) {
  const form = document.querySelector('#filters');

  // C3.1: Пошук під час введення (input)
  form.elements.query.addEventListener('input', refresh);
  
  // C3.2: Фільтри застосовуються одразу після зміни (change)
  form.elements.genre.addEventListener('change', refresh);
  form.elements.mine.addEventListener('change', refresh);

  // C3.3: Забороняємо Enter перезавантажувати сторінку
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    refresh();
  });

  // C3.5: Правильне скидання форми (без setTimeout)
  form.addEventListener('reset', (event) => {
    event.preventDefault(); 
    form.elements.query.value = '';
    form.elements.genre.value = '';
    form.elements.mine.checked = false;
    refresh();
  });
}