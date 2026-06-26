/* ═══════════════════════════════════════
   AATZY BUILD — UI CONTROLLER
   Frontend-only, dummy data
═══════════════════════════════════════ */

// ─── STATE ─── //
let currentRole = null; // 'company' | 'worker' | 'client'
let screenHistory = ['roleScreen'];
let currentStep = 1;
const totalSteps = 5;
let currentDate = new Date();
let attendanceSubmitted = false;

// ─── INITIALIZATION ─── //
document.addEventListener('DOMContentLoaded', () => {
  showScreen('roleScreen');
  setupOTPInputs();
  updateAttendanceTime();
  setInterval(updateAttendanceTime, 1000);
  initAttendanceCalendar();
});

// ─── SCREEN NAVIGATION ─── //
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
  });

  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
  }

  if (screenHistory[screenHistory.length - 1] !== screenId) {
    screenHistory.push(screenId);
  }

  updateBottomNav(screenId);
}

function openVendorList(category) {
  const titleEl = document.getElementById('vlTitle');
  if (titleEl) titleEl.innerText = category + ' Vendors';
  showScreen('vendorListScreen');
}

function goBack() {
  if (screenHistory.length > 1) {
    screenHistory.pop();
    const prev = screenHistory[screenHistory.length - 1];
    showScreen(prev);
  }
}

// ─── BOTTOM NAV ─── //
const companyMainScreens  = ['projectsScreen', 'dashboardScreen', 'materialsLandingScreen', 'workersScreen', 'profileScreen'];
const workerMainScreens   = ['workerAttendanceScreen', 'workerTasksScreen', 'workerDashScreen', 'workerProfileScreen', 'workerReportHubScreen', 'workerProjDashScreen', 'workerMarkAttScreen', 'workerDailyReportScreen', 'workerReportFormScreen', 'workerProjectTasksListScreen'];
const clientMainScreens   = ['clientOverviewScreen', 'clientProfileScreen', 'clientDateReportScreen', 'clientChatScreen'];

function updateBottomNav(screenId) {
  const companyNav = document.getElementById('companyNav');
  const workerNav  = document.getElementById('workerNav');
  const clientNav  = document.getElementById('clientNav');

  if (companyNav) companyNav.classList.add('hidden');
  if (workerNav) workerNav.classList.add('hidden');
  if (clientNav) clientNav.classList.add('hidden');

  if (!currentRole) return;

  if (currentRole === 'company') {
    const showOn = [...companyMainScreens, 'projectOverviewScreen', 'notificationsScreen'];
    if (showOn.includes(screenId) && companyNav) companyNav.classList.remove('hidden');
  } else if (currentRole === 'worker') {
    const showOn = [...workerMainScreens, 'workerLeaveHubScreen', 'workerLeaveFormScreen', 'notificationsScreen', 'stockHubScreen'];
    if (showOn.includes(screenId) && workerNav) workerNav.classList.remove('hidden');
  } else if (currentRole === 'client') {
    if (clientMainScreens.includes(screenId) && clientNav) clientNav.classList.remove('hidden');
  }
}

function switchBottomNav(btn, screenId, navId) {
  const nav = document.getElementById(navId);
  if (nav) nav.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (btn) btn.classList.add('active');
  screenHistory = [screenId];
  showScreen(screenId);
}

// ─── LOGIN / ROLE ─── //
function loginAs(role) {
  currentRole = role;
  if (role === 'company') {
    screenHistory = ['projectsScreen'];
    showScreen('projectsScreen');
    const nav = document.getElementById('companyNav');
    if (nav) nav.querySelectorAll('.nav-item').forEach((n, i) => n.classList.toggle('active', i === 0));
  } else if (role === 'worker') {
    screenHistory = ['workerDashScreen'];
    showScreen('workerDashScreen');
    const nav = document.getElementById('workerNav');
    if (nav) nav.querySelectorAll('.nav-item').forEach((n, i) => n.classList.toggle('active', i === 0));
  } else if (role === 'client') {
    screenHistory = ['clientOverviewScreen'];
    showScreen('clientOverviewScreen');
    const nav = document.getElementById('clientNav');
    if (nav) nav.querySelectorAll('.nav-item').forEach((n, i) => n.classList.toggle('active', i === 0));
    initClientDate();
  }
}

