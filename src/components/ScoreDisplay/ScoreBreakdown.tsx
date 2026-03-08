import React from "react";
import { useGame } from "../../hooks/useGame";
import { useLanguage } from "../../i18n/LanguageContext";
import { formatScore } from "../../utils/formatters";
import {
  FieldIcon,
  PastureIcon,
  UnusedSpaceIcon,
  SheepIcon,
  BoarIcon,
  CattleIcon,
  GrainIcon,
  VegetableIcon,
  FamilyIcon,
  ClayRoomIcon,
  StoneRoomIcon,
  StableIcon,
  BeggingCardIcon,
  PlusIcon,
  MinusIcon,
} from "../Icons";

export const ScoreBreakdown: React.FC = () => {
  const { score } = useGame();
  const { t } = useLanguage();
  const { breakdown } = score;

  const scoreItems = [
    { label: t("fields"), value: breakdown.fields, icon: <FieldIcon size={16} /> },
    {
      label: t("pastures"),
      value: breakdown.pastures,
      icon: <PastureIcon size={16} />,
    },
    {
      label: t("unused"),
      value: breakdown.unusedSpaces,
      icon: <UnusedSpaceIcon size={16} />,
    },
    { label: t("sheep"), value: breakdown.sheep, icon: <SheepIcon size={16} /> },
    { label: t("boars"), value: breakdown.boars, icon: <BoarIcon size={16} /> },
    {
      label: t("cattle"),
      value: breakdown.cattle,
      icon: <CattleIcon size={16} />,
    },
    { label: t("grain"), value: breakdown.grain, icon: <GrainIcon size={16} /> },
    {
      label: t("vegetables"),
      value: breakdown.vegetables,
      icon: <VegetableIcon size={16} />,
    },
    {
      label: t("family"),
      value: breakdown.familyMembers,
      icon: <FamilyIcon size={16} />,
    },
    {
      label: t("clay"),
      value: breakdown.clayRooms,
      icon: <ClayRoomIcon size={16} />,
    },
    {
      label: t("stone"),
      value: breakdown.stoneRooms,
      icon: <StoneRoomIcon size={16} />,
    },
    {
      label: t("stables"),
      value: breakdown.fencedStables,
      icon: <StableIcon size={16} />,
    },
    {
      label: t("begging"),
      value: breakdown.beggingCards,
      icon: <BeggingCardIcon size={16} />,
    },
    {
      label: t("bonusLabel"),
      value: breakdown.bonusPoints,
      icon: <PlusIcon size={16} />,
    },
    {
      label: t("penaltyLabel"),
      value: breakdown.penaltyPoints,
      icon: <MinusIcon size={16} />,
    },
  ];

  return (
    <div className="score-breakdown">
      {scoreItems.map((item, index) => (
        <div key={index} className="score-item">
          <div className="score-item-label">
            {item.icon}
            {item.label}
          </div>
          <div
            className={`score-item-value ${item.value < 0 ? "negative" : item.value > 0 ? "positive" : ""}`}
          >
            {formatScore(item.value)}
          </div>
        </div>
      ))}
    </div>
  );
};
