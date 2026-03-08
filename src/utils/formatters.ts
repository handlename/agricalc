import { GameState } from "../types/game";
import { ScoreSummary } from "../types/score";
import { Language, translations } from "../i18n/translations";

export const formatScore = (score: number): string => {
  if (score > 0) {
    return `+${score}`;
  }
  return score.toString();
};

export const formatScoreToText = (
  state: GameState,
  scoreSummary: ScoreSummary,
  language: Language,
  _translations: typeof translations,
): string => {
  const { breakdown, total } = scoreSummary;
  const t = _translations[language];

  const lines = [
    t.scoreHeader,
    "",
    t.farmSection,
    `${t.fields} (${state.farm.fields}): ${formatScore(breakdown.fields)}`,
    `${t.pastures} (${state.farm.pastures}): ${formatScore(breakdown.pastures)}`,
    `${t.unusedSpaces} (${state.farm.unusedSpaces}): ${formatScore(breakdown.unusedSpaces)}`,
    "",
    t.livestockSection,
    `${t.sheep} (${state.livestock.sheep}): ${formatScore(breakdown.sheep)}`,
    `${t.boars} (${state.livestock.boars}): ${formatScore(breakdown.boars)}`,
    `${t.cattle} (${state.livestock.cattle}): ${formatScore(breakdown.cattle)}`,
    "",
    t.cropsSection,
    `${t.grain} (${state.crops.grain}): ${formatScore(breakdown.grain)}`,
    `${t.vegetables} (${state.crops.vegetables}): ${formatScore(breakdown.vegetables)}`,
    "",
    t.familySection,
    `${t.familyMembers} (${state.family.familyMembers}): ${formatScore(breakdown.familyMembers)}`,
    `${t.clayRooms} (${state.family.clayRooms}): ${formatScore(breakdown.clayRooms)}`,
    `${t.stoneRooms} (${state.family.stoneRooms}): ${formatScore(breakdown.stoneRooms)}`,
    "",
    t.bonusSection,
    `${t.fencedStables} (${state.others.fencedStables}): ${formatScore(breakdown.fencedStables)}`,
    `${t.beggingCards} (${state.others.beggingCards}): ${formatScore(breakdown.beggingCards)}`,
    `${t.bonusPoints} (${state.others.bonusPoints}): ${formatScore(breakdown.bonusPoints)}`,
    `${t.penaltyPoints} (${state.others.penaltyPoints}): ${formatScore(breakdown.penaltyPoints)}`,
    "",
    "==================",
    `${t.totalScoreLabel}: ${total}`,
    "==================",
  ];

  return lines.join("\n");
};
