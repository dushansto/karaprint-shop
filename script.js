const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#primary-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Затвори мени' : 'Отвори мени');
});

menu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Отвори мени');
  });
});

document.querySelector('#year').textContent = String(new Date().getFullYear());

const briefForm = document.querySelector('#brief-form');
const feedback = document.querySelector('#form-feedback');

briefForm?.addEventListener('submit', async event => {
  event.preventDefault();
  const type = document.querySelector('#project-type').value.trim();
  const quantity = document.querySelector('#quantity').value.trim();
  const deadline = document.querySelector('#deadline').value.trim();
  const destination = document.querySelector('#destination').value.trim();
  const details = document.querySelector('#details').value.trim();

  if (!type) {
    feedback.textContent = 'Изберете што сакате да изработите.';
    document.querySelector('#project-type').focus();
    return;
  }

  const brief = [
    'Барање за понуда — KARAT',
    `Производ: ${type}`,
    `Количина: ${quantity || 'за договор'}`,
    `Посакуван рок: ${deadline || 'за договор'}`,
    `Испорака: ${destination || 'за договор'}`,
    `Детали: ${details || 'за договор'}`
  ].join('\n');

  try {
    await navigator.clipboard.writeText(brief);
    feedback.textContent = 'Барањето е копирано. Контакт податоците ќе бидат додадени наскоро.';
  } catch {
    const temporary = document.createElement('textarea');
    temporary.value = brief;
    temporary.style.position = 'fixed';
    temporary.style.opacity = '0';
    document.body.appendChild(temporary);
    temporary.select();
    const copied = document.execCommand('copy');
    temporary.remove();
    feedback.textContent = copied
      ? 'Барањето е копирано. Контакт податоците ќе бидат додадени наскоро.'
      : 'Копирањето не успеа. Обидете се повторно.';
  }
});
