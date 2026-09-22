/* =========================================
   FraudFund Recovery – Shared Layout
   Injects header (navbar) and footer into
   every page from a single source of truth.
   ========================================= */

(function () {

  /* ── Active page detection (pathname only) ─ */
  const path = window.location.pathname.toLowerCase();

  const isLpPage = path.includes('/lp');

  const activePage =
    path.includes('/services')       ? 'services' :
    path.includes('/about')          ? 'about'   :
    path.includes('/contact')        ? 'contact' :
    path.includes('/privacy-policy') ? 'legal'   :
    path.includes('/terms')          ? 'legal'   :
    path.includes('/disclaimer')     ? 'legal'   :
    path.includes('/thank-you')      ? 'none'    :
    'home';

  function active(page) {
    return activePage === page
      ? ' style="color:var(--navy);font-weight:700;"'
      : '';
  }

  /* ── Routes: LP page uses /lp/#anchors; root pages use /#anchors ─ */
  const LP_BASE = '/lp/';
  const R = isLpPage
    ? {
        home: LP_BASE,
        about: '/about/',
        contact: '/contact/',
        privacy: '/privacy-policy/',
        terms: '/terms/',
        disclaimer: '/disclaimer/',
        thankYou: '/thank-you/',
        services: '/services/',
        howItWorks: LP_BASE + '#how-it-works',
        faq: LP_BASE + '#faq',
        getHelp: LP_BASE + '#get-help',
        favicon: '/images/favicon.png',
      }
    : {
        home: '/',
        about: '/about/',
        contact: '/contact/',
        privacy: '/privacy-policy/',
        terms: '/terms/',
        disclaimer: '/disclaimer/',
        thankYou: '/thank-you/',
        services: '/services/',
        howItWorks: '/#how-it-works',
        faq: '/#faq',
        getHelp: '/#get-help',
        favicon: '/images/favicon.png',
      };

  /* ── Header HTML ───────────────────────── */
  const HEADER = `
<nav class="navbar" role="navigation" aria-label="Main navigation">
  <div class="container nav-inner">

    <a href="${R.home}" class="nav-logo">
      <img src="${R.favicon}" alt="FraudFund Recovery Logo" class="logo-icon" width="20" height="20">
      FraudFund Recovery
    </a>

    <div class="nav-links" id="nav-links">
      <a href="${R.home}"${active('home')}>Home</a>
      <a href="${R.services}"${active('services')}>Services</a>
      <a href="${R.howItWorks}">How It Works</a>
      <a href="${R.faq}">FAQ</a>
      <a href="${R.about}"${active('about')}>About Us</a>
      <a href="${R.contact}"${active('contact')}>Contact</a>
      <a href="${R.getHelp}" class="btn btn-primary nav-cta">Free Evaluation</a>
    </div>

    <button class="hamburger" aria-label="Open menu" onclick="toggleMenu()">
      <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <line x1="3" y1="6" x2="21" y2="6"/>
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    </button>

  </div>
</nav>`;

  /* ── Footer HTML ───────────────────────── */
  const FOOTER = `
<div class="disclaimer-bar">
  <div class="container">
    <p>
      <strong>Important Disclaimer:</strong> FraudFund Recovery provides confidential
      recovery assistance for online-fraud cases, with integrity, caution, and reliability.
      Each case is unique and depends on the facts and available evidence.
      We do not guarantee that funds will be returned.
      We are not a government agency or financial institution.
    </p>
  </div>
</div>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">

      <div class="footer-brand">
        <a href="${R.home}" class="nav-logo" style="color:white;">
          <img src="${R.favicon}" alt="FraudFund Recovery Logo" class="logo-icon" width="20" height="20">
          FraudFund Recovery
        </a>
        <p>Confidential case review and recovery assistance for online-fraud cases across the United States. Dedicated to every case.</p>
        <p style="font-size:.78rem;margin-top:.5rem;">
          1250 Broadway, Suite 3600<br>New York, NY 10001<br>
          <a href="mailto:info@fraudfundrecovery.com" style="color:rgba(255,255,255,.65);">
            info@fraudfundrecovery.com
          </a>
        </p>
      </div>

      <div class="footer-col">
        <h4>Services</h4>
        <ul>
          <li><a href="${R.services}#phishing">Phishing &amp; Malware</a></li>
          <li><a href="${R.services}#exchanges">Fake Exchanges &amp; Miners</a></li>
          <li><a href="${R.services}#investments">Credit Card &amp; Fake Investments</a></li>
          <li><a href="${R.services}#real-estate">Real Estate &amp; Virtual Investments</a></li>
          <li><a href="${R.services}#romance">Romance &amp; Impersonation</a></li>
          <li><a href="${R.services}#task-scams">Task Scams &amp; Other Fraud</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="${R.about}">About Us</a></li>
          <li><a href="${R.contact}">Contact</a></li>
          <li><a href="${R.faq}">FAQ</a></li>
          <li><a href="${R.disclaimer}">Disclaimer</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Legal</h4>
        <ul>
          <li><a href="${R.privacy}">Privacy Policy</a></li>
          <li><a href="${R.terms}">Terms of Service</a></li>
          <li><a href="${R.disclaimer}">Disclaimer</a></li>
        </ul>
        <p style="font-size:.75rem;color:rgba(255,255,255,.4);margin-top:1.25rem;">
          We are not affiliated with the FTC, FBI, or any government agency.
        </p>
      </div>

    </div>

    <div class="footer-bottom">
      <p>&copy; 2026 FraudFund Recovery LLC. All rights reserved.</p>
      <div class="footer-links">
        <a href="${R.privacy}">Privacy Policy</a>
        <a href="${R.terms}">Terms of Service</a>
        <a href="${R.disclaimer}">Disclaimer</a>
        <a href="${R.contact}">Contact</a>
      </div>
    </div>

  </div>
</footer>`;

  /* ── Inject on DOM ready ────────────────── */
  function inject() {
    const headerEl = document.getElementById('site-header');
    const footerEl = document.getElementById('site-footer');
    if (headerEl) headerEl.innerHTML = HEADER;
    if (footerEl) footerEl.innerHTML = FOOTER;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();
