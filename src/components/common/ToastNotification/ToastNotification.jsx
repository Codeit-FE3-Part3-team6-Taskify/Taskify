import { useEffect } from 'react';

const ToastNotification = ({ children, setToastState }) => {
  useEffect(() => {
    const toastTimeout = setTimeout(() => {
      setToastState(false);
    }, 2000);

    return () => {
      clearTimeout(toastTimeout);
    };
  }, [setToastState]);

  return (
    <div className="text-sm fixed bg-red_D6173A left-2/4 -bottom-full -translate-x-2/4 text-white rounded-lg px-2 py-2 z-50 whitespace-nowrap">
      {children}
    </div>
  );
};

export default ToastNotification;
