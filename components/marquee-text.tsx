"use client";

import { useRef, useEffect, useState } from "react";

export function MarqueeText({ text, className }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;
    setShouldScroll(textRef.current.scrollWidth > containerRef.current.clientWidth);
  }, [text]);

  return (
    <div ref={containerRef} className={`overflow-hidden whitespace-nowrap ${className ?? ""}`}>
      <span
        ref={textRef}
        className={shouldScroll ? "inline-block animate-[marquee_8s_linear_infinite]" : "inline-block"}
      >
        {text}
        {shouldScroll && <span className="px-6">{text}</span>}
      </span>
      {shouldScroll && (
        <style suppressHydrationWarning>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      )}
    </div>
  );
}
