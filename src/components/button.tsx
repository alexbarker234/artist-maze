import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  icon: IconType;
  text: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Button({ icon: Icon, text, disabled, className, onClick }: ButtonProps) {
  return (
    <button
      className={twMerge(
        "flex cursor-pointer rounded-md border-2 border-slate-700 p-2 transition-all hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      onClick={() => onClick && onClick()}
      disabled={disabled}
    >
      <p className="mr-2">{text}</p>
      <Icon className="self-center" />
    </button>
  );
}
