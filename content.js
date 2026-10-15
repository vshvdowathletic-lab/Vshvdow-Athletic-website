/* ============================================================
   VSHVDOW SITE CONTENT
   ------------------------------------------------------------
   This is the ONLY file you should need to edit day to day.
   Prices, spots left, programs, links and every word (English
   and Egyptian Arabic) live here. The page rebuilds itself from
   this file.

   Do NOT touch index.html or script.js unless you're changing
   layout or behaviour, not words or numbers.
   ============================================================ */

/* ---------- 1. BUSINESS INFO ---------- */
const CONFIG = {
  brand: "VSHVDOW",
  siteUrl: "https://vshvdow.com",
  // "Athlete login" opens this. Change it to "https://app.vshvdow.com" once
  // that address is connected to the app (README part 7).
  appUrl: "https://vshvdow-athletic.web.app",
  // Where the videos stream from. iPhones and Safari only play a video when
  // the server can send it in pieces, which this host doesn't do, so the
  // videos stream from jsDelivr, a free video-friendly mirror of your GitHub
  // files. If it ever fails, the site falls back to its own copy by itself.
  mediaBase: "https://cdn.jsdelivr.net/gh/vshvdowathletic-lab/Vshvdow-Athletic-website@main/",
  whatsapp: "201022067934",                    // country code + number, digits only
  instagramUrl: "https://www.instagram.com/vshvdow/",
  tiktokUrl: "https://www.tiktok.com/@vshvdow?is_from_webapp=1&sender_device=pc",
  defaultLang: "en", // "en" or "ar": which language loads first for new visitors
  // Where the "Join the Shadow" signup sends each new email (it arrives in
  // your Gmail). This moves to MailerLite in the next update.
  signupEndpoint: "https://formsubmit.co/ajax/vshvdowathletic@gmail.com",
};

/* ---------- 2. PROGRAMS ---------- */
/* One payment, yours to keep. Each program is a card with a short film.
   status: "soon" shows "Coming soon" (the button under the row sends people
           to the email signup), "live" shows a Buy button that opens
           WhatsApp with the order typed.
   weeks: leave as "" if it isn't set yet.
   video / image: the film and its still (the film's first frame).
   README.md, part 5, explains how to swap them. */
const PROGRAMS = [
  { id: "force-form", status: "soon", weeks: 18, priceEGP: 999, priceUSD: 49,
    image: "product-welcome.jpg", video: "product-welcome.mp4",
    name: { en: "Force & Form", ar: "Force & Form" },
    line: { en: "The complete athlete program. Speed, power and strength for any sport, football first.",
            ar: "برنامج اللاعب الكامل. سرعة وانفجارية وقوة لأي رياضة، والكورة الأول." } },
  { id: "preseason", status: "soon", weeks: "", priceEGP: 599, priceUSD: 29,
    image: "product-tracker.jpg", video: "product-tracker.mp4",
    name: { en: "Preseason", ar: "تحضير الموسم" },
    line: { en: "Match fit before the first whistle.",
            ar: "جاهز للماتش قبل أول صفارة." } },
  { id: "speed", status: "soon", weeks: "", priceEGP: 599, priceUSD: 29,
    image: "product-nutrition.jpg", video: "product-nutrition.mp4",
    name: { en: "Speed", ar: "السرعة" },
    line: { en: "Acceleration and top speed, built step by step.",
            ar: "تسارع وأقصى سرعة، بتتبني خطوة بخطوة." } },
  { id: "strength", status: "soon", weeks: "", priceEGP: 599, priceUSD: 29,
    image: "product-training.jpg", video: "product-training.mp4",
    name: { en: "Strength", ar: "القوة" },
    line: { en: "Raise your ceiling. Heavy, simple, progressive.",
            ar: "ارفع سقفك. أوزان تقيلة، بسيطة، وبتزيد بالتدريج." } },
];

/* ---------- 3. COACHING ---------- */
/* Prices are per month; coaching runs in blocks of 12 weeks.
   spotsLeft: set to 0 and that card switches to a waitlist by itself.
   apply: true = the button asks people to apply instead of start. */
