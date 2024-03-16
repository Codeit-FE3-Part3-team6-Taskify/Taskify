import { useEffect } from 'react';

function useOutsideClick(ref, callback) {
  const handleClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback?.();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, callback, handleClick]);
}

export default useOutsideClick;
