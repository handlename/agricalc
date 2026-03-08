import React, { useState } from "react";
import { useGame } from "../../hooks/useGame";
import { useLanguage } from "../../i18n/LanguageContext";
import { generateScoreImage, canvasToBlob } from "../../utils/scoreImageGenerator";

export const ShareImageButton: React.FC = () => {
  const { state, score } = useGame();
  const { t, language } = useLanguage();
  const [status, setStatus] = useState<"idle" | "shared" | "copied">("idle");

  const handleShare = async () => {
    const canvas = await generateScoreImage(state, score, language);
    const blob = await canvasToBlob(canvas);
    const file = new File([blob], "agricalc-score.png", { type: "image/png" });

    // Try Web Share API first (mobile / supported browsers)
    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: t("appTitle"),
        });
        setStatus("shared");
        setTimeout(() => setStatus("idle"), 2000);
        return;
      } catch (err) {
        // User cancelled or share failed — fall through to clipboard
        if ((err as DOMException).name === "AbortError") return;
      }
    }

    // Fallback: copy image to clipboard
    try {
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      // Last resort: download the image
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "agricalc-score.png";
      a.click();
      URL.revokeObjectURL(url);
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  const label =
    status === "shared"
      ? t("shared")
      : status === "copied"
        ? t("copiedImage")
        : t("shareImage");

  return (
    <button className="btn-primary" onClick={handleShare}>
      {label}
    </button>
  );
};
