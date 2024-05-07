import clsx from "clsx";
import Link from "next/link";

interface GameCardProps {
    href: string;
    title: string;
    description: string;
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
            <div className="text-3xl">{props.title}</div>
            <div className="">{props.description}</div>
        </Link>
    );
}
