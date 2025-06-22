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
        "group m-4 max-w-96 flex-1 rounded-md border-2 border-slate-700 p-8 transition-all select-none hover:scale-105 hover:cursor-pointer hover:bg-gray-800",
        { "pointer-events-none text-gray-500": props.disabled },
        { hidden: props.disabled }
      )}
      href={props.href}
    >
      <div className="mb-2 flex">
        <IconComponent className="group-hover:animate-wiggle mr-2 h-8 w-8 self-center" />
        <div className="text-3xl">{props.title}</div>
      </div>
      <div className="">{props.description}</div>
    </Link>
  );
}
