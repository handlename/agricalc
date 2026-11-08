/**
 * 木製コマ風アイコンの定義。
 *
 * 各アイコンは 64x64 の viewBox 上のレイヤー列で表現する。
 * - piece: 木製コマの部品。ベベル（立体感）と落ち影のフィルターを適用する
 * - detail: 彫り込み・目・模様などの細部。フィルターは適用しない
 *
 * React コンポーネント（WoodIcon）と共有画像生成（scoreImageGenerator）の
 * 両方がこの定義から SVG を生成するため、見た目は常に一致する。
 */

export type IconName =
  | "field"
  | "pasture"
  | "unused"
  | "sheep"
  | "boar"
  | "cattle"
  | "grain"
  | "vegetable"
  | "family"
  | "clayRoom"
  | "stoneRoom"
  | "stable"
  | "begging"
  | "plus"
  | "minus";

interface IconLayer {
  kind: "piece" | "detail";
  d: string;
  color: string;
  /** 指定時は塗りではなく線として描画する */
  strokeWidth?: number;
  transform?: string;
}

const INK = "#3a2716";

const ellipse = (cx: number, cy: number, rx: number, ry: number) =>
  `M${cx - rx} ${cy}a${rx} ${ry} 0 1 0 ${2 * rx} 0a${rx} ${ry} 0 1 0 ${-2 * rx} 0Z`;
const circle = (cx: number, cy: number, r: number) => ellipse(cx, cy, r, r);

/** 封蝋のような波形の円 */
function scallop(cx: number, cy: number, r: number, n: number): string {
  let d = "";
  for (let i = 0; i <= n * 2; i++) {
    const a = (Math.PI * i) / n;
    const rr = i % 2 ? r : r - 2.5;
    d += `${i ? "L" : "M"}${(cx + rr * Math.cos(a)).toFixed(2)} ${(cy + rr * Math.sin(a)).toFixed(2)}`;
  }
  return `${d}Z`;
}

/** 麦の穂 */
function wheatEar(cx: number, cy: number, angle: number): IconLayer {
  return {
    kind: "piece",
    color: "#d9a93a",
    transform: `rotate(${angle} ${cx} ${cy})`,
    d:
      ellipse(cx, cy - 9, 2.4, 4) +
      ellipse(cx - 3, cy - 4, 2.4, 4) +
      ellipse(cx + 3, cy - 4, 2.4, 4) +
      ellipse(cx - 3, cy + 2, 2.4, 4) +
      ellipse(cx + 3, cy + 2, 2.4, 4),
  };
}

const piece = (color: string, d: string, extra?: Partial<IconLayer>): IconLayer => ({
  kind: "piece",
  color,
  d,
  ...extra,
});
const detail = (color: string, d: string, strokeWidth?: number): IconLayer => ({
  kind: "detail",
  color,
  d,
  strokeWidth,
});

