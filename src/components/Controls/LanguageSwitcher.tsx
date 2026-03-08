import React from "react";
import { useLanguage } from "../../i18n/LanguageContext";

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-switcher">
      <button
        className={`lang-btn ${language === "en" ? "active" : ""}`}
        onClick={() => setLanguage("en")}
      >
        EN
      </button>
      <button
        className={`lang-btn ${language === "ja" ? "active" : ""}`}
        onClick={() => setLanguage("ja")}
      >
        JA
      </button>
    </div>
  );
};
