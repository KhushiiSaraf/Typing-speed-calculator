import Header from "../src/components/Header";
import StatsCards from "../src/components/StatsCards";
import TypingBox from "../src/components/TypingBox";


function NormalMode({ mode, time, setTime, wpm, accuracy, chars, increaseTime, decreaseTime, isRunning, setChosenTime, feedback, input, setInput, setIsRunning, setFeedback }) {

    return (
    <>
    <Header mode = { mode } />
    <StatsCards
            time={time}
            setTime={setTime}
            wpm={wpm}
            accuracy={accuracy}
            chars={chars}
            onIncrease={increaseTime}
            onDecrease={decreaseTime}
            isRunning={isRunning}
            mode={mode}
            setChosenTime={setChosenTime}
            feedback={feedback}
    />

    </>
    )
    
}

export default NormalMode;