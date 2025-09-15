import React from "react";
import { useGame } from "../../hooks/useGame";
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
  const { breakdown } = score;

  const scoreItems = [
    { label: "Fields", value: breakdown.fields, icon: <FieldIcon size={16} /> },
    {
      label: "Pastures",
      value: breakdown.pastures,
      icon: <PastureIcon size={16} />,
    },
    {
      label: "Unused",
      value: breakdown.unusedSpaces,
      icon: <UnusedSpaceIcon size={16} />,
    },
    { label: "Sheep", value: breakdown.sheep, icon: <SheepIcon size={16} /> },
    { label: "Boars", value: breakdown.boars, icon: <BoarIcon size={16} /> },
    {
      label: "Cattle",
      value: breakdown.cattle,
      icon: <CattleIcon size={16} />,
    },
    { label: "Grain", value: breakdown.grain, icon: <GrainIcon size={16} /> },
    {
      label: "Vegetables",
      value: breakdown.vegetables,
      icon: <VegetableIcon size={16} />,
    },
    {
      label: "Family",
      value: breakdown.familyMembers,
      icon: <FamilyIcon size={16} />,
    },
    {
      label: "Clay",
      value: breakdown.clayRooms,
      icon: <ClayRoomIcon size={16} />,
    },
    {
      label: "Stone",
      value: breakdown.stoneRooms,
      icon: <StoneRoomIcon size={16} />,
    },
    {
      label: "Stables",
      value: breakdown.fencedStables,
      icon: <StableIcon size={16} />,
    },
    {
      label: "Begging",
      value: breakdown.beggingCards,
      icon: <BeggingCardIcon size={16} />,
    },
    {
      label: "Bonus",
      value: breakdown.bonusPoints,
      icon: <PlusIcon size={16} />,
    },
    {
      label: "Penalty",
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
