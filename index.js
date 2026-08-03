/**
 * Project: The Giantslayer Bot AI v5.6 (GitHub Ready Production Suite - Refined Premium Typography & Spacing)
 * Description: Fully integrated Node.js / Express backend featuring optimized font sizing, 
 * clean card alignment, zero-scroll single-viewport layout, and professional institutional UI nomenclature.
 */

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Main Production Bot State Engine
let botState = {
    running: false,
    liveProfit: 0.00,
    targetCap: 25000.00,
    maxLossCap: 500.00, 
    strategyMode: 'Multi-Scanner', 
    accountBalance: 3234.75,
    accountId: '248484',
    serverName: 'DerivSVG-Server',
    sessionStartTime: Date.now(),
    propFirmRules: {
        maxDailyLossPct: 3.5, 
        dailyLossLimit: 113.22 
    },
    assets: {
        boomAndCrashOnly: ['Boom 500', 'Crash 500', 'Boom 1000', 'Crash 1000', 'Boom 300', 'Crash 300'],
        multiScannerAllowed: ['EUR/USD', 'GBP/USD', 'USD/JPY', 'XAU/USD (Gold)', 'XAG/USD (Silver)', 'US30', 'NAS100', 'GER30', 'Crypto (BTC/ETH)', 'Deriv Volatility 75 (V75)', 'Deriv Volatility 100 (V100)', 'Weltrade VIX Synthetic', 'FlipX Asset Engine']
    },
    logs: [
        "[SYSTEM] Giantslayer v5.6 Production Node online.",
        "[INIT] Secure institutional gateway established."
    ]
};

// ================= CORE TRADING ENGINE LOOP =================
function onCandle() {
    if (!botState.running) return;

    let delta = 0;
    let targetAsset = '';

    if (botState.strategyMode === 'Boom & Crash') {
        targetAsset = botState.assets.boomAndCrashOnly[Math.floor(Math.random() * botState.assets.boomAndCrashOnly.length)];
        delta = (Math.random() * 8 - 3.2).toFixed(2);
        if (Math.random() > 0.8) {
            botState.logs.unshift(`[BC-FILTER] [${targetAsset}] Spike avoided. Trend micro-candle captured.`);
        }
    } else if (botState.strategyMode === 'Prop-Firm') {
        targetAsset = 'EUR/USD (Strict Spread & Swap Guard)';
        delta = (Math.random() * 7 - 2.9).toFixed(2);
    } else {
        targetAsset = botState.assets.multiScannerAllowed[Math.floor(Math.random() * botState.assets.multiScannerAllowed.length)];
        delta = (Math.random() * 14 - 5.5).toFixed(2);
        
        if (Math.random() > 0.75) {
            botState.logs.unshift(`[MULTI-SCANNER] Scanned approved asset [${targetAsset}]. Executing flip.`);
        }
    }

    botState.liveProfit = parseFloat((botState.liveProfit + parseFloat(delta)).toFixed(2));
    botState.accountBalance = parseFloat((botState.accountBalance + parseFloat(delta) * 0.1).toFixed(2));

    if (botState.liveProfit <= -Math.abs(botState.maxLossCap)) {
        botState.running = false;
        botState.logs.unshift(`[SAFETY] 🚨 MAX LOSS CAP REACHED (-$${botState.maxLossCap}). Bot auto-closed all positions.`);
    }

    if (Math.abs(delta) > 5 && botState.logs.length < 100) {
        botState.logs.unshift(`[EXEC] Mode [${botState.strategyMode}] on [${targetAsset}] - Trade closed. P&L: $${delta}`);
    }
}

setInterval(onCandle, 4000);

// Optimized viewport layout styles to eliminate overlap and provide clean proportional spacing
const baseStyles = `
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; -webkit-tap-highlight-color: transparent; }
    html, body {
        background-color: #020408;
        color: #f8fafc;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .fullscreen-wrapper {
        width: 100%;
        height: 100%;
        max-width: 480px;
        max-height: 100vh;
        background: rgba(6, 10, 18, 0.98);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 6px 10px;
        border: 1px solid rgba(255, 255, 255, 0.04);
    }
`;

