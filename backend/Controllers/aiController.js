const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const getAIFeedback = async (req, res) => {
    const { originalText, userText } = req.body;

    const prompt = `
Compare the original and typed text and give very short, simple feedback in a sentence or 2 for a typing test. Use easy language. Focus on key mistakes and give improvement tips. Don't use symbols or formatting. 

Original: ${originalText}
User: ${userText}
`;

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