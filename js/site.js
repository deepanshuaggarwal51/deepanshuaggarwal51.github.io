(function () {
  const toggle  = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const main    = document.getElementById('main');

  if (toggle && sidebar) {
    toggle.addEventListener('click', e => { e.stopPropagation(); sidebar.classList.toggle('open'); });
    if (main) main.addEventListener('click', () => sidebar.classList.remove('open'));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') sidebar.classList.remove('open');
    });
  }

  document.querySelectorAll('a.js-anchor').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  document.querySelectorAll('footer').forEach(f => {
    const yr = f.querySelector('.js-year');
    if (yr) yr.textContent = new Date().getFullYear();
  });

  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') document.documentElement.setAttribute('data-theme', 'dark');

    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const isDark = current === 'dark' || (!current && window.matchMedia('(prefers-color-scheme: dark)').matches);
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }
})();

function initReveal(root) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('visible');
        obs.unobserve(en.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  const els = (root || document).querySelectorAll('.reveal');
  const groups = new Map();
  els.forEach(el => {
    const section = el.closest('section') || el.parentElement;
    if (!groups.has(section)) groups.set(section, []);
    groups.get(section).push(el);
  });
  groups.forEach(group => {
    group.forEach((el, i) => {
      el.style.transitionDelay = `${i * 60}ms`;
      obs.observe(el);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => initReveal());
