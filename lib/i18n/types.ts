export type Locale = "en" | "am";

export interface Translations {
  common: {
    brand: string;
    language: string;
    switchToAmharic: string;
    switchToEnglish: string;
    loading: string;
    logout: string;
    profile: string;
    dashboard: string;
    login: string;
    register: string;
    email: string;
    password: string;
    terms: string;
    privacy: string;
  };
  nav: {
    occasions: string;
    templates: string;
    howItWorks: string;
    pricing: string;
  };
  home: {
    eyebrow: string;
    titleMain: string;
    titleAccent: string;
    description: string;
    createInvitation: string;
    exploreTemplates: string;
    badgeDesigns: string;
    badgeBilingual: string;
    badgePayment: string;
    heroCardEyebrow: string;
    heroCardSub: string;
    heroCardTitle: string;
    heroCardAccent: string;
    heroBadge: string;
    occasionsKicker: string;
    occasionsTitle: string;
    occasionsTitleAccent: string;
    occasionsSubtitle: string;
    explore: string;
    exploring: string;
    events: {
      wedding: {
        label: string;
        am: string;
        eyebrow: string;
        text: string;
      };
      birthday: {
        label: string;
        am: string;
        eyebrow: string;
        text: string;
      };
      graduation: {
        label: string;
        am: string;
        eyebrow: string;
        text: string;
      };
    };
    howKicker: string;
    howTitle: string;
    howTitleAccent: string;
    howSubtitle: string;
    startCreating: string;
    hopLabel: string;
    steps: {
      step1Tag: string;
      step1Title: string;
      step1Text: string;
      step1Badge: string;
      step1PreviewNote: string;
      step2Tag: string;
      step2Title: string;
      step2Text: string;
      step2Badge: string;
      step2PreviewNames: string;
      step2PreviewDate: string;
      step2PreviewLocation: string;
      step3Tag: string;
      step3Title: string;
      step3Text: string;
      step3Badge: string;
      step3PreviewNote: string;
      step4Tag: string;
      step4Title: string;
      step4Text: string;
      step4Badge: string;
      step4Attending: string;
      step4Maybe: string;
      step4Declined: string;
      step4Guest1: string;
      step4Guest1Note: string;
      step4Guest2: string;
      step4Guest2Note: string;
    };
    galleryKicker: string;
    galleryTitle: string;
    galleryTitleAccent: string;
    seeAllTemplates: string;
    togetherWithFamilies: string;
    pricingKicker: string;
    pricingTitle: string;
    pricingTitleAccent: string;
    pricingSubtitle: string;
    learnMore: string;
    plans: {
      starter: {
        name: string;
        desc: string;
        features: string;
      };
      plus: {
        name: string;
        desc: string;
        features: string;
      };
      premium: {
        name: string;
        desc: string;
        features: string;
      };
    };
    ctaGeez: string;
    ctaTitle: string;
    ctaTitleAccent: string;
    footerTagline: string;
    footerCopyright: string;
  };
  dashboard: {
    title: string;
    yourDashboard: string;
    welcomeBack: string;
    manageSubtitle: string;
    newInvitation: string;
    emptyTitle: string;
    emptySubtitle: string;
    createFirstInvitation: string;
    status: {
      draft: string;
      published: string;
      archived: string;
    };
    fields: {
      template: string;
      plan: string;
      date: string;
    };
    actions: {
      edit: string;
      payment: string;
      preview: string;
    };
    nav: {
      profile: string;
      logout: string;
    };
  };
  auth: {
    loginTitle: string;
    loginTitleAccent: string;
    loginSubtitle: string;
    noAccount: string;
    getStarted: string;
    haveAccount: string;
    signIn: string;
    signingIn: string;
    forgotPassword: string;
    registerEyebrow: string;
    registerTitle: string;
    registerTitleAccent: string;
    registerSubtitle: string;
    passwordMin: string;
    createAccount: string;
    creatingAccount: string;
    termsNotice: string;
    and: string;
    almostThere: string;
    checkEmail: string;
    checkSpam: string;
    resetEyebrow: string;
    resetTitle: string;
    resetTitleAccent: string;
    resetSubtitle: string;
    sendResetLink: string;
    sending: string;
    backToSignIn: string;
    updateEyebrow: string;
    updateTitle: string;
    updateTitleAccent: string;
    updateSubtitle: string;
    newPassword: string;
    updatePassword: string;
    updating: string;
    passwordUpdated: string;
    badges: {
      bilingual: string;
      payment: string;
      secure: string;
    };
  };
}

