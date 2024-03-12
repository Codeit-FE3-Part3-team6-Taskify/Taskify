export default function Avatar({ text, onClick }) {
  return (
    <div className="flex items-center justify-center bg-[#A3C4A2] rounded-full w-[38px] h-[38px] border-2 border-white_FFFFFF">
      <span
        className="relative text-white_FFFFFF text-base font-semibold"
        onClick={onClick}
      >
        {text}
      </span>
    </div>
  );
}
