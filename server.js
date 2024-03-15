const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

app.use('/css', express.static(path.join(__dirname, 'css')));

app.use('/js', express.static(path.join(__dirname, 'js')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/data', (req, res) => {
    const data = {
        message: 'This is your API response data!'
    };
    res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
