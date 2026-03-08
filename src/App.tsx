import React from "react";
import { GameProvider } from "./hooks/GameContext";
import { FarmInput } from "./components/InputSection/FarmInput";
import { LivestockInput } from "./components/InputSection/LivestockInput";
import { CropInput } from "./components/InputSection/CropInput";
import { FamilyInput } from "./components/InputSection/FamilyInput";
import { BonusInput } from "./components/InputSection/BonusInput";
import { TotalScore } from "./components/ScoreDisplay/TotalScore";
import { ScoreBreakdown } from "./components/ScoreDisplay/ScoreBreakdown";
import { FixedTotalScore } from "./components/ScoreDisplay/FixedTotalScore";
import { ResetButton } from "./components/Controls/ResetButton";
import { CopyButton } from "./components/Controls/CopyButton";
import { ShareImageButton } from "./components/Controls/ShareImageButton";
import { LanguageSwitcher } from "./components/Controls/LanguageSwitcher";
import { useLanguage } from "./i18n/LanguageContext";
import "./App.css";

function App() {
  const { t } = useLanguage();

  return (
    <GameProvider>
      <div className="app">
        <header className="app-header">
          <h1>{t("appTitle")}</h1>
          <LanguageSwitcher />
        </header>

        <main className="container">
          <div className="app-content">
            <div className="input-section">
              <FarmInput />
              <LivestockInput />
              <CropInput />
              <FamilyInput />
              <BonusInput />
            </div>

            <div className="score-section">
              <div className="card">
                <TotalScore />
                <ScoreBreakdown />
                <div className="controls">
                  <CopyButton />
                  <ShareImageButton />
                  <ResetButton />
                </div>
              </div>
            </div>
          </div>
        </main>
        <FixedTotalScore />
      </div>
    </GameProvider>
  );
}

export default App;
