const fs = require("fs");
const path = "d:/construction 2/index.html";
let html = fs.readFileSync(path, "utf8");

const workerUI = `
<!-- ═══════════════════════════════════════
     WORKER DASHBOARD
═══════════════════════════════════════ -->
<div class="screen" id="workerDashScreen">
  <div class="inner-topbar" style="justify-content:space-between; background:white; border-bottom:1px solid var(--border-light); position:sticky; top:0; z-index:10;">
    <h2 style="font-size:20px; font-weight:800; color:var(--text-main);">Aatzy<span style="color:var(--primary);">Build</span></h2>
    <div style="display:flex; gap:16px; align-items:center;">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
      <div class="avatar-sm" style="background:#16A34A;">SK</div>
    </div>
  </div>
  
  <div class="screen-body pad" style="padding-top:16px;">
    <!-- Hero Card -->
    <div style="background:var(--primary); color:white; border-radius:12px; padding:20px; display:flex; align-items:center; gap:16px; margin-bottom:24px; box-shadow:0 4px 12px rgba(37, 99, 235, 0.2);">
      <div style="width:50px; height:50px; border-radius:50%; background:rgba(255,255,255,0.2); display:flex; justify-content:center; align-items:center; font-size:18px; font-weight:700;">SK</div>
      <div>
        <h3 style="font-size:20px; font-weight:800; margin-bottom:4px;">Hello, Suresh!</h3>
        <span style="background:rgba(255,255,255,0.2); padding:4px 10px; border-radius:12px; font-size:11px; font-weight:600;">Site Engineer</span>
      </div>
    </div>

    <!-- Quick Actions -->
    <h4 style="font-size:13px; font-weight:800; color:var(--text-main); margin-bottom:12px; text-transform:uppercase;">Quick Actions</h4>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:24px;">
      <div style="background:white; border:1px solid var(--border-light); border-radius:12px; padding:16px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; box-shadow:0 2px 4px rgba(0,0,0,0.02);">
        <div style="width:40px; height:40px; border-radius:8px; background:#DCFCE7; color:#16A34A; display:flex; align-items:center; justify-content:center;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
        </div>
        <span style="font-size:12px; font-weight:700;">Mark Attendance</span>
      </div>
      <div style="background:white; border:1px solid var(--border-light); border-radius:12px; padding:16px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; box-shadow:0 2px 4px rgba(0,0,0,0.02);">
        <div style="width:40px; height:40px; border-radius:8px; background:#DBEAFE; color:#2563EB; display:flex; align-items:center; justify-content:center;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
        </div>
        <span style="font-size:12px; font-weight:700;">My Tasks</span>
      </div>
      <div style="background:white; border:1px solid var(--border-light); border-radius:12px; padding:16px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; box-shadow:0 2px 4px rgba(0,0,0,0.02);">
        <div style="width:40px; height:40px; border-radius:8px; background:#FFEDD5; color:#EA580C; display:flex; align-items:center; justify-content:center;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        </div>
        <span style="font-size:12px; font-weight:700;">Apply Leave</span>
      </div>
      <div style="background:white; border:1px solid var(--border-light); border-radius:12px; padding:16px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; box-shadow:0 2px 4px rgba(0,0,0,0.02);">
        <div style="width:40px; height:40px; border-radius:8px; background:#F3E8FF; color:#9333EA; display:flex; align-items:center; justify-content:center;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
        </div>
        <span style="font-size:12px; font-weight:700;">Stock Hub</span>
      </div>
    </div>

    <!-- Assigned Projects -->
    <h4 style="font-size:13px; font-weight:800; color:var(--text-main); margin-bottom:12px; text-transform:uppercase;">Assigned Projects</h4>
    <div class="project-card" onclick="showScreen('workerProjectOverviewScreen')" style="border:1px solid var(--border-light); border-radius:12px; padding:16px; background:white; position:relative; box-shadow:0 2px 8px rgba(0,0,0,0.05); margin-bottom:32px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <span style="background:#DBEAFE; color:#2563EB; font-size:10px; font-weight:800; padding:4px 8px; border-radius:12px; text-transform:uppercase;">Commercial</span>
        <div style="width:8px; height:8px; border-radius:50%; background:#2563EB;"></div>
      </div>
      <h3 style="font-size:18px; font-weight:800; color:var(--text-main); margin-bottom:4px;">Metro Towers Phase 2</h3>
      <p style="font-size:13px; color:var(--text-secondary); margin-bottom:16px;">12 Floors &middot; Duplex &middot; Chennai</p>
      <div style="display:flex; align-items:center; gap:12px;">
        <span style="font-size:14px; font-weight:800; color:#2563EB;">72%</span>
        <div style="flex:1; height:6px; background:var(--bg-input); border-radius:3px; overflow:hidden;">
          <div style="width:72%; height:100%; background:#2563EB; border-radius:3px;"></div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════════════════════════════════
     WORKER PROJECT OVERVIEW SCREEN (CLONE OF ADMIN)
═══════════════════════════════════════ -->
<div class="screen" id="workerProjectOverviewScreen">
  <div class="inner-topbar" style="background:var(--primary); color:white; border-bottom:none;">
    <button class="btn-back" onclick="goBack()" style="color:white;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></button>
    <div style="width:36px"></div>
  </div>
  
  <div class="hero-card" style="background:var(--primary); color:white; padding:0 20px 24px; border-radius:0 0 24px 24px;">
    <h1 class="hero-title">Metro Towers Phase 2</h1>
    <p class="hero-subtitle">Worker / Supervisor View</p>
    <div class="hero-progress">
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <span style="font-size:13px; font-weight:700; color:#FBBF24;">72% Complete</span>
      </div>
      <div class="progress-track" style="background:rgba(255,255,255,0.2);"><div class="progress-fill" style="width:72%; background:#FBBF24;"></div></div>
    </div>
    <p class="hero-dates">📅 Jan 2025 – Dec 2025</p>
  </div>
  
  <div class="tab-bar" id="workerProjTabBar">
    <button class="tab-btn active" onclick="switchTab(this,'tabWorkerOverview','workerProjTabBar')">Overview</button>
    <button class="tab-btn" onclick="switchTab(this,'tabWorkerExpenses','workerProjTabBar')">Expenses</button>
    <button class="tab-btn" onclick="switchTab(this,'tabWorkerFiles','workerProjTabBar')">Files</button>
  </div>

  <!-- Tab: Overview -->
  <div class="tab-pane active" id="tabWorkerOverview">
    <div class="screen-body pad">
      
      <!-- Project Progress Line Graph -->
      <div class="summary-card" style="padding-bottom:16px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <div>
            <p style="font-size:12px; color:var(--text-tertiary); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:4px;">Total Spent (Till Date)</p>
            <div style="display:flex; align-items:baseline; gap:4px;">
              <h3 style="font-size:26px; font-weight:800; color:var(--text-primary);">₹ 45.2L</h3>
              <span style="font-size:14px; font-weight:600; color:var(--text-tertiary);">/ 80L</span>
            </div>
          </div>
          <div style="background:#D1FAE5; color:#059669; font-size:12px; font-weight:700; padding:6px 12px; border-radius:16px;">
            Under Budget
          </div>
        </div>
        
        <p style="font-size:14px; font-weight:600; color:var(--text-secondary); margin-top:20px; margin-bottom:12px;">Project Completion Progress</p>
        
        <div style="position:relative; width:100%; height:140px;">
          <!-- Horizontal Dashed Line -->
          <div style="position:absolute; top:65%; left:0; width:100%; height:1px; border-top:2px dashed var(--border-light);"></div>
          
          <!-- SVG Graph -->
          <svg viewBox="0 0 300 120" style="width:100%; height:100%; overflow:visible;">
            <defs>
              <linearGradient id="chartFillWorker" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#06B6D4" stop-opacity="0.3"/>
                <stop offset="100%" stop-color="#06B6D4" stop-opacity="0.05"/>
              </linearGradient>
            </defs>
            <path d="M 10,95 L 66,80 L 122,85 L 178,50 L 234,35 L 290,15 L 290,110 L 10,110 Z" fill="url(#chartFillWorker)" />
            <path d="M 10,95 L 66,80 L 122,85 L 178,50 L 234,35 L 290,15" fill="none" stroke="#06B6D4" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            <circle cx="10" cy="95" r="4" fill="white" stroke="#06B6D4" stroke-width="2.5" />
            <circle cx="66" cy="80" r="4" fill="white" stroke="#06B6D4" stroke-width="2.5" />
            <circle cx="122" cy="85" r="4" fill="white" stroke="#06B6D4" stroke-width="2.5" />
            <circle cx="178" cy="50" r="4" fill="white" stroke="#06B6D4" stroke-width="2.5" />
            <circle cx="234" cy="35" r="4" fill="white" stroke="#06B6D4" stroke-width="2.5" />
            <circle cx="290" cy="15" r="5" fill="white" stroke="#06B6D4" stroke-width="3.5" />
          </svg>
          
          <!-- X Axis Labels -->
          <div style="display:flex; justify-content:space-between; margin-top:8px; padding:0 2px;">
            <span style="font-size:11px; color:var(--text-tertiary); font-weight:600;">Jan</span>
            <span style="font-size:11px; color:var(--text-tertiary); font-weight:600;">Feb</span>
            <span style="font-size:11px; color:var(--text-tertiary); font-weight:600;">Mar</span>
            <span style="font-size:11px; color:var(--text-tertiary); font-weight:600;">Apr</span>
            <span style="font-size:11px; color:var(--text-tertiary); font-weight:600;">May</span>
            <span style="font-size:11px; color:#06B6D4; font-weight:800;">Jun (72%)</span>
          </div>
        </div>
      </div>
      
      <!-- Daily Report Access -->
      <div style="display:flex; justify-content:space-between; align-items:center; background:var(--primary-surface); padding:16px; border-radius:12px; margin-bottom:16px;">
        <div>
          <h4 style="font-size:14px; font-weight:700; color:var(--primary); margin-bottom:4px;">Daily Reports</h4>
          <p style="font-size:12px; color:var(--text-secondary);">Select a date to view activities & expenses</p>
        </div>
        <div style="position:relative; width:40px; height:40px; background:white; border-radius:50%; display:flex; justify-content:center; align-items:center; box-shadow:0 2px 8px rgba(37, 99, 235, 0.15); cursor:pointer;">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" width="20" height="20"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <input type="date" min="2025-01-01" max="2025-12-31" style="position:absolute; top:0; left:0; width:100%; height:100%; opacity:0; cursor:pointer;" onchange="showScreen('dailyReportScreen')">
        </div>
      </div>

      <!-- Admin Details for Chat -->
      <div class="summary-card">
        <div class="section-header">
          <h4 style="font-size:13px; font-weight:700;">🏢 Construction Company</h4>
        </div>
        <div style="display:flex; align-items:center; justify-content:space-between;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div class="avatar-md" style="background:#0D47A1">AD</div>
            <div><p style="font-size:14px; font-weight:600;">Admin / Owner</p><p style="font-size:12px; color:var(--text-tertiary);">AatzyBuild Company</p></div>
          </div>
          <button class="action-btn-sm chat" onclick="showScreen('messagingScreen')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg></button>
        </div>
      </div>

      <!-- Client Details -->
      <div class="summary-card">
        <div class="section-header">
          <h4 style="font-size:13px; font-weight:700;">👤 Client Details</h4>
        </div>
        <div style="display:flex; align-items:center; justify-content:space-between;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div class="avatar-md" style="background:#7C3AED">AK</div>
            <div><p style="font-size:14px; font-weight:600;">Arun Kumar</p><p style="font-size:12px; color:var(--text-tertiary);">Client</p></div>
          </div>
          <button class="action-btn-sm chat" onclick="showScreen('messagingScreen')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg></button>
        </div>
      </div>

      <!-- Team Members -->
      <div class="summary-card">
        <div class="section-header">
          <h4 style="font-size:13px; font-weight:700;">👷 Assigned Team Members</h4>
        </div>
        
        <div class="team-card" style="margin-bottom:8px;box-shadow:none;border:1px solid var(--border-light)">
          <div class="avatar-md" style="background:#2563EB;">RK</div>
          <div class="tm-info"><p class="tm-name">Raj Kumar</p><p class="tm-role">Site Engineer</p></div>
          <div style="display:flex; gap:6px;">
            <button class="action-btn-sm chat" onclick="showScreen('messagingScreen')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg></button>
          </div>
        </div>

        <div class="team-card" style="margin-bottom:8px;box-shadow:none;border:1px solid var(--border-light)">
          <div class="avatar-md" style="background:#F57C00;">SK</div>
          <div class="tm-info"><p class="tm-name">Suresh K.</p><p class="tm-role">Supervisor</p></div>
          <div style="display:flex; gap:6px;">
            <button class="action-btn-sm chat" onclick="showScreen('messagingScreen')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg></button>
          </div>
        </div>

        <div class="team-card" style="box-shadow:none;border:1px solid var(--border-light)">
          <div class="avatar-md" style="background:#16A34A;">PM</div>
          <div class="tm-info"><p class="tm-name">Prakash M.</p><p class="tm-role">Worker (You)</p></div>
        </div>
      </div>

      <!-- Photos -->
      <div class="summary-card">
        <h4 style="font-size:13px; font-weight:700; margin-bottom:12px;">📸 Site Photos</h4>
        <div style="display:flex; gap:8px; overflow-x:auto;">
          <div style="width:100px;height:80px;background:var(--bg-input);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--text-tertiary)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="24" height="24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>
          <div style="width:100px;height:80px;background:var(--bg-input);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--text-tertiary)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="24" height="24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Tab: Expenses -->
  <div class="tab-pane" id="tabWorkerExpenses">
    <div class="screen-body pad">
      <div class="summary-card" style="background:linear-gradient(135deg, #0D47A1, #1565C0); color:white; border:none; margin-bottom:16px;">
        <p style="font-size:11px; text-transform:uppercase; opacity:0.7; margin-bottom:4px;">Total Daily Expense</p>
        <p style="font-size:28px; font-weight:800;">₹11,450</p>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <h4 style="font-size:12px; font-weight:700; color:var(--text-tertiary); text-transform:uppercase;">Breakdown</h4>
      </div>
      <div class="expense-item">
        <div class="exp-icon" style="background:var(--info-surface)"><svg viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2" width="18" height="18"><path d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="10" cy="7" r="4"/></svg></div>
        <div class="exp-info"><p class="exp-title">Labour Wages</p><p class="exp-meta">Full day × 12, Half day × 3</p></div>
        <span class="exp-amount" style="color:var(--primary)">₹10,800</span>
      </div>
    </div>
  </div>

  <!-- Tab: Files -->
  <div class="tab-pane" id="tabWorkerFiles">
    <div class="screen-body pad">
      <div class="file-item">
        <div class="file-icon pdf"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>
        <div class="file-info"><p class="file-name">Floor_Plan_B2.pdf</p><p class="file-meta">2.4 MB · Jun 1, 2025</p></div>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════════════════════════════════
     MESSAGING SCREEN
═══════════════════════════════════════ -->
<div class="screen" id="messagingScreen" style="background:#F8FAFC; display:flex; flex-direction:column; height:100vh;">
  <!-- Header -->
  <div class="inner-topbar" style="background:white; border-bottom:1px solid var(--border-light); padding:16px;">
    <button class="btn-back" onclick="goBack()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></button>
    <div style="display:flex; align-items:center; gap:12px; margin-left:12px;">
      <div class="avatar-sm" style="background:#2563EB;">AD</div>
      <div>
        <h3 style="font-size:15px; font-weight:700;">Admin / Owner</h3>
        <p style="font-size:11px; color:var(--success); font-weight:600;">Online</p>
      </div>
    </div>
    <div style="flex:1"></div>
    <button class="action-btn-sm" style="background:none; border:none; color:var(--text-secondary);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg></button>
  </div>

  <!-- Chat Area -->
  <div class="screen-body pad" style="flex:1; overflow-y:auto; display:flex; flex-direction:column; gap:16px; padding-top:20px;">
    <div style="text-align:center; margin-bottom:8px;"><span style="background:var(--bg-input); padding:4px 12px; border-radius:12px; font-size:10px; color:var(--text-tertiary); font-weight:600; text-transform:uppercase;">Today</span></div>
    
    <!-- Incoming Message -->
    <div style="display:flex; gap:8px; align-items:flex-end;">
      <div class="avatar-xs" style="background:#2563EB; width:24px; height:24px; font-size:10px;">AD</div>
      <div style="background:white; border:1px solid var(--border-light); padding:12px; border-radius:12px 12px 12px 0; max-width:75%; box-shadow:0 2px 4px rgba(0,0,0,0.02);">
        <p style="font-size:13px; color:var(--text-main); line-height:1.4;">The new cement bags have arrived at the site. Please verify the quantity.</p>
        <p style="font-size:10px; color:var(--text-tertiary); text-align:right; margin-top:4px;">10:30 AM</p>
      </div>
    </div>
    
    <!-- Outgoing Message (Text + Image) -->
    <div style="display:flex; flex-direction:column; align-items:flex-end; gap:4px;">
      <div style="background:var(--primary); color:white; padding:12px; border-radius:12px 12px 0 12px; max-width:75%; box-shadow:0 2px 4px rgba(37,99,235,0.15);">
        <p style="font-size:13px; line-height:1.4;">Yes sir, I have checked it. I will upload the photos now.</p>
        <p style="font-size:10px; color:rgba(255,255,255,0.7); text-align:right; margin-top:4px;">10:35 AM &middot; <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12" style="display:inline; vertical-align:text-bottom;"><polyline points="20 6 9 17 4 12"/></svg></p>
      </div>
      
      <!-- Outgoing Image Attachment -->
      <div style="background:var(--primary); padding:4px; border-radius:12px 12px 0 12px; max-width:70%;">
        <div style="width:100%; height:120px; background:#1D4ED8; border-radius:8px; display:flex; align-items:center; justify-content:center;">
          <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" width="32" height="32"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        </div>
      </div>
    </div>
  </div>

  <!-- Chat Input -->
  <div style="background:white; padding:12px 16px; border-top:1px solid var(--border-light); display:flex; align-items:center; gap:12px;">
    <button style="background:none; border:none; color:var(--text-secondary); cursor:pointer;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg></button>
    <button style="background:none; border:none; color:var(--text-secondary); cursor:pointer;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></button>
    <input type="text" placeholder="Type a message..." style="flex:1; border:none; background:var(--bg-input); border-radius:20px; padding:10px 16px; font-size:14px; outline:none; font-family:'Inter', sans-serif;">
    <button style="background:var(--primary); border:none; color:white; width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 2px 8px rgba(37,99,235,0.3);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>
  </div>
</div>

<!-- ═══════════════════════════════════════
     BOTTOM NAVIGATION (WORKER)
═══════════════════════════════════════ -->
<nav class="bottom-nav hidden" id="workerNav">
  <div class="nav-item active" onclick="switchBottomNav(this, 'workerDashScreen', 'workerNav')">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
    <span>Dashboard</span>
  </div>
  <div class="nav-item" onclick="showToast('Navigate to Attendance')">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    <span>Attendance</span>
  </div>
  <div class="nav-item" onclick="showToast('Navigate to Tasks')">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
    <span>Tasks</span>
  </div>
  <div class="nav-item" onclick="showToast('Navigate to Report')">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
    <span>Report</span>
  </div>
  <div class="nav-item" onclick="showToast('Navigate to Settings')">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
    <span>Settings</span>
  </div>
</nav>
`;

html = html.replace("</div><!-- end app-shell -->", workerUI + "\n</div><!-- end app-shell -->");
fs.writeFileSync(path, html, "utf8");

// Also update index.css
const cssPath = "d:/construction 2/index.css";
let css = fs.readFileSync(cssPath, "utf8");
const cssAppend = `
/* Enhanced Chat Button */
.action-btn-sm.chat {
  background: var(--primary-surface);
  color: var(--primary);
  border: 1px solid rgba(37, 99, 235, 0.2);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(37, 99, 235, 0.1);
  cursor: pointer;
}
.action-btn-sm.chat:hover {
  background: var(--primary);
  color: white;
}
`;
fs.writeFileSync(cssPath, css + cssAppend, "utf8");
