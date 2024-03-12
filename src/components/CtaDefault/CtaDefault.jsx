// TODO(심은주) : 진행중. 공통 버튼 컴포넌트 생성 후 용도별 별도 생성 예정
export default function CtaDefault({
  children,
  onClick,
  disabled,
  type = 'button',
}) {
  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
