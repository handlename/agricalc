import React from "react";
import { useLanguage } from "../../i18n/LanguageContext";

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="language-switcher" role="group" aria-label={t("languageLabel")}>
      <button
        className={`lang-btn ${language === "en" ? "active" : ""}`}
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        lang="en"
        type="button"
      >
        EN
      </button>
      <button
        className={`lang-btn ${language === "ja" ? "active" : ""}`}
        onClick={() => setLanguage("ja")}
        aria-pressed={language === "ja"}
        lang="ja"
        type="button"
      >
        JA
      </button>
    </div>
  );
};
