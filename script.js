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

/* ---------- currency ---------- */
/* Prices are fixed per market, never converted. Arabic opens in EGP and
   English in USD, until the visitor picks one with the switch. */
function currentCurrency() {
  let saved = null;
  try { saved = localStorage.getItem('vshvdow-currency'); } catch (e) {}
  if (saved === 'EGP' || saved === 'USD') return saved;
  return currentLang === 'ar' ? 'EGP' : 'USD';
}

/* the number and its unit apart, so the big price on a coaching card stays a clean number */
function priceParts(lang, item, cur) {
  const t = CONTENT[lang].coaching;
  const n = (v) => Number(v).toLocaleString('en-US');
  if (cur === 'EGP') return { num: n(item.priceEGP), unit: t.currencyEGP };
  return lang === 'ar' ? { num: n(item.priceUSD), unit: t.currencyUSD } : { num: `$${n(item.priceUSD)}`, unit: '' };
}

function priceText(lang, item, cur) {
  const t = CONTENT[lang].coaching;
  const n = (v) => Number(v).toLocaleString('en-US');
  if (cur === 'EGP') return `${n(item.priceEGP)} ${t.currencyEGP}`;
  return lang === 'ar' ? `${n(item.priceUSD)} ${t.currencyUSD}` : `$${n(item.priceUSD)}`;
}

/* ---------- WhatsApp ---------- */
/* Start, Apply, Buy and Waitlist open WhatsApp with the message typed. */
function waLink(text) {
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
}
function waMessage(lang, kind, vars) {
  let m = WA_MESSAGES[lang][kind] || '';
  Object.keys(vars).forEach((k) => { m = m.split(`{${k}}`).join(vars[k]); });
  return m.replace(/\n\n+/g, '\n');
}

/* ---------- templates ---------- */
function programCardHTML(p, lang, i, cur) {
  const t = CONTENT[lang].programs;
  const film = p.video
    ? `<video class="product-video" data-src="${p.video}" muted loop playsinline preload="none" aria-hidden="true" tabindex="-1" disablepictureinpicture disableremoteplayback></video>`
    : '';
  const live = p.status === 'live';
  const meta = [p.weeks ? `${p.weeks} ${t.weeks}` : '', priceText(lang, p, cur)].filter(Boolean)
    .map((x) => `<span>${x}</span>`).join('');
  const buy = live
    ? `<a class="product-buy" data-wa="buy" data-id="${p.id}" href="${waLink(waMessage(lang, 'buy', { name: p.name[lang], price: priceText(lang, p, cur) }))}" target="_blank" rel="noopener">${t.buy}</a>`
    : '';
  return `
    <article class="product-card" role="listitem" data-id="${p.id}">
      <div class="product-media">
        <img class="product-still" src="${p.image}" alt="" loading="lazy" decoding="async" draggable="false">
        ${film}
      </div>
      <div class="product-overlay">
        <div class="product-top">
          <span class="product-status">${live ? '' : t.soon}</span>
          <span class="logo-mark product-mark" aria-hidden="true"></span>
        </div>
        <div class="product-bottom">
          <span class="product-num">0${i + 1}</span>
          <h3 class="product-title">${p.name[lang]}</h3>
          <p class="product-line">${p.line[lang]}</p>
          <div class="product-meta">${meta}</div>
          ${buy}
        </div>
      </div>
    </article>`;
}

/* The launch offer price, rounded down to a whole number. */
function offerItem(item) {
  const k = 1 - LAUNCH_OFFER.percent / 100;
  return { priceUSD: Math.floor(item.priceUSD * k), priceEGP: Math.floor(item.priceEGP * k) };
}

