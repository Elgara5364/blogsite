import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function DateString({ date, idx }) {
  // Format datetime string
  // console.log(typeof date);

  const dateString = date;

  // Parse the string into a Date object
  const dateObject = new Date(dateString);

  // Extract the components
  const options = {
    year: "numeric",
    month: "long",
    day: "2-digit",
    weekday: "long",
  };
  const formattedDate = dateObject
    .toLocaleDateString("en-US", options)
    .replace(/,/, "");

  return (
    <time className="mt-2 text-[9px] tracking-wider text-gray-400">
      {formattedDate}
    </time>
  );
}
