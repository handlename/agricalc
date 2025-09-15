import React from 'react';
import { NumberInput } from '../NumberInput';
import { GrainIcon, VegetableIcon } from '../Icons';
import { useGame } from '../../hooks/GameContext';

export const CropInput: React.FC = () => {
  const { state, dispatch } = useGame();

  return (
    <div className="card">
      <h2 className="section-title">Crops</h2>
      <NumberInput
        value={state.crops.grain}
        onChange={(value) => dispatch({ type: 'UPDATE_CROPS', field: 'grain', value })}
        min={0}
        max={99}
        label="Grain"
        icon={<GrainIcon size={20} />}
      />
      <NumberInput
        value={state.crops.vegetables}
        onChange={(value) => dispatch({ type: 'UPDATE_CROPS', field: 'vegetables', value })}
        min={0}
        max={99}
        label="Vegetables"
        icon={<VegetableIcon size={20} />}
      />
    </div>
  );
};