function coachCardHTML(c, lang, cur) {
  const t = CONTENT[lang].coaching;
  const full = c.spotsLeft <= 0;
  const labels = COACHING_LABELS[lang];
  const offerOn = LAUNCH_OFFER.placesLeft > 0 && LAUNCH_OFFER.percent > 0 && !full;
  const shown = offerOn ? offerItem(c) : c;
  const price = priceText(lang, shown, cur);
  const pp = priceParts(lang, shown, cur);
  const was = offerOn ? `<s class="coach-was" aria-hidden="true">${priceParts(lang, c, cur).num}</s>` : '';
  const kind = full ? 'waitlist' : (c.apply ? 'apply' : 'start');
  const offerMsg = offerOn ? WA_MESSAGES[lang].offer.split('{percent}').join(LAUNCH_OFFER.percent) : '';
  const msg = waMessage(lang, kind, { name: c.name, price, offer: offerMsg });
  const cta = full ? t.waitlist : (c.apply ? t.apply : `${t.start} ${c.name}`);
  const rows = c.rows.map((r, k) => `
        <div class="coach-row"><dt>${labels[k] || ''}</dt><dd>${r[lang]}</dd></div>`).join('');
  return `
    <article class="coach-card${c.featured ? ' featured' : ''}" data-id="${c.id}">
      <div class="coach-top">
        <h3 class="coach-name" dir="ltr">${c.name}</h3>
        <span class="coach-spots${full ? ' is-full' : ''}">${full ? t.full : spotsLeftLabel(lang, c.spotsLeft)}</span>
      </div>
      <p class="coach-pitch">${c.pitch[lang]}</p>
      <div class="coach-price"><span class="coach-amount">${pp.num}</span><span class="coach-per">${pp.unit ? pp.unit + ' ' : ''}${t.perMonth}</span>${was}</div>
      <p class="coach-terms">${t.block} · ${t.upfront}</p>
      <dl class="coach-rows">${rows}
      </dl>
      <a class="coach-cta" data-wa="${kind}" href="${waLink(msg)}" target="_blank" rel="noopener">${cta}</a>
    </article>`;
}

/* Founding athletes: the week counter works itself out from the start date. */
function foundingHTML(f, lang, i) {
  const t = CONTENT[lang].results;
  let week = 0, status = t.soon, pct = 0;
  if (f.start) {
    const start = new Date(f.start + 'T00:00:00');
    const days = Math.floor((Date.now() - start.getTime()) / 86400000);
    if (days >= 0) {
      week = Math.min(f.weeks, Math.floor(days / 7) + 1);
      pct = Math.min(1, (days + 1) / (f.weeks * 7));
      status = week >= f.weeks && days >= f.weeks * 7 ? t.done : t.inProgress;
    }
  }
  const weekText = week ? t.week.replace('{w}', week).replace('{n}', f.weeks) : '';
  return `
    <li class="founding-row">
      <div class="founding-head">
        <span class="founding-num">0${i + 1}</span>
        <span class="founding-tag">${t.athlete} · ${f.sport[lang]}</span>
      </div>
      <div class="founding-main">
        <span class="founding-prog" dir="ltr">${f.program}</span>
        <span class="founding-week">${weekText}</span>
      </div>
      <div class="founding-bar" aria-hidden="true"><span style="--p:${pct.toFixed(3)}"></span></div>
      <p class="founding-status">${status}</p>
    </li>`;
}