function logout() {
  currentRole = null;
  attendanceSubmitted = false;
  screenHistory = ['roleScreen'];
  showScreen('roleScreen');
  document.querySelectorAll('.bottom-nav').forEach(n => n.classList.add('hidden'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.bottom-nav').forEach(nav => {
    const first = nav.querySelector('.nav-item');
    if (first) first.classList.add('active');
  });
  showToast('Logged out successfully');
}

// ─── TABS ─── //
function switchTab(btn, paneId, barId) {
  const bar = btn.closest('.tab-bar') || document.getElementById(barId);
  if (!bar) return;
  bar.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  const screen = bar.closest('.screen');
  if (!screen) return;
  screen.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  const pane = document.getElementById(paneId);
  if (pane) pane.classList.add('active');
}

// ─── FILTER CHIPS ─── //
function filterChip(btn) {
  const row = btn.closest('.chip-row');
  if (!row) return;
  row.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
}

// ─── CREATE PROJECT WIZARD ─── //
function nextStep() {
  if (currentStep === totalSteps) {
    showToast('Project created successfully! 🎉');
    goBack();
    resetWizard();
    return;
  }
  setStep(currentStep + 1);
}

function prevStep() {
  if (currentStep > 1) setStep(currentStep - 1);
}

function setStep(step) {
  currentStep = step;
  document.querySelectorAll('.step-pane').forEach(p => p.classList.remove('active'));
  const pane = document.getElementById('step-' + step);
  if (pane) pane.classList.add('active');
  
  const nextBtn = document.getElementById('cpNextBtn');
  if (nextBtn) nextBtn.textContent = step === totalSteps ? 'Save Project' : 'Next';

  const prevBtn = document.getElementById('cpPrevBtn');
  if (prevBtn) prevBtn.style.display = step > 1 ? 'block' : 'none';

  const stepText = document.getElementById('cpStepText');
  if (stepText) stepText.textContent = `Step ${step} of ${totalSteps}`;

  const progressBar = document.getElementById('cpProgressBar');
  if (progressBar) {
    progressBar.style.width = `${(step / totalSteps) * 100}%`;
  }
}

function resetWizard() {
  currentStep = 1;
  setStep(1);
}

function addStage() {
  const area = document.getElementById('stagesArea');
  if (!area) return;
  const row = document.createElement('div');
  row.className = 'field-row';
  row.style.marginBottom = '10px';
  row.innerHTML = `<input class="field-input" type="text" placeholder="Stage Name" style="flex:1.5"><input class="field-input" type="number" placeholder="₹ Amount" style="flex:1">`;
  area.appendChild(row);
}

// ─── BOTTOM SHEETS ─── //
function openSheet(sheetId) {
  const sheet = document.getElementById(sheetId);
  const overlay = document.getElementById(sheetId + 'Overlay');
  if (sheet) sheet.classList.add('active');
  if (overlay) overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSheet(sheetId) {
  const sheet = document.getElementById(sheetId);
  const overlay = document.getElementById(sheetId + 'Overlay');
  if (sheet) sheet.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// ─── TOAST ─── //
function showToast(msg) {
  const toast = document.getElementById('toastEl');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ─── OTP INPUT AUTO-FOCUS ─── //
function setupOTPInputs() {
  document.querySelectorAll('.otp-inputs').forEach(container => {
    const inputs = container.querySelectorAll('.otp-input');
    inputs.forEach((inp, idx) => {
      inp.addEventListener('input', (e) => {
        if (e.target.value && idx < inputs.length - 1) inputs[idx + 1].focus();
      });
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.value && idx > 0) inputs[idx - 1].focus();
      });
    });
  });
}

// ─── WORKER TASK CHECK ─── //
function toggleTaskCheck(btn) {
  btn.classList.toggle('done');
  const info = btn.nextElementSibling;
  if (info) {
    const name = info.querySelector('.wtask-name');
    if (btn.classList.contains('done')) {
      if (name) { name.style.textDecoration = 'line-through'; name.style.opacity = '0.5'; }
      showToast('Task marked as done! ✅');
    } else {
      if (name) { name.style.textDecoration = ''; name.style.opacity = ''; }
    }
  }
}

