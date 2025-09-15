import React from 'react';
import { NumberInput } from '../NumberInput';
import { SheepIcon, BoarIcon, CattleIcon } from '../Icons';
import { useGame } from '../../hooks/GameContext';

export const LivestockInput: React.FC = () => {
  const { state, dispatch } = useGame();

  return (
    <div className="card">
      <h2 className="section-title">Livestock</h2>
      <NumberInput
        value={state.livestock.sheep}
        onChange={(value) => dispatch({ type: 'UPDATE_LIVESTOCK', field: 'sheep', value })}
        min={0}
        max={99}
        label="Sheep"
        icon={<SheepIcon size={20} />}
      />
      <NumberInput
        value={state.livestock.boars}
        onChange={(value) => dispatch({ type: 'UPDATE_LIVESTOCK', field: 'boars', value })}
        min={0}
        max={99}
        label="Boars"
        icon={<BoarIcon size={20} />}
      />
      <NumberInput
        value={state.livestock.cattle}
        onChange={(value) => dispatch({ type: 'UPDATE_LIVESTOCK', field: 'cattle', value })}
        min={0}
        max={99}
        label="Cattle"
        icon={<CattleIcon size={20} />}
      />
    </div>
  );
};
