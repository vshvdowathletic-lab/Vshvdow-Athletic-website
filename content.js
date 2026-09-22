/* ============================================================
   VSHVDOW SITE CONTENT
   ------------------------------------------------------------
   This is the ONLY file you should need to edit day-to-day.
   Change prices, spots left, links, or any text (English or
   Arabic) right here — the page rebuilds itself from this file.

   Do NOT touch index.html or script.js unless you're changing
   layout or behaviour, not words or numbers.
   ============================================================ */

/* ---------- 1. BUSINESS INFO ---------- */
/* Your contact links and WhatsApp number. whatsappNumber must be
   in international format with no +, spaces, or leading 0
   (Egypt: drop the first 0 and add 20 in front). */
const CONFIG = {
  brand: "VSHVDOW",
  instagramHandle: "vshvdow",
  instagramUrl: "https://www.instagram.com/vshvdow/",
  facebookUrl: "https://www.facebook.com/profile.php?id=61564790279263",
  whatsappNumber: "201022067934",
  defaultLang: "en", // "en" or "ar" — which language loads first for new visitors
};

/* ---------- 2. BUNDLES ---------- */
/* spotsLeft is the ONLY number you'll likely change often.
   Set it to 0 and that bundle automatically switches to
   "Waitlist" on the live site — nothing else to touch. */
