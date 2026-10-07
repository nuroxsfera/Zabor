(function () {
  // Mobile menu
  const burger = document.querySelector('.burger');
  const navbar = document.querySelector('.navbar');
  if (burger && navbar) {
    burger.addEventListener('click', () => {
      const open = navbar.classList.toggle('mobile-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.nav-links a').forEach((link) => {
      link.addEventListener('click', () => {
        navbar.classList.remove('mobile-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Modal with animation
  const modal = document.getElementById('modal');
  const openBtns = document.querySelectorAll('[data-modal="callback"]');
  const closeEls = document.querySelectorAll('[data-close]');
  let lastFocus = null;

  function openModal() {
    if (!modal) return;
    lastFocus = document.activeElement;
    modal.hidden = false;
    requestAnimationFrame(() => {
      modal.classList.add('is-open');
    });
    document.body.style.overflow = 'hidden';
    const first = modal.querySelector('input, button');
    if (first) setTimeout(() => first.focus(), 50);
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    setTimeout(() => {
      modal.hidden = true;
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    }, 250);
  }

  openBtns.forEach((btn) => btn.addEventListener('click', openModal));
  closeEls.forEach((el) => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Form submit
  const form = document.getElementById('callback-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = '\u2713 \u041e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e';
      btn.disabled = true;
      setTimeout(() => {
        closeModal();
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
          form.reset();
        }, 300);
      }, 1000);
    });
  }

  // Phone mask
  const phoneInput = form && form.querySelector('input[type="tel"]');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.startsWith('8')) v = '7' + v.slice(1);
      if (!v.startsWith('7') && v.length) v = '7' + v;
      let formatted = '';
      if (v.length > 0) formatted = '+7';
      if (v.length > 1) formatted += ' (' + v.slice(1, 4);
      if (v.length >= 4) formatted += ')';
      if (v.length > 4) formatted += ' ' + v.slice(4, 7);
      if (v.length > 7) formatted += '-' + v.slice(7, 9);
      if (v.length > 9) formatted += '-' + v.slice(9, 11);
      e.target.value = formatted;
    });
  }

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  // Stagger delay for grids
  document.querySelectorAll('.catalog-grid .reveal, .reviews-grid .reveal').forEach((el, i) => {
    el.style.transitionDelay = (i % 6) * 0.06 + 's';
  });
})();
