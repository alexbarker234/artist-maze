import { twMerge } from "tailwind-merge";

export default function Loading({ className }: { className?: string }) {
  return (
    <div className={twMerge("relative z-10 mx-auto my-4 h-16 w-16", className)}>
      <span className="animate-loader-bounce absolute top-0 left-0 h-full w-1/4 rounded-lg bg-sky-600"></span>
      <span
        className="animate-loader-bounce absolute top-0 left-1/2 h-full w-1/4 rounded-lg bg-sky-600"
        style={{ animationDelay: "-0.3s", transform: "translateX(-50%)" }}
      ></span>
      <span
        className="animate-loader-bounce absolute top-0 right-0 h-full w-1/4 rounded-lg bg-sky-600"
        style={{ animationDelay: "-0.6s" }}
      ></span>
    </div>
  );
}
