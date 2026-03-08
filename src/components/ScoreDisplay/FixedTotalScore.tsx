import React from "react";
import { useGame } from "../../hooks/useGame";
import { useLanguage } from "../../i18n/LanguageContext";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { formatScore } from "../../utils/formatters";

export const FixedTotalScore: React.FC = () => {
  const { score } = useGame();
  const { t } = useLanguage();
  const { isAtTop, isScrolling } = useScrollPosition();

  // 最上部にいる場合は非表示（元のTotalScoreが見えているため）
  if (isAtTop) {
    return null;
  }

  return (
    <div
      className={`fixed-total-score ${isScrolling ? "scrolling" : "static"}`}
    >
      <div className="fixed-score-content">
        <span className="fixed-score-label">{t("total")}</span>
        <span className="fixed-score-value">{formatScore(score.total)}</span>
      </div>
    </div>
  );
};
