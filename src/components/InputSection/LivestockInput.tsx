import React from "react";
import { NumberInput } from "../NumberInput";
import { SheepIcon, BoarIcon, CattleIcon } from "../Icons";
import { GridVisualization } from "../Visualization/GridVisualization";
import { useGame } from "../../hooks/GameContext";
import {
  sheepThresholds,
  boarThresholds,
  cattleThresholds,
} from "../../utils/progressUtils";

export const LivestockInput: React.FC = () => {
  const { state, dispatch } = useGame();

  return (
    <div className="card">
      <h2 className="section-title">Livestock</h2>
      <NumberInput
        value={state.livestock.sheep}
        onChange={(value) =>
          dispatch({ type: "UPDATE_LIVESTOCK", field: "sheep", value })
        }
        min={0}
        max={99}
        label="Sheep"
        icon={<SheepIcon size={20} />}
      />
      <GridVisualization
        current={state.livestock.sheep}
        thresholds={sheepThresholds.map((t) => t.value)}
        maxDisplay={10}
      />
      <NumberInput
        value={state.livestock.boars}
        onChange={(value) =>
          dispatch({ type: "UPDATE_LIVESTOCK", field: "boars", value })
        }
        min={0}
        max={99}
        label="Boars"
        icon={<BoarIcon size={20} />}
      />
      <GridVisualization
        current={state.livestock.boars}
        thresholds={boarThresholds.map((t) => t.value)}
        maxDisplay={8}
      />
      <NumberInput
        value={state.livestock.cattle}
        onChange={(value) =>
          dispatch({ type: "UPDATE_LIVESTOCK", field: "cattle", value })
        }
        min={0}
        max={99}
        label="Cattle"
        icon={<CattleIcon size={20} />}
      />
      <GridVisualization
        current={state.livestock.cattle}
        thresholds={cattleThresholds.map((t) => t.value)}
        maxDisplay={8}
      />
    </div>
  );
};
