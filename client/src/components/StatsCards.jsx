import Timer from "./Timer";

function StatsCards({ time, setTime, wpm, accuracy, chars, onIncrease, onDecrease, isRunning, mode, setChosenTime, feedback }) {
  return (
    <div className="flex justify-center items-center mt-10 px-4">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 max-w-screen-xl">
        <Timer time={time} onIncrease={onIncrease} onDecrease={onDecrease} isRunning={isRunning} mode={mode} setChosenTime={setChosenTime} feedback={feedback}/>

        {mode === "normal" && (
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 md:gap-6 justify-center">
            <div className="bg-[#2e2e30] p-4 md:p-6 rounded-2xl w-full sm:w-28 md:w-32 text-center border border-slate-700 shadow-lg shadow-slate-950/15 hover:shadow-cyan-500/10 hover:scale-105 transition-all">
              <p className="text-xl md:text-3xl font-bold text-white">
                {wpm}
              </p>
              <p className="text-xs md:text-sm text-slate-400 mt-1">
                WPM
              </p>
            </div>

            <div className="bg-[#2e2e30] p-4 md:p-6 rounded-2xl w-full sm:w-28 md:w-32 text-center border border-slate-700 shadow-lg shadow-slate-950/15 hover:shadow-cyan-500/10 hover:scale-105 transition-all">
              <p className="text-xl md:text-3xl font-bold text-white">
                {chars}
              </p>
              <p className="text-xs md:text-sm text-slate-400 mt-1">
                Chars/min
              </p>
            </div>

            <div className="bg-[#2e2e30] p-4 md:p-6 rounded-2xl w-full sm:w-28 md:w-32 text-center border border-slate-700 shadow-lg shadow-slate-950/15 hover:shadow-cyan-500/10 hover:scale-105 transition-all">
              <p className="text-xl md:text-3xl font-bold text-white">
                {accuracy}%
              </p>
              <p className="text-xs md:text-sm text-slate-400 mt-1">
                Accuracy
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatsCards;