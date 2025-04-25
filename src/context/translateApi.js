// export const translateText = async (text, sourceLang, targetLang) => {
//     try {
//       const response = await fetch("https://libretranslate.com/translate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           q: text,
//           source: sourceLang,
//           target: targetLang,
//         }),
//       });
//       const data = await response.json();
//       return data.translatedText;
//     } catch (error) {
//       console.error("Translation error:", error);
//       return text; // Fallback to original text
//     }
//   };
  

import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en"); // Default language

  // Function to switch language (e.g., 'en' to 'fr')
  const switchLanguage = (lang) => setLanguage(lang);

  // Translation logic
  const translateText = async (text) => {
    try {
      const response = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: text,
          source: "en",
          target: language,
        }),
      });
      const data = await response.json();
      return data.translatedText;
    } catch (error) {
      console.error("Translation error:", error);
      return text; // Fallback to original text
    }
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, translateText }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
