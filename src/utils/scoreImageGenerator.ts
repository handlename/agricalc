import { GameState } from "../types/game";
import { ScoreSummary, ScoreBreakdown } from "../types/score";
import { Language, translations, TranslationKey } from "../i18n/translations";
import { formatScore } from "./formatters";

// X/Twitter link card compatible aspect ratio (~1.91:1)
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 314;
const PADDING = 16;
const GRID_GAP = 5;
const COLS = 3;
const ROWS = 5;
const HEADER_H = 76;
const FOOTER_H = 18;
const ICON_SIZE = 18;

const COLORS = {
  background: "#f5f3f0",
  cardBg: "#ffffff",
  primary: "#4a5f3a",
  secondary: "#8b7355",
  accent: "#d4a373",
  textPrimary: "#2c3e50",
  textSecondary: "#5a6c7d",
  success: "#52c41a",
  error: "#f5222d",
  border: "#e0e0e0",
};

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

// Section accent colors for left border of each row
const SECTION_ACCENT = [
  "#8b7355", // Row 0: Farm
  "#d4a373", // Row 1: Livestock
  "#4a5f3a", // Row 2: Crops + Family
  "#708090", // Row 3: Home + Stables
  "#bc6c25", // Row 4: Bonus
];

interface ItemDef {
  scoreKey: keyof ScoreBreakdown;
  labelKey: TranslationKey;
  iconKey: string;
  iconColor: string;
}

const GRID_ITEMS: ItemDef[] = [
  // Row 0: Farm
  { scoreKey: "fields", labelKey: "fields", iconKey: "fields", iconColor: "#8B4513" },
  { scoreKey: "pastures", labelKey: "pastures", iconKey: "pastures", iconColor: "#4a5f3a" },
  { scoreKey: "unusedSpaces", labelKey: "unused", iconKey: "unused", iconColor: "#666666" },
  // Row 1: Livestock
  { scoreKey: "sheep", labelKey: "sheep", iconKey: "sheep", iconColor: "#c0c0c0" },
  { scoreKey: "boars", labelKey: "boars", iconKey: "boar", iconColor: "#8B4513" },
  { scoreKey: "cattle", labelKey: "cattle", iconKey: "cattle", iconColor: "#8B4513" },
  // Row 2: Crops + Family
  { scoreKey: "grain", labelKey: "grain", iconKey: "grain", iconColor: "#D4A373" },
  { scoreKey: "vegetables", labelKey: "vegetables", iconKey: "vegetable", iconColor: "#FF7F50" },
  { scoreKey: "familyMembers", labelKey: "family", iconKey: "family", iconColor: "#2c3e50" },
  // Row 3: Home + Stables
  { scoreKey: "clayRooms", labelKey: "clay", iconKey: "clayRoom", iconColor: "#BC6C25" },
  { scoreKey: "stoneRooms", labelKey: "stone", iconKey: "stoneRoom", iconColor: "#708090" },
  { scoreKey: "fencedStables", labelKey: "stables", iconKey: "stable", iconColor: "#8B4513" },
  // Row 4: Bonus
  { scoreKey: "beggingCards", labelKey: "begging", iconKey: "begging", iconColor: "#8b4513" },
  { scoreKey: "bonusPoints", labelKey: "bonusLabel", iconKey: "plus", iconColor: "#22c55e" },
  { scoreKey: "penaltyPoints", labelKey: "penaltyLabel", iconKey: "minus", iconColor: "#ef4444" },
];

