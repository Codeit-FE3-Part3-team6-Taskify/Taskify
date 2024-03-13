import Image from 'next/image';

/**
 *
 * @param {string} children : 버튼 텍스트
 * @param {function} onClick : 버튼 클릭시 동작할 로직
 * @param {string} imageSrc : 들어갈 아이콘 이미지 경로
 * @param {string} color : 컬러 설정 - violet / white (기본값 violet)
 * @param {string} size : 사이즈 선택 - medium / large (기본값 medium)
 * @returns button
 */

// Todo(심은주) : 완료
export default function CtaIcon({ children, onClick, imageSrc, color, size }) {
  const COLOR_VIOLET = 'bg-violet_5534DA text-white border-transparent';
  const COLOR_WHITE = 'bg-white text-gray_787486  border-gray_D9D9D9';

  const sizeStyles = {
    medium:
      'md:text-sm sm:text-xs rounded md:px-4 sm:px-3 md:h-[32px] sm:h-[28px] ',
    large:
      'lg:text-base md:text-sm md:rounded-lg sm:rounded-md md:px-4 sm:px-3 lg:h-[40px] md:h-[36px] sm:h-[30px] ',
  };

  const sizeClass = sizeStyles[size] || sizeStyles.medium;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`button-reset font-medium flex justify-center items-center gap-2  ${color ? COLOR_VIOLET : COLOR_WHITE} ${sizeClass}`}
    >
      {size ? (
        <Image
          width={20}
          height={20}
          src={imageSrc}
          className="md:inline sm:hidden"
          alt="버튼 아이콘"
        />
      ) : (
        <Image
          width={16}
          height={16}
          src={imageSrc}
          className="brightness-[100]"
          alt="버튼 아이콘"
        />
      )}
      {children}
    </button>
  );
}
