import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    brandName: 'CivicEye AI',
    tagline: 'Smarter Cities Start With a Single Report',
    heroTitle: 'Empowering Smarter, Safer Cities',
    heroSubtitle: 'CivicEye AI is the unified command center for municipal operations. Harness real-time reporting, predictive analytics, and automated dispatch to enhance community well-being.',
    reportIssue: 'Report an Issue',
    viewMap: 'View Operations Map',
    launchDashboard: 'Launch Dashboard',
    platform: 'Platform',
    citizens: 'Citizens',
    authorities: 'Authorities',
    sustainability: 'Sustainability',
    quickActions: 'Quick Actions',
    trackReport: 'Track My Report',
    viewLiveMap: 'View Live Map',
    emergencyDispatch: 'Emergency Dispatch',
    liveImpactPulse: 'Live Impact Pulse',
    activeReports: 'Active Reports',
    resolvedThisWeek: 'Resolved This Week',
    avgResolution: 'Avg. Resolution',
    satisfaction: 'Satisfaction',
    intelligentInfrastructure: 'Intelligent Infrastructure',
    intelligentSubtitle: 'How CivicEye AI transforms municipal operations.',
    aiDetection: 'AI Detection',
    aiDetectionDesc: 'Automatically categorizes and prioritizes incoming civic reports using advanced computer vision and natural language processing.',
    rapidRouting: 'Rapid Routing',
    rapidRoutingDesc: 'Smart dispatch algorithms instantly assign tasks to the nearest available and qualified municipal team.',
    citizenTransparency: 'Citizen Transparency',
    citizenTransparencyDesc: 'Provides real-time tracking and updates to citizens, building trust through clear communication.',
    goodMorning: 'Good morning',
    totalReports: 'Total Reports',
    active: 'Active',
    inProgress: 'In Progress',
    resolved: 'Resolved',
    pending: 'Pending',
    recentReports: 'Recent Reports',
    nearbyIssues: 'Nearby Issues',
    viewAll: 'View All',
    highPriority: 'High Priority',
    criticalPriority: 'Critical Priority',
    mediumPriority: 'Medium Priority',
    lowPriority: 'Low Priority',
    pothole: 'Pothole',
    garbage: 'Garbage Overflow',
    waterLeak: 'Water Leakage',
    streetlight: 'Broken Streetlight',
    drainage: 'Drainage Issue',
    analyzeWithAI: 'Analyze with AI',
    uploadPhoto: 'Upload or Capture Photo',
    detectedLocation: 'Detected Location',
    useCurrentLocation: 'Use Current Location',
    adjustLocation: 'Adjust Location',
    possibleDuplicate: 'Possible duplicate detected',
    joinExisting: 'Join Existing Report',
    submitNew: 'Submit New Report',
    ratingQuestion: 'Was this issue resolved?',
    yes: 'Yes',
    no: 'No',
    rateResolution: 'Rate resolution',
    submitFeedback: 'Submit Feedback'
  },
  hi: {
    brandName: 'सिविक-आई एआई',
    tagline: 'स्मार्ट शहरों की शुरुआत एक रिपोर्ट से होती है',
    heroTitle: 'स्मार्ट और सुरक्षित शहरों का सशक्तिकरण',
    heroSubtitle: 'सिविक-आई एआई नगर निगम संचालन का एकीकृत कमांड सेंटर है। जन कल्याण को बढ़ावा देने के लिए रीयल-टाइम रिपोर्टिंग, एआई एनालिटिक्स और स्वचालित प्रेषण का उपयोग करें।',
    reportIssue: 'समस्या दर्ज करें',
    viewMap: 'ऑपरेशंस मैप देखें',
    launchDashboard: 'डैशबोर्ड खोलें',
    platform: 'प्लेटफ़ॉर्म',
    citizens: 'नागरिक',
    authorities: 'अधिकारी',
    sustainability: 'सस्टेनेबिलिटी',
    quickActions: 'त्वरित कार्रवाई',
    trackReport: 'शिकायत ट्रैक करें',
    viewLiveMap: 'लाइव मैप देखें',
    emergencyDispatch: 'आपातकालीन प्रेषण',
    liveImpactPulse: 'लाइव प्रभाव मेट्रिक्स',
    activeReports: 'सक्रिय शिकायतें',
    resolvedThisWeek: 'इस सप्ताह हल किया गया',
    avgResolution: 'औसत समाधान समय',
    satisfaction: 'नागरिक संतुष्टि',
    intelligentInfrastructure: 'इंटेलिजेंट इंफ्रास्ट्रक्चर',
    intelligentSubtitle: 'सिविक-आई एआई नगर निगम प्रशासन को कैसे आधुनिक बनाता है।',
    aiDetection: 'एआई डिटेक्शन',
    aiDetectionDesc: 'उन्नत कंप्यूटर विज़न का उपयोग करके आने वाली नागरिक शिकायतों को स्वचालित रूप से वर्गीकृत और प्राथमिकता देता है।',
    rapidRouting: 'त्वरित रूटिंग',
    rapidRoutingDesc: 'स्मार्ट डिस्पैच एल्गोरिदम कार्य को निकटतम योग्य नगर निगम टीम को तुरंत सौंपते हैं।',
    citizenTransparency: 'नागरिक पारदर्शिता',
    citizenTransparencyDesc: 'नागरिकों को रीयल-टाइम ट्रैकिंग और अपडेट प्रदान करता है, जिससे विश्वास बढ़ता है।',
    goodMorning: 'शुभ प्रभात',
    totalReports: 'कुल रिपोर्ट्स',
    active: 'सक्रिय',
    inProgress: 'प्रगति पर',
    resolved: 'हल किया गया',
    pending: 'लंबित',
    recentReports: 'हालिया रिपोर्ट्स',
    nearbyIssues: 'निकटवर्ती समस्याएं',
    viewAll: 'सभी देखें',
    highPriority: 'उच्च प्राथमिकता',
    criticalPriority: 'गंभीर प्राथमिकता',
    mediumPriority: 'मध्यम प्राथमिकता',
    lowPriority: 'निम्न प्राथमिकता',
    pothole: 'गड्ढा (Pothole)',
    garbage: 'कचरा फैलाव',
    waterLeak: 'पानी का रिसाव',
    streetlight: 'खराब स्ट्रीटलाइट',
    drainage: 'जल निकासी समस्या',
    analyzeWithAI: 'एआई से विश्लेषण करें',
    uploadPhoto: 'फोटो अपलोड करें / खींचें',
    detectedLocation: 'पहचाना गया स्थान',
    useCurrentLocation: 'वर्तमान स्थान का उपयोग करें',
    adjustLocation: 'स्थान समायोजित करें',
    possibleDuplicate: 'संभावित डुप्लिकेट शिकायत मिली',
    joinExisting: 'मौजूदा रिपोर्ट में शामिल हों',
    submitNew: 'नई रिपोर्ट दर्ज करें',
    ratingQuestion: 'क्या यह समस्या हल हो गई?',
    yes: 'हाँ',
    no: 'नहीं',
    rateResolution: 'समाधान को रेटिंग दें',
    submitFeedback: 'प्रतिक्रिया भेजें'
  }
};


