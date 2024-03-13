/**
 *
 * @param {string} children : 버튼 텍스트
 * @param {function} onClick : 버튼 클릭시 동작할 로직
 * @param {string} disabled : disabled 여부. 상위 컴포넌트에서 컨트롤 해야함
 * @param {string} color : 컬러 설정 - violet / white (기본값 violet)
 * @param {string} size : 사이즈 선택 - small / medium / large (기본값 medium)
 * @param {string} type : 버튼 타입 지정 (기본값 button)
 * @returns button
 */

// Todo(심은주) : 기본형 완료. 추후 여유가 된다면 호버 액션 추가
export default function CtaDefault({
  children,
  onClick,
  disabled,
  color,
  size,
  type = 'button',
}) {
  const COLOR_VIOLET = 'bg-violet_5534DA text-white border-transparent';
  const COLOR_WHITE = 'bg-white text-violet_5534DA  border-gray_D9D9D9';

  const sizeStyles = {
    small:
      'md:text-sm sm:text-xs rounded lg:w-[84px] lg:h-[32px] md:w-[72px] md:h-[30px] sm:w-[109px] sm:h-[28px]',
    medium:
      'md:text-base sm:text-sm rounded w-full md:w-[120px] md:h-[48px] sm:w-[138px] sm:h-[48px]',
    large: 'text-lg rounded-lg w-full h-[50px]',
  };

  const sizeClass = sizeStyles[size] || sizeStyles.medium;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`button-reset font-medium disabled:text-white disabled:bg-gray_9FA6B2 ${color ? COLOR_WHITE : COLOR_VIOLET} ${sizeClass}`}
    >
      {children}
    </button>
  );
}
