const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// In-memory state for demonstration
let botState = {
    running: false,
    liveProfit: 0.00,
    targetCap: 1000.00,
    logs: ["[13:08:01] [SYSTEM] GIANTSLAYER REMOTE v2.0 online. Awaiting credentials."]
};

// ================= PAGE 1: ULTRA-MODERN 3D CYBERNETIC LOGIN PAGE =================
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>GiantSlayer Login - Secure Gateway</title>
            <style>
                * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
                body {
                    background-color: #050505;
                    color: #ffffff;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    overflow-x: hidden;
                }
                .container {
                    width: 100%;
                    max-width: 400px;
                    background: rgba(15, 18, 25, 0.75);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 24px;
                    padding: 28px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1);
                }
                .robot-banner {
                    width: 100%;
                    height: 180px;
                    border-radius: 16px;
                    background: #000 url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop') center/cover no-repeat;
                    position: relative;
                    margin-bottom: 24px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.8), inset 0 0 20px rgba(220, 38, 38, 0.3);
                    border: 1px solid rgba(239, 68, 68, 0.3);
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                    padding-bottom: 12px;
                }
                .robot-banner::after {
                    content: 'APEX TRADER AI';
                    font-size: 11px;
                    font-weight: 800;
                    letter-spacing: 2px;
                    color: #fca5a5;
                    background: rgba(0, 0, 0, 0.8);
                    padding: 4px 12px;
                    border-radius: 20px;
                    border: 1px solid rgba(239, 68, 68, 0.4);
                }
                .section-title {
                    font-size: 15px;
                    font-weight: 700;
                    color: #38bdf8;
                    margin-bottom: 18px;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                }
                .form-group {
                    margin-bottom: 16px;
                }
                label {
                    display: block;
                    font-size: 12px;
                    font-weight: 600;
                    color: #94a3b8;
                    margin-bottom: 6px;
                    letter-spacing: 0.3px;
                }
                input {
                    width: 100%;
                    background: #0b0f17;
                    border: 1px solid #1e293b;
                    border-radius: 12px;
                    padding: 14px 16px;
                    color: #ffffff;
                    font-size: 14px;
                    outline: none;
                    transition: all 0.3s ease;
                    box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);
                }
                input:focus {
                    border-color: #38bdf8;
                    box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.15), inset 0 2px 4px rgba(0,0,0,0.5);
                }
                .divider {
                    height: 1px;
                    background: rgba(255, 255, 255, 0.08);
                    margin: 20px 0;
                }
                .btn-connect {
                    width: 100%;
                    background: linear-gradient(135deg, #2563eb, #1d4ed8);
                    color: #ffffff;
                    border: none;
                    border-radius: 12px;
                    padding: 15px;
                    font-size: 15px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    box-shadow: 0 10px 20px -5px rgba(37, 99, 235, 0.5);
                    letter-spacing: 0.5px;
                }
                .btn-connect:active {
                    transform: scale(0.98);
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="robot-banner"></div>
                <div class="section-title">🔐 MT4 / MT5 Login Details</div>
                
                <form action="/dashboard" method="POST">
                    <div class="form-group">
                        <label>Login ID</label>
                        <input type="text" name="mt5_login" placeholder="Enter account number" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" name="mt5_password" placeholder="Enter trading password" required>
                    </div>
                    
                    <div class="form-group">
                        <label>MT5 Server / Broker</label>
                        <input type="text" name="mt5_server" placeholder="e.g. Weltrade-Server" required>
                    </div>

                    <div class="divider"></div>

                    <div class="section-title" style="font-size: 13px;">Alternative API Integration</div>
                    <div class="form-group">
                        <label>Deriv Token / API Key</label>
                        <input type="password" name="api_token" placeholder="Optional API token">
                    </div>

                    <button type="submit" class="btn-connect" style="margin-top: 10px;">Connect & Launch Terminal →</button>
                </form>
            </div>
        </body>
        </html>
    `);
});

// ================= PAGE 2: HIGH-TECH COMMAND CENTER DASHBOARD =================
app.all('/dashboard', (req, res) => {
    // Handle actions (Run / Stop) if passed via query or body
    if (req.query.action === 'run') {
        botState.running = true;
        botState.logs.unshift(`[${new Date().toLocaleTimeString()}] [EXEC] Autonomous engine started. Hunting active.`);
    } else if (req.query.action === 'stop') {
        botState.running = false;
        botState.logs.unshift(`[${new Date().toLocaleTimeString()}] [SYSTEM] Trading safely halted by operator.`);
    }

    // Simulate profit increment when running
    if (botState.running && botState.liveProfit < botState.targetCap) {
        botState.liveProfit = Math.min(botState.targetCap, botState.liveProfit + 125.40);
    }

    const progressPercent = Math.min(100, (botState.liveProfit / botState.targetCap) * 100).toFixed(1);

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>GiantSlayer Remote - Command Center</title>
            <style>
                * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
                body {
                    background-color: #070a13;
                    color: #ffffff;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 16px;
                }
                .wrapper {
                    width: 100%;
                    max-width: 420px;
                }
                .header-card {
                    background: #0f172a;
                    border: 1px solid #1e293b;
                    border-radius: 16px;
                    padding: 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 14px;
                }
                .status-badge {
                    background: ${botState.running ? 'rgba(34, 197, 94, 0.15)' : 'rgba(100, 116, 139, 0.15)'};
                    color: ${botState.running ? '#4ade80' : '#94a3b8'};
                    border: 1px solid ${botState.running ? 'rgba(34, 197, 94, 0.3)' : 'rgba(100, 116, 139, 0.3)'};
                    padding: 6px 12px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.5px;
                }
                .profit-card {
                    background: linear-gradient(145deg, #0b0f19, #0f172a);
                    border: 1px solid #1e293b;
                    border-radius: 20px;
                    padding: 24px;
                    text-align: center;
                    margin-bottom: 14px;
                    box-shadow: 0 20px 30px rgba(0,0,0,0.5);
                }
                .profit-value {
                    font-size: 38px;
                    font-weight: 900;
                    color: #4ade80;
                    margin: 10px 0;
                    text-shadow: 0 0 20px rgba(74, 222, 128, 0.3);
                }
                .progress-bar-bg {
                    background: #1e293b;
                    height: 8px;
                    border-radius: 4px;
                    overflow: hidden;
                    margin-top: 12px;
                }
                .progress-bar-fill {
                    background: linear-gradient(90deg, #22c55e, #4ade80);
                    width: ${progressPercent}%;
                    height: 100%;
                    transition: width 0.4s ease;
                }
                .grid-controls {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                    margin-bottom: 14px;
                }
                .stat-box {
                    background: #0f172a;
                    border: 1px solid #1e293b;
                    border-radius: 14px;
                    padding: 14px;
                    text-align: center;
                }
                .stat-box .num {
                    font-size: 20px;
                    font-weight: 800;
                    color: #f8fafc;
                    margin-top: 4px;
                }
                .action-buttons {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 14px;
                }
                .btn {
                    flex: 1;
                    padding: 15px;
                    border-radius: 12px;
                    font-weight: 700;
                    font-size: 14px;
                    border: none;
                    cursor: pointer;
                    text-align: center;
                    text-decoration: none;
                }
                .btn-run { background: #22c55e; color: #ffffff; box-shadow: 0 8px 20px rgba(34, 197, 94, 0.3); }
                .btn-stop { background: #991b1b; color: #fca5a5; box-shadow: 0 8px 20px rgba(153, 27, 27, 0.3); }
                .logs-card {
                    background: #04060b;
                    border: 1px solid #1e293b;
                    border-radius: 14px;
                    padding: 12px;
                    font-family: monospace;
                    font-size: 11px;
                    color: #4ade80;
                    height: 110px;
                    overflow-y: auto;
                }
                .back-link {
                    display: block;
                    text-align: center;
                    margin-top: 14px;
                    color: #64748b;
                    font-size: 12px;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="wrapper">
                <div class="header-card">
                    <div>
                        <h2 style="font-size: 16px; color: #38bdf8; letter-spacing: 0.5px;">GIANTSLAYER REMOTE</h2>
                        <span style="font-size: 11px; color: #64748b;">Margin Compounding Architecture</span>
                    </div>
                    <div class="status-badge">${botState.running ? '🟢 RUNNING' : '⚪ STANDBY'}</div>
                </div>

                <div class="profit-card">
                    <div style="font-size: 11px; color: #94a3b8; letter-spacing: 1px;">LIVE FLOAT PROFIT ($)</div>
                    <div class="profit-value">+$${botState.liveProfit.toFixed(2)}</div>
                    <div style="font-size: 12px; color: #64748b;">Cap Goal: $${botState.targetCap.toFixed(2)} (${progressPercent}%)</div>
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill"></div>
                    </div>
                </div>

                <div class="grid-controls">
                    <div class="stat-box">
                        <div style="font-size: 11px; color: #94a3b8;">BOOM_1000</div>
                        <div class="num">72</div>
                    </div>
                    <div class="stat-box">
                        <div style="font-size: 11px; color: #94a3b8;">BOOM_500</div>
                        <div class="num" style="color: #4ade80;">79</div>
                    </div>
                </div>

                <div class="action-buttons">
                    <a href="/dashboard?action=run" class="btn btn-run">▶ Run Trades</a>
                    <a href="/dashboard?action=stop" class="btn btn-stop">■ Stop Trading</a>
                </div>

                <div class="logs-card">
                    ${botState.logs.join('<br>')}
                </div>

                <a href="/" class="logout-link" style="display: block; text-align: center; margin-top: 15px; color: #64748b; font-size: 12px; text-decoration: none;">← Back to Credentials Login</a>
            </div>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
    activeBatches: [],
    logs: []
};

function addLog(message) {
    const timestamp = new Date().toISOString().split('T')[1].slice(0, 8);
    const logEntry = `[${timestamp}] ${message}`;
    botState.logs.unshift(logEntry);
    if (botState.logs.length > 60) botState.logs.pop();
    console.log(logEntry);
}

app.get('/', (req, res) => {
    const uptimeSec = Math.floor((Date.now() - botState.uptimeStart) / 1000);
    const hours = String(Math.floor(uptimeSec / 3600)).padStart(2, '0');
    const mins = String(Math.floor((uptimeSec % 3600) / 60)).padStart(2, '0');
    const secs = String(uptimeSec % 60).padStart(2, '0');

    res.setHeader('Content-Type', 'text/html');
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>GiantSlayer Bot 2026 Command Center</title>
        <meta http-equiv="refresh" content="3">
        <style>
            body { background-color: #0f172a; color: #f8fafc; font-family: monospace; padding: 20px; margin: 0; }
            h1 { color: #38bdf8; font-size: 20px; border-bottom: 1px solid #334155; padding-bottom: 10px; margin-top: 0; }
            h3 { color: #38bdf8; font-size: 15px; margin-top: 0; }
            .card { background: #1e293b; border: 1px solid #334155; padding: 15px; margin-bottom: 15px; border-radius: 6px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { text-align: left; padding: 8px; border-bottom: 1px solid #334155; font-size: 13px; }
            th { color: #94a3b8; }
            .log-box { background: #020617; padding: 12px; border-radius: 4px; height: 160px; overflow-y: auto; font-size: 12px; color: #4ade80; border: 1px solid #1e293b; }
            .metrics { display: flex; gap: 20px; flex-wrap: wrap; }
            .metric-item { flex: 1; min-width: 180px; background: #0f172a; padding: 10px; border-radius: 4px; border: 1px solid #334155; }
            .badge-buy { color: #60a5fa; font-weight: bold; }
            .badge-sell { color: #f43f5e; font-weight: bold; }
        </style>
    </head>
    <body>
        <h1>🟢 GIANTSLAYER BOT 2026 | COMMAND CENTER</h1>
        
        <div class="card">
            <div class="metrics">
                <div class="metric-item"><strong>Status:</strong><br><span style="color: #4ade80;">${botState.status}</span></div>
                <div class="metric-item"><strong>Uptime:</strong><br>${hours}:${mins}:${secs}</div>
                <div class="metric-item"><strong>Global Target:</strong><br>$${CONFIG.target_profit.toFixed(2)}</div>
            </div>
            <div class="metrics" style="margin-top: 10px;">
                <div class="metric-item"><strong>Account Balance:</strong><br>$${botState.balance.toFixed(2)}</div>
                <div class="metric-item"><strong>Floating P&L:</strong><br><span style="color: ${botState.floatingPL >= 0 ? '#4ade80' : '#f87171'}">$${botState.floatingPL.toFixed(2)}</span></div>
                <div class="metric-item"><strong>Active Batches:</strong><br>${botState.activeBatches.length} (${CONFIG.lot_size} lots)</div>
            </div>
        </div>

        <div class="card">
            <h3>📡 Active Markets & System Rules</h3>
            <table>
                <tr>
                    <th>Symbol</th>
                    <th>Direction Rule</th>
                    <th>Engine State</th>
                </tr>
                ${ASSETS.map(a => `
                    <tr>
                        <td><strong>${a.name}</strong></td>
                        <td><span class="${a.action === 'BUY' ? 'badge-buy' : 'badge-sell'}">${a.action} ONLY</span></td>
                        <td>🟢 M15 Stacking Active</td>
                    </tr>
                `).join('')}
            </table>
        </div>

        <div class="card">
            <h3>💼 Open Positions (Active Margin Basket)</h3>
            <table>
                <tr>
                    <th>Ticket</th>
                    <th>Symbol</th>
                    <th>Type</th>
                    <th>Lots</th>
                    <th>Floating P&L</th>
                </tr>
                ${botState.activeBatches.length === 0 ? '<tr><td colspan="5" style="color: #64748b;">No active batches in basket. Waiting for M15 alignment...</td></tr>' : 
                  botState.activeBatches.map(b => `
                    <tr>
                        <td>#${b.ticket}</td>
                        <td>${b.symbol}</td>
                        <td><span class="${b.type === 'BUY' ? 'badge-buy' : 'badge-sell'}">${b.type}</span></td>
                        <td>${b.lots}</td>
                        <td style="color: #4ade80;">+$${b.profit.toFixed(2)}</td>
                    </tr>
                `).join('')}
            </table>
        </div>

        <div class="card">
            <h3>💻 Real-Time Terminal Logs</h3>
            <div class="log-box">
                ${botState.logs.join('<br>')}
            </div>
        </div>
    </body>
    </html>
    `);
});

