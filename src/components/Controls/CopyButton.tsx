import React, { useState } from 'react';
import { useGame } from '../../hooks/GameContext';
import { formatScoreToText } from '../../utils/formatters';

export const CopyButton: React.FC = () => {
  const { state, score } = useGame();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = formatScoreToText(state, score);

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button className="btn-primary" onClick={handleCopy}>
      {copied ? 'Copied!' : 'Copy Score'}
    </button>
  );
};
