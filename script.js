const isEnglish = document.documentElement.lang === 'en';
const copy = isEnglish ? {
  openMenu: 'Open menu', closeMenu: 'Close menu',
  choose: 'Please choose what you would like to make.',
  subject: 'Quote request — KARAT', product: 'Product', quantity: 'Quantity',
  deadline: 'Desired deadline', delivery: 'Delivery', details: 'Details',
  discuss: 'to be discussed',
  opened: 'Your email app will open with the inquiry filled in. Please send it to contact@karaprint.shop.'
} : {
  openMenu: 'Отвори мени', closeMenu: 'Затвори мени',
  choose: 'Изберете што сакате да изработите.',
  subject: 'Барање за понуда — KARAT', product: 'Производ', quantity: 'Количина',
  deadline: 'Посакуван рок', delivery: 'Испорака', details: 'Детали',
  discuss: 'за договор',
  opened: 'Ќе се отвори вашата апликација за е-пошта со пополнето барање. Испратете го на contact@karaprint.shop.'
};

const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#primary-nav');
menuButton?.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? copy.closeMenu : copy.openMenu);
});
menu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', copy.openMenu);
  });
});

document.querySelector('#year').textContent = String(new Date().getFullYear());

// Grow the first group past the viewport, then copy it exactly for a seamless loop.
const ticker = document.querySelector('.ticker');
const track = ticker?.querySelector('.ticker-track');
const originalGroup = track?.querySelector('.ticker-group');
const originalItems = originalGroup ? [...originalGroup.children].map(item => item.cloneNode(true)) : [];
let tickerFrame;
function buildTicker() {
  if (!ticker || !track || !originalGroup) return;
  ticker.classList.remove('is-ready');
  track.replaceChildren(originalGroup);
  originalGroup.replaceChildren(...originalItems.map(item => item.cloneNode(true)));
  while (originalGroup.getBoundingClientRect().width < ticker.clientWidth + 160) {
    originalGroup.append(...originalItems.map(item => item.cloneNode(true)));
  }
  const clone = originalGroup.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  track.append(clone);
  track.style.setProperty('--ticker-duration', `${Math.max(25, originalGroup.getBoundingClientRect().width / 55)}s`);
  ticker.classList.add('is-ready');
}
buildTicker();
window.addEventListener('resize', () => {
  cancelAnimationFrame(tickerFrame);
  tickerFrame = requestAnimationFrame(buildTicker);
});

const briefForm = document.querySelector('#brief-form');
const feedback = document.querySelector('#form-feedback');
briefForm?.addEventListener('submit', event => {
  event.preventDefault();
  const type = document.querySelector('#project-type').value.trim();
  const quantity = document.querySelector('#quantity').value.trim();
  const deadline = document.querySelector('#deadline').value.trim();
  const destination = document.querySelector('#destination').value.trim();
  const details = document.querySelector('#details').value.trim();
  if (!type) {
    feedback.textContent = copy.choose;
    document.querySelector('#project-type').focus();
    return;
  }
  const brief = [
    `${copy.product}: ${type}`,
    `${copy.quantity}: ${quantity || copy.discuss}`,
    `${copy.deadline}: ${deadline || copy.discuss}`,
    `${copy.delivery}: ${destination || copy.discuss}`,
    `${copy.details}: ${details || copy.discuss}`
  ].join('\n');
  const address = `mailto:contact@karaprint.shop?subject=${encodeURIComponent(copy.subject)}&body=${encodeURIComponent(brief)}`;
  feedback.textContent = copy.opened;
  window.location.href = address;
});
