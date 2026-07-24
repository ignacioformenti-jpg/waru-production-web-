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
const contactForm = document.querySelector('#contact-form');
const formMessage = document.querySelector('.form-message');

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

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get('name')?.toString().trim() || 'there';
  const eventType = formData.get('eventType')?.toString().trim() || 'your event';

  formMessage.textContent = `Thanks, ${name}. Your ${eventType} request is ready to be reviewed.`;
  contactForm.reset();
});

const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach((card) => {
  card.setAttribute('tabindex', '0');

  const toggleCardState = () => {
    if (window.matchMedia('(max-width: 720px)').matches) {
      const isAlreadyFlipped = card.classList.contains('is-flipped');
      serviceCards.forEach((item) => item.classList.remove('is-flipped'));

      if (!isAlreadyFlipped) {
        card.classList.add('is-flipped');
      }
    }
  };

  card.addEventListener('click', toggleCardState);
  card.addEventListener('touchstart', toggleCardState, { passive: true });

  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleCardState();
    }
  });
});

const handleScroll = () => {
  if (!hero) return;
  const scrollY = window.scrollY;
  hero.classList.toggle('hero--collapsed', scrollY > 40);
};

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

