import React from "react";
import { NumberInput } from "../NumberInput";
import { GrainIcon, VegetableIcon } from "../Icons";
import { GridVisualization } from "../Visualization/GridVisualization";
import { useGame } from "../../hooks/GameContext";
import {
  grainThresholds,
  vegetableThresholds,
} from "../../utils/progressUtils";

export const CropInput: React.FC = () => {
  const { state, dispatch } = useGame();

  return (
    <div className="card">
      <h2 className="section-title">Crops</h2>
      <NumberInput
        value={state.crops.grain}
        onChange={(value) =>
          dispatch({ type: "UPDATE_CROPS", field: "grain", value })
        }
        min={0}
        max={99}
        label="Grain"
        icon={<GrainIcon size={20} />}
      />
      <GridVisualization
        current={state.crops.grain}
        thresholds={grainThresholds.map((t) => t.value)}
        maxDisplay={10}
      />
      <NumberInput
        value={state.crops.vegetables}
        onChange={(value) =>
          dispatch({ type: "UPDATE_CROPS", field: "vegetables", value })
        }
        min={0}
        max={99}
        label="Vegetables"
        icon={<VegetableIcon size={20} />}
      />
      <GridVisualization
        current={state.crops.vegetables}
        thresholds={vegetableThresholds.map((t) => t.value)}
        maxDisplay={6}
      />
    </div>
  );
};
