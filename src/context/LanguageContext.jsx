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

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const t = (key) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
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
