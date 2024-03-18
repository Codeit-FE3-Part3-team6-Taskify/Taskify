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
        className="rounded-lg bg-white fixed z-50 left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 "
      >
        {children}
      </div>

      <div className="w-screen h-screen bg-black bg-opacity-70 fixed left-0 top-0" />
    </>
  );
}
