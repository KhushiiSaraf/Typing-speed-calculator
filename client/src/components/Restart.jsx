function Restart({onRestart}) {
    return (
        <button
            onClick={onRestart}
            className="mt-4 px-4 py-2 bg-linear-to-r from-cyan-400 to-cyan-600 text-slate-900 font-semibold rounded-lg shadow-lg hover:shadow-cyan-500/50 hover:scale-105 active:scale-95 active:shadow-cyan-500/30 transition-all duration-200"
        >
            Restart
        </button>
    )
}

export default Restart;