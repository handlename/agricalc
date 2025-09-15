import { createContext } from "react";
import { GameState } from "../types/game";
import { GameAction } from "../hooks/gameReducer";
import { ScoreSummary } from "../types/score";

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  score: ScoreSummary;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined,
);
