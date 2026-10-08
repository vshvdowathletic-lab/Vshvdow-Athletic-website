/* ==========================================================
   VSHVDOW — script.js
   Renders everything from content.js into the page, and wires
   up language / theme toggles, mobile nav, and the DM buttons.
   You shouldn't need to edit this file to update text or
   prices — see content.js for that.
   ========================================================== */

let currentLang = document.documentElement.getAttribute('lang') || CONFIG.defaultLang;
let toastTimer;

/* ---------- small template helpers ---------- */

function layerHTML(layer) {
  // --step: 0 = Layer 5 (peak, narrowest) ... 4 = Layer 1 (base, full width).
  // styles.css turns it into the width, with a gentler slope on phones.
  return `
    <div class="layer" style="--step:${5 - layer.n}">
      <span class="layer-num">0${layer.n}</span>
      <div class="layer-name">${layer.name}</div>
      <div class="layer-detail">${layer.detail}</div>
    </div>`;
}

function spotsLeftLabel(lang, n) {
  if (lang === 'ar') {
    if (n === 1) return 'فاضل مكان واحد';
    if (n === 2) return 'فاضل مكانين';
    return n <= 10 ? `فاضل ${n} أماكن` : `فاضل ${n} مكان`;
  }
  return `${n} spot${n === 1 ? '' : 's'} left`;
}

function bundleCardHTML(b, lang) {
  const t = CONTENT[lang].bundles;
  const isFull = b.spotsLeft <= 0;

  const sections = b.sections.map(sec => `
      <div>
        <div class="bundle-list-title">${sec.title[lang]}</div>
        <ul class="bundle-list">${sec.items.map(it => `<li>${it[lang]}</li>`).join('')}</ul>
      </div>`).join('');

  const bestList = b.bestFor[lang].map(x => `<li>${x}</li>`).join('');
  const ctaLabel = isFull ? t.waitlistCta : `${t.joinWord} ${b.name}`;

  return `
    <article class="bundle-card${b.featured ? ' featured' : ''}">
      <div class="bundle-badge">${b.badge[lang]}</div>
      <div>
        <div class="bundle-name">${b.name}</div>
        <div class="bundle-price">${b.priceUSD}<small>${t.perMonth}</small><span class="egp">${b.priceEGP} EGP</span></div>
        <div class="bundle-minimum">${t.minimum}</div>
      </div>
      <div class="spots-row${isFull ? ' is-full' : ''}">
        <span class="spots-dot"></span>
        <span class="spots-label">${isFull ? t.waitlistBadge : spotsLeftLabel(lang, b.spotsLeft)}</span>
      </div>
      ${sections}
      <div class="bundle-best">
        <div class="bundle-list-title">${t.bestForTitle}</div>
        <ul class="bundle-best-list">${bestList}</ul>
      </div>
      <a href="#" class="btn btn-primary dm-btn${isFull ? ' is-waitlist' : ''}" data-bundle-id="${b.id}" data-waitlist="${isFull}">${ctaLabel}</a>
    </article>`;
}

function productCardHTML(p, lang, i) {
  return `
    <article class="product-card" role="listitem">
      <div class="product-media">
        <img src="${p.image}" alt="" loading="lazy" decoding="async">
      </div>
      <div class="product-overlay">
        <div class="product-top">
          <span class="product-num">0${i + 1}</span>
          <img src="vshvdow-icon.svg" alt="" class="product-mark">
        </div>
        <div class="product-bottom">
          <h3 class="product-title">${p.name[lang]}</h3>
          <p class="product-line">${p.line[lang]}</p>
        </div>
      </div>
    </article>`;
}

/* ---------- DM messages ---------- */

function bundleMessage(lang, bundleId, isWaitlist) {
  const b = BUNDLES.find(x => x.id === bundleId);
  if (!b) return '';
  const tpl = DM_MESSAGES[lang][isWaitlist ? 'waitlist' : 'join'];
  const price = lang === 'ar' ? b.priceEGP : b.priceUSD;
  return tpl.replace(/\{name\}/g, b.name).replace(/\{price\}/g, price);
}

