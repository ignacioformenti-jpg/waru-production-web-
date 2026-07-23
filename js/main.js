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
const firstPart = typewriter?.dataset.textPartOne ?? '';
const secondPart = typewriter?.dataset.textPartTwo ?? '';
const accentPart = typewriter?.querySelector('.typewriter-part--accent');
const mutedPart = typewriter?.querySelector('.typewriter-part--muted');

function animateTypewriter(text, element, delay = 55) {
  if (!element) return new Promise((resolve) => resolve());

  element.textContent = '';
  let index = 0;

  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (index >= text.length) {
        clearInterval(interval);
        resolve();
        return;
      }

      element.textContent += text[index];
      index += 1;
    }, delay);
  });
}

if (typewriter) {
  setTimeout(async () => {
    await animateTypewriter(firstPart, accentPart);
    await animateTypewriter(secondPart, mutedPart);
    heroText?.classList.add('visible');
    typewriter.style.borderRight = 'none';
  }, 700);
}

const handleScroll = () => {
  if (!hero) return;
  const scrollY = window.scrollY;
  hero.classList.toggle('hero--collapsed', scrollY > 40);
};

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

