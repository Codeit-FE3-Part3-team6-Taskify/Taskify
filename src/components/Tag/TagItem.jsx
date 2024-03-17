import React, { useState, useEffect } from 'react';
import getRandomColorPair from '@/utils/getRandomColorPair';

export default function TagItem({ tag, onDelete }) {
  const [color, setColor] = useState({});

  useEffect(() => {
    const newColor = getRandomColorPair(color);
    setColor(newColor);
  }, []);

  return (
    <div
      className="flex justify-between items-center py-1 px-[6px] whitespace-nowrap rounded text-[10px] font-normal"
      style={{ backgroundColor: color?.background, color: color?.text }}
    >
      <span>{tag}</span>
      <button
        onClick={() => onDelete(tag)}
        className="ml-2 w-4 h-4 flex justify-center items-center rounded-full bg-white"
        style={{ color: color?.text }}
      >
        &times;
      </button>
    </div>
  );
}
