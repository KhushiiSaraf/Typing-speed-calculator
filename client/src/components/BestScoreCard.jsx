function BestScoreCard({ bestWPM, bestAccuracy }) {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6 px-4 sm:px-0">
      <div className="bg-[#2e2e30] px-6 py-4 rounded-xl text-center shadow-lg shadow-cyan-500/30 border border-cyan-300/60 hover:shadow-cyan-400/40 transition-all w-full sm:w-auto">
        <p className="text-white text-sm font-semibold">Best WPM ⭐</p>
        <h2 className="text-2xl md:text-3xl font-bold text-white">{bestWPM}</h2>
      </div>

      <div className="bg-[#2e2e30] px-6 py-4 rounded-xl text-center shadow-lg shadow-cyan-500/30 border border-cyan-300/60 hover:shadow-cyan-400/40 transition-all w-full sm:w-auto">
        <p className="text-white text-sm font-semibold">Best Accuracy ⭐</p>
        <h2 className="text-2xl md:text-3xl font-bold text-white">{bestAccuracy}%</h2>
      </div>
    </div>
  );
}

export default BestScoreCard;