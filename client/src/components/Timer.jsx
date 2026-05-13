function Timer({ time, onIncrease, onDecrease, isRunning, mode, setChosenTime, feedback }) {
  const getStyle = () => {
    if (!feedback) return "border-[#6ef0f7]";

    return feedback.type === "good"
      ? "border-green-400 scale-110"
      : "border-red-400 scale-110";
  };
  if (mode === "survival") {
  return (
    <div className="flex justify-center ">
      <div className={`w-48 h-48 md:w-56 md:h-56 rounded-full 
        border-4 ${getStyle()}
        flex flex-col items-center justify-center 
        bg-[#2e2e30] shadow-lg shadow-[#6ef0f7]/20 `}>

        <p className="text-4xl md:text-5xl font-bold text-white">
          {time}
        </p>
        <p className="text-xs md:text-sm text-slate-400">
          seconds
        </p>
      </div>
    </div>
  );
}
  return (
    <div className="flex items-center gap-4">
      {mode !== "survival" && (
        <button
          onClick={onDecrease}
          disabled={isRunning}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full 
                bg-[#2e2e30] border border-slate-700 
                flex items-center justify-center 
                text-white text-xl font-bold 
                hover:bg-cyan-500/20 hover:scale-110 
                active:scale-95 active:bg-cyan-500/30
                disabled:opacity-50 disabled:cursor-not-allowed 
                transition-all shadow-md"
        >
          -
        </button>
      )}

      <div className={`${mode === "survival" ? "w-48 h-48 md:w-56 md:h-56" : "w-28 h-28 md:w-32 md:h-32"} rounded-full 
            border-4  ${getStyle()}
            flex flex-col items-center justify-center 
            bg-[#2e2e30] shadow-lg shadow-cyan-500/20`}>

        <p className={`${mode === "survival" ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"} font-bold text-white`}>
          {time}
        </p>
        <p className="text-xs md:text-sm text-gray-400">
          seconds
        </p>
      </div>

      {mode !== "survival" && (
        <button
          onClick={onIncrease}
          disabled={isRunning}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full 
                bg-[#2e2e30] border border-slate-700 
                flex items-center justify-center 
                text-white text-xl font-bold 
                hover:bg-cyan-500/20 hover:scale-110 
                active:scale-95 active:bg-cyan-500/30
                disabled:opacity-50 disabled:cursor-not-allowed 
                transition-all shadow-md"
        >
          +
        </button>
      )}
    </div>
  )
}

export default Timer;   
