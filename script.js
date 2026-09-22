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

function productCardHTML(p, lang) {
  return `
    <div class="product-card">
      <div class="product-name">${p.name[lang]}</div>
      <ul class="product-list">${p.items[lang].map(x => `<li>${x}</li>`).join('')}</ul>
    </div>`;
}

/* ---------- DM / WhatsApp messages ---------- */

function genericMessage(lang) {
  return lang === 'ar'
    ? 'مرحبًا! أريد أن أبدأ مع VSHVDOW 💪'
    : "Hi! I'd like to get started with VSHVDOW 💪";
}
function bundleMessage(lang, name, isWaitlist) {
  if (lang === 'ar') {
    return isWaitlist ? `مرحبًا! أريد الانضمام لقائمة انتظار ${name} 💪` : `مرحبًا! أنا مهتم بباقة ${name} 💪`;
  }
  return isWaitlist ? `Hi! I'd like to join the waitlist for ${name} 💪` : `Hi! I'm interested in the ${name} bundle 💪`;
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
  const msg = genericMessage(lang);
  wireDmButton(document.getElementById('heroCta'), msg);
  wireDmButton(document.getElementById('navCta'), msg);
  wireDmButton(document.getElementById('contactCta'), msg);

  document.querySelectorAll('.dm-btn').forEach(btn => {
    wireDmButton(btn, bundleMessage(lang, btn.dataset.bundleName, btn.dataset.waitlist === 'true'));
  });

  const waMsg = lang === 'ar' ? 'مرحبًا! أريد الاستفسار عن التدريب مع VSHVDOW' : "Hi! I'd like to ask about coaching with VSHVDOW";
  const wa = document.getElementById('whatsappCta');
  if (wa) wa.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(waMsg)}`;

  document.getElementById('igLink').href = CONFIG.instagramUrl;
  document.getElementById('fbLink').href = CONFIG.facebookUrl;
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
  document.getElementById('productsGrid').innerHTML = PRODUCTS.map(p => productCardHTML(p, lang)).join('');

  document.getElementById('aboutTitle').textContent = C.about.title;
  document.getElementById('aboutBody').innerHTML = C.about.body.map(p => `<p>${p}</p>`).join('');

  document.getElementById('resultsTitle').textContent = C.results.title;
  document.getElementById('resultsBody').textContent = C.results.body;

  document.getElementById('contactTitle').textContent = C.contact.title;
  document.getElementById('contactSub').textContent = C.contact.sub;
  document.getElementById('contactCta').textContent = C.contact.cta;
  document.getElementById('contactOr').textContent = C.contact.or;
  document.getElementById('whatsappCta').textContent = C.contact.whatsappCta;

  document.getElementById('footerTagline').textContent = C.footer.tagline;
  document.getElementById('footerRights').textContent = C.footer.rights;

  wireDynamicButtons(lang);
}

/* ---------- theme + language controls ---------- */

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem('vshvdow-theme', theme); } catch (e) {}
}

function setLang(lang) {
  try { localStorage.setItem('vshvdow-lang', lang); } catch (e) {}
  render(lang);
}

document.getElementById('themeToggle').addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme');
  setTheme(cur === 'dark' ? 'light' : 'dark');
});

document.getElementById('langToggle').addEventListener('click', () => {
  setLang(currentLang === 'ar' ? 'en' : 'ar');
});

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
