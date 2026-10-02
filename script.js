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
  const w = 40 + (5 - layer.n) * 15; // Layer 5 = 40% (peak) ... Layer 1 = 100% (base)
  return `
    <div class="layer" style="width:${w}%">
      <span class="layer-num">0${layer.n}</span>
      <div class="layer-name">${layer.name}</div>
      <div class="layer-detail">${layer.detail}</div>
    </div>`;
}

function spotsLeftLabel(lang, n) {
  if (lang === 'ar') {
    const words = { 1: 'مكان واحد', 2: 'مكانان', 3: '3 أماكن', 4: '4 أماكن' };
    return `متبقٍ ${words[n] || n + ' أماكن'}`;
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
  const joinWord = lang === 'ar' ? 'انضم إلى' : 'Join';
  const ctaLabel = isFull ? t.waitlistCta : `${joinWord} ${b.name}`;

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
      <a href="#" class="btn btn-primary dm-btn${isFull ? ' is-waitlist' : ''}" data-bundle-name="${b.name}" data-waitlist="${isFull}">${ctaLabel}</a>
    </article>`;
}

// Simple line artwork for each cover, picked by product id.
const COVER_ART = {
  welcome:   '<circle cx="60" cy="60" r="7" fill="currentColor" stroke="none"/><circle cx="60" cy="60" r="24"/><circle cx="60" cy="60" r="42"/>',
  training:  '<line x1="8" y1="60" x2="112" y2="60"/><rect x="24" y="30" width="9" height="60" rx="2"/><rect x="37" y="40" width="9" height="40" rx="2"/><rect x="87" y="30" width="9" height="60" rx="2"/><rect x="74" y="40" width="9" height="40" rx="2"/>',
  nutrition: '<circle cx="60" cy="60" r="40"/><line x1="60" y1="60" x2="60" y2="20"/><line x1="60" y1="60" x2="94.6" y2="80"/><line x1="60" y1="60" x2="25.4" y2="80"/>',
  tracker:   '<line x1="10" y1="100" x2="110" y2="100"/><polyline points="14,88 40,66 62,74 88,40 108,24"/><circle cx="40" cy="66" r="3.5" fill="currentColor" stroke="none"/><circle cx="62" cy="74" r="3.5" fill="currentColor" stroke="none"/><circle cx="88" cy="40" r="3.5" fill="currentColor" stroke="none"/><circle cx="108" cy="24" r="3.5" fill="currentColor" stroke="none"/>',
};

function coverHTML(p, lang, i) {
  const art = COVER_ART[p.id] || '';
  return `
    <article class="cover">
      <span class="cover-num">0${i + 1}</span>
      <svg class="cover-art" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${art}</svg>
      <div>
        <h3 class="cover-title">${p.name[lang]}</h3>
        <p class="cover-line">${p.line[lang]}</p>
      </div>
    </article>`;
}

/* ---------- DM / WhatsApp messages ---------- */

function bundleMessage(lang, name, isWaitlist) {
  if (lang === 'ar') {
    return isWaitlist
      ? `مرحبًا! باقة ${name} مكتملة حاليًا — أرغب في الانضمام لقائمة الانتظار، من فضلك.`
      : `مرحبًا! أرغب في البدء بباقة ${name} — هل يمكنك إخباري بالخطوات التالية؟`;
  }
  return isWaitlist
    ? `Hi! I see ${name} is full right now — I'd like to join the waitlist, please.`
    : `Hi! I'd like to start the ${name} bundle — could you walk me through the next steps?`;
}

/* Instagram links can't be pre-filled with text the way WhatsApp
   can, so we copy the message to the clipboard as a courtesy and
   open the DM thread — the href still works even if the clipboard
   call fails or is blocked. */
function wireDmButton(el, message) {
  if (!el) return;
  el.href = `https://ig.me/m/${CONFIG.instagramHandle}`;
  el.target = '_blank';
  el.rel = 'noopener';
  el.onclick = function () {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(message)
        .then(() => showToast(CONTENT[currentLang].ui.copiedToast))
        .catch(() => {});
    }
  };
}

function wireDynamicButtons(lang) {
  // Hero, nav, and contact CTAs all point at the Bundles section rather
  // than opening a chat directly — hrefs are already #bundles in the HTML,
  // nothing to wire here. Only the per-bundle buttons open a DM.
  document.querySelectorAll('.dm-btn').forEach(btn => {
    wireDmButton(btn, bundleMessage(lang, btn.dataset.bundleName, btn.dataset.waitlist === 'true'));
  });

  document.getElementById('igLink').href = CONFIG.instagramUrl;
  document.getElementById('ttLink').href = CONFIG.tiktokUrl;
  document.getElementById('waLink').href = `https://wa.me/${CONFIG.whatsappNumber}`;
}

