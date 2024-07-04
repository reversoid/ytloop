import { useEffect, useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";

export const useCopy = () => {
  const [, copy] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCopied(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isCopied]);

  return {
    copy: (value: string) => copy(value).then(() => setIsCopied(true)),
    isCopied,
  };
};