const BUNDLES = [
  {
    id: "foundation",
    name: "Athlete Foundation",
    badge: { en: "Best value", ar: "الأفضل من حيث القيمة" },
    priceUSD: "$16–20",
    priceEGP: "799–999",
    spotsTotal: 4,
    spotsLeft: 4,
    featured: false,
    sections: [
      { title: { en: "Training", ar: "التدريب" }, items: [
        { en: "Monthly program block", ar: "برنامج تدريبي شهري" },
        { en: "Pyramid layers 1–3", ar: "مستويات الهرم 1–3" },
        { en: "2× form reviews / month", ar: "مراجعتان لتقنية الأداء شهريًا" },
        { en: "Check-in every 2 weeks", ar: "متابعة كل أسبوعين" },
      ]},
      { title: { en: "Athletic components", ar: "العناصر الرياضية" }, items: [
        { en: "Mobility protocol", ar: "بروتوكول المرونة" },
        { en: "Movement quality foundation", ar: "أساسيات جودة الحركة" },
        { en: "General conditioning base", ar: "قاعدة اللياقة العامة" },
        { en: "Basic power work", ar: "تمارين قوة أساسية" },
      ]},
      { title: { en: "Nutrition", ar: "التغذية" }, items: [
        { en: "Calorie + macro framework", ar: "إطار السعرات والماكروز" },
        { en: "Performance eating guide", ar: "دليل التغذية للأداء" },
      ]},
      { title: { en: "Assessment", ar: "التقييم" }, items: [
        { en: "InBody scan", ar: "فحص InBody" },
        { en: "Lifestyle + habit intake form", ar: "استمارة نمط الحياة والعادات" },
        { en: "Video movement screen", ar: "تقييم الحركة بالفيديو" },
      ]},
    ],
    bestFor: {
      en: ["General fitness", "Muscle gain & fat loss", "Beginners", "Body shape recomposition"],
      ar: ["اللياقة العامة", "بناء العضلات وحرق الدهون", "المبتدئون", "إعادة تشكيل الجسم"],
    },
  },
  {
    id: "performance",
    name: "Performance",
    badge: { en: "Most popular", ar: "الأكثر طلبًا" },
    priceUSD: "$30–40",
    priceEGP: "1,499–1,999",
    spotsTotal: 3,
    spotsLeft: 3,
    featured: true,
    sections: [
      { title: { en: "Training", ar: "التدريب" }, items: [
        { en: "Custom monthly block", ar: "برنامج شهري مخصص" },
        { en: "Full pyramid layers 1–4", ar: "الهرم كاملًا: مستويات 1–4" },
        { en: "Unlimited form reviews", ar: "مراجعات تقنية غير محدودة" },
        { en: "Weekly check-in", ar: "متابعة أسبوعية" },
      ]},
      { title: { en: "Athletic components", ar: "العناصر الرياضية" }, items: [
        { en: "Speed block every cycle", ar: "وحدة سرعة في كل دورة" },
        { en: "Power training", ar: "تدريب القدرة الانفجارية" },
        { en: "Agility work + change of direction", ar: "تدريب الرشاقة وتغيير الاتجاه" },
        { en: "Lactate threshold + sprint work", ar: "عتبة اللاكتات وتمارين السرعة" },
      ]},
      { title: { en: "Nutrition", ar: "التغذية" }, items: [
        { en: "Phase-synced macros", ar: "ماكروز متزامنة مع مرحلة التدريب" },
        { en: "Training-day carb cycling", ar: "تدوير الكربوهيدرات في أيام التدريب" },
      ]},
      { title: { en: "Assessment", ar: "التقييم" }, items: [
        { en: "All Foundation assessments", ar: "كل تقييمات Athlete Foundation" },
        { en: "Strength testing", ar: "اختبار القوة" },
        { en: "Sprint + jump benchmark", ar: "معايير السرعة والقفز" },
        { en: "Basic injury history review", ar: "مراجعة أساسية لتاريخ الإصابات" },
      ]},
    ],
    bestFor: {
      en: ["Serious gym-goers", "Recreational footballers", "Athletes who want to look and perform"],
      ar: ["رواد الجيم الجادّون", "لاعبو كرة القدم الهواة", "الراغبون في الجمع بين المظهر والأداء"],
    },
  },
  {
    id: "private",
    name: "Private Athlete",
    badge: { en: "Limited spots", ar: "أماكن محدودة" },
    priceUSD: "$50–70",
    priceEGP: "2,500–3,500",
    spotsTotal: 2,
    spotsLeft: 2,
    featured: false,
    sections: [
      { title: { en: "Training", ar: "التدريب" }, items: [
        { en: "Bespoke weekly plan", ar: "خطة أسبوعية مصممة خصيصًا لك" },
        { en: "Full pyramid, all 5 layers", ar: "الهرم كاملًا بمستوياته الخمسة" },
        { en: "Unlimited form reviews", ar: "مراجعات تقنية غير محدودة" },
        { en: "2× weekly check-in", ar: "متابعتان أسبوعيًا" },
        { en: "Graduation report at week 12", ar: "تقرير ختامي في الأسبوع 12" },
      ]},
      { title: { en: "Athletic components", ar: "العناصر الرياضية" }, items: [
        { en: "Full athletic periodisation", ar: "تخطيط رياضي متكامل (Periodisation)" },
        { en: "Football season integration", ar: "دمج مع موسم كرة القدم" },
        { en: "Mindset + psychology work", ar: "العمل على العقلية والجانب النفسي" },
        { en: "Full aerobic / anaerobic conditioning", ar: "لياقة هوائية ولا هوائية كاملة" },
      ]},
      { title: { en: "Nutrition", ar: "التغذية" }, items: [
        { en: "Full personalised plan", ar: "خطة تغذية شخصية كاملة" },
        { en: "Weekly nutrition review", ar: "مراجعة تغذية أسبوعية" },
      ]},
      { title: { en: "Assessment", ar: "التقييم" }, items: [
        { en: "Injury screening + range of motion", ar: "فحص الإصابات ومدى الحركة" },
        { en: "7-day nutrition log review", ar: "مراجعة سجل تغذية لمدة 7 أيام" },
        { en: "Speed & agility screening", ar: "فحص السرعة والرشاقة" },
      ]},
    ],
    bestFor: {
      en: ["Hybrid athletes", "Semi-pro footballers", "MENA / international"],
      ar: ["الرياضيون الهجينون", "لاعبو كرة القدم شبه المحترفين", "الشرق الأوسط ودوليًا"],
    },
  },
];

