const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// In-memory state for the trading bot
let botState = {
    running: false,
    liveProfit: 0.70,
    targetCap: 10000.00,
    logs: [
        "[17:42:00] [SYSTEM] Dynamic MetaTrader broker lookup connector loaded.",
        "[17:40:15] [SERVER] Dashboard online. Credentials registered."
    ]
};

// ================= PAGE 1: THE 3D CYBERNETIC LOGIN GATEWAY =================
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>GIANTSLAYER BOT AI - Secure Login</title>
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
                }
                .container {
                    width: 100%;
                    max-width: 400px;
                    background: rgba(15, 18, 25, 0.85);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 24px;
                    padding: 28px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
                }
                .robot-banner {
                    width: 100%;
                    height: 200px;
                    border-radius: 16px;
                    background: #000 url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop') center/cover no-repeat;
                    position: relative;
                    margin-bottom: 20px;
                    border: 1px solid rgba(56, 189, 248, 0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: inset 0 0 40px rgba(0,0,0,0.85);
                }
                .banner-title {
                    font-size: 18px;
                    font-weight: 900;
                    letter-spacing: 1.5px;
                    color: #ffffff;
                    background: rgba(0, 0, 0, 0.85);
                    padding: 12px 18px;
                    border-radius: 24px;
                    border: 1px solid rgba(56, 189, 248, 0.7);
                    text-shadow: 0 0 15px rgba(56, 189, 248, 0.9);
                    text-align: center;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.6);
                }
                .section-title {
                    font-size: 14px;
                    font-weight: 700;
                    color: #38bdf8;
                    margin-bottom: 14px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    text-align: center;
                }
                .form-group {
                    margin-bottom: 14px;
                    text-align: center;
                }
                label {
                    display: block;
                    font-size: 11px;
                    font-weight: 600;
                    color: #94a3b8;
                    margin-bottom: 5px;
                    text-align: center;
                }
                input {
                    width: 100%;
                    background: #0b0f17;
                    border: 1px solid #1e293b;
                    border-radius: 10px;
                    padding: 12px 14px;
                    color: #ffffff;
                    font-size: 14px;
                    outline: none;
                    text-align: center;
                }
                input::placeholder {
                    text-align: center;
                }
                input:focus {
                    border-color: #38bdf8;
                }
                .searchable-select-wrapper {
                    position: relative;
                    width: 100%;
                }
                .server-dropdown-list {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: #0b0f17;
                    border: 1px solid #38bdf8;
                    border-radius: 0 0 10px 10px;
                    max-height: 200px;
                    overflow-y: auto;
                    z-index: 99;
                    display: none;
                    margin-top: 2px;
                    box-shadow: 0 15px 30px rgba(0,0,0,0.9);
                }
                .server-option {
                    padding: 10px 14px;
                    font-size: 13px;
                    color: #ffffff;
                    cursor: pointer;
                    text-align: center;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }
                .server-option:hover {
                    background: #1e293b;
                    color: #38bdf8;
                }
                .dynamic-notice {
                    font-size: 10px;
                    color: #38bdf8;
                    margin-top: 4px;
                    text-align: center;
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
                    padding: 14px;
                    font-size: 15px;
                    font-weight: 700;
                    cursor: pointer;
                    box-shadow: 0 10px 20px -5px rgba(37, 99, 235, 0.5);
                }
                .footer-credit {
                    text-align: center;
                    margin-top: 18px;
                    font-size: 11px;
                    color: #64748b;
                    letter-spacing: 0.5px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="robot-banner">
                    <div class="banner-title">GIANTSLAYER BOT AI</div>
                </div>
                <div class="section-title">MT4/5 LOGIN DETAILS 🔑</div>
                
                <form action="/dashboard" method="POST">
                    <div class="form-group">
                        <label>Login ID</label>
                        <input type="text" name="login_id" placeholder="Enter account login ID" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Enter trading password" required>
                    </div>

                    <div class="form-group">
                        <label>Trading Server (Auto-Query & Universal Search)</label>
                        <div class="searchable-select-wrapper">
                            <input type="text" id="serverSearch" name="server" placeholder="Type any broker name (e.g. JustMarkets, FBS...)" autocomplete="off" required>
                            <div id="serverDropdown" class="server-dropdown-list">
                                <!-- Default Populated List -->
                                <div class="server-option" onclick="selectServer('JustMarkets-Live')">JustMarkets-Live</div>
                                <div class="server-option" onclick="selectServer('JustMarkets-Live 2')">JustMarkets-Live 2</div>
                                <div class="server-option" onclick="selectServer('JustMarkets-Server')">JustMarkets-Server</div>
                                <div class="server-option" onclick="selectServer('JustMarkets-MT5')">JustMarkets-MT5</div>
                                <div class="server-option" onclick="selectServer('EquityEdge-Trade')">EquityEdge-Trade</div>
                                <div class="server-option" onclick="selectServer('FundedNext-Server 3')">FundedNext-Server 3</div>
                                <div class="server-option" onclick="selectServer('FTMO-Server')">FTMO-Server</div>
                                <div class="server-option" onclick="selectServer('Exness-MT5Real30')">Exness-MT5Real30</div>
                                <div class="server-option" onclick="selectServer('XMGlobal-MT5 5')">XMGlobal-MT5 5</div>
                                <div class="server-option" onclick="selectServer('DerivSVG-Server')">DerivSVG-Server</div>
                            </div>
                        </div>
                        <div class="dynamic-notice">⚡ Universal broker registry enabled (auto-generates server nodes on unmatched searches)</div>
                    </div>

                    <div class="divider"></div>

                    <div class="section-title" style="font-size: 12px;">API LOG IN DETAILS</div>
                    <div class="form-group">
                        <label>API Token / Key</label>
                        <input type="password" name="api_token" placeholder="Enter fake or real API token" required>
                    </div>

                    <button type="submit" class="btn-connect" style="margin-top: 10px;">PLUG AND PLAY</button>
                </form>

                <div class="footer-credit">created by official bakker_rsa</div>
            </div>

            <script>
                const searchInput = document.getElementById('serverSearch');
                const dropdown = document.getElementById('serverDropdown');

                // Comprehensive core static database
                let knownServers = [
                    "JustMarkets-Live", "JustMarkets-Live 2", "JustMarkets-Server", "JustMarkets-MT5",
                    "EquityEdge-Trade", "FundedNext-Server 3", "FundedNext-Server 1", "FTMO-Server", "FTMO-Server2",
                    "FundingPips-Prime", "Exness-MT5Real30", "Exness-MT5Real10", "Exness-Real", "Exness-Trial",
                    "XMGlobal-MT5 5", "XMGlobal-Real 01", "DerivSVG-Server", "FBS-Real", "FBS-Demo",
                    "ICMarketsSC-Live", "Weltrade-Real", "AvaTrade-Real", "iFXBrokers-Live", "RoboForex-Pro", "HFMarkets-Live"
                ];

                function renderDropdown(filterText) {
                    dropdown.innerHTML = '';
                    const query = filterText.toLowerCase().trim();

                    // Filter existing options
                    let matches = knownServers.filter(s => s.toLowerCase().includes(query));

                    // Dynamic generator if custom server is typed and not present
                    if (query.length > 0 && !matches.some(m => m.toLowerCase() === query)) {
                        const capitalized = filterText.charAt(0).toUpperCase() + filterText.slice(1);
                        const autoServer1 = capitalized + "-Live";
                        const autoServer2 = capitalized + "-Server";
                        matches.unshift(autoServer1, autoServer2);
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

                searchInput.addEventListener('focus', () => {
                    renderDropdown(searchInput.value);
                });

                searchInput.addEventListener('input', () => {
                    renderDropdown(searchInput.value);
                });

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

// ================= PAGE 2: COMMAND CENTER DASHBOARD =================
app.post('/dashboard', (req, res) => {
    const { login_id, server } = req.body;
    botState.logs.unshift(`[AUTH] Handshake verified for ID: ${login_id} on Dynamic Node: ${server}`);
    renderDashboard(req, res);
});

app.get('/dashboard', (req, res) => {
    renderDashboard(req, res);
});

function renderDashboard(req, res) {
    if (req.query.action === 'run') {
        botState.running = true;
        botState.logs.unshift(`[EXEC] Automated scanner engaged on live target.`);
    } else if (req.query.action === 'stop') {
        botState.running = false;
        botState.logs.unshift(`[SYSTEM] Trading session paused by user.`);
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
                    background-color: #070a13;
                    color: #ffffff;
                    min-height: 100vh;
                    padding: 14px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .wrapper { width: 100%; max-width: 480px; }
                .top-bar {
                    background: #0f172a;
                    border: 1px solid #1e293b;
                    border-radius: 12px;
                    padding: 12px 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 12px;
                }
                .top-right-group {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 4px;
                }
                .status-badge {
                    font-size: 10px;
                    background: #1e293b;
                    padding: 3px 8px;
                    border-radius: 6px;
                    color: ${botState.running ? '#4ade80' : '#fca5a5'};
                }
                .btn-logout {
                    background: #ef4444;
                    color: #ffffff;
                    border: none;
                    border-radius: 6px;
                    padding: 5px 10px;
                    font-size: 11px;
                    font-weight: bold;
                    cursor: pointer;
                    text-decoration: none;
                    box-shadow: 0 4px 10px rgba(239, 68, 68, 0.3);
                }
                .grid-stats {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 8px;
                    margin-bottom: 12px;
                }
                .card-stat {
                    background: #0f172a;
                    border: 1px solid #1e293b;
                    border-radius: 10px;
                    padding: 10px;
                    text-align: center;
                }
                .card-stat span { font-size: 10px; color: #94a3b8; display: block; margin-bottom: 4px; }
                .card-stat strong { font-size: 13px; color: #f8fafc; }
                .section-box {
                    background: #0f172a;
                    border: 1px solid #1e293b;
                    border-radius: 12px;
                    padding: 12px;
                    margin-bottom: 12px;
                }
                .btn-row {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 12px;
                }
                .btn {
                    flex: 1;
                    padding: 12px;
                    border-radius: 10px;
                    font-weight: bold;
                    font-size: 13px;
                    border: none;
                    cursor: pointer;
                    text-align: center;
                    text-decoration: none;
                }
                .btn-run { background: #22c55e; color: #fff; }
                .btn-stop { background: #991b1b; color: #fca5a5; }
                .logs-box {
                    background: #020617;
                    border: 1px solid #1e293b;
                    border-radius: 10px;
                    padding: 10px;
                    font-family: monospace;
                    font-size: 11px;
                    color: #4ade80;
                    height: 130px;
                    overflow-y: auto;
                }
                .footer-credit {
                    text-align: center;
                    margin-top: 15px;
                    font-size: 11px;
                    color: #64748b;
                    letter-spacing: 0.5px;
                }
            </style>
        </head>
        <body>
            <div class="wrapper">
                <div class="top-bar">
                    <div>
                        <span style="font-size: 13px; font-weight: bold; color: #38bdf8; display: block;">🟢 GIANTSLAYER BOT AI</span>
                        <span style="font-size: 10px; color: #64748b;">COMMAND CENTER</span>
                    </div>
                    <div class="top-right-group">
                        <span class="status-badge">${botState.running ? 'RUNNING' : 'STANDBY'}</span>
                        <a href="/" class="btn-logout">LOG OUT</a>
                    </div>
                </div>

                <div class="grid-stats">
                    <div class="card-stat">
                        <span>Status</span>
                        <strong style="color: #38bdf8;">${botState.running ? 'ACTIVE' : 'READY'}</strong>
                    </div>
                    <div class="card-stat">
                        <span>Uptime</span>
                        <strong>00:03:12</strong>
                    </div>
                    <div class="card-stat">
                        <span>Target Cap</span>
                        <strong>$${botState.targetCap}</strong>
                    </div>
                </div>

                <div class="grid-stats">
                    <div class="card-stat">
                        <span>Balance</span>
                        <strong>$150.00</strong>
                    </div>
                    <div class="card-stat">
                        <span>Floating P&L</span>
                        <strong style="color: #4ade80;">+$${botState.liveProfit.toFixed(2)}</strong>
                    </div>
                    <div class="card-stat">
                        <span>Scanner</span>
                        <strong>Universal Auto</strong>
                    </div>
                </div>

                <div class="btn-row">
                    <a href="/dashboard?action=run" class="btn btn-run">▶ Run Trades</a>
                    <a href="/dashboard?action=stop" class="btn btn-stop">■ Stop Trading</a>
                </div>

                <div class="section-box">
                    <div style="font-size: 12px; font-weight: bold; color: #38bdf8; margin-bottom: 8px;">Real-Time Terminal Logs</div>
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
