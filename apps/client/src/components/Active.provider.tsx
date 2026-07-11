"use client";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type ActiveContextTypes = {
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  goNext: () => void;
  goBack: () => void;
};
const activeContext = createContext<ActiveContextTypes>({
  activeIndex: 0,
  setActiveIndex: () => {},
  goNext: () => {},
  goBack: () => {},
});

type Props = PropsWithChildren & { itemsCount: number };
function ActiveProvider({ children, itemsCount }: Props) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const timeout = useRef<number | undefined>(undefined);
  function resetTime() {
    window.clearTimeout(timeout.current);

    timeout.current = window.setTimeout(() => {
      goNext();
    }, 5000);
  }
  function goNext() {
    if (activeIndex >= itemsCount - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex((old) => old + 1);
    }
  }
  function goBack() {
    if (activeIndex <= 0) {
      setActiveIndex(itemsCount - 1);
    } else {
      setActiveIndex((old) => old - 1);
    }
  }

  useEffect(() => {
    resetTime();
    return () => window.clearTimeout(timeout.current);
  }, [activeIndex]);

  return (
    <activeContext.Provider
      value={{ activeIndex, setActiveIndex, goNext, goBack }}
    >
      {children}
    </activeContext.Provider>
  );
}

function useActive() {
  const context = useContext(activeContext);
  return context;
}

export { ActiveProvider, useActive };
