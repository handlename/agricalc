import React from "react";

interface GridVisualizationProps {
  current: number;
  thresholds: number[];

  className?: string;
}

export const GridVisualization: React.FC<GridVisualizationProps> = ({
  current,
  thresholds,
  className = "",
}) => {
  // 安全な閾値配列の確保
  const safeThresholds = Array.isArray(thresholds) ? thresholds : [];

  // 表示する最大のマス目数を決定（最大得点の閾値まで）
  const maxThreshold =
    safeThresholds.length > 0 ? safeThresholds[safeThresholds.length - 1] : 5;
  const displayMax = Math.max(maxThreshold, 1); // 最低1個は表示

  // マス目を生成
  const grids = Array.from({ length: displayMax }, (_, index) => {
    const value = index + 1;

    // 現在の値までは塗りつぶし
    const isFilled = value <= current;

    // 閾値ラインかどうか
    const isThreshold = safeThresholds.includes(value);

    // 最後の閾値を超えた場合は最大得点達成
    const isMaxAchieved =
      safeThresholds.length > 0 &&
      current >= safeThresholds[safeThresholds.length - 1];

    return {
      value,
      isFilled,
      isThreshold,
      isMaxAchieved,
    };
  });

  // マス目が生成されない場合のフォールバック
  if (grids.length === 0) {
    return null;
  }

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
