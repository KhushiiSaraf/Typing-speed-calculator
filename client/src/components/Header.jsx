function Header({mode}) {
  return (
    <div className={`mt-10 ${mode === "survival" ? "text-left" : "text-center"}`}>
      <h1 className="text-4xl sm:text-5xl font-extrabold bg-linear-to-r from-[#0ea5e9] via-[#6ef0f7] to-[#e0fffe] bg-clip-text text-transparent">
        {mode==="normal" ? "Test Your Speed" : "Survival Mode"}
      </h1>

      {mode !== "survival" && (
        <p className="mt-3 text-gray-400">
          {mode==="normal" ? "Improve your typing skills with real-time stats" : "Keep typing to stay alive!"}
        </p>
      )}
    </div>
  );
}

export default Header;