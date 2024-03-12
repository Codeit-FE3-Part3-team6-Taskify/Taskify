import Avatar from '../Avatar/Avatar';

export default function CommonHeader({
  hasSpace,
  isLanding,
  smallLogo,
  largeLogo,
  buttons,
  title,
  ownerIcon,
  participants,
  divider,
  userInfo,
}) {
  return (
    <div
      className={`${isLanding ? 'bg-black_000000' : 'bg-white_FFFFFF border-b border-gray_D9D9D9'} flex items-center py-[13px] h-[60px] md:py-4 md:h-[70px] ${hasSpace ? 'justify-end lg:justify-between' : 'justify-between'} ${hasSpace ? ' pl-20 pr-3 md:pl-[228px] md:pr-10 lg:pl-[340px] lg:pr-20' : ' px-6 md:px-10 lg:px-20'} `}
    >
      {hasSpace ? (
        <>
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-black_333236 text-xl font-bold">{title}</span>
            {ownerIcon && (
              <span className="relative w-5 h-fit">{ownerIcon}</span>
            )}
          </div>
          <div className="flex justify-between items-center gap-2 md:gap-8 lg:gap-10">
            {buttons && (
              <div className="flex justify-between gap-1.5 py-0.5 md:py-px md:gap-3 lg:gap-4">
                {buttons}
              </div>
            )}
            <div className="flex items-center gap-3 md:gap-6 lg:gap-8">
              {/* 10px만큼씩 겹치게 배치해야됨, 모바일일땐 3개 보여주고 그 이후론 5개씩 */}
              {/* 모바일 */}
              <div className="relative flex md:hidden">
                {participants && (
                  <>
                    {participants.slice(0, 2).map((p, index) => (
                      <span
                        key={p.id}
                        className="relative"
                        style={{ left: `-${index * 10}px`, zIndex: `${index}` }}
                      >
                        <Avatar text={p.email.charAt(0).toUpperCase()} />
                      </span>
                    ))}
                    <span className="relative -left-[20px] z-20">
                      <Avatar text={`+${participants.length - 2}`} />
                    </span>
                  </>
                )}
              </div>
              {/* 태블릿, pc */}
              <div className="relative hidden md:flex">
                {participants && (
                  <>
                    {participants.slice(0, 4).map((p, index) => (
                      <span
                        key={p.id}
                        className="relative"
                        style={{ left: `-${index * 10}px`, zIndex: `${index}` }}
                      >
                        <Avatar text={p.email.charAt(0).toUpperCase()} />
                      </span>
                    ))}
                    <span className="relative -left-[40px] z-40">
                      <Avatar text={`+${participants.length - 4}`} />
                    </span>
                  </>
                )}
              </div>
              {divider && (
                <span className="relative w-[1px] h-[34px] md:h-[38px] bg-gray_D9D9D9" />
              )}
              <div className="flex justify-between items-center gap-3">
                <Avatar text={userInfo.email.charAt(0).toUpperCase()} />
                <span className="hidden md:block">{userInfo.nickname}</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
