import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1200);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
};

export default useWindowSize;
