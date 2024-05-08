import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
    icon: IconDefinition;
    text: string;
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
}

export default function Button({ icon, text, disabled, className, onClick }: ButtonProps) {
    return (
        <button
            className={twMerge(
                "flex p-2 border-2 border-slate-700 rounded-md hover:bg-slate-700 transition-all disabled:opacity-50",
                className
            )}
            onClick={() => onClick && onClick()}
            disabled={disabled}
        >
            <p className="mr-2">{text}</p>
            <FontAwesomeIcon icon={icon} className="self-center" />
        </button>
    );
}
