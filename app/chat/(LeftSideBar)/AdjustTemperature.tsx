"use client";

import React, { ChangeEvent, useEffect, useState } from "react";

type Props = {};

export default function AdjustTemperature({}: Props) {
  //somehow ui not updating to correct version when restoring
  const [temp, setTemp] = useState<string | null>("0.9");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTemp(localStorage.getItem("|Temperature|"));
    }
  }, []);

  const handleTempChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue: number = parseInt(event.target.value, 10);
    localStorage.setItem("|Temperature|", String(newValue / 100));
    setTemp(String(newValue / 100));
  };

  return (
    <div className="">
      <input
        type="range"
        min="0"
        max="100"
        defaultValue={Number(temp) * 100}
        onChange={handleTempChange}
        className="w-full"
      ></input>
      <p className="text-white ">Current Temperature: {temp}</p>
    </div>
  );
}