function wireDynamicButtons() {
  if ($('igLink')) $('igLink').href = CONFIG.instagramUrl;
  if ($('ttLink')) $('ttLink').href = CONFIG.tiktokUrl;
  document.querySelectorAll('[data-app-link]').forEach((a) => { a.href = CONFIG.appUrl; });
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
   from its base; coaching cards come in one after another. */
const REVEAL_SELECTORS = [
  '.section-inner > h2', '.section-sub', '.band-line', '.coaching-head', '.offer-line',
  '.coach-card', '.layer', '.products-head', '.product-rail', '.programs-note',
  '.about-media', '.about-copy', '.results-media', '.results-copy',
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
  document.querySelectorAll('#coachGrid .coach-card').forEach((el, i) => el.style.setProperty('--d', `${i * 0.1}s`));
}

/* ---------- product films ---------- */
/* Every product card plays a short silent film on a seamless loop (graded
   to match each other, slowed to 80%). A film only downloads when its card
   comes into view, plays while it's on screen and pauses when it isn't, so
   phones only ever load the cards someone actually reaches. Visitors with
   reduced motion or data saver turned on see the still frame instead, and
   if a phone refuses to autoplay (low power mode) the still simply stays. */
const FILMS_OK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  && !(navigator.connection && navigator.connection.saveData)
  && 'IntersectionObserver' in window;

let filmObserver = null;

/* Videos stream from CONFIG.mediaBase (a mirror that iPhones and Safari can
   play from); if that fails, the site's own copy takes over. */
function mediaUrl(file) { return (CONFIG.mediaBase || '') + file; }
function setVideoSource(v, file) {
  v.muted = true;
  v.setAttribute('playsinline', '');
  if (CONFIG.mediaBase) {
    v.addEventListener('error', () => {
      if (v.dataset.fellBack) return;
      v.dataset.fellBack = '1';
      v.src = file;
      const p = v.play(); if (p && p.catch) p.catch(() => {});
    }, { once: true });
  }
  v.src = mediaUrl(file);
}

/* Low power mode on iPhone won't start a video by itself but lets it play
   once the visitor touches the page. So a refused video waits here, and the
   next tap or swipe starts every waiting video that's on screen. */
const waitingFilms = new Set();
function startWaitingFilms() {
  waitingFilms.forEach((v) => {
    if (v.classList.contains('product-video') && !v.inView) return;
    const p = v.play();
    if (p && p.then) p.then(() => { waitingFilms.delete(v); if (!waitingFilms.size) listenForTouch(false); }).catch(() => {});
  });
}
function listenForTouch(on) {
  ['touchend', 'click', 'keydown'].forEach((type) => {
    if (on) document.addEventListener(type, startWaitingFilms, { capture: true, passive: true });
    else document.removeEventListener(type, startWaitingFilms, { capture: true });
  });
}
function tryPlay(v) {
  const p = v.play();
  if (p && p.catch) p.catch((err) => {
    if (!err || err.name !== 'NotAllowedError') return;
    if (!waitingFilms.size) listenForTouch(true);
    waitingFilms.add(v);
  });
}

function playFilm(v) {
  if (document.hidden) return;
  if (!v.getAttribute('src')) {
    v.addEventListener('playing', () => v.classList.add('is-playing'), { once: true });
    setVideoSource(v, v.dataset.src);
  }
  tryPlay(v);
}

function initProductFilms(root) {
  if (!FILMS_OK) return;
  if (!filmObserver) {
    filmObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        e.target.inView = e.isIntersecting;
        if (e.isIntersecting) playFilm(e.target); else e.target.pause();
      });
    }, { rootMargin: '160px 0px', threshold: 0.01 });
    document.addEventListener('visibilitychange', () => {
      document.querySelectorAll('video.product-video').forEach((v) => {
        if (document.hidden) v.pause(); else if (v.inView) playFilm(v);
      });
    });
  }
  root.querySelectorAll('video.product-video').forEach((v) => filmObserver.observe(v));
}

/* ---------- the products reel ---------- */
/* The cards scroll sideways on their own: swipe on phones and trackpads,
   arrow keys once the row has focus, and on a computer the row can simply be
   dragged with the mouse. A drag lets go onto the nearest card (a quick flick
   carries on to the next one). The hairline underneath shows how much of the
   row you've seen, and disappears on screens wide enough to show it all. */
function railGeometry(rail) {
  const cards = [...rail.querySelectorAll('.product-card')];
  const rtl = getComputedStyle(rail).direction === 'rtl';
  const max = rail.scrollWidth - rail.clientWidth;
  if (!cards.length) return { cards, rtl, max, stops: [0] };
  const first = cards[0].getBoundingClientRect();
  // where the row has to be scrolled to for each card to sit on the text line
  const stops = cards.map((c) => {
    const r = c.getBoundingClientRect();
    const d = rtl ? r.right - first.right : r.left - first.left;
    return Math.max(-max, Math.min(max, d));
  });
  return { cards, rtl, max, stops };
}

function updateRail() {
  const rail = $('productsRail');
  const bar = $('productsProgress');
  if (!rail) return;
  const max = rail.scrollWidth - rail.clientWidth;
  const scrollable = max > 2;
  rail.classList.toggle('is-scrollable', scrollable);
  if (!bar) return;
  bar.hidden = !scrollable;
  if (!scrollable) return;
  const track = rail.querySelector('.product-track');
  const cards = rail.querySelectorAll('.product-card');
  if (!track || !cards.length) return;
  const a = cards[0].getBoundingClientRect(), b = cards[cards.length - 1].getBoundingClientRect();
  const rowW = Math.max(a.right, b.right) - Math.min(a.left, b.left);
  const pad = parseFloat(getComputedStyle(rail).paddingInlineStart) || 0;
  const view = rail.clientWidth - pad * 2;
  const seen = Math.min(1, (Math.abs(rail.scrollLeft) + view) / rowW);
  bar.style.setProperty('--seen', seen.toFixed(4));
}

