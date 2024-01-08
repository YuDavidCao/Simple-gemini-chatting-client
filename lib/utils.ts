import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPreviousElementFromList<T>(list: T[], count: number): T[] {
  let newList: T[] = [];
  for (let i: number = list.length - 1; i >= 0; i--) {
    newList.push(list[i]);
    if (newList.length === count) {
      return newList.reverse();
    }
  }
  return newList.reverse();
}