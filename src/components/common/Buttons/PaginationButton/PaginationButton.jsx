import Image from 'next/image';
import { PaginationArrow } from '@/../public/images';

/**
 *
 * @param {function} onClick : 버튼 클릭시 동작할 로직
 * @param {string} disabled : disabled 여부. 상위 컴포넌트에서 컨트롤 해야함
 * @param {string} direction : prev / next 방향 지정 (기본값 next)
 * @returns button
 */

// Todo(심은주): 완료
export default function PaginationButton({
  onClick,
  disabled,
  direction = 'next',
  borderHide = 'no',
}) {
  const isPrev = direction === 'prev';

  const isBorder = borderHide !== 'yes';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-8 h-8 ${isBorder && 'button-reset'} border-gray_D9D9D9 bg-white inline-block rounded-tr rounded-br  transform ${isPrev && 'scale-x-[-1]'} `}
    >
      <Image
        width={16}
        height={16}
        src={PaginationArrow}
        alt={direction}
        className={`text-center mx-auto ${disabled ? 'opacity-40' : ''}`}
      />
      <span className="hidden">{direction}</span>
    </button>
  );
}
