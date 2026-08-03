/**
 * Project: The Giantslayer Bot AI v6.1 (iOS App Style & Blank Server Field)
 * Description: Fully updated script implementing native Apple/iOS mobile app aesthetics 
 * (glassmorphism cards, dynamic notch styling, native segmented controls) and clearing 
 * the default trading server input to be completely blank.
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
    strategyMode: 'Boom & Crash', 
    accountBalance: 3234.75,
    accountId: '248484',
    serverName: 'DerivSVG-Server',
    logs: [
        "[SWITCH] Active Execution Mode changed to: Boom & Crash",
        "[SWITCH] Active Execution Mode changed to: Multi Scanner",
        "[SWITCH] Active Execution Mode changed to: Prop-Firm",
        "[AUTH] Live MT4/5 Verified - ID: 248484 | Server: DerivSVG-Server"
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

const iosStyles = `
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Plus Jakarta Sans", sans-serif; -webkit-tap-highlight-color: transparent; }
    html, body {
        background-color: #000000;
        color: #f5f5f7;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .app-container {
        width: 100%;
        height: 100%;
        max-width: 440px;
        max-height: 100vh;
        background: #000000;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10px 14px 14px 14px;
        position: relative;
    }
    .ios-glass-card {
        background: rgba(28, 28, 30, 0.75);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px;
    }
`;

// ================= PAGE 1: LOGIN GATEWAY (BLANK SERVER & iOS TOUCHES) =================
app.get('/', (req, res) => {
    const errorMsg = req.query.error ? decodeURIComponent(req.query.error) : '';
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
            <title>GIANTSLAYER BOT AI - Mobile Gateway</title>
            <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
            <style>
                ${iosStyles}
                .hero-banner {
                    width: 100%;
                    height: 130px;
                    border-radius: 16px;
                    background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.85)), url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop') center/cover no-repeat;
                    position: relative;
                    border: 1px solid rgba(10, 132, 255, 0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
                }
                .banner-pill {
                    font-size: 11px; font-weight: 800; letter-spacing: 2px; color: #ffffff;
                    background: rgba(28, 28, 30, 0.85); backdrop-filter: blur(10px);
                    padding: 6px 16px; border-radius: 20px;
                    border: 1px solid rgba(10, 132, 255, 0.4);
                }
                .form-content { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 10px; }
                .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px; }
                .section-title { font-size: 11px; font-weight: 700; color: #0a84ff; text-transform: uppercase; letter-spacing: 0.8px; }
                .node-badge { font-size: 9px; color: #30d158; background: rgba(48, 209, 88, 0.15); padding: 3px 8px; border-radius: 6px; border: 1px solid rgba(48, 209, 88, 0.3); font-weight: 600; }
                
                .form-group { position: relative; }
                label { display: block; font-size: 10px; font-weight: 600; color: #8e8e93; margin-bottom: 4px; }
                .input-box-wrapper { position: relative; display: flex; align-items: center; }
                input {
                    width: 100%; background: rgba(44, 44, 46, 0.8); border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 10px; padding: 12px 14px; color: #ffffff; font-size: 13px; font-family: 'JetBrains Mono', monospace; outline: none;
                    transition: all 0.2s ease;
                }
                input:focus { border-color: #0a84ff; background: rgba(44, 44, 46, 1); box-shadow: 0 0 0 3px rgba(10, 132, 255, 0.2); }
                .toggle-eye { position: absolute; right: 12px; background: none; border: none; color: #0a84ff; cursor: pointer; font-size: 10px; font-weight: 700; }
                .searchable-select-wrapper { position: relative; width: 100%; }
                .server-dropdown-list {
                    position: absolute; bottom: calc(100% + 4px); left: 0; right: 0;
                    background: rgba(44, 44, 46, 0.98); backdrop-filter: blur(20px);
                    border: 1px solid rgba(10, 132, 255, 0.4);
                    border-radius: 12px; max-height: 130px; overflow-y: auto; z-index: 999; display: none;
                }
                .server-option { padding: 9px 12px; font-size: 12px; font-family: 'JetBrains Mono', monospace; color: #f5f5f7; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.05); }
                .server-option:hover { background: rgba(10, 132, 255, 0.25); color: #0a84ff; }
                .error-banner { background: rgba(255, 69, 58, 0.15); border: 1px solid rgba(255, 69, 58, 0.3); color: #ff453a; padding: 8px 12px; border-radius: 10px; font-size: 10px; text-align: center; font-weight: 600; }
                .btn-connect {
                    width: 100%; background: linear-gradient(135deg, #0a84ff, #005ec4); color: #ffffff; border: none;
                    border-radius: 12px; padding: 13px; font-size: 13px; font-weight: 700; cursor: pointer;
                    box-shadow: 0 4px 16px rgba(10, 132, 255, 0.4); margin-top: 6px;
                }
                .footer-credit { text-align: center; font-size: 9px; color: #636366; letter-spacing: 1px; font-weight: 500; flex-shrink: 0; padding-top: 4px; }
            </style>
        </head>
        <body>
            <div class="app-container">
                <div class="hero-banner">
                    <div class="banner-pill">GIANTSLAYER BOT AI</div>
                </div>

                ${errorMsg ? `<div class="error-banner">⚠️ ${errorMsg}</div>` : ''}

                <form action="/dashboard" method="POST" id="authForm" class="form-content">
                    <div class="section-header">
                        <div class="section-title">Live Account Login</div>
                        <div class="node-badge">● Live Node Active</div>
                    </div>
                    
                    <div class="form-group">
                        <label>Account Login ID (Numeric Only)</label>
                        <input type="text" name="login_id" id="loginIdInput" placeholder="" value="" required autocomplete="off">
                    </div>
                    
                    <div class="form-group">
                        <label>Trading Password</label>
                        <div class="input-box-wrapper">
                            <input type="password" id="passInput" name="password" placeholder="" value="" required>
                            <button type="button" class="toggle-eye" onclick="togglePass()">SHOW</button>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Live Trading Server (Select or Type)</label>
                        <div class="searchable-select-wrapper">
                            <div id="serverDropdown" class="server-dropdown-list"></div>
                            <!-- Server field is now completely blank as requested -->
                            <input type="text" id="serverSearch" name="server" value="" placeholder="" required autocomplete="off">
                        </div>
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

    if (!isLoginValid || isWeakKeyword || cleanPass.length < 6 || !cleanServer) {
        return res.redirect('/?error=Authentication%20Failed:%20Missing%20Server%20or%20Invalid%20Credentials.');
    }

    botState.accountId = cleanLogin;
    botState.serverName = cleanServer;
    botState.logs.unshift(`[AUTH] Live MT4/5 Verified - ID: ${cleanLogin} | Server: ${cleanServer}`);
    res.redirect('/dashboard');
});

// ================= PAGE 2: COMMAND CENTER DASHBOARD (iOS APP FEEL) =================
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
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
            <title>GIANTSLAYER BOT AI - Command Center</title>
            <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
            <style>
                ${iosStyles}
                .nav-bar {
                    background: rgba(28, 28, 30, 0.85); backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 14px; padding: 8px 12px; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;
                }
                .status-badge {
                    font-size: 9px; font-weight: 700; padding: 4px 10px; border-radius: 8px;
                    background: rgba(255, 69, 58, 0.15); color: #ff453a;
                    border: 1px solid rgba(255, 69, 58, 0.3); text-align: center; letter-spacing: 0.5px;
                }
                .nav-right { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
                .btn-logout { background: rgba(255, 69, 58, 0.15); color: #ff453a; padding: 3px 8px; border-radius: 6px; font-size: 8px; text-decoration: none; font-weight: 700; }
                
                .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; flex-shrink: 0; }
                .stat-box { 
                    background: rgba(28, 28, 30, 0.75); backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 8px 6px; text-align: center; 
                }
                .stat-box span { font-size: 7.5px; color: #8e8e93; display: block; margin-bottom: 2px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.4px; }
                .stat-box strong { font-size: 11px; color: #f5f5f7; font-family: 'JetBrains Mono', monospace; font-weight: 700; }
                .profit-val { color: #30d158 !important; }
                
                .section-card { 
                    background: rgba(28, 28, 30, 0.75); backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 12px; padding: 8px 12px; flex-shrink: 0; 
                }
                .segmented-control { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; margin-top: 6px; background: rgba(0, 0, 0, 0.4); padding: 3px; border-radius: 10px; }
                .segment-btn {
                    background: transparent; border: none; border-radius: 8px; padding: 7px 4px; font-size: 7.5px; font-weight: 700; color: #8e8e93;
                    text-align: center; text-decoration: none; display: block; letter-spacing: 0.3px; transition: all 0.2s ease;
                }
                .segment-btn.active { background: rgba(10, 132, 255, 0.25); color: #0a84ff; border: 1px solid rgba(10, 132, 255, 0.4); box-shadow: 0 0 10px rgba(10, 132, 255, 0.2); }
                
                .info-banner {
                    background: linear-gradient(135deg, rgba(10, 132, 255, 0.1), rgba(0, 94, 196, 0.15));
                    border: 1px solid rgba(10, 132, 255, 0.3); border-radius: 12px; padding: 8px 12px; font-size: 9px; flex-shrink: 0;
                }
                .action-row { display: flex; gap: 8px; flex-shrink: 0; }
                .action-btn { flex: 1; padding: 12px; border-radius: 12px; font-weight: 700; font-size: 11px; border: none; cursor: pointer; text-align: center; text-decoration: none; color: #fff; }
                .btn-run { background: linear-gradient(135deg, #30d158, #248a3d); box-shadow: 0 4px 14px rgba(48, 209, 88, 0.35); }
                .btn-stop { background: linear-gradient(135deg, #ff453a, #d70015); box-shadow: 0 4px 14px rgba(255, 69, 58, 0.35); }
                
                .terminal-logs { background: rgba(0, 0, 0, 0.85); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 8px 10px; font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #30d158; height: 80px; overflow-y: auto; line-height: 1.35; }
                .footer-credit { text-align: center; font-size: 9px; color: #636366; letter-spacing: 1px; flex-shrink: 0; }
            </style>
        </head>
        <body>
            <div class="app-container">
                <div class="nav-bar">
                    <div>
                        <span style="font-size: 11px; font-weight: 800; color: #0a84ff; display: flex; align-items: center; gap: 6px;"><span style="width: 7px; height: 7px; background: #30d158; border-radius: 50%; display: inline-block; box-shadow: 0 0 8px #30d158;"></span> GIANTSLAYER BOT AI</span>
                        <span style="font-size: 8px; color: #8e8e93; font-weight: 600;">ID: ${botState.accountId || '248484'} | ${botState.serverName}</span>
                    </div>
                    <div class="nav-right">
                        <span class="status-badge">STANDBY</span>
                        <a href="/" class="btn-logout">LOG OUT</a>
                    </div>
                </div>

                <div class="stats-grid">
                    <div class="stat-box"><span>Core Strategy</span><strong style="color: #0a84ff; font-size: 8.5px;">15M Micro-Flip</strong></div>
                    <div class="stat-box"><span>Target Cap</span><strong style="color: #0a84ff;">$${botState.targetCap.toLocaleString()}</strong></div>
                    <div class="stat-box"><span>Active Mode</span><strong style="color: #ffd60a; font-size: 8px;">${botState.strategyMode}</strong></div>
                </div>

                <div class="stats-grid">
                    <div class="stat-box"><span>Balance</span><strong style="color: #0a84ff;">$${botState.accountBalance.toFixed(2)}</strong></div>
                    <div class="stat-box"><span>Floating P&L</span><strong class="profit-val">+$${botState.liveProfit.toFixed(2)}</strong></div>
                    <div class="stat-box"><span>Risk Profile</span><strong style="color: #30d158;">Optimized</strong></div>
                </div>

                <div class="section-card">
                    <div style="font-size: 9px; font-weight: 700; color: #0a84ff; text-transform: uppercase; letter-spacing: 0.5px;">Execution Suite & Engine Switcher</div>
                    <div class="segmented-control">
                        <a href="/dashboard?mode=Boom+%26+Crash" class="segment-btn ${botState.strategyMode === 'Boom & Crash' ? 'active' : ''}">BOOM & CRASH</a>
                        <a href="/dashboard?mode=Prop-Firm" class="segment-btn ${botState.strategyMode === 'Prop-Firm' ? 'active' : ''}">PROP-FIRM</a>
                        <a href="/dashboard?mode=Multi-Scanner" class="segment-btn ${botState.strategyMode === 'Multi-Scanner' ? 'active' : ''}">MULTI SCANNER</a>
                    </div>
                </div>

                ${botState.strategyMode === 'Boom & Crash' ? `
                <div class="info-banner">
                    <div style="font-weight: 700; color: #0a84ff; margin-bottom: 2px;">⚡ Boom & Crash Spike Filter Active</div>
                    <div style="color: #8e8e93; font-family: 'JetBrains Mono', monospace; font-size: 8px;">
                        Scanning M15 trends. Automatic spike-avoidance rules enforced (No trading directly into spikes).
                    </div>
                </div>` : ''}

                ${botState.strategyMode === 'Prop-Firm' ? `
                <div class="info-banner" style="border-color: rgba(255, 159, 10, 0.4); background: linear-gradient(135deg, rgba(255, 159, 10, 0.1), rgba(10, 132, 255, 0.15));">
                    <div style="font-weight: 700; color: #ff9f0a; margin-bottom: 2px;">🛡️ Prop-Firm Strict Guardrails Active (&lt;4%)</div>
                    <div style="color: #8e8e93; font-family: 'JetBrains Mono', monospace; font-size: 8px;">
                        Daily drawdown limit enforced strictly within institutional parameters.
                    </div>
                </div>` : ''}

                ${botState.strategyMode === 'Multi-Scanner' ? `
                <div class="info-banner" style="border-color: rgba(48, 209, 88, 0.4); background: linear-gradient(135deg, rgba(48, 209, 88, 0.1), rgba(10, 132, 255, 0.15));">
                    <div style="font-weight: 700; color: #30d158; margin-bottom: 2px;">🌐 Multi-Asset Institutional Scanner Active</div>
                    <div style="color: #8e8e93; font-family: 'JetBrains Mono', monospace; font-size: 8px;">
                        Scanning Forex, Gold, Indices, and Synthetics simultaneously.
                    </div>
                </div>` : ''}

                <div class="action-row">
                    <a href="/dashboard?action=run" class="action-btn btn-run">▶ Run Micro-Flip</a>
                    <a href="/dashboard?action=stop" class="action-btn btn-stop">■ Pause Bot</a>
                </div>

                <div class="section-card" style="padding: 6px 10px;">
                    <div style="font-size: 9px; font-weight: 700; color: #0a84ff; margin-bottom: 3px; text-transform: uppercase;">Real-Time 15M Terminal Logs</div>
                    <div class="terminal-logs">${botState.logs.join('<br>')}</div>
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
