import React from "react";
import NavBar from "./Navbar";
import { Menu } from "lucide-react";
import { InputForm } from "./InputField";

const Chat = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900">
        
      </div>
      <main>
        <div className="md:hidden p-4">
          <div className="p-2 bg-gray-900 w-10 h-10 flex items-center justify-center rounded-md">
            <Menu className="text-white cursor-pointer"></Menu>
          </div>
        </div>
        <div className="pl-72 ">
          <div className="p-40">
            <div className="flex items-center justify-center text-xl font-bold pb-20">
              Chat With Gemini
            </div>
            <InputForm></InputForm>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