/* Copies text synchronously (works on every browser, and finishes
   before the DM tab/app takes focus), then also tries the modern
   clipboard API as a backup. */
function copyText(text) {
  let ok = false;
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none;';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    ta.setSelectionRange(0, text.length);
    ok = document.execCommand('copy');
    document.body.removeChild(ta);
  } catch (e) {}
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).catch(() => {});
    ok = true;
  }
  return ok;
}

/* Instagram doesn't let websites pre-type a DM, so the bundle button
   copies a ready-written message, then opens the DM thread straight
   away — the visitor just pastes and sends. */
function wireDmButton(el) {
  if (!el) return;
  el.href = `https://ig.me/m/${CONFIG.instagramHandle}`;
  el.target = '_blank';
  el.rel = 'noopener';
  el.onclick = function () {
    const msg = bundleMessage(currentLang, el.dataset.bundleId, el.dataset.waitlist === 'true');
    if (msg && copyText(msg)) showToast(CONTENT[currentLang].ui.copiedToast);
    // no preventDefault — the link opens the DM in the same tap
  };
}

function wireDynamicButtons() {
  // Hero, nav, and contact CTAs scroll to the Bundles section (plain
  // #bundles links). Only the per-bundle buttons open a DM.
  document.querySelectorAll('.dm-btn').forEach(wireDmButton);
  document.getElementById('igLink').href = CONFIG.instagramUrl;
  document.getElementById('ttLink').href = CONFIG.tiktokUrl;
}

/* ---------- "Join the Shadow" signup ---------- */
/* Sends the email to CONFIG.signupEndpoint (FormSubmit), which forwards it
   to your Gmail. No page reload; the button and a short line of text show
   what happened. A hidden "_honey" field quietly drops spam bots. */
function setJoinStatus(text, state) {
  const el = document.getElementById('joinStatus');
  el.textContent = text;
  el.dataset.state = state || '';
}

(function initSignup() {
  const form = document.getElementById('joinForm');
  const input = document.getElementById('joinEmail');
  const btn = document.getElementById('joinBtn');
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const t = CONTENT[currentLang].join;
    const email = input.value.trim();
    if (!EMAIL.test(email)) { setJoinStatus(t.invalid, 'error'); input.focus(); return; }
    if (form.elements._honey.value) { setJoinStatus(t.success, 'ok'); form.reset(); return; }

    btn.disabled = true; btn.textContent = t.sending; setJoinStatus('', '');
    try {
      const res = await fetch(CONFIG.signupEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          email,
          language: currentLang === 'ar' ? 'Arabic' : 'English',
          _subject: 'New VSHVDOW signup',
          _template: 'table',
          _captcha: 'false',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && String(data.success) === 'true') {
        setJoinStatus(CONTENT[currentLang].join.success, 'ok');
        form.reset();
      } else {
        setJoinStatus(CONTENT[currentLang].join.error, 'error');
      }
    } catch (err) {
      setJoinStatus(CONTENT[currentLang].join.error, 'error');
    } finally {
      btn.disabled = false; btn.textContent = CONTENT[currentLang].join.button;
    }
  });
  input.addEventListener('input', () => { if (document.getElementById('joinStatus').dataset.state === 'error') setJoinStatus('', ''); });
})();

/* ---------- toast ---------- */

function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 4200);
}

/* ---------- scroll reveal ---------- */
/* Tags sections, cards and the pyramid with .rv and adds .in as each one
   reaches the screen (styles.css does the motion). The pyramid builds up
   from its base; bundle cards come in one after another. */
const REVEAL_SELECTORS = [
  '.section-inner > h2', '.section-sub', '.pricing-note', '.fx-note', '.band-line',
  '.bundle-card', '.layer', '.products-banner-copy', '.product-rail',
  '.about-media', '.about-copy', '.results-media', '.results-copy', '.contact-inner > *',
  '.section-inner > .eyebrow', '.signup-inner > *',
];
const revealObserver = ('IntersectionObserver' in window)
  ? new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); revealObserver.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 })
  : null;

