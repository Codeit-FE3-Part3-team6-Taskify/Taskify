/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// Todo(조예진) : 완성
export default function Avatar({
  size = 'medium',
  text,
  onClick,
  backgroundColor,
  textColorRed,
}) {
  const bgColor = backgroundColor || '#A3C4A2';
  const sizes = {
    small: '24px',
    medium: '26px',
    large: '38px',
  };
  const avatarSize = sizes[size] || sizes.medium; // 기본값 'medium'

  return (
    <div
      className="flex items-center justify-center rounded-full border-2 border-white_FFFFFF"
      style={{
        backgroundColor: `${bgColor}`,
        width: avatarSize,
        height: avatarSize,
      }}
    >
      <span
        className={`relative ${textColorRed ? 'text-[#D25B68]' : 'text-white_FFFFFF'} text-base font-semibold`}
        onClick={onClick}
      >
        {text}
      </span>
    </div>
  );
}
