import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en"); // Default language: English

  const switchLanguage = (lang) => setLanguage(lang);

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);


// import { useEffect, useState } from "react";
// import { useLanguage } from "../context/LanguageContext";
// import { translateText } from "../utils/translateService";

// function DynamicPage({ content }) {
//   const { language } = useLanguage();
//   const [translatedContent, setTranslatedContent] = useState("");

//   useEffect(() => {
//     const fetchTranslation = async () => {
//       const translated = await translateText(content, "en", language);
//       setTranslatedContent(translated);
//     };
//     fetchTranslation();
//   }, [content, language]);

//   return <div>{translatedContent}</div>;
// }

// export default DynamicPage;