function getIconSvgContent(key: string, c: string): string {
  switch (key) {
    case "fields":
      return `<rect x="2" y="2" width="20" height="20" stroke="${c}" stroke-width="2" fill="none"/><line x1="8" y1="2" x2="8" y2="22" stroke="${c}" stroke-width="1"/><line x1="16" y1="2" x2="16" y2="22" stroke="${c}" stroke-width="1"/><line x1="2" y1="8" x2="22" y2="8" stroke="${c}" stroke-width="1"/><line x1="2" y1="16" x2="22" y2="16" stroke="${c}" stroke-width="1"/>`;
    case "pastures":
      return `<rect x="2" y="2" width="20" height="20" stroke="${c}" stroke-width="2" stroke-dasharray="3 2" fill="none"/><path d="M 7 22 Q 12 16 17 22" stroke="${c}" stroke-width="1.5" fill="none"/>`;
    case "unused":
      return `<line x1="6" y1="6" x2="18" y2="18" stroke="${c}" stroke-width="2" stroke-linecap="round"/><line x1="18" y1="6" x2="6" y2="18" stroke="${c}" stroke-width="2" stroke-linecap="round"/>`;
    case "sheep":
      return `<ellipse cx="12" cy="12" rx="8" ry="6" fill="${c}" stroke="#333" stroke-width="1.5"/><circle cx="9" cy="11" r="0.8" fill="#333"/><circle cx="15" cy="11" r="0.8" fill="#333"/><rect x="8" y="16" width="2" height="4" fill="#333" rx="0.5"/><rect x="14" y="16" width="2" height="4" fill="#333" rx="0.5"/><ellipse cx="12" cy="7" rx="3" ry="2.5" fill="${c}" stroke="#333" stroke-width="1"/>`;
    case "boar":
      return `<ellipse cx="12" cy="13" rx="7" ry="5" fill="${c}" stroke="#333" stroke-width="1.5"/><rect x="8" y="16" width="2" height="3" fill="#333" rx="0.5"/><rect x="14" y="16" width="2" height="3" fill="#333" rx="0.5"/><ellipse cx="12" cy="9" rx="3.5" ry="3" fill="${c}" stroke="#333" stroke-width="1"/><circle cx="10" cy="9" r="0.6" fill="#333"/><circle cx="14" cy="9" r="0.6" fill="#333"/><ellipse cx="12" cy="10.5" rx="1.5" ry="1" fill="#FFB6C1"/><circle cx="11" cy="10.5" r="0.3" fill="#333"/><circle cx="13" cy="10.5" r="0.3" fill="#333"/>`;
    case "cattle":
      return `<ellipse cx="12" cy="14" rx="7" ry="5" fill="${c}" stroke="#333" stroke-width="1.5"/><rect x="7" y="17" width="2" height="3" fill="#333" rx="0.5"/><rect x="15" y="17" width="2" height="3" fill="#333" rx="0.5"/><ellipse cx="12" cy="9" rx="4" ry="3" fill="${c}" stroke="#333" stroke-width="1"/><path d="M 7 7 L 6 5" stroke="#333" stroke-width="1.5" stroke-linecap="round"/><path d="M 17 7 L 18 5" stroke="#333" stroke-width="1.5" stroke-linecap="round"/><circle cx="10" cy="9" r="0.6" fill="#333"/><circle cx="14" cy="9" r="0.6" fill="#333"/><ellipse cx="12" cy="11" rx="1.8" ry="1" fill="#FFB6C1"/><circle cx="11" cy="11" r="0.3" fill="#333"/><circle cx="13" cy="11" r="0.3" fill="#333"/>`;
    case "grain":
      return `<line x1="12" y1="20" x2="12" y2="8" stroke="${c}" stroke-width="2"/><path d="M 12 8 L 9 6" stroke="${c}" stroke-width="1.5"/><path d="M 12 8 L 15 6" stroke="${c}" stroke-width="1.5"/><path d="M 12 10 L 9 8" stroke="${c}" stroke-width="1.5"/><path d="M 12 10 L 15 8" stroke="${c}" stroke-width="1.5"/><path d="M 12 12 L 9 10" stroke="${c}" stroke-width="1.5"/><path d="M 12 12 L 15 10" stroke="${c}" stroke-width="1.5"/><ellipse cx="9" cy="6" rx="1.5" ry="2" fill="${c}"/><ellipse cx="15" cy="6" rx="1.5" ry="2" fill="${c}"/><ellipse cx="9" cy="8" rx="1.5" ry="2" fill="${c}"/><ellipse cx="15" cy="8" rx="1.5" ry="2" fill="${c}"/><ellipse cx="9" cy="10" rx="1.5" ry="2" fill="${c}"/><ellipse cx="15" cy="10" rx="1.5" ry="2" fill="${c}"/><ellipse cx="12" cy="5" rx="1.5" ry="2" fill="${c}"/>`;
    case "vegetable":
      return `<path d="M 12 20 L 9 8 Q 12 6 15 8 L 12 20 Z" fill="${c}" stroke="#333" stroke-width="1.5"/><path d="M 12 8 Q 10 4 8 5 Q 10 6 12 8" fill="#4CAF50" stroke="#2E7D32" stroke-width="1"/><path d="M 12 8 Q 14 4 16 5 Q 14 6 12 8" fill="#4CAF50" stroke="#2E7D32" stroke-width="1"/>`;
    case "family":
      return `<circle cx="12" cy="6" r="2" fill="${c}"/><path d="M 12 9 L 12 15 M 12 11 L 9 13 M 12 11 L 15 13 M 12 15 L 10 20 M 12 15 L 14 20" stroke="${c}" stroke-width="2" stroke-linecap="round" fill="none"/>`;
    case "clayRoom":
      return `<rect x="3" y="8" width="18" height="12" stroke="${c}" stroke-width="2" fill="${c}" fill-opacity="0.3"/><line x1="3" y1="12" x2="21" y2="12" stroke="${c}" stroke-width="1"/><line x1="3" y1="16" x2="21" y2="16" stroke="${c}" stroke-width="1"/><line x1="9" y1="8" x2="9" y2="20" stroke="${c}" stroke-width="1"/><line x1="15" y1="8" x2="15" y2="20" stroke="${c}" stroke-width="1"/><path d="M 3 8 L 12 4 L 21 8" stroke="${c}" stroke-width="2" fill="none"/>`;
    case "stoneRoom":
      return `<rect x="3" y="8" width="18" height="12" stroke="${c}" stroke-width="2" fill="${c}" fill-opacity="0.3"/><rect x="4" y="9" width="5" height="3" stroke="${c}" stroke-width="1" fill="${c}" fill-opacity="0.5"/><rect x="10" y="9" width="4" height="3" stroke="${c}" stroke-width="1" fill="${c}" fill-opacity="0.5"/><rect x="15" y="9" width="5" height="3" stroke="${c}" stroke-width="1" fill="${c}" fill-opacity="0.5"/><rect x="4" y="13" width="4" height="3" stroke="${c}" stroke-width="1" fill="${c}" fill-opacity="0.5"/><rect x="9" y="13" width="6" height="3" stroke="${c}" stroke-width="1" fill="${c}" fill-opacity="0.5"/><rect x="16" y="13" width="4" height="3" stroke="${c}" stroke-width="1" fill="${c}" fill-opacity="0.5"/><rect x="4" y="17" width="5" height="2" stroke="${c}" stroke-width="1" fill="${c}" fill-opacity="0.5"/><rect x="10" y="17" width="4" height="2" stroke="${c}" stroke-width="1" fill="${c}" fill-opacity="0.5"/><rect x="15" y="17" width="5" height="2" stroke="${c}" stroke-width="1" fill="${c}" fill-opacity="0.5"/><path d="M 3 8 L 12 4 L 21 8" stroke="${c}" stroke-width="2" fill="none"/>`;
    case "stable":
      return `<rect x="5" y="10" width="14" height="10" stroke="${c}" stroke-width="2" fill="${c}" fill-opacity="0.2"/><path d="M 5 10 L 12 6 L 19 10" stroke="${c}" stroke-width="2" fill="none" stroke-linecap="round"/><rect x="10" y="14" width="4" height="6" stroke="${c}" stroke-width="1.5" fill="${c}" fill-opacity="0.4"/><line x1="2" y1="20" x2="5" y2="20" stroke="${c}" stroke-width="1.5"/><line x1="19" y1="20" x2="22" y2="20" stroke="${c}" stroke-width="1.5"/><line x1="2" y1="16" x2="5" y2="16" stroke="${c}" stroke-width="1.5"/><line x1="19" y1="16" x2="22" y2="16" stroke="${c}" stroke-width="1.5"/><line x1="2" y1="16" x2="2" y2="20" stroke="${c}" stroke-width="1.5"/><line x1="22" y1="16" x2="22" y2="20" stroke="${c}" stroke-width="1.5"/>`;
    case "begging":
      return `<rect x="5" y="3" width="14" height="18" rx="2" stroke="${c}" stroke-width="2" fill="${c}" fill-opacity="0.1"/><circle cx="12" cy="8" r="2" stroke="${c}" stroke-width="1.5" fill="none"/><path d="M9 12 C9 12, 10 11, 12 11 C14 11, 15 12, 15 12" stroke="${c}" stroke-width="1.5" fill="none"/><circle cx="8" cy="16" r="1" fill="${c}"/><circle cx="12" cy="17" r="1" fill="${c}"/><circle cx="16" cy="16" r="1" fill="${c}"/>`;
    case "plus":
      return `<circle cx="12" cy="12" r="10" stroke="${c}" stroke-width="2" fill="${c}" fill-opacity="0.1"/><line x1="12" y1="8" x2="12" y2="16" stroke="${c}" stroke-width="2"/><line x1="8" y1="12" x2="16" y2="12" stroke="${c}" stroke-width="2"/>`;
    case "minus":
      return `<circle cx="12" cy="12" r="10" stroke="${c}" stroke-width="2" fill="${c}" fill-opacity="0.1"/><line x1="8" y1="12" x2="16" y2="12" stroke="${c}" stroke-width="2"/>`;
    default:
      return "";
  }
}

