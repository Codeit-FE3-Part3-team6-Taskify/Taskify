import Image from 'next/image';
import Link from 'next/link';
import { CrownIcon, PaginationArrow } from '@/../public/images';

// Todo(심은주): 예상 props가 짜는 사람마다 다를것같아 일단 임의로만 세팅해놓음.
export default function DashboardListItem({ url, title, color, createdByMe }) {
  return (
    <li className="list-none p-0 m-0">
      <Link
        href="/"
        className="flex justify-between items-center no-underline rounded-lg px-5 border border-solid border-gray_D9D9D9 h-[70px]"
      >
        {/* href에 url */}
        <span className="w-2 h-2 bg-violet_5534DA block rounded-full" />
        {/* 임시 color 넣어진 상태 */}
        <h2 className="m-0 md:text-base sm:text-sm">
          타이틀내용 {/* title */}
          {createdByMe && (
            <Image
              width={18}
              height={18}
              src={CrownIcon}
              alt="왕관 아이콘"
              className="inline"
            />
          )}
        </h2>
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
