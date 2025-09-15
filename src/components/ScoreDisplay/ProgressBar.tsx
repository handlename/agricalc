import React from 'react';

interface ProgressBarProps {
  current: number;
  thresholds: number[];
  currentScore: number;
  maxScore: number;
  label: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  thresholds,
  currentScore,
  maxScore,
  label,
  className = ''
}) => {
  // 現在のレベルと次のレベルまでの必要数を計算
  const getCurrentLevel = () => {
    for (let i = 0; i < thresholds.length; i++) {
      if (current < thresholds[i]) {
        return {
          level: i,
          nextThreshold: thresholds[i],
          prevThreshold: i > 0 ? thresholds[i - 1] : 0
        };
      }
    }
    return {
      level: thresholds.length,
      nextThreshold: null,
      prevThreshold: thresholds[thresholds.length - 1]
    };
  };

  const { level, nextThreshold, prevThreshold } = getCurrentLevel();

  // プログレスバーの進捗率を計算
  const getProgressPercentage = () => {
    if (nextThreshold === null) {
      return 100; // 最大レベル到達
    }

    const rangeStart = prevThreshold;
    const rangeSize = nextThreshold - rangeStart;
    const currentInRange = current - rangeStart;

    return Math.min(100, (currentInRange / rangeSize) * 100);
  };

  const progressPercentage = getProgressPercentage();
  const remaining = nextThreshold ? nextThreshold - current : 0;

  return (
    <div className={`progress-container ${className}`}>
      <div className="progress-header">
        <span className="progress-label">{label}</span>
        <span className="progress-score">
          {currentScore > 0 ? '+' : ''}{currentScore}
          {currentScore < maxScore && nextThreshold && (
            <span className="next-score"> → +{currentScore + 1}</span>
          )}
        </span>
      </div>

      {nextThreshold && (
        <>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="progress-info">
            <span className="current-count">{current}</span>
            <span className="remaining-count">
              +{remaining} for next level
            </span>
            <span className="next-threshold">{nextThreshold}</span>
          </div>
        </>
      )}

      {!nextThreshold && (
        <div className="progress-maxed">
          <div className="progress-bar">
            <div className="progress-fill maxed" style={{ width: '100%' }} />
          </div>
          <div className="progress-info">
            <span className="maxed-text">Maximum score achieved!</span>
          </div>
        </div>
      )}
    </div>
  );
};
