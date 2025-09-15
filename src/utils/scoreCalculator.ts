import { GameState } from "../types/game";
import { ScoreBreakdown, ScoreSummary } from "../types/score";

export const calculateFieldScore = (fields: number): number => {
  if (fields <= 1) return -1;
  if (fields === 2) return 1;
  if (fields === 3) return 2;
  if (fields === 4) return 3;
  return 4;
};

export const calculatePastureScore = (pastures: number): number => {
  if (pastures === 0) return -1;
  if (pastures === 1) return 1;
  if (pastures === 2) return 2;
  if (pastures === 3) return 3;
  return 4;
};

export const calculateLivestockScore = (
  count: number,
  type: "sheep" | "boar" | "cattle",
): number => {
  if (count === 0) return -1;

  switch (type) {
    case "sheep":
      if (count <= 3) return 1;
      if (count <= 5) return 2;
      if (count <= 7) return 3;
      return 4;

    case "boar":
      if (count <= 2) return 1;
      if (count <= 4) return 2;
      if (count <= 6) return 3;
      return 4;

    case "cattle":
      if (count === 1) return 1;
      if (count <= 3) return 2;
      if (count <= 5) return 3;
      return 4;

    default:
      return 0;
  }
};

export const calculateGrainScore = (grain: number): number => {
  if (grain === 0) return -1;
  if (grain <= 3) return 1;
  if (grain <= 5) return 2;
  if (grain <= 7) return 3;
  return 4;
};

export const calculateVegetableScore = (vegetables: number): number => {
  if (vegetables === 0) return -1;
  if (vegetables === 1) return 1;
  if (vegetables === 2) return 2;
  if (vegetables === 3) return 3;
  return 4;
};

export const calculateScore = (state: GameState): ScoreSummary => {
  const breakdown: ScoreBreakdown = {
    fields: calculateFieldScore(state.farm.fields),
    pastures: calculatePastureScore(state.farm.pastures),
    unusedSpaces: state.farm.unusedSpaces * -1,
    sheep: calculateLivestockScore(state.livestock.sheep, "sheep"),
    boars: calculateLivestockScore(state.livestock.boars, "boar"),
    cattle: calculateLivestockScore(state.livestock.cattle, "cattle"),
    grain: calculateGrainScore(state.crops.grain),
    vegetables: calculateVegetableScore(state.crops.vegetables),
    familyMembers: state.family.familyMembers * 3,
    clayRooms: state.family.clayRooms * 1,
    stoneRooms: state.family.stoneRooms * 2,
    fencedStables: state.others.fencedStables * 1,
    beggingCards: state.others.beggingCards * -3,
    bonusPoints: state.others.bonusPoints,
    penaltyPoints: state.others.penaltyPoints * -1,
  };

  const total = Object.values(breakdown).reduce((sum, score) => sum + score, 0);

  return { breakdown, total };
};