const landingTranslations = {
  en: {
    liveCityIntelligence: 'LIVE CITY INTELLIGENCE', heroLine1: 'See the city.', heroLine2: 'Understand', heroLine3: 'the problem.',
    heroGradientLine1: 'Move before it becomes', heroGradientLine2: 'a crisis.',
    heroDescription: 'CivicEye AI transforms citizen signals into verified, prioritized and actionable municipal intelligence — helping cities respond faster and operate smarter.',
    exploreLiveCity: 'Explore Live City', aiAssistedTriage: 'AI-assisted triage', transparentResponse: 'Transparent response', cityWideIntelligence: 'City-wide intelligence',
    liveCivicSignals: 'LIVE CIVIC SIGNALS', ncrNetworkOperational: 'NCR NODE / NETWORK OPERATIONAL', activeIncidents: 'Active incidents', aiVerified: 'AI verified', critical: 'Critical',
    sector62: 'Sector 62', potholeDetected: 'Pothole detected · P1', nh24: 'NH-24', waterlogging: 'Waterlogging · P1', sector18: 'Sector 18', streetlightFailure: 'Streetlight failure',
    networkStatus: 'NETWORK STATUS', activeSignals: 'Active signals', openLiveMap: 'Open Live Map', searchPlaceholder: 'Search reports, locations or departments...', search: 'Search',
    systemOverview: 'CIVICEYE SYSTEM OVERVIEW', intelligenceThatMoves: 'Intelligence that moves', citiesForward: 'cities forward.', liveIntelligenceNCR: 'Live intelligence from NCR-07',
    liveAcrossCity: 'Live across the city', classificationConfidence: 'Classification confidence', avgResponse: 'Avg Response', fromReportToAction: 'From report to action',
    citizensEngaged: 'Citizens Engaged', activeContributors: 'Active contributors', civicEyeLoop: 'THE CIVICEYE LOOP', fromCitizenSignal: 'From citizen signal', toCityAction: 'to city action.',
    completeLifecycle: 'CivicEye connects the complete response lifecycle.', citizenReports: 'Citizen reports', citizenReportsDesc: 'A real-world civic signal enters the CivicEye network.',
    aiUnderstands: 'AI understands', aiUnderstandsDesc: 'Evidence is classified, verified and intelligently scored.', cityResponds: 'City responds', cityRespondsDesc: 'The right department and response team are activated.',
    everyoneSees: 'Everyone sees', everyoneSeesDesc: 'Resolution becomes visible, measurable and accountable.', liveCityMap: 'LIVE CITY MAP', liveCityPreview: 'LIVE CITY PREVIEW',
    seeEverySignal: 'See every signal.', trackEveryAction: 'Track every action.', liveCityDescription: 'Citizens report problems. AI verifies and prioritizes them. Authorities receive actionable intelligence. Everyone sees the progress.',
    inProgressShort: 'In progress', builtForTransparency: 'Built for transparency', smarterCitiesStart: 'Smarter cities start', withSingleReport: 'with a single report.',
    everyReportBecomes: 'Every report becomes intelligence, action and visible progress.', privacy: 'Privacy', terms: 'Terms', apiDocs: 'API Docs', contact: 'Contact',
    precisionGovernance: 'Precision Urban Governance.'
  },
  hi: {
    liveCityIntelligence: 'लाइव सिटी इंटेलिजेंस', heroLine1: 'शहर को देखें।', heroLine2: 'समस्या को', heroLine3: 'समझें।',
    heroGradientLine1: 'संकट बनने से पहले', heroGradientLine2: 'कार्रवाई करें।',
    heroDescription: 'सिविकआई एआई नागरिक संकेतों को सत्यापित, प्राथमिकता-युक्त और कार्रवाई योग्य नगर निगम इंटेलिजेंस में बदलता है — ताकि शहर तेजी से प्रतिक्रिया दें और बेहतर तरीके से संचालित हों।',
    exploreLiveCity: 'लाइव सिटी देखें', aiAssistedTriage: 'एआई-सहायित प्राथमिकता निर्धारण', transparentResponse: 'पारदर्शी प्रतिक्रिया', cityWideIntelligence: 'पूरे शहर की इंटेलिजेंस',
    liveCivicSignals: 'लाइव नागरिक संकेत', ncrNetworkOperational: 'NCR नोड / नेटवर्क सक्रिय', activeIncidents: 'सक्रिय घटनाएँ', aiVerified: 'एआई सत्यापित', critical: 'गंभीर',
    sector62: 'सेक्टर 62', potholeDetected: 'गड्ढा मिला · P1', nh24: 'NH-24', waterlogging: 'जलभराव · P1', sector18: 'सेक्टर 18', streetlightFailure: 'स्ट्रीटलाइट खराब',
    networkStatus: 'नेटवर्क स्थिति', activeSignals: 'सक्रिय संकेत', openLiveMap: 'लाइव मैप खोलें', searchPlaceholder: 'रिपोर्ट, स्थान या विभाग खोजें...', search: 'खोजें',
    systemOverview: 'सिविकआई सिस्टम ओवरव्यू', intelligenceThatMoves: 'वह इंटेलिजेंस जो', citiesForward: 'शहरों को आगे बढ़ाए।', liveIntelligenceNCR: 'NCR-07 से लाइव इंटेलिजेंस',
    liveAcrossCity: 'पूरे शहर में लाइव', classificationConfidence: 'वर्गीकरण का भरोसा', avgResponse: 'औसत प्रतिक्रिया', fromReportToAction: 'रिपोर्ट से कार्रवाई तक',
    citizensEngaged: 'सक्रिय नागरिक', activeContributors: 'सक्रिय योगदानकर्ता', civicEyeLoop: 'सिविकआई लूप', fromCitizenSignal: 'नागरिक संकेत से', toCityAction: 'शहर की कार्रवाई तक।',
    completeLifecycle: 'सिविकआई पूरी प्रतिक्रिया प्रक्रिया को जोड़ता है।', citizenReports: 'नागरिक रिपोर्ट करते हैं', citizenReportsDesc: 'एक वास्तविक नागरिक संकेत सिविकआई नेटवर्क में प्रवेश करता है।',
    aiUnderstands: 'एआई समझता है', aiUnderstandsDesc: 'सबूत को वर्गीकृत, सत्यापित और बुद्धिमानी से स्कोर किया जाता है।', cityResponds: 'शहर प्रतिक्रिया देता है', cityRespondsDesc: 'सही विभाग और प्रतिक्रिया टीम को सक्रिय किया जाता है।',
    everyoneSees: 'हर कोई देखता है', everyoneSeesDesc: 'समाधान दिखाई देने योग्य, मापने योग्य और जवाबदेह बनता है।', liveCityMap: 'लाइव सिटी मैप', liveCityPreview: 'लाइव सिटी प्रीव्यू',
    seeEverySignal: 'हर संकेत देखें।', trackEveryAction: 'हर कार्रवाई ट्रैक करें।', liveCityDescription: 'नागरिक समस्याएँ रिपोर्ट करते हैं। एआई उन्हें सत्यापित और प्राथमिकता देता है। अधिकारियों को कार्रवाई योग्य इंटेलिजेंस मिलती है। हर कोई प्रगति देखता है।',
    inProgressShort: 'प्रगति पर', builtForTransparency: 'पारदर्शिता के लिए बनाया गया', smarterCitiesStart: 'स्मार्ट शहरों की शुरुआत', withSingleReport: 'एक रिपोर्ट से होती है।',
    everyReportBecomes: 'हर रिपोर्ट इंटेलिजेंस, कार्रवाई और दिखाई देने वाली प्रगति में बदलती है।', privacy: 'गोपनीयता', terms: 'शर्तें', apiDocs: 'API दस्तावेज़', contact: 'संपर्क',
    precisionGovernance: 'सटीक शहरी प्रशासन।'
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const t = (key) => {
    return translations[lang]?.[key] || landingTranslations[lang]?.[key] || translations.en?.[key] || landingTranslations.en?.[key] || key;
  };

  const toggleLanguage = () => {
    setLang(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