/* ---------- toast ---------- */

function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
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
  document.getElementById('navCta').textContent = C.nav.cta;
  document.getElementById('langToggle').textContent = C.ui.langSwitch;
  document.getElementById('langToggleMobile').textContent = C.ui.langSwitch;

  document.getElementById('heroLine1').textContent = C.hero.line1;
  document.getElementById('heroLine2').textContent = C.hero.line2;
  document.getElementById('heroSub').textContent = C.hero.sub;
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
  const rail = document.getElementById('productsRail');
  rail.innerHTML = PRODUCTS.map((p, i) => coverHTML(p, lang, i)).join('');
  rail.setAttribute('aria-label', C.products.title);
  rail.scrollLeft = 0;
  document.getElementById('railPrev').setAttribute('aria-label', C.ui.railPrev);
  document.getElementById('railNext').setAttribute('aria-label', C.ui.railNext);
  updateRailButtons();

  document.getElementById('aboutTitle').textContent = C.about.title;
  document.getElementById('aboutBody').innerHTML = C.about.body.map(p => `<p>${p}</p>`).join('');

  document.getElementById('resultsTitle').textContent = C.results.title;
  document.getElementById('resultsBody').textContent = C.results.body;

  document.getElementById('contactTitle').textContent = C.contact.title;
  document.getElementById('contactSub').textContent = C.contact.sub;
  document.getElementById('contactCta').textContent = C.contact.cta;

  document.getElementById('footerTagline').textContent = C.footer.tagline;
  document.getElementById('footerRights').textContent = C.footer.rights;

  wireDynamicButtons(lang);
  updateHeaderTone();
}

/* ---------- transparent header: keep the text readable ---------- */

// Sections that are always a dark photo (regardless of light/dark theme).
const DARK_ZONES = '.hero, .band, .contact-section';

function updateHeaderTone() {
  const header = document.getElementById('siteHeader');
  if (!header) return;
  const y = header.getBoundingClientRect().height / 2; // header's centre line
  const covers = (el) => {
    const r = el.getBoundingClientRect();
    return r.top <= y && r.bottom >= y;
  };

  let tone = null;
  for (const el of document.querySelectorAll(DARK_ZONES)) {
    if (covers(el)) { tone = 'dark'; break; }
  }
  if (!tone) {
    // the featured bundle card is black in light theme and white in dark theme
    const featured = document.querySelector('.bundle-card.featured');
    if (featured && covers(featured)) {
      tone = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    }
  }
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

/* ---------- swipeable "book cover" rail (What's Included) ---------- */

function updateRailButtons() {
  const rail = document.getElementById('productsRail');
  if (!rail) return;
  const max = rail.scrollWidth - rail.clientWidth;
  const pos = Math.abs(rail.scrollLeft); // scrollLeft goes negative in RTL
  document.getElementById('railPrev').disabled = pos <= 2;
  document.getElementById('railNext').disabled = max <= 2 || pos >= max - 2;
}

function scrollRail(direction) { // +1 = next, -1 = previous (reading direction)
  const rail = document.getElementById('productsRail');
  const cover = rail.querySelector('.cover');
  const gap = parseFloat(getComputedStyle(rail).columnGap) || 24;
  const step = cover ? cover.getBoundingClientRect().width + gap : rail.clientWidth * 0.8;
  const rtl = document.documentElement.dir === 'rtl';
  rail.scrollBy({ left: direction * (rtl ? -1 : 1) * step, behavior: 'smooth' });
}

document.getElementById('railPrev').addEventListener('click', () => scrollRail(-1));
document.getElementById('railNext').addEventListener('click', () => scrollRail(1));
document.getElementById('productsRail').addEventListener('scroll', updateRailButtons, { passive: true });
window.addEventListener('resize', updateRailButtons);

// Mouse drag-to-swipe (touch and trackpads already swipe natively).
(function railDrag() {
  const rail = document.getElementById('productsRail');
  let down = false, startX = 0, startLeft = 0;
  rail.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return;
    down = true; startX = e.clientX; startLeft = rail.scrollLeft;
    rail.classList.add('dragging');
  });
  window.addEventListener('pointermove', (e) => {
    if (!down) return;
    rail.scrollLeft = startLeft - (e.clientX - startX);
  });
  window.addEventListener('pointerup', () => {
    if (!down) return;
    down = false;
    rail.classList.remove('dragging');
  });
})();

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
