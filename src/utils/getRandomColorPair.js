import { TAG_COLORS } from '@/constants/colors';

export default function getRandomColorPair(previousColorIndex) {
  const availableIndexes = [];
  for (let i = 0; i < TAG_COLORS.length; i++) {
    if (i !== previousColorIndex) {
      availableIndexes.push(i);
    }
  }

  const randomIndex = Math.floor(Math.random() * availableIndexes.length);
  return availableIndexes[randomIndex];
}
