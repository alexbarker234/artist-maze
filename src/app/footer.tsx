export default function Footer() {
  return (
    <div className="border-t border-slate-700 w-11/12 max-w-5xl mx-auto mt-auto mb-0 flex justify-between p-4">
      <div>
        By{" "}
        <a
          href="https://github.com/alexbarker234"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block p-[0.25rem_0.15rem] rounded border-b border-sky-600 transition duration-300 hover:bg-sky-600 hover:scale-105"
        >
          Alex Barker
        </a>
      </div>
      <div className="float-right">
        <a
          href="https://github.com/alexbarker234/artist-maze"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block p-[0.25rem_0.15rem] rounded border-b border-sky-600 transition duration-300 hover:bg-sky-600 hover:scale-105"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