const ICONS: Record<IconName, IconLayer[]> = {
  field: [
    piece("#8a5a33", "M16 16H48L58 52H6Z"),
    detail("#5e3b20", "M24 16L18 52M32 16V52M40 16L46 52M12 34H52", 2),
    piece(
      "#7a9a3c",
      "M21 28l-2-4M21 28l2-4M43 28l-2-4M43 28l2-4M32 44l-2-4M32 44l2-4M17 44l-2-4M17 44l2-4M47 44l-2-4M47 44l2-4",
      { strokeWidth: 2.2 }
    ),
  ],
  pasture: [
    piece("#a8743f", "M5 25H59V31H5ZM5 39H59V45H5Z"),
    piece("#a8743f", "M10 22L13 15L16 22V55H10ZM29 22L32 15L35 22V55H29ZM48 22L51 15L54 22V55H48Z"),
    piece(
      "#6f8f3a",
      "M3 58Q6 49 9 56Q11 47 14 56Q18 50 21 56Q24 48 27 56Q30 50 33 56Q36 47 39 56Q42 50 45 56Q48 48 51 56Q54 50 57 56Q59 49 61 58Z"
    ),
  ],
  unused: [
    piece("#b59a6e", "M12 10H52Q56 10 56 14V50Q56 54 52 54H12Q8 54 8 50V14Q8 10 12 10Z"),
    detail("#8a7350", "M14 18l6 4l-2 6M50 46l-5-3l1-5M44 14l-2 5", 1.8),
    piece("#8c8a82", ellipse(20, 42, 4.5, 3.2) + ellipse(46, 24, 3.4, 2.6)),
    piece("#6f8f3a", "M36 46Q34 38 29 35Q35 36 37 41Q38 33 43 30Q39 37 39.5 46Z"),
  ],
  sheep: [
    piece("#3b2e25", "M22 40h4v15h-4zM30 42h4v13h-4zM41 42h4v13h-4zM48 40h4v15h-4z"),
    piece(
      "#efe8d8",
      circle(26, 30, 10) + circle(37, 25, 11) + circle(47, 30, 10) + circle(31, 38, 9) + circle(43, 38, 9) + circle(51, 36, 7)
    ),
    detail("#b8ab90", "M33 25a3 3 0 0 1 5 0M41 33a3 3 0 0 1 5 0M28 36a3 3 0 0 1 5 0", 1.4),
    piece("#3b2e25", ellipse(15, 31, 7, 8.5)),
    piece("#3b2e25", ellipse(21, 24, 4, 2.2)),
    detail("#f3ead6", circle(12.5, 29, 1.5)),
  ],
  boar: [
    piece("#4a3226", "M22 42h5v12h-5zM30 43h5v11h-5zM42 43h5v11h-5zM50 41h5v13h-5z"),
    piece("#4a3226", ellipse(39, 34, 18, 12)),
    piece("#4a3226", "M26 25L11 33Q7 35 8 38L9 41Q10 44 13 44L27 44Z"),
    piece("#4a3226", "M21 26L24 16L29 25Z"),
    piece("#c98b7a", ellipse(8.6, 39.5, 2.2, 3.2)),
    piece("#f3ead6", "M13 42q-4-3-1-8q0 4 3 6z"),
    detail("#2a1b14", "M28 23l2-3l2 3l2-3l2 3l2-3l2 3l2-3l2 3l2-3l2 3", 1.5),
    detail("#f3ead6", circle(18, 32, 1.4)),
    detail("#4a3226", "M57 31q4-3 3 1q-1 3 2 2", 1.6),
  ],
  cattle: [
    piece("#8a4b2c", "M20 42h5v13h-5zM27 43h5v12h-5zM43 43h5v12h-5zM50 42h5v13h-5z"),
    piece("#8a4b2c", "M20 22H50Q58 22 58 30V40Q58 46 52 46H22Q16 46 16 40V26Q16 22 20 22Z"),
    piece("#efe3cc", "M34 24q6-1 8 4q1 6-5 7q-6 0-6-5q0-4 3-6zM48 34q5 0 5 4q0 4-4 4q-4-1-4-4q0-3 3-4z"),
    detail("#8a4b2c", "M58 28q4 4 2 12", 1.8),
    piece("#8a4b2c", "M6 20Q6 16 10 16H18Q22 16 22 20V32Q22 38 16 38H12Q6 38 6 32Z"),
    piece("#d9a58f", "M6 30H22V33Q22 38 16 38H12Q6 38 6 33Z"),
    detail("#efe3cc", "M9 17Q4 14 6 9M19 17Q24 14 22 9", 2.4),
    detail("#1f140d", circle(11, 24, 1.4) + circle(17, 24, 1.4)),
  ],
  grain: [
    piece("#b8862a", "M32 58V24M32 58Q30 42 21 27M32 58Q34 42 43 27", { strokeWidth: 2.5 }),
    wheatEar(32, 18, 0),
    wheatEar(19, 22, -30),
    wheatEar(45, 22, 30),
    piece("#8a5a33", "M26 44h12v5h-12z"),
  ],
  vegetable: [
    piece("#e07b22", ellipse(21, 40, 11, 14) + ellipse(43, 40, 11, 14)),
    piece("#e07b22", ellipse(32, 40, 12, 16)),
    detail("#a9561a", "M32 25Q27 40 32 55M32 25Q37 40 32 55", 1.5),
    piece("#5b7a2e", "M30 25Q29 16 34 11L36 13Q33 17 34 25Z"),
    piece("#6f8f3a", "M35 17Q46 8 53 16Q44 23 35 17Z"),
  ],
  family: [
    piece("#b5452d", circle(32, 13, 9)),
    piece(
      "#b5452d",
      "M20 26H44Q50 26 52 32L56 44Q57 48 53 48H47L48 58H36L32 50L28 58H16L17 48H11Q7 48 8 44L12 32Q14 26 20 26Z"
    ),
  ],
  clayRoom: [
    piece("#c0703f", "M10 30H54V56H10Z"),
    detail("#934f28", "M14 46h7M40 49h8M15 52h5", 1.6),
    piece("#5a3420", "M27 56V43Q32 36 37 43V56Z"),
    detail(INK, "M42 35h7v6h-7z"),
    piece("#d4b062", "M4 32L32 8L60 32Z"),
    detail("#a8873e", "M14 28L32 13L50 28M22 30L32 21L42 30", 1.5),
  ],
  stoneRoom: [
    piece("#9a9a94", "M10 30H54V56H10Z"),
    detail(
      "#5f5f5a",
      "M10 37H54M10 44H54M10 51H54M18 30V37M42 30V37M14 37V44M50 37V44M20 44V51M46 44V51M16 51V56M48 51V56",
      1.4
    ),
    piece("#4a3626", "M27 56V43Q32 36 37 43V56Z"),
    piece("#59636d", "M4 32L32 8L60 32Z"),
    detail("#3d454d", "M16 27H48M24 20H40", 1.4),
  ],
  stable: [
    piece("#a0643a", "M9 32L32 13L55 32V56H9Z"),
    piece("#7a4527", "M20 37H44V56H20Z"),
    detail("#e9d6ae", "M20 37L44 56M44 37L20 56M32 37V56", 2),
    detail(INK, "M28 22h8v7h-8z"),
    piece("#6d3f22", "M4 34L32 9L60 34L57 37L32 15L7 37Z"),
  ],
  begging: [
    piece("#efe2c2", "M15 6H49Q53 6 53 10V54Q53 58 49 58H15Q11 58 11 54V10Q11 6 15 6Z"),
    detail("#8b6b3d", "M16 11H48V53H16Z", 1.3),
    piece("#7a5232", "M19 32H45Q45 45 32 45Q19 45 19 32Z"),
    detail("#7a5232", "M36 18L44 29", 2.4),
    piece("#7a5232", ellipse(35.5, 17, 2.6, 3.6)),
  ],
  plus: [
    piece("#5d7d34", scallop(32, 32, 24, 14)),
    detail("#f3ead6", "M32 21V43M21 32H43", 5),
  ],
  minus: [
    piece("#a33a2a", scallop(32, 32, 24, 14)),
    detail("#f3ead6", "M21 32H43", 5),
  ],
};

