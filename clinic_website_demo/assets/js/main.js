const slides = Array.from(document.querySelectorAll('.slide'));
const prevButton = document.querySelector('.slide-arrow.prev');
const nextButton = document.querySelector('.slide-arrow.next');
const smoothScrollLinks = Array.from(document.querySelectorAll('a[href="#portfolio"], a[href="#footer-blogs"], a[href="#footer-contact"]'));
const languageButtons = Array.from(document.querySelectorAll('.lang-btn[data-lang]'));
const i18nElements = Array.from(document.querySelectorAll('[data-i18n]'));

let activeIndex = 0;
let autoTimer = null;

const translations = {
  en: {
    brandName: 'Dr Samar Mahmoud Abbas',
    headerAppointment: 'Book Your appointment',
    navHome: 'HOME',
    navAbout: 'ABOUT',
    navServices: 'SERVICES',
    navPortfolio: 'PORTFOLIO',
    navBlog: 'BLOG',
    navPublications: 'PUBLICATIONS',
    navEvents: 'EVENTS',
    navContact: 'CONTACT',
    serviceCard1Title: 'THERAPEUTIC NUTRITION',
    serviceCard2Title: 'WEIGHT MANAGEMENT',
    serviceCard3Title: 'CLINICAL DIET PLANS',
    serviceCard4Title: 'HEALTHY LIFESTYLE',
    heroSlide1Title: 'NUTRITION CARE',
    heroSlide1Subtitle: 'Your health starts with better food',
    heroSlide1Text: 'Therapeutic nutrition plans for weight, energy, and long-term lifestyle health.',
    heroSlide2Title: 'Book your Appointment',
    heroSlide2Subtitle: 'to visit us at the clinic',
    heroSlide3Title: 'PLANS',
    heroSlide3Subtitle: 'Personalized therapeutic nutrition plans',
    heroLearnMore: 'LEARN MORE',
    heroVisitUs: 'VISIT US',
    introTitle: 'WELCOME TO DR SAMAR MAHMOUD ABBAS NUTRITION CLINIC',
    introSubtitle: "We've built a long-standing relationship based on trust",
    introParagraph1: 'We support adults and children with therapeutic nutrition programs tailored to their medical needs and daily lifestyle.',
    introSubHeadline: 'PERSONALIZED NUTRITION CARE',
    introParagraph2: 'Each patient receives a clear food strategy, practical meal guidance, and follow-up support to sustain healthy progress.',
    introCta: 'BOOK YOUR APPOINTMENT',
    portfolioTitle: 'PROFESSIONAL PORTFOLIO',
    portfolioParagraph1: 'By the grace of God, I have completed all four levels of the @Adipodoc obesity treatment course.',
    portfolioParagraph2: '🙏🙏 O Allah, do not deprive us of the joy of learning.',
    portfolioItem1: '🩺 Dr Samar Mahmoud Abbas',
    portfolioItem2: 'Family Medicine and Therapeutic Nutrition Consultant',
    portfolioItem3: 'Public Health Lecturer, Faculty of Medicine, Helwan University',
    portfolioItem4: 'MBBCh, Kasr Al Ainy Faculty of Medicine',
    topicsTitle: 'THERAPEUTIC NUTRITION TOPICS - DEMO VERSION',
    topicsIntro: 'These topics are a demo preview for the client and can be refined after final approval.',
    topic1Title: 'THERAPEUTIC NUTRITION',
    topic1Text: 'Nutrition plans for cases such as insulin resistance, lipid disorders, and digestive issues.',
    topic2Title: 'WEIGHT LOSS CONSULTATIONS',
    topic2Text: 'Practical weight-loss programs with ongoing follow-up and weekly adjustments for each case.',
    topic3Title: 'NUTRITION HEALTH EDUCATION',
    topic3Text: 'Simple awareness content that helps patients choose healthy foods and organize daily meals.',
    preFooterTitle: 'NEED A PERSONAL HEALTH PLAN?',
    preFooterCall: 'Call Now 011 18147197',
    preFooterButton: 'BOOK YOUR APPOINTMENT',
    footerClinicTitle: 'DR SAMAR MAHMOUD ABBAS',
    footerClinicDesc: 'Therapeutic nutrition specialist focused on practical food plans, healthy weight goals, and long-term wellness habits.',
    footerAddress: 'El Laselky Street, Building 5, Unit 1, above El Demyaty Patisserie, Maadi, Egypt 0020',
    footerQuickLinksTitle: 'QUICK LINKS',
    footerLinkAbout: 'ABOUT US',
    footerLinkPublications: 'PUBLICATIONS',
    footerLinkPortfolio: 'PORTFOLIO',
    footerLinkServices: 'SERVICES',
    footerLinkAppointment: 'APPOINTMENT BOOKING',
    footerBlogsTitle: 'LATEST BLOGS',
    footerBlogMonthApr: 'APR',
    footerBlog1Title: 'Tayyibat Diet is Taking Over Social Media',
    footerBlog2Title: 'A Disaster in a Box of Vitamins',
    footerBlog3Title: 'The Mediterranean Diet',
    footerCopyright: 'Copyright ©2026 all rights reserved'
  },
  ar: {
    brandName: 'د. سمر محمود عباس',
    headerAppointment: 'احجز موعدك',
    navHome: 'الرئيسية',
    navAbout: 'من نحن',
    navServices: 'الخدمات',
    navPortfolio: 'الملف المهني',
    navBlog: 'المدونة',
    navPublications: 'المنشورات',
    navEvents: 'الفعاليات',
    navContact: 'تواصل معنا',
    serviceCard1Title: 'التغذية العلاجية',
    serviceCard2Title: 'إدارة الوزن',
    serviceCard3Title: 'خطط غذائية علاجية',
    serviceCard4Title: 'نمط حياة صحي',
    heroSlide1Title: 'الرعاية الغذائية',
    heroSlide1Subtitle: 'صحتك تبدأ بغذاء أفضل',
    heroSlide1Text: 'خطط تغذية علاجية لدعم الوزن والطاقة وصحة نمط الحياة على المدى الطويل.',
    heroSlide2Title: 'احجز موعدك',
    heroSlide2Subtitle: 'لزيارتنا في العيادة',
    heroSlide3Title: 'الخطط',
    heroSlide3Subtitle: 'خطط تغذية علاجية مخصصة',
    heroLearnMore: 'اعرف المزيد',
    heroVisitUs: 'زورونا',
    introTitle: 'مرحبًا بكم في عيادة د. سمر محمود عباس للتغذية العلاجية',
    introSubtitle: 'بنينا علاقة طويلة الأمد قائمة على الثقة',
    introParagraph1: 'ندعم البالغين والأطفال ببرامج تغذية علاجية مصممة وفق حالتهم الطبية ونمط حياتهم اليومي.',
    introSubHeadline: 'رعاية غذائية مخصصة',
    introParagraph2: 'يحصل كل مريض على خطة غذائية واضحة، وإرشادات عملية للوجبات، ومتابعة مستمرة للحفاظ على نتائج صحية مستدامة.',
    introCta: 'احجز موعدك',
    portfolioTitle: 'الملف المهني',
    portfolioParagraph1: 'الحمد لله تم الانتهاء من الأربع مستويات من كورس @Adipodoc لعلاج السمنة.',
    portfolioParagraph2: '🙏🙏 اللهم لا تحرمنا متعة تلقي العلم.',
    portfolioItem1: '🩺 دكتورة سمر محمود عباس',
    portfolioItem2: 'استشاري طب الأسرة والتغذية العلاجية',
    portfolioItem3: 'مدرس الصحة العامة كلية الطب جامعة حلوان',
    portfolioItem4: 'بكالوريوس الطب والجراحة كلية طب قصر العيني',
    topicsTitle: 'موضوعات التغذية العلاجية - نسخة تجريبية',
    topicsIntro: 'هذه الموضوعات تجريبية للعرض على العميل ويمكن تعديلها بعد الاعتماد النهائي.',
    topic1Title: 'التغذية العلاجية',
    topic1Text: 'خطط غذائية لحالات مثل مقاومة الانسولين، اضطراب الدهون، ومشكلات الهضم.',
    topic2Title: 'استشارات إنقاص الوزن',
    topic2Text: 'برامج عملية لإنقاص الوزن مع متابعة مستمرة وتعديلات أسبوعية مناسبة لكل حالة.',
    topic3Title: 'التوعية الصحية بالأكل',
    topic3Text: 'محتوى توعوي مبسط يساعد على اختيار الطعام الصحي وتنظيم الوجبات اليومية.',
    preFooterTitle: 'هل تحتاج إلى خطة صحية شخصية؟',
    preFooterCall: 'اتصل الآن 011 18147197',
    preFooterButton: 'احجز موعدك',
    footerClinicTitle: 'د. سمر محمود عباس',
    footerClinicDesc: 'متخصصة في التغذية العلاجية بخطط غذائية عملية تدعم أهداف الوزن الصحي ونمط الحياة المستدام.',
    footerAddress: 'شارع اللاسلكى عمارة ٥ على 1 فوق حلوانى الدمياطى المعادى , 0020',
    footerQuickLinksTitle: 'روابط سريعة',
    footerLinkAbout: 'من نحن',
    footerLinkPublications: 'المنشورات',
    footerLinkPortfolio: 'الملف المهني',
    footerLinkServices: 'الخدمات',
    footerLinkAppointment: 'حجز موعد',
    footerBlogsTitle: 'أحدث المقالات',
    footerBlogMonthApr: 'أبريل',
    footerBlog1Title: 'حمية الطيبات تغزو مواقع التواصل',
    footerBlog2Title: 'كارثة في علبة فيتامينات',
    footerBlog3Title: 'حمية البحر المتوسط',
    footerCopyright: 'جميع الحقوق محفوظة ©2026'
  }
};

