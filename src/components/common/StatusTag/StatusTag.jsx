import Image from 'next/image';
import { Ellipse } from '@/../public/images';

export default function StatusTag({ children }) {
  return (
    <div className="inline-flex items-center w-fit h-fit gap-[6px] px-2 py-1 rounded-[11px]  bg-violet_8%">
      <Image src={Ellipse} alt="ellipse" width={6} height={6} />
      <span className=" text-violet_5534DA font-normal text-xs">
        {children}
      </span>
    </div>
  );
}
