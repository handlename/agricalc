import React, { useState } from "react";
import { useGame } from "../../hooks/useGame";
import { useLanguage } from "../../i18n/LanguageContext";
import { formatScoreToText } from "../../utils/formatters";
import { translations } from "../../i18n/translations";

export const CopyButton: React.FC = () => {
  const { state, score } = useGame();
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = formatScoreToText(state, score, language, translations);

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button className="btn-primary" onClick={handleCopy}>
      {copied ? t("copied") : t("copyScore")}
    </button>
  );
};
