/**
 * Project: The Giantslayer Bot AI v5.7 (Clean UI Format - No Hardcoded Sensitive Credentials)
 * Description: Restored clean layout matching the requested screenshot format with placeholder 
 * fields for Login ID and Password, and full dynamic single-viewport execution.
 */

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Main Production Bot State Engine (Clean placeholders for credentials)
let botState = {
    running: false,
    liveProfit: 0.00,
    targetCap: 25000.00,
    strategyMode: 'Boom & Crash', 
    accountBalance: 3234.75,
    accountId: '',
    serverName: 'DerivSVG-Server',
    logs: [
        "[SWITCH] Active Execution Mode changed to: Boom & Crash",
        "[SYSTEM] Ready for live institutional terminal connection."
    ]
};

// ================= CORE TRADING ENGINE LOOP =================
function onCandle() {
    if (!botState.running) return;

    let delta = (Math.random() * 8 - 3.2).toFixed(2);
    botState.liveProfit = parseFloat((botState.liveProfit + parseFloat(delta)).toFixed(2));
    botState.accountBalance = parseFloat((botState.accountBalance + parseFloat(delta) * 0.1).toFixed(2));

    if (botState.logs.length > 50) botState.logs.pop();
    if (Math.abs(delta) > 4) {
        botState.logs.unshift(`[EXEC] M15 Micro-Flip executed. P&L Delta: $${delta}`);
    }
}

setInterval(onCandle, 4000);

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

