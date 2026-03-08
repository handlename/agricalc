import React from "react";
import { NumberInput } from "../NumberInput";
import { SheepIcon, BoarIcon, CattleIcon } from "../Icons";

import { useGame } from "../../hooks/useGame";
import { useLanguage } from "../../i18n/LanguageContext";
import {
  sheepThresholds,
  boarThresholds,
  cattleThresholds,
} from "../../utils/progressUtils";

export const LivestockInput: React.FC = () => {
  const { state, dispatch } = useGame();
  const { t } = useLanguage();

  return (
    <div className="card">
      <h2 className="section-title">{t("livestock")}</h2>
      <NumberInput
        value={state.livestock.sheep}
        onChange={(value) =>
          dispatch({ type: "UPDATE_LIVESTOCK", field: "sheep", value })
        }
        min={0}
        max={99}
        label={t("sheep")}
        icon={<SheepIcon size={20} />}
        showGrid={true}
        gridThresholds={sheepThresholds.map((t) => t.value)}
      />
      <NumberInput
        value={state.livestock.boars}
        onChange={(value) =>
          dispatch({ type: "UPDATE_LIVESTOCK", field: "boars", value })
        }
        min={0}
        max={99}
        label={t("boars")}
        icon={<BoarIcon size={20} />}
        showGrid={true}
        gridThresholds={boarThresholds.map((t) => t.value)}
      />
      <NumberInput
        value={state.livestock.cattle}
        onChange={(value) =>
          dispatch({ type: "UPDATE_LIVESTOCK", field: "cattle", value })
        }
        min={0}
        max={99}
        label={t("cattle")}
        icon={<CattleIcon size={20} />}
        showGrid={true}
        gridThresholds={cattleThresholds.map((t) => t.value)}
      />
    </div>
  );
};
