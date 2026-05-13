import Timer from "../src/components/Timer";
import Header from "../src/components/Header";

function SurvivalMode({ mode, time, onIncrease, onDecrease, isRunning, setChosenTime, feedback }) {


    return (
        <div className="flex justify-center items-center w-full p-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 w-full max-w-4xl">
                <div className="flex flex-col items-center md:items-start flex-1 md:flex-none">
                    <Header mode={mode} />
                    <p className="text-slate-400 text-sm max-w-xs leading-relaxed text-center md:text-left mt-2">
                        Stay alive as long as you can ⏳ <br />
                        Correct words give you +2 seconds. <br />
                        Mistakes reduce your time. <br />
                    </p>
                </div>
                <div className="flex items-center justify-center flex-1 md:flex-none mt-4 md:mt-0">
                    <Timer time={time} onIncrease={onIncrease} onDecrease={onDecrease} isRunning={isRunning} mode={mode} setChosenTime={setChosenTime} feedback={feedback} />
                </div>
            </div>
        </div>
    )
}
export default SurvivalMode;