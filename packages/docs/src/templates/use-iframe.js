import { useRef, useEffect, useState } from "react";

function useInterval(callback, interval) {
  const savedCallback = useRef(() => callback);

  useEffect(() => {
    savedCallback.current = callback;
  });

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (interval !== null) {
      let id = setInterval(tick, interval);
      return () => clearInterval(id);
    }
  }, [interval]);
}

export default function useIframeContentHeight(
  interval = 250
) {
  const iframeRef = useRef(
    null
  );
  const [iframeHeight, setIframeHeight] = useState(0);

  useInterval(() => {
    try {
      const iframe = iframeRef.current;
      const newHeight = iframe.contentWindow.document.body.scrollHeight;
      setIframeHeight(newHeight);
    } catch (_) {}
  }, interval);

  return [iframeRef, iframeHeight];
}
