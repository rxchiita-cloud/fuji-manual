
import React from 'react';

interface FuriganaTextProps {
  text: string;
}

/**
 * Parses text in the format [漢字]{かんじ} and renders it using <ruby> tags.
 * Regular text is rendered as is.
 */
export const FuriganaText: React.FC<FuriganaTextProps> = ({ text }) => {
  if (!text) return null;

  // Split by [kanji]{reading} pattern
  // Example: "これは[漢字]{かんじ}です" -> ["これは", "[漢字]{かんじ}", "です"]
  const parts = text.split(/(\[.*?\]\{.*?\})/g);

  return (
    <>
      {parts.map((part, index) => {
        // Match [kanji]{reading}
        const match = part.match(/^\[(.*?)\]\{(.*?)\}$/);
        if (match) {
          const [, kanji, reading] = match;
          return (
            <ruby key={index}>
              {kanji}
              <rt className="text-[0.6em] text-slate-500 font-medium">{reading}</rt>
            </ruby>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};
