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
  ICON_SIZE,
} from "../Icons";

export const ScoreBreakdown: React.FC = () => {
  const { score } = useGame();
  const { t } = useLanguage();
  const { breakdown } = score;

  const scoreItems = [
    { label: t("fields"), value: breakdown.fields, icon: <FieldIcon size={ICON_SIZE.breakdown} /> },
    {
      label: t("pastures"),
      value: breakdown.pastures,
      icon: <PastureIcon size={ICON_SIZE.breakdown} />,
    },
    {
      label: t("unused"),
      value: breakdown.unusedSpaces,
      icon: <UnusedSpaceIcon size={ICON_SIZE.breakdown} />,
    },
    { label: t("sheep"), value: breakdown.sheep, icon: <SheepIcon size={ICON_SIZE.breakdown} /> },
    { label: t("boars"), value: breakdown.boars, icon: <BoarIcon size={ICON_SIZE.breakdown} /> },
    {
      label: t("cattle"),
      value: breakdown.cattle,
      icon: <CattleIcon size={ICON_SIZE.breakdown} />,
    },
    { label: t("grain"), value: breakdown.grain, icon: <GrainIcon size={ICON_SIZE.breakdown} /> },
    {
      label: t("vegetables"),
      value: breakdown.vegetables,
      icon: <VegetableIcon size={ICON_SIZE.breakdown} />,
    },
    {
      label: t("family"),
      value: breakdown.familyMembers,
      icon: <FamilyIcon size={ICON_SIZE.breakdown} />,
    },
    {
      label: t("clay"),
      value: breakdown.clayRooms,
      icon: <ClayRoomIcon size={ICON_SIZE.breakdown} />,
    },
    {
      label: t("stone"),
      value: breakdown.stoneRooms,
      icon: <StoneRoomIcon size={ICON_SIZE.breakdown} />,
    },
    {
      label: t("stables"),
      value: breakdown.fencedStables,
      icon: <StableIcon size={ICON_SIZE.breakdown} />,
    },
    {
      label: t("begging"),
      value: breakdown.beggingCards,
      icon: <BeggingCardIcon size={ICON_SIZE.breakdown} />,
    },
    {
      label: t("bonusLabel"),
      value: breakdown.bonusPoints,
      icon: <PlusIcon size={ICON_SIZE.breakdown} />,
    },
    {
      label: t("penaltyLabel"),
      value: breakdown.penaltyPoints,
      icon: <MinusIcon size={ICON_SIZE.breakdown} />,
    },
  ];

  return (
    <dl className="score-breakdown">
      {scoreItems.map((item, index) => (
        <div key={index} className="score-item">
          <dt className="score-item-label">
            <span className="input-icon" aria-hidden="true">
              {item.icon}
            </span>
            {item.label}
          </dt>
          <dd
            className={`score-item-value ${item.value < 0 ? "negative" : item.value > 0 ? "positive" : ""}`}
          >
            {formatScore(item.value)}
          </dd>
        </div>
      ))}
    </dl>
  );
};
