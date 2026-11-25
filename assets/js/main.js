(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Sticky header state */
  var header = document.querySelector('.site-header');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 12);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile navigation */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');

  function setMenu(open) {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  toggle.addEventListener('click', function () {
    setMenu(!menu.classList.contains('open'));
  });

  menu.addEventListener('click', function (event) {
    if (event.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menu.classList.contains('open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 860 && menu.classList.contains('open')) setMenu(false);
  });

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* Gallery lightbox */
  var figures = Array.prototype.slice.call(document.querySelectorAll('.gallery-grid figure'));
  var dialog = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxTitle = document.getElementById('lightbox-title');
  var current = 0;

  function showSlide(index) {
    current = (index + figures.length) % figures.length;
    var img = figures[current].querySelector('img');
    var title = figures[current].querySelector('.g-title');
    lightboxImg.src = img.getAttribute('src');
    lightboxImg.alt = img.alt;
    lightboxTitle.textContent = title ? title.textContent : '';
    if (!dialog.open) dialog.showModal();
  }

  figures.forEach(function (figure, index) {
    figure.setAttribute('tabindex', '0');
    figure.setAttribute('role', 'button');
    figure.setAttribute('aria-label', 'View ' + figure.querySelector('.g-title').textContent + ' larger');
    figure.addEventListener('click', function () { showSlide(index); });
    figure.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        showSlide(index);
      }
    });
  });

  document.getElementById('lb-prev').addEventListener('click', function () { showSlide(current - 1); });
  document.getElementById('lb-next').addEventListener('click', function () { showSlide(current + 1); });
  document.getElementById('lb-close').addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) dialog.close();
  });

  /* Booking form: validate, then hand off to the visitor's email app */
  var form = document.getElementById('booking-form');
  var success = document.getElementById('form-success');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    var data = new FormData(form);
    var recipient = form.getAttribute('data-email') || 'hello@example.com';
    var subject = encodeURIComponent('Booking request — ' + (data.get('session') || 'Session'));
    var body = [
      'Name: ' + (data.get('name') || ''),
      'School / organization: ' + (data.get('school') || ''),
      'Email: ' + (data.get('email') || ''),
      'Phone: ' + (data.get('phone') || ''),
      'Session type: ' + (data.get('session') || ''),
      'Preferred date: ' + (data.get('date') || ''),
      '',
      'Message:',
      data.get('message') || ''
    ].join('\n');
    window.location.href = 'mailto:' + recipient + '?subject=' + subject + '&body=' + encodeURIComponent(body);
    success.hidden = false;
    form.reset();
    success.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
  });

  /* Footer year */
  document.getElementById('year').textContent = String(new Date().getFullYear());
})();
