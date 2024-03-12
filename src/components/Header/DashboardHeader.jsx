import Avatar from '../Avatar/Avatar';

export default function CommonHeader({
  buttons,
  title,
  ownerIcon,
  participants,
  divider,
  userInfo,
}) {
  return (
    <div className="flex justify-end items-center py-[13px] h-[60px] pl-20 pr-3 md:py-4 md:h-[70px] lg:justify-between  md:pl-[228px] md:pr-10 lg:pl-[340px] lg:pr-20">
      <div className="hidden lg:flex items-center gap-2">
        <span className="text-black_333236 text-xl font-bold">{title}</span>
        {ownerIcon && <span className="relative w-5 h-fit">{ownerIcon}</span>}
      </div>
      <div className="relative flex justify-between items-center ">
        {buttons && (
          <div className="relative flex justify-between gap-1.5 py-0.5 md:py-px md:gap-3 lg:gap-4 left-1 md:left-2 lg:left-0">
            {buttons}
          </div>
        )}
        <div className="flex items-center gap-3 md:gap-6 lg:gap-8">
          {/* 모바일 */}
          <div className="relative flex left-5 md:hidden">
            {participants && (
              <>
                {participants.slice(0, 2).map((p, index) => (
                  <span
                    key={p.id}
                    style={{
                      position: 'relative',
                      left: `-${index * 10}px`,
                      zIndex: `${index}`,
                    }}
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
          <div className="relative hidden left-10 md:flex">
            {participants && (
              <>
                {participants.slice(0, 4).map((p, index) => (
                  <span
                    key={p.id}
                    style={{
                      position: 'relative',
                      left: `-${index * 10}px`,
                      zIndex: `${index}`,
                    }}
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
    </div>
  );
}
