import { useRef } from 'react';
import useOutsideClick from '@/hooks/useOutSideClick';

export default function Modal({ onClose, children }) {
  const modalRef = useRef(null);

  const handleClose = () => {
    onClose();
  };

  useOutsideClick(modalRef, handleClose);

  return (
    <>
      <div
        ref={modalRef}
        className="rounded-lg bg-white fixed z-50 left-8 right-8 top-2/4 -translate-y-2/4 md:top-2/4 md:-translate-y-2/4 md:left-2/4 md:-translate-x-2/4  md:w-[540px] max-h-[500px] md:max-h-[800px] lg:max-h-[600px] overflow-auto"
      >
        {children}
      </div>

      <div className="w-full h-full bg-black bg-opacity-70 fixed left-0 top-0" />
    </>
  );
}
