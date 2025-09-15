import { GameState } from '../types/game';
import { ScoreSummary } from '../types/score';

export const formatScore = (score: number): string => {
  if (score > 0) {
    return `+${score}`;
  }
  return score.toString();
};

export const formatScoreToText = (state: GameState, scoreSummary: ScoreSummary): string => {
  const { breakdown, total } = scoreSummary;

  const lines = [
    '=== Agricola Score ===',
    '',
    '--- Farm ---',
    `Fields (${state.farm.fields}): ${formatScore(breakdown.fields)}`,
    `Pastures (${state.farm.pastures}): ${formatScore(breakdown.pastures)}`,
    `Unused Spaces (${state.farm.unusedSpaces}): ${formatScore(breakdown.unusedSpaces)}`,
    '',
    '--- Livestock ---',
    `Sheep (${state.livestock.sheep}): ${formatScore(breakdown.sheep)}`,
    `Boars (${state.livestock.boars}): ${formatScore(breakdown.boars)}`,
    `Cattle (${state.livestock.cattle}): ${formatScore(breakdown.cattle)}`,
    '',
    '--- Crops ---',
    `Grain (${state.crops.grain}): ${formatScore(breakdown.grain)}`,
    `Vegetables (${state.crops.vegetables}): ${formatScore(breakdown.vegetables)}`,
    '',
    '--- Family & Home ---',
    `Family Members (${state.family.familyMembers}): ${formatScore(breakdown.familyMembers)}`,
    `Clay Rooms (${state.family.clayRooms}): ${formatScore(breakdown.clayRooms)}`,
    `Stone Rooms (${state.family.stoneRooms}): ${formatScore(breakdown.stoneRooms)}`,
    '',
    '--- Bonus ---',
    `Fenced Stables (${state.others.fencedStables}): ${formatScore(breakdown.fencedStables)}`,
    `Card Bonus: ${formatScore(breakdown.cardBonus)}`,
    '',
    '==================',
    `Total Score: ${total}`,
    '==================',
  ];

  return lines.join('\n');
};
