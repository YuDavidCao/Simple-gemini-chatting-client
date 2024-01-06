"use client";

import React from "react";

import AddCommandForm from "./AddCommandForm";

type Props = {};

export default function RightSideBar({}: Props) {
  return (
    <div className="hidden h-full md:flex md:w-[15vw] md:flex-col md:fixed md:inset-y-0 right-0 z-80 bg-gray-900 text-white p-10">
      <AddCommandForm></AddCommandForm>
    </div>
  );
}
