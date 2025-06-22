import { twMerge } from "tailwind-merge";

export default function ErrorIcon({ className }: { className?: string }) {
  return (
    <div className={twMerge("pointer-events-none w-fit text-center text-5xl text-red-600 select-none", className)}>
      !
    </div>
  );
}
