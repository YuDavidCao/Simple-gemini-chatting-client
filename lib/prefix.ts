class PrefixPair {
  key: string;
  value: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }
}

export function getPrefixKeyList(): string[] {
  if (localStorage.getItem("PrefixKeyList") === null) {
    return [];
  }
  return JSON.parse(localStorage.getItem("PrefixKeyList")!);
}

export function getPrefixValueList(prefixKeyList: string[]): PrefixPair[] {
  return prefixKeyList.map(
    (prefixKey: string) =>
      new PrefixPair(prefixKey, localStorage.getItem(prefixKey)!)
  );
}

export function deletePrefixPair(prefixKey: string): void {
  localStorage.removeItem(prefixKey);
  localStorage.setItem(
    "PrefixKeyList",
    JSON.stringify(
      getPrefixKeyList().filter((curPrefixKey) => curPrefixKey !== prefixKey)
    )
  );
}

export function modifyPrefixPair(prefixKey: string, prefixValue: string): void {
  localStorage.setItem(prefixKey, prefixValue);
}

export function addPrefixKeyPair(prefixKey: string, prefixValue: string): void {
  const prefixKeyList = getPrefixKeyList();
  prefixKeyList.push(prefixKey);
  localStorage.setItem("PrefixKeyList", JSON.stringify(prefixKeyList));
  localStorage.setItem(prefixKey, prefixValue);
}
