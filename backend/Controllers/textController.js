const fs = require('fs');
const path = require('path');

const getAllTexts = (req, res) => {
    try {
        const textsPath = path.join(__dirname, '../texts.json');
        const textsData = fs.readFileSync(textsPath, 'utf8');
        const texts = JSON.parse(textsData);
        res.status(200).json(texts);
    } catch (error) {
        console.error('Error reading texts:', error);
        res.status(500).json({ error: 'Failed to load texts' });
    }
};

const getTextById = (req, res) => {
    try {
        const { id } = req.params;
        const textsPath = path.join(__dirname, '../texts.json');
        const textsData = fs.readFileSync(textsPath, 'utf8');
        const texts = JSON.parse(textsData);
        const text = texts.find(t => t.id === parseInt(id));

        if (!text) {
            return res.status(404).json({ error: 'Text not found' });
        }

        res.status(200).json(text);
    } catch (error) {
        console.error('Error reading text:', error);
        res.status(500).json({ error: 'Failed to load text' });
    }
};

const getRandomText = (req, res) => {
    try {
        const { difficulty } = req.query;
        const textsPath = path.join(__dirname, '../texts.json');
        const textsData = fs.readFileSync(textsPath, 'utf8');
        const texts = JSON.parse(textsData);

        let filteredTexts = texts;
        if (difficulty) {
            filteredTexts = texts.filter(t => t.difficulty === difficulty);
        }

        if (filteredTexts.length === 0) {
            return res.status(404).json({ error: 'No texts found for the specified difficulty' });
        }

        const randomText = filteredTexts[Math.floor(Math.random() * filteredTexts.length)];
        res.status(200).json(randomText);
    } catch (error) {
        console.error('Error getting random text:', error);
        res.status(500).json({ error: 'Failed to get random text' });
    }
};

module.exports = {
    getAllTexts,
    getTextById,
    getRandomText
};