const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  siteNav.classList.toggle('open');
});

const navLinks = document.querySelectorAll('.site-nav a');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const hero = document.querySelector('.hero');
const heroText = document.querySelector('.hero-text');
const typewriter = document.querySelector('.typewriter');
const typeText = typewriter?.dataset.text ?? '';

function animateTypewriter(text, element, delay = 80) {
  if (!element) return;
  element.textContent = '';
  let index = 0;

  const interval = setInterval(() => {
    if (index >= text.length) {
      clearInterval(interval);
      element.style.borderRight = 'none';
      heroText?.classList.add('visible');
      return;
    }

    element.textContent += text[index];
    index += 1;
  }, delay);
}

if (typewriter) {
  setTimeout(() => animateTypewriter(typeText, typewriter), 700);
}

const handleScroll = () => {
  if (!hero) return;
  const scrollY = window.scrollY;
  hero.classList.toggle('hero--collapsed', scrollY > 40);
};

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

