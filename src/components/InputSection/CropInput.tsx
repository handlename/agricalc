import React from "react";
import { NumberInput } from "../NumberInput";
import { GrainIcon, VegetableIcon } from "../Icons";
import { useGame } from "../../hooks/useGame";
import { useLanguage } from "../../i18n/LanguageContext";
import {
  grainThresholds,
  vegetableThresholds,
} from "../../utils/progressUtils";

export const CropInput: React.FC = () => {
  const { state, dispatch } = useGame();
  const { t } = useLanguage();

  return (
    <div className="card">
      <h2 className="section-title">{t("crops")}</h2>
      <NumberInput
        value={state.crops.grain}
        onChange={(value) =>
          dispatch({ type: "UPDATE_CROPS", field: "grain", value })
        }
        min={0}
        max={99}
        label={t("grain")}
        icon={<GrainIcon size={20} />}
        showGrid={true}
        gridThresholds={grainThresholds.map((t) => t.value)}
      />
      <NumberInput
        value={state.crops.vegetables}
        onChange={(value) =>
          dispatch({ type: "UPDATE_CROPS", field: "vegetables", value })
        }
        min={0}
        max={99}
        label={t("vegetables")}
        icon={<VegetableIcon size={20} />}
        showGrid={true}
        gridThresholds={vegetableThresholds.map((t) => t.value)}
      />
    </div>
  );
};
