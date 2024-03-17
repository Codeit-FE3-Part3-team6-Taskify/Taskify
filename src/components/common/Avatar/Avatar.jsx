/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// Todo(조예진) : 완성
export default function Avatar({
  text,
  onClick,
  backgroundColor,
  textColorRed,
}) {
  const bgColor = backgroundColor || '#A3C4A2';
  return (
    <div
      className="flex items-center justify-center rounded-full w-[38px] h-[38px] border-2 border-white_FFFFFF"
      style={{ backgroundColor: `${bgColor}` }}
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
