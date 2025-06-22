export default function Footer() {
  return (
    <div className="mx-auto mt-auto mb-0 flex w-11/12 max-w-5xl justify-between border-t border-slate-700 p-4">
      <div>
        By{" "}
        <a
          href="https://github.com/alexbarker234"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-sm border-b border-sky-600 p-[0.25rem_0.15rem] transition duration-300 hover:scale-105 hover:bg-sky-600"
        >
          Alex Barker
        </a>
      </div>
      <div className="float-right">
        <a
          href="https://github.com/alexbarker234/artist-maze"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-sm border-b border-sky-600 p-[0.25rem_0.15rem] transition duration-300 hover:scale-105 hover:bg-sky-600"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
