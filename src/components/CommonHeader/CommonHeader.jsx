export default function CommonHeader({
  hasSpace,
  smallLogo,
  largeLogo,
  buttons,
  title,
  ownerIcon,
  participants,
  divider,
  profile,
}) {
  return (
    <div
      className={`flex items-center py-3.25 h-15 md:py-4 md:h-17.5 border-b border-gray_D9D9D9 ${hasSpace ? 'justify-end lg:justify-between' : 'justify-between'} ${hasSpace ? ' pl-20 pr-3 md:pl-57 md:pr-10 lg:pl-85 lg:pr-20' : ' px-6 md:px-10 lg:px-20'} `}
    >
      {hasSpace ? (
        <>
          <div className="hidden lg:flex items-center gap-2">
            <span className=" text-black_333236 text-xl font-bold">
              {title}
            </span>
            {ownerIcon && (
              <span className="relative w-5 h-fit">{ownerIcon}</span>
            )}
          </div>
          <div className="flex justify-between items-center gap-2 md:gap-8 lg:gap-10">
            <div className="flex justify-between gap-1.5 py-0.5 md:py-px md:gap-3 lg:gap-4">
              {buttons}
            </div>
            <div className="flex items-center gap-3 md:gap-6 lg:gap-8">
              <p className="flex">
                {/* 10px만큼씩 겹치게 배치해야됨, 모바일일땐 3개 보여주고 그 이후론 5개씩 */}
                <span className="relative w-6 h-7">{participants}</span>
              </p>
              <span className="relative w-1 h-8.5 md:h-9.5">{divider}</span>
              {profile}
            </div>
          </div>
        </>
      ) : (
        <>
          <span className="block md:hidden relative w-6 h-7">{smallLogo}</span>
          <span className="hidden md:block relative w-30 h-10">
            {largeLogo}
          </span>
          <section className="flex justify-between text-black_333236 gap-5 md:gap-9 text-sm md:text-base ">
            {buttons}
          </section>
        </>
      )}
    </div>
  );
}
