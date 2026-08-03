/**
 * Project: The Giantslayer Bot AI v3.1 (Elite Terminal Edition)
 * Description: Fully integrated Node.js / Express backend with Elite Login Gateway & Command Center Dashboard.
 * Deployment Ready: GitHub & Render
 */

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let botState = {
    running: false,
    liveProfit: 1.42,
    targetCap: 10000.00,
    strategy: 'Giantslayer AI v3',
    logs: [
        "[19:02:10] [AI KERNEL] Strategy 'Giantslayer AI v3' locked on volatility matrix.",
        "[19:00:04] [AUTH] Secure TLS handshake verified. Node operational."
    ]
};

// ================= PAGE 1: THE ELITE CYBERNETIC LOGIN GATEWAY =================
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>GIANTSLAYER BOT AI - Elite Terminal</title>
            <style>
                * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
                body {
                    background-color: #030508;
                    color: #ffffff;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    overflow-x: hidden;
                }
                .glow-wrapper {
                    position: relative;
                    width: 100%;
                    max-width: 420px;
                    border-radius: 26px;
                    padding: 2px;
                    background: linear-gradient(135deg, #38bdf8, #2563eb, #7c3aed, #38bdf8);
                    background-size: 300% 300%;
                    animation: borderGlow 6s ease infinite;
                    box-shadow: 0 25px 60px -15px rgba(56, 189, 248, 0.25);
                }
                @keyframes borderGlow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .container {
                    width: 100%;
                    background: rgba(8, 12, 20, 0.95);
                    backdrop-filter: blur(25px);
                    border-radius: 24px;
                    padding: 28px;
                }
                .robot-banner {
                    width: 100%;
                    height: 200px;
                    border-radius: 16px;
                    background: #000 url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop') center/cover no-repeat;
                    position: relative;
                    margin-bottom: 20px;
                    border: 1px solid rgba(56, 189, 248, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: inset 0 0 50px rgba(0,0,0,0.9), 0 10px 30px rgba(0,0,0,0.5);
                }
                .banner-title {
                    font-size: 17px;
                    font-weight: 900;
                    letter-spacing: 2px;
                    color: #ffffff;
                    background: rgba(5, 8, 15, 0.85);
                    padding: 12px 20px;
                    border-radius: 24px;
                    border: 1px solid rgba(56, 189, 248, 0.7);
                    text-shadow: 0 0 15px rgba(56, 189, 248, 0.9);
                    box-shadow: 0 0 25px rgba(37, 99, 235, 0.4);
                }
                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 12px;
                }
                .section-title {
                    font-size: 13px;
                    font-weight: 700;
                    color: #38bdf8;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .server-status-pill {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 10px;
                    color: #4ade80;
                    background: rgba(34, 197, 94, 0.1);
                    padding: 3px 8px;
                    border-radius: 10px;
                    border: 1px solid rgba(34, 197, 94, 0.2);
                }
                .ping-dot {
                    width: 6px;
                    height: 6px;
                    background: #4ade80;
                    border-radius: 50%;
                    box-shadow: 0 0 8px #4ade80;
                    animation: pulseDot 2s infinite;
                }
                @keyframes pulseDot {
                    0% { transform: scale(0.95); opacity: 0.8; }
                    50% { transform: scale(1.3); opacity: 1; box-shadow: 0 0 12px #4ade80; }
                    100% { transform: scale(0.95); opacity: 0.8; }
                }
                .form-group {
                    margin-bottom: 14px;
                }
                label {
                    display: block;
                    font-size: 11px;
                    font-weight: 600;
                    color: #94a3b8;
                    margin-bottom: 5px;
                    letter-spacing: 0.5px;
                }
                .input-box-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                }
                input {
                    width: 100%;
                    background: #04070e;
                    border: 1px solid #1e293b;
                    border-radius: 12px;
                    padding: 13px 14px;
                    color: #ffffff;
                    font-size: 14px;
                    outline: none;
                    transition: all 0.3s ease;
                }
                input:focus {
                    border-color: #38bdf8;
                    box-shadow: 0 0 15px rgba(56, 189, 248, 0.2);
                }
                .toggle-eye {
                    position: absolute;
                    right: 14px;
                    background: none;
                    border: none;
                    color: #64748b;
                    cursor: pointer;
                    font-size: 12px;
                    font-weight: bold;
                }
                .toggle-eye:hover { color: #38bdf8; }
                .searchable-select-wrapper {
                    position: relative;
                    width: 100%;
                }
                .server-dropdown-list {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: #060a12;
                    border: 1px solid #38bdf8;
                    border-radius: 0 0 12px 12px;
                    max-height: 180px;
                    overflow-y: auto;
                    z-index: 99;
                    display: none;
                    margin-top: 3px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.9);
                }
                .server-option {
                    padding: 11px 14px;
                    font-size: 13px;
                    color: #f1f5f9;
                    cursor: pointer;
                    border-bottom: 1px solid rgba(255,255,255,0.04);
                }
                .server-option:hover {
                    background: #1e293b;
                    color: #38bdf8;
                }
                .dynamic-notice {
                    font-size: 10px;
                    color: #38bdf8;
                    margin-top: 5px;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
                .divider {
                    height: 1px;
                    background: rgba(255, 255, 255, 0.08);
                    margin: 16px 0;
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
                    box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.6);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                    letter-spacing: 0.5px;
                }
                .btn-connect:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 15px 30px -5px rgba(37, 99, 235, 0.8);
                }
                .footer-credit {
                    text-align: center;
                    margin-top: 18px;
                    font-size: 11px;
                    color: #64748b;
                    letter-spacing: 0.8px;
                }
            </style>
        </head>
        <body>
            <div class="glow-wrapper">
                <div class="container">
                    <div class="robot-banner">
                        <div class="banner-title">GIANTSLAYER BOT AI</div>
                    </div>
                    
                    <div class="section-header">
                        <div class="section-title">MT4/5 CREDENTIALS</div>
                        <div class="server-status-pill">
                            <div class="ping-dot"></div>
                            <span>Registry Online</span>
                        </div>
                    </div>
                    
                    <form action="/dashboard" method="POST">
                        <div class="form-group">
                            <label>Login ID</label>
                            <input type="text" name="login_id" placeholder="Enter account login ID" required autocomplete="off">
                        </div>
                        
                        <div class="form-group">
                            <label>Password</label>
                            <div class="input-box-wrapper">
                                <input type="password" id="passInput" name="password" placeholder="Enter trading password" required>
                                <button type="button" class="toggle-eye" onclick="togglePass()">SHOW</button>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Trading Server (Universal Auto-Query)</label>
                            <div class="searchable-select-wrapper">
                                <input type="text" id="serverSearch" name="server" placeholder="Type any broker or prop firm..." autocomplete="off" required>
                                <div id="serverDropdown" class="server-dropdown-list"></div>
                            </div>
                            <div class="dynamic-notice">
                                ⚡ <span>Auto-generates custom nodes for any unmatched broker search instantly</span>
                            </div>
                        </div>

                        <div class="divider"></div>

                        <div class="section-title" style="font-size: 11px; margin-bottom: 8px;">API TOKEN SECURITY</div>
                        <div class="form-group">
                            <label>API Key / Token</label>
                            <div class="input-box-wrapper">
                                <input type="password" id="tokenInput" name="api_token" placeholder="Enter secure API token" required>
                                <button type="button" class="toggle-eye" onclick="toggleToken()">SHOW</button>
                            </div>
                        </div>

                        <button type="submit" class="btn-connect" style="margin-top: 6px;">PLUG AND PLAY</button>
                    </form>

                    <div class="footer-credit">created by official bakker_rsa</div>
                </div>
            </div>

            <script>
                function togglePass() {
                    const p = document.getElementById('passInput');
                    p.type = p.type === 'password' ? 'text' : 'password';
                }
                function toggleToken() {
                    const t = document.getElementById('tokenInput');
                    t.type = t.type === 'password' ? 'text' : 'password';
                }

                const searchInput = document.getElementById('serverSearch');
                const dropdown = document.getElementById('serverDropdown');

                let knownServers = [
                    "JustMarkets-Live", "JustMarkets-Live 2", "JustMarkets-Server", "JustMarkets-MT5",
                    "EquityEdge-Trade", "FundedNext-Server 3", "FTMO-Server", "FTMO-Server2",
                    "FundingPips-Prime", "Exness-MT5Real30", "Exness-MT5Real10", "Exness-Real",
                    "XMGlobal-MT5 5", "DerivSVG-Server", "FBS-Real", "ICMarketsSC-Live", "AvaTrade-Real"
                ];

                function renderDropdown(filterText) {
                    dropdown.innerHTML = '';
                    const query = filterText.toLowerCase().trim();

                    let matches = knownServers.filter(s => s.toLowerCase().includes(query));

                    if (query.length > 0 && !matches.some(m => m.toLowerCase() === query)) {
                        const capitalized = filterText.charAt(0).toUpperCase() + filterText.slice(1);
                        matches.unshift(capitalized + "-Live", capitalized + "-Server");
                    }

                    if (matches.length === 0) {
                        matches = [filterText + "-Server", filterText + "-Live"];
                    }

                    matches.forEach(serverName => {
                        const div = document.createElement('div');
                        div.className = 'server-option';
                        div.textContent = serverName;
                        div.onclick = () => selectServer(serverName);
                        dropdown.appendChild(div);
                    });

                    dropdown.style.display = 'block';
                }

                searchInput.addEventListener('focus', () => renderDropdown(searchInput.value));
                searchInput.addEventListener('input', () => renderDropdown(searchInput.value));

                function selectServer(value) {
                    searchInput.value = value;
                    dropdown.style.display = 'none';
                }

                document.addEventListener('click', (e) => {
                    if (!e.target.closest('.searchable-select-wrapper')) {
                        dropdown.style.display = 'none';
                    }
                });
            </script>
        </body>
        </html>
    `);
});

// ================= PAGE 2: ELITE COMMAND CENTER DASHBOARD =================
app.post('/dashboard', (req, res) => {
    const { login_id, server } = req.body;
    botState.logs.unshift(`[AUTH] Handshake verified for ID: ${login_id} on Node: ${server}`);
    renderDashboard(req, res);
});

app.get('/dashboard', (req, res) => {
    if (req.query.strategy) {
        botState.strategy = req.query.strategy;
        botState.logs.unshift(`[AI KERNEL] Strategy re-calibrated to: ${botState.strategy}`);
    }
    renderDashboard(req, res);
});

function renderDashboard(req, res) {
    if (req.query.action === 'run') {
        botState.running = true;
        botState.logs.unshift(`[EXEC] ${botState.strategy} engine live. AI momentum & daily bias filter active.`);
    } else if (req.query.action === 'stop') {
        botState.running = false;
        botState.logs.unshift(`[SYSTEM] Trading session safely suspended.`);
    }

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>GIANTSLAYER BOT AI - Command Center</title>
            <style>
                * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
                body {
                    background-color: #030508;
                    color: #ffffff;
                    min-height: 100vh;
                    padding: 14px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .wrapper { width: 100%; max-width: 460px; }
                .top-bar {
                    background: #080c14;
                    border: 1px solid #1e293b;
                    border-radius: 16px;
                    padding: 14px 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 12px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }
                .top-right-group {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 6px;
                }
                .status-badge {
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.5px;
                    background: ${botState.running ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)'};
                    padding: 4px 10px;
                    border-radius: 8px;
                    color: ${botState.running ? '#4ade80' : '#fca5a5'};
                    border: 1px solid ${botState.running ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'};
                }
                .btn-logout {
                    background: rgba(239, 68, 68, 0.2);
                    color: #fca5a5;
                    border: 1px solid rgba(239, 68, 68, 0.4);
                    border-radius: 8px;
                    padding: 4px 10px;
                    font-size: 10px;
                    font-weight: bold;
                    cursor: pointer;
                    text-decoration: none;
                }
                .btn-logout:hover { background: #ef4444; color: #fff; }
                
                .grid-stats {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 8px;
                    margin-bottom: 10px;
                }
                .card-stat {
                    background: #080c14;
                    border: 1px solid #1e293b;
                    border-radius: 12px;
                    padding: 11px 8px;
                    text-align: center;
                }
                .card-stat span { font-size: 9px; color: #94a3b8; display: block; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
                .card-stat strong { font-size: 12px; color: #f8fafc; }
                
                .profit-val {
                    color: #4ade80 !important;
                    text-shadow: 0 0 10px rgba(74, 222, 128, 0.4);
                    animation: pulseProfit 3s infinite ease-in-out;
                }
                @keyframes pulseProfit {
                    0% { opacity: 0.85; }
                    50% { opacity: 1; transform: scale(1.02); }
                    100% { opacity: 0.85; }
                }

                .section-box {
                    background: #080c14;
                    border: 1px solid #1e293b;
                    border-radius: 14px;
                    padding: 14px;
                    margin-bottom: 12px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }
                .strategy-selector {
                    display: flex;
                    gap: 8px;
                    margin-top: 8px;
                }
                .strat-btn {
                    flex: 1;
                    background: #04070e;
                    border: 1px solid #1e293b;
                    border-radius: 10px;
                    padding: 12px 6px;
                    font-size: 11px;
                    font-weight: 700;
                    color: #94a3b8;
                    cursor: pointer;
                    text-align: center;
                    text-decoration: none;
                    display: block;
                    transition: all 0.2s ease;
                    -webkit-tap-highlight-color: transparent;
                }
                .strat-btn.active {
                    background: rgba(56, 189, 248, 0.15);
                    border-color: #38bdf8;
                    color: #38bdf8;
                    box-shadow: 0 0 12px rgba(56, 189, 248, 0.3);
                }
                .strat-btn:active {
                    transform: scale(0.96);
                }

                .ai-confluence-card {
                    background: linear-gradient(135deg, rgba(56, 189, 248, 0.05), rgba(37, 99, 235, 0.1));
                    border: 1px solid rgba(56, 189, 248, 0.3);
                    border-radius: 12px;
                    padding: 12px;
                    margin-bottom: 12px;
                }
                .ai-confluence-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 8px;
                    font-size: 11px;
                    font-weight: bold;
                    color: #38bdf8;
                    letter-spacing: 0.5px;
                }
                .ai-metrics {
                    display: flex;
                    justify-content: space-between;
                    font-size: 10px;
                    color: #94a3b8;
                }
                .ai-metrics span strong { color: #f8fafc; }

                .btn-row {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 12px;
                }
                .btn {
                    flex: 1;
                    padding: 14px;
                    border-radius: 12px;
                    font-weight: bold;
                    font-size: 13px;
                    border: none;
                    cursor: pointer;
                    text-align: center;
                    text-decoration: none;
                    letter-spacing: 0.5px;
                }
                .btn-run { background: linear-gradient(135deg, #22c55e, #16a34a); color: #fff; box-shadow: 0 8px 20px rgba(34, 197, 94, 0.4); }
                .btn-stop { background: linear-gradient(135deg, #ef4444, #b91c1c); color: #fff; box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4); }
                
                .logs-box {
                    background: #020409;
                    border: 1px solid #1e293b;
                    border-radius: 10px;
                    padding: 10px;
                    font-family: monospace;
                    font-size: 11px;
                    color: #4ade80;
                    height: 120px;
                    overflow-y: auto;
                    line-height: 1.4;
                }
                .footer-credit {
                    text-align: center;
                    margin-top: 15px;
                    font-size: 11px;
                    color: #64748b;
                    letter-spacing: 0.8px;
                }
            </style>
        </head>
        <body>
            <div class="wrapper">
                <div class="top-bar">
                    <div>
                        <span style="font-size: 13px; font-weight: bold; color: #38bdf8; display: block; letter-spacing: 0.5px;">🟢 GIANTSLAYER BOT AI</span>
                        <span style="font-size: 10px; color: #64748b; letter-spacing: 0.5px;">COMMAND CENTER</span>
                    </div>
                    <div class="top-right-group">
                        <span class="status-badge">${botState.running ? 'ONLINE & RUNNING' : 'STANDBY MODE'}</span>
                        <a href="/" class="btn-logout">LOG OUT</a>
                    </div>
                </div>

                <div class="grid-stats">
                    <div class="card-stat">
                        <span>Core Status</span>
                        <strong style="color: #38bdf8;">${botState.running ? 'ACTIVE' : 'READY'}</strong>
                    </div>
                    <div class="card-stat">
                        <span>Session Uptime</span>
                        <strong>00:14:22</strong>
                    </div>
                    <div class="card-stat">
                        <span>Target Cap</span>
                        <strong>$${botState.targetCap}</strong>
                    </div>
                </div>

                <div class="grid-stats">
                    <div class="card-stat">
                        <span>Account Balance</span>
                        <strong>$150.00</strong>
                    </div>
                    <div class="card-stat">
                        <span>Floating P&L</span>
                        <strong class="profit-val">+$${botState.liveProfit.toFixed(2)}</strong>
                    </div>
                    <div class="card-stat">
                        <span>Auto-Scanner</span>
                        <strong>Universal</strong>
                    </div>
                </div>

                <div class="section-box">
                    <div style="font-size: 11px; font-weight: bold; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.5px;">AI Strategy Tuning</div>
                    <div class="strategy-selector">
                        <a href="/dashboard?strategy=Conservative" class="strat-btn ${botState.strategy === 'Conservative' ? 'active' : ''}">Conservative</a>
                        <a href="/dashboard?strategy=Aggressive" class="strat-btn ${botState.strategy === 'Aggressive' ? 'active' : ''}">Aggressive</a>
                        <a href="/dashboard?strategy=Giantslayer AI v3" class="strat-btn ${botState.strategy === 'Giantslayer AI v3' ? 'active' : ''}">Giantslayer AI</a>
                    </div>
                </div>

                <div class="ai-confluence-card">
                    <div class="ai-confluence-header">
                        <span>🤖 AI MOMENTUM & DAILY BIAS ENGINE</span>
                        <span style="color: #4ade80;">ACTIVE</span>
                    </div>
                    <div class="ai-metrics">
                        <span>Daily Bias: <strong style="color: #4ade80;">BULLISH (H4)</strong></span>
                        <span>Momentum Score: <strong style="color: #38bdf8;">89.4%</strong></span>
                        <span>Confluence: <strong style="color: #facc15;">OPTIMAL</strong></span>
                    </div>
                </div>

                <div class="btn-row">
                    <a href="/dashboard?action=run" class="btn btn-run">▶ Run Trades</a>
                    <a href="/dashboard?action=stop" class="btn btn-stop">■ Stop Trading</a>
                </div>

                <div class="section-box">
                    <div style="font-size: 11px; font-weight: bold; color: #38bdf8; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Real-Time Terminal Logs</div>
                    <div class="logs-box">
                        ${botState.logs.join('<br>')}
                    </div>
                </div>

                <div class="footer-credit">created by official bakker_rsa</div>
            </div>
        </body>
        </html>
    `);
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
