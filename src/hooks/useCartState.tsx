import { useEffect, useState, useRef, useCallback, RefObject } from "react";
type UseCartStateReturnType = [
  RefObject<HTMLInputElement>,
  boolean,
  () => void
];

const useCartState = (): UseCartStateReturnType => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleOpen = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      !isOpen && setIsOpen(true);
    },
    [isOpen]
  );

  const handleClose = useCallback(() => {
    isOpen && setIsOpen(false);
  }, [isOpen]);

  useEffect(() => {
    const elem = ref.current;
    if (!elem) return;

    elem.addEventListener("mousedown", (e) => handleOpen(e));
    document.addEventListener("mousedown", handleClose);

    return () => {
      elem.removeEventListener("mousedown", (e) => handleOpen(e));
      document.removeEventListener("mousedown", handleClose);
    };
  }, [handleOpen, handleClose]);

  return [ref, isOpen, handleClose];
};

export default useCartState;
