import React from "react";
import { useGame } from "../../hooks/useGame";
import { useLanguage } from "../../i18n/LanguageContext";

export const ResetButton: React.FC = () => {
  const { dispatch } = useGame();
  const { t } = useLanguage();

  const handleReset = () => {
    if (window.confirm(t("resetConfirm"))) {
      dispatch({ type: "RESET_ALL" });
    }
  };

  return (
    <button className="btn-secondary" onClick={handleReset}>
      {t("resetAll")}
    </button>
  );
};
