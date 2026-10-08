/* ============================================================
   VSHVDOW SITE CONTENT
   ------------------------------------------------------------
   This is the ONLY file you should need to edit day-to-day.
   Change prices, spots left, links, or any text (English or
   Egyptian Arabic) right here — the page rebuilds itself from
   this file.

   Do NOT touch index.html or script.js unless you're changing
   layout or behaviour, not words or numbers.
   ============================================================ */

/* ---------- 1. BUSINESS INFO ---------- */
/* Your social links. The bundle buttons open an Instagram DM
   with instagramHandle. */
const CONFIG = {
  brand: "VSHVDOW",
  instagramHandle: "vshvdow",
  instagramUrl: "https://www.instagram.com/vshvdow/",
  tiktokUrl: "https://www.tiktok.com/@vshvdow?is_from_webapp=1&sender_device=pc",
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
    badge: { en: "Best value", ar: "أحسن قيمة" },
    priceUSD: "$16–20",
    priceEGP: "799–999",
    spotsTotal: 4,
    spotsLeft: 4,
    featured: false,
    sections: [
      { title: { en: "Training", ar: "التمرين" }, items: [
        { en: "Monthly program block", ar: "برنامج تمرين شهري" },
        { en: "Pyramid layers 1–3", ar: "مستويات الهرم من 1 لـ 3" },
        { en: "2× form reviews / month", ar: "مراجعتين للفورم في الشهر" },
        { en: "Check-in every 2 weeks", ar: "متابعة كل أسبوعين" },
      ]},
      { title: { en: "Athletic components", ar: "العناصر الرياضية" }, items: [
        { en: "Mobility protocol", ar: "بروتوكول مرونة" },
        { en: "Movement quality foundation", ar: "أساسيات جودة الحركة" },
        { en: "General conditioning base", ar: "قاعدة لياقة عامة" },
        { en: "Basic power work", ar: "تمارين باور أساسية" },
      ]},
      { title: { en: "Nutrition", ar: "التغذية" }, items: [
        { en: "Calorie + macro framework", ar: "إطار للسعرات والماكروز" },
        { en: "Performance eating guide", ar: "دليل أكل للأداء" },
      ]},
      { title: { en: "Assessment", ar: "التقييم" }, items: [
        { en: "InBody scan", ar: "قياس InBody" },
        { en: "Lifestyle + habit intake form", ar: "استمارة عن نمط حياتك وعاداتك" },
        { en: "Video movement screen", ar: "تقييم حركة بالفيديو" },
      ]},
    ],
    bestFor: {
      en: ["General fitness", "Muscle gain & fat loss", "Beginners", "Body shape recomposition"],
      ar: ["لياقة عامة", "بناء عضل وحرق دهون", "المبتدئين", "إعادة تشكيل الجسم"],
    },
  },
  {
    id: "performance",
    name: "Performance",
    badge: { en: "Most popular", ar: "الأكتر طلبًا" },
    priceUSD: "$30–40",
    priceEGP: "1,499–1,999",
    spotsTotal: 3,
    spotsLeft: 3,
    featured: true,
    sections: [
      { title: { en: "Training", ar: "التمرين" }, items: [
        { en: "Custom monthly block", ar: "برنامج شهري مخصوص ليك" },
        { en: "Full pyramid layers 1–4", ar: "الهرم كامل: مستويات 1 لـ 4" },
        { en: "Unlimited form reviews", ar: "مراجعات فورم مفتوحة" },
        { en: "Weekly check-in", ar: "متابعة كل أسبوع" },
      ]},
      { title: { en: "Athletic components", ar: "العناصر الرياضية" }, items: [
        { en: "Speed block every cycle", ar: "بلوك سرعة في كل دورة" },
        { en: "Power training", ar: "تمارين باور" },
        { en: "Agility work + change of direction", ar: "رشاقة وتغيير اتجاه" },
        { en: "Lactate threshold + sprint work", ar: "عتبة اللاكتات وسبرنتات" },
      ]},
      { title: { en: "Nutrition", ar: "التغذية" }, items: [
        { en: "Phase-synced macros", ar: "ماكروز ماشية مع مرحلة التمرين" },
        { en: "Training-day carb cycling", ar: "تدوير الكارب في أيام التمرين" },
      ]},
      { title: { en: "Assessment", ar: "التقييم" }, items: [
        { en: "All Foundation assessments", ar: "كل تقييمات Athlete Foundation" },
        { en: "Strength testing", ar: "اختبارات قوة" },
        { en: "Sprint + jump benchmark", ar: "قياسات سرعة وقفز" },
        { en: "Basic injury history review", ar: "مراجعة أساسية لتاريخ الإصابات" },
      ]},
    ],
    bestFor: {
      en: ["Serious gym-goers", "Recreational footballers", "Athletes who want to look and perform"],
      ar: ["اللي بيتمرنوا في الجيم بجد", "لاعيبة الكورة الهواة", "اللي عايز يبان كويس ويأدّي كويس"],
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
      { title: { en: "Training", ar: "التمرين" }, items: [
        { en: "Bespoke weekly plan", ar: "خطة أسبوعية متفصّلة عليك" },
        { en: "Full pyramid, all 5 layers", ar: "الهرم كامل بالخمس مستويات" },
        { en: "Unlimited form reviews", ar: "مراجعات فورم مفتوحة" },
        { en: "2× weekly check-in", ar: "متابعتين في الأسبوع" },
        { en: "Graduation report at week 12", ar: "تقرير ختامي في الأسبوع 12" },
      ]},
      { title: { en: "Athletic components", ar: "العناصر الرياضية" }, items: [
        { en: "Full athletic periodisation", ar: "تخطيط رياضي متكامل (Periodisation)" },
        { en: "Football season integration", ar: "مظبوط على موسم الكورة" },
        { en: "Mindset + psychology work", ar: "شغل على العقلية والجانب النفسي" },
        { en: "Full aerobic / anaerobic conditioning", ar: "لياقة هوائية ولاهوائية كاملة" },
      ]},
      { title: { en: "Nutrition", ar: "التغذية" }, items: [
        { en: "Full personalised plan", ar: "خطة أكل شخصية كاملة" },
        { en: "Weekly nutrition review", ar: "مراجعة تغذية كل أسبوع" },
      ]},
      { title: { en: "Assessment", ar: "التقييم" }, items: [
        { en: "Injury screening + range of motion", ar: "فحص إصابات ومدى حركة" },
        { en: "7-day nutrition log review", ar: "مراجعة سجل أكل 7 أيام" },
        { en: "Speed & agility screening", ar: "تقييم سرعة ورشاقة" },
      ]},
    ],
    bestFor: {
      en: ["Hybrid athletes", "Semi-pro footballers", "MENA / international"],
      ar: ["الرياضيين الهايبرد", "لاعيبة كورة شبه محترفين", "الشرق الأوسط وبرّه"],
    },
  },
];