function startEngine() {
    addLog("[ENGINE] Staggered 8-symbol concurrent scanner initialized (120ms intervals).");
    addLog(`[ENGINE] Rules enforced: DEX removed, Crash=Buys, Boom=Sells, Target=$${CONFIG.target_profit}.`);
    
    if (CONFIG.mock_mode) {
        addLog("[MOCK] 120 seed candles loaded per symbol. Streaming live ticks...");
    }

    setInterval(() => {
        if (CONFIG.mock_mode) {
            const randomAsset = ASSETS[Math.floor(Math.random() * ASSETS.length)];
            const ticketId = Math.floor(100000 + Math.random() * 900000);
            
            addLog(`[SIGNAL] ${randomAsset.name} — Initial entry (${randomAsset.action}) ✅`);
            
            botState.activeBatches.push({
                ticket: ticketId,
                symbol: randomAsset.name,
                type: randomAsset.action,
                lots: CONFIG.lot_size,
                profit: 0.35
            });

            botState.floatingPL = botState.activeBatches.reduce((acc, curr) => acc + curr.profit, 0);
            addLog(`[M15 BAR] ${randomAsset.name}: Slow drift confirmed. Executing ${CONFIG.lot_size}-lot ${randomAsset.action} batch (Ticket #${ticketId}).`);

            if (botState.floatingPL >= CONFIG.target_profit) {
                addLog(`[TARGET REACHED] Global profit target of $${CONFIG.target_profit} achieved! Closing basket with zero remorse.`);
                botState.balance += botState.floatingPL;
                botState.activeBatches = [];
                botState.floatingPL = 0.00;
            }
        }
    }, 12000);
}

app.listen(PORT, () => {
    addLog(`[SERVER] Dashboard online at port ${PORT}`);
    startEngine();
});
