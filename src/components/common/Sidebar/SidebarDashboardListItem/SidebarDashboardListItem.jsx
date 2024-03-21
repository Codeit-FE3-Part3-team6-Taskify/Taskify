import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { CrownIcon } from '@/../public/images';

export default function SidebarDashboardListItem({
  title,
  color,
  createdByMe,
  id,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const router = useRouter();
  const isSelected = router.asPath === `/dashboard/${id}`;

  const createCircle = (dotColor) => {
    const circleStyle = {
      width: '9px',
      height: '9px',
      borderRadius: '50%',
      backgroundColor: dotColor,
      transform: isHovered ? 'scale(1.5)' : 'none',
      transition: 'transform 300ms ease-in-out',
    };

    return <div style={circleStyle} />;
  };

  const SelectedStyle = isSelected ? 'bg-violet_8%' : '';

  return (
    <li className={`list-none md:w-full ${SelectedStyle}`}>
      <Link
        href={`/dashboard/${id}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center justify-between mx-[24px] border-b h-[50px]"
      >
        <div className="flex items-center gap-2 md:max-w-[90px] lg:max-w-[220px]">
          <div>{color && createCircle(color)}</div>
          <h2 className="hidden text-gray_787486 font-medium truncate md:block md:max-w-full md:text-[13px] lg:text-[15px]">
            {title}
          </h2>
        </div>
        <div className="hidden md:block">
          {createdByMe && (
            <Image width={18} height={18} src={CrownIcon} alt="왕관 아이콘" />
          )}
        </div>
      </Link>
    </li>
  );
}
