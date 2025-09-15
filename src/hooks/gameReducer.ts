import { GameState } from '../types/game';

export type GameAction =
  | { type: 'UPDATE_FARM'; field: keyof GameState['farm']; value: number }
  | { type: 'UPDATE_LIVESTOCK'; field: keyof GameState['livestock']; value: number }
  | { type: 'UPDATE_CROPS'; field: keyof GameState['crops']; value: number }
  | { type: 'UPDATE_FAMILY'; field: keyof GameState['family']; value: number }
  | { type: 'UPDATE_OTHERS'; field: keyof GameState['others']; value: number }
  | { type: 'RESET_ALL' }
  | { type: 'SET_STATE'; state: GameState };

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'UPDATE_FARM':
      return {
        ...state,
        farm: {
          ...state.farm,
          [action.field]: action.value
        }
      };

    case 'UPDATE_LIVESTOCK':
      return {
        ...state,
        livestock: {
          ...state.livestock,
          [action.field]: action.value
        }
      };

    case 'UPDATE_CROPS':
      return {
        ...state,
        crops: {
          ...state.crops,
          [action.field]: action.value
        }
      };

    case 'UPDATE_FAMILY':
      return {
        ...state,
        family: {
          ...state.family,
          [action.field]: action.value
        }
      };

    case 'UPDATE_OTHERS':
      return {
        ...state,
        others: {
          ...state.others,
          [action.field]: action.value
        }
      };

    case 'RESET_ALL':
      return {
        farm: { fields: 0, pastures: 0, unusedSpaces: 0 },
        livestock: { sheep: 0, boars: 0, cattle: 0 },
        crops: { grain: 0, vegetables: 0 },
        family: { familyMembers: 2, clayRooms: 0, stoneRooms: 0 },
        others: { fencedStables: 0, cardBonus: 0 }
      };

    case 'SET_STATE':
      return action.state;

    default:
      return state;
  }
};
