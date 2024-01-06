import React, { useState, useEffect } from "react";

type Props = {};

export default function Loader({}: Props) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted pb-40">
      {`Gemini is responding ${".".repeat((seconds % 3) + 1)}`}
    </div>
  );
}
