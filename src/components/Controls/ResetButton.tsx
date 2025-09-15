import React from "react";
import { useGame } from "../../hooks/useGame";

export const ResetButton: React.FC = () => {
  const { dispatch } = useGame();

  const handleReset = () => {
    if (window.confirm("Reset all values?")) {
      dispatch({ type: "RESET_ALL" });
    }
  };

  return (
    <button className="btn-secondary" onClick={handleReset}>
      Reset All
    </button>
  );
};
