export interface FarmElements {
  fields: number;          // 畑の枚数 (0-15)
  pastures: number;        // 牧場の枚数 (0-15)
  unusedSpaces: number;    // 未使用スペース (0-15)
}

export interface Livestock {
  sheep: number;           // 羊 (0-無制限)
  boars: number;           // 猪 (0-無制限)
  cattle: number;          // 牛 (0-無制限)
}

export interface Crops {
  grain: number;           // 穀物 (0-無制限)
  vegetables: number;      // 野菜 (0-無制限)
}

export interface FamilyAndHome {
  familyMembers: number;   // 家族 (2-5)
  clayRooms: number;       // 粘土の部屋 (0-15)
  stoneRooms: number;      // 石の部屋 (0-15)
}

export interface Others {
  fencedStables: number;   // 柵で囲まれた厩 (0-4)
  cardBonus: number;       // カードボーナス点
}

export interface GameState {
  farm: FarmElements;
  livestock: Livestock;
  crops: Crops;
  family: FamilyAndHome;
  others: Others;
}

export const initialGameState: GameState = {
  farm: {
    fields: 0,
    pastures: 0,
    unusedSpaces: 0,
  },
  livestock: {
    sheep: 0,
    boars: 0,
    cattle: 0,
  },
  crops: {
    grain: 0,
    vegetables: 0,
  },
  family: {
    familyMembers: 2,
    clayRooms: 0,
    stoneRooms: 0,
  },
  others: {
    fencedStables: 0,
    cardBonus: 0,
  },
};
