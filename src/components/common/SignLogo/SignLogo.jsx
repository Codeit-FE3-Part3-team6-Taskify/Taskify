import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Logo, LogoImg } from '@/../public/images';

export default function SignLogo() {
  return (
    <>
      <Link
        href="/"
        className="m-auto max-w-[198px] flex flex-col items-center gap-[18px] md:gap-[30px]"
      >
        <Image
          className="ml-9 w-[98px] h-[113px] md:w-[164px] md:h-[189px]"
          src={LogoImg}
          alt="로고이미지"
        />
        <Image
          className="w-[119px] h-[33px] md:w-[198px] md:h-[55px]"
          src={Logo}
          alt="로고이름"
        />
      </Link>
      <h3 className="mt-[8px] mb-10  text-center font-medium text-xl  md:mb-[60px]">
        오늘도 만나서 반가워요!
      </h3>
    </>
  );
}