// ─── DATE NAVIGATION ─── //
function changeDate(offset) {
  currentDate.setDate(currentDate.getDate() + offset);
  const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
  const today = new Date();
  const isToday = currentDate.toDateString() === today.toDateString();
  const formatted = currentDate.toLocaleDateString('en-IN', options);
  const display = isToday ? `Today, ${formatted}` : formatted;
  document.querySelectorAll('.date-nav-text').forEach(el => { el.textContent = display; });
}

// ─── ATTENDANCE TIME ─── //
function updateAttendanceTime() {
  const timeEl = document.getElementById('attTimeText');
  const dateEl = document.getElementById('attDateText');
  if (timeEl) {
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();
  }
  if (dateEl) {
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }
}

// ─── ATTENDANCE SUBMIT ─── //
function submitAttendance() {
  const countInput = document.getElementById('attWorkerCount');
  const wageInput  = document.getElementById('attWage');
  const teaInput   = document.getElementById('attTea');
  const count = countInput ? (countInput.value || 0) : 0;
  const wage  = wageInput  ? (wageInput.value || 0)  : 0;
  const tea   = teaInput   ? (teaInput.value || 0)   : 0;

  if (!count || count < 1) { showToast('⚠ Please enter worker count'); return; }

  // Update submit button state
  const submitBtn = document.getElementById('attSubmitBtn');
  if (submitBtn) {
    submitBtn.textContent = '✅ Submitted';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
  }

  // Add to today summary
  const summaryEl = document.getElementById('attTodaySummary');
  if (summaryEl) {
    const totalWage = parseInt(count) * parseInt(wage);
    summaryEl.innerHTML = `
      <div class="att-submitted-card">
        <div class="att-sub-row"><span>Workers Present</span><strong>${count}</strong></div>
        <div class="att-sub-row"><span>Total Wages</span><strong style="color:var(--primary)">₹${parseInt(totalWage).toLocaleString('en-IN')}</strong></div>
        <div class="att-sub-row"><span>Tea &amp; Snacks</span><strong>₹${parseInt(tea).toLocaleString('en-IN')}</strong></div>
        <div class="att-sub-row"><span>Total Expense</span><strong style="color:var(--error)">₹${(parseInt(totalWage)+parseInt(tea)).toLocaleString('en-IN')}</strong></div>
      </div>`;
  }

  // Prepend to history
  const historyEl = document.getElementById('attHistoryList');
  if (historyEl) {
    const today = new Date();
    const day   = today.getDate();
    const month = today.toLocaleString('en-IN', { month: 'short' });
    const item  = document.createElement('div');
    item.className = 'att-history-item';
    item.innerHTML = `
      <div class="att-date-badge"><span class="day">${day}</span><span class="month">${month}</span></div>
      <div class="tm-info"><p class="tm-name">${count} Workers Present</p><p class="tm-role">₹${(parseInt(count)*parseInt(wage)).toLocaleString('en-IN')} wages · ₹${parseInt(tea).toLocaleString('en-IN')} snacks</p></div>
      <span class="status-badge approved">Done</span>`;
    historyEl.prepend(item);
  }

  attendanceSubmitted = true;
  showToast('Attendance submitted successfully! ✅');
}

// ─── ATTENDANCE CALENDAR ─── //
function initAttendanceCalendar() {
  const calEl = document.getElementById('attCalendar');
  if (!calEl) return;
  const today = new Date();
  const year  = today.getFullYear();
  const month = today.getMonth();
  const monthLabel = today.toLocaleString('en-IN', { month: 'long', year: 'numeric' });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Present days mock
  const presentDays = [2,3,4,5,6,9,10,11,12,13,14,16,17,18,19,20,23,24,25,26,27];
  const absentDays  = [7,8,15,21,22];

  let html = `<p class="cal-month-label">${monthLabel}</p>`;
  html += `<div class="cal-grid">`;
  ['S','M','T','W','T','F','S'].forEach(d => { html += `<div class="cal-day-header">${d}</div>`; });
  for (let i = 0; i < firstDay; i++) { html += `<div></div>`; }
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday   = d === today.getDate();
    const isPresent = presentDays.includes(d);
    const isAbsent  = absentDays.includes(d);
    const isFuture  = d > today.getDate();
    let cls = 'cal-day';
    if (isToday)   cls += ' today';
    else if (isPresent) cls += ' present';
    else if (isAbsent)  cls += ' absent';
    else if (isFuture)  cls += ' future';
    html += `<div class="${cls}">${d}</div>`;
  }
  html += `</div>`;
  html += `<div class="cal-legend"><span class="cal-dot present"></span>Present <span class="cal-dot absent"></span>Absent <span class="cal-dot today"></span>Today</div>`;
  calEl.innerHTML = html;
}

