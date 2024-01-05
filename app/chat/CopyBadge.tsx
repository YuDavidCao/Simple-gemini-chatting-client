import { Check, Copy } from "lucide-react";
import React from "react";
import { useCopyToClipboard } from "usehooks-ts";

type Props = {
  copyString: string;
};

export default function CopyBadge({ copyString }: Props) {
  const [value, copy] = useCopyToClipboard();

  return (
    <div
      className="flex justify-center items-center cursor-pointer"
      onClick={() => copy(copyString)}
    >
      {value ? (
        <div className="flex justify-center items-center">
          <p>Copied &nbsp;</p>
          <Check className="w-4 h-4"></Check>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <p>Copy to clipboard &nbsp;</p>
          <Copy className="w-4 h-4"></Copy>
        </div>
      )}
    </div>
  );
}