const COACHING = [
  {
    id: "performance", name: "Performance", featured: true, apply: false,
    priceEGP: 2500, priceUSD: 99, spotsTotal: 4, spotsLeft: 4,
    pitch: { en: "Your system, shaped around you.", ar: "السيستم بتاعك، متفصّل عليك." },
    rows: [
      { en: "Your system, adjusted to your sport, schedule and equipment", ar: "السيستم متظبط على رياضتك ومواعيدك والأدوات اللي عندك" },
      { en: "VSHVDOW app", ar: "تطبيق VSHVDOW" },
      { en: "Weekly, in the app", ar: "كل أسبوع، في التطبيق" },
      { en: "One video batch a week", ar: "مجموعة فيديوهات كل أسبوع" },
      { en: "Macro targets for every phase", ar: "ماكروز لكل مرحلة" },
      { en: "Baseline, then a retest at week 12", ar: "قياس في الأول، وإعادة في الأسبوع 12" },
      { en: "Within 48 hours", ar: "خلال 48 ساعة" },
    ],
  },
  {
    id: "private", name: "Private Athlete", featured: false, apply: true,
    priceEGP: 5500, priceUSD: 249, spotsTotal: 2, spotsLeft: 2,
    pitch: { en: "Me in every detail. By application.", ar: "أنا معاك في كل تفصيلة. بالتقديم." },
    rows: [
      { en: "Written from scratch around you", ar: "مكتوب من الصفر عليك" },
      { en: "VSHVDOW app and a kickoff call", ar: "تطبيق VSHVDOW ومكالمة في البداية" },
      { en: "Twice a week, plus WhatsApp", ar: "مرتين في الأسبوع، وواتساب" },
      { en: "Unlimited", ar: "مفتوحة" },
      { en: "A full plan, reviewed every week", ar: "خطة كاملة، بتتراجع كل أسبوع" },
      { en: "Full tests at weeks 1, 6 and 12, plus a graduation report", ar: "اختبارات كاملة في الأسابيع 1 و6 و12، وتقرير ختامي" },
      { en: "Within 24 hours", ar: "خلال 24 ساعة" },
    ],
  },
];
/* The row labels, in the same order as rows above. */
const COACHING_LABELS = {
  en: ["Program", "App", "Check in", "Form reviews", "Nutrition", "Testing", "Replies"],
  ar: ["البرنامج", "التطبيق", "المتابعة", "مراجعة الفورم", "التغذية", "الاختبارات", "الرد"],
};
/* Launch offer: the first paying athletes get 25% off their first block.
   Lower placesLeft as they're taken; at 0 the line disappears. */
const LAUNCH_OFFER = { percent: 25, placesLeft: 5 };

/* ---------- 4. FOUNDING ATHLETES (Results) ---------- */
/* Shown live: the week counter works itself out from the start date.
   start: the Monday their block began, written "YYYY-MM-DD".
   Leave start as "" and the athlete shows "starting soon".
   Delete a line to hide that athlete. */
const FOUNDING = [
  { sport: { en: "Football", ar: "كورة" }, program: "Force & Form", start: "2026-10-05", weeks: 18 },
];

/* ---------- 5. WHATSAPP MESSAGES ---------- */
/* Typed into WhatsApp when someone taps Start, Apply, Buy or Waitlist.
   {name} = program or coaching level, {price} = its price. */
const WA_MESSAGES = {
  en: {
    start: "Hi Coach,\nI'd like to start {name} coaching ({price} a month, block of 12 weeks).\n{offer}\nName:\nSport and position:\nMain goal for the block:\nThanks!",
    offer: "I'd like the launch offer if a place is still open.",
    apply: "Hi Coach,\nI'd like to apply for {name}.\nName:\nAge:\nSport and position:\nLevel (school, club, academy, semi pro, pro):\nMain goal for the next 12 weeks:\nInjuries:\nDays I can train each week:\nWhere I train (gym, pitch, home):\nThanks!",
    waitlist: "Hi Coach,\nI'd like to join the waitlist for {name}.\nPlease tell me as soon as a spot opens.\nThanks!",
    buy: "Hi Coach,\nI'd like to buy {name} ({price}).\nName:\nEmail for the PDF:\nI'll pay by (InstaPay, Vodafone Cash or PayPal):\nThanks!",
  },
  ar: {
    start: "أهلاً كابتن،\nحابب أبدأ التدريب في {name} ({price} في الشهر، بلوك 12 أسبوع).\n{offer}\nالاسم:\nالرياضة والمركز:\nهدفي في البلوك:\nشكرًا!",
    offer: "وحابب آخد عرض الافتتاح لو لسه فيه أماكن.",
    apply: "أهلاً كابتن،\nحابب أقدّم على {name}.\nالاسم:\nالسن:\nالرياضة والمركز:\nالمستوى (مدرسة، نادي، أكاديمية، شبه محترف، محترف):\nهدفي في 12 أسبوع الجايين:\nالإصابات:\nعدد أيام التمرين في الأسبوع:\nبتمرن فين (جيم، ملعب، بيت):\nشكرًا!",
    waitlist: "أهلاً كابتن،\nحابب أسجّل في قائمة الانتظار بتاعة {name}.\nياريت تبلغني أول ما يفضى مكان.\nشكرًا!",
    buy: "أهلاً كابتن،\nحابب أشتري {name} ({price}).\nالاسم:\nالإيميل اللي يوصله ملف PDF:\nهدفع عن طريق (إنستاباي، فودافون كاش، أو PayPal):\nشكرًا!",
  },
};

