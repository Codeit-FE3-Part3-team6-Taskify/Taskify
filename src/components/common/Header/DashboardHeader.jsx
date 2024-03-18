import Avatar from '../Avatar/Avatar';
import AvatarGroup from '../Avatar/AvatarGroup';

// Todo(조예진) : 완성
export default function DashboardHeader({
  buttons,
  title,
  ownerIcon,
  participants,
  divider,
  userInfo,
}) {
  return (
    <div className="flex justify-end items-center py-[13px] h-[60px] pl-20 pr-3 md:py-4 md:h-[70px] lg:justify-between  md:pl-[228px] md:pr-10 lg:pl-10 lg:pr-20 bg-white_FFFFFF border-b border-gray_D9D9D9">
      <div className="hidden lg:flex items-center gap-2">
        <span className="text-black_333236 text-xl font-bold">{title}</span>
        {ownerIcon && <span className="relative w-5 h-fit">{ownerIcon}</span>}
      </div>
      <div className="relative flex justify-between items-center gap-4 md:gap-8 lg:gap-10">
        {buttons && (
          <div className="relative flex justify-between gap-1.5 py-0.5 md:py-px md:gap-3 lg:gap-4">
            {buttons}
          </div>
        )}
        <div className="flex items-center gap-3 md:gap-6 lg:gap-8">
          {/* 모바일 */}
          <div className="relative flex md:hidden">
            <AvatarGroup isMobile participants={participants} />
          </div>
          {/* 태블릿, pc */}
          <div className="relative hidden md:flex">
            <AvatarGroup participants={participants} />
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