/* ---------- 3. WHAT'S INCLUDED (bundle products) ---------- */
const PRODUCTS = [
  { id: "welcome", name: { en: "Welcome Pack", ar: "حزمة الترحيب" }, items: {
    en: ["Coaching philosophy explained", "Your weekly rhythm & schedule", "Communication standards", "Week 1, step-by-step", "Everything you need to start day 1"],
    ar: ["شرح فلسفة التدريب", "إيقاعك وجدولك الأسبوعي", "معايير التواصل", "الأسبوع الأول خطوة بخطوة", "كل ما تحتاجه لتبدأ من اليوم الأول"],
  }},
  { id: "training", name: { en: "Training Plan", ar: "خطة التدريب" }, items: {
    en: ["2–6 sessions per week", "Built around the athletic pyramid", "Progressive overload, 4 phases", "Every set, rep, and cue written out", "Updated every 4 weeks"],
    ar: ["من 2 إلى 6 حصص أسبوعيًا", "مبنية حول الهرم الرياضي", "حمل تدريجي على 4 مراحل", "كل مجموعة وتكرار وتلميح مكتوب بالتفصيل", "تحديث كل 4 أسابيع"],
  }},
  { id: "nutrition", name: { en: "Nutrition System", ar: "نظام التغذية" }, items: {
    en: ["TDEE — total daily energy expenditure", "Your macros, set by phase", "Country-specific food guide", "Pre/post-training timing", "Meal alternatives", "Adjusts every 4 weeks"],
    ar: ["حساب TDEE (إجمالي الطاقة اليومية)", "الماكروز الخاصة بك حسب كل مرحلة", "دليل أطعمة حسب بلدك", "توقيت الأكل قبل وبعد التدريب", "بدائل للوجبات", "تعديل كل 4 أسابيع"],
  }},
  { id: "tracker", name: { en: "Athlete Tracker", ar: "متتبع الأداء" }, items: {
    en: ["Google Sheet shared on day 1", "1RM auto-load calculator", "12-week strength log", "Body composition tracker", "Speed and power benchmarks", "Weekly check-in log"],
    ar: ["ملف Google Sheet يُشارَك من اليوم الأول", "حاسبة تحميل تلقائية لأقصى تكرار (1RM)", "سجل قوة لمدة 12 أسبوعًا", "متتبع تكوين الجسم", "معايير السرعة والقدرة الانفجارية", "سجل متابعة أسبوعي"],
  }},
];