/**
 * アイコンの SVG 内部要素（<defs> とレイヤー）を文字列で返す。
 * @param filterId 同一ドキュメント内で一意なフィルター ID
 */
export function buildIconInner(name: IconName, filterId: string): string {
  const defs =
    `<defs><filter id="${filterId}" x="-30%" y="-30%" width="160%" height="160%">` +
    `<feGaussianBlur in="SourceAlpha" stdDeviation="1.3" result="blur"/>` +
    `<feSpecularLighting in="blur" surfaceScale="3" specularConstant="0.75" specularExponent="16" lighting-color="#fff4dc" result="spec">` +
    `<fePointLight x="-30" y="-40" z="70"/></feSpecularLighting>` +
    `<feComposite in="spec" in2="SourceAlpha" operator="in" result="specIn"/>` +
    `<feComposite in="SourceGraphic" in2="specIn" operator="arithmetic" k1="0" k2="1" k3="0.55" k4="0" result="lit"/>` +
    `<feDropShadow in="lit" dx="0" dy="1.6" stdDeviation="0.9" flood-color="#2a1a0e" flood-opacity="0.45"/>` +
    `</filter></defs>`;

  const body = ICONS[name]
    .map(({ kind, d, color, strokeWidth, transform }) => {
      const t = transform ? ` transform="${transform}"` : "";
      const f = kind === "piece" ? ` filter="url(#${filterId})"` : "";
      if (strokeWidth !== undefined) {
        const w = kind === "piece" ? strokeWidth + 0.6 : strokeWidth;
        return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${f}${t}/>`;
      }
      return `<path d="${d}" fill="${color}"${f}${t}/>`;
    })
    .join("");

  return defs + body;
}

/** 単体で完結した SVG 文字列を返す（画像生成用） */
export function buildIconSvg(name: IconName, size: number, filterId = `wood-${name}`): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">${buildIconInner(name, filterId)}</svg>`;
}
