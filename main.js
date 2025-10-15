// Menu mobile
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Fecha menu ao clicar fora
    document.addEventListener('click', (e) => {
      const clickedInsideNav = navLinks.contains(e.target) || navToggle.contains(e.target);
      if (!clickedInsideNav && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
      }
    });
    // Fecha com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
      }
    });
  }

  // Scroll suave para âncoras
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Fecha o menu no mobile ao navegar
        if (navLinks && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
        }
      }
    });
  });

  // FAQ accordion
  document.querySelectorAll('.faq-item .faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item?.querySelector('.faq-answer');
      const isOpen = item?.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach((i) => {
        i.classList.remove('open');
        const a = i.querySelector('.faq-answer');
        if (a) a.style.maxHeight = '';
      });
      if (!isOpen) {
        item?.classList.add('open');
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Form fake submit
  document.querySelectorAll('.form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Mensagem enviada! Em breve entraremos em contato.');
      form.reset();
    });
  });
});