function buildIconSvg(iconKey: string, color: string): string {
  const content = getIconSvgContent(iconKey, color);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${ICON_SIZE}" height="${ICON_SIZE}" fill="none">${content}</svg>`;
}

function loadSvgImage(svg: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  });
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export async function generateScoreImage(
  _state: GameState,
  score: ScoreSummary,
  language: Language
): Promise<HTMLCanvasElement> {
  const t = translations[language];

  // Load all icon images in parallel
  const iconImages = await Promise.all(
    GRID_ITEMS.map((item) => {
      const svg = buildIconSvg(item.iconKey, item.iconColor);
      return loadSvgImage(svg);
    })
  );

  // Create canvas with 2x DPI for retina
  const canvas = document.createElement("canvas");
  const dpr = window.devicePixelRatio || 2;
  canvas.width = CANVAS_WIDTH * dpr;
  canvas.height = CANVAS_HEIGHT * dpr;
  canvas.style.width = `${CANVAS_WIDTH}px`;
  canvas.style.height = `${CANVAS_HEIGHT}px`;

  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);

  // Background
  ctx.fillStyle = COLORS.background;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Header gradient
  const headerGrad = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, HEADER_H);
  headerGrad.addColorStop(0, COLORS.primary);
  headerGrad.addColorStop(1, COLORS.secondary);
  ctx.fillStyle = headerGrad;
  ctx.fillRect(0, 0, CANVAS_WIDTH, HEADER_H);

  // Header: "Total Score" label
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = `13px ${FONT}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(t.totalScore, CANVAS_WIDTH / 2, 14);

  // Header: score number
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold 38px ${FONT}`;
  ctx.textBaseline = "top";
  ctx.fillText(String(score.total), CANVAS_WIDTH / 2, 32);

  // Grid layout
  const gridLeft = PADDING;
  const gridWidth = CANVAS_WIDTH - PADDING * 2;
  const gridTop = HEADER_H + 6;
  const gridBottom = CANVAS_HEIGHT - FOOTER_H - 2;
  const gridHeight = gridBottom - gridTop;

  const cellW = (gridWidth - (COLS - 1) * GRID_GAP) / COLS;
  const cellH = (gridHeight - (ROWS - 1) * GRID_GAP) / ROWS;

  for (let i = 0; i < GRID_ITEMS.length; i++) {
    const item = GRID_ITEMS[i];
    const row = Math.floor(i / COLS);
    const col = i % COLS;

    const cx = gridLeft + col * (cellW + GRID_GAP);
    const cy = gridTop + row * (cellH + GRID_GAP);

    // Cell shadow
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.06)";
    ctx.shadowBlur = 3;
    ctx.shadowOffsetY = 1;

    // Cell background
    drawRoundedRect(ctx, cx, cy, cellW, cellH, 5);
    ctx.fillStyle = COLORS.cardBg;
    ctx.fill();

    ctx.restore();

    // Section accent (left bar, clipped to rounded rect)
    ctx.save();
    drawRoundedRect(ctx, cx, cy, cellW, cellH, 5);
    ctx.clip();
    ctx.fillStyle = SECTION_ACCENT[row];
    ctx.fillRect(cx, cy, 3, cellH);
    ctx.restore();

    // Icon
    const iconX = cx + 10;
    const iconY = cy + (cellH - ICON_SIZE) / 2;
    ctx.drawImage(iconImages[i], iconX, iconY, ICON_SIZE, ICON_SIZE);

    // Label
    const labelX = iconX + ICON_SIZE + 6;
    const textY = cy + cellH / 2;
    ctx.fillStyle = COLORS.textSecondary;
    ctx.font = `14px ${FONT}`;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(t[item.labelKey], labelX, textY);

    // Score value
    const scoreValue = score.breakdown[item.scoreKey];
    const formatted = formatScore(scoreValue);
    ctx.fillStyle =
      scoreValue < 0
        ? COLORS.error
        : scoreValue > 0
          ? COLORS.success
          : COLORS.textPrimary;
    ctx.font = `bold 16px ${FONT}`;
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillText(formatted, cx + cellW - 10, textY);
  }

  // Footer
  ctx.fillStyle = COLORS.textSecondary;
  ctx.font = `10px ${FONT}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillText(t.appTitle, CANVAS_WIDTH / 2, CANVAS_HEIGHT - 4);

  return canvas;
}

export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to create image blob"));
      },
      "image/png"
    );
  });
}
