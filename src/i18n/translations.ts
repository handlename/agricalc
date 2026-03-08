export const translations = {
  en: {
    // App
    appTitle: "Agricola Score Calculator",
    pageTitle: "Agricalc",

    // Sections
    farm: "Farm",
    livestock: "Livestock",
    crops: "Crops",
    familyAndHome: "Family & Home",
    bonus: "Bonus",

    // Farm
    fields: "Fields",
    pastures: "Pastures",
    unused: "Unused",

    // Livestock
    sheep: "Sheep",
    boars: "Boars",
    cattle: "Cattle",

    // Crops
    grain: "Grain",
    vegetables: "Vegetables",

    // Family & Home
    family: "Family",
    clayRooms: "Clay Rooms",
    stoneRooms: "Stone Rooms",

    // Bonus
    stables: "Stables",
    beggingCards: "Begging Cards",
    bonusPoints: "Bonus Points",
    penaltyPoints: "Penalty Points",

    // Score Display
    totalScore: "Total Score",
    total: "Total",

    // Score Breakdown (short labels)
    clay: "Clay",
    stone: "Stone",
    begging: "Begging",
    bonusLabel: "Bonus",
    penaltyLabel: "Penalty",

    // Controls
    copyScore: "Copy Score",
    copied: "Copied!",
    resetAll: "Reset All",
    resetConfirm: "Reset all values?",

    // Grid
    scoreChange: "score change",

    // Formatters (copy text)
    scoreHeader: "=== Agricola Score ===",
    farmSection: "--- Farm ---",
    livestockSection: "--- Livestock ---",
    cropsSection: "--- Crops ---",
    familySection: "--- Family & Home ---",
    bonusSection: "--- Bonus ---",
    unusedSpaces: "Unused Spaces",
    familyMembers: "Family Members",
    fencedStables: "Fenced Stables",
    totalScoreLabel: "Total Score",
  },
  ja: {
    // App
    appTitle: "アグリコラ スコア計算",
    pageTitle: "アグリコラ スコア計算",

    // Sections
    farm: "農場",
    livestock: "家畜",
    crops: "作物",
    familyAndHome: "家族と住居",
    bonus: "ボーナス",

    // Farm
    fields: "畑",
    pastures: "牧場",
    unused: "未使用",

    // Livestock
    sheep: "羊",
    boars: "猪",
    cattle: "牛",

    // Crops
    grain: "小麦",
    vegetables: "野菜",

    // Family & Home
    family: "家族",
    clayRooms: "レンガの部屋",
    stoneRooms: "石の部屋",

    // Bonus
    stables: "厩",
    beggingCards: "物乞いカード",
    bonusPoints: "ボーナス点",
    penaltyPoints: "ペナルティ点",

    // Score Display
    totalScore: "合計スコア",
    total: "合計",

    // Score Breakdown (short labels)
    clay: "レンガ",
    stone: "石",
    begging: "物乞い",
    bonusLabel: "ボーナス",
    penaltyLabel: "ペナルティ",

    // Controls
    copyScore: "スコアをコピー",
    copied: "コピーしました！",
    resetAll: "リセット",
    resetConfirm: "すべての値をリセットしますか？",

    // Grid
    scoreChange: "スコア変動",

    // Formatters (copy text)
    scoreHeader: "=== アグリコラ スコア ===",
    farmSection: "--- 農場 ---",
    livestockSection: "--- 家畜 ---",
    cropsSection: "--- 作物 ---",
    familySection: "--- 家族と住居 ---",
    bonusSection: "--- ボーナス ---",
    unusedSpaces: "未使用スペース",
    familyMembers: "家族",
    fencedStables: "厩",
    totalScoreLabel: "合計スコア",
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof (typeof translations)["en"];
