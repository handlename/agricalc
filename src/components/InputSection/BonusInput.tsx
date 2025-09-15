import React from 'react';
import { NumberInput } from '../NumberInput';
import { StableIcon, CardIcon } from '../Icons';
import { useGame } from '../../hooks/GameContext';

export const BonusInput: React.FC = () => {
  const { state, dispatch } = useGame();

  return (
    <div className="card">
      <h2 className="section-title">Bonus</h2>
      <NumberInput
        value={state.others.fencedStables}
        onChange={(value) => dispatch({ type: 'UPDATE_OTHERS', field: 'fencedStables', value })}
        min={0}
        max={4}
        label="Stables"
        icon={<StableIcon size={20} />}
      />
      <NumberInput
        value={state.others.cardBonus}
        onChange={(value) => dispatch({ type: 'UPDATE_OTHERS', field: 'cardBonus', value })}
        min={-99}
        max={99}
        label="Cards"
        icon={<CardIcon size={20} />}
      />
    </div>
  );
};
