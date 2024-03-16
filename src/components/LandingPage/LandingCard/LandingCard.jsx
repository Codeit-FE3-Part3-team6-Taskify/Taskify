import Image from 'next/image';
import React from 'react';

export default function LandingCard({ src, alt, title, paragraph }) {
  return (
    <div className="w-full">
      <div className="w-full items-center justify-center flex h-[235px] bg-black_4B4B4B rounded-t-lg md:max-h-[260px]">
        <Image className="max-h-[260px] max-w-[260px]" src={src} alt={alt} />
      </div>
      <div className=" bg-black_171717 h-[113px] pl-8 pt-[27px] pb-[27px] rounded-b-lg md:h-[124px]">
        <h5 className="mb-[18px] text-[18px] font-bold">{title}</h5>
        <p className="text-4 font-medium">{paragraph}</p>
      </div>
    </div>
  );
}
