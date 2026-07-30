const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Giant Slayer Bot is up and running!');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
