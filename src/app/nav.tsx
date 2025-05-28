import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  return (
    <div className="flex justify-center mb-2">
      <Link href="/" className="flex w-fit p-1 transition-all hover:scale-105 hover:opacity-60">
        <Image src="/logo.png" width={100} height={100} alt="logo" className="h-8 w-auto aspect-square mr-1"></Image>
        <span className="text-2xl">Artist Maze</span>
      </Link>
    </div>
  );
}
