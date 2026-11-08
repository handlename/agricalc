import { GameState } from "../types/game";
import { ScoreSummary, ScoreBreakdown } from "../types/score";
import { Language, translations, TranslationKey } from "../i18n/translations";
import { formatScore } from "./formatters";
import { buildIconSvg, IconName } from "../components/Icons/iconData";

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
  icon: IconName;
}

const GRID_ITEMS: ItemDef[] = [
  // Row 0: Farm
  { scoreKey: "fields", labelKey: "fields", icon: "field" },
  { scoreKey: "pastures", labelKey: "pastures", icon: "pasture" },
  { scoreKey: "unusedSpaces", labelKey: "unused", icon: "unused" },
  // Row 1: Livestock
  { scoreKey: "sheep", labelKey: "sheep", icon: "sheep" },
  { scoreKey: "boars", labelKey: "boars", icon: "boar" },
  { scoreKey: "cattle", labelKey: "cattle", icon: "cattle" },
  // Row 2: Crops + Family
  { scoreKey: "grain", labelKey: "grain", icon: "grain" },
  { scoreKey: "vegetables", labelKey: "vegetables", icon: "vegetable" },
  { scoreKey: "familyMembers", labelKey: "family", icon: "family" },
  // Row 3: Home + Stables
  { scoreKey: "clayRooms", labelKey: "clay", icon: "clayRoom" },
  { scoreKey: "stoneRooms", labelKey: "stone", icon: "stoneRoom" },
  { scoreKey: "fencedStables", labelKey: "stables", icon: "stable" },
  // Row 4: Bonus
  { scoreKey: "beggingCards", labelKey: "begging", icon: "begging" },
  { scoreKey: "bonusPoints", labelKey: "bonusLabel", icon: "plus" },
  { scoreKey: "penaltyPoints", labelKey: "penaltyLabel", icon: "minus" },
];

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
      return loadSvgImage(buildIconSvg(item.icon, ICON_SIZE));
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
