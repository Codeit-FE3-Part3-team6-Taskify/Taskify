import CtaDefault from '../Buttons/CtaDefault/CtaDefault';

export default function CommentBox({
  isFocused,
  onClick,
  comment,
  setComment,
  onFocus,
  onBlur,
}) {
  return (
    <div
      className="relative flex flex-col sign-input-base"
      style={{
        borderColor: isFocused ? '#5534DA' : '#D9D9D9',
      }}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <textarea
        className="text-xs md:text-sm resize-none max-h-[70px] md:max-h-[110px] overflow-y-auto focus:border-0 focus:outline-none cursor-text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="댓글 작성하기"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      />
      <span className="relative flex justify-end ">
        <CtaDefault
          color="white"
          size="xsmall"
          onClick={onClick}
          disabled={!comment.trim()}
        >
          입력
        </CtaDefault>
      </span>
    </div>
  );
}
