import { twMerge } from "tailwind-merge";

export default function ErrorIcon({ className }: { className?: string }) {
  return (
    <div className={twMerge("text-red-600 text-5xl pointer-events-none select-none w-fit text-center", className)}>
      !
    </div>
  );
}