/* ---------- 3. PRODUCTS ---------- */
/* Each product is a photo card: number, title, one line.
   "image" is the photo file name (same folder as everything else) —
   swap it for any other photo to change that card. */
const PRODUCTS = [
  { id: "welcome",   image: "product-welcome.jpg",
    name: { en: "Welcome Pack",     ar: "باكدج الترحيب" },
    line: { en: "Everything you need to start on day one.",        ar: "كل اللي محتاجه عشان تبدأ من أول يوم." } },
  { id: "training",  image: "product-training.jpg",
    name: { en: "Training Plan",    ar: "خطة التمرين" },
    line: { en: "Every set, rep, and cue — rebuilt every 4 weeks.", ar: "كل مجموعة وعدّة وملاحظة — بتتكتب من جديد كل 4 أسابيع." } },
  { id: "nutrition", image: "product-nutrition.jpg",
    name: { en: "Nutrition System", ar: "سيستم التغذية" },
    line: { en: "Your macros and meals, dialed in by phase.",       ar: "الماكروز والوجبات بتاعتك، مظبوطة على كل مرحلة." } },
  { id: "tracker",   image: "product-tracker.jpg",
    name: { en: "Athlete Tracker",  ar: "متابعة الأداء" },
    line: { en: "Every number that matters, in one sheet.",         ar: "كل رقم مهم، في شيت واحد." } },
];

/* ---------- 4. DM MESSAGES ---------- */
/* What gets copied when someone taps a bundle button.
   {name} = bundle name, {price} = USD price (English) or EGP price (Arabic). */
const DM_MESSAGES = {
  en: {
    join:     "Hi Coach,\nI'd like to join the {name} bundle ({price} / month).\nCould you walk me through the next steps to get started?\nThanks!",
    waitlist: "Hi Coach,\nI saw the {name} bundle is currently full.\nI'd like to join the waitlist — please let me know as soon as a spot opens.\nThanks!",
  },
  ar: {
    join:     "أهلاً كابتن،\nحابب أشترك في باقة {name} ({price} جنيه في الشهر).\nممكن تقولي الخطوات الجاية عشان نبدأ؟\nشكرًا!",
    waitlist: "أهلاً كابتن،\nشفت إن باقة {name} كاملة دلوقتي.\nحابب أسجّل في قائمة الانتظار — ياريت تبلغني أول ما يفضى مكان.\nشكرًا!",
  },
};

