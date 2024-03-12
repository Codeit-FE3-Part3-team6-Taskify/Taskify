export default function CtaDefault({
  children,
  onClick,
  disabled,
  color,
  size,
  type = 'button',
}) {
  const colorViolet = 'bg-violet_5534DA text-white border-transparent';
  const colorWhite = 'bg-white text-violet_5534DA border border-gray_D9D9D9';

  const sizeStyles = {
    small:
      'text-sm rounded w-[84px] h-[32px] lg:w-[72px] lg:h-[30px] md:w-[109px] md:h-[28px]',
    medium: 'text-base rounded w-[120px] h-[48px] md:w-[138px] md:h-[48px]',
    large: 'text-lg rounded-lg w-full h-[50px]',
  };

  const sizeClass = sizeStyles[size] || sizeStyles.medium;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`outline-none font-medium border-solid disabled:text-white disabled:bg-gray_9FA6B2 ${color ? colorWhite : colorViolet} ${sizeClass}`}
    >
      {children}
    </button>
  );
}
