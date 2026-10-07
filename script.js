(function () {
  // Mobile menu
  const burger = document.querySelector('.burger');
  const navbar = document.querySelector('.navbar');
  if (burger && navbar) {
    burger.addEventListener('click', () => {
      navbar.classList.toggle('mobile-open');
    });
    document.querySelectorAll('.nav-links a').forEach((link) => {
      link.addEventListener('click', () => navbar.classList.remove('mobile-open'));
    });
  }

  // Modal
  const modal = document.getElementById('modal');
  const openBtns = document.querySelectorAll('[data-modal="callback"]');
  const closeEls = document.querySelectorAll('[data-close]');

  function openModal() {
    if (!modal) return;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  openBtns.forEach((btn) => btn.addEventListener('click', openModal));
  closeEls.forEach((el) => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Form submit (demo)
  const form = document.getElementById('callback-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Отправлено!';
      btn.disabled = true;
      setTimeout(() => {
        closeModal();
        btn.textContent = original;
        btn.disabled = false;
        form.reset();
      }, 1200);
    });
  }

  // Phone mask (simple)
  const phoneInput = form && form.querySelector('input[type="tel"]');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.startsWith('8')) v = '7' + v.slice(1);
      if (!v.startsWith('7') && v.length) v = '7' + v;
      let formatted = '';
      if (v.length > 0) formatted = '+7';
      if (v.length > 1) formatted += ' (' + v.slice(1, 4);
      if (v.length >= 4) formatted += ') ' + v.slice(4, 7);
      if (v.length >= 7) formatted += '-' + v.slice(7, 9);
      if (v.length >= 9) formatted += '-' + v.slice(9, 11);
      e.target.value = formatted;
    });
  }
})();
