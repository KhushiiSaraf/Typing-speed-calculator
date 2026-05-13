import Header from "../src/components/Header";
import Navbar from "../src/components/Navbar";
import Restart from "../src/components/restart";
import StatsCards from "../src/components/StatsCards";
import TypingBox from "../src/components/TypingBox";
import { handleError } from "../util";
import { useState, useEffect } from "react";


function Home({ mode, time, setTime, increaseTime, decreaseTime, isRunning, setChosenTime, feedback, input, setInput, setIsRunning, setFeedback }) {

    const [text, setText] = useState("");
    const [loadingText, setLoadingText] = useState(true);
    const [timeChosen, setTimeChosen] = useState(60);

    // Fetch random text on component mount
    useEffect(() => {
        const fetchText = async () => {
            try {
                setLoadingText(true);
                const response = await fetch("http://localhost:5000/api/texts/random");
                const data = await response.json();
                // Repeat the text to make it long enough for typing tests
                setText(data.content.repeat(10));
            } catch (error) {
                // Fallback to default text
                setText("the quick brown fox jumps over the lazy dog ".repeat(50));
            } finally {
                setLoadingText(false);
            }
        };

        fetchText();
    }, []);

    // Set initial time based on mode
    useEffect(() => {
        const initialTime = mode === "normal" ? 60 : 30;
        setTime(initialTime);
        setTimeChosen(initialTime);
    }, [mode]);

    // Local time adjustment functions
    const localIncreaseTime = () => {
        const newTime = Math.min(300, time + 5);
        setTime(newTime);
        setTimeChosen(newTime);
    };

    const localDecreaseTime = () => {
        const newTime = Math.max(5, time - 5);
        setTime(newTime);
        setTimeChosen(newTime);
    };

    //restart
    const handleRestart = async () => {
        // Fetch new random text
        try {
            setLoadingText(true);
            const response = await fetch("http://localhost:5000/api/texts/random");
            const data = await response.json();
            // Repeat the text to make it long enough for typing tests
            setText(data.content.repeat(10));
        } catch (error) {
            // Fallback to default text
            setText("the quick brown fox jumps over the lazy dog and then runs across the quiet field where the wind is soft and the sky is clear and blue the fox keeps moving forward without fear as it explores new paths and finds new places to go along the way it meets other animals and watches how they live and survive in the forest the journey is long but calm and peaceful and every step brings a new experience the fox learns to stay alert and aware while also enjoying the beauty around it the sound of leaves the smell of fresh air and the warmth of sunlight make the journey even better as time passes the fox becomes faster and more confident and continues moving ahead without stopping or looking back it knows that every moment matters and every path leads to something new and exciting so it keeps going step by step word by word without giving up".repeat(50));
        } finally {
            setLoadingText(false);
        }

        if (mode === "normal") {
            setTime(60);
            setTimeChosen(60);
        } else if (mode === "survival") {
            setTime(30);
            setTimeChosen(30);

        }
        setInput("");
        setIsRunning(false);
    };

    // Calculate typing stats
    // Time spent (in seconds)
    const timeSpent = Math.max(0, timeChosen - time);

    // CORRECT CHAR COUNT (position based)
    let correctChars = 0;

    for (let i = 0; i < input.length; i++) {
        if (input[i] === text[i]) {
            correctChars++;
        }
    }

    const chars = correctChars;

    // WPM (standard calculation - correct characters / 5 per minute)
    const words = correctChars / 5;
    const wpm = timeSpent > 0
        ? Math.round(words / (timeSpent / 60))
        : 0;

    // ACCURACY
    const accuracy = input.length
        ? Math.round((correctChars / input.length) * 100)
        : 0;

    return (
        <>
            <Navbar mode={mode} setMode={() => { }} isRunning={isRunning} isAuthenticated={false} setIsAuthenticated={() => { }} />
            <div className="min-h-screen bg-[#1c1c1e] px-2 sm:px-4 text-white relative overflow-hidden">
                <Header mode={mode} />
                <StatsCards
                    time={time}
                    setTime={setTime}
                    wpm={wpm}
                    accuracy={accuracy}
                    chars={chars}
                    onIncrease={localIncreaseTime}
                    onDecrease={localDecreaseTime}
                    isRunning={isRunning}
                    mode={mode}
                    setChosenTime={setTimeChosen}
                    feedback={feedback}
                />
                <TypingBox
                    input={input}
                    setInput={setInput}
                    setIsRunning={setIsRunning}
                    setFeedback={setFeedback}
                    mode={mode}
                    time={time}
                    text={text}
                    setTime={setTime}
                />
                <div className="flex justify-center items-center">
                    <Restart
                        onRestart={handleRestart}
                    />
                </div>

                {/* ai feedback button and display */}
                {mode === "normal" && (<div className="flex flex-col items-center gap-4 mt-6 px-4 sm:px-0">
                    <button
                       onClick={() => handleError("Login to get AI feedback!")}

                        className={`w-full sm:w-auto text-center px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg
                        bg-linear-to-r from-cyan-400 to-cyan-500 text-white hover:bg-cyan-700 hover:scale-105 active:scale-95 active:bg-cyan-600 shadow-cyan-500/30 hover:shadow-cyan-500/50    
                        `}
                    >
                        Get AI Feedback 🤖
                    </button>
                </div>
                )}
            </div>



        </>
    )

}

export default Home;