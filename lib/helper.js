import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const PASSWORD_RESET = "password-reset";

export const DICTIONARY = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  0,
  "a",
  "e",
  "i",
  "o",
  "u",
  "A",
  "E",
  "I",
  "O",
  "U",
  "@",
  "$",
  "(",
  ")",
];

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const generateCode = () => {
  let code = "";
  for (let i = 0; i < 6; ++i) {
    code += DICTIONARY[Math.floor(Math.random() * DICTIONARY.length - 1)];
  }

  return code;
};

export const trim = (str, len) => {
  if (str.length > len) {
    return `${str.slice(0, len)}...`;
  } else return str;
};
