import React from "react";
import { useLanguage } from "../../i18n/LanguageContext";

interface GridVisualizationProps {
  current: number;
  thresholds: number[];
  className?: string;
}

/**
 * 得点段階ごとにマスをグループ化して表示する。
 * 各グループの最後のマスが閾値（そこに到達すると得点が上がる）。
 */
export const GridVisualization: React.FC<GridVisualizationProps> = ({
  current,
  thresholds,
  className = "",
}) => {
  const { t } = useLanguage();

  if (thresholds.length === 0) {
    return null;
  }

  const maxThreshold = thresholds[thresholds.length - 1];
  const isMaxAchieved = current >= maxThreshold;
  const nextThreshold = thresholds.find((value) => value > current);

  // 閾値ごとにマスをグループ化: 例 [1,4,6,8] → [1] [2,3,4] [5,6] [7,8]
  const groups: number[][] = [];
  let start = 1;
  for (const threshold of thresholds) {
    const group: number[] = [];
    for (let value = start; value <= threshold; value++) {
      group.push(value);
    }
    groups.push(group);
    start = threshold + 1;
  }

  const status = isMaxAchieved
    ? t("maxReached")
    : t("toNext").replace("{n}", String((nextThreshold ?? 0) - current));

  return (
    <div className={`grid-visualization ${className}`.trim()}>
      <div className="grid-container" aria-hidden="true">
        {groups.map((group, groupIndex) => (
          <div key={groupIndex} className="grid-group">
            {group.map((value) => (
              <div
                key={value}
                className={[
                  "grid-cell",
                  value <= current ? "filled" : "",
                  value <= current && isMaxAchieved ? "max-achieved" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            ))}
          </div>
        ))}
      </div>
      <span
        className={`grid-status ${isMaxAchieved ? "is-max" : ""}`.trim()}
      >
        {status}
      </span>
    </div>
  );
};
