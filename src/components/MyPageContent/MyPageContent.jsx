import Image from 'next/image';
import { PaginationArrow } from '../../../public/images';
import UpdateProfile from './UpdateProfile';
import UpdatePassword from './UpdatePassword';

export default function MyPageContent() {
  return (
    <div className="flex flex-col justify-start gap-3 py-[17px] px-3 md:p-5 bg-gray_FAFAFA flex-grow">
      <div className="flex items-center mb-[13px] gap-[6px] ">
        <span className="relative w-5 h-5">
          <Image
            fill
            className="scale-x-[-1]"
            src={PaginationArrow}
            alt="back"
          />
        </span>
        <span className="">돌아가기</span>
      </div>
      <UpdateProfile />
      <UpdatePassword password="sprint101" />
    </div>
  );
}
