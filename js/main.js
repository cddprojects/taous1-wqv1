/* =========================================
   FraudFund Recovery – Main JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ── FAQ Accordion ───────────────────── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.faq-question').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        b.nextElementSibling.classList.remove('open');
      });
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        btn.nextElementSibling.classList.add('open');
      }
    });
  });

  /* ── Lead Form (home page) ───────────── */
  const leadForm = document.getElementById('lead-form');
  if (leadForm) {
    leadForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const fname    = leadForm.querySelector('#fname').value.trim();
      const email    = leadForm.querySelector('#email').value.trim();
      const scamType = leadForm.querySelector('#scam-type').value;
      const amount   = leadForm.querySelector('#amount').value;

      if (!fname || !email || !scamType || !amount) {
        showMsg(leadForm, 'Please fill in all required fields.', 'error');
        return;
      }
      if (!validEmail(email)) {
        showMsg(leadForm, 'Please enter a valid email address.', 'error');
        return;
      }

      // Show loading state then navigate
      const btn = leadForm.querySelector('button[type="submit"]');
      btn.textContent = 'Submitting…';
      btn.disabled = true;

      setTimeout(function () {
        window.location.href = 'thank-you/';
      }, 600);
    });
  }

  /* ── Contact Form (contact page) ─────── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name    = contactForm.querySelector('#c-name').value.trim();
      const email   = contactForm.querySelector('#c-email').value.trim();
      const subject = contactForm.querySelector('#c-subject').value;
      const message = contactForm.querySelector('#c-message').value.trim();

      if (!name || !email || !subject || !message) {
        showMsg(contactForm, 'Please fill in all required fields.', 'error');
        return;
      }
      if (!validEmail(email)) {
        showMsg(contactForm, 'Please enter a valid email address.', 'error');
        return;
      }

      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      setTimeout(function () {
        window.location.href = '../thank-you/';
      }, 600);
    });
  }

  /* ── Phone number formatter ──────────── */
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
      let v = e.target.value.replace(/\D/g, '').substring(0, 10);
      if (v.length >= 6)      v = '(' + v.substring(0,3) + ') ' + v.substring(3,6) + '-' + v.substring(6);
      else if (v.length >= 3) v = '(' + v.substring(0,3) + ') ' + v.substring(3);
      e.target.value = v;
    });
  }

  /* ── Smooth anchor scrolling ─────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Navbar shadow on scroll ─────────── */
  window.addEventListener('scroll', function () {
    const nav = document.querySelector('.navbar');
    if (nav) nav.style.boxShadow = window.scrollY > 10 ? '0 2px 12px rgba(0,0,0,.10)' : 'none';
  });

});

/* ── Mobile Menu ─────────────────────── */
function toggleMenu() {
  const links = document.getElementById('nav-links');
  if (!links) return;
  const open = links.dataset.mobileOpen === 'true';
  links.dataset.mobileOpen = open ? 'false' : 'true';
  Object.assign(links.style, open ? {
    display: '', flexDirection: '', position: '',
    top: '', left: '', right: '', background: '',
    padding: '', borderBottom: '', zIndex: ''
  } : {
    display: 'flex', flexDirection: 'column', position: 'absolute',
    top: '64px', left: '0', right: '0', background: '#fff',
    padding: '1.5rem', borderBottom: '1px solid #dde3ed', zIndex: '99'
  });
}

/* ── Helpers ─────────────────────────── */
function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showMsg(form, message, type) {
  let el = form.querySelector('.form-msg');
  if (!el) {
    el = document.createElement('div');
    el.className = 'form-msg';
    form.prepend(el);
  }
  el.textContent = message;
  el.style.cssText = [
    'padding:.7rem 1rem',
    'border-radius:6px',
    'margin-bottom:1rem',
    'font-size:.85rem',
    'font-weight:600',
    'background:' + (type === 'error' ? '#fef2f2' : '#f0fdf4'),
    'color:'       + (type === 'error' ? '#b91c1c' : '#15803d'),
    'border:1.5px solid ' + (type === 'error' ? '#fca5a5' : '#86efac')
  ].join(';');
}
