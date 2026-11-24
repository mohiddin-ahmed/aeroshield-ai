/**
 * AeroShield AI - Comprehensive Multilingual Translation Engine
 * Complete end-to-end localization covering all UI text, dials, metrics,
 * timeline steps, Jugaad guides, family profiles, research hub, and modals.
 */

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' }
];

export const translations = {
  en: {
    appTitle: 'AeroShield AI',
    subBrand: 'VayuMitra OS',
    tagline: 'Turn Winter Smog Anxiety into Daily Clean-Air Strategy',
    tabs: {
      home: 'Home',
      routine: 'Routine',
      jugaad: 'Jugaad',
      research: 'Research'
    },
    status: {
      autoDetected: 'Auto-Detected Device Location & Time',
      liveFeed: 'Live CAMS Feed',
      offlineVerified: 'Offline Verified',
      solarActive: '☀️ Solar Convective Lift Window Active'
    },
    actions: {
      askAi: 'Ask AI',
      generatePlan: 'Generate AI Plan',
      analyzing: 'Analyzing Inversion...',
      autoDetect: 'Auto-Detect',
      switchCity: 'Switch City...',
      viewMore: 'View Detailed Guide & Science',
      watchVideo: 'Watch Demo Video',
      devTools: 'Judges DevTools',
      settings: 'Settings',
      saveAndClose: 'Save & Close Settings',
      launchDevTools: 'Launch DevTools',
      closePreview: 'Close Preview',
      copyPrompt: 'Copy Prompt',
      copied: 'Copied!'
    },
    dial: {
      title: 'Atmospheric Inversion Index',
      cigarettesToday: 'Equivalent to smoking',
      cigarettesUnit: 'cigarettes today',
      categories: {
        Good: 'Good',
        Moderate: 'Moderate',
        Unhealthy: 'Unhealthy',
        VeryUnhealthy: 'Very Unhealthy',
        Hazardous: 'Hazardous'
      }
    },
    hero: {
      rightNow: 'Right Now • Current Active Time Slot',
      prescribedAction: 'Prescribed Immediate Action:',
      emergencyTitle: 'Emergency Ground Thermal Inversion Alert',
      emergencyBody: 'Atmospheric boundary layer is trapped below 150 meters. Inhaling ambient air today is hazardous. Seal windows, run DIY box-fan filtration continuously, and ventilate only during the 1:00 PM – 3:00 PM solar window.'
    },
    familyProfiles: {
      title: 'Family Vulnerability Profile',
      subtitle: 'Tailors daily routine & AI advice (Multi-Select)',
      toddler: 'Toddler (0-5y)',
      elderly: 'Elderly (60+)',
      asthma: 'Asthma / COPD',
      commuter: 'Open Commuter',
      pet: 'Domestic Pets',
      pregnant: 'Pregnant Mother',
      athlete: 'Runner / Athlete',
      student: 'Student / Exam Prep',
      renter: 'Apartment Renter'
    },
    sensors: {
      title: 'Open-Meteo High-Resolution Atmospheric Sensors',
      pm25: 'PM2.5 (Fine Particles)',
      pm10: 'PM10 (Coarse Dust)',
      no2: 'Nitrogen Dioxide (NO2)',
      o3: 'Ground Ozone (O3)',
      safePrefix: 'Safe Threshold:'
    },
    routine: {
      title: '24-Hour Smog-Safe Automations & Daily Routine',
      subtitle: 'Synchronized with diurnal atmospheric boundary layer physics & solar convection cycles.',
      activeNow: 'Active Now',
      step1Title: 'Morning Inversion Peak (Windows Locked)',
      step1Desc: 'Radiative cooling forms an impenetrable inversion lid. Ground PM2.5 is at peak toxicity.',
      step1Action: 'Run DIY Box-Fan Purifiers on High. Absolutely no outdoor jogging or morning school assemblies.',
      step2Title: '☀️ The Solar Thermal Lift Window (Cross-Ventilation)',
      step2Desc: 'Peak solar insolation warms the soil, breaking the boundary lid and creating convective upward draft.',
      step2Action: 'Open opposing windows for 15 minutes of rapid air exchange to flush stagnant CO2 and VOCs.',
      step3Title: 'Evening Rush & Boundary Collapse',
      step3Desc: 'Nocturnal inversion reformulates rapidly as sun sets. Vehicular NO2 and dust peak.',
      step3Action: 'All commuters must wear sealed N95 respirators. Close all window drafts and curtains.',
      step4Title: 'Night Clean-Room Positive Pressure Protocol',
      step4Desc: 'Stagnant cold air settles until sunrise. Indoor filtration maintains clean alveolar zones.',
      step4Action: 'Dampen curtain hems (Parda-Geela) to catch drafting soot. Run bedroom purifier on medium whisper mode.'
    },
    jugaad: {
      headerBadge: 'Desi Jugaad Lab • Tailored for You',
      zeroCost: 'Zero-Cost Clean Air',
      title: 'Personalized Indoor Air Quality Hacks',
      description: 'Clean air is a fundamental human right. You do not need ₹25,000 imported appliances. These field-tested, science-backed household hacks are dynamically tailored to your current weather, local time, and family vulnerabilities.',
      boxFanTitle: '₹1,200 DIY Box-Fan HEPA Purifier (Corsi-Rosenthal Minimal)',
      boxFanSubtitle: '20-inch standard box fan + MERV 13 / H13 sheet. Outperforms ₹24,000 branded units.',
      costEfficientBadge: '22x More Cost-Efficient',
      targetRoomSize: 'Target Room Size',
      fanSpeed: 'Fan Speed Setting',
      deliveredCadr: 'Delivered CADR',
      ach: 'Air Changes/Hr (ACH)',
      cleanTime: '90% Clean Time',
      costPerCfm: 'Cost / CFM Clean Air',
      commercialCompare: 'vs ₹96 commercial',
      tailoredSectionTitle: 'Tailored Solutions for Your Profile & Weather',
      viewGuideBtn: 'View Detailed Guide & Science'
    },
    research: {
      badge: 'Peer-Reviewed Evidence Hub',
      academicCitations: 'Academic Citations',
      title: 'Scientific Research & Particulate Dosimetry Hub',
      description: 'AeroShield AI is grounded in peer-reviewed atmospheric physics and clinical epidemiology. All calculations adhere to Berkeley Earth cigarette equivalence rule, clinical autopsy findings from AIIMS/Medanta, and boundary layer measurements from IIT Kanpur.',
      calculatorTitle: 'Personalized Inhaled Dosimetry Calculator',
      calculatorSubtitle: 'Calculate the direct mass of alveolar PM2.5 and equivalent cigarettes prevented today.',
      totalAvoided: 'Total Inhaled PM2.5 Avoided',
      cigarettesPrevented: 'Equivalent Cigarettes Prevented',
      readJournalBtn: 'Read Full Journal Article'
    },
    disclaimer: {
      title: 'Scientific & Transparency Disclaimer',
      text: 'Atmospheric telemetry is modeled using satellite Copernicus/CAMS feeds and local meteorological stations. Recommendations are evidence-informed public health advisories for health betterment and harm reduction, not a substitute for clinical medical devices.'
    }
  },

  hi: {
    appTitle: 'एरोशील्ड AI',
    subBrand: 'वायुमित्र OS',
    tagline: 'सर्दियों के स्मॉग के डर को दैनिक स्वच्छ वायु रणनीति में बदलें',
    tabs: {
      home: 'होम',
      routine: 'दिनचर्या',
      jugaad: 'देसी जुगाड़',
      research: 'रिसर्च'
    },
    status: {
      autoDetected: 'ऑटो-डिटेक्टेड स्थान और समय',
      liveFeed: 'लाइव CAMS सैटेलाइट फीड',
      offlineVerified: 'सत्यापित ऑफलाइन डेटा',
      solarActive: '☀️ धूप का वेंटिलेशन समय सक्रिय'
    },
    actions: {
      askAi: 'AI से पूछें',
      generatePlan: 'AI प्लान बनाएं',
      analyzing: 'स्मॉग का विश्लेषण जारी...',
      autoDetect: 'स्थान खोजें',
      switchCity: 'शहर बदलें...',
      viewMore: 'विस्तृत गाइड और विज्ञान देखें',
      watchVideo: 'डेमो वीडियो देखें',
      devTools: 'जजेस देव-टूल्स',
      settings: 'सेटिंग्स',
      saveAndClose: 'सेटिंग्स सुरक्षित करें और बंद करें',
      launchDevTools: 'देव-टूल्स खोलें',
      closePreview: 'बंद करें',
      copyPrompt: 'प्रॉम्प्ट कॉपी करें',
      copied: 'कॉपी हो गया!'
    },
    dial: {
      title: 'वायुमंडलीय इनवर्जन सूचकांक',
      cigarettesToday: 'आज सांस लेना बराबर है',
      cigarettesUnit: 'सिगरेट पीने के',
      categories: {
        Good: 'अच्छा (सुरक्षित)',
        Moderate: 'मध्यम',
        Unhealthy: 'अस्वस्थ',
        VeryUnhealthy: 'बहुत अस्वस्थ',
        Hazardous: 'गंभीर / खतरनाक'
      }
    },
    hero: {
      rightNow: 'अभी का समय • वर्तमान सक्रिय समय स्लॉट',
      prescribedAction: 'तुरंत करने योग्य कार्रवाई:',
      emergencyTitle: 'आपातकालीन इनवर्जन स्मॉग चेतावनी',
      emergencyBody: 'वायुमंडलीय ठंडी परत 150 मीटर से नीचे फंसी हुई है। आज बाहर सांस लेना बेहद नुकसानदेह है। खिड़कियां बंद रखें, देसी बॉक्स-फैन प्यूरीफायर चलाएं और केवल 1 से 3 बजे की धूप में वेंटिलेशन करें।'
    },
    familyProfiles: {
      title: 'पारिवारिक स्वास्थ्य प्रोफाइल',
      subtitle: 'दिनचर्या और देसी नुस्खों को परिवार के अनुसार बदलें (कई चुनें)',
      toddler: 'छोटे बच्चे (0-5 वर्ष)',
      elderly: 'बुजुर्ग (60+ वर्ष)',
      asthma: 'अस्थमा / सांस की बीमारी',
      commuter: 'दुपहिया / पैदल यात्री',
      pet: 'पालतू जानवर (कुत्ते/बिल्ली)',
      pregnant: 'गर्भवती महिलाएं',
      athlete: 'दौड़ने वाले / एथलीट',
      student: 'विद्यार्थी / परीक्षा तैयारी',
      renter: 'किराएदार / फ्लैट निवासी'
    },
    sensors: {
      title: 'ओपन-मेटियो उच्च-सटीक वायुमंडलीय सेंसर',
      pm25: 'PM2.5 (सूक्ष्म कण)',
      pm10: 'PM10 (धूल के कण)',
      no2: 'नाइट्रोजन डाइऑक्साइड (वाहनों का धुआं)',
      o3: 'ग्राउंड ओजोन (O3)',
      safePrefix: 'सुरक्षित सीमा:'
    },
    routine: {
      title: '24 घंटे की स्मॉग-सुरक्षित दिनचर्या और नियम',
      subtitle: 'सूरज की रोशनी और तापमान के वैज्ञानिक चक्र पर आधारित।',
      activeNow: 'अभी सक्रिय',
      step1Title: 'सुबह का स्मॉग पीक (खिड़कियां पूरी तरह बंद रखें)',
      step1Desc: 'रात की ठंडी हवा जहरीले कणों को जमीन पर दबा देती है। सुबह प्रदूषण सबसे ज्यादा होता है।',
      step1Action: 'देसी बॉक्स-फैन प्यूरीफायर को हाई पर चलाएं। सुबह टहलने या मॉर्निंग वॉक पर बिल्कुल न जाएं।',
      step2Title: '☀️ 1:00 से 3:00 बजे की धूप का समय (खिड़की खोलने का समय)',
      step2Desc: 'दोपहर में धूप से जमीन गर्म होती है और धुआं ऊपर उड़ जाता है।',
      step2Action: 'घर की आमने-सामने की खिड़कियां 15 मिनट के लिए खोलें ताकि ताजी हवा आ सके और कार्बन बाहर निकले।',
      step3Title: 'शाम की ट्रैफिक और ठंड की वापसी (शाम 5:30 से 7:30)',
      step3Desc: 'सूरज ढलते ही वाहनों का धुआं और ठंड मिलकर हवा को फिर से जहरीला बना देते हैं।',
      step3Action: 'बाहर निकलते समय N95 मास्क अनिवार्य रूप से लगाएं। खिड़कियां शाम 5 बजे से पहले बंद कर लें।',
      step4Title: 'रात का स्वच्छ-कमरा नियम (रात 9:00 बजे से सुबह तक)',
      step4Desc: 'रात भर ठंडी हवा धूल को कमरे में खींचती है। सोते समय फेफड़ों की सुरक्षा जरूरी है।',
      step4Action: 'पर्दों के नीचे हल्का पानी छिड़कें (पर्दा-गीला)। बेडरूम का प्यूरीफायर मीडियम पर चालू रखें।'
    },
    jugaad: {
      headerBadge: 'देसी जुगाड़ लैब • आपके लिए तैयार',
      zeroCost: 'सस्ता और असरदार स्वच्छ हवा समाधान',
      title: 'घर पर बनने वाले वायु सुरक्षा देसी जुगाड़',
      description: 'स्वच्छ हवा सबका अधिकार है। आपको ₹25,000 का महंगा प्यूरीफायर खरीदने की जरूरत नहीं है। ये देसी उपाय विज्ञान द्वारा प्रमाणित हैं और आपके बजट में तैयार होते हैं।',
      boxFanTitle: '₹1,200 का देसी बॉक्स-फैन HEPA प्यूरीफायर',
      boxFanSubtitle: '20-इंच पंखा + MERV 13 फिल्टर। ₹24,000 के महंगे प्यूरीफायर जितना ही असरदार।',
      costEfficientBadge: '22 गुना ज्यादा किफायती',
      targetRoomSize: 'कमरे का आकार',
      fanSpeed: 'पंखे की स्पीड',
      deliveredCadr: 'साफ हवा की गति (CADR)',
      ach: 'प्रति घंटा हवा की सफाई (ACH)',
      cleanTime: '90% सफाई का समय',
      costPerCfm: 'प्रति CFM खर्च',
      commercialCompare: 'बाजार के ₹96 के मुकाबले केवल ₹4',
      tailoredSectionTitle: 'आपके परिवार और मौसम के अनुसार विशेष उपाय',
      viewGuideBtn: 'विस्तृत गाइड और विज्ञान देखें'
    },
    research: {
      badge: 'प्रमाणित वैज्ञानिक शोध केंद्र',
      academicCitations: 'शीर्ष अंतरराष्ट्रीय शोध पत्र',
      title: 'वैज्ञानिक रिसर्च और सिगरेट नुकसान कैलकुलेटर',
      description: 'एरोशील्ड AI बर्कले अर्थ (Berkeley Earth), लैंसेट (The Lancet), और IIT कानपुर के शोध पर आधारित है। यहां देखें कि देसी उपायों से आप कितने सिगरेट का धुआं रोक सकते हैं।',
      calculatorTitle: 'फेफड़ों में जाने वाले धुएं की बचत का कैलकुलेटर',
      calculatorSubtitle: 'जानिए कि इन उपायों को अपनाकर आपने आज कितने सिगरेट का जहरीला धुआं रोका।',
      totalAvoided: 'फेफड़ों में जाने से रोका गया PM2.5',
      cigarettesPrevented: 'रोकी गई सिगरेटों के बराबर धुआं',
      readJournalBtn: 'पूरा रिसर्च पेपर पढ़ें'
    },
    disclaimer: {
      title: 'वैज्ञानिक एवं पारदर्शिता डिस्क्लेमर',
      text: 'वायुमंडलीय डेटा सैटेलाइट और मौसम विज्ञान केंद्रों पर आधारित है। ये सुझाव स्वास्थ्य सुरक्षा और नुकसान कम करने के लिए हैं, यह किसी क्लिनिकल मेडिकल उपकरण का विकल्प नहीं है।'
    }
  },

  bn: {
    appTitle: 'অ্যারোশিল্ড AI',
    subBrand: 'বায়ুমিত্র OS',
    tagline: 'শীতের ধোঁয়াশার ভয় দূর করে দৈনিক স্বাস্থ্যকর বাতাসের কৌশল গ্রহণ করুন',
    tabs: { home: 'হোম', routine: 'রুটিন', jugaad: 'দেশি জুগাড়', research: 'গবেষণা' },
    status: { autoDetected: 'স্বয়ংক্রিয় সনাক্ত অবস্থান ও সময়', liveFeed: 'লাইভ CAMS ফিড', offlineVerified: 'অফলাইন ডেটা প্রস্তুত', solarActive: '☀️ সূর্যালোক বায়ু চলাচল সক্রিয়' },
    actions: { askAi: 'AI জিজ্ঞাসা করুন', generatePlan: 'AI পরিকল্পনা তৈরি করুন', analyzing: 'বিশ্লেষণ চলছে...', autoDetect: 'অবস্থান খুঁজুন', switchCity: 'শহর পরিবর্তন...', viewMore: 'বিস্তারিত গাইড ও বিজ্ঞান দেখুন', watchVideo: 'ডেমো ভিডিও দেখুন', devTools: 'বিচারক টুলস', settings: 'সেটিংস', saveAndClose: 'সংরক্ষণ ও বন্ধ', launchDevTools: 'টুলস খুলুন', closePreview: 'বন্ধ করুন', copyPrompt: 'প্রম্পট কপি করুন', copied: 'কপি হয়েছে!' },
    dial: { title: 'বায়ুমণ্ডলীয় ইনভার্সন সূচক', cigarettesToday: 'আজ শ্বাস নেওয়া সমান', cigarettesUnit: 'টি সিগারেট খাওয়ার সমান', categories: { Good: 'ভালো', Moderate: 'মাঝারি', Unhealthy: 'অস্বাস্থ্যকর', VeryUnhealthy: 'খুব অস্বাস্থ্যকর', Hazardous: 'বিপজ্জনক' } },
    hero: { rightNow: 'এখনই • বর্তমান সক্রিয় সময়', prescribedAction: 'অবিলম্বে করণীয়:', emergencyTitle: 'জরুরী ধোঁয়াশা সতর্কতা', emergencyBody: 'বায়ুমণ্ডলে দূষিত কণা আটকে আছে। জানালা বন্ধ রাখুন এবং কেবল দুপুরের রোদে ১৫ মিনিট ঘর বাতাস করুন।' },
    familyProfiles: { title: 'পারিবারিক স্বাস্থ্য প্রোফাইল', subtitle: 'সবার জন্য সুরক্ষা নির্বাচন করুন', toddler: 'ছোট শিশু (০-৫ বছর)', elderly: 'বয়স্ক মানুষ (৬০+ বছর)', asthma: 'হাঁপানি / শ্বাসকষ্ট', commuter: 'বাইক ও পথচারী', pet: 'পোষা প্রাণী', pregnant: 'গর্ভবতী মা', athlete: 'ক্রীড়াবিদ', student: 'শিক্ষার্থী', renter: 'ভাড়াটিয়া' },
    sensors: { title: 'ওপেন-মেটিও উচ্চমানের বায়ুমণ্ডলীয় সেন্সর', pm25: 'PM2.5 (সূক্ষ্ম কণা)', pm10: 'PM10 (ধূলিকণা)', no2: 'নাইট্রোজেন ডাই অক্সাইড', o3: 'ওজোন (O3)', safePrefix: 'নিরাপদ সীমা:' },
    routine: { title: '২৪ ঘণ্টার ধোঁয়াশা-মুক্ত জীবনযাপন রুটিন', subtitle: 'সূর্যের আলো ও তাপমাত্রার বৈজ্ঞানিক নিয়ম মেনে তৈরি।', activeNow: 'এখন সক্রিয়', step1Title: 'সকালের বিষাক্ত ধোঁয়াশা (জানালা বন্ধ রাখুন)', step1Desc: 'সকালে ঠান্ডা বাতাসের জন্য দূষণ মাটিতে আটকে থাকে।', step1Action: 'ফিল্টার চালু রাখুন। সকালে প্রাতঃভ্রমণ বন্ধ রাখুন।', step2Title: '☀️ দুপুর ১টা থেকে ৩টার রোদ (জানালা খোলার সময়)', step2Desc: 'রোদে মাটি গরম হয়ে ধোঁয়াশা উপরে উঠে যায়।', step2Action: '১৫ মিনিটের জন্য বিপরীতমুখী জানালা খুলে দিন।', step3Title: 'সন্ধ্যার ট্রাফিক ধোঁয়াশা', step3Desc: 'সন্ধ্যায় গাড়ির ধোঁয়া আবার বাতাসে বাড়ে।', step3Action: 'বাইরে বের হলে N95 মাস্ক পরুন।', step4Title: 'রাতের পরিষ্কার ঘরের নিয়ম', step4Desc: 'ঘুমের সময় ঠান্ডা ধোঁয়া ফুসফুসে ক্ষতি করে।', step4Action: 'ভেজা সুতির পর্দা ব্যবহার করুন।' },
    jugaad: { headerBadge: 'দেশি জুগাড় ল্যাব', zeroCost: 'কম খরচে খাঁটি বাতাস', title: 'সাশ্রয়ী ইনডোর এয়ার ফিল্টার হ্যাক', description: 'পরিষ্কার বাতাস পাওয়া সবার অধিকার। ২৫,০০০ টাকার দামি ফিল্টার কেনার দরকার নেই।', boxFanTitle: '১,২০০ টাকার দেশি বক্স-ফ্যান ফিল্টার', boxFanSubtitle: '২০ ইঞ্চি ফ্যান + MERV 13 ফিল্টার।', costEfficientBadge: '২২ গুণ বেশি সাশ্রয়ী', targetRoomSize: 'ঘরের মাপ', fanSpeed: 'ফ্যানের গতি', deliveredCadr: 'পরিষ্কার বাতাসের গতি', ach: 'প্রতি ঘণ্টার বাতাস পরিষ্কার', cleanTime: '৯০% পরিষ্কারের সময়', costPerCfm: 'প্রতি CFM খরচ', commercialCompare: 'দামি পণ্যের চেয়ে অনেক সস্তা', tailoredSectionTitle: 'আপনার পরিবার ও আবহাওয়ার জন্য তৈরি হ্যাক', viewGuideBtn: 'বিস্তারিত গাইড ও বিজ্ঞান দেখুন' },
    research: { badge: 'আন্তর্জাতিক গবেষণা কেন্দ্র', academicCitations: 'শীর্ষ গবেষণাপত্র', title: 'বিজ্ঞান ও স্বাস্থ্য পরীক্ষা কেন্দ্র', description: 'বার্কলে আর্থ ও দ্য ল্যানসেট গবেষণার ভিত্তিতে তৈরি।', calculatorTitle: 'ফুসফুসে বিষাক্ত ধোঁয়া প্রতিরোধের ক্যালকুলেটর', calculatorSubtitle: 'জানুন আজ কতগুলি সিগারেটের ক্ষতি থেকে রক্ষা পেয়েছেন।', totalAvoided: 'প্রতিরোধ করা PM2.5 এর পরিমাণ', cigarettesPrevented: 'প্রতিরোধ করা সিগারেটের সমপরিমাণ', readJournalBtn: 'পুরো গবেষণাপত্র পড়ুন' },
    disclaimer: { title: 'বৈজ্ঞানিক অস্বীকৃতি', text: 'বায়ুর তথ্য স্যাটেলাইটের মাধ্যমে প্রাপ্ত। এটি স্বাস্থ্য সুরক্ষার সহায়ক পরামর্শ।' }
  },

  te: {
    appTitle: 'ఏరోషీల్డ్ AI',
    subBrand: 'వాయుమిత్ర OS',
    tagline: 'శీతాకాల పొగమంచు ఆందోళనను రోజువారీ స్వచ్ఛమైన గాలి వ్యూహంగా మార్చండి',
    tabs: { home: 'హోమ్', routine: 'దినచర్య', jugaad: 'దేశీ జుగాడ్', research: 'పరిశోధన' },
    status: { autoDetected: 'ఆటో-డిటెక్ట్ చేయబడిన స్థానం & సమయం', liveFeed: 'లైవ్ ఉపగ్రహ ఫీడ్', offlineVerified: 'ఆఫ్‌లైన్ డేటా సిద్ధం', solarActive: '☀️ సూర్యకాంతి వెంటిలేషన్ సమయం సక్రియంగా ఉంది' },
    actions: { askAi: 'AI ని అడగండి', generatePlan: 'AI ప్లాన్ రూపొందించండి', analyzing: 'విశ్లేషిస్తోంది...', autoDetect: 'గుర్తించండి', switchCity: 'నగరాన్ని మార్చండి...', viewMore: 'వివరమైన గైడ్ మరియు సైన్స్ చూడండి', watchVideo: 'డెమో వీడియో', devTools: 'టూల్స్', settings: 'సెట్టింగ్‌లు', saveAndClose: 'సేవ్ & క్లోజ్', launchDevTools: 'టూల్స్ ప్రారంభించండి', closePreview: 'మూసివేయి', copyPrompt: 'ప్రాంప్ట్ కాపీ చేయండి', copied: 'కాపీ చేయబడింది!' },
    dial: { title: 'వాతావరణ ఇన్వర్షన్ సూచిక', cigarettesToday: 'ఈ రోజు పీల్చే గాలి సమానం', cigarettesUnit: 'సిగరెట్లతో సమానం', categories: { Good: 'మంచిది', Moderate: 'మధ్యస్థం', Unhealthy: 'అనారోగ్యకరం', VeryUnhealthy: 'చాలా అనారోగ్యం', Hazardous: 'ప్రమాదకరం' } },
    hero: { rightNow: 'ప్రస్తుత సమయం', prescribedAction: 'వెంటనే చేయవలసిన పని:', emergencyTitle: 'పొగమంచు ప్రమాద హెచ్చరిక', emergencyBody: 'విషపూరితమైన గాలి భూమిపైనే నిలిచిపోయింది. కిటికీలు మూసివేసి ఉంచండి.' },
    familyProfiles: { title: 'కుటుంబ ఆరోగ్య ప్రొఫైల్', subtitle: 'అందరి ఆరోగ్యం కోసం ఎంచుకోండి', toddler: 'చిన్న పిల్లలు (0-5 సం.)', elderly: 'వృద్ధులు (60+ సం.)', asthma: 'ఆస్తమా / శ్వాస సమస్యలు', commuter: 'బైక్ ప్రయాణికులు', pet: 'పెంపుడు జంతువులు', pregnant: 'గర్భిణీ స్త్రీలు', athlete: 'వ్యాయామం చేసేవారు', student: 'విద్యార్థులు', renter: 'అద్దె ఇళ్లలో ఉండేవారు' },
    sensors: { title: 'హై-రిజల్యూషన్ వాతావరణ సెన్సార్లు', pm25: 'PM2.5 (సూక్ష్మ కణాలు)', pm10: 'PM10 (ధూళి కణాలు)', no2: 'నైట్రోజన్ డయాక్సైడ్', o3: 'ఓజోన్ (O3)', safePrefix: 'సురక్షిత పరిమితి:' },
    routine: { title: '24 గంటల పొగమంచు రక్షణ దినచర్య', subtitle: 'సూర్యుని వెలుగు మరియు ఉష్ణోగ్రత ఆధారంగా రూపొందించబడింది.', activeNow: 'ఇప్పుడు నడుస్తోంది', step1Title: 'ఉదయం పొగమంచు తీవ్రత (కిటికీలు మూసి ఉంచండి)', step1Desc: 'చలి వల్ల గాలిలో కాలుష్యం కిందే ఉండిపోతుంది.', step1Action: 'ఫిల్టర్లు వేయండి. ఉదయం నడక మానుకోండి.', step2Title: '☀️ మధ్యాహ్నం 1 నుండి 3 వరకు (కిటికీలు తెరిచే సమయం)', step2Desc: 'ఎండ వల్ల కాలుష్యం పైకి లేస్తుంది.', step2Action: '15 నిమిషాల పాటు కిటికీలు తెరవండి.', step3Title: 'సాయంత్రం ట్రాఫిక్ కాలుష్యం', step3Desc: 'చలి వల్ల పొగ మళ్ళీ కిందకు చేరుతుంది.', step3Action: 'N95 మాస్క్ వాడండి.', step4Title: 'రాత్రి నిద్రించే గది నియమం', step4Desc: 'రాత్రి వేళ గాలి పీల్చేటప్పుడు రక్షణ అవసరం.', step4Action: 'తడి కాటన్ కర్టెన్లు వాడండి.' },
    jugaad: { headerBadge: 'దేశీ జుగాడ్ ల్యాబ్', zeroCost: 'తక్కువ ఖర్చుతో శుభ్రమైన గాలి', title: 'ఇంటి వద్దే తయారుచేసే ఎయిర్ ఫిల్టర్లు', description: 'శుభ్రమైన గాలి అందరి హక్కు. రూ. 25,000 ఖరీదైన ఫిల్టర్లు కొనాల్సిన పనిలేదు.', boxFanTitle: 'రూ. 1,200 బాక్స్-ఫ్యాన్ ప్యూరిఫైయర్', boxFanSubtitle: '20 ఇంచుల ఫ్యాన్ + MERV 13 ఫిల్టర్.', costEfficientBadge: '22 రెట్లు ఎక్కువ ఆదా', targetRoomSize: 'గది పరిమాణం', fanSpeed: 'ఫ్యాన్ వేగం', deliveredCadr: 'శుభ్రమైన గాలి వేగం', ach: 'గంటకు గాలి శుద్ధి', cleanTime: '90% శుభ్రత సమయం', costPerCfm: 'ఖర్చు', commercialCompare: 'ఖరీదైన వాటి కంటే ఎంతో మెరుగు', tailoredSectionTitle: 'మీ కుటుంబం మరియు వాతావరణం కోసం చిట్కాలు', viewGuideBtn: 'పూర్తి గైడ్ మరియు సైన్స్ చూడండి' },
    research: { badge: 'శాస్త్రీయ పరిశోధన కేంద్రం', academicCitations: 'ప్రముఖ పరిశోధనా పత్రాలు', title: 'సైన్స్ మరియు ఆరోగ్య ఫలితాలు', description: 'బర్కిలీ ఎర్త్ మరియు లాన్సెట్ ఆధారంగా తయారు చేయబడింది.', calculatorTitle: 'కాలుష్యం నివారణ కాలిక్యులేటర్', calculatorSubtitle: 'ఈ రోజు మీరు ఎన్ని సిగరెట్ల కాలుష్యం నుండి తప్పించుకున్నారో తెలుసుకోండి.', totalAvoided: 'నివారించిన PM2.5', cigarettesPrevented: 'నివారించిన సిగరెట్లు', readJournalBtn: 'పరిశోధన పత్రం చదవండి' },
    disclaimer: { title: 'శాస్త్రీయ నిరాకరణ', text: 'సమాచారం ఉపగ్రహాల ఆధారంగా లెక్కింపబడుతుంది. ఇవి ఆరోగ్య రక్షణకు సూచనలు మాత్రమే.' }
  },

  ta: {
    appTitle: 'ஏரோஷீல்ட் AI',
    subBrand: 'வாயுமித்ரா OS',
    tagline: 'குளிர்கால நச்சுப் புகை அச்சத்தை அன்றாட தூய காற்று உத்தியாக மாற்றுங்கள்',
    tabs: { home: 'முகப்பு', routine: 'வழக்கம்', jugaad: 'தேசி ஜூகாட்', research: 'ஆராய்ச்சி' },
    status: { autoDetected: 'தானாக கண்டறியப்பட்ட இடம் & நேரம்', liveFeed: 'நேரலை CAMS ஃபீட்', offlineVerified: 'ஆஃப்லைன் தயார்', solarActive: '☀️ சூரிய ஒளி காற்றோட்ட நேரம்' },
    actions: { askAi: 'AI இடம் கேட்கவும்', generatePlan: 'AI திட்டம் உருவாக்கவும்', analyzing: 'ஆராய்கிறது...', autoDetect: 'கண்டறிக', switchCity: 'நகரம் மாற்று...', viewMore: 'முழு வழிகாட்டி & அறிவியல் காண்க', watchVideo: 'டெமோ வீடியோ', devTools: 'கருவிகள்', settings: 'அமைப்புகள்', saveAndClose: 'சேமித்து மூடு', launchDevTools: 'தொடங்கு', closePreview: 'மூடு', copyPrompt: 'நகலெடு', copied: 'நகலெடுக்கப்பட்டது!' },
    dial: { title: 'வளிமண்டல குறியீடு', cigarettesToday: 'இன்று சுவாசிப்பது சமமானது', cigarettesUnit: 'சிகரெட் பிடிப்பதற்கு சமம்', categories: { Good: 'நன்று', Moderate: 'மிதமானது', Unhealthy: 'ஆரோக்கியமற்றது', VeryUnhealthy: 'மிகவும் மோசம்', Hazardous: 'ஆபத்தானது' } },
    hero: { rightNow: 'தற்போதைய நேரம்', prescribedAction: 'உடனடி நடவடிக்கை:', emergencyTitle: 'அவசர காற்று மாசுபாடு எச்சரிக்கை', emergencyBody: 'காற்று மாசுபாடு தரைமட்டத்தில் தேங்கியுள்ளது. ஜன்னல்களை மூடி வைக்கவும்.' },
    familyProfiles: { title: 'குடும்ப சுகாதார சுயவிவரம்', subtitle: 'பாதுகாப்புக்கு ஏற்ப தேர்வு செய்யவும்', toddler: 'சிறு குழந்தைகள் (0-5 வயது)', elderly: 'முதியவர்கள் (60+ வயது)', asthma: 'ஆஸ்துமா / மூச்சுத்திணறல்', commuter: 'பைக் பயணிகள்', pet: 'செல்லப்பிராணிகள்', pregnant: 'கர்ப்பிணி பெண்கள்', athlete: 'விளையாட்டு வீரர்கள்', student: 'மாணவர்கள்', renter: 'வாடகை வீட்டில் இருப்பவர்கள்' },
    sensors: { title: 'வளிமண்டல சென்சார்கள்', pm25: 'PM2.5 (நுண் துகள்கள்)', pm10: 'PM10 (தூசி)', no2: 'வாகன புகை (NO2)', o3: 'ஓசோன் (O3)', safePrefix: 'பாதுகாப்பான அளவு:' },
    routine: { title: '24 மணி நேர காற்று பாதுகாப்பு வழக்கம்', subtitle: 'சூரிய ஒளி மற்றும் வெப்பநிலையின் படி வடிவமைக்கப்பட்டது.', activeNow: 'தற்போது இயங்குகிறது', step1Title: 'காலை நச்சுப் புகை (ஜன்னல்களை மூடவும்)', step1Desc: 'குளிர்காற்றில் புகை தரையிலேயே தங்கும்.', step1Action: 'ஃபில்டர்களை இயக்கவும். நடைப்பயிற்சியை தவிர்க்கவும்.', step2Title: '☀️ மதியம் 1 முதல் 3 மணி வரை (ஜன்னல் திறக்கும் நேரம்)', step2Desc: 'வெயிலால் புகை மேலே எழும்பும்.', step2Action: '15 நிமிடங்களுக்கு ஜன்னல்களை திறந்து வைக்கவும்.', step3Title: 'மாலை நேர வாகன புகை', step3Desc: 'மாலையில் மீண்டும் புகை அதிகம் தங்கும்.', step3Action: 'N95 முகக்கவசம் அணியவும்.', step4Title: 'இரவு நேர அறை தூய்மை', step4Desc: 'தூங்கும் போது சுத்தமான காற்று தேவை.', step4Action: 'ஈரமான துணி திரைகளை பயன்படுத்தவும்.' },
    jugaad: { headerBadge: 'தேசி ஜூகாட் லேப்', zeroCost: 'குறைந்த செலவில் தூய காற்று', title: 'வீட்டிலேயே செய்யும் எளிய ஃபில்டர்கள்', description: 'ரூ. 25,000 செலவு செய்ய தேவையில்லை. எளிய முறையில் சுத்தமான காற்று பெறுங்கள்.', boxFanTitle: 'ரூ. 1,200 பாக்ஸ்-ஃபேன் பியூரிஃபையர்', boxFanSubtitle: '20 இன்ச் ஃபேன் + MERV 13 ஃபில்டர்.', costEfficientBadge: '22 மடங்கு சிக்கனமானது', targetRoomSize: 'அறை அளவு', fanSpeed: 'ஃபேன் வேகம்', deliveredCadr: 'காற்று வேகம்', ach: 'மணிக்கு காற்று சுழற்சி', cleanTime: 'தூய்மை நேரம்', costPerCfm: 'செலவு', commercialCompare: 'விலை உயர்ந்த சாதனங்களை விட சிறந்தது', tailoredSectionTitle: 'உங்கள் குடும்பத்திற்கான எளிய வழிகள்', viewGuideBtn: 'முழு வழிகாட்டி & அறிவியல் காண்க' },
    research: { badge: 'ஆராய்ச்சி மையம்', academicCitations: 'முக்கிய ஆராய்ச்சிகள்', title: 'அறிவியல் மற்றும் சுகாதார நன்மைகள்', description: 'பெர்க்லி எர்த் மற்றும் லான்செட் ஆய்வுகளின் அடிப்படையில்.', calculatorTitle: 'புகை தவிர்ப்பு கால்குலேட்டர்', calculatorSubtitle: 'இன்று நீங்கள் எத்தனை சிகரெட் புகையிலிருந்து தப்பித்துள்ளீர்கள் என்று பாருங்கள்.', totalAvoided: 'தவிர்க்கப்பட்ட PM2.5', cigarettesPrevented: 'தவிர்க்கப்பட்ட சிகரெட்டுகள்', readJournalBtn: 'ஆய்வை படிக்கவும்' },
    disclaimer: { title: 'அறிவியல் மறுப்பு', text: 'செயற்கைக்கோள் மூலம் தரவுகள் பெறப்படுகின்றன. இவை பொது நல ஆலோசனைகளே.' }
  },

  kn: {
    appTitle: 'ಏರೋಶೀಲ್ಡ್ AI',
    subBrand: 'ವಾಯುಮಿತ್ರ OS',
    tagline: 'ಚಳಿಗಾಲದ ಹೊಗೆಯ ಆತಂಕವನ್ನು ದೈನಂದಿನ ಶುದ್ಧ ಗಾಳಿಯ ತಂತ್ರವಾಗಿ ಬದಲಾಯಿಸಿ',
    tabs: { home: 'ಮುಖಪುಟ', routine: 'ದಿನಚರ್ಯೆ', jugaad: 'ದೇಸಿ ಜುಗಾಡ್', research: 'ಸಂಶೋಧನೆ' },
    status: { autoDetected: 'ಸ್ವಯಂ ಪತ್ತೆಹಚ್ಚಲಾದ ಸ್ಥಳ & ಸಮಯ', liveFeed: 'ಲೈವ್ ಉಪಗ್ರಹ ಫೀಡ್', offlineVerified: 'ಆಫ್‌ಲೈನ್ ಸಿದ್ಧ', solarActive: '☀️ ಸೂರ್ಯನ ಬೆಳಕಿನ ವಾತಾಯನ ಸಮಯ' },
    actions: { askAi: 'AI ಕೇಳಿ', generatePlan: 'AI ಯೋಜನೆ ರಚಿಸಿ', analyzing: 'ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...', autoDetect: 'ಪತ್ತೆಹಚ್ಚಿ', switchCity: 'ನಗರ ಬದಲಾಯಿಸಿ...', viewMore: 'ಸಂಪೂರ್ಣ ಗೈಡ್ ನೋಡಿ', watchVideo: 'ವಿಡಿಯೋ ನೋಡಿ', devTools: 'ಟೂಲ್ಸ್', settings: 'ಸೆಟ್ಟಿಂಗ್ಸ್', saveAndClose: 'ಉಳಿಸಿ & ಮುಚ್ಚಿ', launchDevTools: 'ಪ್ರಾರಂಭಿಸಿ', closePreview: 'ಮುಚ್ಚಿ', copyPrompt: 'ಕಾಪಿ ಮಾಡಿ', copied: 'ಕಾಪಿ ಆಗಿದೆ!' },
    dial: { title: 'ವಾತಾವರಣದ ಸೂಚ್ಯಂಕ', cigarettesToday: 'ಇಂದು ಉಸಿರಾಡುವುದು ಸಮಾನ', cigarettesUnit: 'ಸಿಗರೇಟುಗಳಿಗೆ ಸಮಾನ', categories: { Good: 'ಉತ್ತಮ', Moderate: 'ಮಧ್ಯಮ', Unhealthy: 'ಅನಾರೋಗ್ಯಕರ', VeryUnhealthy: 'ತುಂಬಾ ಕೆಟ್ಟದ್ದು', Hazardous: 'ಅಪಾಯಕಾರಿ' } },
    hero: { rightNow: 'ಪ್ರಸ್ತುತ ಸಮಯ', prescribedAction: 'ತಕ್ಷಣದ ಕ್ರಮ:', emergencyTitle: 'ಹೊಗೆಯ ಅಪಾಯದ ಎಚ್ಚರಿಕೆ', emergencyBody: 'ವಿಷಕಾರಿ ಗಾಳಿ ಕೆಳಮಟ್ಟದಲ್ಲೇ ಉಳಿದಿದೆ. ಕಿಟಕಿಗಳನ್ನು ಮುಚ್ಚಿಡಿ.' },
    familyProfiles: { title: 'ಕುಟುಂಬದ ಪ್ರೊಫೈಲ್', subtitle: 'ಆರೋಗ್ಯಕ್ಕಾಗಿ ಆಯ್ಕೆಮಾಡಿ', toddler: 'ಚಿಕ್ಕ ಮಕ್ಕಳು (0-5 ವರ್ಷ)', elderly: 'ಹಿರಿಯರು (60+ ವರ್ಷ)', asthma: 'ಅಸ್ತಮಾ / ಉಸಿರಾಟದ ತೊಂದರೆ', commuter: 'ಬೈಕ್ ಸವಾರರು', pet: 'ಸಾಕುಪ್ರಾಣಿಗಳು', pregnant: 'ಗರ್ಭಿಣಿಯರು', athlete: 'ಕ್ರೀಡಾಪಟುಗಳು', student: 'ವಿದ್ಯಾರ್ಥಿಗಳು', renter: 'ಬಾಡಿಗೆ ಮನೆಯವರು' },
    sensors: { title: 'ವಾತಾವರಣದ ಸಂವೇದಕಗಳು', pm25: 'PM2.5 (ಸೂಕ್ಷ್ಮ ಕಣ)', pm10: 'PM10 (ಧೂಳು)', no2: 'ನೈಟ್ರೋಜನ್ ಡೈಆಕ್ಸೈಡ್', o3: 'ಓಜೋನ್ (O3)', safePrefix: 'ಸುರಕ್ಷಿತ ಮಿತಿ:' },
    routine: { title: '24 ಗಂಟೆಗಳ ಶುದ್ಧ ಗಾಳಿಯ ದಿನಚರ್ಯೆ', subtitle: 'ಸೂರ್ಯನ ಬೆಳಕು ಮತ್ತು ತಾಪಮಾನದ ಆಧಾರದ ಮೇಲೆ.', activeNow: 'ಈಗ ಚಾಲ್ತಿಯಲ್ಲಿದೆ', step1Title: 'ಬೆಳಗಿನ ಹೊಗೆಯ ತೀವ್ರತೆ (ಕಿಟಕಿ ಮುಚ್ಚಿಡಿ)', step1Desc: 'ಚಳಿಗೆ ಕಲುಷಿತ ಗಾಳಿ ಕೆಳಗೆ ಇರುತ್ತದೆ.', step1Action: 'ಫಿಲ್ಟರ್ ಚಾಲನೆ ಮಾಡಿ. ವಾಕಿಂಗ್ ತಪ್ಪಿಸಿ.', step2Title: '☀️ ಮಧ್ಯಾಹ್ನ 1 ರಿಂದ 3 ರವರೆಗೆ (ಕಿಟಕಿ ತೆರೆಯುವ ಸಮಯ)', step2Desc: 'ಬಿಸಿಲಿಗೆ ಗಾಳಿ ಶುದ್ಧವಾಗಿ ಮೇಲೆ ಹೋಗುತ್ತದೆ.', step2Action: '15 ನಿಮಿಷ ಕಿಟಕಿ ತೆರೆಯಿರಿ.', step3Title: 'ಸಂಜೆಯ ಟ್ರಾಫಿಕ್ ಮಾಲಿನ್ಯ', step3Desc: 'ಸಂಜೆ ಮತ್ತೆ ಗಾಳಿ ವಿಷಕಾರಿಯಾಗುತ್ತದೆ.', step3Action: 'N95 ಮಾಸ್ಕ್ ಧರಿಸಿ.', step4Title: 'ರಾತ್ರಿಯ ಕೋಣೆಯ ನಿಯಮ', step4Desc: 'ನಿದ್ದೆಯ ಸಮಯದಲ್ಲಿ ಶುದ್ಧ ಗಾಳಿ ಮುಖ್ಯ.', step4Action: 'ಒದ್ದೆಯಾದ ಕಾಟನ್ ಕರ್ಟನ್ ಬಳಸಿ.' },
    jugaad: { headerBadge: 'ದೇಸಿ ಜುಗಾಡ್ ಲ್ಯಾಬ್', zeroCost: 'ಕಡಿಮೆ ವೆಚ್ಚದಲ್ಲಿ ಶುದ್ಧ ಗಾಳಿ', title: 'ಮನೆಯಲ್ಲೇ ತಯಾರಿಸುವ ಏರ್ ಫಿಲ್ಟರ್', description: 'ರೂ. 25,000 ದುಬಾರಿ ಫಿಲ್ಟರ್ ಬೇಕಾಗಿಲ್ಲ. ಸುಲಭವಾಗಿ ಮನೆಯಲ್ಲೇ ತಯಾರಿಸಿ.', boxFanTitle: 'ರೂ. 1,200 ಬಾಕ್ಸ್-ಫ್ಯಾನ್ ಪ್ಯೂರಿಫೈಯರ್', boxFanSubtitle: '20 ಇಂಚಿನ ಫ್ಯಾನ್ + MERV 13 ಫಿಲ್ಟರ್.', costEfficientBadge: '22 ಪಟ್ಟು ಉಳಿತಾಯ', targetRoomSize: 'ಕೋಣೆಯ ವಿಸ್ತೀರ್ಣ', fanSpeed: 'ಫ್ಯಾನ್ ವೇಗ', deliveredCadr: 'ಗಾಳಿಯ ಶುದ್ಧತೆ ವೇಗ', ach: 'ಗಂಟೆಯ ಶುದ್ಧತೆ', cleanTime: 'ಶುದ್ಧತೆಯ ಸಮಯ', costPerCfm: 'ವೆಚ್ಚ', commercialCompare: 'ದುಬಾರಿ ಬ್ರ್ಯಾಂಡ್‌ಗಳಿಗಿಂತ ಉತ್ತಮ', tailoredSectionTitle: 'ನಿಮ್ಮ ಕುಟುಂಬಕ್ಕೆ ತಕ್ಕ ಪರಿಹಾರಗಳು', viewGuideBtn: 'ಸಂಪೂರ್ಣ ಗೈಡ್ ನೋಡಿ' },
    research: { badge: 'ವೈಜ್ಞಾನಿಕ ಸಂಶೋಧನಾ ಕೇಂದ್ರ', academicCitations: 'ಪ್ರಮುಖ ಸಂಶೋಧನೆಗಳು', title: 'ವಿಜ್ಞಾನ ಮತ್ತು ಆರೋಗ್ಯದ ಲೆಕ್ಕಾಚಾರ', description: 'ಬರ್ಕ್ಲಿ ಅರ್ಥ್ ಮತ್ತು ಲ್ಯಾನ್ಸೆಟ್ ಆಧಾರಿತ.', calculatorTitle: 'ಹೊಗೆ ತಡೆಗಟ್ಟುವಿಕೆ ಲೆಕ್ಕಾಚಾರ', calculatorSubtitle: 'ಇಂದು ನೀವು ಎಷ್ಟು ಸಿಗರೇಟುಗಳ ಹೊಗೆಯಿಂದ ಬಚಾವಾಗಿದ್ದೀರಿ ಎಂದು ನೋಡಿ.', totalAvoided: 'ತಡೆಗಟ್ಟಲಾದ PM2.5', cigarettesPrevented: 'ತಡೆಗಟ್ಟಲಾದ ಸಿಗರೇಟುಗಳು', readJournalBtn: 'ಸಂಶೋಧನಾ ವರದಿ ಓದಿ' },
    disclaimer: { title: 'ವೈಜ್ಞಾನಿಕ ಹಕ್ಕುತ್ಯಾಗ', text: 'ಉಪಗ್ರಹದ ವರದಿಗಳ ಆಧಾರದ ಮೇಲೆ ನೀಡಲಾಗಿದೆ. ಇದು ಸಾರ್ವಜನಿಕ ಆರೋಗ್ಯದ ಸಲಹೆಯಾಗಿದೆ.' }
  },

  mr: {
    appTitle: 'एरोशील्ड AI',
    subBrand: 'वायुमित्र OS',
    tagline: 'हिवाळ्यातील धुरक्याच्या भीतीचे रूपांतर दैनंदिन शुद्ध हवा संरक्षण धोरणात करा',
    tabs: { home: 'होम', routine: 'दिनचर्या', jugaad: 'देशी जुगाड', research: 'संशोधन' },
    status: { autoDetected: 'ऑटो-डिटेक्टेड स्थान आणि वेळ', liveFeed: 'थेट उपग्रह फीड', offlineVerified: 'ऑफलाइन डेटा तयार', solarActive: '☀️ सूर्यप्रकाश व्हेंटिलेशन वेळ सक्रिय' },
    actions: { askAi: 'AI ला विचारा', generatePlan: 'AI प्लॅन तयार करा', analyzing: 'विश्लेषण सुरू आहे...', autoDetect: 'स्थान शोधा', switchCity: 'शहर बदला...', viewMore: 'सविस्तर मार्गदर्शक व विज्ञान पाहा', watchVideo: 'डेमो व्हिडिओ पाहा', devTools: 'टूल्स', settings: 'सेटिंग्ज', saveAndClose: 'जतन करा आणि बंद करा', launchDevTools: 'टूल्स सुरू करा', closePreview: 'बंद करा', copyPrompt: 'प्रॉम्प्ट कॉपी करा', copied: 'कॉपी झाले!' },
    dial: { title: 'वातावरणीय निर्देशांक', cigarettesToday: 'आज श्वास घेणे बरोबर आहे', cigarettesUnit: 'सिगारेट पिण्याइतके', categories: { Good: 'चांगले', Moderate: 'मध्यम', Unhealthy: 'अस्वास्थ्यकर', VeryUnhealthy: 'खूप अस्वास्थ्यकर', Hazardous: 'अतिशय धोकादायक' } },
    hero: { rightNow: 'सध्याची वेळ', prescribedAction: 'तातडीने करावयाची कृती:', emergencyTitle: 'धुरक्याचा गंभीर इशारा', emergencyBody: 'हवेतील विषारी कण जमिनीवर साचले आहेत. खिडक्या बंद ठेवा आणि केवळ दुपारच्या उन्हात १५ मिनिटे घर मोकळे करा.' },
    familyProfiles: { title: 'कौटुंबिक आरोग्य प्रोफाइल', subtitle: 'योग्य खबरदारी निवडा (एकाधिक निवडा)', toddler: 'लहान मुले (०-५ वर्षे)', elderly: 'वृद्ध व्यक्ती (६०+ वर्षे)', asthma: 'दमा / श्वसनाचा त्रास', commuter: 'दुपचाकी व पादचारी', pet: 'पाळीव प्राणी', pregnant: 'गर्भवती महिला', athlete: 'धावपटू / खेळाडू', student: 'विद्यार्थी', renter: 'भाडेकरू' },
    sensors: { title: 'वातावरणीय सेन्सर्स', pm25: 'PM2.5 (सूक्ष्म कण)', pm10: 'PM10 (धूळ कण)', no2: 'नायट्रोजन डायऑक्साइड', o3: 'ओझोन (O3)', safePrefix: 'सुरक्षित मर्यादा:' },
    routine: { title: '२४ तासांची सुरक्षित दिनचर्या', subtitle: 'सूर्यप्रकाश व तापमानाच्या चक्रावर आधारित.', activeNow: 'सध्या सक्रिय', step1Title: 'सकाळचा प्रदूषण पीक (खिडक्या बंद ठेवा)', step1Desc: 'थंडीमुळे विषारी हवा जमिनीजवळ अडकून राहते.', step1Action: 'फिल्टर सुरू ठेवा. मॉर्निंग वॉक टाळा.', step2Title: '☀️ दुपारी १ ते ३ उन्हाची वेळ (खिडकी उघडण्याची वेळ)', step2Desc: 'उन्हामुळे हवा वर जाते आणि प्रदूषण कमी होते.', step2Action: '१५ मिनिटे समोरासमोरील खिडक्या उघडा.', step3Title: 'संध्याकाळचा ट्रॅफिक धूर', step3Desc: 'संध्याकाळी पुन्हा प्रदूषण वाढते.', step3Action: 'N95 मास्क वापरा.', step4Title: 'रात्रीच्या स्वच्छ खोलीचा नियम', step4Desc: 'झोपताना शुद्ध हवा मिळणे गरजेचे आहे.', step4Action: 'ओले पडदे वापरा.' },
    jugaad: { headerBadge: 'देशी जुगाड लॅब', zeroCost: 'कमी खर्चात शुद्ध हवा', title: 'घरी तयार होणारे एअर फिल्टर जुगाड', description: '२५,००० रुपयांचे महागडे प्युरिफायर घेण्याची गरज नाही. हे उपाय वैज्ञानिक दृष्ट्या सिद्ध आहेत.', boxFanTitle: '₹१,२०० चा बॉक्स-फॅन प्युरिफायर', boxFanSubtitle: '२० इंच पंखा + MERV 13 फिल्टर.', costEfficientBadge: '२२ पट जास्त किफायतशीर', targetRoomSize: 'खोलीचा आकार', fanSpeed: 'पंख्याचा वेग', deliveredCadr: 'हवा स्वच्छतेचा वेग', ach: 'तासाला हवा शुद्धीकरण', cleanTime: '९०% शुद्धतेची वेळ', costPerCfm: 'खर्च', commercialCompare: 'महागड्या ब्रँडपेक्षा कितीतरी पट स्वस्त', tailoredSectionTitle: 'तुमच्या कुटुंबासाठी विशेष उपाय', viewGuideBtn: 'सविस्तर माहिती व विज्ञान पाहा' },
    research: { badge: 'वैज्ञानिक संशोधन केंद्र', academicCitations: 'आंतरराष्ट्रीय शोधनिबंध', title: 'विज्ञान आणि आरोग्याचा ताळेबंद', description: 'बर्कले अर्थ आणि लॅन्सेटच्या संशोधनावर आधारित.', calculatorTitle: 'सिगारेट नुकसान नियंत्रण कॅल्क्युलेटर', calculatorSubtitle: 'आज तुम्ही किती सिगारेटच्या धुरापासून वाचलात ते पाहा.', totalAvoided: 'रोखलेले PM2.5 प्रमाण', cigarettesPrevented: 'रोखलेल्या सिगारेटची संख्या', readJournalBtn: 'पूर्ण शोधनिबंध वाचा' },
    disclaimer: { title: 'वैज्ञानिक अस्वीकरण', text: 'माहिती उपग्रहाद्वारे मोजली जाते. हे सल्ले सार्वजनिक आरोग्यासाठी आहेत.' }
  }
};
