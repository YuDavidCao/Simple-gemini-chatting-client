"use client";

import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddCommandForm from "./AddCommandForm";
import * as prefixUltil from "@/lib/prefix";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type Props = {};

export default function RightSideBar({}: Props) {
  const [uiUpdater, setUIUpdater] = useState(true);

  const [prefixPairList, setPrefixPairList] = useState<
    prefixUltil.PrefixPair[]
  >([]);

  const handleStorage = () => {
    setPrefixPairList(
      prefixUltil.getPrefixValuePairList(
        prefixUltil.getPrefixKeyList(localStorage),
        localStorage
      )
    );
    setUIUpdater(!uiUpdater);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorage);
      setPrefixPairList(
        prefixUltil.getPrefixValuePairList(
          prefixUltil.getPrefixKeyList(localStorage),
          localStorage
        )
      );
    }
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [uiUpdater]);

  const deleteSelectedPrefix = (prefixKey: string) => {
    prefixUltil.deletePrefixPair(prefixKey, localStorage);
    window.dispatchEvent(new Event("storage"));
  };

  const deleteAllPrefixes = () => {
    console.log(1);
    localStorage.clear();
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="hidden h-full md:flex md:w-[15vw] md:flex-col md:fixed md:inset-y-0 right-0 bg-gray-900 text-white p-4 gap-2">
      <div className="lg:flex-row flex-col flex lg:justify-between justify-center items-center">
        <div className="font-bold text-lg">Prefixes</div>
        <Button
          className="bg-white text-black h-6 self-center hover:bg-slate-400"
          onClick={deleteAllPrefixes}
        >
          Clear prefixes
        </Button>
      </div>
      <hr></hr>
      <div className="h-full overflow-y-scroll overflow-x-hidden flex flex-col">
        {prefixPairList.length === 0 && (
          <div className="flex items-center justify-center md:text-base text-sm">
            <div>There are no prefixes yet</div>
          </div>
        )}
        {prefixPairList.length !== 0 &&
          prefixPairList.map(
            (prefixPair: prefixUltil.PrefixPair, index: number) => {
              return (
                <div
                  key={uuidv4()}
                  className="w-[95%] rounded-md bg-white flex flex-col text-black my-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg p-2">
                      {prefixPair.key + ":"}
                    </span>
                    <X
                      className="m-2 p-1 hover:bg-slate-400 rounded-md"
                      onClick={() => {
                        deleteSelectedPrefix(prefixPair.key);
                      }}
                    ></X>
                  </div>
                  <p className="px-2 pb-2 text-sm">{prefixPair.value}</p>
                </div>
              );
            }
          )}
      </div>
      <div className="font-bold text-lg">Add new prefix</div>
      <hr></hr>
      <AddCommandForm></AddCommandForm>
    </div>
  );
}
