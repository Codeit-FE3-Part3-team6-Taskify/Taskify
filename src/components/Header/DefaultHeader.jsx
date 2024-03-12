// Todo(조예진) : 완성
export default function CommonHeader({
  isLanding,
  smallLogo,
  largeLogo,
  buttons,
}) {
  return (
    <div
      className={`${isLanding ? 'bg-black_000000' : 'bg-white_FFFFFF border-b border-gray_D9D9D9'} flex justify-between items-center py-[13px] h-[60px] md:py-4 md:h-[70px] px-6 md:px-10 lg:px-20 `}
    >
      <span className="block md:hidden relative w-6 h-7 cursor-pointer">
        {smallLogo}
      </span>
      <span className="hidden md:block relative w-[120px] h-10 cursor-pointer">
        {largeLogo}
      </span>
      <section
        className={`${isLanding ? 'text-white_FFFFFF' : 'text-black_333236'} flex justify-between gap-5 md:gap-9 text-sm md:text-base`}
      >
        {buttons}
      </section>
    </div>
  );
}