function setupReveal() {
  if (!revealObserver) return;
  document.querySelectorAll(REVEAL_SELECTORS.join(',')).forEach((el) => {
    if (el.classList.contains('rv')) return;
    el.classList.add('rv');
    revealObserver.observe(el);
  });
  // pyramid: base (last in the list) first, peak last
  const layers = [...document.querySelectorAll('#pyramidLayers .layer')];
  layers.forEach((el, i) => el.style.setProperty('--d', `${(layers.length - 1 - i) * 0.12}s`));
  document.querySelectorAll('#bundleGrid .bundle-card').forEach((el, i) => el.style.setProperty('--d', `${i * 0.1}s`));
  document.querySelectorAll('.contact-inner > *').forEach((el, i) => el.style.setProperty('--d', `${i * 0.08}s`));
}

/* ---------- main render ---------- */

function render(lang) {
  currentLang = lang;
  const C = CONTENT[lang];

  document.documentElement.lang = lang;
  document.documentElement.dir = C.dir;
  document.title = C.metaTitle;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', C.metaDescription);

  document.querySelectorAll('[data-nav]').forEach(a => { a.textContent = C.nav[a.dataset.nav]; });
  document.getElementById('langToggle').textContent = C.ui.langSwitch;
  document.getElementById('langToggleMobile').textContent = C.ui.langSwitch;

  document.getElementById('heroLine1').textContent = C.hero.line1;
  document.getElementById('heroLine2').textContent = C.hero.line2;
  document.getElementById('heroCta').textContent = C.hero.cta;

  document.getElementById('pyramidTitle').textContent = C.pyramid.title;
  document.getElementById('pyramidSub').textContent = C.pyramid.sub;
  document.getElementById('pyramidLayers').innerHTML = C.layers.map(layerHTML).join('');

  document.getElementById('bandLine').textContent = C.footer.tagline;

  document.getElementById('bundlesTitle').textContent = C.bundles.title;
  document.getElementById('bundlesSub').textContent = C.bundles.sub;
  document.getElementById('pricingNote').textContent = C.bundles.pricingNote;
  document.getElementById('fxNote').textContent = C.bundles.fxNote;
  document.getElementById('bundleGrid').innerHTML = BUNDLES.map(b => bundleCardHTML(b, lang)).join('');

  document.getElementById('productsTitle').textContent = C.products.title;
  document.getElementById('productsSub').textContent = C.products.sub;
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = PRODUCTS.map((p, i) => productCardHTML(p, lang, i)).join('');
  grid.setAttribute('aria-label', C.products.title);

  document.getElementById('aboutTitle').textContent = C.about.title;
  document.getElementById('aboutBody').innerHTML = C.about.body.map(p => `<p>${p}</p>`).join('');

  document.getElementById('resultsTitle').textContent = C.results.title;
  document.getElementById('resultsBody').textContent = C.results.body;

  document.getElementById('contactTitle').textContent = C.contact.title;
  document.getElementById('contactSub').textContent = C.contact.sub;
  document.getElementById('contactCta').textContent = C.contact.cta;

  // section labels ("01 — The method" …) — the number is set in Aileron
  Object.entries(C.eyebrows).forEach(([key, text]) => {
    const el = document.getElementById(`${key}Eyebrow`);
    if (!el) return;
    const cut = text.indexOf(' — ');
    if (cut < 1) { el.textContent = text; return; }
    const num = document.createElement('span');
    num.className = 'num';
    num.textContent = text.slice(0, cut);
    el.replaceChildren(num, text.slice(cut));
  });
  document.getElementById('scrollCue').setAttribute('aria-label', C.ui.scrollCue);

  // signup
  document.getElementById('joinTitle').textContent = C.join.title;
  document.getElementById('joinSub').textContent = C.join.sub;
  document.getElementById('joinLabel').textContent = C.join.label;
  document.getElementById('joinEmail').placeholder = C.join.placeholder;
  const joinBtn = document.getElementById('joinBtn');
  if (!joinBtn.disabled) joinBtn.textContent = C.join.button;
  setJoinStatus('', '');

  document.getElementById('footerTagline').textContent = C.footer.tagline;
  document.getElementById('footerRights').textContent = C.footer.rights;

  wireDynamicButtons();
  updateHeaderTone();
  setupReveal();
}

