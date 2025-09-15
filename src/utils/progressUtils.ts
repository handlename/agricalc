import { GameState } from "../types/game";

export interface ScoreThreshold {
  value: number;
  score: number;
}

export interface ProgressInfo {
  current: number;
  currentScore: number;
  nextThreshold: number | null;
  remaining: number;
  maxScore: number;
  thresholds: number[];
}

// 羊の得点閾値
export const sheepThresholds: ScoreThreshold[] = [
  { value: 1, score: 1 },
  { value: 4, score: 2 },
  { value: 6, score: 3 },
  { value: 8, score: 4 },
];

// 猪の得点閾値
export const boarThresholds: ScoreThreshold[] = [
  { value: 1, score: 1 },
  { value: 3, score: 2 },
  { value: 5, score: 3 },
  { value: 7, score: 4 },
];

// 牛の得点閾値
export const cattleThresholds: ScoreThreshold[] = [
  { value: 1, score: 1 },
  { value: 2, score: 2 },
  { value: 4, score: 3 },
  { value: 6, score: 4 },
];

// 穀物の得点閾値
export const grainThresholds: ScoreThreshold[] = [
  { value: 1, score: 1 },
  { value: 4, score: 2 },
  { value: 6, score: 3 },
  { value: 8, score: 4 },
];

// 野菜の得点閾値
export const vegetableThresholds: ScoreThreshold[] = [
  { value: 1, score: 1 },
  { value: 2, score: 2 },
  { value: 3, score: 3 },
  { value: 4, score: 4 },
];

// 畑の得点閾値
export const fieldThresholds: ScoreThreshold[] = [
  { value: 2, score: 1 },
  { value: 3, score: 2 },
  { value: 4, score: 3 },
  { value: 5, score: 4 },
];

// 牧場の得点閾値
export const pastureThresholds: ScoreThreshold[] = [
  { value: 1, score: 1 },
  { value: 2, score: 2 },
  { value: 3, score: 3 },
  { value: 4, score: 4 },
];

export const getProgressInfo = (
  current: number,
  thresholds: ScoreThreshold[],
): ProgressInfo => {
  // 現在の得点を計算
  let currentScore = current === 0 ? -1 : 0;
  for (const threshold of thresholds) {
    if (current >= threshold.value) {
      currentScore = threshold.score;
    } else {
      break;
    }
  }

  // 次の閾値を見つける
  let nextThreshold: number | null = null;
  for (const threshold of thresholds) {
    if (current < threshold.value) {
      nextThreshold = threshold.value;
      break;
    }
  }

  const remaining = nextThreshold ? nextThreshold - current : 0;
  const maxScore = thresholds[thresholds.length - 1].score;
  const thresholdValues = thresholds.map((t) => t.value);

  return {
    current,
    currentScore,
    nextThreshold,
    remaining,
    maxScore,
    thresholds: thresholdValues,
  };
};

export const getAllProgressInfo = (state: GameState) => {
  return {
    sheep: getProgressInfo(state.livestock.sheep, sheepThresholds),
    boars: getProgressInfo(state.livestock.boars, boarThresholds),
    cattle: getProgressInfo(state.livestock.cattle, cattleThresholds),
    grain: getProgressInfo(state.crops.grain, grainThresholds),
    vegetables: getProgressInfo(state.crops.vegetables, vegetableThresholds),
    fields: getProgressInfo(state.farm.fields, fieldThresholds),
    pastures: getProgressInfo(state.farm.pastures, pastureThresholds),
  };
};
