import { useCallback, useEffect, useState } from 'react';

const useTimer = (onTimeout, initialSeconds) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(!!initialSeconds);
  useEffect(() => {
    if (seconds) {
      const interval = setInterval(() => setSeconds((oldSeconds) => oldSeconds - 1), 1000);
      return () => clearInterval(interval);
    }
    if (isActive && seconds < 1) {
      setIsActive(false);
      onTimeout();
    }
    return null;
  }, [seconds, isActive, onTimeout]);
  const externalSetSeconds = useCallback((newSeconds) => {
    setSeconds(newSeconds);
    setIsActive(true);
  }, []);
  return [seconds, externalSetSeconds];
};

export default useTimer;
