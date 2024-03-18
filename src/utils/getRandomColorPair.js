import { TAG_COLORS } from '@/constants/colors';

export default function getRandomColorPair(previousColor) {
  let newColor;
  do {
    const randomIndex = Math.floor(Math.random() * TAG_COLORS.length);
    newColor = TAG_COLORS[randomIndex];
  } while (
    newColor.background === previousColor?.background &&
    newColor.text === previousColor?.text
  );

  return newColor;
}
