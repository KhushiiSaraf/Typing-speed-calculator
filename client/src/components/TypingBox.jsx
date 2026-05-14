import { useEffect, useRef } from "react";

function TypingBox({
    input,
    setInput,
    isRunning,
    setIsRunning,
    time,
    mode,
    text,
    setTime,
    setFeedback,
    startTimeRef
}) {


const lastProcessedWordIndex = useRef(-1);
useEffect(() => {
    lastProcessedWordIndex.current = -1;
}, [input]);

const actualWords = text.split(" ");

const currentIndex = input.length;

// Start shifting after just 10 characters instead of waiting for middle
const windowSize = 80;
const start = Math.max(0, currentIndex - 10);
const end = Math.min(text.length, start + windowSize);

const visibleText = text.slice(start, end);

const inputRef = useRef(null);

useEffect(() => {
    inputRef.current.focus();
}, []);

    return (
        <div
            className="bg-[#2e2e30] border border-slate-700 p-4 sm:p-5 md:p-6 rounded-xl mt-8 md:mt-10 max-w-6xl mx-auto shadow-lg shadow-slate-950/20 relative w-full"
        >
            {/* TEXT DISPLAY */}
            <p
                className="text-base sm:text-lg md:text-[24px] lg:text-[29px] leading-relaxed tracking-wide whitespace-nowrap overflow-x-auto hide-scrollbar"
            >
            
                {visibleText.split("").map((char, i) => {
                    const actualIndex = start + i;

                    if (actualIndex < currentIndex) {
                        const isCorrect = char === input[actualIndex];

                        return (
                            <span
                                key={i}
                                className={
                                    isCorrect
                                        ? "text-gray-400"
                                        : "text-red-400 line-through"
                                }
                            >
                                {char}
                            </span>
                        );
                    }

                    if (actualIndex === currentIndex) {
                        return (
                            <span key={i} className="text-cyan-400 underline">
                                {char}
                            </span>
                        );
                    }

                    return (
                        <span key={i} className="text-gray-300">
                            {char}
                        </span>
                    );
                })}
            </p>

            {/* INVISIBLE INPUT */}
            <input
                ref={inputRef}
                type="text"
                value={input}
                disabled={time === 0}
                //backspace logic for survival mode
                onKeyDown={(e) => {
                    if (mode === "survival" && e.key === "Backspace") {
                        e.preventDefault(); // BLOCK BACKSPACE
                    }
                }}
                onChange={(e) => {
                    if (time === 0) return;

                    const value = e.target.value;

                    if (!isRunning) {

                        setIsRunning(true);

                        if (mode === "survival") {
                            startTimeRef.current = Date.now();
                        }
                    }

                    // SURVIVAL MODE LOGIC
                    if (mode === "survival") {
                        const value = e.target.value;

                        // run only when space is pressed
                        if (value.endsWith(" ")) {
                            const words = value.trim().split(" ");
                            const wordIndex = words.length - 1;

                            // prevent duplicate processing
                            if (wordIndex !== lastProcessedWordIndex.current) {
                                lastProcessedWordIndex.current = wordIndex;

                                // get character positions
                                let startIndex = 0;

                                for (let i = 0; i < wordIndex; i++) {
                                    startIndex += words[i].length + 1; // +1 for space
                                }

                                const typedWord = words[wordIndex];
                                const actualWord = text.slice(
                                    startIndex,
                                    startIndex + typedWord.length
                                );

                                if (typedWord === actualWord) {
                                    setTime((prev) => Math.min(prev + 2, 60));
                                    setFeedback({ type: "good", text: "+2 sec" });

                                } else {
                                    setTime((prev) => Math.max(prev - 5, 0));
                                    setFeedback({ type: "bad", text: "-5 sec" });
                                }
                            }
                        }
                    }

                    setInput(value);
                }}
                className="absolute opacity-0 top-0 left-0 w-full h-full"
            />
        </div>
    );
}

export default TypingBox;