/* ---------- 4. ALL OTHER TEXT ---------- */
const CONTENT = {
  en: {
    dir: "ltr",
    metaTitle: "VSHVDOW — Athletic Coaching",
    metaDescription: "Football-first athletic coaching. One training system, three bundles, built to perform and built to last.",
    nav: { method: "Method", bundles: "Bundles", included: "Included", coach: "Coach", contact: "Contact", cta: "Message me" },
    hero: {
      line1: "Build an athlete first.",
      line2: "The physique follows.",
      sub: "Football-first athletic coaching, built around one training system — the Pyramid.",
      cta: "Message me on Instagram",
    },
    pyramid: {
      title: "The Pyramid",
      sub: "Every client, every goal, every session — the pyramid is always the process.",
    },
    layers: [
      { n: 5, name: "Peak expression", detail: "Physique, performance, and mindset" },
      { n: 4, name: "Speed and agility", detail: "Max velocity, change of direction, reactive agility" },
      { n: 3, name: "Strength and power", detail: "Progressive overload, explosiveness, force production" },
      { n: 2, name: "Athletic conditioning", detail: "Aerobic base, lactate threshold, repeat-sprint capacity" },
      { n: 1, name: "Movement foundation", detail: "Mobility, joint health, movement quality, injury resilience, posture" },
    ],
    bundles: {
      title: "Bundle System",
      sub: "All three bundles are athletic first. Your goal changes the apex, not the process.",
      pricingNote: "Every price is set for the individual athlete — your level, your goals, and your training capacity decide the exact number. The ranges below are the frame; message me and we'll land on yours in a couple of messages.",
      fxNote: "EGP pricing is fixed at roughly 50 EGP per $1, reviewed monthly.",
      minimum: "3-month minimum",
      perMonth: "/ month",
      bestForTitle: "Best for",
      waitlistBadge: "Full — waitlist open",
      waitlistCta: "Join waitlist",
    },
    products: {
      title: "What's Included",
      sub: "Everything you need. Nothing you don't.",
    },
    about: {
      title: "About the coach",
      body: [
        "No certificate on the wall. Just years on the pitch and in the gym, testing what actually works until I understood why — then building a system around it.",
        "VSHVDOW isn't something I studied. It's the standard I hold myself to, and the one every athlete I coach gets held to. No shortcuts. No skipping the foundation. Build the athlete first — everything else follows.",
        "I coach the way I train — obsessively, honestly, with zero patience for wasted effort.",
      ],
    },
    results: {
      title: "Results",
      body: "Real athletes, real numbers — case studies are on their way. Message me directly and I'll walk you through current client progress.",
    },
    contact: {
      title: "Ready to start?",
      sub: "Tell me your goal and I'll tell you which bundle fits. No pressure, no sales script.",
      cta: "Message me on Instagram",
      or: "or",
      whatsappCta: "Message on WhatsApp",
    },
    footer: {
      tagline: "Built to perform · Built to last",
      rights: "All rights reserved.",
    },
    ui: {
      langSwitch: "العربية",
      themeToLight: "Light mode",
      themeToDark: "Dark mode",
      menuOpen: "Menu",
      menuClose: "Close",
      copiedToast: "Message copied — paste it when Instagram opens",
    },
  },

  ar: {
    dir: "rtl",
    metaTitle: "VSHVDOW — تدريب رياضي",
    metaDescription: "تدريب رياضي لكرة القدم أولًا. نظام تدريبي واحد، وثلاث باقات، مبني ليؤدي وليستمر.",
    nav: { method: "المنهج", bundles: "الباقات", included: "المحتوى", coach: "المدرب", contact: "تواصل", cta: "راسلني" },
    hero: {
      line1: "ابنِ الرياضي أولًا.",
      line2: "والقوام يتبعه.",
      sub: "تدريب رياضي لكرة القدم، مبني حول نظام تدريبي واحد — الهرم.",
      cta: "راسلني على إنستغرام",
    },
    pyramid: {
      title: "الهرم",
      sub: "كل عميل، كل هدف، كل حصة تدريبية — الهرم هو الطريقة دائمًا.",
    },
    layers: [
      { n: 5, name: "القمة", detail: "القوام، والأداء، والعقلية" },
      { n: 4, name: "السرعة والرشاقة", detail: "أقصى سرعة، تغيير الاتجاه، الرشاقة التفاعلية" },
      { n: 3, name: "القوة والقدرة الانفجارية", detail: "الحمل التدريجي، الانفجارية، وإنتاج القوة" },
      { n: 2, name: "اللياقة الرياضية", detail: "القاعدة الهوائية، عتبة اللاكتات، وتحمل السرعات المتكررة" },
      { n: 1, name: "أساس الحركة", detail: "المرونة، صحة المفاصل، جودة الحركة، الوقاية من الإصابات، القوام" },
    ],
    bundles: {
      title: "نظام الباقات",
      sub: "الباقات الثلاث كلها رياضية في الأساس. هدفك يغيّر القمة، لا الطريقة.",
      pricingNote: "يتحدد كل سعر حسب الرياضي نفسه — مستواك، وأهدافك، وقدرتك على التدريب. الأرقام أدناه هي الإطار العام، وسنحدد رقمك بالضبط خلال رسالة أو رسالتين.",
      fxNote: "سعر الجنيه المصري ثابت عند حوالي 50 جنيهًا لكل دولار، ويُراجَع شهريًا.",
      minimum: "الحد الأدنى 3 أشهر",
      perMonth: "/ شهريًا",
      bestForTitle: "الأنسب لـ",
      waitlistBadge: "مكتمل — قائمة الانتظار مفتوحة",
      waitlistCta: "انضم لقائمة الانتظار",
    },
    products: {
      title: "ماذا يشمل الاشتراك",
      sub: "كل ما تحتاجه. ولا شيء غير ذلك.",
    },
    about: {
      title: "عن المدرب",
      body: [
        "لا شهادة معلَّقة على الحائط. فقط سنوات في الملعب وصالة التدريب، أختبر كل طريقة حتى أفهم لماذا تنجح — ثم أبني نظامًا حولها.",
        "VSHVDOW ليس شيئًا درسته في كتاب. إنه المعيار الذي أطبّقه على نفسي، ونفسه أطبّقه على كل رياضي أدرّبه. لا اختصارات، ولا تخطي للأساس. ابنِ الرياضي أولًا — وكل شيء آخر يتبعه.",
        "أدرّب كما أتمرّن: بهوس، وبصدق، وبلا صبر على أي مجهود يُهدر.",
      ],
    },
    results: {
      title: "النتائج",
      body: "رياضيون حقيقيون، وأرقام حقيقية — دراسات الحالة في الطريق. راسلني مباشرة وسأطلعك على تقدّم العملاء الحاليين.",
    },
    contact: {
      title: "جاهز تبدأ؟",
      sub: "أخبرني بهدفك، وسأخبرك بالباقة الأنسب لك. بلا ضغط ولا أسلوب مبيعات.",
      cta: "راسلني على إنستغرام",
      or: "أو",
      whatsappCta: "راسلني على واتساب",
    },
    footer: {
      tagline: "بُني ليؤدي · بُني ليستمر",
      rights: "جميع الحقوق محفوظة.",
    },
    ui: {
      langSwitch: "English",
      themeToLight: "الوضع الفاتح",
      themeToDark: "الوضع الداكن",
      menuOpen: "القائمة",
      menuClose: "إغلاق",
      copiedToast: "تم نسخ الرسالة — الصقها عند فتح إنستغرام",
    },
  },
};
