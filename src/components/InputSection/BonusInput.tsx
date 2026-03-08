import React from "react";
import { NumberInput } from "../NumberInput";
import { StableIcon, BeggingCardIcon, PlusIcon, MinusIcon } from "../Icons";
import { useGame } from "../../hooks/useGame";
import { useLanguage } from "../../i18n/LanguageContext";

export const BonusInput: React.FC = () => {
  const { state, dispatch } = useGame();
  const { t } = useLanguage();

  return (
    <div className="card">
      <h2 className="section-title">{t("bonus")}</h2>
      <NumberInput
        value={state.others.fencedStables}
        onChange={(value) =>
          dispatch({ type: "UPDATE_OTHERS", field: "fencedStables", value })
        }
        min={0}
        max={4}
        label={t("stables")}
        icon={<StableIcon size={20} />}
      />
      <NumberInput
        value={state.others.beggingCards}
        onChange={(value) =>
          dispatch({ type: "UPDATE_OTHERS", field: "beggingCards", value })
        }
        min={0}
        max={20}
        label={t("beggingCards")}
        icon={<BeggingCardIcon size={20} />}
      />
      <NumberInput
        value={state.others.bonusPoints}
        onChange={(value) =>
          dispatch({ type: "UPDATE_OTHERS", field: "bonusPoints", value })
        }
        min={0}
        max={99}
        label={t("bonusPoints")}
        icon={<PlusIcon size={20} />}
      />
      <NumberInput
        value={state.others.penaltyPoints}
        onChange={(value) =>
          dispatch({ type: "UPDATE_OTHERS", field: "penaltyPoints", value })
        }
        min={0}
        max={99}
        label={t("penaltyPoints")}
        icon={<MinusIcon size={20} />}
      />
    </div>
  );
};
