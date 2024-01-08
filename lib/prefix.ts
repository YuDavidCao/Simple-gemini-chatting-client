"use client";

export class PrefixPair {
  key: string;
  value: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }
}

export function getPrefixKeyList(s: Storage): string[] {
  if (s.getItem("PrefixKeyList") === null) {
    return [];
  }
  return JSON.parse(s.getItem("PrefixKeyList")!);
}

export function getPrefixValuePairList(
  prefixKeyList: string[],
  s: Storage
): PrefixPair[] {
  return prefixKeyList.map(
    (prefixKey: string) => new PrefixPair(prefixKey, s.getItem(prefixKey)!)
  );
}

export function deletePrefixPair(prefixKey: string, s: Storage): void {
  s.removeItem(prefixKey);
  s.setItem(
    "PrefixKeyList",
    JSON.stringify(
      getPrefixKeyList(s).filter((curPrefixKey) => curPrefixKey !== prefixKey)
    )
  );
}

export function modifyPrefixPair(
  prefixKey: string,
  prefixValue: string,
  s: Storage
): void {
  s.setItem(prefixKey, prefixValue);
}

export function addPrefixKeyPair(
  prefixKey: string,
  prefixValue: string,
  s: Storage
): void {
  const prefixKeyList = getPrefixKeyList(s);
  prefixKeyList.push(prefixKey);
  s.setItem("PrefixKeyList", JSON.stringify(prefixKeyList));
  s.setItem(prefixKey, prefixValue);
}

export function prefixParser(prefixKeyString: string, s: Storage): string {
  var currentPrefixString: string = "";
  var outputString: string = "";
  for (let i: number = 0; i < prefixKeyString.length; i++) {
    if (prefixKeyString[i] == ":") {
      const prefixValue = s.getItem(currentPrefixString.trim());
      if (prefixValue !== null) {
        outputString += prefixValue;
        outputString += "\n";
        currentPrefixString = "";
      } else {
        currentPrefixString += prefixKeyString[i];
      }
    } else {
      currentPrefixString += prefixKeyString[i];
    }
  }
  outputString += currentPrefixString;

  return outputString;
}
