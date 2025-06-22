import clsx from "clsx";
import Link from "next/link";
import { IconType } from "react-icons";

interface GameCardProps {
  href: string;
  title: string;
  description: string;
  icon: IconType;
  disabled?: boolean;
}
export default function GameCard(props: GameCardProps) {
  const IconComponent = props.icon;
  return (
    <Link
      className={clsx(
        "p-8 flex-1 m-4 max-w-96 transition-all select-none border-2 border-slate-700 rounded-md hover:bg-gray-800 hover:scale-105 hover:cursor-pointer group",
        { "text-gray-500 pointer-events-none": props.disabled },
        { hidden: props.disabled }
      )}
      href={props.href}
    >
      <div className="flex mb-2">
        <IconComponent className="w-8 h-8 self-center mr-2 group-hover:animate-wiggle" />
        <div className="text-3xl">{props.title}</div>
      </div>
      <div className="">{props.description}</div>
    </Link>
  );
}
