import React, { createContext, useContext, useReducer, ReactNode, useMemo } from 'react';
import { GameState, initialGameState } from '../types/game';
import { gameReducer, GameAction } from './gameReducer';
import { calculateScore } from '../utils/scoreCalculator';
import { ScoreSummary } from '../types/score';

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  score: ScoreSummary;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  const score = useMemo(() => calculateScore(state), [state]);

  return (
    <GameContext.Provider value={{ state, dispatch, score }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
