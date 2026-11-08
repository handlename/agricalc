import React from "react";
import { NumberInput } from "../NumberInput";
import { FamilyIcon, ClayRoomIcon, StoneRoomIcon, ICON_SIZE } from "../Icons";
import { useGame } from "../../hooks/useGame";
import { useLanguage } from "../../i18n/LanguageContext";

export const FamilyInput: React.FC = () => {
  const { state, dispatch } = useGame();
  const { t } = useLanguage();

  return (
    <div className="card">
      <h2 className="section-title">{t("familyAndHome")}</h2>
      <NumberInput
        value={state.family.familyMembers}
        onChange={(value) =>
          dispatch({ type: "UPDATE_FAMILY", field: "familyMembers", value })
        }
        min={2}
        max={5}
        label={t("family")}
        icon={<FamilyIcon size={ICON_SIZE.input} />}
      />
      <NumberInput
        value={state.family.clayRooms}
        onChange={(value) =>
          dispatch({ type: "UPDATE_FAMILY", field: "clayRooms", value })
        }
        min={0}
        max={15}
        label={t("clayRooms")}
        icon={<ClayRoomIcon size={ICON_SIZE.input} />}
      />
      <NumberInput
        value={state.family.stoneRooms}
        onChange={(value) =>
          dispatch({ type: "UPDATE_FAMILY", field: "stoneRooms", value })
        }
        min={0}
        max={15}
        label={t("stoneRooms")}
        icon={<StoneRoomIcon size={ICON_SIZE.input} />}
      />
    </div>
  );
};
