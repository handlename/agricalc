import React from "react";
import { GameProvider } from "./hooks/GameContext";
import { FarmInput } from "./components/InputSection/FarmInput";
import { LivestockInput } from "./components/InputSection/LivestockInput";
import { CropInput } from "./components/InputSection/CropInput";
import { FamilyInput } from "./components/InputSection/FamilyInput";
import { BonusInput } from "./components/InputSection/BonusInput";
import { TotalScore } from "./components/ScoreDisplay/TotalScore";
import { ScoreBreakdown } from "./components/ScoreDisplay/ScoreBreakdown";
import { ResetButton } from "./components/Controls/ResetButton";
import { CopyButton } from "./components/Controls/CopyButton";
import "./App.css";

function App() {
  return (
    <GameProvider>
      <div className="app">
        <header className="app-header">
          <h1>Agricola Score Calculator</h1>
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
                  <ResetButton />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </GameProvider>
  );
}

export default App;
