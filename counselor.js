// ==========================================================================
// CAREER COUNSELOR ENGINE - counselor.js
// Aptitude Test (RIASEC) | Career Comparison | Eligibility Checker
// ==========================================================================

window.CounselorEngine = (function () {

  // =========================================================================
  // RIASEC DATA & QUESTIONS
  // =========================================================================
  const RIASEC_DIMENSIONS = [
    {
      key: 'R', name: 'Realistic', emoji: '🔧',
      color: '#f97316', glow: 'rgba(249,115,22,0.35)',
      border: 'rgba(249,115,22,0.4)',
      bg: 'rgba(249,115,22,0.1)',
      tagline: 'Hands-On Builder',
      desc: 'You love working with tools, machines, and physical objects. You prefer practical, real-world tasks over abstract thinking.',
      careers: ['Mechanical Engineer', 'Civil Engineer', 'Pilot', 'Electrician', 'Architect', 'Biomedical Engineer'],
      clusterMatch: ['engineering-tech', 'defence-aviation', 'vocational-skills']
    },
    {
      key: 'I', name: 'Investigative', emoji: '🔬',
      color: '#06b6d4', glow: 'rgba(6,182,212,0.35)',
      border: 'rgba(6,182,212,0.4)',
      bg: 'rgba(6,182,212,0.1)',
      tagline: 'Analytical Thinker',
      desc: 'You enjoy research, analysis, and solving complex problems. You are naturally curious and driven by data and evidence.',
      careers: ['Data Scientist', 'Research Scientist', 'Doctor', 'Pharmacologist', 'Mathematician', 'AI Engineer'],
      clusterMatch: ['science-research', 'medicine-health', 'computer-digital']
    },
    {
      key: 'A', name: 'Artistic', emoji: '🎨',
      color: '#d946ef', glow: 'rgba(217,70,239,0.35)',
      border: 'rgba(217,70,239,0.4)',
      bg: 'rgba(217,70,239,0.1)',
      tagline: 'Creative Visionary',
      desc: 'You express yourself through creativity, design, and imagination. You thrive in open-ended, expressive environments.',
      careers: ['UI/UX Designer', 'Film Director', 'Architect', 'Journalist', 'Fashion Designer', 'Game Designer'],
      clusterMatch: ['design-media', 'arts-humanities']
    },
    {
      key: 'S', name: 'Social', emoji: '🤝',
      color: '#10b981', glow: 'rgba(16,185,129,0.35)',
      border: 'rgba(16,185,129,0.4)',
      bg: 'rgba(16,185,129,0.1)',
      tagline: 'People Person',
      desc: 'You care deeply about helping others and making a difference in people\'s lives. You excel in interpersonal communication.',
      careers: ['Doctor', 'Nurse', 'Teacher', 'Counselor', 'Social Worker', 'HR Manager', 'NGO Leader'],
      clusterMatch: ['medicine-health', 'education-sports', 'arts-humanities']
    },
    {
      key: 'E', name: 'Enterprising', emoji: '🚀',
      color: '#f59e0b', glow: 'rgba(245,158,11,0.35)',
      border: 'rgba(245,158,11,0.4)',
      bg: 'rgba(245,158,11,0.1)',
      tagline: 'Natural Leader',
      desc: 'You love leading, persuading, and taking charge. You are ambitious, energetic, and driven to achieve goals.',
      careers: ['Entrepreneur', 'Lawyer', 'Investment Banker', 'Marketing Manager', 'Politician', 'CEO'],
      clusterMatch: ['management-business', 'law-policy', 'commerce-finance']
    },
    {
      key: 'C', name: 'Conventional', emoji: '📊',
      color: '#8b5cf6', glow: 'rgba(139,92,246,0.35)',
      border: 'rgba(139,92,246,0.4)',
      bg: 'rgba(139,92,246,0.1)',
      tagline: 'Organized Achiever',
      desc: 'You prefer structured, detail-oriented work. You excel at organizing information, managing systems, and following procedures.',
      careers: ['Chartered Accountant', 'Data Analyst', 'Actuary', 'Company Secretary', 'Operations Manager'],
      clusterMatch: ['commerce-finance', 'management-business', 'computer-digital']
    }
  ];

  const RIASEC_QUESTIONS = {
    R: [
      { q: "I enjoy building or repairing things with my hands — like assembling gadgets, fixing appliances, or constructing models.", options: ["Strongly Dislike", "Dislike", "Neutral", "Like", "Strongly Like"] },
      { q: "I prefer working outdoors or in a workshop environment rather than sitting at a desk all day.", options: ["Strongly Dislike", "Dislike", "Neutral", "Like", "Strongly Like"] },
      { q: "I find satisfaction in operating machinery, vehicles, or technical equipment.", options: ["Strongly Dislike", "Dislike", "Neutral", "Like", "Strongly Like"] },
      { q: "I am good at reading technical diagrams, blueprints, or mechanical drawings.", options: ["Strongly Dislike", "Dislike", "Neutral", "Like", "Strongly Like"] },
      { q: "I would enjoy a career where I can physically build or create tangible products or structures.", options: ["Strongly Dislike", "Dislike", "Neutral", "Like", "Strongly Like"] }
    ],
    I: [
      { q: "I love researching and investigating problems deeply, even when the answer isn't immediately obvious.", options: ["Strongly Dislike", "Dislike", "Neutral", "Like", "Strongly Like"] },
      { q: "I enjoy reading scientific articles, academic papers, or books about how things work.", options: ["Strongly Dislike", "Dislike", "Neutral", "Like", "Strongly Like"] },
      { q: "I am fascinated by mathematics, statistics, or data analysis.", options: ["Strongly Dislike", "Dislike", "Neutral", "Like", "Strongly Like"] },
      { q: "I enjoy experiments, testing hypotheses, and drawing conclusions from observations.", options: ["Strongly Dislike", "Dislike", "Neutral", "Like", "Strongly Like"] },
      { q: "I find complex, analytical tasks more exciting than simple, routine work.", options: ["Strongly Dislike", "Dislike", "Neutral", "Like", "Strongly Like"] }
    ],
    A: [
      { q: "I enjoy expressing myself through art, music, writing, photography, or design.", options: ["Strongly Dislike", "Dislike", "Neutral", "Like", "Strongly Like"] },
      { q: "I prefer environments where I can be creative and original rather than follow strict rules.", options: ["Strongly Dislike", "Dislike", "Neutral", "Like", "Strongly Like"] },
      { q: "I feel most energized when I am creating something new — a story, a design, a film, or a concept.", options: ["Strongly Dislike", "Dislike", "Neutral", "Like", "Strongly Like"] },
      { q: "I enjoy activities like sketching, painting, dancing, acting, writing poetry, or playing an instrument.", options: ["Strongly Dislike", "Dislike", "Neutral", "Like", "Strongly Like"] },
      { q: "I am drawn to careers in design, media, fine arts, or entertainment industries.", options: ["Strongly Dislike", "Dislike", "Neutral", "Like", "Strongly Like"] }
    ],
    S: [
      { q: "I enjoy helping friends, family, or people I don't know — listening to their problems and offering support.", options: ["Strongly Dislike", "Dislike", "Neutral", "Like", "Strongly Like"] },
      { q: "I feel fulfilled when I can contribute to someone's growth, wellbeing, or improvement.", options: ["Strongly Dislike", "Dislike", "Neutral", "Like", "Strongly Like"] },
      { q: "I enjoy teaching, coaching, or training others and sharing my knowledge.", options: ["Strongly Dislike", "Dislike", "Neutral", "Like", "Strongly Like"] },
      { q: "I am good at understanding emotions and making people feel heard and supported.", options: ["Strongly Dislike", "Dislike", "Neutral", "Like", "Strongly Like"] },
      { q: "I would find it deeply meaningful to work in healthcare, education, counseling, or social welfare.", options: ["Strongly Dislike", "Dislike", "Neutral", "Like", "Strongly Like"] }
    ],
    E: [
      { q: "I enjoy taking charge of situations and leading teams toward a goal.", options: ["Strongly Dislike", "Dislike", "Neutral", "Like", "Strongly Like"] },
      { q: "I feel energized when I am negotiating, persuading, or making a pitch to others.", options: ["Strongly Dislike", "Dislike", "Neutral", "Like", "Strongly Like"] },
      { q: "I am ambitious and think about starting my own business or rising to the top of an organization.", options: ["Strongly Dislike", "Dislike", "Neutral", "Like", "Strongly Like"] },
      { q: "I enjoy public speaking, debates, or competitions where I can showcase my ideas.", options: ["Strongly Dislike", "Dislike", "Neutral", "Like", "Strongly Like"] },
      { q: "I prefer high-stakes, fast-paced environments where decisions have real impact.", options: ["Strongly Dislike", "Dislike", "Neutral", "Like", "Strongly Like"] }
    ],
    C: [
      { q: "I enjoy organizing information, keeping records, and creating structured systems.", options: ["Strongly Dislike", "Dislike", "Neutral", "Like", "Strongly Like"] },
      { q: "I prefer a clear set of rules and procedures rather than ambiguous open-ended tasks.", options: ["Strongly Dislike", "Dislike", "Neutral", "Like", "Strongly Like"] },
      { q: "I am meticulous about details and hate when things are inaccurate or out of order.", options: ["Strongly Dislike", "Dislike", "Neutral", "Like", "Strongly Like"] },
      { q: "I enjoy working with spreadsheets, databases, financial records, or structured data.", options: ["Strongly Dislike", "Dislike", "Neutral", "Like", "Strongly Like"] },
      { q: "I would be happy in a career that involves accounting, compliance, data management, or administration.", options: ["Strongly Dislike", "Dislike", "Neutral", "Like", "Strongly Like"] }
    ]
  };

  const STREAMS = [
    { id: 'pcm', name: 'Science (PCM)', emoji: '⚙️', color: '#3b82f6', glow: 'rgba(59,130,246,0.35)', desc: 'Physics, Chemistry, Maths', boostClusters: ['engineering-tech', 'computer-digital', 'science-research', 'defence-aviation'] },
    { id: 'pcb', name: 'Science (PCB)', emoji: '🧬', color: '#f43f5e', glow: 'rgba(244,63,94,0.35)', desc: 'Physics, Chemistry, Biology', boostClusters: ['medicine-health', 'science-research', 'agriculture-environment'] },
    { id: 'commerce', name: 'Commerce', emoji: '💼', color: '#eab308', glow: 'rgba(234,179,8,0.35)', desc: 'Accounts, Business, Eco', boostClusters: ['commerce-finance', 'management-business', 'law-policy'] },
    { id: 'arts', name: 'Arts / Humanities', emoji: '📚', color: '#ec4899', glow: 'rgba(236,72,153,0.35)', desc: 'History, Pol.Sci, Languages', boostClusters: ['arts-humanities', 'law-policy', 'design-media', 'education-sports'] },
    { id: 'vocational', name: 'Vocational', emoji: '🛠️', color: '#64748b', glow: 'rgba(100,116,139,0.35)', desc: 'Skill-based Diploma Streams', boostClusters: ['vocational-skills', 'hospitality-tourism', 'engineering-tech'] }
  ];

  // =========================================================================
  // CAREER SALARY & RADAR DATA (for Comparison Tool)
  // =========================================================================
  const CAREER_SALARY_MAP = {
    // Maps clusterId → salary range and attributes
    'engineering-tech': { start: 6, peak: 35, growth: 88, workLife: 60, creativity: 70, social: 45, stability: 80, demand: 90 },
    'computer-digital': { start: 8, peak: 50, growth: 95, workLife: 55, creativity: 80, social: 40, stability: 75, demand: 98 },
    'science-research': { start: 4, peak: 25, growth: 72, workLife: 70, creativity: 85, social: 50, stability: 72, demand: 70 },
    'medicine-health': { start: 5, peak: 40, growth: 80, workLife: 40, creativity: 55, social: 95, stability: 90, demand: 92 },
    'agriculture-environment': { start: 3, peak: 18, growth: 65, workLife: 75, creativity: 60, social: 65, stability: 65, demand: 60 },
    'commerce-finance': { start: 5, peak: 45, growth: 82, workLife: 55, creativity: 50, social: 55, stability: 85, demand: 85 },
    'management-business': { start: 6, peak: 60, growth: 85, workLife: 50, creativity: 65, social: 70, stability: 78, demand: 88 },
    'arts-humanities': { start: 3, peak: 20, growth: 65, workLife: 80, creativity: 90, social: 80, stability: 60, demand: 62 },
    'law-policy': { start: 4, peak: 55, growth: 75, workLife: 45, creativity: 65, social: 70, stability: 80, demand: 78 },
    'design-media': { start: 4, peak: 30, growth: 88, workLife: 65, creativity: 98, social: 60, stability: 60, demand: 82 },
    'hospitality-tourism': { start: 3, peak: 20, growth: 70, workLife: 55, creativity: 70, social: 88, stability: 68, demand: 72 },
    'education-sports': { start: 3, peak: 15, growth: 58, workLife: 85, creativity: 72, social: 95, stability: 78, demand: 65 },
    'defence-aviation': { start: 7, peak: 30, growth: 65, workLife: 50, creativity: 55, social: 72, stability: 92, demand: 70 },
    'vocational-skills': { start: 3, peak: 18, growth: 72, workLife: 70, creativity: 60, social: 55, stability: 70, demand: 75 }
  };

  // =========================================================================
  // STATE
  // =========================================================================
  let aptState = {
    phase: 'welcome', // welcome | stream | questions | results
    selectedStream: null,
    dimIndex: 0,
    qIndex: 0,
    answers: {}, // key: "R-0", val: score 0-4
    scores: { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }
  };

  let compareState = {
    slots: [null, null, null], // each: course object or null
    pickerSlotIndex: null
  };

  let eligState = {
    results: [],
    filter: 'all'
  };

  // =========================================================================
  // SHARED UTILS
  // =========================================================================
  function showToast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const colors = { info: '#3b82f6', success: '#10b981', warn: '#f59e0b' };
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.borderLeft = `3px solid ${colors[type] || colors.info}`;
    toast.innerHTML = `<div>${msg}</div>`;
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateY(10px)'; setTimeout(() => toast.remove(), 300); }, 2800);
  }

  // =========================================================================
  // TAB ACTIVATION HANDLER
  // =========================================================================
  function onTabActivated(tabId) {
    if (tabId === 'aptitude') renderAptitudeTab();
    else if (tabId === 'roadmap') renderRoadmapTab();
    else if (tabId === 'exams') renderExamsTab();
    else if (tabId === 'predictor') renderPredictorTab();
    else if (tabId === 'counselor-ai') renderAICounselorTab();
    else if (tabId === 'compare') renderCompareTab();
    else if (tabId === 'eligibility') renderEligibilityTab();
    else if (tabId === 'scholarships') renderScholarshipsTab();
    else if (tabId === 'roi') renderRoiTab();
    else if (tabId === 'dossier') renderDossierTab();
  }

  // =========================================================================
  // ═══════════════════════════════════════════════════════════════════════
  //  MODULE 1: APTITUDE TEST (RIASEC)
  // ═══════════════════════════════════════════════════════════════════════
  // =========================================================================

  function renderAptitudeTab() {
    const panel = document.getElementById('tab-aptitude');
    if (!panel) return;
    panel.innerHTML = '';
    const page = document.createElement('div');
    page.className = 'counselor-page';
    panel.appendChild(page);

    if (aptState.phase === 'welcome') renderAptWelcome(page);
    else if (aptState.phase === 'stream') renderStreamSelect(page);
    else if (aptState.phase === 'questions') renderQuestions(page);
    else if (aptState.phase === 'results') renderResults(page);
  }

  function renderAptWelcome(container) {
    const dimOrder = ['R','I','A','S','E','C'];
    const chipsHtml = dimOrder.map(k => {
      const d = RIASEC_DIMENSIONS.find(x => x.key === k);
      return `<span class="riasec-chip" style="background:${d.bg};border-color:${d.border};color:${d.color}">${d.emoji} ${d.name}</span>`;
    }).join('');

    container.innerHTML = `
      <div class="aptitude-welcome">
        <div class="aptitude-hero-icon">
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
        </div>
        <h2>Discover Your Career Personality</h2>
        <p>Take our scientifically grounded RIASEC aptitude assessment — developed by career psychologist John Holland. Answer 30 questions across 6 personality dimensions to discover which careers are naturally aligned with your interests, values, and strengths.</p>
        <div class="riasec-types-preview">${chipsHtml}</div>
        <div class="apt-meta-row">
          <span class="apt-meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            ~8–10 minutes
          </span>
          <span class="apt-meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            30 questions
          </span>
          <span class="apt-meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
            Saved locally
          </span>
        </div>
        <button class="apt-start-btn" id="apt-start-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Start Assessment
        </button>
        ${aptState.scores.R > 0 ? `<button class="retake-btn" id="apt-retake-from-welcome" style="margin-top:0;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          View Previous Results
        </button>` : ''}
      </div>
    `;
    document.getElementById('apt-start-btn').onclick = () => {
      aptState.phase = 'stream';
      renderAptitudeTab();
    };
    const prevBtn = document.getElementById('apt-retake-from-welcome');
    if (prevBtn) prevBtn.onclick = () => { aptState.phase = 'results'; renderAptitudeTab(); };
  }

  function renderStreamSelect(container) {
    const cardsHtml = STREAMS.map(s => `
      <div class="stream-card ${aptState.selectedStream === s.id ? 'selected' : ''}" data-stream="${s.id}"
           style="--stream-color:${s.color}; --stream-glow:${s.glow}">
        <div class="stream-card-icon" style="background: linear-gradient(135deg, ${s.color}, ${s.color}bb);">${s.emoji}</div>
        <div class="stream-card-name">${s.name}</div>
        <div class="stream-card-desc">${s.desc}</div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="wizard-progress" style="max-width:700px;margin:0 auto;width:100%;">
        <div class="wizard-progress-header">
          <span class="wizard-step-label">Step 1 of 7 — Your Stream</span>
          <span>0 / 30 questions</span>
        </div>
        <div class="wizard-progress-track"><div class="wizard-progress-fill" style="width:2%"></div></div>
      </div>
      <div style="width:100%;max-width:700px;text-align:center;margin:0 auto;">
        <h3 style="font-size:1.2rem;font-weight:800;margin-bottom:6px;color:var(--text-primary)">Which stream are you from?</h3>
        <p style="font-size:0.82rem;color:var(--text-secondary);margin-bottom:20px;">This helps us weight your results and show more relevant recommendations.</p>
        <div class="stream-selector">${cardsHtml}</div>
      </div>
      <div class="wizard-nav" style="max-width:700px;width:100%;margin:0 auto;">
        <button class="wizard-back-btn" id="apt-back-to-welcome">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          Back
        </button>
        <button class="wizard-next-btn" id="apt-stream-next" ${!aptState.selectedStream ? 'disabled' : ''}>
          Continue
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      </div>
    `;

    container.querySelectorAll('.stream-card').forEach(card => {
      card.onclick = () => {
        aptState.selectedStream = card.getAttribute('data-stream');
        aptState.answers = {};
        aptState.dimIndex = 0;
        aptState.qIndex = 0;
        container.querySelectorAll('.stream-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        document.getElementById('apt-stream-next').disabled = false;
      };
    });

    document.getElementById('apt-back-to-welcome').onclick = () => { aptState.phase = 'welcome'; renderAptitudeTab(); };
    document.getElementById('apt-stream-next').onclick = () => {
      if (!aptState.selectedStream) return;
      aptState.phase = 'questions';
      aptState.dimIndex = 0;
      aptState.qIndex = 0;
      renderAptitudeTab();
    };
  }

  function renderQuestions(container) {
    const dimKeys = ['R', 'I', 'A', 'S', 'E', 'C'];
    const dim = RIASEC_DIMENSIONS.find(d => d.key === dimKeys[aptState.dimIndex]);
    const questions = RIASEC_QUESTIONS[dim.key];
    const q = questions[aptState.qIndex];
    const answerKey = `${dim.key}-${aptState.qIndex}`;
    const currentAnswer = aptState.answers[answerKey];

    const totalQ = 30;
    const answeredSoFar = aptState.dimIndex * 5 + aptState.qIndex;
    const progressPct = Math.round((answeredSoFar / totalQ) * 100);
    const stepNum = aptState.dimIndex + 2; // steps 2–7

    const optionScoreLabels = ['1', '2', '3', '4', '5'];

    const optionsHtml = q.options.map((opt, i) => `
      <button class="answer-option ${currentAnswer === i ? 'selected' : ''}" data-score="${i}" style="--dim-color:${dim.color}">
        <span class="answer-option-score">${optionScoreLabels[i]}</span>
        ${opt}
      </button>
    `).join('');

    container.innerHTML = `
      <div class="wizard-progress" style="max-width:700px;margin:0 auto;width:100%;">
        <div class="wizard-progress-header">
          <span class="wizard-step-label">Step ${stepNum} of 7 — ${dim.name} (${dim.emoji})</span>
          <span>${answeredSoFar} / ${totalQ} answered</span>
        </div>
        <div class="wizard-progress-track"><div class="wizard-progress-fill" style="width:${Math.max(progressPct,2)}%"></div></div>
      </div>

      <div class="dimension-header" style="background:${dim.bg};border-color:${dim.border};max-width:700px;width:100%;margin:0 auto;">
        <div class="dimension-icon-box" style="background:linear-gradient(135deg,${dim.color},${dim.color}99)">${dim.emoji}</div>
        <div class="dimension-info">
          <h3 style="color:${dim.color}">${dim.name} — "${dim.tagline}"</h3>
          <p>${dim.desc}</p>
        </div>
      </div>

      <div class="question-area" style="max-width:700px;width:100%;margin:0 auto;">
        <div class="question-counter">Question ${aptState.qIndex + 1} of 5</div>
        <div class="question-text">${q.q}</div>
        <div class="answer-options">${optionsHtml}</div>
      </div>

      <div class="wizard-nav" style="max-width:700px;width:100%;margin:0 auto;">
        <button class="wizard-back-btn" id="apt-q-back">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          Back
        </button>
        <button class="wizard-next-btn" id="apt-q-next" ${currentAnswer === undefined ? 'disabled' : ''}>
          ${aptState.dimIndex === 5 && aptState.qIndex === 4 ? 'View My Results 🎯' : 'Next Question'}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      </div>
    `;

    // Answer selection
    container.querySelectorAll('.answer-option').forEach(btn => {
      btn.onclick = () => {
        const score = parseInt(btn.getAttribute('data-score'));
        aptState.answers[answerKey] = score;
        container.querySelectorAll('.answer-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        document.getElementById('apt-q-next').disabled = false;
        // auto-advance after short delay if not last question
        const isLast = aptState.dimIndex === 5 && aptState.qIndex === 4;
        if (!isLast) {
          setTimeout(() => document.getElementById('apt-q-next')?.click(), 450);
        }
      };
    });

    // Back button
    document.getElementById('apt-q-back').onclick = () => {
      if (aptState.qIndex > 0) {
        aptState.qIndex--;
      } else if (aptState.dimIndex > 0) {
        aptState.dimIndex--;
        aptState.qIndex = 4;
      } else {
        aptState.phase = 'stream';
      }
      renderAptitudeTab();
    };

    // Next button
    document.getElementById('apt-q-next').onclick = () => {
      const ans = aptState.answers[answerKey];
      if (ans === undefined) return;

      const isLastQ = aptState.dimIndex === 5 && aptState.qIndex === 4;
      if (isLastQ) {
        computeRiasecScores();
        aptState.phase = 'results';
        renderAptitudeTab();
        return;
      }

      if (aptState.qIndex < 4) {
        aptState.qIndex++;
      } else {
        aptState.dimIndex++;
        aptState.qIndex = 0;
      }
      renderAptitudeTab();
    };
  }

  function computeRiasecScores() {
    const dimKeys = ['R','I','A','S','E','C'];
    dimKeys.forEach(key => {
      let total = 0;
      for (let i = 0; i < 5; i++) {
        total += (aptState.answers[`${key}-${i}`] || 0);
      }
      aptState.scores[key] = total; // max 20
    });

    // Apply stream boost
    if (aptState.selectedStream) {
      const stream = STREAMS.find(s => s.id === aptState.selectedStream);
      if (stream) {
        // Stream boosts are cluster-based, map to RIASEC
        if (stream.id === 'pcm') { aptState.scores.R += 2; aptState.scores.I += 2; aptState.scores.C += 1; }
        else if (stream.id === 'pcb') { aptState.scores.I += 2; aptState.scores.S += 1; }
        else if (stream.id === 'commerce') { aptState.scores.C += 2; aptState.scores.E += 2; }
        else if (stream.id === 'arts') { aptState.scores.A += 2; aptState.scores.S += 1; }
        else if (stream.id === 'vocational') { aptState.scores.R += 2; aptState.scores.C += 1; }
      }
    }
    // Cap at 22
    dimKeys.forEach(k => { aptState.scores[k] = Math.min(aptState.scores[k], 22); });
  }

  function renderResults(container) {
    const dimKeys = ['R','I','A','S','E','C'];
    const maxScore = 22;

    // Sort dims by score descending
    const sorted = dimKeys.map(k => ({
      ...RIASEC_DIMENSIONS.find(d => d.key === k),
      score: aptState.scores[k]
    })).sort((a, b) => b.score - a.score);

    const top3 = sorted.slice(0, 3);
    const code = top3.map(d => d.key).join('');

    // Build bar chart HTML
    const barsHtml = sorted.map(d => {
      const pct = Math.round((d.score / maxScore) * 100);
      return `
        <div class="riasec-bar-row">
          <div class="riasec-bar-label">${d.emoji} ${d.name}</div>
          <div class="riasec-bar-track">
            <div class="riasec-bar-fill" style="width:0%;background:${d.color}" data-pct="${pct}"></div>
          </div>
          <div class="riasec-bar-pct">${pct}%</div>
        </div>
      `;
    }).join('');

    // Build personality cards HTML
    const personalityHtml = top3.map((d, i) => `
      <div class="personality-card" style="border-color:${d.border};background:${d.bg};animation-delay:${i * 0.12}s">
        <div class="personality-card-rank" style="color:${d.color}">#${i + 1}</div>
        <div>
          <h4 style="color:${d.color}">${d.emoji} ${d.name} — "${d.tagline}"</h4>
          <p>${d.desc}</p>
          <div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:5px;">
            ${d.careers.map(c => `<span style="font-size:0.7rem;padding:2px 8px;border-radius:8px;background:rgba(255,255,255,0.07);border:1px solid var(--border-glass);color:var(--text-secondary)">${c}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');

    // STREAM-ALLOWED CLUSTERS MAPPING (Ensures Commerce gets ONLY Commerce/Arts/Mgmt, Arts gets Arts/Law, etc.)
    const STREAM_ALLOWED_CLUSTERS = {
      'Bio-Maths': [
        'medicine-health', 'engineering-tech', 'computer-digital', 'science-research', 
        'agriculture-environment', 'pharmacy-allied', 'commerce-finance', 'management-business', 
        'law-policy', 'design-media', 'arts-humanities', 'defence-aviation', 'hospitality-tourism', 'vocational-skills'
      ],
      'CS-Maths': [
        'engineering-tech', 'computer-digital', 'science-research', 'defence-aviation', 
        'commerce-finance', 'management-business', 'law-policy', 'design-media', 'arts-humanities', 'hospitality-tourism', 'vocational-skills'
      ],
      'Pure Science': [
        'medicine-health', 'pharmacy-allied', 'science-research', 'agriculture-environment', 
        'commerce-finance', 'management-business', 'law-policy', 'design-media', 'arts-humanities', 'hospitality-tourism', 'vocational-skills'
      ],
      'Commerce with Maths': [
        'commerce-finance', 'management-business', 'law-policy', 'design-media', 
        'arts-humanities', 'hospitality-tourism', 'vocational-skills', 'computer-digital'
      ],
      'Commerce without Maths': [
        'commerce-finance', 'management-business', 'law-policy', 'design-media', 
        'arts-humanities', 'hospitality-tourism', 'vocational-skills'
      ],
      'Arts / Humanities': [
        'arts-humanities', 'law-policy', 'design-media', 'hospitality-tourism', 
        'management-business', 'vocational-skills', 'education-sports'
      ]
    };

    let studentStream = '';
    const sessionRaw = localStorage.getItem('student_session');
    if (sessionRaw) {
      try {
        const stu = JSON.parse(sessionRaw);
        studentStream = stu.stream || '';
      } catch (e) {}
    }

    const allowedClusters = STREAM_ALLOWED_CLUSTERS[studentStream] || [];
    const matchedClusterIds = [...new Set(top3.flatMap(d => d.clusterMatch || []))];
    let allMatchIds = [...matchedClusterIds];
    if (allowedClusters.length > 0) {
      allMatchIds = allMatchIds.filter(id => allowedClusters.includes(id));
      if (allMatchIds.length === 0) {
        allMatchIds = allowedClusters;
      }
    }

    let recommended = [];
    if (typeof RAW_COURSES !== 'undefined') {
      recommended = RAW_COURSES.filter(c => {
        // 1. Must match allowed RIASEC cluster
        if (!allMatchIds.includes(c.clusterId)) return false;
        // 2. Must be high growth
        if (c.growthIndicator !== 'Very High Growth' && c.growthIndicator !== 'High Growth') return false;
        // 3. MUST BE STRICTLY ELIGIBLE FOR STUDENT'S 12TH STREAM
        if (window.isCourseEligibleForStream && studentStream) {
          return window.isCourseEligibleForStream(c, studentStream);
        }
        return true;
      }).slice(0, 12);

      // Backfill if needed
      if (recommended.length < 4) {
        const backup = RAW_COURSES.filter(c => {
          if (recommended.some(r => r.id === c.id)) return false;
          if (allowedClusters.length > 0 && !allowedClusters.includes(c.clusterId)) return false;
          if (window.isCourseEligibleForStream && studentStream) {
            return window.isCourseEligibleForStream(c, studentStream);
          }
          return true;
        }).slice(0, 8);
        recommended.push(...backup);
      }
    }

    const recHtml = recommended.map((c, i) => {
      const matchScore = (matchedClusterIds.includes(c.clusterId) || i < 3) ? '⭐ Best Match' : '✅ Good Match';
      let recruiterPreview = '';
      if (typeof window.getInternshipsAndRecruitersForCourse === 'function') {
        const intData = window.getInternshipsAndRecruitersForCourse(c);
        if (intData && intData.topRecruiters) {
          recruiterPreview = `
            <div style="font-size:0.67rem; color:#38bdf8; font-weight:700; margin-top:4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
              🏢 ${intData.topRecruiters.slice(0, 3).join(', ')} · 💰 ${intData.stipendRange.split('–')[0].trim()}
            </div>
          `;
        }
      }

      return `
        <div class="recommended-course-card" data-course-id="${c.id}" style="animation-delay:${i * 0.06}s">
          <div class="rec-match-badge">${matchScore}</div>
          <div class="rec-course-name">${c.course}</div>
          <div class="rec-course-domain">${c.domain} · ${c.cluster}</div>
          <div class="rec-course-why">
            <span style="font-size:0.7rem;padding:2px 7px;border-radius:7px;background:rgba(255,255,255,0.06);border:1px solid var(--border-glass);margin-right:5px">${c.awardType}</span>
            <span style="color:var(--text-muted)">${c.duration} · ${c.entranceTests.split(';')[0].trim()}</span>
          </div>
          ${recruiterPreview}
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="results-hero">
        <div class="results-title">Your RIASEC Code: ${code}</div>
        <div class="results-subtitle">Based on your answers and <strong>${studentStream || '12th Stream'}</strong>, here are your top career dimensions and matched programmes.</div>
        <button class="retake-btn" id="apt-retake-btn" style="margin:0 auto;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          Retake Assessment
        </button>
      </div>

      <div class="riasec-results-grid" style="max-width:900px;width:100%;margin:0 auto;">
        <div class="riasec-radar-box">
          <div style="font-size:0.85rem;font-weight:700;color:var(--text-secondary);align-self:flex-start;text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px;">Score Breakdown</div>
          <canvas id="riasec-radar-canvas" width="260" height="200" style="max-width:100%;"></canvas>
          <div class="riasec-bars" style="width:100%">${barsHtml}</div>
        </div>
        <div class="personality-cards">${personalityHtml}</div>
      </div>

      <div class="recommended-courses-section" style="max-width:900px;width:100%;margin:0 auto;">
        <div class="section-header-row">
          <div class="section-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            Recommended Programmes for You (Step 2)
          </div>
          <span style="font-size:0.75rem;color:var(--text-muted)">${recommended.length} matches from 960 courses for ${studentStream || 'All'}</span>
        </div>
        <div class="recommended-grid">${recHtml}</div>
        
        <div style="text-align:center; margin-top:24px; padding:16px; background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.25); border-radius:14px;">
          <div style="font-size:0.85rem; font-weight:700; color:#34d399; margin-bottom:6px;">Next Step in Your Career Pathway:</div>
          <p style="font-size:0.78rem; color:var(--text-secondary); margin-bottom:12px;">Explore Tamil Nadu & India premier colleges (NIRF / NAAC ranked) offering your recommended degrees.</p>
          <div style="display:flex; justify-content:center; gap:10px; flex-wrap:wrap;">
            <button class="btn-primary" id="btn-proceed-to-explore" style="padding:10px 22px; font-weight:700; font-size:0.85rem; background:linear-gradient(135deg, #10b981, #059669); border-color:#34d399; cursor:pointer;">
              🏛️ Step 3: Explore Colleges & Shortlist Courses &rsaquo;
            </button>
            <button class="btn-secondary" id="btn-end-session-results" style="padding:10px 18px; font-weight:700; font-size:0.85rem; background:rgba(244,63,94,0.15); color:#fb7185; border:1px solid rgba(244,63,94,0.35); cursor:pointer;">
              🚪 End Session & Logout
            </button>
          </div>
        </div>
      </div>
    `;

    // Animate bars
    setTimeout(() => {
      container.querySelectorAll('.riasec-bar-fill').forEach(bar => {
        bar.style.width = bar.getAttribute('data-pct') + '%';
      });
      
      const proceedBtn = document.getElementById('btn-proceed-to-explore');
      if (proceedBtn) {
        proceedBtn.addEventListener('click', () => {
          if (typeof window.switchTab === 'function') {
            window.switchTab('explore');
          } else {
            document.getElementById('tab-btn-explore')?.click();
          }
        });
      }

      const endSessionBtn = document.getElementById('btn-end-session-results');
      if (endSessionBtn) {
        endSessionBtn.addEventListener('click', () => {
          if (typeof window.performLogout === 'function') {
            window.performLogout();
          } else {
            const roleLogoutBtn = document.getElementById('btn-role-logout');
            if (roleLogoutBtn) roleLogoutBtn.click();
          }
        });
      }
    }, 200);

    // Draw radar chart
    setTimeout(() => drawRadarChart('riasec-radar-canvas', sorted), 300);

    // Auto-sync assessment results to LAN server AND local storage DB
    if (sessionRaw) {
      try {
        const student = JSON.parse(sessionRaw);
        const topTraits = top3.map(d => d.name.split(' ')[0]);
        const topCareerCluster = top3[0] ? top3[0].name : 'Technology & Science';
        const recCourseNames = recommended.map(c => ({ id: c.id, course: c.course, domain: c.domain, cluster: c.cluster }));

        // 1. Update localStorage school_students_db
        let db = [];
        try {
          db = JSON.parse(localStorage.getItem('school_students_db') || '[]');
        } catch (e) { db = []; }
        let existingIndex = db.findIndex(s => s.rollNo === student.rollNo);
        const updatedRecord = {
          ...student,
          status: 'Completed',
          riasecScores: aptState.scores,
          topTraits: topTraits,
          topCareerCluster: topCareerCluster,
          recommendedCourses: recCourseNames,
          submittedAt: new Date().toISOString()
        };
        if (existingIndex >= 0) {
          db[existingIndex] = { ...db[existingIndex], ...updatedRecord };
        } else {
          db.push(updatedRecord);
        }
        localStorage.setItem('school_students_db', JSON.stringify(db));

        // 2. Sync to LAN server
        fetch('/api/students/submit-assessment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            rollNo: student.rollNo,
            riasecScores: aptState.scores,
            topTraits: topTraits,
            topCareerCluster: topCareerCluster,
            recommendedCourses: recCourseNames
          })
        }).catch(() => {});
      } catch (e) {}
    }

    document.getElementById('apt-retake-btn').onclick = () => {
      aptState = { phase: 'welcome', selectedStream: null, dimIndex: 0, qIndex: 0, answers: {}, scores: { R:0,I:0,A:0,S:0,E:0,C:0 } };
      renderAptitudeTab();
    };

    // Course card click — open explore tab and show course modal
    container.querySelectorAll('.recommended-course-card').forEach(card => {
      card.onclick = () => {
        const id = card.getAttribute('data-course-id');
        if (typeof SimulationEngine !== 'undefined') {
          document.querySelector('[data-tab="explore"]').click();
          setTimeout(() => SimulationEngine.openCourseModalById(id), 400);
        }
      };
    });
  }

  function drawRadarChart(canvasId, dims) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const R = Math.min(cx, cy) - 24;
    const n = dims.length;
    const maxScore = 22;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid rings
    for (let ring = 1; ring <= 4; ring++) {
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
        const r = (R * ring) / 4;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw spokes
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + R * Math.cos(angle), cy + R * Math.sin(angle));
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw data polygon
    ctx.beginPath();
    dims.forEach((d, i) => {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const val = Math.min(d.score / maxScore, 1);
      const x = cx + R * val * Math.cos(angle);
      const y = cy + R * val * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.closePath();
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
    grad.addColorStop(0, 'rgba(139,92,246,0.5)');
    grad.addColorStop(1, 'rgba(59,130,246,0.2)');
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#8b5cf6';
    ctx.shadowBlur = 8;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw dots and labels
    dims.forEach((d, i) => {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const val = Math.min(d.score / maxScore, 1);
      const x = cx + R * val * Math.cos(angle);
      const y = cy + R * val * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = d.color;
      ctx.shadowColor = d.color;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Label
      const lx = cx + (R + 16) * Math.cos(angle);
      const ly = cy + (R + 16) * Math.sin(angle);
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillStyle = d.color;
      ctx.textAlign = lx < cx - 4 ? 'right' : lx > cx + 4 ? 'left' : 'center';
      ctx.fillText(`${d.emoji}${d.key}`, lx, ly + 4);
    });
  }

  // =========================================================================
  // ═══════════════════════════════════════════════════════════════════════
  //  MODULE 2: CAREER COMPARISON TOOL
  // ═══════════════════════════════════════════════════════════════════════
  // =========================================================================

  function renderCompareTab() {
    const panel = document.getElementById('tab-compare');
    if (!panel) return;
    panel.innerHTML = '';
    const page = document.createElement('div');
    page.className = 'counselor-page';
    panel.appendChild(page);
    buildCompareUI(page);
  }

  function buildCompareUI(container) {
    const slotsHtml = compareState.slots.map((course, idx) => {
      if (course) {
        const salData = CAREER_SALARY_MAP[course.clusterId] || { start: 4, peak: 25 };
        return `
          <div class="compare-slot filled" style="border-color:${getCourseColor(course)}">
            <button class="compare-slot-remove" data-slot="${idx}" title="Remove">✕</button>
            <div>
              <div class="compare-slot-domain" style="color:${getCourseColor(course)}">${course.domain}</div>
              <div class="compare-slot-course-name">${course.course}</div>
            </div>
            <div style="margin-top:6px;font-size:0.72rem;color:var(--text-muted);display:flex;flex-direction:column;gap:3px;">
              <span>⏱ ${course.duration}</span>
              <span>💰 ₹${salData.start}–${salData.peak} LPA</span>
              <span>📈 ${course.growthIndicator}</span>
            </div>
          </div>
        `;
      }
      return `
        <div class="compare-slot" data-add-slot="${idx}">
          <div class="compare-slot-add-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          </div>
          <div class="compare-slot-add-text">Add Career ${idx + 1}</div>
        </div>
      `;
    }).join('');

    const hasTwoCareers = compareState.slots.filter(Boolean).length >= 2;
    const colCount = compareState.slots.filter(Boolean).length + 1;

    container.innerHTML = `
      <div class="compare-header-section">
        <div class="page-hero-title">Compare <span>Careers Side-by-Side</span></div>
        <div class="page-hero-subtitle">Select up to 3 careers to compare salary ranges, growth outlook, and key attributes with interactive charts.</div>
      </div>

      <div class="compare-slots" style="max-width:900px;width:100%;margin:0 auto;">${slotsHtml}</div>

      ${hasTwoCareers ? buildCompareCharts() : `
        <div style="text-align:center;padding:40px;color:var(--text-muted);font-size:0.88rem;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="display:block;margin:0 auto 12px;opacity:.4"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>
          Add at least 2 careers to see the comparison charts and analysis.
        </div>
      `}

      ${hasTwoCareers ? buildAttributeTable(colCount) : ''}
    `;

    // Slot click — open picker
    container.querySelectorAll('[data-add-slot]').forEach(slot => {
      slot.onclick = () => { compareState.pickerSlotIndex = parseInt(slot.getAttribute('data-add-slot')); showCareerPicker(container); };
    });

    // Remove slot
    container.querySelectorAll('.compare-slot-remove').forEach(btn => {
      btn.onclick = (e) => { e.stopPropagation(); compareState.slots[parseInt(btn.getAttribute('data-slot'))] = null; renderCompareTab(); };
    });

    // Draw charts
    if (hasTwoCareers) {
      setTimeout(() => {
        drawSalaryBars(container);
        drawRadarCompare(container);
      }, 200);
    }
  }

  function getCourseColor(course) {
    if (!course || !course.clusterId) return '#3b82f6';
    const cluster = (typeof CAREER_CLUSTERS !== 'undefined') ? CAREER_CLUSTERS.find(c => c.id === course.clusterId) : null;
    return cluster ? cluster.color : '#3b82f6';
  }

  function buildCompareCharts() {
    return `
      <div class="compare-charts-section" style="max-width:900px;width:100%;margin:0 auto;">
        <div class="chart-card">
          <div class="chart-card-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>
            Salary Range (₹ LPA)
          </div>
          <div class="salary-bar-group" id="salary-bars-container"></div>
        </div>
        <div class="chart-card">
          <div class="chart-card-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            Career Profile Radar
          </div>
          <div class="chart-canvas-wrapper">
            <canvas id="compare-radar-canvas" width="320" height="220" style="width:100%;height:100%;"></canvas>
          </div>
        </div>
      </div>
    `;
  }

  function drawSalaryBars(container) {
    const salaryContainer = container.querySelector('#salary-bars-container');
    if (!salaryContainer) return;
    const colors = ['#3b82f6', '#10b981', '#f97316'];
    const filled = compareState.slots.filter(Boolean);
    const maxPeak = Math.max(...filled.map(c => (CAREER_SALARY_MAP[c.clusterId] || {peak:25}).peak), 25);

    let html = filled.map((c, i) => {
      const sal = CAREER_SALARY_MAP[c.clusterId] || { start: 4, peak: 25 };
      const shortName = c.course.length > 28 ? c.course.substring(0, 26) + '…' : c.course;
      const startPct = Math.round((sal.start / maxPeak) * 100);
      const peakPct = Math.round((sal.peak / maxPeak) * 100);
      const color = colors[i];
      return `
        <div class="salary-career-row">
          <div class="salary-career-label">
            <span style="color:${color};font-size:0.72rem;">${shortName}</span>
          </div>
          <div class="salary-range-bars">
            <div class="salary-bar-wrapper">
              <div class="salary-bar-type">Starting</div>
              <div class="salary-bar-track"><div class="salary-bar-fill-inner" style="width:0%;background:${color}88;" data-w="${startPct}"></div></div>
              <div class="salary-bar-value">₹${sal.start}L</div>
            </div>
            <div class="salary-bar-wrapper">
              <div class="salary-bar-type">Peak</div>
              <div class="salary-bar-track"><div class="salary-bar-fill-inner" style="width:0%;background:${color};" data-w="${peakPct}"></div></div>
              <div class="salary-bar-value">₹${sal.peak}L</div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    salaryContainer.innerHTML = html;
    setTimeout(() => {
      salaryContainer.querySelectorAll('.salary-bar-fill-inner').forEach(bar => {
        bar.style.width = bar.getAttribute('data-w') + '%';
      });
    }, 100);
  }

  function drawRadarCompare(container) {
    const canvas = document.getElementById('compare-radar-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;
    const R = Math.min(cx, cy) - 28;
    const labels = ['Salary', 'Demand', 'Growth', 'Creativity', 'Social', 'Stability', 'Work-Life'];
    const keys = ['peak', 'demand', 'growth', 'creativity', 'social', 'stability', 'workLife'];
    const n = labels.length;
    const colors = ['rgba(59,130,246,0.7)', 'rgba(16,185,129,0.7)', 'rgba(249,115,22,0.7)'];
    const fillColors = ['rgba(59,130,246,0.15)', 'rgba(16,185,129,0.12)', 'rgba(249,115,22,0.12)'];

    ctx.clearRect(0, 0, W, H);

    // Grid
    for (let ring = 1; ring <= 4; ring++) {
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
        const r = (R * ring) / 4;
        const x = cx + r * Math.cos(angle), y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255,255,255,0.07)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + R * Math.cos(angle), cy + R * Math.sin(angle));
      ctx.strokeStyle = 'rgba(255,255,255,0.07)';
      ctx.stroke();
      const lx = cx + (R + 14) * Math.cos(angle);
      const ly = cy + (R + 14) * Math.sin(angle);
      ctx.font = 'bold 9px Inter, sans-serif';
      ctx.fillStyle = 'rgba(148,163,184,0.9)';
      ctx.textAlign = lx < cx - 4 ? 'right' : lx > cx + 4 ? 'left' : 'center';
      ctx.fillText(labels[i], lx, ly + 3);
    }

    // Data per career
    compareState.slots.filter(Boolean).forEach((course, ci) => {
      const sal = CAREER_SALARY_MAP[course.clusterId] || {};
      const vals = keys.map(k => Math.min((sal[k] || 50) / 100, 1));

      ctx.beginPath();
      vals.forEach((v, i) => {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
        const x = cx + R * v * Math.cos(angle), y = cy + R * v * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle = fillColors[ci];
      ctx.fill();
      ctx.strokeStyle = colors[ci];
      ctx.lineWidth = 2;
      ctx.stroke();

      vals.forEach((v, i) => {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
        ctx.beginPath();
        ctx.arc(cx + R * v * Math.cos(angle), cy + R * v * Math.sin(angle), 3, 0, Math.PI * 2);
        ctx.fillStyle = colors[ci];
        ctx.fill();
      });
    });
  }

  function buildAttributeTable(colCount) {
    const filled = compareState.slots.filter(Boolean);
    const rows = [
      { label: 'Award Type', key: 'awardType' },
      { label: 'Duration', key: 'duration' },
      { label: 'Domain', key: 'domain' },
      { label: 'Entrance Exams', key: 'entranceTests' },
      { label: 'Regulator', key: 'regulator' },
      { label: 'Eligibility', key: 'keySubjects' },
      { label: 'Growth Outlook', key: 'growthIndicator' },
      { label: 'Min. Entry', key: 'minEntry' }
    ];

    const gridCols = `grid-template-columns: 160px ${filled.map(() => '1fr').join(' ')}`;

    const headerHtml = `
      <div class="attr-compare-header" style="${gridCols}">
        <div class="attr-label">Attribute</div>
        ${filled.map((c, i) => `<div class="attr-value" style="color:${getCourseColor(c)};font-weight:700;">${c.course.length > 22 ? c.course.substring(0,20)+'…' : c.course}</div>`).join('')}
      </div>
    `;

    const rowsHtml = rows.map(row => {
      const cells = filled.map(c => {
        let val = c[row.key] || '—';
        if (row.key === 'entranceTests') val = val.split(';')[0].trim();
        const isGrowth = row.key === 'growthIndicator';
        return `<div class="attr-value ${isGrowth && val.includes('High') ? 'highlight' : ''}">${val}</div>`;
      }).join('');
      return `<div class="attr-compare-row" style="${gridCols}"><div class="attr-label">${row.label}</div>${cells}</div>`;
    }).join('');

    return `
      <div class="attr-compare-table" style="max-width:900px;width:100%;margin:0 auto;background:var(--bg-card);border:1px solid var(--border-glass);border-radius:20px;overflow:hidden;backdrop-filter:blur(12px);">
        <div style="padding:16px 20px;border-bottom:1px solid var(--border-glass);">
          <div style="font-size:0.82rem;font-weight:700;color:var(--text-secondary);text-transform:uppercase;letter-spacing:.06em">📋 Attribute Comparison</div>
        </div>
        ${headerHtml}
        ${rowsHtml}
      </div>
    `;
  }

  // Career Picker Modal (inline)
  function showCareerPicker(container) {
    const existing = document.getElementById('career-picker-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'career-picker-overlay';
    overlay.className = 'modal-overlay active';
    overlay.style.zIndex = '500';

    const selectedIds = compareState.slots.filter(Boolean).map(c => c.id);

    overlay.innerHTML = `
      <div class="modal-window" style="max-width:560px;">
        <div class="modal-header">
          <div>
            <h2 class="modal-title">Pick a Career</h2>
            <p style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">Search any of 960 programmes to add to your comparison.</p>
          </div>
          <button class="modal-close-btn" id="picker-close-btn">✕</button>
        </div>
        <div class="modal-body" style="gap:10px;">
          <input class="career-picker-search" id="picker-search" placeholder="Type to search — e.g. B.Tech, MBA, MBBS, Law, Design…" autofocus>
          <div class="career-picker-results" id="picker-results">
            <!-- populated by search -->
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const searchInput = overlay.querySelector('#picker-search');
    const resultsContainer = overlay.querySelector('#picker-results');

    function renderPickerResults(query) {
      if (!query || query.length < 1) { resultsContainer.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-muted);font-size:0.82rem;">Type to search courses…</div>'; return; }
      const q = query.toLowerCase();
      const matches = typeof RAW_COURSES !== 'undefined'
        ? RAW_COURSES.filter(c => !selectedIds.includes(c.id) && (c.course.toLowerCase().includes(q) || c.domain.toLowerCase().includes(q) || c.cluster.toLowerCase().includes(q) || c.entranceTests.toLowerCase().includes(q))).slice(0, 30)
        : [];

      if (!matches.length) { resultsContainer.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-muted);font-size:0.82rem;">No matches found.</div>'; return; }

      resultsContainer.innerHTML = matches.map(c => `
        <div class="picker-result-item" data-course-id="${c.id}">
          <div class="picker-result-name">${c.course}</div>
          <div class="picker-result-meta">${c.domain} · ${c.awardType} · ${c.duration} · ${c.entranceTests.split(';')[0].trim()}</div>
        </div>
      `).join('');

      resultsContainer.querySelectorAll('.picker-result-item').forEach(item => {
        item.onclick = () => {
          const id = item.getAttribute('data-course-id');
          const course = RAW_COURSES.find(c => String(c.id) === String(id));
          if (course) {
            compareState.slots[compareState.pickerSlotIndex] = course;
            overlay.remove();
            renderCompareTab();
          }
        };
      });
    }

    let debounce;
    searchInput.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => renderPickerResults(searchInput.value.trim()), 200);
    });
    renderPickerResults('');

    document.getElementById('picker-close-btn').onclick = () => overlay.remove();
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    searchInput.focus();
  }

  // =========================================================================
  // ═══════════════════════════════════════════════════════════════════════
  //  MODULE 3: ELIGIBILITY CHECKER
  // ═══════════════════════════════════════════════════════════════════════
  // =========================================================================

  function renderEligibilityTab() {
    const panel = document.getElementById('tab-eligibility');
    if (!panel) return;
    panel.innerHTML = '';
    const page = document.createElement('div');
    page.className = 'counselor-page';
    panel.appendChild(page);
    buildEligibilityUI(page);
  }

  function buildEligibilityUI(container) {
    container.innerHTML = `
      <div class="compare-header-section">
        <div class="page-hero-title">Find Your <span>Eligible Courses</span></div>
        <div class="page-hero-subtitle">Enter your Class 12 details and exam scores. Get a ranked list of matched courses with Dream, Reach, and Safe tags.</div>
      </div>

      <div class="eligibility-form-card">
        <div class="elig-form-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          Your Profile
        </div>
        <div class="elig-form-grid">
          <div class="form-group">
            <label class="form-label">Stream</label>
            <select class="form-select" id="elig-stream">
              <option value="all">All Streams</option>
              <option value="pcm">Science (PCM)</option>
              <option value="pcb">Science (PCB)</option>
              <option value="commerce">Commerce</option>
              <option value="arts">Arts / Humanities</option>
              <option value="vocational">Vocational</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Class 12 Percentage</label>
            <div style="display:flex;align-items:center;gap:10px;">
              <input type="range" class="form-slider" id="elig-percent" min="40" max="100" value="75">
              <span class="slider-value-display" id="elig-percent-display">75%</span>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Preferred State</label>
            <select class="form-select" id="elig-state">
              <option value="all">Any State (Pan-India)</option>
              <option value="tn">Tamil Nadu</option>
              <option value="mh">Maharashtra</option>
              <option value="dl">Delhi / NCR</option>
              <option value="ka">Karnataka</option>
              <option value="ts">Telangana / Andhra</option>
              <option value="up">Uttar Pradesh</option>
              <option value="rb">Rajasthan</option>
              <option value="wb">West Bengal</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">College Type Preference</label>
            <select class="form-select" id="elig-college-type">
              <option value="all">Any Type</option>
              <option value="government">Government / Central</option>
              <option value="iit">IIT / NIT / BITS</option>
              <option value="nlu">NLU / NLSIU</option>
              <option value="private">Private University</option>
              <option value="deemed">Deemed University</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Domain / Cluster Interest</label>
            <select class="form-select" id="elig-cluster">
              <option value="all">All Domains</option>
              ${typeof CAREER_CLUSTERS !== 'undefined' ? CAREER_CLUSTERS.map(c => `<option value="${c.id}">${c.name}</option>`).join('') : ''}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Growth Preference</label>
            <select class="form-select" id="elig-growth">
              <option value="all">Any Growth</option>
              <option value="Very High Growth">Very High Growth Only</option>
              <option value="High Growth">High Growth & Above</option>
              <option value="Established">All including Established</option>
            </select>
          </div>
        </div>

        <div style="margin-top:20px;">
          <div class="elig-form-title" style="margin-bottom:12px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            Entrance Exam Scores (Optional)
          </div>
          <div class="exam-scores-grid">
            <div class="exam-score-item"><div class="exam-score-label">JEE Main</div><input type="number" class="exam-score-input" id="score-jee-main" placeholder="0–300" min="0" max="300"></div>
            <div class="exam-score-item"><div class="exam-score-label">JEE Advanced</div><input type="number" class="exam-score-input" id="score-jee-adv" placeholder="0–360" min="0" max="360"></div>
            <div class="exam-score-item"><div class="exam-score-label">NEET-UG</div><input type="number" class="exam-score-input" id="score-neet" placeholder="0–720" min="0" max="720"></div>
            <div class="exam-score-item"><div class="exam-score-label">CUET-UG</div><input type="number" class="exam-score-input" id="score-cuet" placeholder="0–800" min="0" max="800"></div>
            <div class="exam-score-item"><div class="exam-score-label">CLAT</div><input type="number" class="exam-score-input" id="score-clat" placeholder="0–120" min="0" max="120"></div>
            <div class="exam-score-item"><div class="exam-score-label">IPMAT / CAT</div><input type="number" class="exam-score-input" id="score-ipmat" placeholder="0–100" min="0" max="100"></div>
            <div class="exam-score-item"><div class="exam-score-label">NATA</div><input type="number" class="exam-score-input" id="score-nata" placeholder="0–200" min="0" max="200"></div>
            <div class="exam-score-item"><div class="exam-score-label">NID DAT / UCEED</div><input type="number" class="exam-score-input" id="score-design" placeholder="0–100" min="0" max="100"></div>
          </div>
        </div>

        <button class="elig-check-btn" id="elig-check-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          Find My Matching Courses
        </button>
      </div>

      <div class="elig-results-area" id="elig-results-area" style="max-width:900px;width:100%;margin:0 auto;"></div>
    `;

    // Slider sync
    const slider = document.getElementById('elig-percent');
    const display = document.getElementById('elig-percent-display');
    slider.oninput = () => {
      display.textContent = slider.value + '%';
      const pct = ((slider.value - 40) / 60) * 100;
      slider.style.background = `linear-gradient(to right, #3b82f6 ${pct}%, rgba(255,255,255,0.1) ${pct}%)`;
    };
    slider.oninput(); // init

    document.getElementById('elig-check-btn').onclick = () => runEligibilityCheck(container);

    // Re-render results if already computed
    if (eligState.results.length > 0) {
      renderEligibilityResults(document.getElementById('elig-results-area'));
    }
  }

  function runEligibilityCheck(container) {
    if (typeof RAW_COURSES === 'undefined') { showToast('Course data not loaded yet.', 'warn'); return; }

    const stream = document.getElementById('elig-stream').value;
    const pct = parseInt(document.getElementById('elig-percent').value);
    const clusterId = document.getElementById('elig-cluster').value;
    const growthPref = document.getElementById('elig-growth').value;

    const scores = {
      jeeMain: parseInt(document.getElementById('score-jee-main').value) || 0,
      jeeAdv: parseInt(document.getElementById('score-jee-adv').value) || 0,
      neet: parseInt(document.getElementById('score-neet').value) || 0,
      cuet: parseInt(document.getElementById('score-cuet').value) || 0,
      clat: parseInt(document.getElementById('score-clat').value) || 0,
      ipmat: parseInt(document.getElementById('score-ipmat').value) || 0,
      nata: parseInt(document.getElementById('score-nata').value) || 0,
      design: parseInt(document.getElementById('score-design').value) || 0
    };

    // Stream → eligible cluster mapping
    const streamClusterMap = {
      pcm: ['engineering-tech', 'computer-digital', 'science-research', 'defence-aviation', 'agriculture-environment'],
      pcb: ['medicine-health', 'science-research', 'agriculture-environment', 'computer-digital'],
      commerce: ['commerce-finance', 'management-business', 'law-policy', 'arts-humanities'],
      arts: ['arts-humanities', 'law-policy', 'design-media', 'education-sports', 'management-business'],
      vocational: ['vocational-skills', 'hospitality-tourism', 'engineering-tech', 'agriculture-environment'],
      all: null
    };
    const allowedClusters = streamClusterMap[stream] || null;

    // Score thresholds to determine Dream/Reach/Safe
    function getExamScore(entranceTests) {
      const tests = entranceTests.toLowerCase();
      if (tests.includes('jee adv')) return { userScore: scores.jeeAdv, max: 360 };
      if (tests.includes('jee main')) return { userScore: scores.jeeMain, max: 300 };
      if (tests.includes('neet')) return { userScore: scores.neet, max: 720 };
      if (tests.includes('cuet')) return { userScore: scores.cuet, max: 800 };
      if (tests.includes('clat')) return { userScore: scores.clat, max: 120 };
      if (tests.includes('ipmat') || tests.includes('cat')) return { userScore: scores.ipmat, max: 100 };
      if (tests.includes('nata')) return { userScore: scores.nata, max: 200 };
      if (tests.includes('nid') || tests.includes('uceed')) return { userScore: scores.design, max: 100 };
      if (tests.includes('merit') || tests.includes('direct') || tests.includes('no exam')) return { userScore: 100, max: 100 };
      return { userScore: 60, max: 100 }; // default for state/university exams
    }

    function scoreToTag(userScore, max) {
      if (max === 0 || userScore === 0) return 'reach';
      const pctile = userScore / max;
      if (pctile >= 0.82) return 'safe';
      if (pctile >= 0.55) return 'reach';
      return 'dream';
    }

    function calcMatchPct(course) {
      let score = 40;
      // Percent match
      if (pct >= 90) score += 20;
      else if (pct >= 75) score += 14;
      else if (pct >= 60) score += 8;

      // Growth match
      if (course.growthIndicator === 'Very High Growth') score += 15;
      else if (course.growthIndicator === 'High Growth') score += 10;
      else score += 4;

      // Exam score match
      const { userScore, max } = getExamScore(course.entranceTests);
      const examPctile = userScore / max;
      if (examPctile >= 0.75) score += 25;
      else if (examPctile >= 0.5) score += 18;
      else if (examPctile >= 0.3) score += 10;
      else score += 4;

      return Math.min(score, 100);
    }

    let filtered = RAW_COURSES;

    // Filter by stream
    if (allowedClusters) filtered = filtered.filter(c => allowedClusters.includes(c.clusterId));
    // Filter by cluster preference
    if (clusterId !== 'all') filtered = filtered.filter(c => c.clusterId === clusterId);
    // Filter by growth
    if (growthPref === 'Very High Growth') filtered = filtered.filter(c => c.growthIndicator === 'Very High Growth');
    else if (growthPref === 'High Growth') filtered = filtered.filter(c => c.growthIndicator !== 'Established');

    // Score and tag
    const tagged = filtered.map(c => {
      const { userScore, max } = getExamScore(c.entranceTests);
      const tag = scoreToTag(userScore, max);
      const matchPct = calcMatchPct(c);
      return { ...c, tag, matchPct };
    });

    // Sort: safe first (highest match %), then reach, then dream
    tagged.sort((a, b) => {
      const order = { safe: 0, reach: 1, dream: 2 };
      if (order[a.tag] !== order[b.tag]) return order[a.tag] - order[b.tag];
      return b.matchPct - a.matchPct;
    });

    eligState.results = tagged;
    eligState.filter = 'all';

    renderEligibilityResults(document.getElementById('elig-results-area'));
    showToast(`Found ${tagged.length} matching courses!`, 'success');
  }

  function renderEligibilityResults(container) {
    if (!container) return;
    const results = eligState.results;
    if (!results.length) { container.innerHTML = ''; return; }

    const safeCount = results.filter(c => c.tag === 'safe').length;
    const reachCount = results.filter(c => c.tag === 'reach').length;
    const dreamCount = results.filter(c => c.tag === 'dream').length;

    const filtered = eligState.filter === 'all' ? results : results.filter(c => c.tag === eligState.filter);
    const display = filtered.slice(0, 60);

    container.innerHTML = `
      <div class="elig-results-summary">
        <div class="elig-summary-card safe-tag" style="animation-delay:0s">
          <div class="elig-summary-count">${safeCount}</div>
          <div class="elig-summary-label">✅ Safe Choices</div>
        </div>
        <div class="elig-summary-card reach-tag" style="animation-delay:.08s">
          <div class="elig-summary-count">${reachCount}</div>
          <div class="elig-summary-label">🎯 Reach Options</div>
        </div>
        <div class="elig-summary-card dream-tag" style="animation-delay:.16s">
          <div class="elig-summary-count">${dreamCount}</div>
          <div class="elig-summary-label">⭐ Dream Careers</div>
        </div>
      </div>

      <div class="elig-filter-row">
        <span style="font-size:0.76rem;color:var(--text-muted);font-weight:600;margin-right:4px;">Filter:</span>
        ${[['all','All Results'], ['safe','Safe'], ['reach','Reach'], ['dream','Dream']].map(([val, label]) =>
          `<button class="elig-filter-chip ${eligState.filter === val ? 'active' : ''}" data-filter="${val}">${label}</button>`
        ).join('')}
        <span style="font-size:0.72rem;color:var(--text-muted);margin-left:auto;">${display.length} shown</span>
      </div>

      ${display.map((c, i) => {
        const tagClass = c.tag + '-tag';
        const tagLabel = c.tag === 'safe' ? '✅ Safe' : c.tag === 'reach' ? '🎯 Reach' : '⭐ Dream';
        return `
          <div class="elig-result-card" data-course-id="${c.id}" style="animation-delay:${Math.min(i * 0.04, 1.2)}s">
            <div class="elig-result-rank">${i + 1}</div>
            <div class="elig-result-body">
              <div class="elig-result-course-name">${c.course}</div>
              <div class="elig-result-meta">
                <span class="elig-result-tag ${tagClass}">${tagLabel}</span>
                <span>${c.domain}</span>
                <span>·</span>
                <span>${c.awardType}</span>
                <span>·</span>
                <span>${c.duration}</span>
                <span>·</span>
                <span style="color:var(--accent-cyan)">${c.entranceTests.split(';')[0].trim()}</span>
              </div>
            </div>
            <div class="elig-match-score">
              <span class="elig-match-pct">${c.matchPct}%</span>
              <span class="elig-match-label">match</span>
            </div>
          </div>
        `;
      }).join('')}
    `;

    // Filter chips
    container.querySelectorAll('.elig-filter-chip').forEach(chip => {
      chip.onclick = () => {
        eligState.filter = chip.getAttribute('data-filter');
        renderEligibilityResults(container);
      };
    });

    // Course click — open in Explore tab
    container.querySelectorAll('.elig-result-card').forEach(card => {
      card.onclick = () => {
        const id = card.getAttribute('data-course-id');
        if (typeof SimulationEngine !== 'undefined') {
          document.querySelector('[data-tab="explore"]').click();
          setTimeout(() => SimulationEngine.openCourseModalById(id), 400);
        }
      };
    });
  }

  // =========================================================================
  // ═══════════════════════════════════════════════════════════════════════
  //  MODULE 3: CAREER ROADMAP & 5-YEAR PROGRESSION SIMULATOR
  // ═══════════════════════════════════════════════════════════════════════
  // =========================================================================

  let roadmapClusterId = 'engineering-tech';

  function renderRoadmapTab() {
    const panel = document.getElementById('tab-roadmap');
    if (!panel) return;
    panel.innerHTML = '';
    const page = document.createElement('div');
    page.className = 'counselor-page';
    panel.appendChild(page);

    const roadmaps = window.CAREER_ROADMAPS_DATA || {};
    const clusters = window.CAREER_CLUSTERS || [];
    const currentRoadmap = roadmaps[roadmapClusterId] || roadmaps['engineering-tech'];

    // Cluster selector pills
    const pillsHtml = clusters.map(c => `
      <button class="roadmap-cluster-pill ${c.id === roadmapClusterId ? 'active' : ''}" data-cluster="${c.id}">
        <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${c.color}"></span>
        ${c.name.split(',')[0]}
      </button>
    `).join('');

    // Stages timeline HTML
    const stagesHtml = (currentRoadmap.stages || []).map(st => `
      <div class="roadmap-stage-card" style="--stage-color:${currentRoadmap.color};--stage-glow:${currentRoadmap.color}40">
        <div class="roadmap-stage-node">${st.stageNum}</div>
        <div class="roadmap-stage-header">
          <div class="roadmap-stage-title">${st.title}</div>
          <div class="roadmap-stage-phase">${st.phase} · ${st.duration}</div>
        </div>
        <div class="roadmap-stage-focus"><strong>Core Focus:</strong> ${st.focus}</div>
        
        <div class="roadmap-milestones-grid">
          ${st.milestones.map(m => `
            <div class="roadmap-milestone-item">
              <span class="roadmap-milestone-icon">✓</span>
              <span>${m}</span>
            </div>
          `).join('')}
        </div>

        <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-top:14px;padding-top:12px;border-top:1px dashed rgba(255,255,255,0.08);">
          <div class="roadmap-tags-row">
            <span style="color:var(--text-muted);font-weight:600;">Key Skills:</span>
            ${st.keySkills.map(sk => `<span class="roadmap-skill-tag">${sk}</span>`).join('')}
          </div>
          <div class="roadmap-tags-row">
            <span style="color:var(--text-muted);font-weight:600;">Tools:</span>
            ${st.tools.map(tl => `<span class="roadmap-tool-tag">${tl}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');

    // Salary Curve nodes HTML
    const salaryNodesHtml = (currentRoadmap.typicalSalaryCurve || []).map(sc => `
      <div class="salary-curve-node">
        <div class="salary-node-yr">${sc.yr}</div>
        <div class="salary-node-lpa">₹${sc.lpa} LPA</div>
      </div>
    `).join('');

    // Certifications Timeline HTML
    const certsHtml = (currentRoadmap.certificationsTimeline || []).map(ct => `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:rgba(255,255,255,0.02);border:1px solid var(--border-glass);border-radius:10px;">
        <span style="font-family:var(--font-mono);font-size:0.72rem;color:var(--accent-cyan);font-weight:700;">${ct.year}</span>
        <span style="font-size:0.8rem;color:var(--text-primary);font-weight:600;">${ct.cert}</span>
      </div>
    `).join('');

    // Pivot Options HTML
    const pivotsHtml = (currentRoadmap.pivotOptions || []).map(po => `
      <div style="display:flex;align-items:center;gap:8px;font-size:0.78rem;color:var(--text-secondary);padding:6px 10px;background:rgba(255,255,255,0.02);border-radius:8px;">
        <span style="color:var(--accent-purple)">⚡</span> ${po}
      </div>
    `).join('');

    // Matched courses in this cluster from 960 database
    let clusterCourses = [];
    if (typeof RAW_COURSES !== 'undefined') {
      clusterCourses = RAW_COURSES.filter(c => c.clusterId === roadmapClusterId).slice(0, 6);
    }

    const coursesHtml = clusterCourses.map(c => {
      let recruiterPreview = '';
      if (typeof window.getInternshipsAndRecruitersForCourse === 'function') {
        const intData = window.getInternshipsAndRecruitersForCourse(c);
        if (intData && intData.topRecruiters) {
          recruiterPreview = `
            <div style="font-size:0.68rem; color:#38bdf8; font-weight:700; margin-top:4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
              🏢 ${intData.topRecruiters.slice(0, 3).join(', ')} · 💰 ${intData.stipendRange.split('–')[0].trim()}
            </div>
          `;
        }
      }
      return `
        <div class="recommended-course-card" data-course-id="${c.id}">
          <div class="rec-match-badge">⭐ Flagship Track</div>
          <div class="rec-course-name">${c.course}</div>
          <div class="rec-course-domain">${c.domain} · ${c.awardType}</div>
          <div class="rec-course-why">
            <span style="color:var(--accent-emerald)">⏱ ${c.duration}</span> · 
            <span style="color:var(--accent-cyan)">${c.entranceTests.split(';')[0].trim()}</span>
          </div>
          ${recruiterPreview}
        </div>
      `;
    }).join('');

    page.innerHTML = `
      <div class="roadmap-header">
        <div class="page-hero-title">Career Roadmap & <span>5-Year Timeline Simulator</span></div>
        <div class="page-hero-subtitle">Interactive year-by-year progression model from Class 12 preparation to executive leadership & peak earning potential.</div>
      </div>

      <div class="roadmap-cluster-selector">${pillsHtml}</div>

      <div style="width:100%;max-width:920px;margin:0 auto 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
        <div>
          <h2 style="font-size:1.4rem;font-weight:900;color:var(--text-primary);">${currentRoadmap.clusterName}</h2>
          <p style="font-size:0.82rem;color:var(--text-muted);margin-top:2px;">"${currentRoadmap.tagline}"</p>
        </div>
      </div>

      <div class="roadmap-salary-box">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
          <div style="font-size:0.95rem;font-weight:800;color:var(--text-primary);display:flex;align-items:center;gap:8px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            Typical Compensation Escalation Curve (CTC in ₹ LPA)
          </div>
          <span style="font-size:0.72rem;color:var(--text-muted);">Top 25% Performers Baseline</span>
        </div>
        <div class="salary-curve-grid">${salaryNodesHtml}</div>
      </div>

      <div class="roadmap-timeline">${stagesHtml}</div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;width:100%;max-width:920px;margin:0 auto 24px;">
        <div style="background:var(--bg-card);border:1px solid var(--border-glass);border-radius:20px;padding:22px;display:flex;flex-direction:column;gap:10px;">
          <div style="font-size:0.92rem;font-weight:800;color:var(--text-primary);display:flex;align-items:center;gap:8px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
            Recommended Industry Certifications
          </div>
          <div style="display:flex;flex-direction:column;gap:8px;margin-top:6px;">${certsHtml}</div>
        </div>

        <div style="background:var(--bg-card);border:1px solid var(--border-glass);border-radius:20px;padding:22px;display:flex;flex-direction:column;gap:10px;">
          <div style="font-size:0.92rem;font-weight:800;color:var(--text-primary);display:flex;align-items:center;gap:8px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            Strategic Lateral Pivot Options
          </div>
          <div style="display:flex;flex-direction:column;gap:8px;margin-top:6px;">${pivotsHtml}</div>
        </div>
      </div>

      <div class="recommended-courses-section" style="max-width:920px;width:100%;margin:0 auto;">
        <div class="section-header-row">
          <div class="section-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            Target Degree Programmes in ${currentRoadmap.clusterName.split(',')[0]}
          </div>
          <span style="font-size:0.75rem;color:var(--text-muted)">Click any course to inspect</span>
        </div>
        <div class="recommended-grid">${coursesHtml}</div>
      </div>
    `;

    // Cluster selector events
    page.querySelectorAll('.roadmap-cluster-pill').forEach(pill => {
      pill.onclick = () => {
        roadmapClusterId = pill.getAttribute('data-cluster');
        renderRoadmapTab();
      };
    });

    // Course card click event
    page.querySelectorAll('.recommended-course-card').forEach(card => {
      card.onclick = () => {
        const id = card.getAttribute('data-course-id');
        if (typeof SimulationEngine !== 'undefined') {
          document.querySelector('[data-tab="explore"]').click();
          setTimeout(() => SimulationEngine.openCourseModalById(id), 400);
        }
      };
    });
  }

  // =========================================================================
  // ═══════════════════════════════════════════════════════════════════════
  //  MODULE 4: MASTER ENTRANCE EXAM HUB & LIVE COUNTDOWN CALENDAR
  // ═══════════════════════════════════════════════════════════════════════
  // =========================================================================

  let examsState = {
    streamFilter: 'all',
    countdownTimerId: null
  };

  function renderExamsTab() {
    const panel = document.getElementById('tab-exams');
    if (!panel) return;
    panel.innerHTML = '';
    const page = document.createElement('div');
    page.className = 'counselor-page';
    panel.appendChild(page);

    const exams = window.MASTER_ENTRANCE_EXAMS || [];
    const watchedIds = JSON.parse(localStorage.getItem('watched_exams') || '[]');

    if (!examsState.searchQuery) examsState.searchQuery = '';

    const streams = [
      ['all', '🌟 All Exams (30+)'],
      ['govt-12th', '⚡ 12th Pass Direct Govt Jobs'],
      ['govt-civil', '🏛️ UPSC Civil Services (IAS/IPS)'],
      ['govt-ssc', '🏢 SSC Central Ministries (CGL/CHSL)'],
      ['govt-defence', '🛡️ Defence & Armed Forces (NDA/CDS)'],
      ['govt-banking', '🏦 Banking & Finance (SBI/IBPS/RBI)'],
      ['govt-railways', '🚆 Indian Railways (RRB NTPC/ALP)'],
      ['govt-state', '🌴 State PSC & TNPSC (Group 1/2/4 VAO)'],
      ['college-entrance', '🎓 College Entrances (JEE/NEET/CUET)']
    ];

    const filterPillsHtml = streams.map(([val, lbl]) => `
      <button class="elig-filter-chip ${examsState.streamFilter === val ? 'active' : ''}" data-stream-filter="${val}">
        ${lbl}
      </button>
    `).join('');

    let filteredExams = exams;
    if (examsState.streamFilter !== 'all') {
      if (examsState.streamFilter === 'college-entrance') {
        filteredExams = filteredExams.filter(e => e.type === 'college-entrance' || !e.isGovtJob);
      } else if (examsState.streamFilter === 'govt-12th') {
        filteredExams = filteredExams.filter(e => e.stream === 'govt-12th' || (e.minEducation && e.minEducation.includes('12')));
      } else {
        filteredExams = filteredExams.filter(e => e.stream === examsState.streamFilter);
      }
    }

    if (examsState.searchQuery.trim()) {
      const q = examsState.searchQuery.toLowerCase().trim();
      filteredExams = filteredExams.filter(e => 
        e.name.toLowerCase().includes(q) ||
        e.fullName.toLowerCase().includes(q) ||
        e.conductingBody.toLowerCase().includes(q) ||
        e.targetCourses.toLowerCase().includes(q) ||
        (e.streamLabel && e.streamLabel.toLowerCase().includes(q)) ||
        (e.salaryScale && e.salaryScale.toLowerCase().includes(q))
      );
    }

    const cardsHtml = filteredExams.length === 0 ? `
      <div style="grid-column:1/-1; text-align:center; padding:50px 20px; color:var(--text-muted); background:rgba(255,255,255,0.02); border:1px solid var(--border-glass); border-radius:16px;">
        <div style="font-size:2.5rem; margin-bottom:10px;">🔍</div>
        <h3 style="color:var(--text-primary); font-size:1.1rem; margin-bottom:6px;">No Entrance or Job Exams Found</h3>
        <p style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:14px;">Try searching for 'UPSC', 'SSC', 'TNPSC', 'Railways', 'Bank', 'Agniveer', or '12th'.</p>
        <button class="btn-primary" id="btn-reset-exam-filters" style="padding:8px 18px; font-size:0.8rem; cursor:pointer;">Reset Filter & Search</button>
      </div>
    ` : filteredExams.map((ex, i) => {
      const isWatched = watchedIds.includes(ex.id);
      const isGovtJob = ex.isGovtJob || ex.type === 'govt-job';

      const salaryBadge = ex.salaryScale ? `
        <div style="font-size:0.7rem; font-weight:700; color:#34d399; background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); padding:4px 8px; border-radius:6px; margin-top:6px;">
          💰 Salary / Pay: ${ex.salaryScale.split('+')[0].trim()}
        </div>
      ` : '';

      const minEduBadge = ex.minEducation ? `
        <span style="font-size:0.68rem; font-weight:700; padding:2px 7px; border-radius:6px; background:rgba(245,158,11,0.15); color:#fbbf24; border:1px solid rgba(245,158,11,0.35);">
          🎓 ${ex.minEducation}
        </span>
      ` : '';

      return `
        <div class="exam-card" style="--exam-color:${ex.color || '#3b82f6'};--exam-glow:${ex.color || '#3b82f6'}35;animation-delay:${Math.min(i * 0.04, 0.4)}s">
          <div class="exam-card-top">
            <div>
              <div class="exam-name">${ex.name}</div>
              <div class="exam-fullname">${ex.fullName}</div>
            </div>
            <div style="display:flex; flex-direction:column; align-items:flex-end; gap:4px;">
              <span class="exam-stream-tag">${ex.streamLabel ? ex.streamLabel.split('&')[0].trim() : 'National Exam'}</span>
              ${minEduBadge}
            </div>
          </div>

          <!-- Live Countdown Box -->
          <div class="countdown-box" id="countdown-${ex.id}" data-target-date="${ex.approxDate}">
            <div class="countdown-unit"><span class="countdown-val cd-days">--</span><span class="countdown-lbl">Days</span></div>
            <div class="countdown-unit"><span class="countdown-val cd-hours">--</span><span class="countdown-lbl">Hours</span></div>
            <div class="countdown-unit"><span class="countdown-val cd-mins">--</span><span class="countdown-lbl">Mins</span></div>
            <div class="countdown-unit"><span class="countdown-val cd-secs">--</span><span class="countdown-lbl">Secs</span></div>
          </div>

          ${salaryBadge}

          <div class="exam-details-list">
            <div class="exam-detail-row"><span class="exam-detail-label">Conducting Agency:</span><span class="exam-detail-value">${ex.conductingBody}</span></div>
            <div class="exam-detail-row"><span class="exam-detail-label">Exam Mode:</span><span class="exam-detail-value">${ex.mode}</span></div>
            <div class="exam-detail-row"><span class="exam-detail-label">Duration & Marks:</span><span class="exam-detail-value">${ex.duration} (${ex.totalMarks} Marks)</span></div>
            <div class="exam-detail-row"><span class="exam-detail-label">Aspirants:</span><span class="exam-detail-value" style="color:var(--accent-amber)">${ex.aspirants}</span></div>
          </div>

          <div style="font-size:0.72rem;color:var(--text-secondary);background:rgba(255,255,255,0.02);padding:8px 10px;border-radius:10px;border:1px solid rgba(255,255,255,0.05);line-height:1.35;">
            <strong>${isGovtJob ? 'Target Posts / Cadres:' : 'Target Programmes:'}</strong> ${ex.targetCourses}
          </div>

          <div class="exam-card-actions" style="display:flex; gap:6px; flex-wrap:wrap;">
            <button class="btn-exam-action btn-view-syllabus" data-exam-id="${ex.id}" style="background:rgba(56,189,248,0.12); color:#38bdf8; border:1px solid rgba(56,189,248,0.35); padding:6px 10px; font-weight:700;">
              📝 Syllabus & Practice
            </button>
            <a href="${ex.officialUrl}" target="_blank" rel="noopener" class="btn-exam-action btn-exam-primary">
              Official Portal ↗
            </a>
            <button class="btn-exam-action btn-exam-outline btn-watch-exam ${isWatched ? 'active' : ''}" data-exam-id="${ex.id}">
              ${isWatched ? '★ Pinned' : '☆ Watchlist'}
            </button>
          </div>
        </div>
      `;
    }).join('');

    page.innerHTML = `
      <div class="roadmap-header">
        <div class="page-hero-title">Master Entrance & <span>Government Job Exam Hub</span></div>
        <div class="page-hero-subtitle">
          Directory of 30+ premier Central & State Government Job Entrance Exams (UPSC, SSC, Banking, Railways, TNPSC, Defence & Police) alongside National Degree Entrances with real-time countdown clocks.
        </div>
      </div>

      <!-- Search & Filters Container -->
      <div style="max-width:1040px; width:100%; margin:0 auto 16px; background:rgba(255,255,255,0.03); border:1px solid var(--border-glass); border-radius:14px; padding:14px 18px;">
        <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center; justify-content:space-between; margin-bottom:12px;">
          <div style="position:relative; flex:1; min-width:240px;">
            <input type="text" id="exam-search-input" placeholder="🔍 Search UPSC, SSC CGL, 12th Pass, TNPSC VAO, Bank PO, Railways, Agniveer..." value="${examsState.searchQuery}" style="width:100%; background:rgba(0,0,0,0.3); border:1px solid var(--border-glass); color:var(--text-primary); padding:8px 14px; border-radius:10px; font-size:0.8rem;" />
          </div>
          <div style="font-size:0.76rem; color:var(--accent-cyan); font-weight:700;">
            Showing <strong>${filteredExams.length}</strong> of ${exams.length} Exams
          </div>
        </div>

        <div class="exams-filter-bar" style="margin:0; padding:0; display:flex; gap:8px; flex-wrap:wrap;">
          ${filterPillsHtml}
        </div>
      </div>

      <div class="exams-grid" style="max-width:1040px; margin:0 auto;">${cardsHtml}</div>
    `;

    // Search Listener
    const searchInput = page.querySelector('#exam-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        examsState.searchQuery = e.target.value;
        renderExamsTab();
      });
    }

    // Filter clicks
    page.querySelectorAll('[data-stream-filter]').forEach(btn => {
      btn.onclick = () => {
        examsState.streamFilter = btn.getAttribute('data-stream-filter');
        renderExamsTab();
      };
    });

    const resetBtn = page.querySelector('#btn-reset-exam-filters');
    if (resetBtn) {
      resetBtn.onclick = () => {
        examsState.streamFilter = 'all';
        examsState.searchQuery = '';
        renderExamsTab();
      };
    }

    // View Syllabus & Sample Questions clicks
    page.querySelectorAll('.btn-view-syllabus').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-exam-id');
        openExamSyllabusModal(id);
      };
    });

    // Watchlist clicks
    page.querySelectorAll('.btn-watch-exam').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-exam-id');
        let watched = JSON.parse(localStorage.getItem('watched_exams') || '[]');
        if (watched.includes(id)) {
          watched = watched.filter(x => x !== id);
          btn.innerHTML = '☆ Watchlist';
          btn.classList.remove('active');
          showToast('Removed from exam watchlist');
        } else {
          watched.push(id);
          btn.innerHTML = '★ Pinned';
          btn.classList.add('active');
          showToast('Pinned to your exam watchlist!', 'success');
        }
        localStorage.setItem('watched_exams', JSON.stringify(watched));
      };
    });

    // Start Live Countdown Timer
    startLiveCountdowns(page);
  }

  function startLiveCountdowns(container) {
    if (examsState.countdownTimerId) clearInterval(examsState.countdownTimerId);

    function update() {
      const boxes = container.querySelectorAll('.countdown-box');
      const now = new Date().getTime();

      boxes.forEach(box => {
        const targetStr = box.getAttribute('data-target-date');
        const targetDate = new Date(targetStr).getTime();
        const diff = targetDate - now;

        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const secs = Math.floor((diff % (1000 * 60)) / 1000);

          const elDays = box.querySelector('.cd-days');
          const elHours = box.querySelector('.cd-hours');
          const elMins = box.querySelector('.cd-mins');
          const elSecs = box.querySelector('.cd-secs');

          if (elDays) elDays.textContent = String(days).padStart(2, '0');
          if (elHours) elHours.textContent = String(hours).padStart(2, '0');
          if (elMins) elMins.textContent = String(mins).padStart(2, '0');
          if (elSecs) elSecs.textContent = String(secs).padStart(2, '0');
        } else {
          box.innerHTML = `<div style="grid-column:span 4;color:var(--accent-emerald);font-weight:700;font-size:0.85rem;padding:4px;">Admission / Exam Cycle Active</div>`;
        }
      });
    }

    update();
    examsState.countdownTimerId = setInterval(update, 1000);
  }

  // =========================================================================
  // ═══════════════════════════════════════════════════════════════════════
  //  MODULE 5: COLLEGE PREDICTOR & CUTOFF SIMULATOR
  // ═══════════════════════════════════════════════════════════════════════
  // =========================================================================

  let predictorState = {
    exam: 'jee-main',
    score: 98.5,
    category: 'general',
    quota: 'ai'
  };

  function renderPredictorTab() {
    const panel = document.getElementById('tab-predictor');
    if (!panel) return;
    panel.innerHTML = '';
    const page = document.createElement('div');
    page.className = 'counselor-page';
    panel.appendChild(page);

    const colleges = window.COLLEGE_CUTOFF_DATABASE || [];

    // Filter matching colleges based on selected exam & score
    const categorizedColleges = colleges.map(col => {
      let effectiveScore = predictorState.score;
      
      // Quota Bonus Concessions
      if (predictorState.quota === 'sports') effectiveScore += 4.5;
      else if (predictorState.quota === 'ncc') effectiveScore += 3.5;
      else if (predictorState.quota === 'nss') effectiveScore += 2.0;
      else if (predictorState.quota === 'govt75') effectiveScore += 6.0;
      else if (predictorState.quota === 'defence') effectiveScore += 4.0;
      else if (predictorState.quota === 'pwd') effectiveScore += 7.0;
      else if (predictorState.quota === 'firstgen') effectiveScore += 2.5;

      let probability = 'safe'; // safe | target | dream
      if (effectiveScore >= 99.0) probability = 'safe';
      else if (effectiveScore >= 96.0) probability = col.id === 'iit-bombay' || col.id === 'aiims-delhi' ? 'dream' : 'target';
      else if (effectiveScore >= 91.0) probability = col.id === 'nit-trichy' || col.id === 'bits-pilani' ? 'target' : 'dream';
      else probability = 'dream';

      return { ...col, probability };
    });

    const collegesHtml = categorizedColleges.map((c, i) => {
      const badgeClass = c.probability === 'safe' ? 'prob-badge-safe' : c.probability === 'target' ? 'prob-badge-target' : 'prob-badge-dream';
      const badgeLabel = c.probability === 'safe' ? '✅ High Probability (>85%)' : c.probability === 'target' ? '🎯 Moderate Chance (50-85%)' : '⭐ Ambitious / Dream (<50%)';

      return `
        <div class="college-match-card" style="animation-delay:${i * 0.05}s">
          <div class="college-info-left">
            <div class="college-name">
              ${c.name}
              <span style="font-size:0.75rem;color:var(--text-muted);font-weight:500;">· NIRF ${c.nirfRank}</span>
            </div>
            <div class="college-location">📍 ${c.location} · Entrance: <strong style="color:var(--accent-cyan)">${c.exam}</strong></div>
            
            <div class="college-tags-row">
              <span class="college-badge ${badgeClass}">${badgeLabel}</span>
              <span style="font-size:0.7rem;color:var(--text-muted);padding:3px 8px;border-radius:6px;background:rgba(255,255,255,0.04);border:1px solid var(--border-glass);">
                Cutoff Guide: ${c.safeCutoff}
              </span>
            </div>

            <div style="font-size:0.72rem;color:var(--text-secondary);margin-top:8px;">
              <strong>Top Recruiters:</strong> ${c.topRecruiters.join(', ')}
            </div>
          </div>

          <div class="college-stat-box">
            <div class="college-avg-package">${c.avgPackage}</div>
            <div class="college-stat-label">Median CTC</div>
            <div style="font-size:0.68rem;color:var(--accent-purple);margin-top:4px;font-weight:600;">Max: ${c.highestPackage}</div>
          </div>
        </div>
      `;
    }).join('');

    page.innerHTML = `
      <div class="roadmap-header">
        <div class="page-hero-title">College Predictor & <span>Cutoff Simulator</span></div>
        <div class="page-hero-subtitle">Simulate entrance percentile cutoffs across premier IITs, NITs, AIIMS, NLUs, and IIMs with realistic probability tiering.</div>
      </div>

      <div class="predictor-form-card">
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:16px;margin-bottom:16px;">
          <div>
            <label class="elig-label">Target Entrance Exam</label>
            <select class="elig-select" id="pred-exam-select">
              <option value="jee-main" ${predictorState.exam === 'jee-main' ? 'selected' : ''}>JEE Main (Engineering / NITs)</option>
              <option value="jee-adv" ${predictorState.exam === 'jee-adv' ? 'selected' : ''}>JEE Advanced (All 23 IITs)</option>
              <option value="neet" ${predictorState.exam === 'neet' ? 'selected' : ''}>NEET-UG (AIIMS & Medical)</option>
              <option value="cuet" ${predictorState.exam === 'cuet' ? 'selected' : ''}>CUET-UG (DU / Central Univ)</option>
              <option value="clat" ${predictorState.exam === 'clat' ? 'selected' : ''}>CLAT (Top 24 NLUs)</option>
              <option value="ipmat" ${predictorState.exam === 'ipmat' ? 'selected' : ''}>IPMAT (IIM Integrated)</option>
            </select>
          </div>

          <div>
            <label class="elig-label">Category</label>
            <select class="elig-select" id="pred-cat-select">
              <option value="general">General (Open / Unreserved)</option>
              <option value="obc">OBC-NCL</option>
              <option value="ews">GEN-EWS</option>
              <option value="sc">Scheduled Caste (SC)</option>
              <option value="st">Scheduled Tribe (ST)</option>
              <option value="pwd">PwD (Persons with Disabilities)</option>
            </select>
          </div>

          <div>
            <label class="elig-label">Quota & Concession Allocation</label>
            <select class="elig-select" id="pred-quota-select">
              <option value="ai" ${predictorState.quota === 'ai' ? 'selected' : ''}>All India Quota (AI / Open)</option>
              <option value="hs" ${predictorState.quota === 'hs' ? 'selected' : ''}>Home State Quota (HS / Domicile)</option>
              <option value="sports" ${predictorState.quota === 'sports' ? 'selected' : ''}>🏅 Sports Quota (Eminent Sports Persons - ESP)</option>
              <option value="ncc" ${predictorState.quota === 'ncc' ? 'selected' : ''}>🎖️ NCC Quota ('A' / 'B' / 'C' Certificate)</option>
              <option value="nss" ${predictorState.quota === 'nss' ? 'selected' : ''}>🤝 NSS Quota (Bonus Marks & Weightage)</option>
              <option value="govt75" ${predictorState.quota === 'govt75' ? 'selected' : ''}>🏛️ Tamil Nadu 7.5% Govt School Quota (100% Free Seat)</option>
              <option value="defence" ${predictorState.quota === 'defence' ? 'selected' : ''}>🛡️ Children of Ex-Servicemen (CW / Defence Priority 1-8)</option>
              <option value="pwd" ${predictorState.quota === 'pwd' ? 'selected' : ''}>♿ Differently Abled (PwD 5% Horizontal)</option>
              <option value="firstgen" ${predictorState.quota === 'firstgen' ? 'selected' : ''}>🎓 First Generation Graduate (FG Fee Concession)</option>
              <option value="eca" ${predictorState.quota === 'eca' ? 'selected' : ''}>🎭 Extra-Curricular Activities (ECA / Fine Arts)</option>
            </select>
          </div>
        </div>

        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <label class="elig-label" style="margin-bottom:0;">Estimated Percentile / Score</label>
            <span class="slider-value-display" id="pred-score-display">${predictorState.score}%ile</span>
          </div>
          <input type="range" class="form-slider" id="pred-score-slider" min="60" max="99.9" step="0.1" value="${predictorState.score}">
        </div>
      </div>

      <div class="predictor-results-grid">${collegesHtml}</div>
    `;

    function updatePredictorCards() {
      const scoreDisplay = page.querySelector('#pred-score-display');
      if (scoreDisplay) scoreDisplay.textContent = predictorState.score.toFixed(1) + '%ile';

      const categorizedColleges = colleges.map(col => {
        let effectiveScore = predictorState.score;
        
        // Quota Bonus Concessions
        if (predictorState.quota === 'sports') effectiveScore += 4.5;
        else if (predictorState.quota === 'ncc') effectiveScore += 3.5;
        else if (predictorState.quota === 'nss') effectiveScore += 2.0;
        else if (predictorState.quota === 'govt75') effectiveScore += 6.0;
        else if (predictorState.quota === 'defence') effectiveScore += 4.0;
        else if (predictorState.quota === 'pwd') effectiveScore += 7.0;
        else if (predictorState.quota === 'firstgen') effectiveScore += 2.5;

        let probability = 'safe';
        if (effectiveScore >= 99.0) probability = 'safe';
        else if (effectiveScore >= 96.0) probability = col.id === 'iit-bombay' || col.id === 'aiims-delhi' ? 'dream' : 'target';
        else if (effectiveScore >= 91.0) probability = col.id === 'nit-trichy' || col.id === 'bits-pilani' ? 'target' : 'dream';
        else probability = 'dream';
        return { ...col, probability };
      });

      const cardsHtml = categorizedColleges.map((c, i) => {
        const badgeClass = c.probability === 'safe' ? 'prob-badge-safe' : c.probability === 'target' ? 'prob-badge-target' : 'prob-badge-dream';
        const badgeLabel = c.probability === 'safe' ? '✅ High Probability (>85%)' : c.probability === 'target' ? '🎯 Moderate Chance (50-85%)' : '⭐ Ambitious / Dream (<50%)';

        return `
          <div class="college-match-card" style="animation-delay:${Math.min(i * 0.04, 0.4)}s">
            <div class="college-info-left">
              <div class="college-name">
                ${c.name}
                <span style="font-size:0.75rem;color:var(--text-muted);font-weight:500;">· NIRF ${c.nirfRank}</span>
              </div>
              <div class="college-location">📍 ${c.location} · Entrance: <strong style="color:var(--accent-cyan)">${c.exam}</strong></div>
              
              <div class="college-tags-row">
                <span class="college-badge ${badgeClass}">${badgeLabel}</span>
                <span style="font-size:0.7rem;color:var(--text-muted);padding:3px 8px;border-radius:6px;background:rgba(255,255,255,0.04);border:1px solid var(--border-glass);">
                  Cutoff Guide: ${c.safeCutoff}
                </span>
              </div>

              <div style="font-size:0.72rem;color:var(--text-secondary);margin-top:8px;">
                <strong>Top Recruiters:</strong> ${c.topRecruiters.join(', ')}
              </div>
            </div>

            <div class="college-stat-box">
              <div class="college-avg-package">${c.avgPackage}</div>
              <div class="college-stat-label">Median CTC</div>
              <div style="font-size:0.68rem;color:var(--accent-purple);margin-top:4px;font-weight:600;">Max: ${c.highestPackage}</div>
            </div>
          </div>
        `;
      }).join('');

      const grid = page.querySelector('.predictor-results-grid');
      if (grid) grid.innerHTML = cardsHtml;
    }

    // Slider listener
    const slider = page.querySelector('#pred-score-slider');
    if (slider) {
      slider.oninput = () => {
        predictorState.score = parseFloat(slider.value);
        updatePredictorCards();
      };
    }

    const examSelect = page.querySelector('#pred-exam-select');
    if (examSelect) {
      examSelect.onchange = (e) => {
        predictorState.exam = e.target.value;
        updatePredictorCards();
      };
    }

    const quotaSelect = page.querySelector('#pred-quota-select');
    if (quotaSelect) {
      quotaSelect.onchange = (e) => {
        predictorState.quota = e.target.value;
        updatePredictorCards();
      };
    }

    const catSelect = page.querySelector('#pred-cat-select');
    if (catSelect) {
      catSelect.onchange = (e) => {
        predictorState.category = e.target.value;
        updatePredictorCards();
      };
    }
  }

  // =========================================================================
  // ═══════════════════════════════════════════════════════════════════════
  //  MODULE 6: AI CAREER COUNSELOR & DILEMMA DECISION ENGINE
  // ═══════════════════════════════════════════════════════════════════════
  // =========================================================================

  let aiCounselorState = {
    selectedDilemmaId: 'pcm-vs-pcb',
    mythFilter: 'all',
    customQuery: ''
  };

  function renderAICounselorTab() {
    const panel = document.getElementById('tab-counselor-ai');
    if (!panel) return;
    panel.innerHTML = '';
    const page = document.createElement('div');
    page.className = 'counselor-page';
    panel.appendChild(page);

    const dilemmas = window.COUNSELOR_DILEMMAS_DATA || [];
    const activeDilemma = dilemmas.find(d => d.id === aiCounselorState.selectedDilemmaId) || dilemmas[0];

    const cardsHtml = dilemmas.map(d => `
      <div class="dilemma-card ${d.id === activeDilemma.id ? 'active' : ''}" data-dilemma-id="${d.id}">
        <div class="dilemma-cat">${d.category}</div>
        <div class="dilemma-title">${d.title}</div>
        <div class="dilemma-desc">${d.shortDesc}</div>
      </div>
    `).join('');

    // Recommended courses in this dilemma
    let recCourses = [];
    if (typeof RAW_COURSES !== 'undefined' && activeDilemma.recommendedCourses) {
      recCourses = RAW_COURSES.filter(c => activeDilemma.recommendedCourses.includes(c.id));
    }

    const recHtml = recCourses.map(c => {
      let recruiterPreview = '';
      if (typeof window.getInternshipsAndRecruitersForCourse === 'function') {
        const intData = window.getInternshipsAndRecruitersForCourse(c);
        if (intData && intData.topRecruiters) {
          recruiterPreview = `
            <div style="font-size:0.68rem; color:#38bdf8; font-weight:700; margin-top:4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
              🏢 ${intData.topRecruiters.slice(0, 3).join(', ')} · 💰 ${intData.stipendRange.split('–')[0].trim()}
            </div>
          `;
        }
      }
      return `
        <div class="recommended-course-card" data-course-id="${c.id}">
          <div class="rec-match-badge">🎯 Recommended Route</div>
          <div class="rec-course-name">${c.course}</div>
          <div class="rec-course-domain">${c.domain} · ${c.awardType}</div>
          <div class="rec-course-why">
            <span>⏱ ${c.duration} · ${c.entranceTests.split(';')[0].trim()}</span>
          </div>
          ${recruiterPreview}
        </div>
      `;
    }).join('');

    // 20 Debunked Career Myths logic
    const myths = window.CAREER_MYTHS_DATA || [];
    const mythFilters = [
      ['all', '🌟 All 20 Myths'],
      ['Biology & Health', '🩺 Medical & Bio'],
      ['Engineering', '⚙️ Engineering & Core'],
      ['Commerce', '💼 Commerce & FinTech'],
      ['Arts & Humanities', '🎨 Arts & Design'],
      ['Government Jobs', '🏛️ Govt Jobs & Exams'],
      ['General', '🧠 Strategy & Admissions']
    ];

    const mythFilterPillsHtml = mythFilters.map(([k, lbl]) => `
      <button class="elig-filter-chip ${aiCounselorState.mythFilter === k ? 'active' : ''}" data-myth-filter="${k}" style="font-size:0.75rem; padding:4px 12px;">
        ${lbl}
      </button>
    `).join('');

    let filteredMyths = myths;
    if (aiCounselorState.mythFilter !== 'all') {
      filteredMyths = myths.filter(m => m.stream === aiCounselorState.mythFilter || m.stream.includes(aiCounselorState.mythFilter));
    }

    const mythsHtml = filteredMyths.map(m => `
      <div class="career-myth-card" style="background:rgba(255,255,255,0.02); border:1px solid var(--border-glass); border-radius:14px; padding:16px; margin-bottom:12px; transition:transform 0.2s ease;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:10px; margin-bottom:8px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:1.1rem; padding:4px 8px; border-radius:8px; background:rgba(244,63,94,0.15); color:#fb7185; font-weight:800;">❌ MYTH</span>
            <span style="font-size:0.72rem; color:var(--text-muted); font-weight:600; text-transform:uppercase;">${m.stream}</span>
          </div>
          <span style="font-size:0.68rem; color:var(--accent-cyan); background:rgba(6,182,212,0.1); padding:2px 8px; border-radius:6px; border:1px solid rgba(6,182,212,0.25);">
            ${m.cluster}
          </span>
        </div>

        <h4 style="margin:0 0 10px; font-size:0.95rem; color:#f87171; font-weight:700; line-height:1.4;">
          "${m.myth}"
        </h4>

        <div style="padding:10px 12px; background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.25); border-radius:10px; margin-bottom:10px;">
          <div style="display:flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:800; color:#34d399; margin-bottom:4px;">
            <span>✅ 2026 REALITY & DATA:</span>
          </div>
          <div style="font-size:0.8rem; color:var(--text-secondary); line-height:1.5;">
            ${m.reality}
          </div>
        </div>

        <div style="padding:8px 12px; background:rgba(59,130,246,0.08); border:1px solid rgba(59,130,246,0.25); border-radius:8px; font-size:0.78rem; color:#93c5fd; line-height:1.4;">
          <strong>💡 Actionable Advice:</strong> ${m.advice}
        </div>
      </div>
    `).join('');

    page.innerHTML = `
      <div class="roadmap-header">
        <div class="page-hero-title">AI Career Counselor & <span>Decision Simulator</span></div>
        <div class="page-hero-subtitle">Resolve high-stakes Class 12 crossroads dilemmas with structured pros/cons analysis, career trajectories, and tactical action plans.</div>
      </div>

      <div class="dilemma-cards-grid">${cardsHtml}</div>

      <div class="ai-response-box">
        <div class="ai-header-badge">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          Counselor Advisory Framework: ${activeDilemma.title}
        </div>

        <div style="font-size:0.92rem;color:var(--text-secondary);line-height:1.6;background:rgba(255,255,255,0.02);padding:16px;border-radius:14px;border:1px solid var(--border-glass);">
          ${activeDilemma.breakdown}
        </div>

        <div class="ai-pros-cons-container">
          <div class="ai-side-box">
            <div class="ai-side-title" style="color:var(--accent-blue);">Option A: ${activeDilemma.prosCons.optionA.name}</div>
            <div style="margin-bottom:8px;font-size:0.75rem;color:var(--text-muted);font-weight:700;">PROS & ADVANTAGES:</div>
            ${activeDilemma.prosCons.optionA.pros.map(p => `<div class="ai-list-item"><span style="color:var(--accent-emerald)">✓</span> ${p}</div>`).join('')}
            <div style="margin:10px 0 6px;font-size:0.75rem;color:var(--text-muted);font-weight:700;">CONS & CHALLENGES:</div>
            ${activeDilemma.prosCons.optionA.cons.map(c => `<div class="ai-list-item"><span style="color:var(--accent-rose)">✕</span> ${c}</div>`).join('')}
          </div>

          <div class="ai-side-box">
            <div class="ai-side-title" style="color:var(--accent-purple);">Option B: ${activeDilemma.prosCons.optionB.name}</div>
            <div style="margin-bottom:8px;font-size:0.75rem;color:var(--text-muted);font-weight:700;">PROS & ADVANTAGES:</div>
            ${activeDilemma.prosCons.optionB.pros.map(p => `<div class="ai-list-item"><span style="color:var(--accent-emerald)">✓</span> ${p}</div>`).join('')}
            <div style="margin:10px 0 6px;font-size:0.75rem;color:var(--text-muted);font-weight:700;">CONS & CHALLENGES:</div>
            ${activeDilemma.prosCons.optionB.cons.map(c => `<div class="ai-list-item"><span style="color:var(--accent-rose)">✕</span> ${c}</div>`).join('')}
          </div>
        </div>

        <div class="ai-action-plan-box">
          <div style="font-size:0.92rem;font-weight:800;color:var(--text-primary);margin-bottom:10px;">
            📋 3-Step Tactical Action Plan for You:
          </div>
          ${activeDilemma.actionPlan.map((ap, idx) => `
            <div class="ai-action-step">
              <span class="ai-step-num">${idx + 1}</span>
              <span>${ap}</span>
            </div>
          `).join('')}
        </div>

        <div style="padding:14px;background:rgba(245, 158, 11, 0.1);border:1px solid rgba(245, 158, 11, 0.3);border-radius:14px;color:#fde68a;font-size:0.82rem;line-height:1.45;">
          <strong>💡 Senior Counselor Takeaway:</strong> ${activeDilemma.expertAdvice}
        </div>

        ${recHtml ? `
          <div style="margin-top:10px;">
            <div style="font-size:0.88rem;font-weight:800;color:var(--text-primary);margin-bottom:10px;">
              Direct Courses in this Decision Spectrum:
            </div>
            <div class="recommended-grid">${recHtml}</div>
          </div>
        ` : ''}
      </div>

      <!-- Top 20 Debunked Career Myths & Fact-Check -->
      <div style="max-width:1040px; margin:32px auto 0; width:100%;">
        <div style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:10px; margin-bottom:14px; border-bottom:1px solid var(--border-glass); padding-bottom:10px;">
          <div>
            <div style="font-size:1.15rem; font-weight:800; color:var(--text-primary); display:flex; align-items:center; gap:8px;">
              <span>💡</span> Top 20 Career Myths Debunked (2026 Fact-Check)
            </div>
            <div style="font-size:0.78rem; color:var(--text-muted); margin-top:2px;">
              Breaking widespread misconceptions about salaries, arts, engineering core branches, and admissions.
            </div>
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            ${mythFilterPillsHtml}
          </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:14px;">
          ${mythsHtml}
        </div>
      </div>
    `;

    // Myth filter listener
    page.querySelectorAll('[data-myth-filter]').forEach(btn => {
      btn.onclick = () => {
        aiCounselorState.mythFilter = btn.getAttribute('data-myth-filter');
        renderAICounselorTab();
      };
    });

    // Dilemma selection
    page.querySelectorAll('.dilemma-card').forEach(card => {
      card.onclick = () => {
        aiCounselorState.selectedDilemmaId = card.getAttribute('data-dilemma-id');
        renderAICounselorTab();
      };
    });

    // Course click
    page.querySelectorAll('.recommended-course-card').forEach(card => {
      card.onclick = () => {
        const id = card.getAttribute('data-course-id');
        if (typeof SimulationEngine !== 'undefined') {
          document.querySelector('[data-tab="explore"]').click();
          setTimeout(() => SimulationEngine.openCourseModalById(id), 400);
        }
      };
    });
  }

  // =========================================================================
  // ═══════════════════════════════════════════════════════════════════════
  //  MODULE 7: SCHOLARSHIPS & FINANCIAL AID NAVIGATOR
  // ═══════════════════════════════════════════════════════════════════════
  // =========================================================================

  let scholarshipFilterState = {
    type: 'all',
    category: 'all',
    gender: 'all',
    stream: 'all',
    search: ''
  };

  function renderScholarshipsTab() {
    const panel = document.getElementById('tab-scholarships');
    if (!panel) return;
    panel.innerHTML = '';
    const page = document.createElement('div');
    page.className = 'counselor-page';
    panel.appendChild(page);

    const scholarships = window.SCHOLARSHIPS_DATA || [];

    let filtered = scholarships;

    // 1. Filter by Provider Type (NGO, Govt, Corporate, Trust)
    if (scholarshipFilterState.type !== 'all') {
      filtered = filtered.filter(s => s.type === scholarshipFilterState.type);
    }

    // 2. Filter by Category (First-Gen, Rural, Girls, Disadvantaged)
    if (scholarshipFilterState.category === 'first-gen') {
      filtered = filtered.filter(s => s.category === 'first-gen' || s.category === 'rural');
    } else if (scholarshipFilterState.category === 'rural') {
      filtered = filtered.filter(s => s.category === 'rural');
    }

    // 3. Filter by Stream
    if (scholarshipFilterState.stream !== 'all') {
      filtered = filtered.filter(s => s.stream === scholarshipFilterState.stream || s.stream === 'all');
    }

    // 4. Filter by Gender
    if (scholarshipFilterState.gender === 'female') {
      filtered = filtered.filter(s => s.gender === 'female' || s.gender === 'all');
    }

    // 5. Filter by Search Keyword
    if (scholarshipFilterState.search.trim()) {
      const q = scholarshipFilterState.search.toLowerCase().trim();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(q) ||
        s.provider.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.eligibility.toLowerCase().includes(q) ||
        (s.supportTypes && s.supportTypes.some(t => t.toLowerCase().includes(q)))
      );
    }

    const cardsHtml = filtered.length === 0 ? `
      <div style="grid-column:1/-1; text-align:center; padding:50px 20px; color:var(--text-muted); background:rgba(255,255,255,0.02); border:1px solid var(--border-glass); border-radius:16px;">
        <div style="font-size:2.5rem; margin-bottom:10px;">🔍</div>
        <h3 style="color:var(--text-primary); font-size:1.1rem; margin-bottom:6px;">No Scholarships Found</h3>
        <p style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:14px;">Try resetting the filters or search for another keyword (e.g., 'Agaram', 'Laptop', 'Girls', 'Tuition').</p>
        <button class="btn-primary" id="btn-reset-scholarship-filters" style="padding:8px 18px; font-size:0.8rem; cursor:pointer;">Reset All Filters</button>
      </div>
    ` : filtered.map((s, i) => {
      const typeBadgeBg = s.type === 'ngo' ? 'rgba(16,185,129,0.15)' : s.type === 'govt' ? 'rgba(59,130,246,0.15)' : s.type === 'trust' ? 'rgba(234,179,8,0.15)' : 'rgba(139,92,246,0.15)';
      const typeBadgeColor = s.type === 'ngo' ? '#34d399' : s.type === 'govt' ? '#60a5fa' : s.type === 'trust' ? '#fbbf24' : '#c084fc';
      const typeBadgeBorder = s.type === 'ngo' ? 'rgba(16,185,129,0.35)' : s.type === 'govt' ? 'rgba(59,130,246,0.35)' : s.type === 'trust' ? 'rgba(234,179,8,0.35)' : 'rgba(139,92,246,0.35)';

      const supportBadges = (s.supportTypes || []).map(t => `
        <span style="font-size:0.68rem; padding:2px 7px; border-radius:6px; background:rgba(255,255,255,0.06); border:1px solid var(--border-glass); color:var(--text-secondary);">
          ✨ ${t}
        </span>
      `).join('');

      return `
        <div class="scholarship-card" style="animation-delay:${i * 0.04}s">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; margin-bottom:6px;">
            <span style="font-size:0.7rem; font-weight:700; padding:3px 8px; border-radius:6px; background:${typeBadgeBg}; color:${typeBadgeColor}; border:1px solid ${typeBadgeBorder};">
              ${s.typeBadge || 'Aid Program'}
            </span>
            <div class="scholarship-amount-badge">${s.amount.split('(')[0].trim()}</div>
          </div>

          <div>
            <div class="scholarship-title">${s.name}</div>
            <div class="scholarship-provider">By <strong>${s.provider}</strong></div>
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:2px;">
            ${supportBadges}
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:6px;font-size:0.7rem;">
            <span style="padding:2px 7px;border-radius:6px;background:rgba(255,255,255,0.06);border:1px solid var(--border-glass);">Income: ${s.maxIncome}</span>
            <span style="padding:2px 7px;border-radius:6px;background:rgba(255,255,255,0.06);border:1px solid var(--border-glass);">Min Marks: ${s.minMarks}%</span>
            <span style="padding:2px 7px;border-radius:6px;background:rgba(255,255,255,0.06);border:1px solid var(--border-glass);color:var(--accent-cyan);">${s.duration}</span>
          </div>

          <div style="font-size:0.76rem;color:var(--text-secondary);line-height:1.4;">
            ${s.description}
          </div>

          <div style="font-size:0.72rem;color:var(--text-muted);background:rgba(0,0,0,0.25);padding:8px 10px;border-radius:10px;border:1px solid var(--border-glass);">
            <strong>Eligibility:</strong> ${s.eligibility}
          </div>

          <div style="margin-top:auto;display:flex;justify-content:space-between;align-items:center;padding-top:8px;flex-wrap:wrap;gap:8px;">
            <span style="font-size:0.72rem;color:var(--accent-amber);font-weight:600;">📅 Deadline: ${s.deadline}</span>
            <a href="${s.applyUrl}" target="_blank" rel="noopener" class="btn-exam-action btn-exam-primary" style="flex:0 0 auto;padding:6px 14px;">
              Apply Official Portal ↗
            </a>
          </div>
        </div>
      `;
    }).join('');

    page.innerHTML = `
      <div class="roadmap-header">
        <div class="page-hero-title">Scholarships, NGOs & <span>Educational Aid Navigator</span></div>
        <div class="page-hero-subtitle">
          Comprehensive directory of 28+ premier Philanthropic NGOs (Agaram, Maatram, FFE, Jindal, Kotak), Charitable Trusts, and Government CSR schemes offering 100% Free College, Laptops, and Living Grants.
        </div>
      </div>

      <!-- Filter Controls -->
      <div style="max-width:1040px; width:100%; margin:0 auto 16px; background:rgba(255,255,255,0.03); border:1px solid var(--border-glass); border-radius:14px; padding:14px 18px;">
        <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center; justify-content:space-between; margin-bottom:12px;">
          <!-- Search Box -->
          <div style="position:relative; flex:1; min-width:240px;">
            <input type="text" id="sch-search-input" placeholder="🔍 Search NGO, Provider, Laptop, Free Hostel, Suriya, FFE..." value="${scholarshipFilterState.search}" style="width:100%; background:rgba(0,0,0,0.3); border:1px solid var(--border-glass); color:var(--text-primary); padding:8px 14px; border-radius:10px; font-size:0.8rem;" />
          </div>
          <div style="font-size:0.76rem; color:var(--accent-cyan); font-weight:700;">
            Showing <strong>${filtered.length}</strong> of ${scholarships.length} Aid Programs
          </div>
        </div>

        <!-- Provider Type Filters -->
        <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center; margin-bottom:8px;">
          <span style="font-size:0.74rem; color:var(--text-muted); font-weight:700;">Provider Type:</span>
          <button class="elig-filter-chip ${scholarshipFilterState.type === 'all' && scholarshipFilterState.category === 'all' && scholarshipFilterState.gender === 'all' ? 'active' : ''}" data-sch-type="all">🌟 All Programs (${scholarships.length})</button>
          <button class="elig-filter-chip ${scholarshipFilterState.type === 'ngo' ? 'active' : ''}" data-sch-type="ngo" style="border-color:rgba(16,185,129,0.35);">🤝 Philanthropic NGOs & Foundations</button>
          <button class="elig-filter-chip ${scholarshipFilterState.type === 'govt' ? 'active' : ''}" data-sch-type="govt">🏛️ Government Schemes (NSP/DBT)</button>
          <button class="elig-filter-chip ${scholarshipFilterState.type === 'corporate' ? 'active' : ''}" data-sch-type="corporate">🏢 Corporate CSR Grants</button>
          <button class="elig-filter-chip ${scholarshipFilterState.type === 'trust' ? 'active' : ''}" data-sch-type="trust">🏛️ Charitable & Community Trusts</button>
        </div>

        <!-- Beneficiary & Stream Filters -->
        <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
          <span style="font-size:0.74rem; color:var(--text-muted); font-weight:700;">Target Focus:</span>
          <button class="elig-filter-chip ${scholarshipFilterState.category === 'first-gen' ? 'active' : ''}" data-sch-cat="first-gen">🌱 1st Gen & Rural Govt School</button>
          <button class="elig-filter-chip ${scholarshipFilterState.gender === 'female' ? 'active' : ''}" data-sch-gender="female">👧 Girls Scholarships Only</button>
          <button class="elig-filter-chip ${scholarshipFilterState.stream === 'engineering' ? 'active' : ''}" data-sch-stream="engineering">⚙️ Engineering & Tech</button>
          <button class="elig-filter-chip ${scholarshipFilterState.stream === 'science' ? 'active' : ''}" data-sch-stream="science">🔬 Science & Research</button>
        </div>
      </div>

      <div class="scholarships-grid" style="max-width:1040px; margin:0 auto;">${cardsHtml}</div>
    `;

    // Event Listeners
    const searchInput = page.querySelector('#sch-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        scholarshipFilterState.search = e.target.value;
        renderScholarshipsTab();
      });
    }

    page.querySelectorAll('[data-sch-type]').forEach(btn => {
      btn.onclick = () => {
        scholarshipFilterState.type = btn.getAttribute('data-sch-type');
        scholarshipFilterState.category = 'all';
        scholarshipFilterState.gender = 'all';
        renderScholarshipsTab();
      };
    });

    page.querySelectorAll('[data-sch-cat]').forEach(btn => {
      btn.onclick = () => {
        scholarshipFilterState.category = scholarshipFilterState.category === 'first-gen' ? 'all' : 'first-gen';
        renderScholarshipsTab();
      };
    });

    page.querySelectorAll('[data-sch-gender]').forEach(btn => {
      btn.onclick = () => {
        scholarshipFilterState.gender = scholarshipFilterState.gender === 'female' ? 'all' : 'female';
        renderScholarshipsTab();
      };
    });

    page.querySelectorAll('[data-sch-stream]').forEach(btn => {
      btn.onclick = () => {
        const streamVal = btn.getAttribute('data-sch-stream');
        scholarshipFilterState.stream = scholarshipFilterState.stream === streamVal ? 'all' : streamVal;
        renderScholarshipsTab();
      };
    });

    const resetBtn = page.querySelector('#btn-reset-scholarship-filters');
    if (resetBtn) {
      resetBtn.onclick = () => {
        scholarshipFilterState = { type: 'all', category: 'all', gender: 'all', stream: 'all', search: '' };
        renderScholarshipsTab();
      };
    }
  }

  // =========================================================================
  // ═══════════════════════════════════════════════════════════════════════
  //  MODULE 8: SALARY & 10-YEAR ROI CALCULATOR
  // ═══════════════════════════════════════════════════════════════════════
  // =========================================================================

  let roiState = {
    tuitionFee: 800000,
    livingCost: 350000,
    startSalary: 850000,
    incrementRate: 12,
    degreeYears: 4
  };

  function renderRoiTab() {
    const panel = document.getElementById('tab-roi');
    if (!panel) return;
    panel.innerHTML = '';
    const page = document.createElement('div');
    page.className = 'counselor-page';
    panel.appendChild(page);

    // Compute metrics
    const totalCost = roiState.tuitionFee + roiState.livingCost;
    let cumulativeEarnings = 0;
    let currentSalary = roiState.startSalary;
    let breakEvenMonth = 0;
    let runningNet = -totalCost;

    let yearByYear = [];
    for (let yr = 1; yr <= 10; yr++) {
      cumulativeEarnings += currentSalary;
      runningNet += currentSalary;
      if (runningNet >= 0 && breakEvenMonth === 0) {
        const prevYearNet = runningNet - currentSalary;
        const fraction = Math.abs(prevYearNet) / currentSalary;
        breakEvenMonth = Math.round((yr - 1 + fraction) * 12);
      }
      yearByYear.push({ year: yr, salary: currentSalary, cumulative: cumulativeEarnings, net: runningNet });
      currentSalary = currentSalary * (1 + roiState.incrementRate / 100);
    }

    if (breakEvenMonth === 0) breakEvenMonth = 120;
    const roiMultiple = ((cumulativeEarnings - totalCost) / totalCost).toFixed(1);

    page.innerHTML = `
      <div class="roadmap-header">
        <div class="page-hero-title">Salary & <span>10-Year ROI Calculator</span></div>
        <div class="page-hero-subtitle">Model education investment against expected career returns, appraisal rates, and break-even financial horizons.</div>
      </div>

      <div class="roi-card">
        <div class="roi-inputs-grid">
          <div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
              <label class="elig-label">Total Course Tuition Fees</label>
              <span class="slider-value-display" id="disp-tuition">₹${(roiState.tuitionFee / 100000).toFixed(1)} Lakh</span>
            </div>
            <input type="range" class="form-slider" id="roi-tuition" min="50000" max="3000000" step="50000" value="${roiState.tuitionFee}">
          </div>

          <div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
              <label class="elig-label">Hostel & Living Costs (Total)</label>
              <span class="slider-value-display" id="disp-living">₹${(roiState.livingCost / 100000).toFixed(1)} Lakh</span>
            </div>
            <input type="range" class="form-slider" id="roi-living" min="0" max="1500000" step="25000" value="${roiState.livingCost}">
          </div>

          <div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
              <label class="elig-label">Expected Starting CTC (Year 1)</label>
              <span class="slider-value-display" id="disp-salary">₹${(roiState.startSalary / 100000).toFixed(1)} LPA</span>
            </div>
            <input type="range" class="form-slider" id="roi-salary" min="300000" max="3500000" step="50000" value="${roiState.startSalary}">
          </div>

          <div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
              <label class="elig-label">Annual Salary Appraisal Rate</label>
              <span class="slider-value-display" id="disp-rate">${roiState.incrementRate}% / year</span>
            </div>
            <input type="range" class="form-slider" id="roi-rate" min="5" max="25" step="1" value="${roiState.incrementRate}">
          </div>
        </div>

        <div class="roi-metrics-summary">
          <div class="roi-metric-card">
            <div class="roi-metric-val" id="metric-total-cost" style="color:var(--accent-rose);">₹${(totalCost / 100000).toFixed(1)}L</div>
            <div class="roi-metric-lbl">Total Education Outlay</div>
          </div>
          <div class="roi-metric-card">
            <div class="roi-metric-val" id="metric-total-earnings" style="color:var(--accent-emerald);">₹${(cumulativeEarnings / 100000).toFixed(1)}L</div>
            <div class="roi-metric-lbl">10-Year Cumulative Income</div>
          </div>
          <div class="roi-metric-card">
            <div class="roi-metric-val" id="metric-breakeven" style="color:var(--accent-cyan);">${breakEvenMonth} Mos</div>
            <div class="roi-metric-lbl">Break-Even Horizon (${(breakEvenMonth / 12).toFixed(1)} Yrs)</div>
          </div>
          <div class="roi-metric-card">
            <div class="roi-metric-val" id="metric-multiple" style="color:var(--accent-purple);">${roiMultiple}x</div>
            <div class="roi-metric-lbl">Net Return Multiple</div>
          </div>
        </div>

        <div style="margin-top:20px;">
          <div style="font-size:0.92rem;font-weight:800;color:var(--text-primary);margin-bottom:12px;">
            📊 10-Year Cumulative Earnings Growth Curve
          </div>
          <canvas id="roi-chart-canvas" width="840" height="240" style="width:100%;height:220px;"></canvas>
        </div>
      </div>
    `;

    function updateRoiCalculations() {
      const totalCost = roiState.tuitionFee + roiState.livingCost;
      let cumulativeEarnings = 0;
      let currentSalary = roiState.startSalary;
      let breakEvenMonth = 0;
      let runningNet = -totalCost;

      let yearByYear = [];
      for (let yr = 1; yr <= 10; yr++) {
        cumulativeEarnings += currentSalary;
        runningNet += currentSalary;
        if (runningNet >= 0 && breakEvenMonth === 0) {
          const prevYearNet = runningNet - currentSalary;
          const fraction = Math.abs(prevYearNet) / currentSalary;
          breakEvenMonth = Math.round((yr - 1 + fraction) * 12);
        }
        yearByYear.push({ year: yr, salary: currentSalary, cumulative: cumulativeEarnings, net: runningNet });
        currentSalary = currentSalary * (1 + roiState.incrementRate / 100);
      }

      if (breakEvenMonth === 0) breakEvenMonth = 120;
      const roiMultiple = ((cumulativeEarnings - totalCost) / totalCost).toFixed(1);

      const dTuition = page.querySelector('#disp-tuition');
      const dLiving = page.querySelector('#disp-living');
      const dSalary = page.querySelector('#disp-salary');
      const dRate = page.querySelector('#disp-rate');

      if (dTuition) dTuition.textContent = `₹${(roiState.tuitionFee / 100000).toFixed(1)} Lakh`;
      if (dLiving) dLiving.textContent = `₹${(roiState.livingCost / 100000).toFixed(1)} Lakh`;
      if (dSalary) dSalary.textContent = `₹${(roiState.startSalary / 100000).toFixed(1)} LPA`;
      if (dRate) dRate.textContent = `${roiState.incrementRate}% / year`;

      const mCost = page.querySelector('#metric-total-cost');
      const mEarnings = page.querySelector('#metric-total-earnings');
      const mBreakeven = page.querySelector('#metric-breakeven');
      const mMultiple = page.querySelector('#metric-multiple');

      if (mCost) mCost.textContent = `₹${(totalCost / 100000).toFixed(1)}L`;
      if (mEarnings) mEarnings.textContent = `₹${(cumulativeEarnings / 100000).toFixed(1)}L`;
      if (mBreakeven) mBreakeven.innerHTML = `${breakEvenMonth} Mos <span style="font-size:0.75rem;color:var(--text-muted);">(${(breakEvenMonth / 12).toFixed(1)} Yrs)</span>`;
      if (mMultiple) mMultiple.textContent = `${roiMultiple}x`;

      drawRoiCanvas('roi-chart-canvas', yearByYear, totalCost);
    }

    // Sliders
    const sTuition = page.querySelector('#roi-tuition');
    const sLiving = page.querySelector('#roi-living');
    const sSalary = page.querySelector('#roi-salary');
    const sRate = page.querySelector('#roi-rate');

    if (sTuition) sTuition.oninput = (e) => { roiState.tuitionFee = parseInt(e.target.value); updateRoiCalculations(); };
    if (sLiving) sLiving.oninput = (e) => { roiState.livingCost = parseInt(e.target.value); updateRoiCalculations(); };
    if (sSalary) sSalary.oninput = (e) => { roiState.startSalary = parseInt(e.target.value); updateRoiCalculations(); };
    if (sRate) sRate.oninput = (e) => { roiState.incrementRate = parseInt(e.target.value); updateRoiCalculations(); };

    setTimeout(() => drawRoiCanvas('roi-chart-canvas', yearByYear, totalCost), 150);
  }

  function drawRoiCanvas(canvasId, data, totalCost) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const maxVal = Math.max(...data.map(d => d.cumulative), totalCost * 1.5);
    const padL = 60;
    const padR = 20;
    const padT = 20;
    const padB = 35;
    const plotW = W - padL - padR;
    const plotH = H - padT - padB;

    // Cost line
    const costY = padT + plotH - (totalCost / maxVal) * plotH;
    ctx.beginPath();
    ctx.moveTo(padL, costY);
    ctx.lineTo(padL + plotW, costY);
    ctx.strokeStyle = 'rgba(244, 63, 94, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#f43f5e';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.fillText(`Cost: ₹${(totalCost/100000).toFixed(1)}L`, padL + 10, costY - 6);

    // Earnings Curve
    ctx.beginPath();
    data.forEach((d, i) => {
      const x = padL + (i / (data.length - 1)) * plotW;
      const y = padT + plotH - (d.cumulative / maxVal) * plotH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#10b981';
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Points and year labels
    data.forEach((d, i) => {
      const x = padL + (i / (data.length - 1)) * plotW;
      const y = padT + plotH - (d.cumulative / maxVal) * plotH;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();

      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`Y${d.year}`, x, H - 12);
    });
  }

  // =========================================================================
  // ═══════════════════════════════════════════════════════════════════════
  //  MODULE 9: MASTER CAREER DOSSIER & PDF EXPORT
  // ═══════════════════════════════════════════════════════════════════════
  // =========================================================================

  function renderDossierTab() {
    const panel = document.getElementById('tab-dossier');
    if (!panel) return;
    panel.innerHTML = '';
    const page = document.createElement('div');
    page.className = 'counselor-page';
    panel.appendChild(page);

    const shortlisted = JSON.parse(localStorage.getItem('shortlisted_courses') || '[]');
    const watchedExams = JSON.parse(localStorage.getItem('watched_exams') || '[]');
    const riasecScores = aptState.scores || { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    const sortedDims = RIASEC_DIMENSIONS.map(d => ({ ...d, score: riasecScores[d.key] || 0 })).sort((a, b) => b.score - a.score);
    const topDims = sortedDims.slice(0, 3);
    const hollandCode = sortedDims.map(d => d.key).slice(0, 3).join('');

    let bookmarkedCourses = [];
    if (typeof RAW_COURSES !== 'undefined') {
      bookmarkedCourses = RAW_COURSES.filter(c => shortlisted.includes(parseInt(c.id)));
    }

    let pinnedExamsList = [];
    if (typeof MASTER_ENTRANCE_EXAMS !== 'undefined') {
      pinnedExamsList = MASTER_ENTRANCE_EXAMS.filter(e => watchedExams.includes(e.id));
    }

    page.innerHTML = `
      <div class="roadmap-header dossier-actions">
        <div class="page-hero-title">Master Career Dossier & <span>PDF Export</span></div>
        <div class="page-hero-subtitle">Unified comprehensive career dossier compiling personality results, eligibility findings, target exams, and shortlisted degree plans.</div>
        <div style="margin-top:16px;display:flex;gap:12px;justify-content:center;">
          <button class="apt-start-btn" onclick="window.print()" style="padding:10px 24px;font-size:0.9rem;">
            🖨️ Print / Save as PDF
          </button>
        </div>
      </div>

      <div class="dossier-paper">
        <div class="dossier-header-bar">
          <div>
            <h1 style="font-size:1.6rem;font-weight:900;background:linear-gradient(90deg,#60a5fa,#c084fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">
              Class-12 Master Career Dossier
            </h1>
            <div style="font-size:0.8rem;color:var(--text-muted);margin-top:3px;">
              Generated on ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} · Comprehensive Intelligence Report
            </div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:0.75rem;font-weight:700;color:var(--accent-emerald);">HOLLAND CODE:</div>
            <div style="font-size:1.4rem;font-weight:900;font-family:var(--font-mono);color:var(--text-primary);">${hollandCode || 'RIA'}</div>
          </div>
        </div>

        <div>
          <div class="dossier-sec-title">1. RIASEC Aptitude & Personality Alignment</div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:12px;">
            ${topDims.map(d => `
              <div style="background:rgba(255,255,255,0.02);border:1px solid var(--border-glass);border-radius:14px;padding:14px;">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                  <span style="font-size:1.2rem;">${d.emoji}</span>
                  <strong style="color:${d.color};font-size:0.9rem;">${d.name} (${d.key})</strong>
                </div>
                <div style="font-size:0.75rem;color:var(--text-secondary);line-height:1.4;">${d.tagline} — ${d.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div>
          <div class="dossier-sec-title">2. Target Entrance Examinations Watchlist</div>
          ${pinnedExamsList.length > 0 ? `
            <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(240px, 1fr));gap:10px;">
              ${pinnedExamsList.map(e => `
                <div style="padding:10px 14px;background:rgba(255,255,255,0.02);border:1px solid var(--border-glass);border-radius:12px;">
                  <strong style="color:var(--text-primary);font-size:0.85rem;">${e.name}</strong>
                  <div style="font-size:0.72rem;color:var(--text-muted);margin-top:2px;">By ${e.conductingBody} · ${e.mode}</div>
                </div>
              `).join('')}
            </div>
          ` : `
            <div style="font-size:0.8rem;color:var(--text-muted);padding:10px;background:rgba(255,255,255,0.02);border-radius:10px;">
              No exams pinned yet. Pin target exams from the Exam Hub tab.
            </div>
          `}
        </div>

        <div>
          <div class="dossier-sec-title">3. Shortlisted Career Pathways (${bookmarkedCourses.length} Programmes)</div>
          ${bookmarkedCourses.length > 0 ? `
            <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(240px, 1fr));gap:10px;">
              ${bookmarkedCourses.map(c => {
                let recPreview = '';
                if (typeof window.getInternshipsAndRecruitersForCourse === 'function') {
                  const intData = window.getInternshipsAndRecruitersForCourse(c);
                  if (intData && intData.topRecruiters) {
                    recPreview = `<div style="font-size:0.68rem; color:#38bdf8; font-weight:700; margin-top:4px;">🏢 Top Recruiters: ${intData.topRecruiters.slice(0, 4).join(', ')}</div>`;
                  }
                }
                return `
                <div style="padding:12px;background:rgba(255,255,255,0.02);border:1px solid var(--border-glass);border-radius:12px;">
                  <strong style="color:var(--text-primary);font-size:0.85rem;">${c.course}</strong>
                  <div style="font-size:0.72rem;color:var(--accent-cyan);margin-top:2px;">${c.domain} · ${c.awardType} (${c.duration})</div>
                  <div style="font-size:0.68rem;color:var(--text-muted);margin-top:2px;">Exams: ${c.entranceTests.split(';')[0].trim()}</div>
                  ${recPreview}
                </div>
              `;
              }).join('')}
            </div>
          ` : `
            <div style="font-size:0.8rem;color:var(--text-muted);padding:10px;background:rgba(255,255,255,0.02);border-radius:10px;">
              No pathways shortlisted yet. Click the bookmark icon on any course card in Explore tab to add here.
            </div>
          `}
        </div>

        <div>
          <div class="dossier-sec-title">4. 5-Year Milestone & Growth Directives</div>
          <div style="display:flex;flex-direction:column;gap:8px;font-size:0.8rem;color:var(--text-secondary);">
            <div style="padding:8px 12px;background:rgba(255,255,255,0.02);border-radius:8px;">
              <strong>Class 12 Phase:</strong> Complete 100% board syllabus by November, take 30+ mock entrance tests, maintain 75%+ score.
            </div>
            <div style="padding:8px 12px;background:rgba(255,255,255,0.02);border-radius:8px;">
              <strong>Undergrad Years 1–2:</strong> Build 5 real-world GitHub/portfolio projects, maintain CGPA >= 8.0, clear foundation certifications.
            </div>
            <div style="padding:8px 12px;background:rgba(255,255,255,0.02);border-radius:8px;">
              <strong>Undergrad Years 3–4:</strong> Complete 2 industry internships, publish research/capstone, secure PPO or campus placement.
            </div>
          </div>
        </div>

        <!-- Section 5: Parents' Career & Financial Safety Blueprint -->
        <div>
          <div class="dossier-sec-title" style="display:flex; justify-content:space-between; align-items:center;">
            <span>5. 👨‍👩‍👧 Parents' Career & Financial Safety Blueprint (2026)</span>
            <button onclick="window.openParentsGuideModal()" style="background:rgba(56,189,248,0.15); color:#38bdf8; border:1px solid rgba(56,189,248,0.35); padding:3px 10px; border-radius:6px; font-size:0.72rem; cursor:pointer; font-weight:700;">
              View Full Guide Modal ↗
            </button>
          </div>
          
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:12px; margin-bottom:12px;">
            <div style="padding:12px; background:rgba(255,255,255,0.02); border:1px solid var(--border-glass); border-radius:12px;">
              <strong style="color:#38bdf8; font-size:0.82rem;">💰 Expected Educational Budget Tiers:</strong>
              <ul style="margin:6px 0 0; padding-left:16px; font-size:0.75rem; color:var(--text-secondary); line-height:1.45;">
                <li><strong>Govt Colleges:</strong> ₹12K – ₹45K/yr (100% Free under 7.5% Quota)</li>
                <li><strong>Govt-Aided:</strong> ₹25K – ₹75K/yr (Eligible for Post-Matric & NGO Aid)</li>
                <li><strong>Private Affiliated:</strong> ₹65K – ₹1.6L/yr (State Single Window regulated)</li>
                <li><strong>Deemed Tier-1:</strong> ₹2.0L – ₹4.8L/yr (Merit fee waivers available)</li>
              </ul>
            </div>

            <div style="padding:12px; background:rgba(255,255,255,0.02); border:1px solid var(--border-glass); border-radius:12px;">
              <strong style="color:#34d399; font-size:0.82rem;">🤝 Top 100% Free Safety Nets:</strong>
              <p style="font-size:0.75rem; color:var(--text-secondary); margin:6px 0 0; line-height:1.45;">
                Over 28 Philanthropic Foundations (Agaram, Maatram, FFE, Jindal, Kotak) cover 100% tuition & hostel fees for students with family income under ₹3 Lakhs/year.
              </p>
            </div>
          </div>
        </div>

        <div style="border-top:1px solid var(--border-glass);padding-top:14px;display:flex;justify-content:space-between;align-items:center;font-size:0.72rem;color:var(--text-muted);">
          <span>Class 12 Career Counselor Simulation Platform 2026</span>
          <span>Verified NIRF & Council Data</span>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // MODAL HANDLERS: EXAM SYLLABUS & PARENTS GUIDE
  // =========================================================================

  function openExamSyllabusModal(examId) {
    const modal = document.getElementById('exam-syllabus-modal');
    const body = document.getElementById('exam-syllabus-modal-body');
    const title = document.getElementById('exam-modal-title');
    const subtitle = document.getElementById('exam-modal-subtitle');
    if (!modal || !body) return;

    const previews = window.EXAM_PREVIEWS_DATA || {};
    const masterExams = window.MASTER_ENTRANCE_EXAMS || [];
    const exData = previews[examId] || masterExams.find(e => e.id === examId) || {
      name: examId.toUpperCase() + " Exam 2026",
      conductingBody: "National Authority",
      examMode: "CBT / Offline",
      totalMarks: 300,
      duration: "3 Hours",
      markingScheme: "+4 for correct, -1 for incorrect",
      sections: [
        { subject: "Core Domain 1", questions: 30, marks: 100, topics: "Fundamental Class 11 & 12 NCERT Concepts" },
        { subject: "Core Domain 2", questions: 30, marks: 100, topics: "Application & Analytical Problem Solving" },
        { subject: "General Aptitude", questions: 30, marks: 100, topics: "Reasoning, Numerical Ability & Verbal" }
      ],
      sampleQuestions: [
        {
          id: "gen-q1",
          subject: "Analytical Aptitude",
          question: "Which of the following approaches is most critical for scoring in competitive national entrance exams?",
          options: ["Rote memorization without understanding", "Conceptual clarity, NCERT mastery & regular timed mock tests", "Skipping difficult chapters entirely", "Guessing all questions randomly"],
          correctIndex: 1,
          explanation: "Competitive exams evaluate analytical reasoning and speed. Daily timed practice with NCERT conceptual clarity yields the highest percentile scores."
        }
      ]
    };

    if (title) title.innerText = exData.name;
    if (subtitle) subtitle.innerText = `${exData.conductingBody || 'National Testing Body'} · Mode: ${exData.examMode || exData.mode || 'Online CBT'}`;

    const sectionsHtml = (exData.sections || []).map(s => `
      <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-glass); border-radius:10px; padding:12px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <strong style="color:var(--accent-cyan); font-size:0.85rem;">${s.subject}</strong>
          <span style="font-size:0.72rem; color:var(--text-muted);">${s.questions} Qs · ${s.marks} Marks</span>
        </div>
        <div style="font-size:0.75rem; color:var(--text-secondary);">
          <strong>Key Topics:</strong> ${s.topics}
        </div>
      </div>
    `).join('');

    const sampleQsHtml = (exData.sampleQuestions || []).map((q, qIdx) => `
      <div class="exam-sample-quiz-card" style="background:rgba(255,255,255,0.02); border:1px solid var(--border-glass); border-radius:12px; padding:14px; margin-bottom:12px;" data-correct-idx="${q.correctIndex}">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:0.72rem; font-weight:800; color:#38bdf8; background:rgba(56,189,248,0.12); padding:2px 8px; border-radius:6px;">
            QUESTION ${qIdx + 1} (${q.subject})
          </span>
          <span class="quiz-score-badge" style="font-size:0.72rem; font-weight:700; color:var(--text-muted);">
            Select an answer
          </span>
        </div>

        <div style="font-size:0.85rem; color:var(--text-primary); font-weight:600; line-height:1.45; margin-bottom:12px; white-space:pre-line;">
          ${q.question}
        </div>

        <div class="quiz-options-list" style="display:flex; flex-direction:column; gap:6px;">
          ${q.options.map((opt, optIdx) => `
            <button class="quiz-option-btn" data-opt-idx="${optIdx}" style="text-align:left; background:rgba(255,255,255,0.03); border:1px solid var(--border-glass); border-radius:8px; padding:8px 12px; font-size:0.78rem; color:var(--text-secondary); cursor:pointer; transition:all 0.2s ease;">
              <strong>(${String.fromCharCode(65 + optIdx)})</strong> ${opt}
            </button>
          `).join('')}
        </div>

        <div class="quiz-explanation-box" style="display:none; margin-top:10px; padding:10px 12px; background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.25); border-radius:8px; font-size:0.76rem; color:#34d399; line-height:1.45;">
          <strong>💡 Solution Explanation:</strong> ${q.explanation}
        </div>
      </div>
    `).join('');

    body.innerHTML = `
      <!-- Exam Pattern Summary -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px; background:rgba(56,189,248,0.06); border:1px solid rgba(56,189,248,0.2); border-radius:12px; padding:12px;">
        <div>
          <div style="font-size:0.7rem; color:var(--text-muted);">TOTAL MARKS & DURATION</div>
          <div style="font-size:0.88rem; font-weight:700; color:var(--text-primary);">${exData.totalMarks} Marks · ${exData.duration}</div>
        </div>
        <div>
          <div style="font-size:0.7rem; color:var(--text-muted);">MARKING SCHEME</div>
          <div style="font-size:0.88rem; font-weight:700; color:#34d399;">${exData.markingScheme}</div>
        </div>
        <div>
          <div style="font-size:0.7rem; color:var(--text-muted);">CONDUCTING BODY</div>
          <div style="font-size:0.88rem; font-weight:700; color:var(--accent-cyan);">${exData.conductingBody || 'National NTA'}</div>
        </div>
      </div>

      <!-- Syllabus Sections -->
      <div>
        <div style="font-size:0.88rem; font-weight:800; color:var(--text-primary); margin-bottom:8px; display:flex; align-items:center; gap:6px;">
          <span>📚</span> Subject & Topic Syllabus Distribution
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:10px;">
          ${sectionsHtml}
        </div>
      </div>

      <!-- Interactive Sample Questions -->
      <div>
        <div style="font-size:0.88rem; font-weight:800; color:var(--text-primary); margin:8px 0; display:flex; align-items:center; gap:6px;">
          <span>🎯</span> Interactive Sample Questions (Click to Test Yourself)
        </div>
        <div>
          ${sampleQsHtml}
        </div>
      </div>
    `;

    // Bind option click listeners for instant quiz feedback
    body.querySelectorAll('.exam-sample-quiz-card').forEach(card => {
      const correctIdx = parseInt(card.getAttribute('data-correct-idx'));
      const scoreBadge = card.querySelector('.quiz-score-badge');
      const expBox = card.querySelector('.quiz-explanation-box');
      const optBtns = card.querySelectorAll('.quiz-option-btn');

      optBtns.forEach(btn => {
        btn.onclick = () => {
          const selectedIdx = parseInt(btn.getAttribute('data-opt-idx'));
          optBtns.forEach(b => b.disabled = true);

          if (selectedIdx === correctIdx) {
            btn.style.background = 'rgba(16,185,129,0.2)';
            btn.style.borderColor = '#34d399';
            btn.style.color = '#34d399';
            if (scoreBadge) scoreBadge.innerHTML = '<span style="color:#34d399; font-weight:800;">✅ Correct! +4 Marks</span>';
          } else {
            btn.style.background = 'rgba(244,63,94,0.2)';
            btn.style.borderColor = '#fb7185';
            btn.style.color = '#fb7185';
            optBtns[correctIdx].style.background = 'rgba(16,185,129,0.2)';
            optBtns[correctIdx].style.borderColor = '#34d399';
            optBtns[correctIdx].style.color = '#34d399';
            if (scoreBadge) scoreBadge.innerHTML = '<span style="color:#fb7185; font-weight:800;">❌ Incorrect (-1 Mark)</span>';
          }

          if (expBox) expBox.style.display = 'block';
        };
      });
    });

    modal.classList.add('active');
  }

  function openParentsGuideModal() {
    const modal = document.getElementById('parents-guide-modal');
    const body = document.getElementById('parents-guide-modal-body');
    if (!modal || !body) return;

    const data = window.PARENTS_GUIDE_DATA || {};

    const feeCardsHtml = (data.feeTiers || []).map(t => `
      <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-glass); border-radius:12px; padding:14px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <strong style="color:#38bdf8; font-size:0.88rem;">${t.type}</strong>
          <span style="font-size:0.75rem; font-weight:800; color:#34d399; background:rgba(16,185,129,0.12); padding:2px 8px; border-radius:6px;">${t.feeRange}</span>
        </div>
        <div style="font-size:0.75rem; color:var(--text-secondary); margin-bottom:4px;">
          <strong>Financial Aid:</strong> ${t.aidCoverage}
        </div>
        <div style="font-size:0.7rem; color:var(--text-muted);">
          <strong>Prominent Colleges:</strong> ${t.examples}
        </div>
      </div>
    `).join('');

    const rulesHtml = (data.goldenRules || []).map(r => `
      <div style="padding:10px 14px; background:rgba(255,255,255,0.02); border:1px solid var(--border-glass); border-radius:10px;">
        <div style="font-size:0.82rem; font-weight:800; color:#fbbf24; margin-bottom:2px;">${r.rule}</div>
        <div style="font-size:0.75rem; color:var(--text-secondary); line-height:1.45;">${r.desc}</div>
      </div>
    `).join('');

    body.innerHTML = `
      <div style="padding:14px; background:rgba(56,189,248,0.08); border:1px solid rgba(56,189,248,0.25); border-radius:12px; font-size:0.82rem; color:var(--text-secondary); line-height:1.5;">
        ${data.subtitle || 'Essential blueprint for parents on college fees, scholarships, job security, and modern career paths.'}
      </div>

      <div>
        <div style="font-size:0.92rem; font-weight:800; color:var(--text-primary); margin-bottom:10px; display:flex; align-items:center; gap:6px;">
          <span>💰</span> College Fee Tiers & Financial Aid Coverage
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:10px;">
          ${feeCardsHtml}
        </div>
      </div>

      <div>
        <div style="font-size:0.92rem; font-weight:800; color:var(--text-primary); margin:12px 0 8px; display:flex; align-items:center; gap:6px;">
          <span>🌟</span> 4 Golden Rules for Parents in 2026
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:10px;">
          ${rulesHtml}
        </div>
      </div>
    `;

    modal.classList.add('active');
  }

  window.openExamSyllabusModal = openExamSyllabusModal;
  window.openParentsGuideModal = openParentsGuideModal;

  // =========================================================================
  // PUBLIC API
  // =========================================================================
  return {
    onTabActivated,
    renderAptitudeTab,
    getAptState: () => aptState,
    setAptState: (s) => { aptState = s; },
    renderRoadmapTab,
    renderExamsTab,
    renderPredictorTab,
    renderAICounselorTab,
    renderScholarshipsTab,
    renderRoiTab,
    renderDossierTab,
    openExamSyllabusModal,
    openParentsGuideModal
  };

})();

window.CounselorModules = window.CounselorEngine;
window.renderAptitudeTab = window.CounselorEngine.renderAptitudeTab;