(function initProductRail() {
  const rail = $('productsRail');
  if (!rail) return;
  let ticking = false;
  rail.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { ticking = false; updateRail(); });
  }, { passive: true });
  window.addEventListener('resize', updateRail);
  window.addEventListener('load', updateRail);

  let drag = null, settleTimer = 0;
  const settle = (velocity) => {
    const g = railGeometry(rail);
    const dir = g.rtl ? -1 : 1;
    const pos = rail.scrollLeft;
    // the card we're nearest to, nudged one further by a quick flick
    let i = 0, best = Infinity;
    g.stops.forEach((st, k) => { const d = Math.abs(st - pos); if (d < best) { best = d; i = k; } });
    const forward = -velocity * dir; // dragging against the reading direction moves the row forward
    if (Math.abs(forward) > 0.35) {
      const ahead = g.stops.findIndex((st) => (st - pos) * dir > 4);
      const behind = g.stops.map((st, k) => ((pos - st) * dir > 4 ? k : -1)).filter((k) => k >= 0).pop();
      if (forward > 0 && ahead >= 0) i = ahead;
      if (forward < 0 && behind != null) i = behind;
    }
    rail.classList.add('is-settling');
    rail.scrollTo({ left: g.stops[i], behavior: 'smooth' });
    clearTimeout(settleTimer);
    const done = () => { clearTimeout(settleTimer); rail.classList.remove('is-settling'); rail.removeEventListener('scrollend', done); };
    rail.addEventListener('scrollend', done);
    settleTimer = setTimeout(done, 700);
  };

  rail.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0 || !rail.classList.contains('is-scrollable')) return;
    clearTimeout(settleTimer);
    rail.classList.remove('is-settling');
    drag = { x: e.clientX, left: rail.scrollLeft, lastX: e.clientX, lastT: performance.now(), v: 0, moved: false };
    e.preventDefault();
  });
  window.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) < 4) return;
    if (!drag.moved) { drag.moved = true; rail.classList.add('is-dragging'); }
    rail.scrollLeft = drag.left - dx;
    const now = performance.now(), dt = now - drag.lastT;
    if (dt > 0) { drag.v = drag.v * 0.4 + ((e.clientX - drag.lastX) / dt) * 0.6; drag.lastX = e.clientX; drag.lastT = now; }
  });
  const release = () => {
    if (!drag) return;
    const { moved, v, lastT } = drag;
    drag = null;
    rail.classList.remove('is-dragging');
    if (moved) settle(performance.now() - lastT > 90 ? 0 : v);
  };
  window.addEventListener('pointerup', release);
  window.addEventListener('pointercancel', release);
  window.addEventListener('blur', release);
})();

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
  renderPrices(lang);

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

  // Programs: the cards are built once; a language switch only swaps the
  // words, so the films keep playing without a restart or a flash.
  setText('productsTitle', C.programs.title);
  setText('productsSub', C.programs.sub);
  setText('programsNote', C.programs.note);
  setText('programsCta', C.programs.cta);
  const grid = $('productsGrid');
  if (grid) {
    const cur = currentCurrency();
    const cards = grid.querySelectorAll('.product-card');
    if (cards.length === PROGRAMS.length) {
      cards.forEach((card, i) => {
        const p = PROGRAMS[i];
        const fresh = document.createElement('div');
        fresh.innerHTML = programCardHTML(p, lang, i, cur);
        const next = fresh.firstElementChild;
        card.querySelector('.product-overlay').replaceWith(next.querySelector('.product-overlay'));
      });
    } else {
      grid.innerHTML = PROGRAMS.map((p, i) => programCardHTML(p, lang, i, cur)).join('');
      initProductFilms(grid);
    }
    grid.setAttribute('aria-label', C.programs.title);
  }
  const rail = $('productsRail');
  if (rail) { rail.setAttribute('role', 'region'); rail.setAttribute('aria-label', C.programs.title); }
  updateRail();
  if ($('programsNote')) $('programsNote').closest('.programs-note').hidden = !PROGRAMS.some((p) => p.status !== 'live');

  setText('pyramidTitle', C.pyramid.title);
  setText('pyramidSub', C.pyramid.sub);
  if ($('pyramidLayers')) $('pyramidLayers').innerHTML = C.layers.map(layerHTML).join('');

  setText('bandLine', C.footer.tagline);

  setText('coachingTitle', C.coaching.title);
  setText('coachingSub', C.coaching.sub);
  const sw = $('currencySwitch');
  if (sw) {
    sw.setAttribute('aria-label', C.coaching.currencyLabel);
    sw.querySelectorAll('[data-cur]').forEach((b) => { b.textContent = b.dataset.cur === 'EGP' ? C.coaching.egp : C.coaching.usd; });
  }

  setText('resultsTitle', C.results.title);
  setText('resultsSub', C.results.sub);
  if ($('foundingList')) $('foundingList').innerHTML = FOUNDING.map((f, i) => foundingHTML(f, lang, i)).join('');

  setText('aboutTitle', C.about.title);
  setText('aboutMission', C.about.missionLink);
  if ($('aboutBody')) $('aboutBody').innerHTML = C.about.body.map(p => `<p>${p}</p>`).join('');

  if ($('scrollCue')) $('scrollCue').setAttribute('aria-label', C.ui.scrollCue);
}

