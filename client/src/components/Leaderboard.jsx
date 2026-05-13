function Leaderboard({ leaderboard }) {

    return (
        <div className="w-full max-w-xl mx-auto mt-6 bg-[#2a2a2d] rounded-xl p-4 border border-gray-700">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-4 bg-linear-to-r from-[#0ea5e9] via-[#6ef0f7] to-[#e0fffe] bg-clip-text text-transparent">
                Survival Leaderboard
            </h2>

            <div className="space-y-3">

                {leaderboard.map((user, index) => (

                    <div
                        key={index}
                        className="flex flex-row sm:flex-row justify-between items-start sm:items-center bg-[#1f1f22] px-4 py-3 rounded-lg gap-2 sm:gap-0"
                    >

                        <div className="flex items-center gap-3">

                            <span className="text-gray-400 font-bold">
                                #{index + 1}
                            </span>

                            <span className="text-white">
                                {user.name}
                            </span>

                        </div>

                        <span className="text-cyan-300 font-bold">
                            {user.bestSurvivalTime}s
                        </span>

                    </div>
                ))}

            </div>
        </div>
    );
}

export default Leaderboard;