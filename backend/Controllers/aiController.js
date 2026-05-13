const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const getAIFeedback = async (req, res) => {
    const { originalText, userText } = req.body;

    const prompt = `Analyze this typing test. Original: ${originalText} Typed: ${userText}

Give exactly 2 short simple sentences, no symbols or formatting.
Sentence 1: Tell the user what type of mistakes they made, what pattern, in plain simple english, like a friend talking.
Sentence 2: One concrete drill or tip to fix the most common mistake. 
Write like you are talking to a casual user not a developer. Be brief and specific, never say just slow down or practice more..`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        res.json({ feedback: response.text });
    } catch (err) {
        if (err.status === 429) {
            return res.json({
                feedback: "AI limit reached. Try again tomorrow 🕒"
            });
        }
        res.json({ feedback: "AI unavailable, try later" });
    }
};

module.exports = { getAIFeedback };