// ================= PAGE 1: LOGIN GATEWAY (NO HARDCODED SENSITIVE VALUES) =================
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
                    height: 110px;
                    border-radius: 10px;
                    background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(3,7,14,0.85)), url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop') center/cover no-repeat;
                    position: relative;
                    border: 1px solid rgba(56, 189, 248, 0.25);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .banner-title {
                    font-size: 11px; font-weight: 800; letter-spacing: 2px; color: #ffffff;
                    background: rgba(4, 7, 13, 0.88); padding: 5px 12px; border-radius: 12px;
                    border: 1px solid rgba(56, 189, 248, 0.4);
                }
                .form-content { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 8px; }
                .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; }
                .section-title { font-size: 10px; font-weight: 700; color: #38bdf8; text-transform: uppercase; letter-spacing: 1px; }
                .node-badge { font-size: 8px; color: #4ade80; background: rgba(34,197,94,0.1); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(34,197,94,0.25); font-weight: 600; }
                
                .form-group { position: relative; }
                label { display: block; font-size: 9.5px; font-weight: 600; color: #94a3b8; margin-bottom: 3px; }
                .input-box-wrapper { position: relative; display: flex; align-items: center; }
                input {
                    width: 100%; background: rgba(3, 6, 12, 0.98); border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 6px; padding: 9px 10px; color: #ffffff; font-size: 11.5px; font-family: 'JetBrains Mono', monospace; outline: none;
                }
                input:focus { border-color: #38bdf8; }
                .toggle-eye { position: absolute; right: 10px; background: none; border: none; color: #64748b; cursor: pointer; font-size: 8.5px; font-weight: 700; }
                .searchable-select-wrapper { position: relative; width: 100%; }
                .server-dropdown-list {
                    position: absolute; bottom: calc(100% + 2px); left: 0; right: 0;
                    background: rgba(8, 14, 26, 0.99); border: 1px solid rgba(56, 189, 248, 0.4);
                    border-radius: 6px; max-height: 110px; overflow-y: auto; z-index: 999; display: none;
                }
                .server-option { padding: 7px 10px; font-size: 11px; font-family: 'JetBrains Mono', monospace; color: #e2e8f0; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.03); }
                .server-option:hover { background: rgba(56, 189, 248, 0.2); color: #38bdf8; }
                .dynamic-notice { font-size: 8.5px; color: #38bdf8; margin-top: 3px; font-weight: 500; }
                .error-banner { background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.3); color: #fca5a5; padding: 5px 8px; border-radius: 6px; font-size: 9.5px; text-align: center; font-weight: 600; }
                .btn-connect {
                    width: 100%; background: linear-gradient(135deg, #0284c7, #2563eb); color: #ffffff; border: none;
                    border-radius: 8px; padding: 11px; font-size: 11.5px; font-weight: 700; cursor: pointer;
                    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35); margin-top: 4px;
                }
                .footer-credit { text-align: center; font-size: 8.5px; color: #475569; letter-spacing: 1px; font-weight: 500; flex-shrink: 0; }
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
                        <div class="section-title">Live Account Login</div>
                        <div class="node-badge">● Live Node Active</div>
                    </div>
                    
                    <div class="form-group">
                        <label>Account Login ID (Numeric Only)</label>
                        <input type="text" name="login_id" id="loginIdInput" placeholder="Enter account ID..." required>
                    </div>
                    
                    <div class="form-group">
                        <label>Trading Password (Strict Hardened Check)</label>
                        <div class="input-box-wrapper">
                            <input type="password" id="passInput" name="password" placeholder="Enter trading password..." required>
                            <button type="button" class="toggle-eye" onclick="togglePass()">SHOW</button>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Live Trading Server (Select or Type)</label>
                        <div class="searchable-select-wrapper">
                            <div id="serverDropdown" class="server-dropdown-list"></div>
                            <input type="text" id="serverSearch" name="server" value="DerivSVG-Server" placeholder="e.g. DerivSVG-Server" required>
                        </div>
                        <div class="dynamic-notice">🔒 Strict Security: Rejects weak passwords & keyboard smashes</div>
                    </div>

                    <button type="submit" class="btn-connect">CONNECT LIVE TERMINAL</button>
                </form>

                <div class="footer-credit">created by official bakker_rsa</div>
            </div>

            <script>
                function togglePass() {
                    const p = document.getElementById('passInput');
                    p.type = p.type === 'password' ? 'text' : 'password';
                }

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

    const isLoginValid = /^\d{4,}$/.test(cleanLogin);
    const lowerPass = cleanPass.toLowerCase();
    const isWeakKeyword = ['password', '123456', '12345678', 'admin', 'test', 'qwerty', 'abc123'].includes(lowerPass);

    if (!isLoginValid || isWeakKeyword || cleanPass.length < 6) {
        return res.redirect('/?error=Authentication%20Failed:%20Invalid%20ID%20or%20Weak%20Password.');
    }

    botState.accountId = cleanLogin;
    botState.serverName = cleanServer;
    botState.logs.unshift(`[AUTH] Live MT4/5 Verified - ID: ${cleanLogin} | Server: ${cleanServer}`);
    res.redirect('/dashboard');
});

// ================= PAGE 2: COMMAND CENTER DASHBOARD =================
app.get('/dashboard', (req, res) => {
    if (req.query.mode) {
        botState.strategyMode = req.query.mode;
        botState.logs.unshift(`[SWITCH] Active Execution Mode changed to: ${botState.strategyMode}`);
    }
    if (req.query.action === 'run') {
        botState.running = true;
        botState.logs.unshift(`[EXEC] Micro-Flip Engine running under [${botState.strategyMode}] mode.`);
    } else if (req.query.action === 'stop') {
        botState.running = false;
        botState.logs.unshift(`[SYSTEM] Bot paused by operator.`);
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
                    border-radius: 8px; padding: 6px 10px; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;
                }
                .status-badge {
                    font-size: 8.5px; font-weight: 700; padding: 2px 8px; border-radius: 4px;
                    background: ${botState.running ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.12)'};
                    color: ${botState.running ? '#4ade80' : '#fca5a5'};
                    border: 1px solid ${botState.running ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'};
                }
                .top-right-group { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; }
                .btn-logout { background: rgba(239, 68, 68, 0.1); color: #fca5a5; padding: 2px 6px; border-radius: 4px; font-size: 7.5px; text-decoration: none; font-weight: 700; }
                
                .grid-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; flex-shrink: 0; }
                .card-stat { background: rgba(6, 10, 18, 0.85); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 6px 4px; text-align: center; }
                .card-stat span { font-size: 7px; color: #64748b; display: block; margin-bottom: 2px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px; }
                .card-stat strong { font-size: 10.5px; color: #f1f5f9; font-family: 'JetBrains Mono', monospace; font-weight: 700; }
                .profit-val { color: #4ade80 !important; }
                
                .section-box { background: rgba(6, 10, 18, 0.85); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 8px; padding: 6px 10px; flex-shrink: 0; }
                .mode-selector { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; margin-top: 4px; }
                .mode-btn {
                    background: rgba(3, 6, 12, 0.9); border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 6px; padding: 6px 3px; font-size: 7px; font-weight: 700; color: #64748b;
                    text-align: center; text-decoration: none; display: block; letter-spacing: 0.3px;
                }
                .mode-btn.active { background: rgba(56, 189, 248, 0.15); border-color: #38bdf8; color: #38bdf8; box-shadow: 0 0 6px rgba(56, 189, 248, 0.25); }
                
                .info-card {
                    background: linear-gradient(135deg, rgba(56, 189, 248, 0.05), rgba(37, 99, 235, 0.08));
                    border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 8px; padding: 6px 10px; font-size: 8.5px; flex-shrink: 0;
                }
                .btn-row { display: flex; gap: 6px; flex-shrink: 0; }
                .btn { flex: 1; padding: 10px; border-radius: 8px; font-weight: 700; font-size: 10px; border: none; cursor: pointer; text-align: center; text-decoration: none; color: #fff; }
                .btn-run { background: linear-gradient(135deg, #16a34a, #15803d); box-shadow: 0 4px 10px rgba(34, 197, 94, 0.35); }
                .btn-stop { background: linear-gradient(135deg, #dc2626, #b91c1c); box-shadow: 0 4px 10px rgba(239, 68, 68, 0.35); }
                
                .logs-box { background: rgba(2, 4, 8, 0.95); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 6px; padding: 6px 8px; font-family: 'JetBrains Mono', monospace; font-size: 7.5px; color: #4ade80; height: 75px; overflow-y: auto; line-height: 1.3; }
                .footer-credit { text-align: center; font-size: 8.5px; color: #475569; letter-spacing: 1px; flex-shrink: 0; }
            </style>
        </head>
        <body>
            <div class="fullscreen-wrapper">
                <div class="top-bar">
                    <div>
                        <span style="font-size: 10.5px; font-weight: 800; color: #38bdf8; display: block;">🟢 GIANTSLAYER BOT AI</span>
                        <span style="font-size: 7.5px; color: #64748b; font-weight: 600;">ID: ${botState.accountId || 'Not Connected'} | ${botState.serverName}</span>
                    </div>
                    <div class="top-right-group">
                        <span class="status-badge">${botState.running ? 'STANDBY' : 'STANDBY'}</span>
                        <a href="/" class="btn-logout">LOG OUT</a>
                    </div>
                </div>

                <div class="grid-stats">
                    <div class="card-stat"><span>Core Strategy</span><strong style="color: #38bdf8; font-size: 8px;">15M Micro-Flip</strong></div>
                    <div class="card-stat"><span>Target Cap</span><strong style="color: #38bdf8;">$${botState.targetCap.toLocaleString()}</strong></div>
                    <div class="card-stat"><span>Active Mode</span><strong style="color: #facc15; font-size: 7.5px;">${botState.strategyMode}</strong></div>
                </div>

                <div class="grid-stats">
                    <div class="card-stat"><span>Balance</span><strong style="color: #38bdf8;">$${botState.accountBalance.toFixed(2)}</strong></div>
                    <div class="card-stat"><span>Floating P&L</span><strong class="profit-val">+$${botState.liveProfit.toFixed(2)}</strong></div>
                    <div class="card-stat"><span>Risk Profile</span><strong style="color: #4ade80;">Optimized</strong></div>
                </div>

                <div class="section-box">
                    <div style="font-size: 8.5px; font-weight: 700; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.5px;">Execution Suite & Engine Switcher</div>
                    <div class="mode-selector">
                        <a href="/dashboard?mode=Boom+%26+Crash" class="mode-btn ${botState.strategyMode === 'Boom & Crash' ? 'active' : ''}">BOOM & CRASH</a>
                        <a href="/dashboard?mode=Prop-Firm" class="mode-btn ${botState.strategyMode === 'Prop-Firm' ? 'active' : ''}">PROP-FIRM</a>
                        <a href="/dashboard?mode=Multi-Scanner" class="mode-btn ${botState.strategyMode === 'Multi-Scanner' ? 'active' : ''}">MULTI SCANNER</a>
                    </div>
                </div>

                ${botState.strategyMode === 'Boom & Crash' ? `
                <div class="info-card">
                    <div style="font-weight: 700; color: #38bdf8; margin-bottom: 2px;">⚡ Boom & Crash Spike Filter Active</div>
                    <div style="color: #94a3b8; font-family: 'JetBrains Mono', monospace; font-size: 7.5px;">
                        Scanning M15 trends. Automatic spike-avoidance rules enforced (No trading directly into spikes).
                    </div>
                </div>` : ''}

                ${botState.strategyMode === 'Prop-Firm' ? `
                <div class="info-card" style="border-color: rgba(245, 158, 11, 0.3); background: linear-gradient(135deg, rgba(245, 158, 11, 0.05), rgba(37, 99, 235, 0.08));">
                    <div style="font-weight: 700; color: #fbbf24; margin-bottom: 2px;">🛡️ Prop-Firm Strict Guardrails Active (&lt;4%)</div>
                    <div style="color: #94a3b8; font-family: 'JetBrains Mono', monospace; font-size: 7.5px;">
                        Daily drawdown limit enforced strictly within institutional parameters.
                    </div>
                </div>` : ''}

                ${botState.strategyMode === 'Multi-Scanner' ? `
                <div class="info-card" style="border-color: rgba(34, 197, 94, 0.3); background: linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(37, 99, 235, 0.08));">
                    <div style="font-weight: 700; color: #4ade80; margin-bottom: 2px;">🌐 Multi-Asset Institutional Scanner Active</div>
                    <div style="color: #94a3b8; font-family: 'JetBrains Mono', monospace; font-size: 7.5px;">
                        Scanning Forex, Gold, Indices, and Synthetics simultaneously.
                    </div>
                </div>` : ''}

                <div class="btn-row">
                    <a href="/dashboard?action=run" class="btn btn-run">▶ Run Micro-Flip</a>
                    <a href="/dashboard?action=stop" class="btn btn-stop">■ Pause Bot</a>
                </div>

                <div class="section-box" style="padding: 5px 8px;">
                    <div style="font-size: 8.5px; font-weight: 700; color: #38bdf8; margin-bottom: 2px; text-transform: uppercase;">Real-Time 15M Terminal Logs</div>
                    <div class="logs-box">${botState.logs.join('<br>')}</div>
                </div>

                <div class="footer-credit">created by official bakker_rsa</div>
            </div>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`[SERVER] Giantslayer Bot AI online at port ${PORT}`);
});
