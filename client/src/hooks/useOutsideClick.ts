import { RefObject, useEffect, useRef } from "react";

export function useOutsideClick(
  handler: () => void,
  listenCapturing = true,
  button?: RefObject<HTMLElement>,
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        if (
          ref.current &&
          !ref.current.contains(e.target as Node) &&
          (!button?.current || !button.current.contains(e.target as Node))
        ) {
          handler();
        }
      }
      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing, button],
  );

  return { ref };
}