/* ---------- 6. ALL OTHER TEXT ---------- */
const CONTENT = {
  en: {
    dir: "ltr",
    metaTitle: "VSHVDOW ATHLETIC",
    metaDescription: "Athletic coaching and training programs. Every athlete, football first. One system, built to perform and built to last.",
    nav: { programs: "Programs", coaching: "Coaching", coach: "Coach", mission: "Mission", login: "Athlete login" },
    hero: {
      line1: "PERFORMANCE UNDER PRESSURE",
      line2: "VSHVDOW ATHLETIC",
      cta: "Enter the Shadow",
    },
    programs: {
      title: "Programs",
      sub: "The full system, written out for you to run on your own. One payment, yours to keep.",
      soon: "Coming soon",
      weeks: "weeks",
      buy: "Buy",
      note: "Force & Form opens soon. Join the Shadow to get it first.",
      cta: "Get it first",
    },
    pyramid: {
      title: "The Pyramid",
      sub: "Every athlete, every sport, football first. Every session follows the same five layers.",
    },
    layers: [
      { n: 5, name: "Peak expression", detail: "Physique, performance, and mindset" },
      { n: 4, name: "Speed and agility", detail: "Max velocity, change of direction, reactive agility" },
      { n: 3, name: "Strength and power", detail: "Progressive overload, explosiveness, force production" },
      { n: 2, name: "Athletic conditioning", detail: "Aerobic base, lactate threshold, repeated sprint capacity" },
      { n: 1, name: "Movement foundation", detail: "Mobility, joint health, movement quality, injury resilience, posture" },
    ],
    coaching: {
      title: "Coaching",
      sub: "Train with me on the full system. Two levels, both capped, both in blocks of 12 weeks.",
      perMonth: "/ month",
      block: "Block of 12 weeks",
      upfront: "Pay the block upfront and save 10%",
      offer: "Launch offer: {percent}% off your first block for the next {n} athletes.",
      start: "Start",
      apply: "Apply",
      waitlist: "Join the waitlist",
      full: "Full, waitlist open",
      currencyLabel: "Currency",
      usd: "USD",
      egp: "EGP",
      currencyEGP: "EGP",
      currencyUSD: "$",
    },
    results: {
      title: "Results",
      sub: "Our founding athletes train on the system in the open. Their tests go up here as each block lands.",
      athlete: "Founding athlete",
      week: "Week {w} of {n}",
      done: "Block complete, results coming",
      soon: "Starting soon",
      inProgress: "Block 1 in progress",
    },
    about: {
      title: "About the coach",
      body: [
        "Every athlete I coach moves through the same system: five layers, built in order, nothing skipped. It's not a tagline. It's the only approach I've seen actually build performance that lasts, proven over years on the pitch and in the gym.",
        "VSHVDOW is the standard I hold myself to, and the one every athlete gets held to. Your training is tracked every week and retested at the end of every block, built around what the sessions and the numbers actually show. Never guesswork.",
        "I coach the way I train: obsessively, honestly, with zero patience for wasted effort.",
      ],
      missionLink: "Read the mission",
    },
    join: {
      title: "Join the Shadow",
      sub: "Force & Form, new blocks and open coaching spots reach the shadow first. No noise.",
      label: "Email address",
      placeholder: "Email address",
      button: "Join",
      sending: "Joining…",
      success: "You're in. See you in the dark.",
      error: "Couldn't sign you up right now. Try again in a moment.",
      activate: "Almost there. Open vshvdowathletic@gmail.com, press Activate Form in the email from FormSubmit, then sign up again.",
      invalid: "Enter a valid email address.",
    },
    /* The Mission page (mission.html). Short on purpose, like a statement. */
    mission: {
      metaTitle: "VSHVDOW | The Mission",
      metaDescription: "The VSHVDOW mission. One system that builds any athlete willing to carry the standard, wherever they train.",
      kicker: "VSHVDOW ATHLETIC",
      title: "Built in the dark.",
      sub: "Proven under pressure.",
      lead: "We build athletes who perform when it matters and stand apart when everyone else looks the same.",
      body: "Most people train to feel good. We train to become hard to stop. Every athlete follows one system, built layer by layer, nothing skipped. The real work happens where nobody is watching. Early mornings. Empty pitches. The last set no one counts. That is where the gap is made. Match day only reveals it.",
      line: "Be the one they can't prepare for.",
      goal: "Our mission is to put that system and that standard in the hands of every athlete willing to carry it, wherever they train.",
      note: "I built myself alone, in hours nobody saw. That taught me one thing. A real system builds anyone who refuses to quit on it. My goal is to prove it, one athlete at a time, and to bring that standard to anyone, anywhere, who wants it enough.",
      statement: "Become the athlete nobody saw coming.",
      cta: "Enter the Shadow",
    },
    footer: {
      tagline: "Built to perform · Built to last",
      rights: "All rights reserved.",
    },
    ui: {
      langSwitch: "عربي",
      themeToLight: "Light mode",
      themeToDark: "Dark mode",
      menuOpen: "Menu",
      menuClose: "Close",
      scrollCue: "Scroll down",
    },
  },

  ar: {
    dir: "rtl",
    metaTitle: "VSHVDOW ATHLETIC",
    metaDescription: "تدريب رياضي وبرامج تمرين. كل لاعب، والكورة الأول. سيستم واحد، متبني للأداء ومتبني للاستمرار.",
    nav: { programs: "البرامج", coaching: "التدريب", coach: "الكوتش", mission: "المهمة", login: "دخول اللاعبين" },
    hero: {
      line1: "أداء تحت الضغط",
      line2: "VSHVDOW ATHLETIC",
      cta: "ابدأ التحدي",
    },
    programs: {
      title: "البرامج",
      sub: "السيستم كامل، مكتوب عشان تمشي عليه لوحدك. تدفع مرة واحدة، ويفضل معاك.",
      soon: "قريبًا",
      weeks: "أسبوع",
      buy: "اشتري",
      note: "Force & Form بيفتح قريب. انضم للظل عشان يوصلك الأول.",
      cta: "خليه يوصلك الأول",
    },
    pyramid: {
      title: "الهرم",
      sub: "كل لاعب، كل رياضة، والكورة الأول. كل تمرينة ماشية على نفس الخمس مستويات.",
    },
    layers: [
      { n: 5, name: "القمة", detail: "الشكل، والأداء، والعقلية" },
      { n: 4, name: "السرعة والرشاقة", detail: "أقصى سرعة، تغيير الاتجاه، ورد الفعل السريع" },
      { n: 3, name: "القوة والانفجارية", detail: "زيادة الأحمال بالتدريج، الانفجارية، وإنتاج القوة" },
      { n: 2, name: "اللياقة الرياضية", detail: "قاعدة هوائية، عتبة اللاكتات، وتكرار السبرنتات" },
      { n: 1, name: "أساس الحركة", detail: "المرونة، صحة المفاصل، جودة الحركة، الوقاية من الإصابات، والقوام" },
    ],
    coaching: {
      title: "التدريب",
      sub: "اتمرن معايا على السيستم كامل. مستويين، أماكنهم محدودة، والاتنين على بلوكات 12 أسبوع.",
      perMonth: "/ في الشهر",
      block: "بلوك 12 أسبوع",
      upfront: "ادفع البلوك كله مرة واحدة ووفّر 10%",
      offer: "عرض الافتتاح: خصم {percent}% على أول بلوك لأول {n} لاعبين.",
      start: "ابدأ",
      apply: "قدّم",
      waitlist: "سجّل في قائمة الانتظار",
      full: "كاملة، وقائمة الانتظار مفتوحة",
      currencyLabel: "العملة",
      usd: "دولار",
      egp: "جنيه",
      currencyEGP: "جنيه",
      currencyUSD: "دولار",
    },
    results: {
      title: "النتايج",
      sub: "اللاعيبة المؤسسين بيتمرنوا على السيستم قدام الكل. نتايج اختباراتهم بتنزل هنا مع كل بلوك.",
      athlete: "لاعب مؤسس",
      week: "الأسبوع {w} من {n}",
      done: "البلوك خلص، والنتايج جاية",
      soon: "هيبدأ قريب",
      inProgress: "البلوك الأول شغال",
    },
    about: {
      title: "عن الكوتش",
      body: [
        "كل لاعب بدرّبه بيمشي على نفس السيستم: خمس مستويات، بتتبني بالترتيب، من غير ما نفوّت ولا واحد فيهم. ده مش شعار. دي الطريقة الوحيدة اللي شفتها بتبني أداء حقيقي بيستمر، واتجربت سنين في الملعب والجيم.",
        "VSHVDOW هو المستوى اللي بحاسب نفسي عليه، ونفس المستوى اللي بحاسب عليه كل لاعب معايا. تمرينك بيتتابع كل أسبوع وبيتقاس من جديد في آخر كل بلوك، على حسب اللي التمرين والأرقام بيقولوه فعلًا. مفيش تخمين.",
        "بدرّب زي ما بتمرّن: بهوس، وبصدق، ومن غير أي صبر على مجهود بيضيع على الفاضي.",
      ],
      missionLink: "اقرأ المهمة",
    },
    join: {
      title: "انضم للظل",
      sub: "Force & Form، والبلوكات الجديدة، والأماكن اللي بتفضى في التدريب بتوصل للي في الظل الأول. من غير دوشة.",
      label: "الإيميل",
      placeholder: "الإيميل بتاعك",
      button: "انضم",
      sending: "ثانية واحدة…",
      success: "خلاص، انت معانا. نشوفك في الضلمة.",
      error: "معرفناش نسجّلك دلوقتي. جرّب تاني كمان شوية.",
      activate: "فاضل خطوة: افتح vshvdowathletic@gmail.com ودوس Activate Form في إيميل FormSubmit، وبعدين سجّل تاني.",
      invalid: "اكتب إيميل صحيح.",
    },
    mission: {
      metaTitle: "VSHVDOW | المهمة",
      metaDescription: "مهمة VSHVDOW. سيستم واحد بيبني أي لاعب مستعد يشيل المستوى، في أي مكان بيتمرن فيه.",
      kicker: "VSHVDOW ATHLETIC",
      title: "اتبنى في الضلمة.",
      sub: "واتثبت تحت الضغط.",
      lead: "بنبني لاعيبة بتأدّي لما الموضوع يفرق، وبتبان مختلفة لما الكل يبقى شبه بعض.",
      body: "أغلب الناس بتتمرن عشان تحس إنها كويسة. إحنا بنتمرن عشان نبقى صعب حد يوقفنا. كل لاعب ماشي على سيستم واحد، بيتبني طبقة فوق طبقة، من غير ما نفوّت حاجة. الشغل الحقيقي بيحصل في المكان اللي محدش شايفه. الصبح بدري. ملاعب فاضية. آخر مجموعة محدش بيعدّها. هناك الفرق بيتعمل. ويوم الماتش بيكشفه بس.",
      line: "خليك اللي محدش عارف يستعد له.",
      goal: "مهمتنا إننا نحط السيستم ده والمستوى ده في إيد كل لاعب مستعد يشيله، في أي مكان بيتمرن فيه.",
      note: "أنا بنيت نفسي لوحدي، في ساعات محدش شافها. ده علّمني حاجة واحدة: السيستم الحقيقي بيبني أي حد مش ناوي يستسلم. هدفي إني أثبت ده، لاعب ورا لاعب، وإني أوصّل نفس المستوى لأي حد، في أي مكان، عايزه بجد.",
      statement: "خليك اللاعب اللي محدش كان متوقعه.",
      cta: "ابدأ التحدي",
    },
    footer: {
      tagline: "متبني للأداء · متبني للاستمرار",
      rights: "كل الحقوق محفوظة.",
    },
    ui: {
      langSwitch: "English",
      themeToLight: "الوضع الفاتح",
      themeToDark: "الوضع الغامق",
      menuOpen: "القائمة",
      menuClose: "اقفل",
      scrollCue: "انزل لتحت",
    },
  },
};
