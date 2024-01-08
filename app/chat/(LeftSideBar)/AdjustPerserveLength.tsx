"use client";

import React, { ChangeEvent, useEffect, useState } from "react";

type Props = {};

export default function AdjustPreserveLength({}: Props) {
  const [plength, setPLength] = useState<string | null>("7");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPLength(localStorage.getItem("|PreserveLength|"));
    }
  }, []);

  const handleTempChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue: number = parseInt(event.target.value, 10);
    console.log(String(newValue));
    localStorage.setItem("|PreserveLength|", String(newValue));
    setPLength(String(newValue));
  };

  return (
    <div className="">
      <input
        type="range"
        min="0"
        max="10"
        defaultValue={Number(plength)}
        onChange={handleTempChange}
        className="w-full"
      ></input>
      <p className="text-white ">Current Preserve Length: {plength}</p>
    </div>
  );
}
