import React from "react";

interface GridVisualizationProps {
  current: number;
  thresholds: number[];
  maxDisplay?: number;
  className?: string;
}

export const GridVisualization: React.FC<GridVisualizationProps> = ({
  current,
  thresholds,
  maxDisplay = 15,
  className = "",
}) => {
  // 表示する最大のマス目数を決定（最大得点の閾値まで）
  const maxThreshold = thresholds[thresholds.length - 1] || 10;
  const displayMax = maxThreshold;

  // マス目を生成
  const grids = Array.from({ length: displayMax }, (_, index) => {
    const value = index + 1;

    // 現在の値までは塗りつぶし
    const isFilled = value <= current;

    // 閾値ラインかどうか
    const isThreshold = thresholds.includes(value);

    // 最後の閾値を超えた場合は最大得点達成
    const isMaxAchieved = current >= thresholds[thresholds.length - 1];

    return {
      value,
      isFilled,
      isThreshold,
      isMaxAchieved,
    };
  });

  return (
    <div className={`grid-visualization ${className}`}>
      <div className="grid-container">
        {grids.map((grid, index) => (
          <div
            key={index}
            className={`
              grid-cell
              ${grid.isFilled ? "filled" : "empty"}
              ${grid.isThreshold ? "threshold" : ""}
              ${grid.isMaxAchieved && grid.isFilled ? "max-achieved" : ""}
            `.trim()}
            title={`${grid.value}${grid.isThreshold ? " (score change)" : ""}`}
          >
            {grid.isThreshold && <div className="threshold-marker" />}
          </div>
        ))}
      </div>
    </div>
  );
};
