import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function LandingFooter({ imgData }) {
  return (
    <footer className="pb-[90px] text-white gap-3 flex pt-10 flex-col text-center md:justify-around md:pb-10 md:flex-row md:mt-[160px] ">
      <span>@codeit - 2023</span>
      <div>
        <Link href="/privacypolicy">Privacy Policy</Link>
        <Link className="ml-5 md:ml-8" href="/faq">
          FAQ
        </Link>
      </div>
      <div className="flex gap-[14px] self-center mt-[56px] md:mt-0">
        <Link
          href="https://mail.google.com/mail"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            width={22}
            height={22}
            src={imgData.MailIcon}
            alt="gmail로 가기 아이콘"
          />
        </Link>
        <Link
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            width={22}
            height={22}
            src={imgData.FacebookIcon}
            alt="페이스북으로가기 아이콘"
          />
        </Link>
        <Link
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            width={22}
            height={22}
            src={imgData.InstaIcon}
            alt="인스타그램으로가기 아이콘"
          />
        </Link>
      </div>
    </footer>
  );
}