/* ---------- 5. ALL OTHER TEXT ---------- */
const CONTENT = {
  en: {
    dir: "ltr",
    metaTitle: "VSHVDOW — Athletic Coaching",
    metaDescription: "Football-first athletic coaching. One training system, three bundles, built to perform and built to last.",
    nav: { pyramid: "Pyramid", bundles: "Bundles", products: "Products", coach: "Coach", contact: "Contact", cta: "Start Now" },
    hero: {
      line1: "PERFORMANCE UNDER PRESSURE",
      line2: "VSHVDOW ATHLETIC",
      cta: "Start Now",
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
      joinWord: "Join",
    },
    products: {
      title: "Products",
      sub: "Everything you need. Nothing you don't.",
    },
    about: {
      title: "About the coach",
      body: [
        "Every athlete I coach moves through the same system: five layers, built in order, nothing skipped. It's not a tagline — it's the only approach I've seen actually build performance that lasts, proven over years on the pitch and in the gym.",
        "VSHVDOW is the standard I hold myself to, and the one every athlete gets held to. Your program is tracked, reviewed, and rebuilt every four weeks around what the sessions and the numbers actually show — never guesswork.",
        "I coach the way I train — obsessively, honestly, with zero patience for wasted effort.",
      ],
    },
    results: {
      title: "Results",
      body: "Real athletes, real numbers — case studies are on their way. Message me directly and I'll walk you through current client progress.",
    },
    contact: {
      title: "Ready to start?",
      sub: "Every bundle is right above — pick the one that fits and I'll walk you through the rest.",
      cta: "Start Now",
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
      copiedToast: "Message copied — just paste it in the chat and send",
    },
  },

  ar: {
    dir: "rtl",
    metaTitle: "VSHVDOW — تدريب رياضي",
    metaDescription: "تدريب رياضي مبني على الكورة. سيستم تمرين واحد، وتلات باقات، متبني للأداء ومتبني للاستمرار.",
    nav: { pyramid: "الهرم", bundles: "الباقات", products: "المنتجات", coach: "الكوتش", contact: "تواصل", cta: "ابدأ دلوقتي" },
    hero: {
      line1: "أداء تحت الضغط",
      line2: "VSHVDOW ATHLETIC",
      cta: "ابدأ دلوقتي",
    },
    pyramid: {
      title: "الهرم",
      sub: "كل عميل، كل هدف، كل تمرينة — الهرم هو الطريقة، دايمًا.",
    },
    layers: [
      { n: 5, name: "القمة", detail: "الشكل، والأداء، والعقلية" },
      { n: 4, name: "السرعة والرشاقة", detail: "أقصى سرعة، تغيير الاتجاه، ورد الفعل السريع" },
      { n: 3, name: "القوة والانفجارية", detail: "زيادة الأحمال بالتدريج، الانفجارية، وإنتاج القوة" },
      { n: 2, name: "اللياقة الرياضية", detail: "قاعدة هوائية، عتبة اللاكتات، وتكرار السبرنتات" },
      { n: 1, name: "أساس الحركة", detail: "المرونة، صحة المفاصل، جودة الحركة، الوقاية من الإصابات، والقوام" },
    ],
    bundles: {
      title: "نظام الباقات",
      sub: "التلات باقات أساسهم رياضي. هدفك بيغيّر القمة، مش الطريقة.",
      pricingNote: "كل سعر بيتحدد على حسب اللاعب نفسه — مستواك، وأهدافك، وقدرتك على التمرين. الأرقام اللي تحت دي هي الإطار العام، وهنوصل لرقمك بالظبط في رسالة أو اتنين.",
      fxNote: "سعر الجنيه ثابت على حوالي 50 جنيه للدولار، وبيتراجع كل شهر.",
      minimum: "أقل مدة 3 شهور",
      perMonth: "/ في الشهر",
      bestForTitle: "مناسبة لـ",
      waitlistBadge: "كاملة — قائمة الانتظار مفتوحة",
      waitlistCta: "سجّل في قائمة الانتظار",
      joinWord: "اشترك في",
    },
    products: {
      title: "المنتجات",
      sub: "كل اللي محتاجه. ومفيش حاجة زيادة.",
    },
    about: {
      title: "عن الكوتش",
      body: [
        "كل لاعب بدرّبه بيمشي على نفس السيستم: خمس مستويات، بتتبني بالترتيب، من غير ما نفوّت ولا واحد فيهم. ده مش شعار — دي الطريقة الوحيدة اللي شفتها بتبني أداء حقيقي بيستمر، واتجربت سنين في الملعب والجيم.",
        "VSHVDOW هو المستوى اللي بحاسب نفسي عليه، ونفس المستوى اللي بحاسب عليه كل لاعب معايا. برنامجك بيتتابع وبيتراجع وبيتبني من جديد كل أربع أسابيع على حسب اللي التمرين والأرقام بيقولوه فعلًا — مفيش تخمين.",
        "بدرّب زي ما بتمرّن: بهوس، وبصدق، ومن غير أي صبر على مجهود بيضيع على الفاضي.",
      ],
    },
    results: {
      title: "النتايج",
      body: "لاعيبة حقيقيين وأرقام حقيقية — الـ case studies جاية قريب. ابعتلي على طول وهوريك تقدّم العملاء الحاليين.",
    },
    contact: {
      title: "جاهز تبدأ؟",
      sub: "كل الباقات موجودة فوق — اختار اللي تناسبك وأنا هكمّل معاك الباقي.",
      cta: "ابدأ دلوقتي",
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
      copiedToast: "الرسالة اتنسخت — الصقها في الشات وابعت",
    },
  },
};
