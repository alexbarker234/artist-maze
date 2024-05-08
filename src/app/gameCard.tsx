import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";

interface GameCardProps {
    href: string;
    title: string;
    description: string;
    icon: IconDefinition;
    disabled?: boolean;
}
export default function GameCard(props: GameCardProps) {
    return (
        <Link
            className={clsx(
                "p-8 flex-1 m-4 max-w-96 transition-all select-none border-2 border-slate-700 rounded-md hover:bg-gray-800 hover:scale-105 hover:cursor-pointer",
                { "text-gray-500 pointer-events-none": props.disabled }
            )}
            href={props.href}
        >
            <div className="flex mb-2">
                <FontAwesomeIcon icon={props.icon} className="w-8 h-8 self-center mr-2" />
                <div className="text-3xl">{props.title}</div>
            </div>
            <div className="">{props.description}</div>
        </Link>
    );
}
