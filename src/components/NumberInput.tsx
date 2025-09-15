import React from 'react';

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: React.ReactNode;
  icon?: React.ReactNode;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  min = 0,
  max = 999,
  label,
  icon
}) => {
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
    } else if (e.target.value === '') {
      onChange(min);
    }
  };

  return (
    <div className="input-group">
      {label && (
        <div className="input-label">
          {icon}
          {label}
        </div>
      )}
      <div className="number-input-container">
        <button
          className="btn-adjust"
          onClick={handleDecrement}
          disabled={value <= min}
          type="button"
        >
          −
        </button>
        <input
          type="number"
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
        >
          +
        </button>
      </div>
    </div>
  );
};
