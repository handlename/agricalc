import React from "react";
import { useGame } from "../../hooks/GameContext";
import { formatScore } from "../../utils/formatters";
import { ProgressBar } from "./ProgressBar";
import { getAllProgressInfo } from "../../utils/progressUtils";
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
  const { state, score } = useGame();
  const { breakdown } = score;
  const progressInfo = getAllProgressInfo(state);

  // 段階的得点項目
  const progressItems = [
    {
      key: "fields",
      label: "Fields",
      value: breakdown.fields,
      icon: <FieldIcon size={16} />,
      progress: progressInfo.fields,
    },
    {
      key: "pastures",
      label: "Pastures",
      value: breakdown.pastures,
      icon: <PastureIcon size={16} />,
      progress: progressInfo.pastures,
    },
    {
      key: "sheep",
      label: "Sheep",
      value: breakdown.sheep,
      icon: <SheepIcon size={16} />,
      progress: progressInfo.sheep,
    },
    {
      key: "boars",
      label: "Boars",
      value: breakdown.boars,
      icon: <BoarIcon size={16} />,
      progress: progressInfo.boars,
    },
    {
      key: "cattle",
      label: "Cattle",
      value: breakdown.cattle,
      icon: <CattleIcon size={16} />,
      progress: progressInfo.cattle,
    },
    {
      key: "grain",
      label: "Grain",
      value: breakdown.grain,
      icon: <GrainIcon size={16} />,
      progress: progressInfo.grain,
    },
    {
      key: "vegetables",
      label: "Vegetables",
      value: breakdown.vegetables,
      icon: <VegetableIcon size={16} />,
      progress: progressInfo.vegetables,
    },
  ];

  // 固定得点項目
  const fixedScoreItems = [
    {
      label: "Unused",
      value: breakdown.unusedSpaces,
      icon: <UnusedSpaceIcon size={16} />,
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
      {progressItems.map((item) => (
        <div key={item.key} className="score-item progress-item">
          <div className="score-item-header">
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
          <ProgressBar
            current={item.progress.current}
            thresholds={item.progress.thresholds}
            currentScore={item.progress.currentScore}
            maxScore={item.progress.maxScore}
            label=""
          />
        </div>
      ))}
      {fixedScoreItems.map((item, index) => (
        <div key={`fixed-${index}`} className="score-item">
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