/* Everything with a price follows the currency switch. */
function renderPrices(lang) {
  const C = CONTENT[lang];
  const cur = currentCurrency();
  const sw = $('currencySwitch');
  if (sw) sw.querySelectorAll('[data-cur]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.cur === cur)));
  const cg = $('coachGrid');
  if (cg) {
    const shown = !!cg.querySelector('.coach-card.in');
    cg.innerHTML = COACHING.map((c) => coachCardHTML(c, lang, cur)).join('');
    // already on screen (a language or currency switch): no second entrance
    if (shown) cg.querySelectorAll('.coach-card').forEach((el) => el.classList.add('rv', 'in'));
  }
  const offer = $('offerLine');
  if (offer) {
    offer.hidden = !(LAUNCH_OFFER.placesLeft > 0);
    offer.textContent = C.coaching.offer.replace('{percent}', LAUNCH_OFFER.percent).replace('{n}', LAUNCH_OFFER.placesLeft);
  }
  document.querySelectorAll('#productsGrid .product-card').forEach((card, i) => {
    const p = PROGRAMS[i]; if (!p) return;
    const meta = card.querySelector('.product-meta');
    if (meta) meta.innerHTML = [p.weeks ? `${p.weeks} ${C.programs.weeks}` : '', priceText(lang, p, cur)].filter(Boolean).map((x) => `<span>${x}</span>`).join('');
    const buy = card.querySelector('.product-buy');
    if (buy) buy.href = waLink(waMessage(lang, 'buy', { name: p.name[lang], price: priceText(lang, p, cur) }));
  });
}

(function initCurrencySwitch() {
  const sw = $('currencySwitch');
  if (!sw) return;
  sw.addEventListener('click', (e) => {
    const b = e.target.closest('[data-cur]');
    if (!b) return;
    try { localStorage.setItem('vshvdow-currency', b.dataset.cur); } catch (err) {}
    renderPrices(currentLang);
    setupReveal();
  });
})();

function renderMission(C) {
  const M = C.mission;
  ['kicker', 'title', 'sub', 'lead', 'body', 'line', 'goal', 'note', 'statement', 'cta']
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

// The hero video plays everywhere except for visitors with reduced motion or
// data saver turned on, who keep the still (hero.jpg). Phones and other
// upright screens get hero-mobile.mp4, cut to their shape.
(function initHeroVideo() {
  const video = document.getElementById('heroVideo');
  if (!video) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  if (reduceMotion || saveData) return;
  // phones get the upright cut that follows the athlete; wider screens the full frame
  const tall = window.matchMedia('(max-aspect-ratio: 4/5)').matches;
  const source = document.getElementById('heroVideoSource');
  if (source) source.remove();
  setVideoSource(video, tall ? 'hero-mobile.mp4' : 'hero.mp4');
  tryPlay(video);
})();
