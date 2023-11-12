import { useCallback, useEffect, useRef } from "react";

export default function useInterval(opts?: {
  defaultCallback: () => void;
  delay: number;
}) {
  const timerRef = useRef(-1);

  const start = useCallback((cb: () => void | Promise<void>, delay: number) => {
    if (timerRef.current !== -1) {
      clearInterval(timerRef.current);
    }
    timerRef.current = window.setInterval(cb, delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stop = useCallback(() => {
    window.clearInterval(timerRef.current);
    timerRef.current = -1;
  }, []);

  useEffect(() => {
    if (opts) {
      start(opts.defaultCallback, opts.delay);
    }

    return () => {
      if (timerRef.current !== -1) {
        clearInterval(timerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [start, stop, timerRef.current !== -1] as const;
}