/* ---------- transparent header: keep the text readable ---------- */

// Sections that are always a dark photo (regardless of light/dark theme).
// The number is how much of the top/bottom edge melts into the page
// colour — the header only turns white once it's over the dark middle.
const DARK_ZONES = [['.hero', 0], ['.band', 0.2], ['.contact-section', 0.2]];

function updateHeaderTone() {
  const header = document.getElementById('siteHeader');
  if (!header) return;
  const y = header.getBoundingClientRect().height / 2; // header's centre line
  const covers = (el, edge) => {
    const r = el.getBoundingClientRect();
    const pad = r.height * edge;
    return r.top + pad <= y && r.bottom - pad >= y;
  };

  let tone = null;
  for (const [sel, edge] of DARK_ZONES) {
    if ([...document.querySelectorAll(sel)].some((el) => covers(el, edge))) { tone = 'dark'; break; }
  }
  header.classList.toggle('scrolled', window.scrollY > 8);
  header.classList.toggle('on-dark', tone === 'dark');
  header.classList.toggle('on-light', tone === 'light');
}

let toneTicking = false;
function queueHeaderTone() {
  if (toneTicking) return;
  toneTicking = true;
  requestAnimationFrame(() => { toneTicking = false; updateHeaderTone(); });
}
window.addEventListener('scroll', queueHeaderTone, { passive: true });
window.addEventListener('resize', queueHeaderTone);

/* ---------- theme + language controls ---------- */

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem('vshvdow-theme', theme); } catch (e) {}
  const label = theme === 'dark' ? CONTENT[currentLang].ui.themeToLight : CONTENT[currentLang].ui.themeToDark;
  document.getElementById('themeToggle').setAttribute('aria-label', label);
  document.getElementById('themeToggleMobile').textContent = label;
  updateHeaderTone();
}

function toggleTheme() {
  const cur = document.documentElement.getAttribute('data-theme');
  setTheme(cur === 'dark' ? 'light' : 'dark');
}

function setLang(lang) {
  try { localStorage.setItem('vshvdow-lang', lang); } catch (e) {}
  render(lang);
}

function toggleLang() {
  setLang(currentLang === 'ar' ? 'en' : 'ar');
}

document.getElementById('themeToggle').addEventListener('click', toggleTheme);
document.getElementById('themeToggleMobile').addEventListener('click', toggleTheme);
document.getElementById('langToggle').addEventListener('click', toggleLang);
document.getElementById('langToggleMobile').addEventListener('click', toggleLang);

/* ---------- mobile nav ---------- */

const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

function closeMenu() {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
mainNav.addEventListener('click', (e) => { if (e.target.tagName === 'A') closeMenu(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

/* ---------- init ---------- */

render(currentLang);
document.getElementById('footerYear').textContent = new Date().getFullYear();

// Populate the theme button's label/aria-text for whichever theme the
// inline head-script already applied, without actually toggling it.
setTheme(document.documentElement.getAttribute('data-theme') || 'light');

// Only load the hero video on wider screens (saves mobile data) and only
// if the visitor hasn't asked for reduced motion. On narrow screens or
// with reduced motion on, the <video poster="hero.jpg"> just shows the
// still photo forever — nothing extra to load, nothing to break.
(function initHeroVideo() {
  const isWide = window.matchMedia('(min-width: 768px)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!isWide || reduceMotion) return;
  const video = document.getElementById('heroVideo');
  const source = document.getElementById('heroVideoSource');
  source.src = 'hero.mp4';
  video.load();
})();
