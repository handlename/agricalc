export interface ScoreBreakdown {
  fields: number;
  pastures: number;
  unusedSpaces: number;
  sheep: number;
  boars: number;
  cattle: number;
  grain: number;
  vegetables: number;
  familyMembers: number;
  clayRooms: number;
  stoneRooms: number;
  fencedStables: number;
  beggingCards: number;
  bonusPoints: number;
  penaltyPoints: number;
}

export interface ScoreSummary {
  breakdown: ScoreBreakdown;
  total: number;
}
