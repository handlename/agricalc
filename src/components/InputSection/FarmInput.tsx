import React from "react";
import { NumberInput } from "../NumberInput";
import { FieldIcon, PastureIcon, UnusedSpaceIcon } from "../Icons";
import { useGame } from "../../hooks/useGame";
import { useLanguage } from "../../i18n/LanguageContext";
import { fieldThresholds, pastureThresholds } from "../../utils/progressUtils";

export const FarmInput: React.FC = () => {
  const { state, dispatch } = useGame();
  const { t } = useLanguage();

  return (
    <div className="card">
      <h2 className="section-title">{t("farm")}</h2>
      <NumberInput
        value={state.farm.fields}
        onChange={(value) =>
          dispatch({ type: "UPDATE_FARM", field: "fields", value })
        }
        min={0}
        max={15}
        label={t("fields")}
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
        label={t("pastures")}
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
        label={t("unused")}
        icon={<UnusedSpaceIcon size={20} />}
      />
    </div>
  );
};
