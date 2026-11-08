import React from "react";
import { useGame } from "../../hooks/useGame";
import { useLanguage } from "../../i18n/LanguageContext";
import { useElementOffscreen } from "../../hooks/useElementOffscreen";
import { formatScore } from "../../utils/formatters";
import { TOTAL_SCORE_ID } from "./ids";

export const FixedTotalScore: React.FC = () => {
  const { score } = useGame();
  const { t } = useLanguage();
  // 本体の合計スコアが画面外に出たときだけ表示する
  const isVisible = useElementOffscreen(TOTAL_SCORE_ID);

  return (
    <div
      className={`fixed-total-score ${isVisible ? "is-visible" : ""}`.trim()}
      aria-hidden={!isVisible}
    >
      <span className="fixed-score-label">{t("total")}</span>
      <span className="fixed-score-value">{formatScore(score.total)}</span>
    </div>
  );
};
