// backend/server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const API_KEY = '1a61dc3902e64edcbbd6f3f8cd72456c';  // NewsAPI key

app.use(cors());  // To allow cross-origin requests

const PORT = process.env.PORT || 5000;

// Endpoint to fetch news articles
app.get('/api/news', async (req, res) => {
  const query = req.query.q || 'financial';  // Default to 'financial'
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: query,
        apiKey: API_KEY,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 10,
      },
    });

    res.json(response.data);  // Send back the news data
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
