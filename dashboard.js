// =============================================================================
// CLASS 12 CAREER COUNSELING - MANAGEMENT PRESENTATION DASHBOARD SCRIPT
// =============================================================================

const Dashboard = (() => {
  let sessionData = {};
  let studentsList = [];
  let pollInterval = null;

  function calculateLocalStats(students) {
    const total = students.length;
    const completed = students.filter(s => s.status === 'Completed').length;
    const streamCounts = {};
    const clusterCounts = {};
    const riasecCounts = { Realistic: 0, Investigative: 0, Artistic: 0, Social: 0, Enterprising: 0, Conventional: 0 };
    const courseCounts = {};
    const collegeCounts = {};

    students.forEach(s => {
      const st = s.stream || 'Other';
      streamCounts[st] = (streamCounts[st] || 0) + 1;
      if (s.topCareerCluster) {
        clusterCounts[s.topCareerCluster] = (clusterCounts[s.topCareerCluster] || 0) + 1;
      }
      (s.topTraits || []).forEach(t => {
        if (riasecCounts[t] !== undefined) riasecCounts[t]++;
      });
      (s.shortlistedCourses || []).forEach(c => {
        const name = typeof c === 'string' ? c : (c.course || c.name);
        if (name) courseCounts[name] = (courseCounts[name] || 0) + 1;
      });
      (s.shortlistedColleges || []).forEach(col => {
        const name = typeof col === 'string' ? col : (col.name || col.college);
        if (name) collegeCounts[name] = (collegeCounts[name] || 0) + 1;
      });
    });

    const topCourses = Object.entries(courseCounts).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 10);
    const topColleges = Object.entries(collegeCounts).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 10);

    return {
      totalStudents: total,
      completedCount: completed,
      streamCounts,
      clusterCounts,
      riasecCounts,
      topCourses,
      topColleges
    };
  }

  async function fetchDashboardStats() {
    let loaded = false;
    try {
      const res = await fetch('/api/admin/stats');
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.stats) {
          sessionData = data.session || sessionData;
          renderStatsView(data.stats, sessionData);
          loaded = true;
        }
      }
    } catch (e) {}

    if (!loaded) {
      try {
        const raw = localStorage.getItem('school_students_db');
        const students = raw ? JSON.parse(raw) : [];
        const localStats = calculateLocalStats(students);
        renderStatsView(localStats, sessionData);
      } catch (e) {}
    }
  }

  async function fetchStudentsRoster() {
    let loaded = false;
    try {
      const res = await fetch('/api/admin/students');
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.students && data.students.length > 0) {
          studentsList = data.students;
          renderRosterTable();
          loaded = true;
        }
      }
    } catch (e) {}

    if (!loaded) {
      try {
        const raw = localStorage.getItem('school_students_db');
        if (raw) {
          studentsList = JSON.parse(raw);
          renderRosterTable();
        }
      } catch (e) {}
    }
  }

  function renderStatsView(stats, session) {
    if (!stats) return;

    // School Name & Header
    const schoolNameEl = document.getElementById('dash-school-name');
    const sessionDateEl = document.getElementById('dash-session-date');
    const connectedBadge = document.getElementById('dash-connected-badge');

    if (schoolNameEl && session.schoolName) schoolNameEl.textContent = session.schoolName + " - Career Assessment Dashboard";
    if (sessionDateEl && session.sessionDate) sessionDateEl.textContent = "Date: " + session.sessionDate;
    if (connectedBadge) connectedBadge.textContent = `${stats.totalStudents || 0} Students Assessed`;

    // KPI Cards
    const kpiTotal = document.getElementById('kpi-total-students');
    const kpiCompletedSub = document.getElementById('kpi-completed-sub');
    const kpiTopCluster = document.getElementById('kpi-top-cluster');
    const kpiTopStream = document.getElementById('kpi-top-stream');
    const kpiTotalShortlisted = document.getElementById('kpi-total-shortlisted');

    if (kpiTotal) kpiTotal.textContent = stats.totalStudents || 0;
    if (kpiCompletedSub) kpiCompletedSub.textContent = `${stats.completedCount || 0} completed full assessment`;

    // Top Cluster
    if (kpiTopCluster) {
      const clusters = Object.entries(stats.clusterCounts || {}).sort((a, b) => b[1] - a[1]);
      kpiTopCluster.textContent = clusters.length > 0 ? clusters[0][0] : '--';
    }

    // Top Stream
    if (kpiTopStream) {
      const streams = Object.entries(stats.streamCounts || {}).sort((a, b) => b[1] - a[1]);
      kpiTopStream.textContent = streams.length > 0 ? `${streams[0][0]} (${streams[0][1]})` : '--';
    }

    // Total Shortlisted
    if (kpiTotalShortlisted) {
      let totalShortlisted = 0;
      (stats.topCourses || []).forEach(c => totalShortlisted += c.count);
      kpiTotalShortlisted.textContent = totalShortlisted;
    }

    // 1. Stream Breakdown Cards
    const streamGrid = document.getElementById('stream-distribution-grid');
    const streamCountBadge = document.getElementById('badge-stream-count');
    if (streamGrid && stats.streamCounts) {
      const streamEntries = Object.entries(stats.streamCounts);
      if (streamCountBadge) streamCountBadge.textContent = `${streamEntries.length} Streams`;
      if (streamEntries.length === 0) {
        streamGrid.innerHTML = '<div style="color:var(--text-muted); text-align:center; padding:30px;">Awaiting student logins...</div>';
      } else {
        streamGrid.innerHTML = streamEntries.map(([stream, count]) => `
          <div class="stream-card">
            <div class="stream-card-count">${count}</div>
            <div class="stream-card-label">${stream}</div>
          </div>
        `).join('');
      }
    }

    // 2. RIASEC Personality Bars
    const riasecBars = document.getElementById('riasec-distribution-bars');
    if (riasecBars && stats.riasecCounts) {
      const maxCount = Math.max(...Object.values(stats.riasecCounts), 1);
      const riasecLabels = {
        Realistic: "🔧 Realistic (Practical & Hands-on Engg)",
        Investigative: "🔬 Investigative (Analytical, Research & Science)",
        Artistic: "🎨 Artistic (Creative, Design & Media)",
        Social: "🤝 Social (Helping, Medical, Teaching)",
        Enterprising: "💼 Enterprising (Leadership, Business, Law)",
        Conventional: "📊 Conventional (Organized, Finance & Computing)"
      };

      riasecBars.innerHTML = Object.entries(stats.riasecCounts).map(([trait, count]) => {
        const pct = Math.round((count / maxCount) * 100);
        return `
          <div class="bar-row">
            <div class="bar-label-group">
              <span class="bar-name">${riasecLabels[trait] || trait}</span>
              <span class="bar-count">${count} students</span>
            </div>
            <div class="bar-track">
              <div class="bar-fill" style="width: ${pct}%;"></div>
            </div>
          </div>
        `;
      }).join('');
    }

    // 3. Top 10 Courses Bars
    const topCoursesBars = document.getElementById('top-courses-bars');
    if (topCoursesBars) {
      if (!stats.topCourses || stats.topCourses.length === 0) {
        topCoursesBars.innerHTML = '<div style="color:var(--text-muted); text-align:center; padding:30px;">Students are shortlisting courses...</div>';
      } else {
        const maxCourseCount = Math.max(...stats.topCourses.map(c => c.count), 1);
        topCoursesBars.innerHTML = stats.topCourses.map((c, i) => {
          const pct = Math.round((c.count / maxCourseCount) * 100);
          return `
            <div class="bar-row">
              <div class="bar-label-group">
                <span class="bar-name">#${i + 1} ${c.name}</span>
                <span class="bar-count">${c.count} saves</span>
              </div>
              <div class="bar-track">
                <div class="bar-fill" style="width: ${pct}%; background: linear-gradient(90deg, #f59e0b, #06b6d4);"></div>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // 4. Top Colleges Bars
    const topCollegesBars = document.getElementById('top-colleges-bars');
    if (topCollegesBars) {
      if (!stats.topColleges || stats.topColleges.length === 0) {
        topCollegesBars.innerHTML = '<div style="color:var(--text-muted); text-align:center; padding:30px;">Students are exploring colleges...</div>';
      } else {
        const maxColCount = Math.max(...stats.topColleges.map(c => c.count), 1);
        topCollegesBars.innerHTML = stats.topColleges.map((c, i) => {
          const pct = Math.round((c.count / maxColCount) * 100);
          return `
            <div class="bar-row">
              <div class="bar-label-group">
                <span class="bar-name">🏛️ ${c.name}</span>
                <span class="bar-count">${c.count} students</span>
              </div>
              <div class="bar-track">
                <div class="bar-fill" style="width: ${pct}%; background: linear-gradient(90deg, #8b5cf6, #ec4899);"></div>
              </div>
            </div>
          `;
        }).join('');
      }
    }
  }

  function renderRosterTable() {
    const tbody = document.getElementById('roster-tbody');
    if (!tbody) return;

    const searchTerm = (document.getElementById('roster-search')?.value || '').toLowerCase().trim();
    const filterStream = document.getElementById('roster-filter-stream')?.value || 'all';
    const filterStatus = document.getElementById('roster-filter-status')?.value || 'all';

    const filtered = studentsList.filter(s => {
      const matchSearch = !searchTerm || s.name.toLowerCase().includes(searchTerm) || s.rollNo.toLowerCase().includes(searchTerm);
      const matchStream = filterStream === 'all' || s.stream === filterStream;
      const matchStatus = filterStatus === 'all' || s.status === filterStatus;
      return matchSearch && matchStream && matchStatus;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" style="text-align:center; padding:30px; color:var(--text-muted);">
            No students matching the current filter.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(s => {
      const statusClass = s.status === 'Completed' ? 'completed' : 'inprogress';
      const traitsStr = (s.topTraits || []).slice(0, 2).join(', ') || 'Assessing...';
      const cluster = s.topCareerCluster || '--';
      const shortlistCount = (s.shortlistedCourses || []).length;

      return `
        <tr>
          <td style="font-family:var(--font-mono); font-weight:700; color:var(--accent-cyan);">${s.rollNo}</td>
          <td style="font-weight:700;">${s.name}</td>
          <td>${s.classSection || '12-A'}</td>
          <td><span style="font-size:0.75rem; color:var(--text-secondary);">${s.stream}</span></td>
          <td><span style="font-size:0.75rem; color:#a78bfa;">${traitsStr}</span></td>
          <td><strong style="color:var(--text-primary); font-size:0.75rem;">${cluster}</strong></td>
          <td style="font-family:var(--font-mono); font-weight:700; text-align:center;">${shortlistCount}</td>
          <td>
            <span class="status-badge ${statusClass}">
              ${s.status === 'Completed' ? '✓ Completed' : '⏳ In Progress'}
            </span>
          </td>
          <td>
            <button class="btn-view-report" onclick="Dashboard.openStudentReport('${s.rollNo}')">
              📄 View Report
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  function openStudentReport(rollNo) {
    const student = studentsList.find(s => s.rollNo === rollNo);
    if (!student) return;

    const overlay = document.getElementById('student-modal-overlay');
    const headerEl = document.getElementById('modal-student-header');
    const bodyEl = document.getElementById('modal-student-body');

    headerEl.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px;">
        <span class="status-badge ${student.status === 'Completed' ? 'completed' : 'inprogress'}">
          ${student.status}
        </span>
        <span style="font-family:var(--font-mono); color:var(--accent-cyan); font-weight:700;">Roll No: #${student.rollNo}</span>
      </div>
      <h2 style="font-size:1.3rem; font-weight:800; color:var(--text-primary); margin-top:4px;">
        ${student.name}
      </h2>
      <div style="font-size:0.78rem; color:var(--text-secondary); margin-top:2px;">
        🏫 ${student.schoolName || sessionData.schoolName} | Class ${student.classSection} | Stream: <strong>${student.stream}</strong>
      </div>
    `;

    const coursesHtml = (student.shortlistedCourses || []).map(c => {
      const name = typeof c === 'string' ? c : (c.course || c.name);
      return `<li style="margin-bottom:4px;"><strong>${name}</strong></li>`;
    }).join('') || '<li style="color:var(--text-muted);">No courses shortlisted yet</li>';

    const collegesHtml = (student.shortlistedColleges || []).map(c => {
      const name = typeof c === 'string' ? c : (c.name || c.college);
      const loc = typeof c === 'object' ? `${c.district || c.location || ''} ${c.naac ? `(NAAC ${c.naac})` : ''}` : '';
      return `<li style="margin-bottom:4px;">🏛️ <strong>${name}</strong> <span style="font-size:0.72rem; color:var(--text-muted);">${loc}</span></li>`;
    }).join('') || '<li style="color:var(--text-muted);">No colleges shortlisted yet</li>';

    const skillsHtml = (student.ancillaryCourses || []).map(c => {
      const name = typeof c === 'string' ? c : (c.title || c.name);
      return `<li style="margin-bottom:4px;">🚀 <strong>${name}</strong></li>`;
    }).join('') || '<li style="color:var(--text-muted);">Standard curriculum</li>';

    bodyEl.innerHTML = `
      <div class="printable-card" style="display:flex; flex-direction:column; gap:16px;">
        <!-- Top Traits & Career Cluster -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
          <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-glass); border-radius:12px; padding:14px;">
            <div style="font-size:0.72rem; color:var(--text-muted); text-transform:uppercase; font-weight:700;">Top Matched Career Field</div>
            <div style="font-size:1.05rem; font-weight:800; color:var(--accent-cyan); margin-top:4px;">
              ${student.topCareerCluster || 'General Discovery'}
            </div>
          </div>
          <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-glass); border-radius:12px; padding:14px;">
            <div style="font-size:0.72rem; color:var(--text-muted); text-transform:uppercase; font-weight:700;">RIASEC Personality Profile</div>
            <div style="font-size:0.95rem; font-weight:700; color:#a78bfa; margin-top:4px;">
              ${(student.topTraits || []).join(' • ') || 'Assessment in progress'}
            </div>
          </div>
        </div>

        <!-- Shortlisted Degrees -->
        <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-glass); border-radius:12px; padding:14px;">
          <div style="font-size:0.78rem; font-weight:700; color:var(--text-primary); margin-bottom:8px;">
            🎓 Shortlisted Degree Programmes:
          </div>
          <ul style="padding-left:20px; font-size:0.82rem; color:var(--text-secondary);">
            ${coursesHtml}
          </ul>
        </div>

        <!-- Shortlisted Colleges -->
        <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-glass); border-radius:12px; padding:14px;">
          <div style="font-size:0.78rem; font-weight:700; color:var(--text-primary); margin-bottom:8px;">
            🏛️ Target Colleges & Premier Institutions (TN & All-India):
          </div>
          <ul style="padding-left:20px; font-size:0.82rem; color:var(--text-secondary);">
            ${collegesHtml}
          </ul>
        </div>

        <!-- Recommended Value-Added Certifications & PG -->
        <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-glass); border-radius:12px; padding:14px;">
          <div style="font-size:0.78rem; font-weight:700; color:var(--text-primary); margin-bottom:8px;">
            🚀 Recommended Job-Ready Certifications:
          </div>
          <ul style="padding-left:20px; font-size:0.82rem; color:var(--text-secondary);">
            ${skillsHtml}
          </ul>
        </div>

        <div style="font-size:0.7rem; color:var(--text-muted); border-top:1px solid var(--border-glass); padding-top:10px; text-align:center;">
          Report generated by Class 12 Career Counseling & Simulation System | Verified for Academic & Career Guidance
        </div>
      </div>
    `;

    overlay.classList.add('active');
  }

  function setupEventListeners() {
    // Export CSV
    document.getElementById('btn-export-csv')?.addEventListener('click', () => {
      window.location.href = '/api/admin/export-csv';
    });

    // Refresh button
    document.getElementById('btn-refresh-data')?.addEventListener('click', () => {
      fetchDashboardStats();
      fetchStudentsRoster();
    });

    // Fullscreen / Presentation Mode
    document.getElementById('btn-fullscreen')?.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    });

    // Start New Session
    document.getElementById('btn-new-session')?.addEventListener('click', async () => {
      const schoolName = prompt("Enter School Name for New Session:", "St. Joseph Higher Secondary School");
      if (!schoolName) return;
      try {
        const res = await fetch('/api/admin/clear-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ schoolName })
        });
        const data = await res.json();
        if (data.success) {
          alert("New session started for: " + schoolName);
          fetchDashboardStats();
          fetchStudentsRoster();
        }
      } catch (e) {
        alert("Could not reset session: " + e.message);
      }
    });

    // Search and filter in roster
    document.getElementById('roster-search')?.addEventListener('input', renderRosterTable);
    document.getElementById('roster-filter-stream')?.addEventListener('change', renderRosterTable);
    document.getElementById('roster-filter-status')?.addEventListener('change', renderRosterTable);

    // =========================================================================
    // ENTERPRISE SESSION AUTHENTICATION & SECURE PIN MANAGEMENT
    // =========================================================================

    // SHA-256 Hashing helper
    async function hashPin(pin) {
      const encoder = new TextEncoder();
      const data = encoder.encode(pin + "_agy_career_salt_2026");
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    const authOverlay = document.getElementById('admin-auth-overlay');
    const authForm = document.getElementById('admin-gate-form');
    const authPinInput = document.getElementById('admin-gate-pin');
    const btnAdminLogout = document.getElementById('btn-admin-logout');

    function checkAdminAuth() {
      const isAuth = localStorage.getItem('admin_auth') === 'true';
      const expiry = parseInt(localStorage.getItem('admin_session_expiry') || '0', 10);
      const now = Date.now();

      // Check session validity & timeout (4-hour rolling expiry)
      if (!isAuth || (expiry && expiry < now)) {
        localStorage.removeItem('admin_auth');
        localStorage.removeItem('admin_session_token');
        localStorage.removeItem('admin_session_expiry');
        window.location.href = 'admin.html';
        return;
      }
      if (authOverlay) {
        authOverlay.classList.remove('active');
      }
    }

    if (btnAdminLogout) {
      btnAdminLogout.addEventListener('click', () => {
        localStorage.removeItem('admin_auth');
        localStorage.removeItem('admin_session_token');
        localStorage.removeItem('admin_session_expiry');
        if (localStorage.getItem('user_role') === 'admin') {
          localStorage.removeItem('user_role');
        }
        window.location.href = 'admin.html';
      });
    }

    if (authForm) {
      authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const pin = (authPinInput?.value || '').trim();
        const inputHash = await hashPin(pin);
        const customHash = localStorage.getItem('custom_admin_hash');
        const DEFAULT_HASH_2026 = "b845342a5c957864380ebfe29759c9ba2f997cb25e24345d4c82c68ca1d56417";
        const DEFAULT_HASH_ADMIN = "451ca5f299d9be868d4a9cf41dceb4a622384784409bbbe29c7882260f8db77e";

        const isValid = customHash ? (inputHash === customHash) : (inputHash === DEFAULT_HASH_2026 || inputHash === DEFAULT_HASH_ADMIN || pin === 'admin2026' || pin === 'admin');

        if (isValid) {
          localStorage.setItem('admin_auth', 'true');
          localStorage.setItem('user_role', 'admin');
          const sessionToken = Array.from(crypto.getRandomValues(new Uint8Array(24))).map(b => b.toString(16).padStart(2, '0')).join('');
          localStorage.setItem('admin_session_token', sessionToken);
          localStorage.setItem('admin_session_expiry', String(Date.now() + (4 * 60 * 60 * 1000)));
          if (authOverlay) authOverlay.classList.remove('active');
        } else {
          alert('Invalid Management PIN!');
        }
      });
    }

    // Change Management PIN Dialog & Logic
    const changePinModal = document.getElementById('change-pin-modal');
    const btnChangePin = document.getElementById('btn-change-pin');
    const closePinModalBtn = document.getElementById('close-pin-modal-btn');
    const changePinForm = document.getElementById('change-pin-form');
    const currentPinInput = document.getElementById('current-pin-input');
    const newPinInput = document.getElementById('new-pin-input');
    const confirmPinInput = document.getElementById('confirm-pin-input');
    const pinChangeStatus = document.getElementById('pin-change-status');

    if (btnChangePin && changePinModal) {
      btnChangePin.addEventListener('click', () => {
        changePinModal.classList.add('active');
        if (pinChangeStatus) pinChangeStatus.style.display = 'none';
        if (changePinForm) changePinForm.reset();
        if (currentPinInput) currentPinInput.focus();
      });
    }

    if (closePinModalBtn && changePinModal) {
      closePinModalBtn.addEventListener('click', () => {
        changePinModal.classList.remove('active');
      });
    }

    if (changePinModal) {
      changePinModal.addEventListener('click', (e) => {
        if (e.target === changePinModal) changePinModal.classList.remove('active');
      });
    }

    if (changePinForm) {
      changePinForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const currentPin = (currentPinInput.value || '').trim();
        const newPin = (newPinInput.value || '').trim();
        const confirmPin = (confirmPinInput.value || '').trim();

        if (newPin !== confirmPin) {
          pinChangeStatus.style.display = 'block';
          pinChangeStatus.style.background = 'rgba(244,63,94,0.15)';
          pinChangeStatus.style.color = '#fb7185';
          pinChangeStatus.style.border = '1px solid rgba(244,63,94,0.3)';
          pinChangeStatus.textContent = '❌ New PIN and Confirm PIN do not match!';
          return;
        }

        if (newPin.length < 6) {
          pinChangeStatus.style.display = 'block';
          pinChangeStatus.style.background = 'rgba(244,63,94,0.15)';
          pinChangeStatus.style.color = '#fb7185';
          pinChangeStatus.style.border = '1px solid rgba(244,63,94,0.3)';
          pinChangeStatus.textContent = '❌ New PIN must be at least 6 characters long!';
          return;
        }

        // Verify current PIN
        const currentHash = await hashPin(currentPin);
        const storedHash = localStorage.getItem('custom_admin_hash');
        const DEFAULT_HASH_2026 = "b845342a5c957864380ebfe29759c9ba2f997cb25e24345d4c82c68ca1d56417";
        const DEFAULT_HASH_ADMIN = "451ca5f299d9be868d4a9cf41dceb4a622384784409bbbe29c7882260f8db77e";

        const isCurrentValid = storedHash ? (currentHash === storedHash) : (currentHash === DEFAULT_HASH_2026 || currentHash === DEFAULT_HASH_ADMIN || currentPin === 'admin2026' || currentPin === 'admin');

        if (!isCurrentValid) {
          pinChangeStatus.style.display = 'block';
          pinChangeStatus.style.background = 'rgba(244,63,94,0.15)';
          pinChangeStatus.style.color = '#fb7185';
          pinChangeStatus.style.border = '1px solid rgba(244,63,94,0.3)';
          pinChangeStatus.textContent = '❌ Current PIN is incorrect!';
          return;
        }

        // Save new hashed PIN
        const newHash = await hashPin(newPin);
        localStorage.setItem('custom_admin_hash', newHash);

        pinChangeStatus.style.display = 'block';
        pinChangeStatus.style.background = 'rgba(16,185,129,0.15)';
        pinChangeStatus.style.color = '#34d399';
        pinChangeStatus.style.border = '1px solid rgba(16,185,129,0.3)';
        pinChangeStatus.innerHTML = '✓ <strong>Management PIN updated successfully!</strong> Please remember your new PIN.';

        setTimeout(() => {
          changePinModal.classList.remove('active');
        }, 1500);
      });
    }

    // Close modal on click outside
    const modalOverlay = document.getElementById('student-modal-overlay');
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) modalOverlay.classList.remove('active');
      });
    }
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) modalOverlay.classList.remove('active');
      });
    }

    // =========================================================================
    // SHAREABLE STUDENT JOIN LINK & PROJECTOR QR CODE SYSTEM
    // =========================================================================
    const btnDashShareQr = document.getElementById('btn-dash-share-qr');
    const shareLinkModal = document.getElementById('share-link-modal');
    const shareModalCloseBtn = document.getElementById('share-modal-close-btn');
    const shareQrCanvas = document.getElementById('share-qr-canvas');
    const shareUrlInput = document.getElementById('share-url-input');
    const btnCopyShareUrl = document.getElementById('btn-copy-share-url');
    const btnCopyBroadcastMsg = document.getElementById('btn-copy-broadcast-msg');
    const broadcastMsgText = document.getElementById('broadcast-msg-text');
    const alternateIpsContainer = document.getElementById('alternate-ips-container');
    const alternateIpSelect = document.getElementById('alternate-ip-select');

    async function openShareModal() {
      if (!shareLinkModal) return;
      shareLinkModal.classList.add('active');

      let targetUrl = window.location.origin;
      if (targetUrl.startsWith('file:') || targetUrl.includes('localhost') || targetUrl.includes('127.0.0.1')) {
        try {
          const res = await fetch('/api/network-info');
          if (res.ok) {
            const data = await res.json();
            if (data.success && data.shareableUrl) {
              targetUrl = data.shareableUrl;
              if (data.allLinks && data.allLinks.length > 1 && alternateIpsContainer && alternateIpSelect) {
                alternateIpsContainer.style.display = 'block';
                alternateIpSelect.innerHTML = data.allLinks.map((link, idx) => `
                  <option value="${link}">🌐 Interface ${idx + 1}: ${link}</option>
                `).join('');
                alternateIpSelect.value = targetUrl;
                alternateIpSelect.onchange = (e) => {
                  updateModalUrl(e.target.value);
                };
              }
            }
          }
        } catch (e) {
          targetUrl = window.location.origin.startsWith('http') ? window.location.origin : 'http://localhost:3000';
        }
      }

      updateModalUrl(targetUrl);
    }

    function updateModalUrl(url) {
      if (shareUrlInput) shareUrlInput.value = url;
      if (broadcastMsgText) {
        broadcastMsgText.textContent = `🎓 Class 12 Career Simulation & Aptitude Assessment is LIVE! Join here: ${url}`;
      }
      if (shareQrCanvas && window.QRCodeGenerator && typeof window.QRCodeGenerator.render === 'function') {
        window.QRCodeGenerator.render(url, shareQrCanvas, {
          size: 220,
          margin: 6,
          darkColor: '#090e17',
          lightColor: '#ffffff'
        });
      }
    }

    if (btnDashShareQr) btnDashShareQr.addEventListener('click', openShareModal);
    if (shareModalCloseBtn) shareModalCloseBtn.addEventListener('click', () => shareLinkModal.classList.remove('active'));
    if (shareLinkModal) {
      shareLinkModal.addEventListener('click', (e) => {
        if (e.target === shareLinkModal) shareLinkModal.classList.remove('active');
      });
    }

    if (btnCopyShareUrl) {
      btnCopyShareUrl.addEventListener('click', async () => {
        if (!shareUrlInput) return;
        try {
          await navigator.clipboard.writeText(shareUrlInput.value);
          const orig = btnCopyShareUrl.innerHTML;
          btnCopyShareUrl.innerHTML = '✅ Copied!';
          setTimeout(() => btnCopyShareUrl.innerHTML = orig, 2000);
        } catch (e) {
          shareUrlInput.select();
          document.execCommand('copy');
          alert('Link copied to clipboard!');
        }
      });
    }

    if (btnCopyBroadcastMsg) {
      btnCopyBroadcastMsg.addEventListener('click', async () => {
        if (!broadcastMsgText) return;
        try {
          await navigator.clipboard.writeText(broadcastMsgText.textContent.trim());
          alert('Message copied to clipboard!');
        } catch (e) {
          alert('Text copied!');
        }
      });
    }

    checkAdminAuth();
  }

  function init() {
    setupEventListeners();
    fetchDashboardStats();
    fetchStudentsRoster();
    // Auto-refresh every 5 seconds for live LAN updates
    pollInterval = setInterval(() => {
      fetchDashboardStats();
      fetchStudentsRoster();
    }, 5000);
  }

  return {
    init,
    openStudentReport
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  Dashboard.init();
});
