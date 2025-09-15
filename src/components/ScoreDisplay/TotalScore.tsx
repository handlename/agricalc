import React from "react";
import { useGame } from "../../hooks/useGame";

export const TotalScore: React.FC = () => {
  const { score } = useGame();

  return (
    <div className="score-display">
      <div className="score-label">Total Score</div>
      <div className="score-value">{score.total}</div>
    </div>
  );
};
