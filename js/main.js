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

      // Show loading state then navigate — read redirect from form's action attribute
      const btn = leadForm.querySelector('button[type="submit"]');
      btn.textContent = 'Submitting…';
      btn.disabled = true;

      const leadRedirect = leadForm.getAttribute('action') || 'thank-you/';
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

  /* ── Case type studio ────────────────── */
  const stageImg = document.getElementById('case-photo');
  const stageTitle = document.getElementById('case-title');
  const stageLine = document.getElementById('case-line');
  const caseChip = document.getElementById('case-chip');
  document.querySelectorAll('.case-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.case-btn').forEach(function (b) {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');
      if (stageImg) {
        stageImg.src = btn.dataset.img;
        stageImg.alt = btn.dataset.alt || '';
        stageImg.style.objectPosition = btn.dataset.pos || 'center';
      }
      if (stageTitle) stageTitle.textContent = btn.dataset.title || '';
      if (stageLine) stageLine.textContent = btn.dataset.line || '';
      if (caseChip) caseChip.textContent = 'Reviewing: ' + (btn.dataset.title || 'your case');
      const mapped = {
        'Phishing and malware': 'Phishing and malware',
        'Fake exchanges and miners': 'Fake exchange or miner',
        'Credit cards and fake investments': 'False investment',
        'Real estate and virtual deals': 'Real estate',
        'Romance and impersonation': 'Romance',
        'Task schemes and other fraud': 'Task scheme'
      }[btn.dataset.title];
      if (mapped) setCaseType(mapped);
    });
  });

  /* ── Case type on the review form ────── */
  const CASE_FORM_ORIGIN = 'https://staging.chatfromforms.com';

  function caseTypeEmbedSrc(embed) {
    const slug = encodeURIComponent(embed.dataset.cddform || '');
    const pageQs = new URLSearchParams(window.location.search);
    let channel = '';
    if (pageQs.get('gclid')) channel = 'google_ad';
    else if (pageQs.get('utm_source')) channel = pageQs.get('utm_source');
    const qs = new URLSearchParams({
      origin: embed.dataset.origin || '',
      protocol: window.location.protocol,
      channel: channel,
      referral: window.location.href
    });
    return CASE_FORM_ORIGIN + '/form/' + slug + '/embed?' + qs.toString();
  }

  function rememberCaseType(value) {
    const url = new URL(window.location.href);
    if (value) url.searchParams.set('case_type', value);
    else url.searchParams.delete('case_type');
    history.replaceState(null, '', url.pathname + url.search + url.hash);
  }

  function bindCaseTypeIframe(embed) {
    const apply = function (iframe) {
      const next = caseTypeEmbedSrc(embed);
      if (iframe.getAttribute('src') !== next) iframe.setAttribute('src', next);
    };
    const iframe = embed.querySelector('iframe');
    if (iframe) { apply(iframe); return; }
    const obs = new MutationObserver(function () {
      const frame = embed.querySelector('iframe');
      if (!frame) return;
      obs.disconnect();
      apply(frame);
    });
    obs.observe(embed, { childList: true });
  }

  function setCaseType(value) {
    document.querySelectorAll('.js-case-type').forEach(function (select) {
      const match = Array.prototype.some.call(select.options, function (opt) { return opt.value === value; });
      if (!match || select.value === value) return;
      select.value = value;
      select.dispatchEvent(new Event('change'));
    });
  }

  document.querySelectorAll('.js-case-type').forEach(function (select) {
    const card = select.closest('.lead-card') || document;
    const embed = card.querySelector('[data-cddform]');
    const lock = card.querySelector('.form-embed-lock');
    const chip = document.getElementById('case-chip');
    const saved = new URLSearchParams(window.location.search).get('case_type');
    if (saved && Array.prototype.some.call(select.options, function (opt) { return opt.value === saved; })) {
      select.value = saved;
    }

    const sync = function () {
      const value = select.value;
      if (lock) lock.classList.toggle('is-locked', !value);
      if (chip && value) chip.textContent = 'Reviewing: ' + value;
      if (!value || !embed) return;
      rememberCaseType(value);
      bindCaseTypeIframe(embed);
    };
    select.addEventListener('change', sync);
    if (select.value) sync();
  });

  /* ── Process tabs ────────────────────── */
  const stepPhoto = document.getElementById('step-photo');
  const stepTitle = document.getElementById('step-title');
  const stepLine = document.getElementById('step-line');
  document.querySelectorAll('.step-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.step-tab').forEach(function (t) {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      if (stepPhoto && tab.dataset.img) {
        stepPhoto.src = tab.dataset.img;
        stepPhoto.alt = tab.dataset.alt || '';
      }
      if (stepTitle) stepTitle.textContent = tab.dataset.title || '';
      if (stepLine) stepLine.textContent = tab.dataset.line || '';
    });
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