// ─── SEARCH ─── //
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('projectSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      document.querySelectorAll('#projectsScreen .project-card').forEach(card => {
        const name = card.querySelector('.proj-name')?.textContent?.toLowerCase() || '';
        card.style.display = name.includes(query) ? '' : 'none';
      });
    });
  }
});

// ─── STOCK HUB ─── //
let currentUpdatingCard = null;

document.addEventListener('DOMContentLoaded', () => {
  // Prep dates on open Add Material sheet
  const addStockBtn = document.querySelector('[onclick="openSheet(\'addStockSheet\')"]');
  if(addStockBtn) {
    addStockBtn.addEventListener('click', () => {
      const d = new Date();
      const dateEl = document.getElementById('newMatDate');
      const timeEl = document.getElementById('newMatTime');
      if(dateEl) dateEl.value = d.toISOString().split('T')[0];
      if(timeEl) timeEl.value = d.toTimeString().substring(0, 5);
    });
  }

  // Stock Search Logic
  const stockSearchInput = document.getElementById('stockSearch');
  if (stockSearchInput) {
    stockSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      document.querySelectorAll('#overallStockList .stock-card').forEach(card => {
        const name = card.querySelector('.stk-name')?.textContent?.toLowerCase() || '';
        card.style.display = name.includes(query) ? '' : 'none';
      });
    });
  }

  // Worker Search Logic
  const workerSearchInput = document.getElementById('workerSearch');
  if (workerSearchInput) {
    workerSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      document.querySelectorAll('#workersScreen .worker-list-item').forEach(card => {
        const name = card.querySelector('.tm-name')?.textContent?.toLowerCase() || '';
        card.style.display = name.includes(query) ? 'flex' : 'none';
      });
    });
  }
});

function saveNewMaterial() {
  const name = document.getElementById('newMatName').value;
  const qty = document.getElementById('newMatQty').value;
  const unit = document.getElementById('newMatUnit').value;
  const date = document.getElementById('newMatDate').value;
  const time = document.getElementById('newMatTime').value;

  if (!name || !qty) {
    showToast('⚠ Please enter name and quantity');
    return;
  }

  const list = document.getElementById('overallStockList');
  if (list) {
    const card = document.createElement('div');
    card.className = 'stock-card';
    card.setAttribute('onclick', `openUpdateStockSheet(this, '${name.replace(/'/g, "\\'")}', '${qty}', '${unit}')`);
    
    // Formatting date display
    let dateStr = date;
    try {
      const d = new Date(date);
      dateStr = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    } catch(e){}
    
    let timeStr = time;
    try {
       const [h,m] = time.split(':');
       let hr = parseInt(h);
       const ampm = hr >= 12 ? 'PM' : 'AM';
       hr = hr % 12 || 12;
       timeStr = `${hr}:${m} ${ampm}`;
    } catch(e){}

    card.innerHTML = `<div class="stock-info"><h4 class="stk-name">${name}</h4><p class="stk-meta">Material<br><span style="font-size:10px;color:var(--text-tertiary)">Last update: ${dateStr}, ${timeStr}</span></p></div><div class="stock-qty"><span class="val" style="color:var(--primary)">${qty}</span><span class="unit">${unit}</span><span class="stock-status" style="color:var(--success)">✓ Good</span></div>`;
    list.prepend(card);
  }
  
  // also add to daily added log
  const dailyAddedList = document.getElementById('dailyAddedList');
  if (dailyAddedList) {
      const item = document.createElement('div');
      item.className = 'stock-history-item';
      item.style.cssText = 'display:flex; align-items:center; justify-content:space-between; padding:12px; background:var(--bg-input); border-radius:var(--radius-md); margin-bottom:12px;';
      
      let timeStr = time;
      try {
         const [h,m] = time.split(':');
         let hr = parseInt(h);
         const ampm = hr >= 12 ? 'PM' : 'AM';
         hr = hr % 12 || 12;
         timeStr = `${hr}:${m} ${ampm}`;
      } catch(e){}
      
      item.innerHTML = `
        <div style="display:flex; align-items:center; gap:12px;">
           <div style="width:40px; height:40px; border-radius:50%; background:var(--success-surface); color:var(--success); display:flex; align-items:center; justify-content:center;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><polyline points="20 6 9 17 4 12"/></svg></div>
           <div><p style="font-weight:700; font-size:14px;">${name}</p><p style="font-size:12px; color:var(--text-tertiary);">Added · ${timeStr}</p></div>
        </div>
        <div style="text-align:right;"><p style="font-weight:800; font-size:16px; color:var(--success);">+${qty}</p><p style="font-size:11px; color:var(--text-tertiary);">${unit}</p></div>
      `;
      dailyAddedList.prepend(item);
  }

  closeSheet('addStockSheet');
  document.getElementById('newMatName').value = '';
  document.getElementById('newMatQty').value = '';
  showToast('Material added successfully! ✅');
}

