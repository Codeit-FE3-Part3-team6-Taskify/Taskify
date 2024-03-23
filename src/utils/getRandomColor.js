import { BACKGROUND_COLORS } from '@/constants/colors';

export default function getRandomColor() {
  return BACKGROUND_COLORS[
    Math.floor(Math.random() * BACKGROUND_COLORS.length)
  ];
}
