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

  // Hero dropdown (Acesso)
  const heroAccess = document.getElementById('heroAccess');
  const heroToggle = heroAccess?.querySelector('.dropdown-toggle');
  if (heroAccess && heroToggle) {
    heroToggle.addEventListener('click', (e) => {
      e.preventDefault();
      heroAccess.classList.toggle('open');
      heroToggle.setAttribute('aria-expanded', heroAccess.classList.contains('open') ? 'true' : 'false');
    });
    // Fecha ao clicar fora
    document.addEventListener('click', (e) => {
      if (!heroAccess.contains(e.target)) {
        heroAccess.classList.remove('open');
        heroToggle.setAttribute('aria-expanded', 'false');
      }
    });
    // Fecha com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        heroAccess.classList.remove('open');
        heroToggle.setAttribute('aria-expanded', 'false');
        heroToggle.focus();
      }
    });
  }

  // Header dropdown (Acesso)
  const headerAccess = document.getElementById('headerAccess');
  const headerToggle = headerAccess?.querySelector('.dropdown-toggle');
  if (headerAccess && headerToggle) {
    headerToggle.addEventListener('click', (e) => {
      e.preventDefault();
      headerAccess.classList.toggle('open');
      headerToggle.setAttribute('aria-expanded', headerAccess.classList.contains('open') ? 'true' : 'false');
    });
    // Fecha ao clicar fora
    document.addEventListener('click', (e) => {
      if (!headerAccess.contains(e.target)) {
        headerAccess.classList.remove('open');
        headerToggle.setAttribute('aria-expanded', 'false');
      }
    });
    // Fecha com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        headerAccess.classList.remove('open');
        headerToggle.setAttribute('aria-expanded', 'false');
        headerToggle.focus();
      }
    });
  }
  // Form fake submit
  document.querySelectorAll('.form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Mensagem enviada! Em breve entraremos em contato.');
      form.reset();
    });
  });

});