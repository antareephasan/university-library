import { useEffect } from "react";

type Event = MouseEvent | TouchEvent;
interface Props {
  ref: React.RefObject<HTMLDivElement | null>;
  handler: (event: Event) => void;
}

const useClickOutside = ({ ref, handler }: Props) => {
  useEffect(() => {
    let startedInside = false;
    let startedWhenMounted = false;

    const listener = (event: MouseEvent | TouchEvent) => {
      if (startedInside || !startedWhenMounted) return;

      // Ensure `event.target` is of type `Node`
      if (!ref.current || ref.current.contains(event.target as Node)) return;

      handler(event);
    };

    const validateEventStart = (event: MouseEvent | TouchEvent) => {
      startedWhenMounted = Boolean(ref.current);
      startedInside = Boolean(
        ref.current && ref.current.contains(event.target as Node)
      );
    };

    document.addEventListener("mousedown", validateEventStart);
    document.addEventListener("touchstart", validateEventStart);
    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("mousedown", validateEventStart);
      document.removeEventListener("touchstart", validateEventStart);
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
};

export default useClickOutside;
