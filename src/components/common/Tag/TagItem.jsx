import React, { useState, useEffect } from 'react';
import { TAG_COLORS } from '@/constants/colors';

export default function TagItem({ hasDelete, tag, onDelete }) {
  const [color, setColor] = useState({});

  useEffect(() => {
    const newColorIndex = tag.charAt(tag.length - 1);
    const colorPair = TAG_COLORS[newColorIndex];
    setColor(colorPair);
  }, [tag]);

  return (
    <div
      className="flex justify-between items-center py-1 px-[6px] whitespace-nowrap rounded text-[10px] font-normal"
      style={{ backgroundColor: color?.background, color: color?.text }}
    >
      <span>{tag.slice(0, -1)}</span>
      {hasDelete && (
        <button
          onClick={() => onDelete(tag)}
          className="ml-1 w-4 h-4 flex justify-center items-center rounded-full bg-white"
          style={{ color: color?.text }}
        >
          &times;
        </button>
      )}
    </div>
  );
}
