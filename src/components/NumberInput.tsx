import React, { useId } from "react";
import { GridVisualization } from "./Visualization/GridVisualization";
import { useLanguage } from "../i18n/LanguageContext";

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label: string;
  icon?: React.ReactNode;
  showGrid?: boolean;
  gridThresholds?: number[];
}

export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  min = 0,
  max = 999,
  label,
  icon,
  showGrid = false,
  gridThresholds = [],
}) => {
  const { t } = useLanguage();
  const inputId = useId();

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    } else if (e.target.value === "") {
      onChange(min);
    }
  };

  return (
    <div className="input-group-with-grid">
      <div className="input-group">
        <label className="input-label" htmlFor={inputId}>
          <span className="input-icon" aria-hidden="true">
            {icon}
          </span>
          {label}
        </label>
        <div className="number-input-container">
          <button
            className="btn-adjust"
            onClick={handleDecrement}
            disabled={value <= min}
            type="button"
            aria-label={t("decrease").replace("{label}", label)}
          >
            −
          </button>
          <input
            id={inputId}
            type="number"
            inputMode="numeric"
            className="number-input"
            value={value}
            onChange={handleInputChange}
            min={min}
            max={max}
          />
          <button
            className="btn-adjust"
            onClick={handleIncrement}
            disabled={value >= max}
            type="button"
            aria-label={t("increase").replace("{label}", label)}
          >
            +
          </button>
        </div>
      </div>
      {showGrid && (
        <div className="grid-visualization-container">
          <GridVisualization current={value} thresholds={gridThresholds} />
        </div>
      )}
    </div>
  );
};
