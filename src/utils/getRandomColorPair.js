import { TAG_COLORS } from '@/constants/colors';

export default function getRandomColorPair(previousColorIndex) {
  const availableIndexes = [];
  TAG_COLORS.forEach((_, i) => {
    if (i !== previousColorIndex) {
      availableIndexes.push(i);
    }
  });

  const randomIndex = Math.floor(Math.random() * availableIndexes.length);
  return availableIndexes[randomIndex];
}
