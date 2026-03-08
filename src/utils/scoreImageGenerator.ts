import { GameState } from "../types/game";
import { ScoreSummary } from "../types/score";
import { Language, translations } from "../i18n/translations";
import { formatScore } from "./formatters";

const CANVAS_WIDTH = 600;
const PADDING = 32;
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

interface ScoreItem {
  label: string;
  value: number;
}

interface ScoreSection {
  title: string;
  items: ScoreItem[];
}

function buildSections(
  state: GameState,
  score: ScoreSummary,
  lang: Language
): ScoreSection[] {
  const t = translations[lang];
  const b = score.breakdown;
  return [
    {
      title: t.farmSection.replace(/---\s*/g, "").trim(),
      items: [
        { label: t.fields, value: b.fields },
        { label: t.pastures, value: b.pastures },
        { label: t.unusedSpaces, value: b.unusedSpaces },
      ],
    },
    {
      title: t.livestockSection.replace(/---\s*/g, "").trim(),
      items: [
        { label: t.sheep, value: b.sheep },
        { label: t.boars, value: b.boars },
        { label: t.cattle, value: b.cattle },
      ],
    },
    {
      title: t.cropsSection.replace(/---\s*/g, "").trim(),
      items: [
        { label: t.grain, value: b.grain },
        { label: t.vegetables, value: b.vegetables },
      ],
    },
    {
      title: t.familySection.replace(/---\s*/g, "").trim(),
      items: [
        { label: t.familyMembers, value: b.familyMembers },
        { label: t.clayRooms, value: b.clayRooms },
        { label: t.stoneRooms, value: b.stoneRooms },
      ],
    },
    {
      title: t.bonusSection.replace(/---\s*/g, "").trim(),
      items: [
        { label: t.fencedStables, value: b.fencedStables },
        { label: t.beggingCards, value: b.beggingCards },
        { label: t.bonusPoints, value: b.bonusPoints },
        { label: t.penaltyPoints, value: b.penaltyPoints },
      ],
    },
  ];
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

export function generateScoreImage(
  state: GameState,
  score: ScoreSummary,
  language: Language
): HTMLCanvasElement {
  const t = translations[language];
  const sections = buildSections(state, score, language);

  // Pre-calculate canvas height
  const HEADER_HEIGHT = 100;
  const SECTION_HEADER = 36;
  const ITEM_ROW = 28;
  const SECTION_GAP = 16;
  const TOTAL_HEIGHT = 60;
  const FOOTER_HEIGHT = 40;

  let contentHeight = HEADER_HEIGHT + PADDING;
  for (const section of sections) {
    contentHeight += SECTION_HEADER + section.items.length * ITEM_ROW + SECTION_GAP;
  }
  contentHeight += TOTAL_HEIGHT + FOOTER_HEIGHT + PADDING;

  const canvas = document.createElement("canvas");
  const dpr = window.devicePixelRatio || 2;
  canvas.width = CANVAS_WIDTH * dpr;
  canvas.height = contentHeight * dpr;
  canvas.style.width = `${CANVAS_WIDTH}px`;
  canvas.style.height = `${contentHeight}px`;

  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);

  // Background
  ctx.fillStyle = COLORS.background;
  ctx.fillRect(0, 0, CANVAS_WIDTH, contentHeight);

  // Header gradient
  const headerGrad = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, HEADER_HEIGHT);
  headerGrad.addColorStop(0, COLORS.primary);
  headerGrad.addColorStop(1, COLORS.secondary);
  drawRoundedRect(ctx, 0, 0, CANVAS_WIDTH, HEADER_HEIGHT, 0);
  ctx.fillStyle = headerGrad;
  ctx.fill();

  // Title
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = "14px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(t.totalScore, CANVAS_WIDTH / 2, 36);

  // Total score
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 40px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(String(score.total), CANVAS_WIDTH / 2, 80);

  // Card area
  const cardX = PADDING;
  const cardY = HEADER_HEIGHT + 16;
  const cardW = CANVAS_WIDTH - PADDING * 2;
  const cardH = contentHeight - HEADER_HEIGHT - 16 - FOOTER_HEIGHT - 8;

  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 10);
  ctx.fillStyle = COLORS.cardBg;
  ctx.fill();
  ctx.strokeStyle = COLORS.border;
  ctx.lineWidth = 1;
  ctx.stroke();

  let y = cardY + 20;
  const leftX = cardX + 20;
  const rightX = cardX + cardW - 20;

  for (const section of sections) {
    // Section header
    ctx.fillStyle = COLORS.primary;
    ctx.font = "bold 13px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(section.title, leftX, y + 14);

    // Separator line
    y += 20;
    ctx.strokeStyle = COLORS.border;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(leftX, y);
    ctx.lineTo(rightX, y);
    ctx.stroke();
    y += 8;

    for (const item of section.items) {
      // Label
      ctx.fillStyle = COLORS.textSecondary;
      ctx.font = "13px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(item.label, leftX + 8, y + 14);

      // Value
      const formatted = formatScore(item.value);
      ctx.fillStyle =
        item.value < 0 ? COLORS.error : item.value > 0 ? COLORS.success : COLORS.textPrimary;
      ctx.font = "bold 13px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(formatted, rightX - 8, y + 14);

      y += ITEM_ROW;
    }

    y += SECTION_GAP;
  }

  // Total bar
  y -= SECTION_GAP;
  y += 4;
  const totalBarH = 36;
  const totalGrad = ctx.createLinearGradient(leftX, y, rightX, y);
  totalGrad.addColorStop(0, COLORS.primary);
  totalGrad.addColorStop(1, COLORS.secondary);
  drawRoundedRect(ctx, leftX, y, rightX - leftX, totalBarH, 6);
  ctx.fillStyle = totalGrad;
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.font = "bold 13px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(t.totalScoreLabel, leftX + 12, y + 23);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(String(score.total), rightX - 12, y + 24);

  // Footer
  ctx.fillStyle = COLORS.textSecondary;
  ctx.font = "11px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(t.appTitle, CANVAS_WIDTH / 2, contentHeight - 12);

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
