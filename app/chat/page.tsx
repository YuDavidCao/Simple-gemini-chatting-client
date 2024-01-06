"use client";

import React from "react";
import NavBar from "./Navbar";
import { Menu } from "lucide-react";
import { ChatSection } from "./ChatSection";
import LeftSideBar from "./(LeftSideBar)/LeftSideBar";
import RightSideBar from "./(RightSideBar)/RightSideBar";

const Chat = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <LeftSideBar></LeftSideBar>
      <main>
        <div className="md:hidden p-4">
          <div className="p-2 bg-gray-900 w-10 h-10 flex items-center justify-center rounded-md">
            <Menu className="text-white cursor-pointer"></Menu>
          </div>
        </div>
        <div className="px-[15vw]">
          <div className="p-[5vw] relative">
            <div className="flex items-center justify-center text-xl font-bold pb-20">
              Chat With Gemini
            </div>
            <ChatSection></ChatSection>
          </div>
        </div>
      </main>
      <RightSideBar></RightSideBar>
    </div>
  );
};

export default Chat;
