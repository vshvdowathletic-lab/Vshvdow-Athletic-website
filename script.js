/* ==========================================================
   VSHVDOW · script.js
   Renders everything from content.js into the page, and wires
   up language / theme toggles, mobile nav, and the DM buttons.
   You shouldn't need to edit this file to update text or
   prices. See content.js for that.
   ========================================================== */

let currentLang = document.documentElement.getAttribute('lang') || CONFIG.defaultLang;
let toastTimer;

// Both pages (index.html and mission.html) share this file. Anything that
// isn't on the current page is simply skipped.
const PAGE = document.body.dataset.page || 'home';
const $ = (id) => document.getElementById(id);
function setText(id, text) { const el = $(id); if (el && text != null) el.textContent = text; }

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

/* Prices live in content.js as [low, high] numbers and are written out
   in words here, so there's no dash anywhere: "$16 to $20", "799 to 999 EGP",
   or in Arabic "16 إلى 20 دولار". A single number shows on its own. */
function priceRange(lang, value, currency) {
  const t = CONTENT[lang].bundles;
  const [lo, hi] = Array.isArray(value) ? value : [value, value];
  const num = (n) => Number(n).toLocaleString('en-US');
  if (currency === 'usd' && lang !== 'ar') {
    return lo === hi ? `$${num(lo)}` : `$${num(lo)} ${t.rangeWord} $${num(hi)}`;
  }
  const unit = currency === 'usd' ? t.currencyUSD : t.currencyEGP;
  return lo === hi ? `${num(lo)} ${unit}` : `${num(lo)} ${t.rangeWord} ${num(hi)} ${unit}`;
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
        <div class="bundle-price">${priceRange(lang, b.priceUSD, 'usd')}<small>${t.perMonth}</small><span class="egp">${priceRange(lang, b.priceEGP, 'egp')}</span></div>
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
  const price = lang === 'ar' ? priceRange(lang, b.priceEGP, 'egp') : priceRange(lang, b.priceUSD, 'usd');
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
   away. The visitor just pastes and sends. */
function wireDmButton(el) {
  if (!el) return;
  el.href = `https://ig.me/m/${CONFIG.instagramHandle}`;
  el.target = '_blank';
  el.rel = 'noopener';
  el.onclick = function () {
    const msg = bundleMessage(currentLang, el.dataset.bundleId, el.dataset.waitlist === 'true');
    if (msg && copyText(msg)) showToast(CONTENT[currentLang].ui.copiedToast);
    // no preventDefault: the link opens the DM in the same tap
  };
}

function wireDynamicButtons() {
  // Hero, nav, and contact CTAs scroll to the Bundles section (plain
  // #bundles links). Only the per-bundle buttons open a DM.
  document.querySelectorAll('.dm-btn').forEach(wireDmButton);
  if ($('igLink')) $('igLink').href = CONFIG.instagramUrl;
  if ($('ttLink')) $('ttLink').href = CONFIG.tiktokUrl;
}

/* ---------- "Join the Shadow" signup ---------- */
/* Sends the email to CONFIG.signupEndpoint (FormSubmit), which emails it to
   your Gmail. It's sent as a plain form post, exactly the way FormSubmit
   documents it, so the browser doesn't need an extra permission check
   (a CORS "preflight") before sending. No page reload; a short line under
   the box says what happened. A hidden "_honey" field quietly drops bots.

   The very first signup only triggers FormSubmit's activation email to
   vshvdowathletic@gmail.com. Until "Activate Form" in that email is pressed,
   the box says so (join.activate in content.js) instead of a vague error. */
function setJoinStatus(text, state) {
  const el = document.getElementById('joinStatus');
  if (!el) return;
  el.textContent = text;
  el.dataset.state = state || '';
}

(function initSignup() {
  const form = document.getElementById('joinForm');
  if (!form) return;
  const input = document.getElementById('joinEmail');
  const btn = document.getElementById('joinBtn');
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const t = CONTENT[currentLang].join;
    const email = input.value.trim();
    if (!EMAIL.test(email)) { setJoinStatus(t.invalid, 'error'); input.focus(); return; }
    if (form.elements._honey.value) { setJoinStatus(t.success, 'ok'); form.reset(); return; }

    const body = new URLSearchParams({
      email,
      language: currentLang === 'ar' ? 'Arabic' : 'English',
      _subject: 'New VSHVDOW signup',
      _template: 'table',
      _captcha: 'false',
    });

    btn.disabled = true; btn.textContent = t.sending; setJoinStatus('', '');
    let result = 'error';
    try {
      const res = await fetch(CONFIG.signupEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body,
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && String(data.success) === 'true') result = 'ok';
      else if (/activat/i.test(String(data.message || ''))) result = 'activate';
    } catch (err) { /* offline, or the request was blocked */ }

    const T = CONTENT[currentLang].join;
    if (result === 'ok') { setJoinStatus(T.success, 'ok'); form.reset(); }
    else setJoinStatus(result === 'activate' ? T.activate : T.error, 'error');
    btn.disabled = false; btn.textContent = T.button;
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
  '.signup-inner > *', '.mission-inner > *',
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
  const meta = PAGE === 'mission' ? C.mission : C;

  document.documentElement.lang = lang;
  document.documentElement.dir = C.dir;
  document.title = meta.metaTitle;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', meta.metaDescription);

  document.querySelectorAll('[data-nav]').forEach(a => { a.textContent = C.nav[a.dataset.nav]; });
  setText('langToggle', C.ui.langSwitch);
  setText('langToggleMobile', C.ui.langSwitch);

  if (PAGE === 'home') renderHome(C, lang);
  if (PAGE === 'mission') renderMission(C);

  // signup (both pages)
  setText('joinTitle', C.join.title);
  setText('joinSub', C.join.sub);
  setText('joinLabel', C.join.label);
  if ($('joinEmail')) $('joinEmail').placeholder = C.join.placeholder;
  const joinBtn = $('joinBtn');
  if (joinBtn && !joinBtn.disabled) joinBtn.textContent = C.join.button;
  setJoinStatus('', '');

  setText('footerRights', C.footer.rights);

  wireDynamicButtons();
  updateHeaderTone();
  setupReveal();
}

function renderHome(C, lang) {
  setText('heroLine1', C.hero.line1);
  setText('heroLine2', C.hero.line2);
  setText('heroCta', C.hero.cta);

  setText('pyramidTitle', C.pyramid.title);
  setText('pyramidSub', C.pyramid.sub);
  if ($('pyramidLayers')) $('pyramidLayers').innerHTML = C.layers.map(layerHTML).join('');

  setText('bandLine', C.footer.tagline);

  setText('bundlesTitle', C.bundles.title);
  setText('bundlesSub', C.bundles.sub);
  setText('pricingNote', C.bundles.pricingNote);
  setText('fxNote', C.bundles.fxNote);
  if ($('bundleGrid')) $('bundleGrid').innerHTML = BUNDLES.map(b => bundleCardHTML(b, lang)).join('');

  setText('productsTitle', C.products.title);
  setText('productsSub', C.products.sub);
  const grid = $('productsGrid');
  if (grid) {
    grid.innerHTML = PRODUCTS.map((p, i) => productCardHTML(p, lang, i)).join('');
    grid.setAttribute('aria-label', C.products.title);
  }

  setText('aboutTitle', C.about.title);
  setText('aboutMission', C.about.missionLink);
  if ($('aboutBody')) $('aboutBody').innerHTML = C.about.body.map(p => `<p>${p}</p>`).join('');

  setText('resultsTitle', C.results.title);
  setText('resultsBody', C.results.body);

  setText('contactTitle', C.contact.title);
  setText('contactSub', C.contact.sub);
  setText('contactCta', C.contact.cta);

  if ($('scrollCue')) $('scrollCue').setAttribute('aria-label', C.ui.scrollCue);
}

function renderMission(C) {
  const M = C.mission;
  ['kicker', 'title', 'sub', 'lead', 'body', 'line', 'goal', 'note', 'statement', 'sign', 'cta']
    .forEach((key) => setText('mission' + key[0].toUpperCase() + key.slice(1), M[key]));
}

/* ---------- transparent header: keep the text readable ---------- */

// Areas whose colour never changes with the theme: dark photos (header
// turns white) and the light Mission hero (header stays black, even in dark
// mode). top/bottom = how much of each edge melts into the page colour; the
// header only switches once it's past that faded edge.
const TONE_ZONES = [
  { sel: '.hero', tone: 'dark', top: 0, bottom: 0 },
  { sel: '.band', tone: 'dark', top: 0.2, bottom: 0.2 },
  { sel: '.contact-section', tone: 'dark', top: 0.2, bottom: 0.2 },
  { sel: '.mission-hero', tone: 'light', top: 0, bottom: 0, bottomDark: 0.17 },
];

function updateHeaderTone() {
  const header = document.getElementById('siteHeader');
  if (!header) return;
  const y = header.getBoundingClientRect().height / 2; // header's centre line
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  const covers = (el, z) => {
    const r = el.getBoundingClientRect();
    const bottom = dark && z.bottomDark != null ? z.bottomDark : z.bottom;
    return r.top + r.height * z.top <= y && r.bottom - r.height * bottom >= y;
  };

  let tone = null;
  for (const z of TONE_ZONES) {
    if ([...document.querySelectorAll(z.sel)].some((el) => covers(el, z))) { tone = z.tone; break; }
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
  if ($('themeToggle')) $('themeToggle').setAttribute('aria-label', label);
  setText('themeToggleMobile', label);
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

[['themeToggle', toggleTheme], ['themeToggleMobile', toggleTheme], ['langToggle', toggleLang], ['langToggleMobile', toggleLang]]
  .forEach(([id, fn]) => { if ($(id)) $(id).addEventListener('click', fn); });

/* ---------- mobile nav ---------- */

(function initMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  if (!menuToggle || !mainNav) return;
  const closeMenu = () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };
  menuToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  mainNav.addEventListener('click', (e) => { if (e.target.tagName === 'A') closeMenu(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
})();

/* ---------- init ---------- */

render(currentLang);
setText('footerYear', new Date().getFullYear());

// Arriving from the Mission page at index.html#bundles (etc.): the page is
// built by JavaScript, so settle on the right section once everything has
// loaded, without a long animated scroll.
window.addEventListener('load', () => {
  if (!location.hash || location.hash.length < 2) return;
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
});

// Populate the theme button's label/aria-text for whichever theme the
// inline head-script already applied, without actually toggling it.
setTheme(document.documentElement.getAttribute('data-theme') || 'light');

// Only load the hero video on wider screens (saves mobile data) and only
// if the visitor hasn't asked for reduced motion. On narrow screens or
// with reduced motion on, the <video poster="hero.jpg"> just shows the
// still photo forever. Nothing extra to load, nothing to break.
(function initHeroVideo() {
  const isWide = window.matchMedia('(min-width: 768px)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!isWide || reduceMotion) return;
  const video = document.getElementById('heroVideo');
  const source = document.getElementById('heroVideoSource');
  if (!video || !source) return;
  source.src = 'hero.mp4';
  video.load();
})();