function openUpdateStockSheet(cardEl, name, currentQty, unit) {
  currentUpdatingCard = cardEl;
  document.getElementById('usTitle').textContent = `Update ${name}`;
  document.getElementById('usCurrentQty').textContent = currentQty;
  document.getElementById('usCurrentUnit').textContent = unit;
  document.getElementById('usQuantity').value = '';
  openSheet('updateStockSheet');
}

function applyStockUpdate() {
  if (!currentUpdatingCard) return;
  const qtyInput = document.getElementById('usQuantity').value;
  if (!qtyInput) {
    showToast('⚠ Please enter quantity');
    return;
  }
  const diff = parseFloat(qtyInput);
  const op = document.querySelector('input[name="usOp"]:checked').value;
  
  const qtyEl = currentUpdatingCard.querySelector('.val');
  let currentQty = parseFloat(qtyEl.textContent);
  
  const name = currentUpdatingCard.querySelector('h4').textContent;
  const unit = currentUpdatingCard.querySelector('.unit').textContent;

  if (op === 'add') {
    currentQty += diff;
  } else {
    currentQty -= diff;
    if(currentQty < 0) currentQty = 0;
  }
  
  qtyEl.textContent = currentQty;
  
  // update onclick attr
  currentUpdatingCard.setAttribute('onclick', `openUpdateStockSheet(this, '${name.replace(/'/g, "\\'")}', '${currentQty}', '${unit}')`);
  
  // Update last modified
  const meta = currentUpdatingCard.querySelector('.stk-meta span');
  if(meta) {
    const d = new Date();
    const dateStr = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    let hr = d.getHours();
    const ampm = hr >= 12 ? 'PM' : 'AM';
    hr = hr % 12 || 12;
    const m = d.getMinutes().toString().padStart(2, '0');
    meta.textContent = `Last update: ${dateStr}, ${hr}:${m} ${ampm}`;
  }

  // add to history
  const isAdd = op === 'add';
  const targetList = document.getElementById(isAdd ? 'dailyAddedList' : 'dailyUsedList');
  if (targetList) {
      const item = document.createElement('div');
      item.className = 'stock-history-item';
      item.style.cssText = 'display:flex; align-items:center; justify-content:space-between; padding:12px; background:var(--bg-input); border-radius:var(--radius-md); margin-bottom:12px;';
      
      const d = new Date();
      let hr = d.getHours();
      const ampm = hr >= 12 ? 'PM' : 'AM';
      hr = hr % 12 || 12;
      const m = d.getMinutes().toString().padStart(2, '0');
      const timeStr = `${hr}:${m} ${ampm}`;
      
      const icon = isAdd ? '<polyline points="20 6 9 17 4 12"/>' : '<line x1="5" y1="12" x2="19" y2="12"/>';
      const color = isAdd ? 'var(--success)' : 'var(--error)';
      const bg = isAdd ? 'var(--success-surface)' : 'var(--error-surface)';
      const sign = isAdd ? '+' : '-';
      
      item.innerHTML = `
        <div style="display:flex; align-items:center; gap:12px;">
           <div style="width:40px; height:40px; border-radius:50%; background:${bg}; color:${color}; display:flex; align-items:center; justify-content:center;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">${icon}</svg></div>
           <div><p style="font-weight:700; font-size:14px;">${name}</p><p style="font-size:12px; color:var(--text-tertiary);">${isAdd ? 'Added More' : 'Stock Reduced'} · ${timeStr}</p></div>
        </div>
        <div style="text-align:right;"><p style="font-weight:800; font-size:16px; color:${color};">${sign}${diff}</p><p style="font-size:11px; color:var(--text-tertiary);">${unit}</p></div>
      `;
      targetList.prepend(item);
  }

  closeSheet('updateStockSheet');
  showToast('Stock updated successfully! ✅');
}

