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

  // Finder de Plano (marca, modelo, ano)
  const planForm = document.getElementById('planForm');
  const planResult = document.getElementById('planResult');
  if (planForm && planResult) {
    const luxury = ['BMW','Mercedes-Benz','Audi','Volvo','Land Rover','Porsche','Jaguar'];
    const mainstream = ['Toyota','Honda','Hyundai','Nissan','Ford'];
    const budget = ['Fiat','Volkswagen','Chevrolet','Renault','Peugeot','Citroën','Kia'];

    const planMeta = {
      'Padrão': {
        image: 'car1.png',
        features: ['Troca de óleo até 2x/ano', 'Freios (não eletrônicos)', 'Alinhamento e balanceamento']
      },
      'Premium': {
        image: 'car2.png',
        features: ['Óleo + filtro incluídos', 'Manutenção de freios', 'Direção e suspensão com alinhamento']
      },
      'Super Premium': {
        image: 'car3.png',
        features: ['Cobertura ampliada', 'Assistência prioritária', 'Mais economia em serviços']
      }
    };

    function recommendPlan(marca, ano) {
      const year = parseInt(ano, 10);
      const currentYear = new Date().getFullYear();
      const age = isNaN(year) ? 0 : Math.max(0, currentYear - year);
      const brand = (marca || '').trim();

      if (luxury.includes(brand) || age >= 13) return 'Super Premium';
      if (mainstream.includes(brand) || age >= 8) return 'Premium';
      return 'Padrão';
    }

    planForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const marca = document.getElementById('marca')?.value || '';
      const modelo = (document.getElementById('modelo')?.value || '').trim();
      const ano = document.getElementById('ano')?.value || '';

      if (!marca || !modelo || !ano) {
        planResult.innerHTML = '<div class="card">Preencha todos os campos para descobrir o plano ideal.</div>';
        return;
      }

      const plan = recommendPlan(marca, ano);
      const meta = planMeta[plan];

      planResult.innerHTML = `
        <div class="plan-suggestion accent">
          <img src="${meta.image}" alt="${plan}" />
          <div>
            <h4>${plan}</h4>
            <div class="meta">${marca} ${modelo} • ${ano}</div>
            <ul class="features">${meta.features.map(f => `<li>${f}</li>`).join('')}</ul>
            <div class="cta-row"><a class="btn btn-primary" href="https://adm.vcarclube.com.br/socioCadastro.html" target="_blank" rel="noopener">Contratar agora</a></div>
          </div>
        </div>
      `;
    });
  }
});