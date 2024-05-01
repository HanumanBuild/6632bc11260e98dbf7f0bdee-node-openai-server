require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
const openAiUrl = "https://api.openai.com/v1/engines/text-davinci-001/completions";

app.post('/api/query', async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await axios.post(openAiUrl, {
            prompt: prompt,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });
        res.json({ success: true, response: response.data });
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch response from OpenAI' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});