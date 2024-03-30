/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from 'next/image';
import { useRouter } from 'next/router';
import { PaginationArrow } from '@/../public/images';
import UpdateProfile from './UpdateProfile';
import UpdatePassword from './UpdatePassword';

export default function MyPageContent() {
  const router = useRouter(); // useRouter로 라우터 가져오기

  // 이전 페이지로 이동하는 함수
  const goBack = () => {
    router.back();
  };
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
        <button className="text-sm md:text-base font-medium" onClick={goBack}>
          돌아가기
        </button>
      </div>
      <UpdateProfile />
      <UpdatePassword />
    </div>
  );
}
