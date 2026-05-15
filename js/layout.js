/* =========================================
   FraudFund Recovery – Shared Layout
   Injects header (navbar) and footer into
   every page from a single source of truth.
   ========================================= */

(function () {

  /* ── Depth & active page detection ─────── */
  const path = window.location.pathname.toLowerCase();

  // Detect if we are inside a subfolder (works for both file:// and http://)
  const inSubDir = /\/(about|contact|thank-you|privacy-policy|terms|disclaimer)(\/|\/index\.html)?/.test(path);

  // Prefix used for all hrefs — '' from root, '../' from any subfolder
  const P = inSubDir ? '../' : '';

  const activePage =
    path.includes('/about')          ? 'about'   :
    path.includes('/contact')        ? 'contact' :
    path.includes('/privacy-policy') ? 'legal'   :
    path.includes('/terms')          ? 'legal'   :
    path.includes('/disclaimer')     ? 'legal'   :
    path.includes('/thank-you')       ? 'none'    :
    'home';

  function active(page) {
    return activePage === page
      ? ' style="color:var(--navy);font-weight:700;"'
      : '';
  }

  /* ── Header HTML ───────────────────────── */
  const HEADER = `
<nav class="navbar" role="navigation" aria-label="Main navigation">
  <div class="container nav-inner">

    <a href="${P}" class="nav-logo">
      <img src="${P}images/favicon.png" alt="FraudFund Recovery Logo" class="logo-icon" width="20" height="20">
      FraudFund Recovery
    </a>

    <div class="nav-links" id="nav-links">
      <a href="${P}"${active('home')}>Home</a>
      <a href="${P}#services">Services</a>
      <a href="${P}#how-it-works">How It Works</a>
      <a href="${P}#faq">FAQ</a>
      <a href="${P}about/"${active('about')}>About Us</a>
      <a href="${P}contact/"${active('contact')}>Contact</a>
      <a href="${P}#get-help" class="btn btn-primary nav-cta">Free Evaluation</a>
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
      <strong>Important Disclaimer:</strong> FraudFund Recovery is a fraud reporting assistance
      and referral service. We are not a law firm, government agency, or financial institution.
      We do not guarantee the recovery of any funds. Services and outcomes vary by individual case.
      Filing a report does not guarantee any action will be taken by law enforcement.
    </p>
  </div>
</div>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">

      <div class="footer-brand">
        <a href="${P}" class="nav-logo" style="color:white;">
          <img src="${P}images/favicon.png" alt="FraudFund Recovery Logo" class="logo-icon" width="20" height="20">
          FraudFund Recovery
        </a>
        <p>Fraud reporting assistance and attorney referral services for online scam victims across the United States.</p>
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
          <li><a href="${P}#services">Free Case Evaluation</a></li>
          <li><a href="${P}#services">Fraud Documentation</a></li>
          <li><a href="${P}#services">Report Filing Assistance</a></li>
          <li><a href="${P}#services">Attorney Referral</a></li>
          <li><a href="${P}#services">Digital Evidence Tracing</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="${P}about/">About Us</a></li>
          <li><a href="${P}contact/">Contact</a></li>
          <li><a href="${P}#faq">FAQ</a></li>
          <li><a href="${P}disclaimer/">Disclaimer</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Legal</h4>
        <ul>
          <li><a href="${P}privacy-policy/">Privacy Policy</a></li>
          <li><a href="${P}terms/">Terms of Service</a></li>
          <li><a href="${P}disclaimer/">Disclaimer</a></li>
        </ul>
        <p style="font-size:.75rem;color:rgba(255,255,255,.4);margin-top:1.25rem;">
          We are not affiliated with the FTC, FBI, or any government agency.
        </p>
      </div>

    </div>

    <div class="footer-bottom">
      <p>&copy; 2026 FraudFund Recovery LLC. All rights reserved. Not a law firm.</p>
      <div class="footer-links">
        <a href="${P}privacy-policy/">Privacy Policy</a>
        <a href="${P}terms/">Terms of Service</a>
        <a href="${P}disclaimer/">Disclaimer</a>
        <a href="${P}contact/">Contact</a>
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
