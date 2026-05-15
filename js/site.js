// Shared page initialisation — included by every HTML page.

(function () {
  const toggle  = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const main    = document.getElementById('main');

  if (toggle && sidebar) {
    toggle.addEventListener('click', e => { e.stopPropagation(); sidebar.classList.toggle('open'); });
    if (main) main.addEventListener('click', () => sidebar.classList.remove('open'));
  }

  document.querySelectorAll('a.js-anchor').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
})();

function initReveal(root) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('visible'); obs.unobserve(en.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  (root || document).querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

document.addEventListener('DOMContentLoaded', () => initReveal());
