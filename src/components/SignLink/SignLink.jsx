import Link from 'next/link';
import React from 'react';

export default function SignLink({ text, spanText, href }) {
  return (
    <p className="text-center mt-[21px] text-base font-normal">
      {text}
      <Link className="ml-2 text-violet_5534DA underline " href={href}>
        <span>{spanText}</span>
      </Link>
    </p>
  );
}