const applyLanguage = (language) => {
  const selectedLanguage = language === 'ar' ? 'ar' : 'en';
  const selectedSet = translations[selectedLanguage];

  i18nElements.forEach((element) => {
    const key = element.dataset.i18n;

    if (selectedSet[key]) {
      element.textContent = selectedSet[key];
    }
  });

  languageButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.lang === selectedLanguage);
  });

  document.documentElement.lang = selectedLanguage;
  document.body.classList.toggle('lang-ar', selectedLanguage === 'ar');
  localStorage.setItem('preferredLanguage', selectedLanguage);
};

const setActiveSlide = (newIndex) => {
  slides.forEach((slide, index) => {
    slide.classList.toggle('is-active', index === newIndex);
  });

  activeIndex = newIndex;
};

const goToNext = () => {
  const nextIndex = (activeIndex + 1) % slides.length;
  setActiveSlide(nextIndex);
};

const goToPrev = () => {
  const prevIndex = (activeIndex - 1 + slides.length) % slides.length;
  setActiveSlide(prevIndex);
};

const restartAutoplay = () => {
  if (autoTimer) {
    clearInterval(autoTimer);
  }

  autoTimer = setInterval(goToNext, 5200);
};

prevButton?.addEventListener('click', () => {
  goToPrev();
  restartAutoplay();
});

nextButton?.addEventListener('click', () => {
  goToNext();
  restartAutoplay();
});

restartAutoplay();

smoothScrollLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    const targetSelector = link.getAttribute('href');
    const targetSection = targetSelector ? document.querySelector(targetSelector) : null;

    if (!targetSection) {
      return;
    }

    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    history.replaceState(null, '', targetSelector);
  });
});

languageButtons.forEach((button) => {
  button.addEventListener('click', () => {
    applyLanguage(button.dataset.lang);
  });
});

applyLanguage(localStorage.getItem('preferredLanguage') || 'en');
