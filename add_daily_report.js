const fs = require('fs');
let html = fs.readFileSync('d:/construction 2/index.html', 'utf8');

// Replace showScreen('dailyReportScreen') with showScreen('workerDailyReportScreen')
html = html.replace(/showScreen\('dailyReportScreen'\)/g, "showScreen('workerDailyReportScreen')");

const reportScreen = `
<!-- ═══════════════════════════════════════
     WORKER DAILY REPORT SCREEN
═══════════════════════════════════════ -->
<div class="screen" id="workerDailyReportScreen">
  <div class="inner-topbar" style="background:var(--primary); color:white; border-bottom:none;">
    <button class="btn-back" onclick="goBack()" style="color:white;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></button>
    <h2 style="font-size:16px; font-weight:700;">Daily Report</h2>
    <div style="width:36px"></div>
  </div>
  
  <div class="hero-card" style="background:var(--primary); color:white; padding:0 20px 24px; border-radius:0 0 24px 24px;">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
      <h1 class="hero-title" style="margin:0; font-size:24px;">12 Jun 2025</h1>
      <span style="background:rgba(255,255,255,0.2); padding:4px 12px; border-radius:16px; font-size:12px; font-weight:600;">Wednesday</span>
    </div>
    <div class="hero-progress">
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <span style="font-size:13px; font-weight:700; color:#FBBF24;">Daily Progress: 85%</span>
      </div>
      <div class="progress-track" style="background:rgba(255,255,255,0.2);"><div class="progress-fill" style="width:85%; background:#FBBF24;"></div></div>
    </div>
  </div>

  <div class="screen-body pad" style="padding-top:16px;">
    <!-- Attendance Summary -->
    <div class="summary-card">
      <h4 style="font-size:13px; font-weight:700; margin-bottom:12px;">👥 Attendance Summary & Labour Count</h4>
      <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
        <div style="text-align:center; flex:1; border-right:1px solid var(--border-light);">
          <p style="font-size:11px; color:var(--text-tertiary);">Total Present</p>
          <p style="font-size:18px; font-weight:800; color:var(--primary);">24</p>
        </div>
        <div style="text-align:center; flex:1; border-right:1px solid var(--border-light);">
          <p style="font-size:11px; color:var(--text-tertiary);">Male / Female</p>
          <p style="font-size:14px; font-weight:700;">15 / 9</p>
        </div>
        <div style="text-align:center; flex:1;">
          <p style="font-size:11px; color:var(--text-tertiary);">Engineer</p>
          <p style="font-size:12px; font-weight:700; color:var(--success);">Present</p>
        </div>
      </div>
    </div>

    <!-- Task Summary -->
    <div class="summary-card">
      <h4 style="font-size:13px; font-weight:700; margin-bottom:12px;">📋 Daily Tasks</h4>
      <div style="display:flex; flex-direction:column; gap:8px;">
        <!-- Pending / In Progress -->
        <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-input); padding:8px 12px; border-radius:8px;">
          <p style="font-size:13px; font-weight:600;">Plastering Work (Pending)</p>
          <span style="font-size:10px; background:var(--info-surface); color:var(--info); padding:4px 8px; border-radius:12px; font-weight:700;">In Progress</span>
        </div>
        <!-- Completed -->
        <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-input); padding:8px 12px; border-radius:8px;">
          <p style="font-size:13px; font-weight:600; text-decoration:line-through; opacity:0.6;">Foundation Trench (Completed)</p>
          <span style="font-size:10px; background:var(--success-surface); color:var(--success); padding:4px 8px; border-radius:12px; font-weight:700;">Completed</span>
        </div>
      </div>
    </div>

    <!-- Material Usage -->
    <div class="summary-card">
      <h4 style="font-size:13px; font-weight:700; margin-bottom:12px;">🧱 Material Usage</h4>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
        <div style="border:1px solid var(--border-light); padding:10px; border-radius:8px;">
          <p style="font-size:11px; color:var(--text-tertiary);">Cement</p>
          <p style="font-size:14px; font-weight:700; color:var(--text-primary);">40 Bags</p>
        </div>
        <div style="border:1px solid var(--border-light); padding:10px; border-radius:8px;">
          <p style="font-size:11px; color:var(--text-tertiary);">Sand</p>
          <p style="font-size:14px; font-weight:700; color:var(--text-primary);">2 Units</p>
        </div>
      </div>
    </div>

    <!-- Expenses -->
    <div class="summary-card">
      <h4 style="font-size:13px; font-weight:700; margin-bottom:12px;">💰 Daily Expenses</h4>
      <div class="expense-item" style="border:1px solid var(--border-light); padding:10px; border-radius:8px; margin-bottom:0;">
        <div class="exp-icon" style="background:var(--info-surface)"><svg viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2" width="18" height="18"><path d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="10" cy="7" r="4"/></svg></div>
        <div class="exp-info"><p class="exp-title">Labour Wages</p><p class="exp-meta">Full day × 12, Half day × 3</p></div>
        <span class="exp-amount" style="color:var(--primary)">₹10,800</span>
      </div>
    </div>

    <!-- Photos -->
    <div class="summary-card">
      <h4 style="font-size:13px; font-weight:700; margin-bottom:12px;">📸 Site Photos</h4>
      <div style="display:flex; gap:8px; overflow-x:auto;">
        <div style="width:100px;height:80px;background:var(--bg-input);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--text-tertiary)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="24" height="24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>
        <div style="width:100px;height:80px;background:var(--bg-input);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--text-tertiary)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="24" height="24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r=\"1.5\"/><polyline points="21 15 16 10 5 21"/></svg></div>
      </div>
    </div>
  </div>
</div>
`;

if (!html.includes('id="workerDailyReportScreen"')) {
  html = html.replace('</div><!-- end app-shell -->', reportScreen + '\n</div><!-- end app-shell -->');
  fs.writeFileSync('d:/construction 2/index.html', html, 'utf8');
  console.log('Appended successfully');
} else {
  console.log('Already exists');
}