// ─── WORKER PORTAL HELPERS ─── //

function submitMarkAttendance() {
  const total = document.getElementById('markAttTotal').value;
  if (!total) {
    showToast('Please enter total workers count');
    return;
  }
  showToast('Attendance Marked & Sent for Verification!');
  goBack();
}

function calcReportExpenses() {
  const mFull = (parseInt(document.getElementById('rptMale').value)||0) * (parseInt(document.getElementById('rptMaleFullWage').value)||0);
  const mHalf = 0; // Keeping simple for demo
  const fFull = (parseInt(document.getElementById('rptFemale').value)||0) * (parseInt(document.getElementById('rptFemaleFullWage').value)||0);
  const fHalf = 0; 
  
  const totalLabour = mFull + mHalf + fFull + fHalf;
  const tea = parseInt(document.getElementById('rptTea').value)||0;
  const other = parseInt(document.getElementById('rptOther').value)||0;
  
  const total = totalLabour + tea + other;
  
  document.getElementById('rptLabourCost').innerText = '₹' + totalLabour.toLocaleString('en-IN');
  document.getElementById('rptTeaCost').innerText = '₹' + tea.toLocaleString('en-IN');
  document.getElementById('rptOtherCost').innerText = '₹' + other.toLocaleString('en-IN');
  document.getElementById('rptTotalCost').innerText = '₹' + total.toLocaleString('en-IN');
}

// Attach listener to calculate inputs
document.querySelectorAll('.rpt-calc').forEach(el => {
  el.addEventListener('input', calcReportExpenses);
});

function submitDailyReport() {
  showToast('Daily Report Submitted & Verified. Signing out...');
  setTimeout(() => {
    logout();
  }, 1500);
}

// ─── CLIENT PORTAL HELPERS ─── //

function initClientDate() {
  const dateEl = document.getElementById('clientDateText');
  if (dateEl) {
    const now = new Date();
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formatted = now.toLocaleDateString('en-IN', options);
    dateEl.textContent = `Today, ${formatted}`;
  }
}

function openClientDateReport(dateValue) {
  if (!dateValue) return;
  const d = new Date(dateValue);
  const titleEl = document.getElementById('clientReportDateTitle');
  const dayEl = document.getElementById('clientReportDayName');
  if (titleEl) {
    titleEl.textContent = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  if (dayEl) {
    dayEl.textContent = d.toLocaleDateString('en-IN', { weekday: 'long' });
  }
  showScreen('clientDateReportScreen');
}

// ─── DAILY REPORT ─── //
function updateReportDate(dateString) {
  if (!dateString) return;
  const d = new Date(dateString);
  const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = d.toLocaleDateString('en-IN', options);
  
  // Keep the time static or current time for simplicity
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();
  
  const displayString = `${formattedDate} · ${timeStr}`;
  
  const dateText = document.getElementById('drDateText');
  if (dateText) {
    dateText.textContent = displayString;
  }
  
  showScreen('workerDailyReportScreen');
}

// ─── DAILY CLOSURE REPORT ─── //
function handleClosureDate(dateString) {
  if (!dateString) return;
  const selectedDate = new Date(dateString);
  const today = new Date();
  
  // Format the selected date for display
  const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
  const formattedDate = selectedDate.toLocaleDateString('en-IN', options);
  
  const reportDateEl = document.getElementById('reportDateTime');
  if (reportDateEl) {
    reportDateEl.textContent = formattedDate;
  }
  
  // Check if selected date is today
  const isToday = selectedDate.getDate() === today.getDate() && 
                  selectedDate.getMonth() === today.getMonth() && 
                  selectedDate.getFullYear() === today.getFullYear();
                  
  const submitBtn = document.getElementById('closureSubmitBtn');
  const submitText = document.getElementById('closureSubmitText');
  
  if (submitBtn && submitText) {
    if (isToday) {
      // Allow submitting today's report
      submitBtn.style.display = 'block';
      submitText.style.display = 'block';
    } else {
      // Past reports are view-only
      submitBtn.style.display = 'none';
      submitText.style.display = 'none';
    }
  }
}

