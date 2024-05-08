import { twMerge } from "tailwind-merge";

export default function Loading({ className }: { className?: string }) {
    return (
        <div className={twMerge("relative z-10 mx-auto my-4 w-16 h-16", className)}>
            <span className="absolute top-0 left-0 w-1/4 h-full bg-sky-600 rounded-lg animate-loader-bounce "></span>
            <span
                className="absolute top-0 left-1/2 w-1/4 h-full bg-sky-600 rounded-lg animate-loader-bounce"
                style={{ animationDelay: "-0.3s", transform: "translateX(-50%)" }}
            ></span>
            <span
                className="absolute top-0 right-0 w-1/4 h-full bg-sky-600 rounded-lg animate-loader-bounce"
                style={{ animationDelay: "-0.6s" }}
            ></span>
        </div>
    );
}
