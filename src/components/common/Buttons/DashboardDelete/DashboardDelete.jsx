/**
 *
 * @param {function} onClick : 버튼 클릭시 동작할 로직
 * @returns button
 */

// Todo(심은주) : 완료.
export default function DashboardDelete({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="button-reset md:text-lg sm:text-base md:w-[320px] md:h-[62px] sm:w-full sm:h-[52px] rounded-lg border-gray_D9D9D9 bg-gray_FAFAFA"
    >
      대시보드 삭제하기
    </button>
  );
}
