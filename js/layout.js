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

    <a href="${P}index.html" class="nav-logo">
      <span class="logo-icon">
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
        </svg>
      </span>
      FraudFund Recovery
    </a>

    <div class="nav-links" id="nav-links">
      <a href="${P}index.html"${active('home')}>Home</a>
      <a href="${P}index.html#services">Services</a>
      <a href="${P}index.html#how-it-works">How It Works</a>
      <a href="${P}index.html#faq">FAQ</a>
      <a href="${P}about/index.html"${active('about')}>About Us</a>
      <a href="${P}contact/index.html"${active('contact')}>Contact</a>
      <a href="${P}index.html#get-help" class="btn btn-primary nav-cta">Free Evaluation</a>
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
        <a href="${P}index.html" class="nav-logo" style="color:white;">
          <span class="logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            </svg>
          </span>
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
          <li><a href="${P}index.html#services">Free Case Evaluation</a></li>
          <li><a href="${P}index.html#services">Fraud Documentation</a></li>
          <li><a href="${P}index.html#services">Report Filing Assistance</a></li>
          <li><a href="${P}index.html#services">Attorney Referral</a></li>
          <li><a href="${P}index.html#services">Digital Evidence Tracing</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="${P}about/index.html">About Us</a></li>
          <li><a href="${P}contact/index.html">Contact</a></li>
          <li><a href="${P}index.html#faq">FAQ</a></li>
          <li><a href="${P}disclaimer/index.html">Disclaimer</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Legal</h4>
        <ul>
          <li><a href="${P}privacy-policy/index.html">Privacy Policy</a></li>
          <li><a href="${P}terms/index.html">Terms of Service</a></li>
          <li><a href="${P}disclaimer/index.html">Disclaimer</a></li>
        </ul>
        <p style="font-size:.75rem;color:rgba(255,255,255,.4);margin-top:1.25rem;">
          We are not affiliated with the FTC, FBI, or any government agency.
        </p>
      </div>

    </div>

    <div class="footer-bottom">
      <p>&copy; 2026 FraudFund Recovery LLC. All rights reserved. Not a law firm.</p>
      <div class="footer-links">
        <a href="${P}privacy-policy/index.html">Privacy Policy</a>
        <a href="${P}terms/index.html">Terms of Service</a>
        <a href="${P}disclaimer/index.html">Disclaimer</a>
        <a href="${P}contact/index.html">Contact</a>
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
