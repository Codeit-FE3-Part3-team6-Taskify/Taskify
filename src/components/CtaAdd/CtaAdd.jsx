import Image from 'next/image';
import { AddButtonFill } from '@/../public/images';

/**
 *
 * @param {string} children : 버튼 텍스트
 * @param {function} onClick : 버튼 클릭시 동작할 로직
 * @param {string} size : 사이즈 선택 - medium / large (기본값 medium)
 * @returns button
 */

// Todo(심은주) : 완료.
export default function CtaAdd({ children, onClick, size }) {
  const sizeStyles = {
    medium: 'text-base rounded-md md:h-[48px] sm:h-[32px] ',
    large: 'md:text-lg sm:text-base  rounded-lg lg:h-[70px]',
  };

  const sizeClass = sizeStyles[size] || sizeStyles.medium;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`outline-none bg-white w-full flex justify-center items-center gap-2.5 border-solid border border-gray_D9D9D9 font-bold  ${sizeClass}`}
    >
      {children}
      <span className="flex justify-center items-center bg-violet_8% rounded">
        <Image width={20} height={20} src={AddButtonFill} />
      </span>
    </button>
  );
}
