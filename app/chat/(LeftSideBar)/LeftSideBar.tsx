"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import AdjustTemperature from "./AdjustTemperature";
import AdjustPreserveLength from "./AdjustPerserveLength";
import { Button } from "@/components/ui/button";

type Props = {};

export default function LeftSideBar({}: 0) {
  const [restore, setRestore] = useState(0);

  const handleRestore = () => {
    localStorage.setItem("|Temperature|", "0.9");
    localStorage.setItem("|PreserveLength|", "7");
    setRestore(restore + 2);
  };

  return (
    <div className="hidden h-full md:flex md:w-[15vw] md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900 p-4 gap-2 text-white">
      <div className="lg:flex-row flex-col flex lg:justify-between justify-center items-center">
        <div className="font-bold text-lg">Setting</div>
        <Button
          className="bg-white text-black h-6 self-center hover:bg-slate-400"
          onClick={handleRestore}
        >
          Restore
        </Button>
      </div>
      <hr></hr>
      <AdjustTemperature key={restore}></AdjustTemperature>
      <AdjustPreserveLength key={restore + 1}></AdjustPreserveLength>
    </div>
  );
}
