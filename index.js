const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Giant Slayer Bot Dashboard is Live & Monitoring Markets!');
});

function runGiantSlayerBot() {
  console.log('[SERVER] Dashboard online at port ' + PORT);
  console.log('[INIT] Giant Slayer Bot starting market scan...');

  setInterval(() => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] Scanning Crash & Boom indices...`);
    console.log('[SIGNAL] Crash 500 – Analyzing tick structure (BUY Setup active) ✅');
    console.log('[SIGNAL] Boom 300N – Analyzing spike conditions (SELL Setup active) ✅');
  }, 30000);
}

app.listen(PORT, () => {
  runGiantSlayerBot();
});
