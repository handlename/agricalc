import React, { useReducer, ReactNode, useMemo } from "react";
import { initialGameState } from "../types/game";
import { gameReducer } from "./gameReducer";
import { calculateScore } from "../utils/scoreCalculator";
import { GameContext } from "../context/GameContext";

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  const score = useMemo(() => calculateScore(state), [state]);

  return (
    <GameContext.Provider value={{ state, dispatch, score }}>
      {children}
    </GameContext.Provider>
  );
};
