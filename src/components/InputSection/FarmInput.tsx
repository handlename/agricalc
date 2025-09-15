import React from "react";
import { NumberInput } from "../NumberInput";
import { FieldIcon, PastureIcon, UnusedSpaceIcon } from "../Icons";
import { useGame } from "../../hooks/useGame";
import { fieldThresholds, pastureThresholds } from "../../utils/progressUtils";

export const FarmInput: React.FC = () => {
  const { state, dispatch } = useGame();

  return (
    <div className="card">
      <h2 className="section-title">Farm</h2>
      <NumberInput
        value={state.farm.fields}
        onChange={(value) =>
          dispatch({ type: "UPDATE_FARM", field: "fields", value })
        }
        min={0}
        max={15}
        label="Fields"
        icon={<FieldIcon size={20} />}
        showGrid={true}
        gridThresholds={fieldThresholds.map((t) => t.value)}
      />
      <NumberInput
        value={state.farm.pastures}
        onChange={(value) =>
          dispatch({ type: "UPDATE_FARM", field: "pastures", value })
        }
        min={0}
        max={15}
        label="Pastures"
        icon={<PastureIcon size={20} />}
        showGrid={true}
        gridThresholds={pastureThresholds.map((t) => t.value)}
      />
      <NumberInput
        value={state.farm.unusedSpaces}
        onChange={(value) =>
          dispatch({ type: "UPDATE_FARM", field: "unusedSpaces", value })
        }
        min={0}
        max={15}
        label="Unused"
        icon={<UnusedSpaceIcon size={20} />}
      />
    </div>
  );
};
