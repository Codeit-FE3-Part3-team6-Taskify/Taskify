import Image from 'next/image';
import Link from 'next/link';
import { CrownIcon, PaginationArrow } from '@/../public/images';

// Todo(심은주): 예상 props가 짜는 사람마다 다를것같아 일단 임의로만 세팅해놓음.
export default function DashboardListItem({ url, title, color, createdByMe }) {
  const createCircle = (dotColor) => {
    const circleStyle = {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: dotColor,
    };

    return <div style={circleStyle} />;
  };

  return (
    <li className="list-none p-0 m-0">
      <Link
        href="/"
        className="flex justify-between items-center no-underline rounded-lg px-5 border border-solid border-gray_D9D9D9 h-[58px] md:h-[68px] lg:h-[70px]"
      >
        {/* href에 url */}
        <div className="flex items-center gap-x-2">
          <span>{color && createCircle(color)}</span>
          <h2 className="ml-2 md:text-base sm:text-sm ">{title}</h2>
          <div>
            {createdByMe && (
              <Image
                width={18}
                height={18}
                src={CrownIcon}
                alt="왕관 아이콘"
                className="inline"
              />
            )}
          </div>
        </div>
        <Image
          width={18}
          height={18}
          src={PaginationArrow}
          alt="바로가기 아이콘"
        />
      </Link>
    </li>
  );
}