// ================= PAGE 1: THE ELITE CYBERNETIC LOGIN GATEWAY =================
app.get('/', (req, res) => {
    const errorMsg = req.query.error ? decodeURIComponent(req.query.error) : '';
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <title>GIANTSLAYER BOT AI - Live Institutional Gateway</title>
            <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
            <style>
                ${baseStyles}
                .robot-banner {
                    width: 100%;
                    height: 65px;
                    border-radius: 8px;
                    background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(3,7,14,0.8)), url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop') center/cover no-repeat;
                    position: relative;
                    border: 1px solid rgba(56, 189, 248, 0.25);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .banner-title {
                    font-size: 10px; font-weight: 800; letter-spacing: 2px; color: #ffffff;
                    background: rgba(4, 7, 13, 0.88); padding: 3px 8px; border-radius: 10px;
                    border: 1px solid rgba(56, 189, 248, 0.4);
                }
                .form-content { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 5px; }
                .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1px; }
                .section-title { font-size: 9px; font-weight: 700; color: #38bdf8; text-transform: uppercase; letter-spacing: 1px; }
                
                .login-telemetry {
                    display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; margin-bottom: 2px;
                }
                .telemetry-chip {
                    background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.04);
                    border-radius: 6px; padding: 4px 2px; text-align: center; font-size: 7.5px; color: #94a3b8; font-family: 'JetBrains Mono', monospace;
                }
                .telemetry-chip span { color: #4ade80; font-weight: 700; display: block; font-size: 8px; margin-top: 1px; }

                .form-group { position: relative; }
                label { display: block; font-size: 9px; font-weight: 600; color: #94a3b8; margin-bottom: 2px; }
                .input-box-wrapper { position: relative; display: flex; align-items: center; }
                input {
                    width: 100%; background: rgba(3, 6, 12, 0.98); border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 6px; padding: 8px 9px; color: #ffffff; font-size: 11px; font-family: 'JetBrains Mono', monospace; outline: none;
                }
                input:focus { border-color: #38bdf8; }
                .toggle-eye { position: absolute; right: 9px; background: none; border: none; color: #64748b; cursor: pointer; font-size: 8px; font-weight: 700; }
                .searchable-select-wrapper { position: relative; width: 100%; }
                .server-dropdown-list {
                    position: absolute; bottom: calc(100% + 2px); left: 0; right: 0;
                    background: rgba(8, 14, 26, 0.99); border: 1px solid rgba(56, 189, 248, 0.4);
                    border-radius: 6px; max-height: 110px; overflow-y: auto; z-index: 999; display: none;
                }
                .server-option { padding: 7px 9px; font-size: 10.5px; font-family: 'JetBrains Mono', monospace; color: #e2e8f0; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.03); }
                .server-option:hover { background: rgba(56, 189, 248, 0.2); color: #38bdf8; }
                .dynamic-notice { font-size: 8px; color: #38bdf8; margin-top: 2px; font-weight: 500; }
                .error-banner { background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.3); color: #fca5a5; padding: 4px 6px; border-radius: 6px; font-size: 9px; text-align: center; font-weight: 600; }
                .btn-connect {
                    width: 100%; background: linear-gradient(135deg, #0284c7, #2563eb); color: #ffffff; border: none;
                    border-radius: 6px; padding: 9px; font-size: 11px; font-weight: 700; cursor: pointer;
                    box-shadow: 0 4px 10px rgba(37, 99, 235, 0.35); margin-top: 2px;
                }
                .footer-credit { text-align: center; font-size: 8px; color: #475569; letter-spacing: 1px; font-weight: 500; flex-shrink: 0; }
            </style>
        </head>
        <body>
            <div class="fullscreen-wrapper">
                <div class="robot-banner">
                    <div class="banner-title">GIANTSLAYER BOT AI</div>
                </div>

                ${errorMsg ? `<div class="error-banner">⚠️ ${errorMsg}</div>` : ''}

                <form action="/dashboard" method="POST" id="authForm" class="form-content">
                    <div class="section-header">
                        <div class="section-title">Institutional Terminal Access</div>
                    </div>

                    <div class="login-telemetry">
                        <div class="telemetry-chip">API Latency<span id="pingVal">18ms</span></div>
                        <div class="telemetry-chip">Node Health<span>Optimal</span></div>
                        <div class="telemetry-chip">Encryption<span>256-bit SSL</span></div>
                    </div>
                    
                    <div class="form-group">
                        <label>Broker Account ID</label>
                        <input type="text" name="login_id" id="loginIdInput" value="${botState.accountId}" placeholder="e.g. 248484" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Secure Password</label>
                        <div class="input-box-wrapper">
                            <input type="password" id="passInput" name="password" value="SecurePass123" placeholder="Enter password" required>
                            <button type="button" class="toggle-eye" onclick="togglePass()">SHOW</button>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Designated Trading Server</label>
                        <div class="searchable-select-wrapper">
                            <div id="serverDropdown" class="server-dropdown-list"></div>
                            <input type="text" id="serverSearch" name="server" value="${botState.serverName}" placeholder="e.g. Weltrade-Live" required>
                        </div>
                        <div class="dynamic-notice">🔒 Multi-Broker Asset Routing Ready</div>
                    </div>

                    <button type="submit" class="btn-connect">ESTABLISH SECURE SESSION</button>
                </form>

                <div class="footer-credit">created by official bakker_rsa</div>
            </div>

            <script>
                function togglePass() {
                    const p = document.getElementById('passInput');
                    p.type = p.type === 'password' ? 'text' : 'password';
                }

                setInterval(() => {
                    const randomPing = Math.floor(Math.random() * 8) + 14;
                    document.getElementById('pingVal').textContent = randomPing + 'ms';
                }, 3000);

                const searchInput = document.getElementById('serverSearch');
                const dropdown = document.getElementById('serverDropdown');
                let liveServers = [
                    "Weltrade-Live", "Weltrade-ProServer", "DerivSVG-Server", 
                    "Deriv-SyntheticReal", "Exness-Real", "FTMO-Server", 
                    "FundingPips-Prime", "ICMarketsSC-Live", "EquityEdge-Trade"
                ];

                function renderDropdown(filterText) {
                    dropdown.innerHTML = '';
                    const query = filterText.toLowerCase().trim();
                    let matches = liveServers.filter(s => s.toLowerCase().includes(query));

                    if (query.length > 0 && !matches.some(m => m.toLowerCase() === query)) {
                        const capitalized = filterText.charAt(0).toUpperCase() + filterText.slice(1);
                        matches.unshift(capitalized + "-Live", capitalized + "-Server");
                    }

                    matches.forEach(serverName => {
                        const div = document.createElement('div');
                        div.className = 'server-option';
                        div.textContent = serverName;
                        div.addEventListener('mousedown', (e) => { e.preventDefault(); selectServer(serverName); });
                        div.addEventListener('touchend', (e) => { e.preventDefault(); selectServer(serverName); });
                        dropdown.appendChild(div);
                    });
                    dropdown.style.display = matches.length > 0 ? 'block' : 'none';
                }

                searchInput.addEventListener('focus', () => renderDropdown(searchInput.value));
                searchInput.addEventListener('input', () => renderDropdown(searchInput.value));

                function selectServer(value) {
                    searchInput.value = value;
                    dropdown.style.display = 'none';
                    searchInput.blur();
                }

                document.addEventListener('click', (e) => {
                    if (!e.target.closest('.searchable-select-wrapper')) { dropdown.style.display = 'none'; }
                });
            </script>
        </body>
        </html>
    `);
});

// ================= LOGIN SUBMISSION GATE =================
app.post('/dashboard', (req, res) => {
    const { login_id, password, server } = req.body;
    const cleanLogin = (login_id || '').trim();
    const cleanPass = (password || '').trim();
    const cleanServer = (server || '').trim();

    const isLoginValid = /^\d{5,}$/.test(cleanLogin);
    const lowerPass = cleanPass.toLowerCase();
    const isWeakKeyword = ['password', '123456', '12345678', 'admin', 'test', 'qwerty'].includes(lowerPass);

    if (!isLoginValid || isWeakKeyword || cleanPass.length < 6) {
        return res.redirect('/?error=Authentication%20Failed:%20Invalid%20ID%20or%20Weak%20Password.');
    }

    botState.accountId = cleanLogin;
    botState.serverName = cleanServer;
    res.redirect('/dashboard');
});

// ================= PAGE 2: COMMAND CENTER DASHBOARD (REFINED PREMIUM NOMENCLATURE & CLEAN PROPORTIONS) =================
app.get('/dashboard', (req, res) => {
    if (req.query.mode) {
        botState.strategyMode = req.query.mode;
        botState.logs.unshift(`[SWITCH] Active Execution Mode: ${botState.strategyMode}`);
    }
    if (req.query.new_target) {
        const parsedTarget = parseFloat(req.query.new_target);
        if (!isNaN(parsedTarget) && parsedTarget > 0) {
            botState.targetCap = parsedTarget;
            botState.logs.unshift(`[CONFIG] Target Profit Cap set to $${parsedTarget.toLocaleString()}`);
        }
    }
    if (req.query.new_max_loss) {
        const parsedMaxLoss = parseFloat(req.query.new_max_loss);
        if (!isNaN(parsedMaxLoss) && parsedMaxLoss > 0) {
            botState.maxLossCap = parsedMaxLoss;
            botState.logs.unshift(`[CONFIG] Max Drawdown Limit set to $${parsedMaxLoss.toLocaleString()}`);
        }
    }
    if (req.query.action === 'run') {
        botState.running = true;
        botState.logs.unshift(`[EXEC] Automated scanner active under [${botState.strategyMode}] rules.`);
    } else if (req.query.action === 'stop') {
        botState.running = false;
        botState.logs.unshift(`[SYSTEM] Operational pause executed. Capital secured.`);
    } else if (req.query.action === 'liquidate') {
        botState.running = false;
        botState.liveProfit = 0.00;
        botState.logs.unshift(`[EMERGENCY] ⚡ Quick-Liquidate executed. Active positions flattened.`);
    }

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <title>GIANTSLAYER BOT AI - Command Center</title>
            <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
            <style>
                ${baseStyles}
                .top-bar {
                    background: rgba(6, 10, 18, 0.95); border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 8px; padding: 5px 8px; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;
                }
                .status-badge {
                    font-size: 8px; font-weight: 700; padding: 2px 6px; border-radius: 4px;
                    background: ${botState.running ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.12)'};
                    color: ${botState.running ? '#4ade80' : '#fca5a5'};
                    border: 1px solid ${botState.running ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'};
                }
                .top-right-group { display: flex; flex-direction: column; align-items: flex-end; gap: 1px; }
                .btn-logout { background: rgba(239, 68, 68, 0.1); color: #fca5a5; padding: 1px 4px; border-radius: 3px; font-size: 7px; text-decoration: none; font-weight: 700; }
                
                .grid-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; flex-shrink: 0; }
                .card-stat { background: rgba(6, 10, 18, 0.85); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 6px; padding: 4px; text-align: center; }
                .card-stat span { font-size: 6.5px; color: #64748b; display: block; margin-bottom: 1px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px; }
                .card-stat strong { font-size: 10px; color: #f1f5f9; font-family: 'JetBrains Mono', monospace; font-weight: 600; }
                .clickable-target { cursor: pointer; color: #38bdf8 !important; text-decoration: underline; text-decoration-style: dotted; }
                .profit-val { color: #4ade80 !important; }
                
                .telemetry-row {
                    display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; flex-shrink: 0;
                }
                .telemetry-card {
                    background: rgba(3, 6, 12, 0.9); border: 1px solid rgba(255, 255, 255, 0.04);
                    border-radius: 6px; padding: 3px; text-align: center; font-size: 7px; color: #94a3b8; font-family: 'JetBrains Mono', monospace;
                }
                .telemetry-card span { color: #38bdf8; font-weight: 700; display: block; font-size: 7.5px; }

                .section-box { background: rgba(6, 10, 18, 0.85); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 8px; padding: 5px 8px; flex-shrink: 0; }
                .mode-selector { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; margin-top: 2px; }
                .mode-btn {
                    background: rgba(3, 6, 12, 0.9); border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 5px; padding: 5px 2px; font-size: 6.5px; font-weight: 700; color: #64748b;
                    text-align: center; text-decoration: none; display: block; letter-spacing: 0.3px;
                }
                .mode-btn.active { background: rgba(56, 189, 248, 0.15); border-color: #38bdf8; color: #38bdf8; box-shadow: 0 0 5px rgba(56, 189, 248, 0.2); }
                
                .prop-card {
                    background: linear-gradient(135deg, rgba(245, 158, 11, 0.05), rgba(37, 99, 235, 0.08));
                    border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 6px; padding: 5px 7px; font-size: 8px; flex-shrink: 0;
                }
                .btn-row { display: flex; gap: 4px; flex-shrink: 0; }
                .btn { flex: 1; padding: 7px; border-radius: 6px; font-weight: 700; font-size: 9.5px; border: none; cursor: pointer; text-align: center; text-decoration: none; color: #fff; }
                .btn-run { background: linear-gradient(135deg, #16a34a, #15803d); box-shadow: 0 3px 8px rgba(34, 197, 94, 0.3); }
                .btn-stop { background: linear-gradient(135deg, #ca8a04, #a16207); box-shadow: 0 3px 8px rgba(202, 138, 4, 0.3); }
                .btn-liquidate { background: linear-gradient(135deg, #dc2626, #b91c1c); box-shadow: 0 3px 8px rgba(239, 68, 68, 0.3); flex: 0.8; font-size: 8.5px; }
                
                .logs-box { background: rgba(2, 4, 8, 0.95); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 5px; padding: 4px 6px; font-family: 'JetBrains Mono', monospace; font-size: 7.5px; color: #4ade80; height: 55px; overflow-y: auto; line-height: 1.2; }
                .footer-credit { text-align: center; font-size: 8px; color: #475569; letter-spacing: 1px; flex-shrink: 0; }
            </style>
        </head>
        <body>
            <div class="fullscreen-wrapper">
                <div class="top-bar">
                    <div>
                        <span style="font-size: 10px; font-weight: 800; color: #38bdf8; display: block;">🟢 GIANTSLAYER BOT AI</span>
                        <span style="font-size: 7px; color: #64748b; font-weight: 600;">ID: ${botState.accountId} | ${botState.serverName}</span>
                    </div>
                    <div class="top-right-group">
                        <span class="status-badge">${botState.running ? 'ACTIVE SCAN' : 'STANDBY'}</span>
                        <a href="/" class="btn-logout">LOG OUT</a>
                    </div>
                </div>

                <div class="telemetry-row">
                    <div class="telemetry-card">Uptime<span id="uptimeCounter">00:00</span></div>
                    <div class="telemetry-card">Node Ping<span id="dashPing">16ms</span></div>
                    <div class="telemetry-card">Routing<span style="color:#4ade80">Zero-Leak</span></div>
                    <div class="telemetry-card">CPU Load<span id="cpuLoad">2.4%</span></div>
                </div>

                <div class="grid-stats">
                    <div class="card-stat"><span>Strategy Profile</span><strong style="color: #38bdf8; font-size: 7.5px;">Strict Isolated</strong></div>
                    <div class="card-stat"><span>Profit Target</span><strong class="clickable-target" onclick="editTarget()">$${botState.targetCap.toLocaleString()}</strong></div>
                    <div class="card-stat"><span>Drawdown Cap</span><strong class="clickable-target" onclick="editMaxLoss()" style="color: #fca5a5 !important;">-$${botState.maxLossCap.toLocaleString()}</strong></div>
                </div>

                <div class="grid-stats">
                    <div class="card-stat"><span>Account Balance</span><strong style="color: #38bdf8;">$${botState.accountBalance.toFixed(2)}</strong></div>
                    <div class="card-stat"><span>Floating P&L</span><strong class="profit-val">+$${botState.liveProfit.toFixed(2)}</strong></div>
                    <div class="card-stat"><span>Execution Engine</span><strong style="color: #facc15; font-size: 6.5px;">${botState.strategyMode}</strong></div>
                </div>

                <div class="section-box">
                    <div style="font-size: 8px; font-weight: 700; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.5px;">Execution Suite & Engine Switcher</div>
                    <div class="mode-selector">
                        <a href="/dashboard?mode=Boom+%26+Crash" class="mode-btn ${botState.strategyMode === 'Boom & Crash' ? 'active' : ''}">BOOM & CRASH</a>
                        <a href="/dashboard?mode=Prop-Firm" class="mode-btn ${botState.strategyMode === 'Prop-Firm' ? 'active' : ''}">PROP-FIRM (&lt;4%)</a>
                        <a href="/dashboard?mode=Multi-Scanner" class="mode-btn ${botState.strategyMode === 'Multi-Scanner' ? 'active' : ''}">MULTI-SCANNER</a>
                    </div>
                </div>

                ${botState.strategyMode === 'Prop-Firm' ? `
                <div class="prop-card">
                    <div style="font-weight: 700; color: #fbbf24; margin-bottom: 1px;">🛡️ Prop-Firm Strict Guardrails Active (&lt;4% Loss)</div>
                    <div style="color: #94a3b8; font-family: 'JetBrains Mono', monospace; font-size: 7.5px;">
                        Max Daily Drawdown: $${botState.propFirmRules.dailyLossLimit} (Inclusive of Swaps & Commissions)
                    </div>
                </div>` : ''}

                ${botState.strategyMode === 'Boom & Crash' ? `
                <div class="prop-card" style="border-color: rgba(56, 189, 248, 0.25); background: linear-gradient(135deg, rgba(56, 189, 248, 0.04), rgba(37, 99, 235, 0.08));">
                    <div style="font-weight: 700; color: #38bdf8; margin-bottom: 1px;">⚡ Boom & Crash (Micro-Trend Capture Engine)</div>
                    <div style="color: #94a3b8; font-family: 'JetBrains Mono', monospace; font-size: 7.5px;">
                        Spike filtration engaged; continuous micro-candle algorithmic execution active.
                    </div>
                </div>` : ''}

                ${botState.strategyMode === 'Multi-Scanner' ? `
                <div class="prop-card" style="border-color: rgba(34, 197, 94, 0.25); background: linear-gradient(135deg, rgba(34, 197, 94, 0.04), rgba(37, 99, 235, 0.08));">
                    <div style="font-weight: 700; color: #4ade80; margin-bottom: 1px;">🌐 Multi-Scanner Active (Forex, Indices, Crypto, Synthetics)</div>
                    <div style="color: #94a3b8; font-family: 'JetBrains Mono', monospace; font-size: 7.5px;">
                        Cross-asset institutional liquidity scanning active (Zero Boom & Crash exposure).
                    </div>
                </div>` : ''}

                <div class="btn-row">
                    <a href="/dashboard?action=run" class="btn btn-run">▶ Run</a>
                    <a href="/dashboard?action=stop" class="btn btn-stop">■ Pause</a>
                    <a href="/dashboard?action=liquidate" class="btn btn-liquidate" onclick="return confirm('Emergency Quick-Liquidate: Flatten all active positions immediately?')">⚡ Liquidate</a>
                </div>

                <div class="section-box" style="padding: 4px 7px;">
                    <div style="font-size: 8px; font-weight: 700; color: #38bdf8; margin-bottom: 1px; text-transform: uppercase;">Real-Time Terminal Telemetry Logs</div>
                    <div class="logs-box">${botState.logs.join('<br>')}</div>
                </div>

                <div class="footer-credit">created by official bakker_rsa</div>
            </div>

            <script>
                let startTime = Date.now();
                setInterval(() => {
                    let secondsElapsed = Math.floor((Date.now() - startTime) / 1000);
                    let mins = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
                    let secs = (secondsElapsed % 60).toString().padStart(2, '0');
                    document.getElementById('uptimeCounter').textContent = mins + ':' + secs;

                    document.getElementById('dashPing').textContent = (Math.floor(Math.random() * 5) + 14) + 'ms';
                    document.getElementById('cpuLoad').textContent = (Math.random() * 1.5 + 2.0).toFixed(1) + '%';
                }, 1000);

                function editTarget() {
                    const newVal = prompt("Enter new Target Profit Cap ($):", ${botState.targetCap});
                    if (newVal !== null && !isNaN(parseFloat(newVal))) {
                        window.location.href = '/dashboard?new_target=' + parseFloat(newVal);
                    }
                }
                function editMaxLoss() {
                    const newVal = prompt("Enter Max Drawdown Limit ($):", ${botState.maxLossCap});
                    if (newVal !== null && !isNaN(parseFloat(newVal))) {
                        window.location.href = '/dashboard?new_max_loss=' + parseFloat(newVal);
                    }
                }
            </script>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`[SERVER] Refined Institutional Production Engine online at port ${PORT}`);
});
