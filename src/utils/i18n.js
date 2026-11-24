/**
 * AeroShield AI Multilingual Dictionary (Indian Languages + English)
 * Covers English, Hindi (हिन्दी), Bengali (বাংলা), Tamil (தமிழ்), Telugu (తెలుగు), Kannada (ಕನ್ನಡ), Marathi (मराठी)
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
      autoDetect: 'Auto-Detect',
      switchCity: 'Switch City...',
      viewMore: 'View Detailed Guide & Science',
      watchVideo: 'Watch Demo Video',
      devTools: 'Judges DevTools',
      settings: 'Settings'
    },
    metrics: {
      aqiIndex: 'Atmospheric Inversion Index',
      cigarettesToday: 'Equivalent to smoking',
      cigarettesUnit: 'cigarettes today',
      sensorsTitle: 'Open-Meteo High-Resolution Atmospheric Sensors'
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
      autoDetected: 'ऑटो-डिटेक्टेड डिवाइस स्थान और समय',
      liveFeed: 'लाइव CAMS सैटेलाइट फीड',
      offlineVerified: 'सत्यापित ऑफलाइन डेटा',
      solarActive: '☀️ धूप का वेंटिलेशन समय सक्रिय'
    },
    actions: {
      askAi: 'AI से पूछें',
      generatePlan: 'AI प्लान बनाएं',
      autoDetect: 'स्थान खोजें',
      switchCity: 'शहर बदलें...',
      viewMore: 'विस्तृत गाइड और विज्ञान देखें',
      watchVideo: 'डेमो वीडियो देखें',
      devTools: 'जजेस देव-टूल्स',
      settings: 'सेटिंग्स'
    },
    metrics: {
      aqiIndex: 'वायुमंडलीय इनवर्जन सूचकांक',
      cigarettesToday: 'आज सांस लेना बराबर है',
      cigarettesUnit: 'सिगरेट पीने के',
      sensorsTitle: 'ओपन-मेटियो उच्च-रिज़ॉल्यूशन वायुमंडलीय सेंसर'
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
    tabs: {
      home: 'হোম',
      routine: 'রুটিন',
      jugaad: 'দেশি জুগাড়',
      research: 'গবেষণা'
    },
    status: {
      autoDetected: 'স্বয়ংক্রিয় সনাক্ত অবস্থান ও সময়',
      liveFeed: 'লাইভ স্যাটেলাইট ফিড',
      offlineVerified: 'অফলাইন ডেটা প্রস্তুত',
      solarActive: '☀️ সূর্যালোক বায়ু চলাচল সময় সক্রিয়'
    },
    actions: {
      askAi: 'AI জিজ্ঞাসা করুন',
      generatePlan: 'AI পরিকল্পনা তৈরি করুন',
      autoDetect: 'অবস্থান খুঁজুন',
      switchCity: 'শহর পরিবর্তন...',
      viewMore: 'বিস্তারিত গাইড ও বিজ্ঞান দেখুন',
      watchVideo: 'ডেমো ভিডিও দেখুন',
      devTools: 'বিচারক টুলস',
      settings: 'সেটিংস'
    },
    metrics: {
      aqiIndex: 'বায়ুমণ্ডলীয় সূচক',
      cigarettesToday: 'আজ শ্বাস নেওয়া সমান',
      cigarettesUnit: 'টি সিগারেট খাওয়ার সমান',
      sensorsTitle: 'উচ্চমানের বায়ুমণ্ডলীয় সেন্সর'
    },
    disclaimer: {
      title: 'বৈজ্ঞানিক অস্বীকৃতি',
      text: 'বায়ুর তথ্য স্যাটেলাইট দ্বারা পরিমাপ করা হয়। এই পরামর্শগুলি স্বাস্থ্য সুরক্ষার জন্য প্রস্তুত।'
    }
  },
  te: {
    appTitle: 'ఏరోషీల్డ్ AI',
    subBrand: 'వాయుమిత్ర OS',
    tagline: 'శీతాకాల పొగమంచు ఆందోళనను రోజువారీ స్వచ్ఛమైన గాలి వ్యూహంగా మార్చండి',
    tabs: {
      home: 'హోమ్',
      routine: 'దినచర్య',
      jugaad: 'దేశీ జుగాడ్',
      research: 'పరిశోధన'
    },
    status: {
      autoDetected: 'ఆటో-డిటెక్ట్ చేయబడిన స్థానం & సమయం',
      liveFeed: 'లైవ్ ఉపగ్రహ ఫీడ్',
      offlineVerified: 'ఆఫ్‌లైన్ డేటా సిద్ధం',
      solarActive: '☀️ సూర్యకాంతి వెంటిలేషన్ సమయం సక్రియంగా ఉంది'
    },
    actions: {
      askAi: 'AI ని అడగండి',
      generatePlan: 'AI ప్లాన్ రూపొందించండి',
      autoDetect: 'స్థానాన్ని గుర్తించండి',
      switchCity: 'నగరాన్ని మార్చండి...',
      viewMore: 'వివరమైన గైడ్ మరియు సైన్స్ చూడండి',
      watchVideo: 'డెమో వీడియో చూడండి',
      devTools: 'న్యాయనిర్ణేత టూల్స్',
      settings: 'సెట్టింగ్‌లు'
    },
    metrics: {
      aqiIndex: 'వాతావరణ సూచిక',
      cigarettesToday: 'ఈ రోజు పీల్చే గాలి సమానం',
      cigarettesUnit: 'సిగరెట్లతో సమానం',
      sensorsTitle: 'హై-రిజల్యూషన్ వాతావరణ సెన్సార్లు'
    },
    disclaimer: {
      title: 'శాస్త్రీయ నిరాకరణ',
      text: 'వాతావరణ సమాచారం ఉపగ్రహాల ఆధారంగా లెక్కింపబడుతుంది. ఈ సలహాలు ఆరోగ్యాన్ని కాపాడుకోవడానికి మాత్రమే.'
    }
  },
  ta: {
    appTitle: 'ஏரோஷீல்ட் AI',
    subBrand: 'வாயுமித்ரா OS',
    tagline: 'குளிர்கால நச்சுப் புகை அச்சத்தை அன்றாட தூய காற்று உத்தியாக மாற்றுங்கள்',
    tabs: {
      home: 'முகப்பு',
      routine: 'வழக்கம்',
      jugaad: 'தேசி ஜூகாட்',
      research: 'ஆராய்ச்சி'
    },
    status: {
      autoDetected: 'தானாக கண்டறியப்பட்ட இருப்பிடம் & நேரம்',
      liveFeed: 'நேரலை செயற்கைக்கோள் ஃபீட்',
      offlineVerified: 'சரிபார்க்கப்பட்ட ஆஃப்லைன் தரவு',
      solarActive: '☀️ சூரிய ஒளி காற்றோட்ட நேரம் இயங்குகிறது'
    },
    actions: {
      askAi: 'AI இடம் கேளுங்கள்',
      generatePlan: 'AI திட்டம் உருவாக்குங்கள்',
      autoDetect: 'இருப்பிடம் காண்க',
      switchCity: 'நகரம் மாற்று...',
      viewMore: 'விரிவான வழிகாட்டி & அறிவியல் காண்க',
      watchVideo: 'டெமோ வீடியோ காண்க',
      devTools: 'நீதிபதி கருவிகள்',
      settings: 'அமைப்புகள்'
    },
    metrics: {
      aqiIndex: 'வளிமண்டல குறியீடு',
      cigarettesToday: 'இன்று சுவாசிப்பது சமமானது',
      cigarettesUnit: 'சிகரெட் பிடிப்பதற்கு சமம்',
      sensorsTitle: 'வளிமண்டல சென்சார்கள்'
    },
    disclaimer: {
      title: 'அறிவியல் மறுப்பு',
      text: 'காற்றுத் தரம் செயற்கைக்கோள் மூலம் கணக்கிடப்படுகிறது. இவை பொது சுகாதார வழிகாட்டல்களே.'
    }
  },
  kn: {
    appTitle: 'ಏರೋಶೀಲ್ಡ್ AI',
    subBrand: 'ವಾಯುಮಿತ್ರ OS',
    tagline: 'ಚಳಿಗಾಲದ ಹೊಗೆಯ ಆತಂಕವನ್ನು ದೈನಂದಿನ ಶುದ್ಧ ಗಾಳಿಯ ತಂತ್ರವಾಗಿ ಬದಲಾಯಿಸಿ',
    tabs: {
      home: 'ಮುಖಪುಟ',
      routine: 'ದಿನಚರ್ಯೆ',
      jugaad: 'ದೇಸಿ ಜುಗಾಡ್',
      research: 'ಸಂಶೋಧನೆ'
    },
    status: {
      autoDetected: 'ಸ್ವಯಂ ಪತ್ತೆಹಚ್ಚಲಾದ ಸ್ಥಳ ಮತ್ತು ಸಮಯ',
      liveFeed: 'ಲೈವ್ ಉಪಗ್ರಹ ಫೀಡ್',
      offlineVerified: 'ಆಫ್‌ಲೈನ್ ಡೇಟಾ ಸಿದ್ಧ',
      solarActive: '☀️ ಸೂರ್ಯನ ಬೆಳಕಿನ ವಾತಾಯನ ಸಮಯ ಸಕ್ರಿಯ'
    },
    actions: {
      askAi: 'AI ಕೇಳಿ',
      generatePlan: 'AI ಯೋಜನೆ ರಚಿಸಿ',
      autoDetect: 'ಸ್ಥಳ ಪತ್ತೆಹಚ್ಚಿ',
      switchCity: 'ನಗರ ಬದಲಾಯಿಸಿ...',
      viewMore: 'ವಿವರವಾದ ಗೈಡ್ ಮತ್ತು ವಿಜ್ಞಾನ ನೋಡಿ',
      watchVideo: 'ಡೆಮೊ ವಿಡಿಯೋ ನೋಡಿ',
      devTools: 'ಜಡ್ಜಸ್ ಟೂಲ್ಸ್',
      settings: 'ಸೆಟ್ಟಿಂಗ್ಸ್'
    },
    metrics: {
      aqiIndex: 'ವಾತಾವರಣದ ಸೂಚ್ಯಂಕ',
      cigarettesToday: 'ಇಂದು ಉಸಿರಾಡುವುದು ಸಮಾನ',
      cigarettesUnit: 'ಸಿಗರೇಟುಗಳಿಗೆ ಸಮಾನ',
      sensorsTitle: 'ಹೈ-ರೆಸಲ್ಯೂಶನ್ ವಾತಾವರಣದ ಸಂವೇದಕಗಳು'
    },
    disclaimer: {
      title: 'ವೈಜ್ಞಾನಿಕ ಹಕ್ಕುತ್ಯಾಗ',
      text: 'ಮಾಹಿತಿಯು ಉಪಗ್ರಹ ವರದಿಗಳ ಮೇಲೆ ಆಧಾರಿತವಾಗಿದೆ. ಇದು ಸಾರ್ವಜನಿಕ ಆರೋಗ್ಯ ರಕ್ಷಣೆಗಾಗಿ ಮಾರ್ಗದರ್ಶಿಯಾಗಿದೆ.'
    }
  },
  mr: {
    appTitle: 'एरोशील्ड AI',
    subBrand: 'वायुमित्र OS',
    tagline: 'हिवाळ्यातील धुरक्याच्या भीतीचे रूपांतर दैनंदिन शुद्ध हवा संरक्षण धोरणात करा',
    tabs: {
      home: 'होम',
      routine: 'दिनचर्या',
      jugaad: 'देशी जुगाड',
      research: 'संशोधन'
    },
    status: {
      autoDetected: 'ऑटो-डिटेक्टेड स्थान आणि वेळ',
      liveFeed: 'थेट उपग्रह फीड',
      offlineVerified: 'ऑफलाइन डेटा तयार',
      solarActive: '☀️ सूर्यप्रकाश व्हेंटिलेशन वेळ सक्रिय'
    },
    actions: {
      askAi: 'AI ला विचारा',
      generatePlan: 'AI प्लॅन तयार करा',
      autoDetect: 'स्थान शोधा',
      switchCity: 'शहर बदला...',
      viewMore: 'तपशीलवार मार्गदर्शक आणि विज्ञान पाहा',
      watchVideo: 'डेमो व्हिडिओ पाहा',
      devTools: 'जजेस देव-टूल्स',
      settings: 'सेटिंग्ज'
    },
    metrics: {
      aqiIndex: 'वातावरणीय निर्देशांक',
      cigarettesToday: 'आज श्वास घेणे बरोबर आहे',
      cigarettesUnit: 'सिगारेट पिण्याइतके',
      sensorsTitle: 'अचूक वातावरणीय सेन्सर्स'
    },
    disclaimer: {
      title: 'वैज्ञानिक अस्वीकरण',
      text: 'हवेची गुणवत्ता उपग्रहाद्वारे मोजली जाते. हे सल्ले सार्वजनिक आरोग्यासाठी आहेत.'
    }
  }
};
