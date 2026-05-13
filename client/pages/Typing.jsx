import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import Navbar from '../src/components/Navbar';
import Header from '../src/components/Header';
import StatsCards from '../src/components/StatsCards';
import TypingBox from '../src/components/TypingBox';
import Restart from '../src/components/restart';
import Timer from "../src/components/Timer";
import BestScoreCard from "../src/components/BestScoreCard";
import NormalMode from "./NormalMode";
import SurvivalMode from "./SurvivalMode";
import Home from "./Home";
import Leaderboard from "../src/components/Leaderboard";

function Typing({ isAuthenticated, setIsAuthenticated }) {

    const [mode, setMode] = useState("normal");
    const [input, setInput] = useState("");
    const [time, setTime] = useState(60);
    const [isRunning, setIsRunning] = useState(false);
    const [timeChosen, setChosenTime] = useState(60);
    const [feedback, setFeedback] = useState({});
    const [testEnded, setTestEnded] = useState(false);
    const [aiFeedback, setAIFeedback] = useState("");
    const [loadingFeedback, setLoadingFeedback] = useState(false);

    const [bestScore, setBestScore] = useState({
        bestWPM: 0,
        bestAccuracy: 0
    });

    const [text, setText] = useState("");
    const [loadingText, setLoadingText] = useState(true);

    const startTimeRef = useRef(null);
    const scoreCardsRef = useRef(null);

    const [survivalTime, setSurvivalTime] = useState(0);

    const [survivalScoreSaved, setSurvivalScoreSaved] = useState(false);

    const [bestSurvivalTime, setBestSurvivalTime] = useState(0);

    const [leaderboard, setLeaderboard] = useState([]);

    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/survival") {
            setMode("survival");
        } else if (location.pathname === "/normal") {
            setMode("normal");
        }
    }, [location.pathname]);

    // Fetch random text on component mount and mode change
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
                setText("the quick brown fox jumps over the lazy dog and then runs across the quiet field where the wind is soft and the sky is clear and blue the fox keeps moving forward without fear as it explores new paths and finds new places to go along the way it meets other animals and watches how they live and survive in the forest the journey is long but calm and peaceful and every step brings a new experience the fox learns to stay alert and aware while also enjoying the beauty around it the sound of leaves the smell of fresh air and the warmth of sunlight make the journey even better as time passes the fox becomes faster and more confident and continues moving ahead without stopping or looking back it knows that every moment matters and every path leads to something new and exciting so it keeps going step by step word by word without giving up".repeat(10));
            } finally {
                setLoadingText(false);
            }
        };

        fetchText();
    }, [mode]);

    useEffect(() => {
        if (feedback) {
            const t = setTimeout(() => setFeedback(null), 800);
            return () => clearTimeout(t);
        }
    }, [feedback]);

    // Set initial time based on mode
    useEffect(() => {
        const initialTime = mode === "normal" ? 60 : 30;
        setTime(initialTime);
        setInput("");
        setChosenTime(initialTime);
        setIsRunning(false);
    }, [mode]);

    // Timer effect
    useEffect(() => {
        let timer;

        if (isRunning && time > 0) {

            const speed = mode === "survival" ? 500 : 1000;

            timer = setInterval(() => {
                setTime(prev => prev - 1);
            }, speed);
        }

        return () => clearInterval(timer);
    }, [isRunning, time, mode]);

    // Handle survival mode completion
    useEffect(() => {

        async function handleSurvivalEnd() {

            if (!startTimeRef.current) return;
            const endTime = Date.now();

            const survivedSeconds = Math.floor(
                (endTime - startTimeRef.current) / 1000
            );

            setSurvivalTime(survivedSeconds);

            if (isAuthenticated) {

                await saveSurvivalScore(survivedSeconds);
                await getBestSurvivalTime();
                await getLeaderboard();
            }

            setSurvivalScoreSaved(true);
        }

        if (
            mode === "survival" &&
            time <= 0 &&
            !survivalScoreSaved
        ) {
            handleSurvivalEnd();
        }

    }, [time]);

    const increaseTime = () => {
        const newTime = Math.min(300, time + 5);
        setTime(newTime);
        setChosenTime(newTime);

    };

    const decreaseTime = () => {
        const newTime = Math.max(5, time - 5);
        setTime(newTime);
        setChosenTime(newTime);
    }

    // Reset test state
    const handleRestart = async () => {
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

        if (mode === "normal") {
            setTime(60);
            setChosenTime(60);
        } else if (mode === "survival") {
            setTime(30);
            setChosenTime(30);
        }
        setInput("");
        setTestEnded(false);
        setIsRunning(false);
        setAIFeedback("");
        setLoadingFeedback(false);
        startTimeRef.current = null;

        setSurvivalTime(0);
        setSurvivalScoreSaved(false);
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

    async function handleTestEnd() {
        if (isAuthenticated) {
            await saveScore(wpm, accuracy);
            await getBestScore();
        }
    }

    async function saveScore(wpm, accuracy) {
        try {
            const token = localStorage.getItem("jwtToken");

            const res = await fetch("http://localhost:5000/score/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ wpm, accuracy })
            });

            const data = await res.json();

        } catch (err) {
        }
    }

    // Save survival mode score
    async function saveSurvivalScore(survivalTime) {

        try {

            const token = localStorage.getItem("jwtToken");

            const res = await fetch(
                "http://localhost:5000/survival/update",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        survivalTime
                    })
                }
            );

            const data = await res.json();

        } catch (err) {
        }
    }

    // Fetch best survival time from database
    async function getBestSurvivalTime() {

        try {

            const token = localStorage.getItem("jwtToken");

            const res = await fetch(
                "http://localhost:5000/survival/best",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await res.json();
            setBestSurvivalTime(data.bestSurvivalTime);

        } catch (err) {
        }
    }

    // Fetch leaderboard data
    async function getLeaderboard() {

        try {

            const token = localStorage.getItem("jwtToken");

            const res = await fetch(
                "http://localhost:5000/survival/leaderboard",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await res.json();
            setLeaderboard(data);

        } catch (err) {
        }
    }


    useEffect(() => {
        if (time === 0 && !testEnded) {
            handleTestEnd();
            setTestEnded(true);
        }
    }, [time]);

    // Fetch and update best score
    async function getBestScore() {
        try {
            const token = localStorage.getItem("jwtToken");

            const res = await fetch("http://localhost:5000/score/best", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();
            setBestScore(data);

        } catch (err) {
        }
    }

    useEffect(() => {

        if (isAuthenticated) {

            getBestScore();

            getBestSurvivalTime();

            getLeaderboard();
        }

    }, [isAuthenticated]);

    // Auto-scroll to score cards when test ends
    useEffect(() => {
        if (testEnded && scoreCardsRef.current) {
            setTimeout(() => {
                scoreCardsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }
    }, [testEnded]);

    // Fetch AI feedback
    const trimmedOriginal = text.slice(0, input.length);

    const getFeedback = async () => {
        try {
            setLoadingFeedback(true);

            const res = await fetch("http://localhost:5000/api/ai-feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    originalText: trimmedOriginal,
                    userText: input,
                }),
            });

            const data = await res.json();
            setAIFeedback(data.feedback);

        } catch (err) {
        } finally {
            setLoadingFeedback(false);
        }
    };

    if (!isAuthenticated) {
        return <Home mode={mode} time={time} setTime={setTime} increaseTime={increaseTime} decreaseTime={decreaseTime} isRunning={isRunning} setChosenTime={setChosenTime} feedback={feedback} input={input} setInput={setInput} setIsRunning={setIsRunning} setFeedback={setFeedback} />;
    }
    return (
        <>
            <Navbar mode={mode} setMode={setMode} isRunning={isRunning} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

            <div className="min-h-screen bg-[#1c1c1e] px-2 sm:px-4 text-white relative overflow-hidden pb-10">

                {mode === "normal" ? (
                    <NormalMode mode={mode} time={time} setTime={setTime} wpm={wpm} accuracy={accuracy} chars={chars} increaseTime={increaseTime} decreaseTime={decreaseTime} isRunning={isRunning} setChosenTime={setChosenTime} feedback={feedback} input={input} setInput={setInput} setIsRunning={setIsRunning} setFeedback={setFeedback} />
                ) : (
                    <SurvivalMode mode={mode} time={time} onIncrease={increaseTime} onDecrease={decreaseTime} isRunning={isRunning} setChosenTime={setChosenTime} feedback={feedback} />
                )}

                <TypingBox
                    input={input}
                    setInput={setInput}
                    isRunning={isRunning}
                    setIsRunning={setIsRunning}
                    time={time}
                    mode={mode}
                    text={text}
                    setTime={setTime}
                    setFeedback={setFeedback}
                    startTimeRef={startTimeRef}
                />

                <div className="flex justify-center items-center">
                    <Restart
                        onRestart={handleRestart}
                    />
                </div>

                {isAuthenticated && mode === "survival" && (

                    <div className="flex justify-center mt-4">

                        <div className="bg-[#2a2a2d] px-6 py-3 rounded-xl shadow-lg shadow-cyan-500/30 border border-cyan-300/60 hover:shadow-cyan-400/40 transition-all">

                            <p className="text-gray-400 text-sm text-center">
                                Best Survival Time
                            </p>

                            <h2 className="text-2xl font-bold text-cyan-300 text-center">
                                {bestSurvivalTime}s
                            </h2>

                        </div>

                    </div>
                )}

                {isAuthenticated && mode === "survival" && (

                    <Leaderboard leaderboard={leaderboard} />
                )}

                {isAuthenticated && mode === "normal" && (
                    <div ref={scoreCardsRef}>
                        <BestScoreCard
                            bestWPM={bestScore.bestWPM}
                            bestAccuracy={bestScore.bestAccuracy}
                        />
                    </div>
                )}



                {/* ai feedback button and display */}
                {mode === "normal" && (<div className="flex flex-col items-center gap-4 mt-6 px-4 sm:px-0">
                    <button
                        onClick={getFeedback}
                        disabled={!testEnded || input.length === 0 || loadingFeedback}
                        className={`w-full sm:w-auto text-center px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg
                            ${!testEnded || input.length === 0 || loadingFeedback
                                ? "bg-slate-700 text-slate-400 cursor-not-allowed border border-slate-700"
                                : "bg-linear-to-r from-cyan-300 to-cyan-400 text-white hover:bg-cyan-700 hover:scale-105 active:scale-95"
                            }
                        `}
                    >
                        {loadingFeedback ? "Generating..." : "Get AI Feedback 🤖"}
                    </button>

                    {aiFeedback && (
                        <div className="w-full max-w-3xl p-1 bg-[#2e2e30] px-6 py-4 rounded-xl text-center shadow-lg shadow-cyan-500/30 border border-cyan-300/60 hover:shadow-cyan-400/40 transition-all">

                            <div className="space-y-3">
                                {aiFeedback
                                    .split("\n")
                                    .filter(line => line.trim() !== "")
                                    .map((p, i) => (
                                        <div
                                            key={i}
                                            className="flex items-start gap-3 bg-[#2e2e30] p-4 rounded-2xl "
                                        >

                                            <p className="text-slate-200 text-md leading-relaxed">{p}</p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}

                </div>
                )}
            </div>
        </>
    )
}

export default Typing;