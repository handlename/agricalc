import React from "react";
import { useGame } from "../../hooks/useGame";
import { useLanguage } from "../../i18n/LanguageContext";
import { TOTAL_SCORE_ID } from "./ids";

export const TotalScore: React.FC = () => {
  const { score } = useGame();
  const { t } = useLanguage();

  return (
    <div className="score-display" id={TOTAL_SCORE_ID}>
      <div className="score-label">{t("totalScore")}</div>
      <div className="score-value">{score.total}</div>
    </div>
  );
};
