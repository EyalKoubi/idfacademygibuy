function NavBar() {
  return (
    <>
      <nav className="flex justify-evenly items-center w-full py-5 px-20">
        <div className="flex items-center w-full">
          <a href="/" className="text-slate-900 text-4xl font-leagueGothic">
            <span>IDF</span>
            <span className="text-emerald-700">A</span>
          </a>
        </div>
        <div className="flex justify-center gap-10 items-center w-full">
          <a
            href="/contact"
            className="text-xl text-slate-900 hover:text-slate-600 font-assistant"
          >
            צור קשר
          </a>
          <a
            href="/about-us"
            className="text-xl text-slate-900 hover:text-slate-600 font-assistant"
          >
            עלינו
          </a>
          <a
            href="/courses"
            className="text-xl text-slate-900 hover:text-slate-600 font-assistant"
          >
            כל הקורסים
          </a>
          <a
            href="/"
            className="text-xl text-slate-900 hover:text-slate-600 font-assistant"
          >
            בית
          </a>
        </div>
        <div className="flex items-center w-full justify-end">
          <button className="btn bg-emerald-700 hover:bg-emerald-800 text-sm text-white px-5 rounded-md font-assistant">
            התחל ללמוד
          </button>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
