// ==========================================================================
// CLASS-12 CAREER PATHWAYS SIMULATION - MASTER VECTOR & INFOGRAPHIC ENGINE
// Supporting all 960 Courses, 32 Domains, and 14 Career Clusters
// ==========================================================================

const SimulationEngine = (function() {
  // Pure SVG Vector Icons Library
  const ICONS = {
    graduationCap: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
    search: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
    compare: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>`,
    bookmark: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>`,
    bookmarkFilled: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>`,
    soundOn: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
    soundOff: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>`,
    sun: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
    moon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
    reset: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`,
    close: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
    clock: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    landmark: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>`,
    target: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
    award: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
    flame: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
    rocket: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
    star: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    copy: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,
    info: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
    arrowRight: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
    arrowLeft: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`,

    // Domain Specific Icons
    engineering: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 21v1"/><path d="M9 2v1"/></svg>`,
    architecture: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>`,
    polytechnic: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    computerApp: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    computerSci: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>`,
    atom: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"/><path d="M15.7 8.3c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"/></svg>`,
    dna: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/><path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/><path d="m17 6-2.5-2.5"/><path d="m14 8-1-1"/><path d="m7 18 2.5 2.5"/><path d="m3.5 14.5.5.5"/><path d="m20 9 .5.5"/><path d="m6.5 12.5 1 1"/><path d="m16.5 10.5 1 1"/><path d="m10 16 1 1"/></svg>`,
    microscope: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></svg>`,
    medicine: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>`,
    alliedHealth: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
    healthDiploma: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>`,
    sprout: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-13"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4.1 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4.1 1-4.9 2z"/></svg>`,
    briefcase: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
    chart: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>`,
    book: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>`,
    bookOpen: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    scale: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>`,
    palette: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
    video: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>`,
    utensils: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2"/><path d="M15 11v11"/><path d="M5 2v10a3 3 0 0 0 3 3 3 3 0 0 0 3-3V2"/><path d="M8 15v7"/></svg>`,
    shield: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    plane: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>`,
    anchor: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><line x1="12" x2="12" y1="22" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></svg>`,
    wrench: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    cogs: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`
  };

  const DOMAIN_ICON_KEYS = {
    'engineering': 'engineering',
    'architecture': 'architecture',
    'polytechnic': 'polytechnic',
    'computer-app': 'computerApp',
    'computer-sci': 'computerSci',
    'atom': 'atom',
    'dna': 'dna',
    'microscope': 'microscope',
    'medicine': 'medicine',
    'allied-health': 'alliedHealth',
    'health-diploma': 'healthDiploma',
    'sprout': 'sprout',
    'cogs': 'cogs',
    'heart-pulse': 'medicine',
    'briefcase': 'briefcase',
    'award': 'award',
    'chart': 'chart',
    'building': 'architecture',
    'book': 'book',
    'scale': 'scale',
    'palette': 'palette',
    'video': 'video',
    'utensils': 'utensils',
    'book-open': 'bookOpen',
    'activity': 'alliedHealth',
    'shield': 'shield',
    'plane': 'plane',
    'anchor': 'anchor',
    'wrench': 'wrench'
  };

  function getDomainIconSvg(iconKey) {
    const key = DOMAIN_ICON_KEYS[iconKey] || 'graduationCap';
    return ICONS[key] || ICONS.graduationCap;
  }

  const STATES = {
    CENTER: 'CENTER',
    HALF_MOON: 'HALF_MOON',
    DOMAIN_EXPANDED: 'DOMAIN_EXPANDED',
    SEARCH_ACTIVE: 'SEARCH_ACTIVE'
  };

  let currentState = STATES.CENTER;
  let activeDomainId = null;
  let activeClusterFilter = 'all';
  let activeGrowthFilter = 'all';
  let activeAwardFilter = 'all';
  let searchKeyword = '';
  
  let isInitialized = false;
  let shortlistedCourseIds = JSON.parse(localStorage.getItem('shortlisted_courses') || '[]').map(String);
  let compareCourseIds = [];
  let isSoundMuted = localStorage.getItem('sfx_muted') === 'true';

  let viewport, stage, svgCanvas, searchInput, breadcrumbsContainer, filterPillsContainer;
  let modalOverlay, modalContent, compareModalOverlay, shortlistDrawerOverlay;
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playSound(type) {
    if (isSoundMuted) return;
    try {
      initAudio();
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'expand') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(520, now + 0.2);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'card') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'back') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(659.25, now);
        osc.frequency.exponentialRampToValueAtTime(329.63, now + 0.12);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      }
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  function initParticleCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(width > 800 ? 55 : 25, 60);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.6 + 0.5,
        color: ['#3b82f6', '#8b5cf6', '#06b6d4', '#f43f5e', '#10b981', '#eab308', '#ec4899'][Math.floor(Math.random() * 7)],
        alpha: Math.random() * 0.4 + 0.2
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(148, 163, 184, ${0.07 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      requestAnimationFrame(animate);
    }
    animate();
  }

  function init() {
    viewport = document.querySelector('.simulation-viewport') || document.getElementById('tab-explore') || document.body;
    stage = document.getElementById('simulation-stage');
    svgCanvas = document.getElementById('simulation-svg');
    searchInput = document.getElementById('global-search');
    breadcrumbsContainer = document.getElementById('breadcrumbs');
    filterPillsContainer = document.getElementById('filter-pills');

    modalOverlay = document.getElementById('course-modal');
    compareModalOverlay = document.getElementById('compare-modal');
    shortlistDrawerOverlay = document.getElementById('shortlist-drawer');

    if (!stage || !svgCanvas) return;

    populateStaticIcons();
    initParticleCanvas();
    renderFilterPills();
    renderBreadcrumbs();

    if (!isInitialized) {
      isInitialized = true;
      setupEventListeners();
    }

    updateShortlistBadge();
    updateCompareBadge();

    renderCenterState();

    window.addEventListener('resize', () => {
      if (currentState === STATES.FULL_CIRCLE || currentState === STATES.HALF_MOON) {
        renderFullCircleState(false);
      } else if (currentState === STATES.CENTER) {
        renderCenterState();
      } else if (currentState === STATES.DOMAIN_EXPANDED && activeDomainId) {
        const dom = DOMAINS_CONFIG.find(d => d.id === activeDomainId);
        if (dom) {
          if (secondaryViewMode === 'orbit') renderSecondaryOrbitView(dom);
          else renderSecondaryGridView(dom);
        }
      }
    });
  }

  function populateStaticIcons() {
    const brandIcon = document.querySelector('.brand-icon');
    if (brandIcon) brandIcon.innerHTML = ICONS.graduationCap;

    const searchIcon = document.querySelector('.search-icon-left');
    if (searchIcon) searchIcon.innerHTML = ICONS.search;

    const compBtn = document.getElementById('btn-open-compare');
    if (compBtn) compBtn.querySelector('.icon-slot').innerHTML = ICONS.compare;

    const bookmarkBtn = document.getElementById('btn-open-shortlist');
    if (bookmarkBtn) bookmarkBtn.querySelector('.icon-slot').innerHTML = ICONS.bookmark;

    const soundBtn = document.getElementById('btn-toggle-sound');
    if (soundBtn) {
      const slot = soundBtn.querySelector('.icon-slot') || soundBtn;
      slot.innerHTML = isSoundMuted ? ICONS.soundOff : ICONS.soundOn;
    }

    const themeBtn = document.getElementById('btn-toggle-theme');
    if (themeBtn) {
      const isLight = document.body.getAttribute('data-theme') === 'light';
      const slot = themeBtn.querySelector('.icon-slot') || themeBtn;
      slot.innerHTML = isLight ? ICONS.sun : ICONS.moon;
    }

    const resetBtn = document.getElementById('btn-reset-center');
    if (resetBtn) resetBtn.querySelector('.btn-icon-svg').innerHTML = ICONS.reset;

    const helpBtn = document.getElementById('btn-tour-help');
    if (helpBtn) helpBtn.querySelector('.btn-icon-svg').innerHTML = ICONS.info;

    const arcBtn = document.getElementById('btn-view-all-domains');
    if (arcBtn) arcBtn.querySelector('.btn-icon-svg').innerHTML = ICONS.atom;
  }

  function renderFilterPills() {
    if (!filterPillsContainer) return;
    const clusters = typeof getFilteredClustersForCurrentSession === 'function' 
      ? getFilteredClustersForCurrentSession() 
      : CAREER_CLUSTERS;

    let html = `
      <div class="sub-option-card sidebar-cluster-pill ${activeClusterFilter === 'all' ? 'active' : ''}" data-cluster="all" title="View All Career Clusters (${clusters.length})">
        <div class="sub-option-main">
          <span class="sub-option-icon" style="color: #38bdf8;">🌟</span>
          <div class="sub-option-text">
            <span class="sub-option-name">All 14 Clusters</span>
            <span class="sub-option-desc">Complete 360° Galaxy Orbit</span>
          </div>
        </div>
        <span class="sub-option-badge">${clusters.length}</span>
      </div>
    `;
    
    clusters.forEach(cluster => {
      const activeClass = activeClusterFilter === cluster.name ? 'active' : '';
      const iconSvg = getDomainIconSvg(cluster.icon);
      html += `
        <div class="sub-option-card sidebar-cluster-pill ${activeClass}" data-cluster="${cluster.name}" title="${cluster.name} (${cluster.courseCount || ''} Degrees)">
          <div class="sub-option-main">
            <span class="sub-option-icon" style="color: ${cluster.color}">${iconSvg}</span>
            <div class="sub-option-text">
              <span class="sub-option-name">${cluster.name}</span>
              <span class="sub-option-desc">${cluster.courseCount ? cluster.courseCount + ' Degrees' : 'Explore Cluster'}</span>
            </div>
          </div>
          <span class="sub-option-action">+</span>
        </div>
      `;
    });

    filterPillsContainer.innerHTML = html;

    filterPillsContainer.querySelectorAll('.sidebar-cluster-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const cluster = btn.getAttribute('data-cluster');
        activeClusterFilter = cluster;
        playSound('click');
        renderFilterPills();
        if (window.switchTab) window.switchTab('explore');

        if (currentState === STATES.CENTER) {
          transitionToHalfMoon();
        } else if (currentState === STATES.HALF_MOON) {
          renderHalfMoonState(false);
        } else if (currentState === STATES.DOMAIN_EXPANDED) {
          renderExpandedCourses();
        }
      });
    });
  }

  function renderBreadcrumbs() {
    if (!breadcrumbsContainer) return;
    let html = `
      <div class="breadcrumb-item ${currentState === STATES.CENTER ? 'active' : ''}" id="bc-center">
        <span class="bc-icon">${ICONS.graduationCap}</span> Class 12
      </div>
    `;

    if (currentState === STATES.FULL_CIRCLE || currentState === STATES.HALF_MOON) {
      if (activeClusterScope) {
        html += `
          <span class="breadcrumb-separator">&rsaquo;</span>
          <div class="breadcrumb-item" id="bc-all-clusters">
            <span class="bc-icon">${ICONS.atom}</span> Clusters
          </div>
          <span class="breadcrumb-separator">&rsaquo;</span>
          <div class="breadcrumb-item active" style="color: ${activeClusterScope.color}">
            <span class="bc-icon">${getDomainIconSvg(activeClusterScope.icon)}</span> ${activeClusterScope.name}
          </div>
        `;
      } else {
        html += `
          <span class="breadcrumb-separator">&rsaquo;</span>
          <div class="breadcrumb-item active">
            <span class="bc-icon">${ICONS.atom}</span> ${exploreViewMode === 'clusters' ? '14 Clusters' : exploreViewMode === 'satellites' ? '32 Satellites' : 'Matrix Catalog'}
          </div>
        `;
      }
    } else if (currentState === STATES.DOMAIN_EXPANDED && activeDomainId) {
      const dom = DOMAINS_CONFIG.find(d => d.id === activeDomainId);
      html += `
        <span class="breadcrumb-separator">&rsaquo;</span>
        <div class="breadcrumb-item" id="bc-domains">
          <span class="bc-icon">${ICONS.atom}</span> Clusters
        </div>
        <span class="breadcrumb-separator">&rsaquo;</span>
        <div class="breadcrumb-item active" style="color: ${dom ? dom.color : 'var(--accent-cyan)'}">
          <span class="bc-icon">${dom ? getDomainIconSvg(dom.icon) : ''}</span> ${dom ? dom.name : 'Domain'}
        </div>
      `;
    }

    breadcrumbsContainer.innerHTML = html;

    const bcCenter = document.getElementById('bc-center');
    if (bcCenter) {
      bcCenter.addEventListener('click', () => {
        if (currentState !== STATES.CENTER) {
          playSound('back');
          transitionToCenter();
        }
      });
    }

    const bcAllClusters = document.getElementById('bc-all-clusters');
    if (bcAllClusters) {
      bcAllClusters.addEventListener('click', () => {
        playSound('back');
        activeClusterScope = null;
        renderBreadcrumbs();
        renderFullCircleState(true);
      });
    }

    const bcDomains = document.getElementById('bc-domains');
    if (bcDomains) {
      bcDomains.addEventListener('click', () => {
        playSound('back');
        transitionToFullCircle();
      });
    }
  }

  // ==========================================================================
  // STATE 0: CENTER ONLY
  // ==========================================================================
  function transitionToCenter() {
    renderCenterState();
  }

  function renderCenterState() {
    currentState = STATES.CENTER;
    activeDomainId = null;
    renderBreadcrumbs();

    svgCanvas.innerHTML = '';
    stage.innerHTML = '';

    const hub = document.createElement('div');
    hub.className = 'center-hub-node';
    hub.style.left = '50%';
    hub.style.top = '50%';
    hub.innerHTML = `
      <div class="center-hub-icon-svg">${ICONS.graduationCap}</div>
      <div class="center-hub-title">CLASS-12</div>
      <div class="center-hub-subtitle">960 Programmes &bull; 32 Domains &bull; 14 Clusters</div>
      <div class="center-hub-hint">
        <span style="display:inline-block; margin-right:4px;">${ICONS.arrowRight}</span> Click to Reveal All Post-12th Options (360° Galaxy Orbit)
      </div>
    `;

    hub.addEventListener('click', () => {
      playSound('expand');
      transitionToFullCircle();
    });

    stage.appendChild(hub);
  }

  let exploreViewMode = 'clusters'; // 'clusters' | 'satellites' | 'matrix'
  let activeClusterScope = null; // null | cluster object
  let secondaryViewMode = 'orbit'; // 'orbit' | 'grid'

  // ==========================================================================
  // STATE 1: 360° VISUAL EXPLORE GALAXY (14 Clusters / 32 Satellites / Matrix)
  // ==========================================================================
  function transitionToFullCircle() {
    currentState = STATES.FULL_CIRCLE;
    activeDomainId = null;
    activeClusterScope = null;
    renderBreadcrumbs();
    renderFullCircleState(true);
  }

  // Backwards compatibility alias
  function transitionToHalfMoon() {
    transitionToFullCircle();
  }

  function renderFullCircleState(animateEntrance = false) {
    currentState = STATES.FULL_CIRCLE;
    renderBreadcrumbs();

    svgCanvas.innerHTML = '';
    stage.innerHTML = '';

    const width = (viewport && viewport.clientWidth) || stage.clientWidth || window.innerWidth;
    const height = (viewport && viewport.clientHeight) || stage.clientHeight || (window.innerHeight - 140);
    const cx = width / 2;
    const cy = height / 2;

    // 1. Floating Explore Mode Switcher
    const modeBar = document.createElement('div');
    modeBar.className = 'explore-mode-bar';
    modeBar.innerHTML = `
      <button class="explore-mode-btn ${exploreViewMode === 'clusters' ? 'active' : ''}" id="btn-mode-clusters" title="14 Career Clusters Solar System">
        <span>🪐</span> 14 Clusters
      </button>
      <button class="explore-mode-btn ${exploreViewMode === 'satellites' ? 'active' : ''}" id="btn-mode-satellites" title="32 Compact Planet Orbs">
        <span>🌌</span> 32 Satellites
      </button>
      <button class="explore-mode-btn ${exploreViewMode === 'matrix' ? 'active' : ''}" id="btn-mode-matrix" title="Structured Grid Catalog">
        <span>⊞</span> Matrix Catalog
      </button>
    `;
    stage.appendChild(modeBar);

    modeBar.querySelector('#btn-mode-clusters').addEventListener('click', () => {
      exploreViewMode = 'clusters';
      activeClusterScope = null;
      playSound('click');
      renderFullCircleState();
    });
    modeBar.querySelector('#btn-mode-satellites').addEventListener('click', () => {
      exploreViewMode = 'satellites';
      activeClusterScope = null;
      playSound('click');
      renderFullCircleState();
    });
    modeBar.querySelector('#btn-mode-matrix').addEventListener('click', () => {
      exploreViewMode = 'matrix';
      activeClusterScope = null;
      playSound('click');
      renderFullCircleState();
    });

    // --------------------------------------------------------------------------
    // MODE A: 14 CAREER CLUSTERS SOLAR SYSTEM (Hierarchical & Zero Clutter)
    // --------------------------------------------------------------------------
    if (exploreViewMode === 'clusters') {
      if (activeClusterScope === null) {
        // Class-12 Center Hub
        const hub = document.createElement('div');
        hub.className = 'center-hub-node docked';
        hub.style.left = `${cx}px`;
        hub.style.top = `${cy}px`;
        hub.innerHTML = `
          <div class="center-hub-icon-svg" style="width:24px; height:24px;">${ICONS.graduationCap}</div>
          <div class="center-hub-title" style="font-size:0.75rem;">CLASS-12</div>
        `;
        hub.addEventListener('click', () => {
          playSound('back');
          renderCenterState();
        });
        stage.appendChild(hub);

        const radius = Math.min(width, height) * 0.36;
        let svgLines = `<circle cx="${cx}" cy="${cy}" r="${radius}" class="orbit-track-circle" />`;

        const clustersToRender = typeof getFilteredClustersForCurrentSession === 'function' 
          ? getFilteredClustersForCurrentSession() 
          : CAREER_CLUSTERS;
        const totalClusters = clustersToRender.length;
        clustersToRender.forEach((cluster, idx) => {
          const angleDeg = totalClusters === 1 ? -90 : (idx * (360 / totalClusters)) - 90;
          const angleRad = (angleDeg * Math.PI) / 180;
          const dx = cx + radius * Math.cos(angleRad);
          const dy = cy + radius * Math.sin(angleRad);

          svgLines += `
            <path id="line-cluster-${cluster.id}" 
                  d="M ${cx},${cy} L ${dx},${dy}" 
                  class="connection-line" 
                  style="stroke: ${cluster.color}; stroke-opacity: 0.35;" />
          `;

          const node = document.createElement('div');
          node.className = 'cluster-planet-node';
          node.style.setProperty('--cluster-color', cluster.color);
          node.style.setProperty('--cluster-glow', cluster.glowColor || `${cluster.color}66`);
          node.style.left = `${dx}px`;
          node.style.top = `${dy}px`;

          if (animateEntrance) {
            node.style.opacity = '0';
            node.style.transform = 'translate(-50%, -50%) scale(0.3)';
            setTimeout(() => {
              node.style.opacity = '1';
              node.style.transform = 'translate(-50%, -50%) scale(1)';
            }, idx * 25 + 20);
          }

          const availableDomains = typeof getFilteredDomainsForCurrentSession === 'function'
            ? getFilteredDomainsForCurrentSession()
            : DOMAINS_CONFIG;
          const domainsInCluster = availableDomains.filter(d => d.clusterId === cluster.id || d.cluster.toLowerCase() === cluster.name.toLowerCase());

          node.innerHTML = `
            <div class="cluster-planet-icon" style="background: linear-gradient(135deg, ${cluster.color}, #090e17)">
              ${getDomainIconSvg(cluster.icon)}
            </div>
            <div class="cluster-planet-title">${cluster.name}</div>
            <div class="cluster-planet-badge">${domainsInCluster.length || cluster.domainCount} Domains</div>
          `;

          node.addEventListener('mouseenter', () => {
            const line = document.getElementById(`line-cluster-${cluster.id}`);
            if (line) {
              line.classList.add('active');
              line.style.strokeOpacity = '0.95';
            }
          });

          node.addEventListener('mouseleave', () => {
            const line = document.getElementById(`line-cluster-${cluster.id}`);
            if (line) {
              line.classList.remove('active');
              line.style.strokeOpacity = '0.35';
            }
          });

          node.addEventListener('click', () => {
            playSound('expand');
            activeClusterScope = cluster;
            renderBreadcrumbs();
            renderFullCircleState(true);
          });

          stage.appendChild(node);
        });

        svgCanvas.innerHTML = svgLines;
      } else {
        // Inside Selected Cluster: Central Cluster Sun + 2-4 Spacious Domains
        const cluster = activeClusterScope;
        const availableDomains = typeof getFilteredDomainsForCurrentSession === 'function'
          ? getFilteredDomainsForCurrentSession()
          : DOMAINS_CONFIG;
        const domainsInCluster = availableDomains.filter(d => d.clusterId === cluster.id || d.cluster.toLowerCase() === cluster.name.toLowerCase());

        // Back button to 14 Clusters
        const backPill = document.createElement('button');
        backPill.className = 'btn-back-galaxy';
        backPill.style.position = 'absolute';
        backPill.style.top = '14px';
        backPill.style.left = '24px';
        backPill.style.zIndex = '90';
        backPill.innerHTML = `<span class="btn-icon-svg">${ICONS.arrowLeft}</span> ‹ Back to All 14 Clusters`;
        backPill.addEventListener('click', () => {
          playSound('back');
          activeClusterScope = null;
          renderBreadcrumbs();
          renderFullCircleState(true);
        });
        stage.appendChild(backPill);

        // Center Cluster Sun
        const sun = document.createElement('div');
        sun.className = 'domain-sun-node';
        sun.style.setProperty('--domain-color', cluster.color);
        sun.style.setProperty('--domain-glow', cluster.glowColor || `${cluster.color}66`);
        sun.style.left = `${cx}px`;
        sun.style.top = `${cy}px`;
        sun.innerHTML = `
          <div class="domain-sun-icon" style="background: linear-gradient(135deg, ${cluster.color}, #090e17)">
            ${getDomainIconSvg(cluster.icon)}
          </div>
          <div class="domain-sun-title">${cluster.name}</div>
          <div class="domain-sun-stats">${domainsInCluster.length} Domains &bull; ${cluster.courseCount || 60} Courses</div>
        `;
        sun.addEventListener('click', () => {
          playSound('back');
          activeClusterScope = null;
          renderBreadcrumbs();
          renderFullCircleState(true);
        });
        stage.appendChild(sun);

        const radius = Math.min(width, height) * 0.35;
        let svgLines = `<circle cx="${cx}" cy="${cy}" r="${radius}" class="orbit-track-circle" />`;

        const totalDoms = domainsInCluster.length;
        domainsInCluster.forEach((domain, idx) => {
          const angleDeg = totalDoms === 1 ? -90 : (idx * (360 / totalDoms)) - 90;
          const angleRad = (angleDeg * Math.PI) / 180;
          const dx = cx + radius * Math.cos(angleRad);
          const dy = cy + radius * Math.sin(angleRad);

          svgLines += `
            <path id="line-domain-${domain.id}" 
                  d="M ${cx},${cy} L ${dx},${dy}" 
                  class="connection-line" 
                  style="stroke: ${domain.color}; stroke-opacity: 0.4;" />
          `;

          const card = document.createElement('div');
          card.className = 'cluster-domain-card';
          card.style.setProperty('--domain-color', domain.color);
          card.style.setProperty('--domain-glow', `${domain.color}66`);
          card.style.left = `${dx}px`;
          card.style.top = `${dy}px`;

          card.innerHTML = `
            <div class="cluster-domain-header">
              <div class="cluster-domain-icon" style="background: linear-gradient(135deg, ${domain.color}, #090e17)">
                ${getDomainIconSvg(domain.icon)}
              </div>
              <div>
                <div class="cluster-domain-title">${domain.name}</div>
                <div style="font-size:0.65rem; color:${domain.color}; font-weight:700;">${domain.badge}</div>
              </div>
            </div>
            <div class="cluster-domain-meta">
              <span><span>⏱️ Duration</span> <strong>${domain.avgDuration}</strong></span>
              <span><span>🚀 Growth</span> <strong>${domain.growthRate}</strong></span>
              <span><span>🎯 Exams</span> <strong style="color:var(--accent-cyan); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:80px;" title="${domain.keyExams}">${domain.keyExams.split(',')[0]}</strong></span>
            </div>
          `;

          card.addEventListener('mouseenter', () => {
            const line = document.getElementById(`line-domain-${domain.id}`);
            if (line) {
              line.classList.add('active');
              line.style.strokeOpacity = '0.95';
            }
          });

          card.addEventListener('mouseleave', () => {
            const line = document.getElementById(`line-domain-${domain.id}`);
            if (line) {
              line.classList.remove('active');
              line.style.strokeOpacity = '0.4';
            }
          });

          card.addEventListener('click', () => {
            playSound('expand');
            transitionToDomainExpanded(domain.id);
          });

          stage.appendChild(card);
        });

        svgCanvas.innerHTML = svgLines;
      }
    } 
    // --------------------------------------------------------------------------
    // MODE B: 32 SATELLITE CONSTELLATION (Compact Glowing Orbs - Zero Overlap)
    // --------------------------------------------------------------------------
    else if (exploreViewMode === 'satellites') {
      const hub = document.createElement('div');
      hub.className = 'center-hub-node docked';
      hub.style.left = `${cx}px`;
      hub.style.top = `${cy}px`;
      hub.innerHTML = `
        <div class="center-hub-icon-svg" style="width:24px; height:24px;">${ICONS.graduationCap}</div>
        <div class="center-hub-title" style="font-size:0.75rem;">CLASS-12</div>
      `;
      hub.addEventListener('click', () => {
        playSound('back');
        renderCenterState();
      });
      stage.appendChild(hub);

      const r1 = Math.min(width, height) * 0.22;
      const r2 = Math.min(width, height) * 0.35;
      const r3 = Math.min(width, height) * 0.47;

      let svgLines = `
        <circle cx="${cx}" cy="${cy}" r="${r1}" class="orbit-track-circle" />
        <circle cx="${cx}" cy="${cy}" r="${r2}" class="orbit-track-circle" />
        <circle cx="${cx}" cy="${cy}" r="${r3}" class="orbit-track-circle" />
      `;

      const availableDomains = typeof getFilteredDomainsForCurrentSession === 'function'
        ? getFilteredDomainsForCurrentSession()
        : DOMAINS_CONFIG;

      const domainsToRender = activeClusterFilter === 'all' 
        ? availableDomains 
        : availableDomains.filter(d => d.cluster === activeClusterFilter);

      const total = domainsToRender.length;

      domainsToRender.forEach((domain, idx) => {
        const ringIdx = idx % 3; // 0, 1, 2
        const currentRadius = ringIdx === 0 ? r1 : ringIdx === 1 ? r2 : r3;
        const countInRing = Math.ceil(total / 3);
        const ringPos = Math.floor(idx / 3);
        const baseAngle = (ringPos * (360 / countInRing)) - 90;
        const angleOffset = ringIdx === 1 ? (120 / countInRing) : ringIdx === 2 ? (240 / countInRing) : 0;
        const angleDeg = baseAngle + angleOffset;
        const angleRad = (angleDeg * Math.PI) / 180;

        const dx = cx + currentRadius * Math.cos(angleRad);
        const dy = cy + currentRadius * Math.sin(angleRad);

        svgLines += `
          <path id="line-orb-${domain.id}" 
                d="M ${cx},${cy} L ${dx},${dy}" 
                class="connection-line" 
                style="stroke: ${domain.color}; stroke-opacity: 0.25;" />
        `;

        const orb = document.createElement('div');
        orb.className = 'satellite-orb-node';
        orb.style.setProperty('--domain-color', domain.color);
        orb.style.setProperty('--domain-glow', `${domain.color}66`);
        orb.style.left = `${dx}px`;
        orb.style.top = `${dy}px`;

        orb.innerHTML = `
          <span style="display:inline-flex; width:22px; height:22px;">${getDomainIconSvg(domain.icon)}</span>
          <span class="satellite-orb-label">${domain.name}</span>
          
          <div class="domain-infographic-preview">
            <div style="font-weight:800; color:var(--text-primary); margin-bottom:4px;">${domain.name}</div>
            <div class="preview-metric">
              <span>⏱️ Duration:</span> <strong>${domain.avgDuration}</strong>
            </div>
            <div class="preview-metric">
              <span>🚀 Growth:</span> <strong>${domain.growthRate}</strong>
            </div>
            <div class="preview-metric">
              <span>🎯 Exams:</span> <span class="preview-exam">${domain.keyExams}</span>
            </div>
          </div>
        `;

        orb.addEventListener('mouseenter', () => {
          const line = document.getElementById(`line-orb-${domain.id}`);
          if (line) {
            line.classList.add('active');
            line.style.strokeOpacity = '0.95';
          }
        });

        orb.addEventListener('mouseleave', () => {
          const line = document.getElementById(`line-orb-${domain.id}`);
          if (line) {
            line.classList.remove('active');
            line.style.strokeOpacity = '0.25';
          }
        });

        orb.addEventListener('click', () => {
          playSound('expand');
          transitionToDomainExpanded(domain.id);
        });

        stage.appendChild(orb);
      });

      svgCanvas.innerHTML = svgLines;
    }
    // --------------------------------------------------------------------------
    // MODE C: MATRIX CATALOG GRID
    // --------------------------------------------------------------------------
    else if (exploreViewMode === 'matrix') {
      const grid = document.createElement('div');
      grid.className = 'domain-matrix-grid';

      const availableDomains = typeof getFilteredDomainsForCurrentSession === 'function'
        ? getFilteredDomainsForCurrentSession()
        : DOMAINS_CONFIG;

      const domainsToRender = activeClusterFilter === 'all' 
        ? availableDomains 
        : availableDomains.filter(d => d.cluster === activeClusterFilter);

      domainsToRender.forEach(domain => {
        const card = document.createElement('div');
        card.className = 'matrix-domain-card';
        card.style.setProperty('--domain-color', domain.color);
        card.style.setProperty('--domain-glow', `${domain.color}66`);

        card.innerHTML = `
          <div style="display:flex; align-items:center; gap:10px;">
            <div class="cluster-domain-icon" style="background: linear-gradient(135deg, ${domain.color}, #090e17); width:36px; height:36px;">
              ${getDomainIconSvg(domain.icon)}
            </div>
            <div>
              <div style="font-weight:800; font-size:0.88rem; color:var(--text-primary);">${domain.name}</div>
              <div style="font-size:0.68rem; color:var(--text-muted);">${domain.cluster}</div>
            </div>
          </div>
          <p style="font-size:0.74rem; color:var(--text-secondary); line-height:1.3; margin:4px 0;">${domain.shortDesc}</p>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:auto; padding-top:8px; border-top:1px solid rgba(255,255,255,0.06); font-size:0.7rem;">
            <span style="color:${domain.color}; font-weight:700;">${domain.badge}</span>
            <span style="color:var(--accent-cyan); font-weight:600;">Explore Courses &rarr;</span>
          </div>
        `;

        card.addEventListener('click', () => {
          playSound('expand');
          transitionToDomainExpanded(domain.id);
        });

        grid.appendChild(card);
      });

      stage.appendChild(grid);
    }
  }

  // ==========================================================================
  // STATE 2: SECONDARY RADIAL ORBIT SYSTEM (Primary Domains Completely Hidden)
  // ==========================================================================
  function transitionToDomainExpanded(domainId) {
    currentState = STATES.DOMAIN_EXPANDED;
    activeDomainId = domainId;
    renderBreadcrumbs();

    // Completely remove primary domains and clear canvas
    svgCanvas.innerHTML = '';
    stage.innerHTML = '';

    const domain = DOMAINS_CONFIG.find(d => d.id === domainId);
    if (!domain) return;

    if (secondaryViewMode === 'orbit') {
      renderSecondaryOrbitView(domain);
    } else {
      renderSecondaryGridView(domain);
    }
  }

  function renderSecondaryOrbitView(domain) {
    svgCanvas.innerHTML = '';
    stage.innerHTML = '';

    const width = (viewport && viewport.clientWidth) || stage.clientWidth || window.innerWidth;
    const height = (viewport && viewport.clientHeight) || stage.clientHeight || (window.innerHeight - 140);
    const cx = width / 2;
    const cy = height / 2;

    let courses = RAW_COURSES.filter(c => c.domain.toLowerCase() === domain.name.toLowerCase());
    const activeStream = typeof getActiveStudentStream === 'function' ? getActiveStudentStream() : '';
    if (activeStream && typeof isCourseEligibleForStream === 'function') {
      courses = courses.filter(c => isCourseEligibleForStream(c, activeStream));
    }
    if (activeGrowthFilter !== 'all') {
      courses = courses.filter(c => c.growthIndicator === activeGrowthFilter);
    }
    if (activeAwardFilter !== 'all') {
      courses = courses.filter(c => c.awardType.toLowerCase() === activeAwardFilter.toLowerCase());
    }

    // 1. Top Navigation Bar
    const topBar = document.createElement('div');
    topBar.className = 'secondary-orbit-header';
    topBar.innerHTML = `
      <button class="btn-back-galaxy" id="btn-back-to-domains">
        <span class="btn-icon-svg">${ICONS.arrowLeft}</span> ‹ Back to All Domains (360° View)
      </button>
      <div class="view-mode-toggle">
        <button class="btn-view-mode active" id="btn-mode-orbit">🪐 360° Radial Orbit</button>
        <button class="btn-view-mode" id="btn-mode-grid">⊞ Matrix Grid</button>
      </div>
      <div style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">
        <strong style="color:var(--text-primary);">${courses.length}</strong> Programmes in <span style="color:${domain.color}">${domain.name}</span>
      </div>
    `;
    stage.appendChild(topBar);

    topBar.querySelector('#btn-back-to-domains').addEventListener('click', () => {
      playSound('back');
      transitionToFullCircle();
    });

    topBar.querySelector('#btn-mode-orbit').addEventListener('click', () => {
      secondaryViewMode = 'orbit';
      renderSecondaryOrbitView(domain);
    });

    topBar.querySelector('#btn-mode-grid').addEventListener('click', () => {
      secondaryViewMode = 'grid';
      renderSecondaryGridView(domain);
    });

    // 2. Central Domain Sun Node (Focal Domain)
    const sun = document.createElement('div');
    sun.className = 'domain-sun-node';
    sun.style.setProperty('--domain-color', domain.color);
    sun.style.setProperty('--domain-glow', `${domain.color}66`);
    sun.style.left = `${cx}px`;
    sun.style.top = `${cy}px`;
    sun.innerHTML = `
      <div class="domain-sun-icon" style="background: linear-gradient(135deg, ${domain.color}, #090e17)">
        ${getDomainIconSvg(domain.icon)}
      </div>
      <div class="domain-sun-title">${domain.name}</div>
      <div class="domain-sun-stats">${courses.length} Programmes</div>
      <div style="font-size:0.6rem; color:var(--text-muted); margin-top:2px;">${domain.avgDuration} • ${domain.growthRate}</div>
    `;
    sun.addEventListener('click', () => {
      playSound('back');
      transitionToFullCircle();
    });
    stage.appendChild(sun);

    if (courses.length === 0) {
      const emptyBox = document.createElement('div');
      emptyBox.style.cssText = 'text-align:center; padding:36px 24px; color:var(--text-muted); position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); max-width:480px; width:90%; background:rgba(15,23,42,0.88); border:1px solid var(--border-glass); border-radius:18px; backdrop-filter:blur(14px); z-index:10;';
      emptyBox.innerHTML = `
        <div style="font-size:2.4rem; margin-bottom:10px;">🚫</div>
        <h3 style="color:var(--text-primary); font-size:1.1rem; margin-bottom:6px;">No Eligible Courses in this Domain</h3>
        <p style="font-size:0.8rem; line-height:1.5; color:var(--text-secondary); margin-bottom:16px;">
          The programmes in <strong>${domain.name}</strong> require qualifying subjects outside your <strong>${activeStream || '12th'}</strong> stream.
        </p>
        <button class="btn-primary" id="btn-empty-back-domains" style="padding:9px 20px; font-size:0.82rem; cursor:pointer;">
          ‹ Return to All Domains
        </button>
      `;
      stage.appendChild(emptyBox);
      emptyBox.querySelector('#btn-empty-back-domains').addEventListener('click', () => {
        playSound('back');
        transitionToFullCircle();
      });
      return;
    }

    // 3. Orbit Radii for secondary courses
    const totalCourses = courses.length;
    const r1 = Math.min(width, height) * 0.24; // Inner ring
    const r2 = Math.min(width, height) * 0.36; // Middle ring
    const r3 = Math.min(width, height) * 0.47; // Outer ring

    let svgLines = `
      <circle cx="${cx}" cy="${cy}" r="${r1}" class="orbit-track-circle secondary" />
      <circle cx="${cx}" cy="${cy}" r="${r2}" class="orbit-track-circle secondary" />
      <circle cx="${cx}" cy="${cy}" r="${r3}" class="orbit-track-circle secondary" />
    `;

    courses.forEach((c, idx) => {
      const ringIndex = idx % 3; // 0, 1, 2
      const currentRadius = ringIndex === 0 ? r1 : ringIndex === 1 ? r2 : r3;
      const countInRing = Math.ceil(totalCourses / 3);
      const ringPosition = Math.floor(idx / 3);
      const baseAngle = (ringPosition * (360 / countInRing)) - 90;
      const angleOffset = ringIndex === 1 ? (120 / countInRing) : ringIndex === 2 ? (240 / countInRing) : 0;
      const angleDeg = baseAngle + angleOffset;
      const angleRad = (angleDeg * Math.PI) / 180;

      const dx = cx + currentRadius * Math.cos(angleRad);
      const dy = cy + currentRadius * Math.sin(angleRad);

      svgLines += `
        <path id="line-course-${c.id}" 
              d="M ${cx},${cy} L ${dx},${dy}" 
              class="connection-line" 
              style="stroke: ${domain.color}; stroke-opacity: 0.25;" />
      `;

      const planet = document.createElement('div');
      planet.className = 'course-orbit-node';
      planet.style.setProperty('--domain-color', domain.color);
      planet.style.setProperty('--domain-glow', `${domain.color}44`);
      planet.style.left = `${dx}px`;
      planet.style.top = `${dy}px`;

      const isBookmarked = shortlistedCourseIds.includes(c.id);
      const isCompared = compareCourseIds.includes(c.id);

      planet.innerHTML = `
        <div class="course-orbit-header">
          <span class="course-orbit-badge">${c.awardType || 'UG'}</span>
          <span class="course-orbit-duration">${c.duration}</span>
        </div>
        <div class="course-orbit-title" title="${c.course}">${c.course}</div>
        <div class="course-orbit-footer">
          <span class="course-orbit-exam" title="${c.entranceTests}">${c.entranceTests.split(';')[0].trim()}</span>
          <div class="course-orbit-actions">
            <button class="course-orbit-btn btn-orbit-compare ${isCompared ? 'active' : ''}" title="Compare">${ICONS.compare}</button>
            <button class="course-orbit-btn btn-orbit-shortlist ${isBookmarked ? 'active' : ''}" title="Bookmark">${isBookmarked ? ICONS.bookmarkFilled : ICONS.bookmark}</button>
          </div>
        </div>
      `;

      planet.addEventListener('mouseenter', () => {
        const line = document.getElementById(`line-course-${c.id}`);
        if (line) {
          line.classList.add('active');
          line.style.strokeOpacity = '0.9';
        }
      });

      planet.addEventListener('mouseleave', () => {
        const line = document.getElementById(`line-course-${c.id}`);
        if (line) {
          line.classList.remove('active');
          line.style.strokeOpacity = '0.25';
        }
      });

      planet.addEventListener('click', (e) => {
        if (e.target.closest('.course-orbit-btn')) return;
        playSound('card');
        openCourseModal(c);
      });

      planet.querySelector('.btn-orbit-compare').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleCompare(c.id);
        renderSecondaryOrbitView(domain);
      });

      planet.querySelector('.btn-orbit-shortlist').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleShortlist(c.id);
        renderSecondaryOrbitView(domain);
      });

      stage.appendChild(planet);
    });

    svgCanvas.innerHTML = svgLines;
  }

  function renderSecondaryGridView(domain) {
    svgCanvas.innerHTML = '';
    stage.innerHTML = '';

    // 1. Top Navigation Bar
    const topBar = document.createElement('div');
    topBar.className = 'secondary-orbit-header';
    topBar.style.position = 'relative';
    topBar.style.top = '0';
    topBar.style.marginBottom = '16px';
    topBar.innerHTML = `
      <button class="btn-back-galaxy" id="btn-back-to-domains-grid">
        <span class="btn-icon-svg">${ICONS.arrowLeft}</span> ‹ Back to All Domains (360° View)
      </button>
      <div class="view-mode-toggle">
        <button class="btn-view-mode" id="btn-grid-mode-orbit">🪐 360° Radial Orbit</button>
        <button class="btn-view-mode active" id="btn-grid-mode-grid">⊞ Matrix Grid</button>
      </div>
      <div style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">
        <strong style="color:var(--text-primary);">${domain.name}</strong> • ${domain.cluster}
      </div>
    `;
    stage.appendChild(topBar);

    topBar.querySelector('#btn-back-to-domains-grid').addEventListener('click', () => {
      playSound('back');
      transitionToFullCircle();
    });

    topBar.querySelector('#btn-grid-mode-orbit').addEventListener('click', () => {
      secondaryViewMode = 'orbit';
      renderSecondaryOrbitView(domain);
    });

    renderExpandedCourses();
  }

  function renderExpandedCourses() {
    const existingContainer = document.querySelector('.courses-container');
    if (existingContainer) existingContainer.remove();

    const domain = DOMAINS_CONFIG.find(d => d.id === activeDomainId);
    if (!domain) return;

    let courses = RAW_COURSES.filter(c => c.domain.toLowerCase() === domain.name.toLowerCase());
    const activeStream = typeof getActiveStudentStream === 'function' ? getActiveStudentStream() : '';
    if (activeStream && typeof isCourseEligibleForStream === 'function') {
      courses = courses.filter(c => isCourseEligibleForStream(c, activeStream));
    }

    if (activeGrowthFilter !== 'all') {
      courses = courses.filter(c => c.growthIndicator === activeGrowthFilter);
    }
    if (activeAwardFilter !== 'all') {
      courses = courses.filter(c => c.awardType.toLowerCase() === activeAwardFilter.toLowerCase());
    }

    const container = document.createElement('div');
    container.className = 'courses-container';

    if (courses.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
          <h3>No programmes match the current filter.</h3>
          <p style="margin-top: 8px;">Try selecting "All Clusters" or resetting filters.</p>
        </div>
      `;
      stage.appendChild(container);
      return;
    }

    courses.forEach((c, idx) => {
      const card = document.createElement('div');
      card.className = 'course-card';
      card.style.setProperty('--domain-color', domain.color);
      card.style.setProperty('--domain-glow', `${domain.color}44`);
      card.style.animationDelay = `${Math.min(idx * 15, 300)}ms`;

      let growthClass = 'growth-established';
      let growthSvg = ICONS.star;
      if (c.growthIndicator === 'Very High Growth') {
        growthClass = 'growth-very-high';
        growthSvg = ICONS.flame;
      } else if (c.growthIndicator === 'High Growth') {
        growthClass = 'growth-high';
        growthSvg = ICONS.rocket;
      }

      const isBookmarked = shortlistedCourseIds.includes(c.id);
      const isCompared = compareCourseIds.includes(c.id);
      const recData = getInternshipsAndRecruitersForCourse(c);
      const topRecruitersStr = (recData && recData.topRecruiters) ? recData.topRecruiters.slice(0, 3).join(', ') : '';

      card.innerHTML = `
        <div>
          <div class="course-card-header">
            <span class="course-badge-type">${c.awardType || 'Degree'}</span>
            <span class="course-growth-tag ${growthClass}">
              <span class="growth-icon-svg">${growthSvg}</span>
              ${c.growthIndicator}
            </span>
          </div>
          <h3 class="course-title">${c.course}</h3>
        </div>

        <div class="card-recruiters-badge" title="Top Recruiting Companies: ${recData?.topRecruiters?.join(', ')}">
          <span style="font-size: 0.8rem;">🏢</span>
          <span style="font-size: 0.72rem; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #38bdf8;">
            ${topRecruitersStr || 'Industry Leaders'}
          </span>
        </div>

        <div class="course-meta-tags">
          <span class="meta-chip">
            <span class="chip-icon">${ICONS.clock}</span> ${c.duration}
          </span>
          <span class="meta-chip">
            <span class="chip-icon">${ICONS.landmark}</span> ${c.regulator.split('/')[0].trim()}
          </span>
        </div>

        <div class="course-card-footer">
          <span style="font-family: var(--font-mono); font-size:0.7rem;">#${c.id}</span>
          <div style="display: flex; gap: 6px;">
            <button class="btn-card-action btn-compare-toggle" title="Add to Compare">
              <span class="btn-icon-svg">${isCompared ? ICONS.compare : ICONS.compare}</span>
              ${isCompared ? 'Added' : 'Compare'}
            </button>
            <button class="btn-card-action btn-shortlist-toggle" title="Bookmark">
              <span class="btn-icon-svg">${isBookmarked ? ICONS.bookmarkFilled : ICONS.bookmark}</span>
              ${isBookmarked ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      `;

      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-card-action')) return;
        playSound('card');
        openCourseModal(c);
      });

      const bookmarkBtn = card.querySelector('.btn-shortlist-toggle');
      bookmarkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleShortlist(c.id);
        renderExpandedCourses();
      });

      const compBtn = card.querySelector('.btn-compare-toggle');
      compBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleCompare(c.id);
        renderExpandedCourses();
      });

      container.appendChild(card);
    });

    stage.appendChild(container);
  }

  // ==========================================================================
  // LOCATION-WISE TOP COLLEGES KNOWLEDGE BASE (North, South, West, East, Central)
  // ==========================================================================
  const DOMAIN_COLLEGES_MAP = {
    'engineering': [
      { name: "IIT Madras", city: "Chennai", state: "Tamil Nadu", region: "South", type: "IIT", nirf: "#1 Engg (NIRF 2025)", exams: "JEE Advanced", medianPackage: "₹21.4 LPA", fees: "₹2.2L/yr" },
      { name: "IIT Delhi", city: "New Delhi", state: "Delhi NCR", region: "North", type: "IIT", nirf: "#2 Engg", exams: "JEE Advanced", medianPackage: "₹20.5 LPA", fees: "₹2.2L/yr" },
      { name: "IIT Bombay", city: "Mumbai", state: "Maharashtra", region: "West", type: "IIT", nirf: "#3 Engg", exams: "JEE Advanced", medianPackage: "₹21.8 LPA", fees: "₹2.3L/yr" },
      { name: "IIT Kharagpur", city: "Kharagpur", state: "West Bengal", region: "East", type: "IIT", nirf: "#5 Engg", exams: "JEE Advanced", medianPackage: "₹18.5 LPA", fees: "₹2.1L/yr" },
      { name: "IIT Indore", city: "Indore", state: "Madhya Pradesh", region: "Central", type: "IIT", nirf: "#14 Engg", exams: "JEE Advanced", medianPackage: "₹19.2 LPA", fees: "₹2.2L/yr" },
      { name: "NIT Trichy", city: "Tiruchirappalli", state: "Tamil Nadu", region: "South", type: "NIT", nirf: "#9 Engg", exams: "JEE Main", medianPackage: "₹15.8 LPA", fees: "₹1.5L/yr" },
      { name: "BITS Pilani", city: "Pilani", state: "Rajasthan", region: "North", type: "Deemed Tier-1", nirf: "#20 Engg", exams: "BITSAT", medianPackage: "₹18.0 LPA", fees: "₹5.5L/yr" },
      { name: "COEP Tech University", city: "Pune", state: "Maharashtra", region: "West", type: "Govt Autonomous", nirf: "#73 Engg", exams: "MHT-CET / JEE Main", medianPackage: "₹11.5 LPA", fees: "₹1.4L/yr" },
      { name: "NIT Rourkela", city: "Rourkela", state: "Odisha", region: "East", type: "NIT", nirf: "#16 Engg", exams: "JEE Main", medianPackage: "₹14.2 LPA", fees: "₹1.6L/yr" },
      { name: "MANIT Bhopal", city: "Bhopal", state: "Madhya Pradesh", region: "Central", type: "NIT", nirf: "#80 Engg", exams: "JEE Main", medianPackage: "₹11.8 LPA", fees: "₹1.5L/yr" }
    ],
    'architecture': [
      { name: "School of Planning and Architecture (SPA)", city: "New Delhi", state: "Delhi NCR", region: "North", type: "National Importance", nirf: "#5 Architecture", exams: "JEE Main Paper 2", medianPackage: "₹9.2 LPA", fees: "₹85k/yr" },
      { name: "CEPT University", city: "Ahmedabad", state: "Gujarat", region: "West", type: "Tier-1 Autonomous", nirf: "#7 Architecture", exams: "NATA / ACPC", medianPackage: "₹8.5 LPA", fees: "₹3.8L/yr" },
      { name: "IIT Roorkee - Architecture", city: "Roorkee", state: "Uttarakhand", region: "North", type: "IIT", nirf: "#1 Architecture", exams: "AAT / JEE Advanced", medianPackage: "₹14.0 LPA", fees: "₹2.2L/yr" },
      { name: "NIT Calicut - Architecture", city: "Calicut", state: "Kerala", region: "South", type: "NIT", nirf: "#2 Architecture", exams: "JEE Main Paper 2", medianPackage: "₹9.0 LPA", fees: "₹1.4L/yr" },
      { name: "IIEST Shibpur", city: "Howrah", state: "West Bengal", region: "East", type: "National Importance", nirf: "#6 Architecture", exams: "JEE Main Paper 2", medianPackage: "₹8.2 LPA", fees: "₹1.3L/yr" },
      { name: "SPA Bhopal", city: "Bhopal", state: "Madhya Pradesh", region: "Central", type: "National Importance", nirf: "#11 Architecture", exams: "JEE Main Paper 2", medianPackage: "₹7.8 LPA", fees: "₹80k/yr" },
      { name: "Sir JJ College of Architecture", city: "Mumbai", state: "Maharashtra", region: "West", type: "Govt Aided", nirf: "Top Tier State", exams: "NATA / MHT-CET", medianPackage: "₹7.5 LPA", fees: "₹45k/yr" },
      { name: "BMS College of Architecture", city: "Bengaluru", state: "Karnataka", region: "South", type: "Autonomous Tier-1", nirf: "#22 Architecture", exams: "NATA / COMEDK", medianPackage: "₹7.0 LPA", fees: "₹2.5L/yr" }
    ],
    'medicine': [
      { name: "AIIMS New Delhi", city: "New Delhi", state: "Delhi NCR", region: "North", type: "AIIMS #1", nirf: "#1 Medical", exams: "NEET-UG", medianPackage: "₹18.0 LPA", fees: "₹1,628 total" },
      { name: "Christian Medical College (CMC)", city: "Vellore", state: "Tamil Nadu", region: "South", type: "Tier-1 Trust Medical", nirf: "#3 Medical", exams: "NEET-UG", medianPackage: "₹12.5 LPA", fees: "₹52k/yr" },
      { name: "Armed Forces Medical College (AFMC)", city: "Pune", state: "Maharashtra", region: "West", type: "Armed Forces / Central", nirf: "#11 Medical", exams: "NEET-UG + ToELR", medianPackage: "Officer Rank", fees: "Govt Sponsored" },
      { name: "JIPMER", city: "Puducherry", state: "Puducherry", region: "South", type: "National Importance", nirf: "#5 Medical", exams: "NEET-UG", medianPackage: "₹15.0 LPA", fees: "₹12k/yr" },
      { name: "KGMU Lucknow", city: "Lucknow", state: "Uttar Pradesh", region: "North", type: "State Govt Medical", nirf: "#12 Medical", exams: "NEET-UG", medianPackage: "₹13.0 LPA", fees: "₹54k/yr" },
      { name: "Grant Medical College", city: "Mumbai", state: "Maharashtra", region: "West", type: "Govt Medical", nirf: "Top Ranked State", exams: "NEET-UG", medianPackage: "₹12.0 LPA", fees: "₹1.1L/yr" },
      { name: "Medical College Kolkata", city: "Kolkata", state: "West Bengal", region: "East", type: "Heritage Medical (1835)", nirf: "#32 Medical", exams: "NEET-UG", medianPackage: "₹11.5 LPA", fees: "₹10k/yr" },
      { name: "AIIMS Bhubaneswar", city: "Bhubaneswar", state: "Odisha", region: "East", type: "AIIMS", nirf: "#17 Medical", exams: "NEET-UG", medianPackage: "₹14.0 LPA", fees: "₹5,856 total" },
      { name: "AIIMS Bhopal", city: "Bhopal", state: "Madhya Pradesh", region: "Central", type: "AIIMS", nirf: "#38 Medical", exams: "NEET-UG", medianPackage: "₹13.5 LPA", fees: "₹5,856 total" }
    ],
    'commerce': [
      { name: "Shri Ram College of Commerce (SRCC)", city: "New Delhi", state: "Delhi NCR", region: "North", type: "Delhi University", nirf: "#1 Commerce", exams: "CUET-UG", medianPackage: "₹10.5 LPA", fees: "₹30k/yr" },
      { name: "Loyola College", city: "Chennai", state: "Tamil Nadu", region: "South", type: "Autonomous Tier-1", nirf: "#7 Colleges", exams: "Merit / Test", medianPackage: "₹7.5 LPA", fees: "₹45k/yr" },
      { name: "St. Xavier's College", city: "Mumbai", state: "Maharashtra", region: "West", type: "Autonomous College", nirf: "Top City Rank", exams: "Merit / Test", medianPackage: "₹8.0 LPA", fees: "₹15k/yr" },
      { name: "St. Xavier's College", city: "Kolkata", state: "West Bengal", region: "East", type: "Autonomous Tier-1", nirf: "#5 Colleges", exams: "Merit / Test", medianPackage: "₹7.8 LPA", fees: "₹40k/yr" },
      { name: "Christ University", city: "Bengaluru", state: "Karnataka", region: "South", type: "Deemed Tier-1", nirf: "Top B.Com South", exams: "CUET (Christ)", medianPackage: "₹6.8 LPA", fees: "₹1.8L/yr" },
      { name: "Hindu College", city: "New Delhi", state: "Delhi NCR", region: "North", type: "Delhi University", nirf: "#1 Colleges", exams: "CUET-UG", medianPackage: "₹9.8 LPA", fees: "₹26k/yr" },
      { name: "Narsee Monjee College (NMCC)", city: "Mumbai", state: "Maharashtra", region: "West", type: "Autonomous", nirf: "Top Mumbai Commerce", exams: "CUET-UG / Merit", medianPackage: "₹7.2 LPA", fees: "₹35k/yr" },
      { name: "Prestige Institute (PIMR)", city: "Indore", state: "Madhya Pradesh", region: "Central", type: "Autonomous Tier-1", nirf: "Top Central Commerce", exams: "CUET-UG / Merit", medianPackage: "₹5.5 LPA", fees: "₹90k/yr" }
    ],
    'business': [
      { name: "IIM Indore (IPM 5-Yr MBA)", city: "Indore", state: "Madhya Pradesh", region: "Central", type: "IIM", nirf: "#8 Management", exams: "IPMAT Indore", medianPackage: "₹25.6 LPA", fees: "₹5.5L/yr (UG)" },
      { name: "IIM Rohtak (IPM)", city: "Rohtak", state: "Haryana", region: "North", type: "IIM", nirf: "#12 Management", exams: "IPMAT Rohtak", medianPackage: "₹18.7 LPA", fees: "₹5.2L/yr" },
      { name: "Shaheed Sukhdev College (SSCBS)", city: "New Delhi", state: "Delhi NCR", region: "North", type: "Delhi University", nirf: "#1 BBA/BMS India", exams: "CUET-UG", medianPackage: "₹11.2 LPA", fees: "₹25k/yr" },
      { name: "Symbiosis Centre for Mgmt Studies (SCMS)", city: "Pune", state: "Maharashtra", region: "West", type: "Deemed Tier-1", nirf: "Top Ranked BBA", exams: "SET (Symbiosis)", medianPackage: "₹8.5 LPA", fees: "₹3.5L/yr" },
      { name: "NMIMS ASMSOC", city: "Mumbai", state: "Maharashtra", region: "West", type: "Deemed University", nirf: "Top BBA Mumbai", exams: "NMIMS NPAT", medianPackage: "₹7.8 LPA", fees: "₹3.2L/yr" },
      { name: "St. Joseph's University", city: "Bengaluru", state: "Karnataka", region: "South", type: "State Private Tier-1", nirf: "Top South BBA", exams: "Entrance / Merit", medianPackage: "₹6.5 LPA", fees: "₹1.6L/yr" },
      { name: "IIM Ranchi (IPM)", city: "Ranchi", state: "Jharkhand", region: "East", type: "IIM", nirf: "#17 Management", exams: "IPMAT", medianPackage: "₹17.3 LPA", fees: "₹5.0L/yr" }
    ],
    'law': [
      { name: "NLSIU Bengaluru", city: "Bengaluru", state: "Karnataka", region: "South", type: "NLU #1 in India", nirf: "#1 Law", exams: "CLAT", medianPackage: "₹17.0 LPA", fees: "₹3.8L/yr" },
      { name: "NLU Delhi", city: "New Delhi", state: "Delhi NCR", region: "North", type: "NLU", nirf: "#2 Law", exams: "AILET", medianPackage: "₹16.5 LPA", fees: "₹3.2L/yr" },
      { name: "NALSAR University of Law", city: "Hyderabad", state: "Telangana", region: "South", type: "NLU", nirf: "#3 Law", exams: "CLAT", medianPackage: "₹16.0 LPA", fees: "₹3.0L/yr" },
      { name: "WBNUJS Kolkata", city: "Kolkata", state: "West Bengal", region: "East", type: "NLU", nirf: "#4 Law", exams: "CLAT", medianPackage: "₹15.5 LPA", fees: "₹2.8L/yr" },
      { name: "GNLU Gandhinagar", city: "Gandhinagar", state: "Gujarat", region: "West", type: "NLU", nirf: "#7 Law", exams: "CLAT", medianPackage: "₹14.0 LPA", fees: "₹2.6L/yr" },
      { name: "NLIU Bhopal", city: "Bhopal", state: "Madhya Pradesh", region: "Central", type: "NLU", nirf: "#18 Law", exams: "CLAT", medianPackage: "₹13.0 LPA", fees: "₹2.5L/yr" },
      { name: "Symbiosis Law School", city: "Pune", state: "Maharashtra", region: "West", type: "Deemed Tier-1", nirf: "#5 Law", exams: "SLAT", medianPackage: "₹11.0 LPA", fees: "₹4.0L/yr" },
      { name: "HNLU Raipur", city: "Raipur", state: "Chhattisgarh", region: "Central", type: "NLU", nirf: "#14 Law", exams: "CLAT", medianPackage: "₹11.5 LPA", fees: "₹2.4L/yr" }
    ],
    'design': [
      { name: "National Institute of Design (NID)", city: "Ahmedabad", state: "Gujarat", region: "West", type: "National Importance", nirf: "#1 Design", exams: "NID DAT", medianPackage: "₹16.0 LPA", fees: "₹3.5L/yr" },
      { name: "NID Haryana", city: "Kurukshetra", state: "Haryana", region: "North", type: "National Importance", nirf: "Top Tier Design", exams: "NID DAT", medianPackage: "₹12.0 LPA", fees: "₹2.8L/yr" },
      { name: "NID Andhra Pradesh", city: "Vijayawada", state: "Andhra Pradesh", region: "South", type: "National Importance", nirf: "Top Tier Design", exams: "NID DAT", medianPackage: "₹12.0 LPA", fees: "₹2.8L/yr" },
      { name: "NID Assam", city: "Jorhat", state: "Assam", region: "East", type: "National Importance", nirf: "Top Tier Design", exams: "NID DAT", medianPackage: "₹11.0 LPA", fees: "₹2.6L/yr" },
      { name: "NID Madhya Pradesh", city: "Bhopal", state: "Madhya Pradesh", region: "Central", type: "National Importance", nirf: "Top Tier Design", exams: "NID DAT", medianPackage: "₹12.0 LPA", fees: "₹2.8L/yr" },
      { name: "IDC School of Design, IIT Bombay", city: "Mumbai", state: "Maharashtra", region: "West", type: "IIT", nirf: "Premier B.Des", exams: "UCEED", medianPackage: "₹18.5 LPA", fees: "₹2.3L/yr" },
      { name: "NIFT New Delhi", city: "New Delhi", state: "Delhi NCR", region: "North", type: "NIFT Central", nirf: "#1 Fashion", exams: "NIFT Entrance", medianPackage: "₹9.5 LPA", fees: "₹3.2L/yr" },
      { name: "Srishti Manipal Institute", city: "Bengaluru", state: "Karnataka", region: "South", type: "Private Tier-1", nirf: "Top Creative Tech", exams: "SMEAT", medianPackage: "₹8.0 LPA", fees: "₹4.5L/yr" }
    ],
    'computer-app': [
      { name: "Christ University", city: "Bengaluru", state: "Karnataka", region: "South", type: "Deemed Tier-1", nirf: "#1 BCA Ranked", exams: "CUET (Christ)", medianPackage: "₹6.8 LPA", fees: "₹1.7L/yr" },
      { name: "St. Xavier's College", city: "Kolkata", state: "West Bengal", region: "East", type: "Autonomous Tier-1", nirf: "#5 Colleges", exams: "Merit / Test", medianPackage: "₹7.0 LPA", fees: "₹60k/yr" },
      { name: "Symbiosis SICSR", city: "Pune", state: "Maharashtra", region: "West", type: "Deemed Tier-1", nirf: "Top BCA Ranked", exams: "SET", medianPackage: "₹7.5 LPA", fees: "₹2.2L/yr" },
      { name: "Jamia Hamdard", city: "New Delhi", state: "Delhi NCR", region: "North", type: "Deemed University", nirf: "#40 Overall", exams: "Merit / CUET", medianPackage: "₹5.5 LPA", fees: "₹1.4L/yr" },
      { name: "Loyola College", city: "Chennai", state: "Tamil Nadu", region: "South", type: "Autonomous Tier-1", nirf: "#7 Colleges", exams: "Merit", medianPackage: "₹6.5 LPA", fees: "₹50k/yr" },
      { name: "Prestige Institute", city: "Indore", state: "Madhya Pradesh", region: "Central", type: "Autonomous", nirf: "Top Central BCA", exams: "Merit / CUET", medianPackage: "₹5.0 LPA", fees: "₹85k/yr" }
    ],
    'science': [
      { name: "Indian Institute of Science (IISc)", city: "Bengaluru", state: "Karnataka", region: "South", type: "Premier Research #1", nirf: "#1 University", exams: "JEE Adv / IAT / NEET", medianPackage: "₹28.0 LPA", fees: "₹35k/yr" },
      { name: "IISER Pune", city: "Pune", state: "Maharashtra", region: "West", type: "National Importance", nirf: "#27 Overall", exams: "IAT (IISER Aptitude)", medianPackage: "₹11.0 LPA", fees: "₹80k/yr" },
      { name: "IISER Kolkata", city: "Kolkata", state: "West Bengal", region: "East", type: "National Importance", nirf: "#43 Overall", exams: "IAT", medianPackage: "₹10.5 LPA", fees: "₹80k/yr" },
      { name: "IISER Mohali", city: "Mohali", state: "Punjab", region: "North", type: "National Importance", nirf: "#51 Overall", exams: "IAT", medianPackage: "₹10.0 LPA", fees: "₹80k/yr" },
      { name: "IISER Bhopal", city: "Bhopal", state: "Madhya Pradesh", region: "Central", type: "National Importance", nirf: "#60 Overall", exams: "IAT", medianPackage: "₹10.5 LPA", fees: "₹80k/yr" },
      { name: "St. Stephen's College", city: "New Delhi", state: "Delhi NCR", region: "North", type: "Delhi University", nirf: "#3 Colleges", exams: "CUET-UG", medianPackage: "₹9.0 LPA", fees: "₹42k/yr" }
    ],
    'agriculture': [
      { name: "IARI New Delhi", city: "New Delhi", state: "Delhi NCR", region: "North", type: "ICAR Deemed #1", nirf: "#1 Agriculture", exams: "CUET-ICAR", medianPackage: "₹8.5 LPA", fees: "₹25k/yr" },
      { name: "TNAU Coimbatore", city: "Coimbatore", state: "Tamil Nadu", region: "South", type: "State Govt Agri Univ", nirf: "#5 Agriculture", exams: "TNAU / ICAR", medianPackage: "₹6.0 LPA", fees: "₹40k/yr" },
      { name: "PAU Ludhiana", city: "Ludhiana", state: "Punjab", region: "North", type: "State Govt Agri Univ", nirf: "#3 Agriculture", exams: "PAU CET / ICAR", medianPackage: "₹6.5 LPA", fees: "₹65k/yr" },
      { name: "MPKV Rahuri", city: "Rahuri", state: "Maharashtra", region: "West", type: "State Govt Agri Univ", nirf: "#18 Agriculture", exams: "MHT-CET / ICAR", medianPackage: "₹5.5 LPA", fees: "₹38k/yr" },
      { name: "OUAT Bhubaneswar", city: "Bhubaneswar", state: "Odisha", region: "East", type: "State Govt Agri Univ", nirf: "#22 Agriculture", exams: "OUAT / ICAR", medianPackage: "₹5.8 LPA", fees: "₹42k/yr" },
      { name: "JNKVV Jabalpur", city: "Jabalpur", state: "Madhya Pradesh", region: "Central", type: "State Govt Agri Univ", nirf: "#25 Agriculture", exams: "MP PAT / ICAR", medianPackage: "₹5.2 LPA", fees: "₹30k/yr" }
    ],
    'hospitality': [
      { name: "IHM Pusa", city: "New Delhi", state: "Delhi NCR", region: "North", type: "Central Govt IHM #1", nirf: "#1 Hospitality", exams: "NCHMCT JEE", medianPackage: "₹5.8 LPA", fees: "₹1.4L/yr" },
      { name: "IHM Mumbai", city: "Mumbai", state: "Maharashtra", region: "West", type: "Central Govt IHM", nirf: "#2 Hospitality", exams: "NCHMCT JEE", medianPackage: "₹5.5 LPA", fees: "₹1.4L/yr" },
      { name: "IHM Chennai", city: "Chennai", state: "Tamil Nadu", region: "South", type: "Central Govt IHM", nirf: "#4 Hospitality", exams: "NCHMCT JEE", medianPackage: "₹5.0 LPA", fees: "₹1.3L/yr" },
      { name: "IHM Kolkata", city: "Kolkata", state: "West Bengal", region: "East", type: "Central Govt IHM", nirf: "#5 Hospitality", exams: "NCHMCT JEE", medianPackage: "₹4.8 LPA", fees: "₹1.3L/yr" },
      { name: "IHM Bhopal", city: "Bhopal", state: "Madhya Pradesh", region: "Central", type: "Central Govt IHM", nirf: "#8 Hospitality", exams: "NCHMCT JEE", medianPackage: "₹4.6 LPA", fees: "₹1.2L/yr" },
      { name: "Welcomgroup Manipal (WGSHA)", city: "Manipal", state: "Karnataka", region: "South", type: "MAHE Deemed", nirf: "Top Ranked Private", exams: "Manipal MET", medianPackage: "₹6.2 LPA", fees: "₹3.8L/yr" }
    ],
    'pharmacy': [
      { name: "NIPER SAS Nagar (Mohali)", city: "Mohali", state: "Punjab", region: "North", type: "National Importance #1", nirf: "#1 Pharmacy (NIRF 2025)", exams: "GPAT / NIPER JEE", medianPackage: "₹8.5 LPA", fees: "₹1.1L/yr" },
      { name: "Jamia Hamdard (SPER)", city: "New Delhi", state: "Delhi NCR", region: "North", type: "Deemed Tier-1", nirf: "#2 Pharmacy (NIRF 2025)", exams: "NEET-UG / State CET / CUET", medianPackage: "₹6.2 LPA", fees: "₹1.8L/yr" },
      { name: "BITS Pilani (Dept of Pharmacy)", city: "Pilani", state: "Rajasthan", region: "North", type: "Institute of Eminence", nirf: "#3 Pharmacy", exams: "BITSAT", medianPackage: "₹12.0 LPA", fees: "₹4.8L/yr" },
      { name: "JSS College of Pharmacy", city: "Ooty / Mysuru", state: "Tamil Nadu", region: "South", type: "Deemed Tier-1", nirf: "#4 Pharmacy", exams: "JSS Entrance / State CET", medianPackage: "₹7.5 LPA", fees: "₹2.4L/yr" },
      { name: "Manipal College of Pharm Sciences (MCOPS)", city: "Manipal", state: "Karnataka", region: "South", type: "Institute of Eminence", nirf: "#9 Pharmacy", exams: "MET (Manipal)", medianPackage: "₹8.0 LPA", fees: "₹3.2L/yr" },
      { name: "Madras Medical College (Pharmacy)", city: "Chennai", state: "Tamil Nadu", region: "South", type: "Govt Medical College", nirf: "Top Ranked State", exams: "TNEA / TN Paramedical", medianPackage: "₹5.5 LPA", fees: "₹10k/yr" },
      { name: "Institute of Chemical Technology (ICT)", city: "Mumbai", state: "Maharashtra", region: "West", type: "Deemed Elite INI", nirf: "#5 Pharmacy", exams: "MHT-CET / NEET-UG", medianPackage: "₹9.2 LPA", fees: "₹90k/yr" },
      { name: "Bombay College of Pharmacy (BCP)", city: "Mumbai", state: "Maharashtra", region: "West", type: "Govt Aided Autonomous", nirf: "#24 Pharmacy", exams: "MHT-CET", medianPackage: "₹6.5 LPA", fees: "₹45k/yr" },
      { name: "NIPER Ahmedabad", city: "Gandhinagar", state: "Gujarat", region: "West", type: "National Importance", nirf: "#13 Pharmacy", exams: "NIPER JEE / GPAT", medianPackage: "₹7.8 LPA", fees: "₹1.1L/yr" },
      { name: "Jadavpur University (Pharm Tech)", city: "Kolkata", state: "West Bengal", region: "East", type: "State Govt Premier", nirf: "#18 Pharmacy", exams: "WBJEE", medianPackage: "₹7.2 LPA", fees: "₹12k/yr" },
      { name: "BIT Mesra (Dept of Pharm Sci)", city: "Ranchi", state: "Jharkhand", region: "East", type: "Deemed Tier-1", nirf: "#26 Pharmacy", exams: "State Entrance / JEE", medianPackage: "₹6.8 LPA", fees: "₹2.6L/yr" },
      { name: "Dr. Harisingh Gour Central University", city: "Sagar", state: "Madhya Pradesh", region: "Central", type: "Central University", nirf: "Top Central Pharma", exams: "CUET-UG", medianPackage: "₹5.5 LPA", fees: "₹28k/yr" },
      { name: "SGSITS Indore (Dept of Pharmacy)", city: "Indore", state: "Madhya Pradesh", region: "Central", type: "Govt Autonomous", nirf: "Top MP Pharma", exams: "MP DTE / PEB", medianPackage: "₹5.8 LPA", fees: "₹65k/yr" }
    ],
    'veterinary': [
      { name: "Indian Veterinary Research Institute (IVRI)", city: "Bareilly", state: "Uttar Pradesh", region: "North", type: "ICAR Premier #1", nirf: "#1 Veterinary India", exams: "NEET-UG / VCI", medianPackage: "₹7.5 LPA", fees: "₹30k/yr" },
      { name: "TANUVAS Chennai", city: "Chennai", state: "Tamil Nadu", region: "South", type: "State Veterinary Univ #1", nirf: "Top State Vet", exams: "TANUVAS / NEET-UG", medianPackage: "₹7.2 LPA", fees: "₹22k/yr" },
      { name: "KVAFSU Bengaluru / Bidar", city: "Bengaluru", state: "Karnataka", region: "South", type: "State Govt Vet Univ", nirf: "Top Ranked South", exams: "KCET / NEET-UG", medianPackage: "₹6.5 LPA", fees: "₹35k/yr" },
      { name: "MAFSU Mumbai / Nagpur", city: "Mumbai", state: "Maharashtra", region: "West", type: "State Govt Vet Univ", nirf: "Top Ranked West", exams: "MHT-CET / NEET-UG", medianPackage: "₹6.8 LPA", fees: "₹40k/yr" },
      { name: "WBUAFS Kolkata", city: "Kolkata", state: "West Bengal", region: "East", type: "State Govt Vet Univ", nirf: "Top Ranked East", exams: "WBJEE / NEET-UG", medianPackage: "₹6.2 LPA", fees: "₹25k/yr" },
      { name: "NDVSU Jabalpur", city: "Jabalpur", state: "Madhya Pradesh", region: "Central", type: "State Govt Vet Univ", nirf: "Top Central Vet", exams: "MP PVFT / NEET-UG", medianPackage: "₹6.0 LPA", fees: "₹28k/yr" }
    ],
    'aviation-defence': [
      { name: "National Defence Academy (NDA)", city: "Pune", state: "Maharashtra", region: "West", type: "Armed Forces", nirf: "Premier Armed Forces", exams: "NDA & NA Exam + SSB", medianPackage: "Lieutenant Commission", fees: "Govt Sponsored" },
      { name: "IGRUA", city: "Amethi", state: "Uttar Pradesh", region: "North", type: "National Flying Institute", nirf: "Premier Pilot Training", exams: "IGRUA Entrance", medianPackage: "₹18.0 LPA", fees: "₹45L total" },
      { name: "IIST Thiruvananthapuram", city: "Thiruvananthapuram", state: "Kerala", region: "South", type: "ISRO / Dept of Space", nirf: "#40 Engineering", exams: "JEE Advanced", medianPackage: "ISRO Scientist/Engg", fees: "Subsidized" },
      { name: "IMU Chennai Campus", city: "Chennai", state: "Tamil Nadu", region: "South", type: "Central Maritime Univ", nirf: "#1 Maritime India", exams: "IMU-CET", medianPackage: "₹12.0 LPA", fees: "₹2.2L/yr" },
      { name: "Tolani Maritime Institute", city: "Pune", state: "Maharashtra", region: "West", type: "Premier Maritime", nirf: "Top Maritime", exams: "TMISAT / IMU-CET", medianPackage: "₹14.0 LPA", fees: "₹4.2L/yr" },
      { name: "IMU Kolkata Campus", city: "Kolkata", state: "West Bengal", region: "East", type: "Central Maritime", nirf: "Premier Marine Engg", exams: "IMU-CET", medianPackage: "₹11.5 LPA", fees: "₹2.2L/yr" }
    ]
  };

  function getCollegesForCourse(course) {
    const text = (course.domain + " " + course.cluster + " " + course.course).toLowerCase();
    if (text.includes('pharm') || text.includes('d.pharm') || text.includes('b.pharm')) {
      return DOMAIN_COLLEGES_MAP['pharmacy'];
    } else if (text.includes('veterin') || text.includes('bvsc') || text.includes('animal') || text.includes('fisher')) {
      return DOMAIN_COLLEGES_MAP['veterinary'];
    } else if (text.includes('medic') || text.includes('mbbs') || text.includes('bds') || text.includes('ayush') || text.includes('health') || text.includes('nurs') || text.includes('physiotherapy') || text.includes('bpt') || text.includes('bot')) {
      return DOMAIN_COLLEGES_MAP['medicine'];
    } else if (text.includes('architect') || text.includes('b.arch') || text.includes('planning')) {
      return DOMAIN_COLLEGES_MAP['architecture'];
    } else if (text.includes('law') || text.includes('llb') || text.includes('legal') || text.includes('judic')) {
      return DOMAIN_COLLEGES_MAP['law'];
    } else if (text.includes('design') || text.includes('b.des') || text.includes('fashion') || text.includes('ui/ux') || text.includes('animation')) {
      return DOMAIN_COLLEGES_MAP['design'];
    } else if (text.includes('bba') || text.includes('bms') || text.includes('ipm') || text.includes('management') || text.includes('business')) {
      return DOMAIN_COLLEGES_MAP['business'];
    } else if (text.includes('com') || text.includes('account') || text.includes('ca ') || text.includes('finance') || text.includes('bank')) {
      return DOMAIN_COLLEGES_MAP['commerce'];
    } else if (text.includes('bca') || text.includes('computer app') || text.includes('data sci') || text.includes('information tech')) {
      return DOMAIN_COLLEGES_MAP['computer-app'];
    } else if (text.includes('agri') || text.includes('horti') || text.includes('forest') || text.includes('dairy')) {
      return DOMAIN_COLLEGES_MAP['agriculture'];
    } else if (text.includes('hotel') || text.includes('hospitality') || text.includes('culinary') || text.includes('tourism')) {
      return DOMAIN_COLLEGES_MAP['hospitality'];
    } else if (text.includes('defence') || text.includes('pilot') || text.includes('aviat') || text.includes('navy') || text.includes('maritime')) {
      return DOMAIN_COLLEGES_MAP['aviation-defence'];
    } else if (text.includes('b.sc') || text.includes('physic') || text.includes('chemis') || text.includes('math') || text.includes('biolog') || text.includes('research')) {
      return DOMAIN_COLLEGES_MAP['science'];
    }
    return DOMAIN_COLLEGES_MAP['engineering'];
  }

  function renderCollegeCardsHtml(colleges, selectedRegion = 'all') {
    const filtered = selectedRegion === 'all' 
      ? colleges 
      : colleges.filter(c => c.region.toLowerCase() === selectedRegion.toLowerCase());

    if (filtered.length === 0) {
      return `
        <div style="grid-column: 1 / -1; text-align: center; padding: 20px; color: var(--text-muted); font-size: 0.76rem;">
          No direct college match for this region. Displaying national options.
        </div>
      `;
    }

    return filtered.map(c => `
      <div class="college-item-card">
        <div class="college-item-header">
          <div>
            <div class="college-item-name">${c.name}</div>
            <div class="college-item-location">
              <span>📍 ${c.city}, ${c.state}</span>
              <span style="font-size:0.62rem; color:var(--accent-cyan); font-weight:700;">(${c.region} India)</span>
            </div>
          </div>
          <span class="college-item-type">${c.type}</span>
        </div>
        <div class="college-item-metrics">
          <span class="college-metric-nirf">🏆 ${c.nirf}</span>
          <span class="college-metric-exam">🎯 ${c.exams}</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.65rem; color:var(--text-muted);">
          <span>💼 Median: <strong style="color:var(--text-primary);">${c.medianPackage}</strong></span>
          <span>💳 Fees: <strong>${c.fees}</strong></span>
        </div>
      </div>
    `).join('');
  }

  // ==========================================================================
  // TAMIL NADU DISTRICT-WISE COLLEGES KNOWLEDGE BASE (NAAC & NIRF RANKINGS)
  // ==========================================================================
  const TN_COLLEGES_DATA = {
    'engineering': [
      { name: "College of Engineering, Guindy (CEG Anna Univ)", district: "Chennai", city: "Chennai", type: "State Govt", ownership: "govt", naac: "NAAC A++", nirf: "#13 Engg (NIRF 2025)", code: "TNEA: 0001", exams: "TNEA (12th Cutoff)", medianPackage: "₹10.5 LPA", fees: "₹35k/yr (Govt)" },
      { name: "Madras Institute of Technology (MIT Chromepet)", district: "Chennai", city: "Chromepet", type: "Anna Univ Campus", ownership: "govt", naac: "NAAC A++", nirf: "Top Ranked State", code: "TNEA: 0004", exams: "TNEA", medianPackage: "₹9.8 LPA", fees: "₹35k/yr (Govt)" },
      { name: "PSG College of Technology (PSG Tech)", district: "Coimbatore", city: "Peelamedu", type: "Govt-Aided Autonomous", ownership: "govt", naac: "NAAC A+", nirf: "#63 Engg", code: "TNEA: 2006", exams: "TNEA", medianPackage: "₹11.2 LPA", fees: "₹45k/yr (Aided)" },
      { name: "Coimbatore Institute of Technology (CIT)", district: "Coimbatore", city: "Civil Aerodrome", type: "Govt-Aided Autonomous", ownership: "govt", naac: "NAAC A+", nirf: "#101-150 Engg", code: "TNEA: 2007", exams: "TNEA", medianPackage: "₹8.5 LPA", fees: "₹45k/yr (Aided)" },
      { name: "Government College of Technology (GCT)", district: "Coimbatore", city: "Thadagam Road", type: "State Govt", ownership: "govt", naac: "NAAC A", nirf: "Top Govt College", code: "TNEA: 2005", exams: "TNEA", medianPackage: "₹7.5 LPA", fees: "₹18k/yr (Govt)" },
      { name: "Thiagarajar College of Engineering (TCE)", district: "Madurai", city: "Thiruparankundram", type: "Govt-Aided Autonomous", ownership: "govt", naac: "NAAC A+", nirf: "#85 Engg", code: "TNEA: 5008", exams: "TNEA", medianPackage: "₹8.8 LPA", fees: "₹45k/yr (Aided)" },
      { name: "National Institute of Technology (NIT Trichy)", district: "Tiruchirappalli", city: "Thuvakudi", type: "INI Central", ownership: "govt", naac: "NAAC A++", nirf: "#9 Engg in India", code: "CSAB / JOSAA", exams: "JEE Main", medianPackage: "₹15.8 LPA", fees: "₹1.5L/yr" },
      { name: "Government College of Engineering (GCE Salem)", district: "Salem", city: "Salem", type: "State Govt", ownership: "govt", naac: "NAAC A", nirf: "Top Govt Salem", code: "TNEA: 2615", exams: "TNEA", medianPackage: "₹6.8 LPA", fees: "₹18k/yr (Govt)" },
      { name: "Government College of Engineering (GCE Tirunelveli)", district: "Tirunelveli", city: "Tirunelveli", type: "State Govt", ownership: "govt", naac: "NAAC A", nirf: "Top Govt South TN", code: "TNEA: 4974", exams: "TNEA", medianPackage: "₹6.5 LPA", fees: "₹18k/yr (Govt)" },
      { name: "SSN College of Engineering", district: "Chengalpattu", city: "Kalavakkam", type: "Private Autonomous", ownership: "private", naac: "NAAC A++", nirf: "#45 Engg", code: "TNEA: 1315", exams: "TNEA / Merit", medianPackage: "₹9.2 LPA", fees: "₹90k-₹1.5L/yr" },
      { name: "Kumaraguru College of Technology (KCT)", district: "Coimbatore", city: "Saravanampatti", type: "Private Autonomous", ownership: "private", naac: "NAAC A++", nirf: "#101-150 Engg", code: "TNEA: 2712", exams: "TNEA", medianPackage: "₹7.2 LPA", fees: "₹85k-₹1.4L/yr" },
      { name: "Sri Sairam Engineering College", district: "Chennai", city: "West Tambaram", type: "Private Autonomous", ownership: "private", naac: "NAAC A+", nirf: "#101-150 Engg", code: "TNEA: 1419", exams: "TNEA", medianPackage: "₹6.5 LPA", fees: "₹85k-₹1.3L/yr" },
      { name: "Kongu Engineering College", district: "Erode", city: "Perundurai", type: "Private Autonomous", ownership: "private", naac: "NAAC A++", nirf: "#101-150 Engg", code: "TNEA: 2711", exams: "TNEA", medianPackage: "₹6.8 LPA", fees: "₹85k-₹1.3L/yr" },
      { name: "Bannari Amman Institute of Technology", district: "Erode", city: "Sathyamangalam", type: "Private Autonomous", ownership: "private", naac: "NAAC A+", nirf: "#101-150 Engg", code: "TNEA: 2702", exams: "TNEA", medianPackage: "₹6.5 LPA", fees: "₹85k-₹1.3L/yr" },
      { name: "Mepco Schlenk Engineering College", district: "Virudhunagar", city: "Sivakasi", type: "Private Autonomous", ownership: "private", naac: "NAAC A", nirf: "#125 Engg", code: "TNEA: 4960", exams: "TNEA", medianPackage: "₹6.0 LPA", fees: "₹85k-₹1.2L/yr" },
      { name: "National Engineering College (NEC)", district: "Thoothukudi", city: "Kovilpatti", type: "Private Autonomous", ownership: "private", naac: "NAAC A+", nirf: "#151-200 Engg", code: "TNEA: 4962", exams: "TNEA", medianPackage: "₹5.8 LPA", fees: "₹80k-₹1.2L/yr" },
      { name: "Vellore Institute of Technology (VIT)", district: "Vellore", city: "Katpadi", type: "Deemed University", ownership: "private", naac: "NAAC A++", nirf: "#11 Engg in India", code: "VITEEE", exams: "VITEEE", medianPackage: "₹9.5 LPA", fees: "₹1.98L/yr" },
      { name: "SASTRA Deemed University", district: "Thanjavur", city: "Thirumalaisamudram", type: "Deemed University", ownership: "private", naac: "NAAC A++", nirf: "#34 Engg in India", code: "SASTRA Stream 1/2", exams: "JEE Main + 12th Marks", medianPackage: "₹8.5 LPA", fees: "₹1.6L/yr" },
      { name: "Sona College of Technology", district: "Salem", city: "Suramangalam", type: "Private Autonomous", ownership: "private", naac: "NAAC A++", nirf: "Top Private Salem", code: "TNEA: 2618", exams: "TNEA", medianPackage: "₹6.2 LPA", fees: "₹85k-₹1.3L/yr" }
    ],
    'medicine': [
      { name: "Madras Medical College (MMC)", district: "Chennai", city: "Park Town", type: "State Govt Apex", ownership: "govt", naac: "Govt Affiliated", nirf: "#10 Medical in India", code: "TN Medical: 01", exams: "NEET-UG", medianPackage: "₹14.0 LPA", fees: "₹13,610/yr (Govt)" },
      { name: "Stanley Medical College (SMC)", district: "Chennai", city: "Royapuram", type: "State Govt Medical", ownership: "govt", naac: "Govt Affiliated", nirf: "Top Tier Govt", code: "TN Medical: 02", exams: "NEET-UG", medianPackage: "₹12.5 LPA", fees: "₹13,610/yr (Govt)" },
      { name: "Kilpauk Medical College (KMC)", district: "Chennai", city: "Kilpauk", type: "State Govt Medical", ownership: "govt", naac: "Govt Affiliated", nirf: "Top Tier Govt", code: "TN Medical: 03", exams: "NEET-UG", medianPackage: "₹12.0 LPA", fees: "₹13,610/yr (Govt)" },
      { name: "Coimbatore Medical College (CMC)", district: "Coimbatore", city: "Avinashi Road", type: "State Govt Medical", ownership: "govt", naac: "Govt Affiliated", nirf: "Top Govt Kongu", code: "TN Medical: 05", exams: "NEET-UG", medianPackage: "₹11.5 LPA", fees: "₹13,610/yr (Govt)" },
      { name: "Madurai Medical College", district: "Madurai", city: "Panagal Road", type: "State Govt Medical", ownership: "govt", naac: "Govt Affiliated", nirf: "Top Govt South TN", code: "TN Medical: 04", exams: "NEET-UG", medianPackage: "₹11.5 LPA", fees: "₹13,610/yr (Govt)" },
      { name: "KAP Viswanathan Govt Medical College", district: "Tiruchirappalli", city: "Periyamilaguparai", type: "State Govt Medical", ownership: "govt", naac: "Govt Affiliated", nirf: "Top Govt Central TN", code: "TN Medical: 07", exams: "NEET-UG", medianPackage: "₹11.0 LPA", fees: "₹13,610/yr (Govt)" },
      { name: "Thanjavur Medical College (TMC)", district: "Thanjavur", city: "Thanjavur", type: "State Govt Medical", ownership: "govt", naac: "Govt Affiliated", nirf: "Top Govt Delta", code: "TN Medical: 06", exams: "NEET-UG", medianPackage: "₹11.0 LPA", fees: "₹13,610/yr (Govt)" },
      { name: "Tirunelveli Medical College (TvMC)", district: "Tirunelveli", city: "High Ground", type: "State Govt Medical", ownership: "govt", naac: "Govt Affiliated", nirf: "Top Govt Deep South", code: "TN Medical: 08", exams: "NEET-UG", medianPackage: "₹11.0 LPA", fees: "₹13,610/yr (Govt)" },
      { name: "Govt Mohan Kumaramangalam Medical College", district: "Salem", city: "Salem", type: "State Govt Medical", ownership: "govt", naac: "Govt Affiliated", nirf: "Top Govt Salem", code: "TN Medical: 09", exams: "NEET-UG", medianPackage: "₹10.5 LPA", fees: "₹13,610/yr (Govt)" },
      { name: "Christian Medical College (CMC Vellore)", district: "Vellore", city: "Vellore", type: "Private Trust Autonomous", ownership: "private", naac: "NAAC A++", nirf: "#3 Medical in India", code: "CMC Selection", exams: "NEET-UG + Aptitude", medianPackage: "₹12.5 LPA", fees: "₹52k/yr" },
      { name: "PSG Institute of Medical Sciences (PSG IMS&R)", district: "Coimbatore", city: "Peelamedu", type: "Private Trust Tier-1", ownership: "private", naac: "NAAC A+", nirf: "Top Private TN", code: "TN State Quota / Mgmt", exams: "NEET-UG", medianPackage: "₹10.0 LPA", fees: "₹4.5L (Govt Quota)" },
      { name: "Govt Siddha Medical College", district: "Tirunelveli", city: "Palayamkottai", type: "State Govt AYUSH", ownership: "govt", naac: "Govt Affiliated", nirf: "Premier Siddha Hub", code: "TN AYUSH", exams: "NEET-UG", medianPackage: "₹8.5 LPA", fees: "₹8,000/yr (Govt)" }
    ],
    'pharmacy': [
      { name: "Madras Medical College (College of Pharmacy)", district: "Chennai", city: "Park Town", type: "State Govt", ownership: "govt", naac: "Govt Affiliated", nirf: "Top Govt Pharmacy", code: "TN Paramedical", exams: "12th Cutoff / State Rank", medianPackage: "₹5.5 LPA", fees: "₹10,000/yr (Govt)" },
      { name: "JSS College of Pharmacy (Ooty)", district: "Nilgiris", city: "Udhagamandalam", type: "Deemed Tier-1", ownership: "private", naac: "NAAC A++", nirf: "#4 Pharmacy in India", code: "JSS OOTY", exams: "JSS CET / NEET / 12th", medianPackage: "₹7.5 LPA", fees: "₹2.4L/yr" },
      { name: "PSG College of Pharmacy", district: "Coimbatore", city: "Peelamedu", type: "Private Trust Tier-1", ownership: "private", naac: "NAAC A+", nirf: "#50 Pharmacy", code: "TN Govt / Mgmt", exams: "State Paramedical / 12th", medianPackage: "₹6.0 LPA", fees: "₹1.2L/yr" },
      { name: "KMCH College of Pharmacy", district: "Coimbatore", city: "Avinashi Road", type: "Private Autonomous", ownership: "private", naac: "NAAC A", nirf: "#68 Pharmacy", code: "TN Paramedical", exams: "12th Cutoff", medianPackage: "₹5.2 LPA", fees: "₹1.1L/yr" },
      { name: "Sri Ramachandra Faculty of Pharmacy", district: "Chennai", city: "Porur", type: "Deemed University", ownership: "private", naac: "NAAC A++", nirf: "#30 Pharmacy", code: "SRIHER", exams: "SRIHER Entrance / 12th", medianPackage: "₹6.5 LPA", fees: "₹2.0L/yr" },
      { name: "Periyar College of Pharmaceutical Sciences", district: "Tiruchirappalli", city: "Trichy", type: "Private Trust", ownership: "private", naac: "NAAC A", nirf: "Top Central TN", code: "TN Paramedical", exams: "12th Cutoff", medianPackage: "₹4.8 LPA", fees: "₹85k/yr" }
    ],
    'arts-commerce': [
      { name: "Loyola College (Autonomous)", district: "Chennai", city: "Nungambakkam", type: "Govt-Aided Autonomous", ownership: "govt", naac: "NAAC A++ (3.72)", nirf: "#7 Colleges in India", code: "Loyola Chennai", exams: "12th Merit + Interview", medianPackage: "₹7.5 LPA", fees: "₹45k/yr (Aided)" },
      { name: "Presidency College (Autonomous)", district: "Chennai", city: "Kamarajar Salai", type: "State Govt Autonomous", ownership: "govt", naac: "NAAC A+", nirf: "#3 Colleges in India", code: "Presidency DU", exams: "TNGASA (12th Marks)", medianPackage: "₹5.8 LPA", fees: "₹3,500/yr (Govt)" },
      { name: "Madras Christian College (MCC)", district: "Chennai", city: "East Tambaram", type: "Govt-Aided Autonomous", ownership: "govt", naac: "NAAC A+", nirf: "#16 Colleges", code: "MCC Chennai", exams: "12th Merit", medianPackage: "₹6.2 LPA", fees: "₹42k/yr" },
      { name: "Stella Maris College for Women", district: "Chennai", city: "Cathedral Road", type: "Govt-Aided Autonomous", ownership: "govt", naac: "NAAC A+", nirf: "#30 Colleges", code: "Stella Maris", exams: "12th Merit", medianPackage: "₹5.8 LPA", fees: "₹38k/yr" },
      { name: "PSG College of Arts & Science", district: "Coimbatore", city: "Civil Aerodrome", type: "Govt-Aided Autonomous", ownership: "govt", naac: "NAAC A++", nirf: "#20 Colleges", code: "PSGCAS", exams: "12th Merit", medianPackage: "₹6.0 LPA", fees: "₹35k/yr" },
      { name: "St. Joseph's College (Autonomous)", district: "Tiruchirappalli", city: "Chathiram", type: "Govt-Aided Autonomous", ownership: "govt", naac: "NAAC A++", nirf: "#25 Colleges", code: "St. Josephs Trichy", exams: "12th Merit", medianPackage: "₹5.5 LPA", fees: "₹30k/yr" },
      { name: "Bishop Heber College (Autonomous)", district: "Tiruchirappalli", city: "Puthur", type: "Govt-Aided Autonomous", ownership: "govt", naac: "NAAC A++", nirf: "#34 Colleges", code: "Bishop Heber", exams: "12th Merit", medianPackage: "₹5.2 LPA", fees: "₹32k/yr" },
      { name: "Thiagarajar College (Autonomous)", district: "Madurai", city: "Teppakulam", type: "Govt-Aided Autonomous", ownership: "govt", naac: "NAAC A++", nirf: "#15 Colleges", code: "Thiagarajar Madurai", exams: "12th Merit", medianPackage: "₹5.4 LPA", fees: "₹28k/yr" },
      { name: "Lady Doak College", district: "Madurai", city: "Tallakulam", type: "Govt-Aided Autonomous", ownership: "govt", naac: "NAAC A+", nirf: "#70 Colleges", code: "Lady Doak", exams: "12th Merit", medianPackage: "₹4.8 LPA", fees: "₹30k/yr" },
      { name: "St. Xavier's College (Autonomous)", district: "Tirunelveli", city: "Palayamkottai", type: "Govt-Aided Autonomous", ownership: "govt", naac: "NAAC A++", nirf: "#40 Colleges", code: "SXC Palayamkottai", exams: "12th Merit", medianPackage: "₹4.5 LPA", fees: "₹25k/yr" }
    ],
    'agriculture-veterinary': [
      { name: "Tamil Nadu Agricultural University (TNAU)", district: "Coimbatore", city: "Marudhamalai Road", type: "State Govt Agri Univ", ownership: "govt", naac: "ICAR Accredited A+", nirf: "#5 Agriculture in India", code: "TNAU Rank", exams: "TNAU Counselling", medianPackage: "₹6.0 LPA", fees: "₹40k/yr (Govt)" },
      { name: "Anbil Dharmalingam Agri College (TNAU)", district: "Tiruchirappalli", city: "Navalur Kuttapattu", type: "State Govt Constituent", ownership: "govt", naac: "ICAR Accredited", nirf: "Top Govt Delta", code: "TNAU ADAC", exams: "TNAU Counselling", medianPackage: "₹5.5 LPA", fees: "₹40k/yr" },
      { name: "Agricultural College & Research Inst (TNAU)", district: "Madurai", city: "Othakkadai", type: "State Govt Constituent", ownership: "govt", naac: "ICAR Accredited", nirf: "Top Govt South TN", code: "TNAU ACRI", exams: "TNAU Counselling", medianPackage: "₹5.5 LPA", fees: "₹40k/yr" },
      { name: "Madras Veterinary College (TANUVAS)", district: "Chennai", city: "Vepery", type: "State Govt Premier #1", ownership: "govt", naac: "VCI Accredited", nirf: "Top Veterinary in TN", code: "TANUVAS MVC", exams: "TANUVAS Merit / Cutoff", medianPackage: "₹7.2 LPA", fees: "₹22k/yr (Govt)" },
      { name: "Veterinary College & Research Inst (TANUVAS)", district: "Namakkal", city: "Ladavadi", type: "State Govt Constituent", ownership: "govt", naac: "VCI Accredited", nirf: "Top Namakkal Vet", code: "TANUVAS VCRI", exams: "TANUVAS Cutoff", medianPackage: "₹6.8 LPA", fees: "₹22k/yr" },
      { name: "Veterinary College & Research Inst (TANUVAS)", district: "Tirunelveli", city: "Ramayanpatti", type: "State Govt Constituent", ownership: "govt", naac: "VCI Accredited", nirf: "Top Deep South Vet", code: "TANUVAS VCRI", exams: "TANUVAS Cutoff", medianPackage: "₹6.5 LPA", fees: "₹22k/yr" }
    ],
    'law': [
      { name: "School of Excellence in Law (TNDALU)", district: "Chennai", city: "Taramani", type: "State Govt Law University", ownership: "govt", naac: "State Govt Apex", nirf: "Top Law Tamil Nadu", code: "TNDALU SOEL", exams: "12th Marks (TNDALU Rank)", medianPackage: "₹7.5 LPA", fees: "₹85k/yr (Honours)" },
      { name: "Tamil Nadu National Law University (TNNLU)", district: "Tiruchirappalli", city: "Dindigul Road", type: "National Law Univ (NLU)", ownership: "govt", naac: "BCI Recognized", nirf: "#30 Law in India", code: "CLAT", exams: "CLAT (TN Domicile Quota)", medianPackage: "₹10.5 LPA", fees: "₹2.2L/yr" },
      { name: "Government Law College (Madurai)", district: "Madurai", city: "Dr. Ambedkar Road", type: "State Govt", ownership: "govt", naac: "BCI Recognized", nirf: "Top Govt Law South", code: "TNDALU", exams: "12th Marks (TNDALU Rank)", medianPackage: "₹5.0 LPA", fees: "₹3,500/yr (Govt)" },
      { name: "Government Law College (Coimbatore)", district: "Coimbatore", city: "Maruthamalai Main Rd", type: "State Govt", ownership: "govt", naac: "BCI Recognized", nirf: "Top Govt Law Kongu", code: "TNDALU", exams: "12th Marks (TNDALU Rank)", medianPackage: "₹5.0 LPA", fees: "₹3,500/yr (Govt)" },
      { name: "SASTRA School of Law", district: "Thanjavur", city: "Thirumalaisamudram", type: "Deemed University", ownership: "private", naac: "NAAC A++", nirf: "Premier Private Law", code: "SASTRA Law", exams: "CLAT / 12th Marks", medianPackage: "₹7.8 LPA", fees: "₹1.4L/yr" }
    ]
  };

  function getTNCollegesForCourse(course) {
    const text = (course.domain + " " + course.cluster + " " + course.course).toLowerCase();
    if (text.includes('pharm') || text.includes('d.pharm') || text.includes('b.pharm')) {
      return TN_COLLEGES_DATA['pharmacy'];
    } else if (text.includes('agri') || text.includes('horti') || text.includes('veterin') || text.includes('bvsc') || text.includes('animal') || text.includes('fisher')) {
      return TN_COLLEGES_DATA['agriculture-veterinary'];
    } else if (text.includes('law') || text.includes('llb') || text.includes('legal')) {
      return TN_COLLEGES_DATA['law'];
    } else if (text.includes('medic') || text.includes('mbbs') || text.includes('bds') || text.includes('ayush') || text.includes('health') || text.includes('nurs') || text.includes('physiotherapy') || text.includes('bpt')) {
      return TN_COLLEGES_DATA['medicine'];
    } else if (text.includes('com') || text.includes('account') || text.includes('arts') || text.includes('bba') || text.includes('economics') || text.includes('b.sc in physic') || text.includes('b.sc in chem')) {
      return TN_COLLEGES_DATA['arts-commerce'];
    }
    return TN_COLLEGES_DATA['engineering'];
  }

  function renderTNCollegeCardsHtml(tnColleges, selectedDistrict = 'all', selectedOwnership = 'all') {
    let filtered = tnColleges;
    if (selectedDistrict !== 'all') {
      filtered = filtered.filter(c => c.district.toLowerCase() === selectedDistrict.toLowerCase());
    }
    if (selectedOwnership !== 'all') {
      filtered = filtered.filter(c => c.ownership.toLowerCase() === selectedOwnership.toLowerCase());
    }

    if (filtered.length === 0) {
      return `
        <div style="grid-column: 1 / -1; text-align: center; padding: 24px; color: var(--text-muted); font-size: 0.76rem;">
          No direct college match in Tamil Nadu for this filter. Select "All Districts" or "All Categories" to view available options.
        </div>
      `;
    }

    return filtered.map(c => `
      <div class="college-item-card" style="border-left: 3px solid ${c.ownership === 'govt' ? '#10b981' : '#6366f1'};">
        <div class="college-item-header">
          <div>
            <div class="college-item-name">${c.name}</div>
            <div class="college-item-location">
              <span>📍 ${c.city}, <strong>${c.district} Dt</strong></span>
              <span class="college-metric-tnea">${c.code}</span>
            </div>
          </div>
          <span class="college-item-type" style="background:${c.ownership === 'govt' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(99, 102, 241, 0.15)'}; color:${c.ownership === 'govt' ? '#34d399' : '#818cf8'};">
            ${c.type}
          </span>
        </div>
        <div class="college-item-metrics">
          <span class="college-metric-naac">⭐ ${c.naac}</span>
          <span class="college-metric-nirf">🏆 ${c.nirf}</span>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.66rem; color:var(--text-muted); padding-top:4px;">
          <span>💼 Median: <strong style="color:var(--text-primary);">${c.medianPackage}</strong></span>
          <span>💳 Fees: <strong style="color:${c.ownership === 'govt' ? '#34d399' : 'var(--accent-cyan)'};">${c.fees}</strong></span>
        </div>
      </div>
    `).join('');
  }

  // ==========================================================================
  // MASTER ANCILLARY & JOB-READY VALUE-ADDED CERTIFICATIONS DATABASE
  // ==========================================================================
  const ANCILLARY_COURSES_DATA = {
    'tech': [
      {
        title: "AWS Certified Solutions Architect & Cloud Infrastructure",
        provider: "AWS Academy / Amazon",
        timing: "Year 2 / Sem 3-4",
        duration: "8–10 Weeks",
        format: "Online + Hands-on Cloud Labs",
        skills: "EC2, S3, Lambda, VPC, CloudFormation, Serverless Architecture",
        salaryImpact: "+45% Placement CTC Boost",
        roles: "Cloud Engineer, DevOps Trainee, Solutions Architect"
      },
      {
        title: "Full-Stack MERN & Next.js Modern Web Engineering",
        provider: "Meta / FreeCodeCamp",
        timing: "Year 1–2",
        duration: "12 Weeks",
        format: "Self-Paced Project-Based",
        skills: "React 19, Node.js, Express, MongoDB, TypeScript, Tailwind",
        salaryImpact: "+40% Tech Internship Conversion",
        roles: "Full Stack Developer, Frontend Engineer, API Specialist"
      },
      {
        title: "Generative AI, Prompt Engineering & LLM Application Dev",
        provider: "DeepLearning.AI / Google Cloud",
        timing: "Year 3 / Sem 5-6",
        duration: "6 Weeks",
        format: "Online Guided Labs",
        skills: "LangChain, RAG Pipelines, Vector DBs, Gemini/OpenAI APIs, PyTorch",
        salaryImpact: "+55% AI/ML Product Hiring Edge",
        roles: "GenAI Engineer, AI Solutions Specialist, NLP Developer"
      },
      {
        title: "DevOps Engineering: Docker, Kubernetes & CI/CD Pipelines",
        provider: "Linux Foundation / CNCF",
        timing: "Year 3 / Sem 5-6",
        duration: "8 Weeks",
        format: "Hands-on Virtual Labs",
        skills: "Docker Containers, Kubernetes Orchestration, GitHub Actions, Jenkins",
        salaryImpact: "+50% Infrastructure Package Edge",
        roles: "DevOps Engineer, SRE, Build Engineer"
      },
      {
        title: "Cybersecurity Analyst & Threat Hunting (CompTIA Security+)",
        provider: "CompTIA / EC-Council",
        timing: "Year 2–3",
        duration: "10 Weeks",
        format: "Online Guided",
        skills: "Network Defense, SIEM (Splunk), Ethical Hacking, Cryptography, SOC",
        salaryImpact: "+48% Cyber Defense Hiring Rate",
        roles: "SOC Analyst, Security Consultant, Pen Tester"
      }
    ],
    'core-engg': [
      {
        title: "Building Information Modeling (BIM) & Autodesk Revit",
        provider: "Autodesk Certified Professional",
        timing: "Year 2–3 (Civil/Arch)",
        duration: "8 Weeks",
        format: "Industry Design Labs",
        skills: "Revit Architecture & Structure, Navisworks 4D, Clash Detection",
        salaryImpact: "+40% Core MNC Civil Placement",
        roles: "BIM Modeler, Structural Drafter, Project Engineer"
      },
      {
        title: "CATIA & SolidWorks Parametric 3D CAD Modeling",
        provider: "Dassault Systèmes",
        timing: "Year 2 (Mech/Auto/Aero)",
        duration: "6 Weeks",
        format: "CAD Software Simulation",
        skills: "Part & Assembly Modeling, Sheet Metal, GD&T, Drafting ISO",
        salaryImpact: "+35% Auto/Aero R&D Shortlisting",
        roles: "Design Engineer, CAD Specialist, Product Developer"
      },
      {
        title: "ANSYS Finite Element Analysis (FEA) & CFD Simulation",
        provider: "Ansys Innovation / NPTEL",
        timing: "Year 3 / Sem 6",
        duration: "8 Weeks",
        format: "Computational Physics Labs",
        skills: "Structural Mechanics, Fluid Dynamics, Thermal Analysis, Meshing",
        salaryImpact: "+45% Engineering Analytics CTC",
        roles: "FEA Analyst, CFD Engineer, Thermal Simulation Specialist"
      },
      {
        title: "Embedded Systems, ARM Cortex & IoT Firmware Dev",
        provider: "ARM University / Texas Instruments",
        timing: "Year 2–3 (ECE/EEE/EIE)",
        duration: "10 Weeks",
        format: "Hardware + IDE Simulation",
        skills: "Embedded C, ARM Cortex-M, FreeRTOS, SPI/I2C/UART, STM32",
        salaryImpact: "+50% Core Semiconductor Hiring",
        roles: "Embedded Firmware Engineer, IoT Systems Designer"
      },
      {
        title: "Electric Vehicle (EV) Powertrain & Battery Management Systems",
        provider: "ARAI / IIT Madras Pravartak",
        timing: "Year 3–4 (Mech/EEE/Auto)",
        duration: "12 Weeks",
        format: "Industry EV Certification",
        skills: "Li-ion Battery Cell Tech, BMS Algorithms, Motor Inverters, MATLAB",
        salaryImpact: "+60% EV Industry Fast-Track",
        roles: "EV Battery Engineer, Powertrain Specialist"
      }
    ],
    'medical-pharma': [
      {
        title: "Basic & Advanced Cardiac Life Support (BLS & ACLS Provider)",
        provider: "American Heart Association (AHA)",
        timing: "Final Year / Internship (MBBS/BDS/Nursing)",
        duration: "3 Days Intensive",
        format: "Simulation Clinical Lab",
        skills: "CPR, Defibrillation, Airway Management, Emergency Pharmacology",
        salaryImpact: "Mandatory for Elite Hospital ICU & International Licensing",
        roles: "Emergency Resident, ICU Medical Officer"
      },
      {
        title: "Pharmacovigilance (PV) & Adverse Drug Reaction Monitoring",
        provider: "CDSCO / DIA / NPTEL",
        timing: "Year 3–4 (B.Pharm/Pharm.D/BSc)",
        duration: "8 Weeks",
        format: "Online Case Studies",
        skills: "ICSR Processing, MedDRA Coding, Argus Safety Database, PSUR Drafting",
        salaryImpact: "+45% MNC Pharma/CRO Campus Placement",
        roles: "Drug Safety Associate, PV Specialist"
      },
      {
        title: "Clinical Data Management (CDM) & Good Clinical Practice (GCP)",
        provider: "ICMR / WHO / NIDA",
        timing: "Year 3–4 (Pharm.D/MBBS/Life Sciences)",
        duration: "6 Weeks",
        format: "Online Practicum",
        skills: "CRF Design, eCRF (EDC Tools like Oracle InForm), Data Validation, ICH-GCP",
        salaryImpact: "+50% Clinical Trials CRO Hiring",
        roles: "Clinical Data Coordinator, Clinical Research Associate (CRA)"
      },
      {
        title: "Certified Professional Coder (CPC) & Medical Billing",
        provider: "AAPC (American Academy of Professional Coders)",
        timing: "Year 3–4 (Allied Health/Life Sciences)",
        duration: "10 Weeks",
        format: "Online + Exam Prep",
        skills: "ICD-10-CM, CPT, HCPCS Level II, HIPAA Compliance, Medical Terminology",
        salaryImpact: "+40% US Healthcare MNC Offshore Packages",
        roles: "Medical Coder, Healthcare Billing Auditor"
      },
      {
        title: "Hospital Infection Prevention & NABH Quality Standards Auditor",
        provider: "CAHO / NABH India",
        timing: "Final Year (Nursing/Hospital Mgmt/MBBS)",
        duration: "4 Weeks",
        format: "Hospital Audit Workshops",
        skills: "Sterilization Protocols, Antimicrobial Stewardship, NABH Key Indicators",
        salaryImpact: "+35% Hospital Admin Executive Hiring",
        roles: "Infection Control Nurse, Quality Manager"
      }
    ],
    'finance-commerce': [
      {
        title: "Financial Modeling & Valuation Analyst (FMVA)",
        provider: "Corporate Finance Institute (CFI)",
        timing: "Year 2–3 (B.Com/BBA/Eco)",
        duration: "8 Weeks",
        format: "Excel Financial Models",
        skills: "DCF Modeling, 3-Statement Forecasting, M&A Models, Pitchbooks",
        salaryImpact: "+55% Investment Banking & Equity Research CTC",
        roles: "Financial Analyst, Equity Research Associate, M&A Analyst"
      },
      {
        title: "Advanced Excel, Power BI & SQL for Business Intelligence",
        provider: "Microsoft Certified / Coursera",
        timing: "Year 1–2",
        duration: "6 Weeks",
        format: "Interactive Dashboards",
        skills: "DAX Formulas, Power Query, Financial Dashboards, SQL Queries",
        salaryImpact: "+40% Big 4 Audit/Consulting Shortlist",
        roles: "BI Analyst, Financial Reporting Executive"
      },
      {
        title: "Certified GST Practitioner & E-Way Invoicing",
        provider: "MSME Technology Development Centre / ICAI",
        timing: "Year 2 / Sem 3",
        duration: "4 Weeks",
        format: "Govt GST Portal Hands-on",
        skills: "GSTR-1, GSTR-3B, Input Tax Credit (ITC), Annual Returns, E-Invoicing",
        salaryImpact: "+35% Tax Consultancy & SME Accounting",
        roles: "GST Consultant, Tax Accountant, Compliance Officer"
      },
      {
        title: "NISM Series VIII: Equity Derivatives & Research Analyst Certification",
        provider: "National Institute of Securities Markets (SEBI)",
        timing: "Year 2–3",
        duration: "4 Weeks",
        format: "Exam Prep + Live Market Trading",
        skills: "Derivatives Strategies, Fundamental Analysis, SEBI Regulations",
        salaryImpact: "Mandatory for Broking, Mutual Fund & Trading Desks",
        roles: "Research Analyst, Derivatives Trader, Wealth Manager"
      },
      {
        title: "SAP FICO (Financial Accounting & Controlling) End-User Specialist",
        provider: "SAP Academy / Authorized Partners",
        timing: "Year 3 / Final Year",
        duration: "8 Weeks",
        format: "ERP Simulation Labs",
        skills: "General Ledger, Accounts Payable/Receivable, Cost Center Accounting",
        salaryImpact: "+50% Corporate MNC Accounts CTC",
        roles: "SAP FICO Consultant, Corporate Accountant"
      }
    ],
    'management-marketing': [
      {
        title: "Google Digital Marketing & Google Analytics 4 (GA4) Certification",
        provider: "Google Skillshop",
        timing: "Year 1–2 (BBA/B.Com/Media)",
        duration: "6 Weeks",
        format: "Live Campaigns + Analytics",
        skills: "Google Ads (Search/Display), SEO Optimization, GA4 Event Tracking, SEM",
        salaryImpact: "+40% Digital Marketing Agency Placement",
        roles: "Performance Marketer, SEO Specialist, Growth Hacker"
      },
      {
        title: "Salesforce Certified Administrator & CRM Architecture",
        provider: "Salesforce Trailhead",
        timing: "Year 2–3",
        duration: "8 Weeks",
        format: "Trailhead Interactive Labs",
        skills: "Sales Cloud, Service Cloud, Flow Automation, User Management",
        salaryImpact: "+55% Global CRM Consultant Package",
        roles: "Salesforce Administrator, CRM Analyst"
      },
      {
        title: "Professional Scrum Master (PSM I) & Agile Project Leadership",
        provider: "Scrum.org",
        timing: "Year 3 / Final Year",
        duration: "4 Weeks",
        format: "Case Simulations",
        skills: "Sprint Planning, Backlog Refinement, Daily Scrums, JIRA Board Mgmt",
        salaryImpact: "+45% Tech & Operations Project Management",
        roles: "Scrum Master, Associate Product Manager, Agile Coach"
      },
      {
        title: "HR Analytics & People Operations Metrics with Python/Excel",
        provider: "SHRM / HRCI / AIHR",
        timing: "Year 2–3 (BBA/MBA)",
        duration: "6 Weeks",
        format: "Data-Driven HR Projects",
        skills: "Attrition Modeling, Talent Acquisition Metrics, Employee NPS, Compensation",
        salaryImpact: "+40% Corporate HR Generalist Advantage",
        roles: "HR Analyst, Talent Acquisition Specialist"
      },
      {
        title: "Lean Six Sigma Green Belt (LSSGB) Process Optimization",
        provider: "ASQ (American Society for Quality) / IASSC",
        timing: "Year 3–4",
        duration: "6 Weeks",
        format: "DMAIC Case Studies",
        skills: "DMAIC Methodology, Root Cause Analysis, Statistical Process Control",
        salaryImpact: "+50% Supply Chain & Operations Fast-Track",
        roles: "Process Improvement Specialist, Operations Trainee"
      }
    ],
    'law': [
      {
        title: "Commercial Contract Drafting, Negotiation & Boilerplate Analysis",
        provider: "National Law Universities / Bar Council Recognized",
        timing: "Year 2–3 (LLB/BA LLB)",
        duration: "6 Weeks",
        format: "Drafting Practicum",
        skills: "NDAs, MSAs, SLA Drafting, Indemnity & Limitation Clauses, E-Signing",
        salaryImpact: "+50% Law Firm & In-House Legal Shortlisting",
        roles: "Legal Associate, In-House Contracts Manager"
      },
      {
        title: "Cyber Law, Digital Personal Data Protection (DPDP 2023) & GDPR",
        provider: "Ministry of Electronics & IT (MeitY) / ILI Delhi",
        timing: "Year 3–4 (LLB)",
        duration: "8 Weeks",
        format: "Regulatory Compliance Labs",
        skills: "DPDP Act 2023, IT Act 2000, Data Breach Reporting, Privacy Policies",
        salaryImpact: "+60% Tech Corporate Legal Counsel CTC",
        roles: "Data Privacy Officer (DPO), Cyber Law Advisor"
      },
      {
        title: "Intellectual Property Rights (IPR), Patent & Trademark Prosecution",
        provider: "WIPO Academy (World Intellectual Property Org)",
        timing: "Year 3–4",
        duration: "6 Weeks",
        format: "WIPO Portal Drafting",
        skills: "Patent Search, Trademark Filing, Copyright Licensing, IPR Litigation",
        salaryImpact: "+45% IPR Law Firm Placement",
        roles: "Patent Associate, Trademark Attorney"
      },
      {
        title: "Commercial Arbitration & Mediation (ADR Practice)",
        provider: "Chartered Institute of Arbitrators (CIArb)",
        timing: "Year 4–5",
        duration: "6 Weeks",
        format: "Moot Arbitration Hearings",
        skills: "Arbitration Agreements, UNCITRAL Model Law, Section 9/11 Petitions",
        salaryImpact: "+40% Litigation Chamber Preference",
        roles: "Arbitration Counsel, Mediator, Dispute Specialist"
      }
    ],
    'design-media': [
      {
        title: "Google Professional UX Design & Figma Prototyping",
        provider: "Google UX / Coursera",
        timing: "Year 1–2 (B.Des/B.Sc/Animation)",
        duration: "10 Weeks",
        format: "Design Portfolio Projects",
        skills: "Figma, Wireframing, Usability Testing, Design Systems, Micro-Interactions",
        salaryImpact: "+50% Product Design Starting CTC",
        roles: "UI/UX Designer, Product Designer, Interaction Designer"
      },
      {
        title: "Real-Time 3D & Unreal Engine 5 Environment Artist",
        provider: "Epic Games Unreal Engine Academy",
        timing: "Year 2–3 (Animation/Gaming)",
        duration: "10 Weeks",
        format: "3D Level Design Labs",
        skills: "Lumen Lighting, Nanite Geometry, Blueprint Scripting, Material Graph",
        salaryImpact: "+55% Gaming & VFX Studio Packages",
        roles: "Unreal Environment Artist, Technical Artist"
      },
      {
        title: "Technical Writing & API Documentation Specialist",
        provider: "Society for Technical Communication (STC)",
        timing: "Year 2–3 (BA English/B.Tech/Journalism)",
        duration: "6 Weeks",
        format: "GitHub Markdown & OpenAPI",
        skills: "DITA, Markdown, Swagger/OpenAPI, Git Docs, User Guide Authoring",
        salaryImpact: "+45% IT Product Documentation CTC",
        roles: "Technical Writer, Information Architect, Docs Engineer"
      }
    ],
    'agri-biotech': [
      {
        title: "DGCA Certified Remote Pilot License (Drone Pilot for Agriculture)",
        provider: "DGCA Authorized RPTO",
        timing: "Year 3–4 (B.Sc Agri/B.Tech Agri)",
        duration: "1–2 Weeks Intensive",
        format: "Flight Sim + Field Flying",
        skills: "Drone Flight Regulations, Multispectral Crop Health Mapping, Pesticide Spraying",
        salaryImpact: "+50% Precision Agri & Agri-Tech Startup Hiring",
        roles: "Agri-Drone Pilot, Precision Agriculture Consultant"
      },
      {
        title: "HACCP & Food Safety Lead Auditor Certification (ISO 22000)",
        provider: "FSSAI / CQI-IRCA / TUV SUD",
        timing: "Year 3–4 (Food Tech/Dairy Tech/Biotech)",
        duration: "5 Days Intensive",
        format: "Auditing Workshops",
        skills: "Hazard Analysis, Critical Control Points, Food Plant Hygiene, Audit Checklists",
        salaryImpact: "+45% FMCG Food Brands Placement",
        roles: "Food Safety Auditor, Quality Assurance Executive"
      },
      {
        title: "Python for Bioinformatics & Next-Generation Sequencing (NGS)",
        provider: "Biocon Academy / NPTEL",
        timing: "Year 3–4 (Biotechnology/Bioinformatics)",
        duration: "8 Weeks",
        format: "Computational Genomics",
        skills: "BioPython, Sequence Alignment (BLAST), RNA-Seq Analysis, Genome Annotation",
        salaryImpact: "+55% Biotech R&D / Pharma Genomic Research",
        roles: "Bioinformatics Scientist, Genomic Data Analyst"
      }
    ]
  };

  function getAncillaryCoursesForCourse(course) {
    const text = (course.domain + " " + course.cluster + " " + course.course).toLowerCase();
    if (text.includes('computer') || text.includes('software') || text.includes('information tech') || text.includes('artificial int') || text.includes('data sci') || text.includes('cyber') || text.includes('cloud')) {
      return ANCILLARY_COURSES_DATA['tech'];
    } else if (text.includes('civil') || text.includes('mech') || text.includes('electron') || text.includes('electr') || text.includes('aero') || text.includes('auto') || text.includes('marine') || text.includes('robot') || text.includes('architect') || text.includes('instrument')) {
      return ANCILLARY_COURSES_DATA['core-engg'];
    } else if (text.includes('pharm') || text.includes('medic') || text.includes('mbbs') || text.includes('bds') || text.includes('nurs') || text.includes('physio') || text.includes('ayush') || text.includes('clinical') || text.includes('health')) {
      return ANCILLARY_COURSES_DATA['medical-pharma'];
    } else if (text.includes('com') || text.includes('account') || text.includes('financ') || text.includes('tax') || text.includes('ca') || text.includes('cma') || text.includes('bank') || text.includes('econom')) {
      return ANCILLARY_COURSES_DATA['finance-commerce'];
    } else if (text.includes('bba') || text.includes('manage') || text.includes('market') || text.includes('hr') || text.includes('hotel') || text.includes('hospitality') || text.includes('supply chain') || text.includes('logist')) {
      return ANCILLARY_COURSES_DATA['management-marketing'];
    } else if (text.includes('law') || text.includes('llb') || text.includes('legal') || text.includes('judic')) {
      return ANCILLARY_COURSES_DATA['law'];
    } else if (text.includes('design') || text.includes('des') || text.includes('animat') || text.includes('film') || text.includes('media') || text.includes('journal') || text.includes('graphic')) {
      return ANCILLARY_COURSES_DATA['design-media'];
    } else if (text.includes('agri') || text.includes('horti') || text.includes('food') || text.includes('dairy') || text.includes('biotech') || text.includes('veterin') || text.includes('bvsc')) {
      return ANCILLARY_COURSES_DATA['agri-biotech'];
    }
    return ANCILLARY_COURSES_DATA['tech'];
  }

  function renderAncillaryCardsHtml(list) {
    if (!list || list.length === 0) return '';
    return list.map(a => `
      <div class="ancillary-card">
        <div>
          <div class="ancillary-card-top">
            <span class="ancillary-badge-provider">${a.provider}</span>
            <span class="ancillary-timing-chip">${a.timing}</span>
          </div>
          <h4 class="ancillary-title" style="margin-top:6px;">${a.title}</h4>
          <p class="ancillary-desc" style="margin-top:4px;">${a.skills}</p>
        </div>
        <div style="margin-top:8px;">
          <div class="ancillary-tags-row" style="margin-bottom:6px;">
            <span class="ancillary-duration-chip">⏱️ ${a.duration} &bull; ${a.format}</span>
          </div>
          <div class="ancillary-impact-tag">
            <span>🚀 ${a.salaryImpact}</span>
          </div>
          <div style="font-size:0.65rem; color:var(--text-muted); margin-top:4px;">
            Target Roles: <strong>${a.roles}</strong>
          </div>
        </div>
      </div>
    `).join('');
  }

  // ==========================================================================
  // MASTER POSTGRADUATE (PG) ENTRANCE EXAMS DATABASE
  // ==========================================================================
  const PG_EXAMS_DATA = {
    'engg': [
      {
        name: "GATE (Graduate Aptitude Test in Engineering)",
        conducting: "IISc Bangalore & 7 IITs",
        targetDegrees: "M.Tech, M.S. (Research), Direct Ph.D. & PSU Maharatna Recruitment",
        eligibility: "B.E. / B.Tech / B.Arch / B.Pharm / M.Sc graduates or pre-final year students",
        keyInstitutes: "IISc Bangalore, 23 IITs, 31 NITs, IIITs, BITS Pilani & Top State Univs",
        psuRecruitment: "IOCL, ONGC, NTPC, BHEL, BARC, DRDO, NPCIL, GAIL, PowerGrid",
        stipend: "₹12,400/month MHRD / AICTE PG Scholarship for all GATE qualified students"
      },
      {
        name: "TANCET / CEETA-PG (Tamil Nadu PG Entrance)",
        conducting: "Anna University, Chennai",
        targetDegrees: "M.E., M.Tech, M.Arch, M.Plan, MCA, MBA",
        eligibility: "Any recognized Engineering / Science / Commerce / Arts graduation (50% min)",
        keyInstitutes: "CEG Guindy, MIT Chromepet, PSG Tech, CIT, GCT, Thiagarajar Madurai, Anna Univ Depts",
        psuRecruitment: "TN State Public Sector & Premier South Indian Engineering Firms",
        stipend: "State Govt PG Scholarships & TANII Research Fellowships"
      },
      {
        name: "CEED (Common Entrance Examination for Design)",
        conducting: "IIT Bombay",
        targetDegrees: "Master of Design (M.Des) & Ph.D. in Industrial/Interaction Design",
        eligibility: "Degree in Engineering / Architecture / Design / Fine Arts or 4-year degree",
        keyInstitutes: "IDC IIT Bombay, DoD IIT Delhi, IISc CPdM, IIT Guwahati, IIT Hyderabad, IIITDM",
        psuRecruitment: "Tata Motors Design, Samsung R&D, Google UX, Microsoft, Adobe",
        stipend: "₹12,400/month AICTE PG Design Fellowship"
      },
      {
        name: "IIIT-H PGEE & BITSAT Higher Degree",
        conducting: "IIIT Hyderabad / BITS Pilani",
        targetDegrees: "M.Tech (CSE/ECE/AI/Robotics) & MS by Research",
        eligibility: "B.Tech in CSE/IT/ECE/EEE/Mech with 60%+",
        keyInstitutes: "IIIT Hyderabad, BITS Pilani (Pilani, Goa, Hyderabad campuses)",
        psuRecruitment: "Direct FAANG, Tier-1 AI Startups & Global Tech R&D Labs",
        stipend: "₹15,000–₹22,000/month Research Assistantship (RA)"
      }
    ],
    'med': [
      {
        name: "NEET-PG / NExT (National Eligibility cum Entrance Test PG)",
        conducting: "National Board of Examinations (NBE) / NMC",
        targetDegrees: "MD (Doctor of Medicine), MS (Master of Surgery), DNB",
        eligibility: "MBBS Degree + Completed 1-Year Compulsory Rotatory Internship + SMC/NMC Reg",
        keyInstitutes: "MMC Chennai, Stanley, KMC, MAMC Delhi, KGMU Lucknow, CMC Vellore, Grant Mumbai",
        psuRecruitment: "Central Health Services (CHS), Railways, ESIC, Armed Forces (AFMS)",
        stipend: "₹65,000–₹1,10,000/month Resident Doctor Stipend (Govt Colleges)"
      },
      {
        name: "INI-CET (Institute of National Importance Combined Entrance)",
        conducting: "AIIMS New Delhi",
        targetDegrees: "MD, MS, M.Ch (6-Yr), DM (6-Yr), MDS",
        eligibility: "MBBS / BDS with 55%+ (50% reserved) + Completed Internship",
        keyInstitutes: "AIIMS New Delhi & 20 New AIIMS, JIPMER Puducherry, PGIMER Chandigarh, NIMHANS Bengaluru",
        psuRecruitment: "Premier Super-Specialty Medical Institutes, AIIMS Faculty Track",
        stipend: "₹90,000–₹1,15,000/month AIIMS Senior Resident Pay Matrix"
      },
      {
        name: "GPAT / NIPER JEE (National Institute of Pharm Education & Research)",
        conducting: "NTA / NIPER Joint Entrance Committee",
        targetDegrees: "M.Pharm, M.S. (Pharm), M.Tech (Pharm), MBA (Pharm)",
        eligibility: "B.Pharm (Bachelor of Pharmacy) 4-Year Degree",
        keyInstitutes: "NIPER SAS Nagar (Mohali), NIPER Ahmedabad, NIPER Hyderabad, Jamia Hamdard, ICT Mumbai",
        psuRecruitment: "Sun Pharma, Dr. Reddy's, Biocon, Pfizer, Novartis, CDSCO Drug Inspector Track",
        stipend: "₹12,400/month AICTE / NIPER Fellowship"
      },
      {
        name: "AIAPGET (All India AYUSH Post Graduate Entrance Test)",
        conducting: "National Testing Agency (NTA)",
        targetDegrees: "MD / MS in Ayurveda, Siddha, Unani & Homeopathy",
        eligibility: "BAMS / BSMS / BUMS / BHMS degree with completed internship",
        keyInstitutes: "National Institute of Ayurveda (NIA Jaipur), Govt Siddha Medical College Palayamkottai, NIH Kolkata",
        psuRecruitment: "Ministry of AYUSH, CCRAS, CCRS, State AYUSH Medical Officers",
        stipend: "₹50,000–₹85,000/month State / Central Resident Stipend"
      }
    ],
    'mgmt': [
      {
        name: "CAT (Common Admission Test)",
        conducting: "Indian Institutes of Management (IIMs)",
        targetDegrees: "MBA, PGDM, Executive MBA, Ph.D. in Management",
        eligibility: "Bachelor's degree in any discipline with minimum 50% (45% for SC/ST/PwD)",
        keyInstitutes: "IIM Ahmedabad, IIM Bangalore, IIM Calcutta, IIM Kozhikode, FMS Delhi, SPJIMR, IIT DoMs",
        psuRecruitment: "McKinsey, BCG, Goldman Sachs, Google, HUL, Tata Admin Services (TAS)",
        stipend: "Summer Internships ₹1.5L–₹4.5L/month; Median Final CTC ₹28L–₹35L PA"
      },
      {
        name: "XAT (Xavier Aptitude Test)",
        conducting: "XLRI Jamshedpur",
        targetDegrees: "PGDM (Business Management - BM, Human Resource Management - HRM)",
        eligibility: "3 or 4-year Bachelor's degree in any stream",
        keyInstitutes: "XLRI Jamshedpur, XLRI Delhi-NCR, XIMB Bhubaneswar, IMT Ghaziabad, TAPMI",
        psuRecruitment: "Global HR Leadership, Top Strategy & Management Consulting",
        stipend: "Median Final Package ₹30.0 LPA (XLRI)"
      },
      {
        name: "NMAT / SNAP / CMAT (National Management Tests)",
        conducting: "GMAC / Symbiosis / NTA",
        targetDegrees: "MBA in Marketing, Finance, Operations, IT, Business Analytics",
        eligibility: "Graduation in any stream with minimum 50%",
        keyInstitutes: "NMIMS Mumbai, SIBM Pune, SCMHRD, JBIMS, GIM Goa, Great Lakes Chennai",
        psuRecruitment: "Big 4 Consulting (Deloitte, PwC, EY, KPMG), FMCG, Private Wealth Banks",
        stipend: "Median CTC ₹15L–₹24L PA"
      }
    ],
    'sci': [
      {
        name: "IIT JAM (Joint Admission test for Masters)",
        conducting: "IITs & IISc on rotation",
        targetDegrees: "M.Sc (Physics/Chem/Maths/Biotech/Geology), Joint M.Sc-Ph.D., M.Sc-Tech",
        eligibility: "Bachelor's degree in relevant Science field with 55% min",
        keyInstitutes: "IISc Bangalore, IIT Bombay, IIT Madras, IIT Delhi, IIT Kanpur, IISERs",
        psuRecruitment: "ISRO, DRDO, BARC Scientific Officer, ONGC, CSIR Labs",
        stipend: "Direct pathway to CSIR-JRF ₹37,000/month + HRA during Ph.D."
      },
      {
        name: "JEST & TIFR GS (Physics & Theoretical Computer Science)",
        conducting: "Premier Science Research Institutes Consortium",
        targetDegrees: "Integrated Ph.D. & Ph.D. in Physics, Astronomy, Neuroscience, Theoretical CS",
        eligibility: "B.Sc / B.E. / B.Tech / M.Sc in Physical Sciences / Math / Engg",
        keyInstitutes: "TIFR Mumbai, IMSc Chennai, RRI Bangalore, IUCAA Pune, HRI Prayagraj, SINP",
        psuRecruitment: "CERN Collaborations, Quantum Computing Labs, Space Science",
        stipend: "₹37,000–₹42,000/month Fellowships with on-campus subsidized housing"
      },
      {
        name: "CUET-PG (Central Universities Entrance Test PG)",
        conducting: "National Testing Agency (NTA)",
        targetDegrees: "M.Sc, M.A., MCA, M.Ed, M.Tech across 70+ Central Universities",
        eligibility: "Bachelor's degree in relevant discipline",
        keyInstitutes: "JNU New Delhi, Delhi University (DU), BHU Varanasi, Univ of Hyderabad (UoH), Central Univ of TN",
        psuRecruitment: "Academic Research, UPSC Civil Services, Public Think Tanks, ICSSR",
        stipend: "Non-NET fellowships & Central Govt Merit Scholarships"
      }
    ],
    'law': [
      {
        name: "CLAT-PG (Common Law Admission Test PG)",
        conducting: "Consortium of National Law Universities",
        targetDegrees: "One-Year Master of Laws (LL.M.) in Corporate, Constitutional, IPR, Criminal Law",
        eligibility: "LL.B. degree or equivalent with minimum 50% marks",
        keyInstitutes: "NLSIU Bengaluru, NALSAR Hyderabad, WBNUJS Kolkata, NLU Jodhpur, GNLU Gandhinagar",
        psuRecruitment: "PSU Legal Advisors (ONGC, IOCL, PGCIL, BHEL Legal Officers via CLAT-PG score)",
        stipend: "Top Law Firms (Shardul Amarchand, Cyril Amarchand, AZB & Partners) ₹14L–₹20L PA"
      },
      {
        name: "State Judicial Services Examination (PCS-J)",
        conducting: "State Public Service Commissions & High Courts",
        targetDegrees: "Direct Appointment as Civil Judge (Junior Division) / Judicial Magistrate",
        eligibility: "LL.B. Degree from a BCI recognized university + Enrollment with State Bar Council",
        keyInstitutes: "Tamil Nadu Judicial Academy, National Judicial Academy Bhopal",
        psuRecruitment: "State Subordinate Judiciary (Gazetted Class-1 Judicial Officer)",
        stipend: "7th Pay Commission Judicial Scale (₹77,840 - ₹1,36,520) + Official Residence & Vehicle"
      }
    ]
  };

  // ==========================================================================
  // MASTER COUNTRY-WISE INTERNATIONAL STUDY ABROAD DATABASE
  // ==========================================================================
  const COUNTRY_STUDY_DATA = {
    'usa': {
      country: "United States (USA)",
      flag: "🇺🇸",
      tagline: "Global Hub for Tech Innovation, Biotech, AI & High CTC Packages",
      topUnis: "MIT, Stanford, UC Berkeley, CMU, Harvard, UT Austin, Georgia Tech, Purdue",
      targetDegrees: "MS in Computer Science, Data Science, AI, Mechanical, Bioengineering, MBA",
      workPermit: "3-Year STEM OPT Extension on F-1 Student Visa",
      avgTuition: "$25,000 – $55,000 / year (TA/RA offer 100% waiver + $2k/mo stipend)",
      medianSalary: "$115,000 – $165,000 / year (₹95L – ₹1.35 Cr PA)",
      exams: "GRE (315+ recommended) + TOEFL iBT (100+) / IELTS (7.5+)",
      specialLicenses: "USMLE Steps 1–3 (For Medical Doctor Residency), NCLEX-RN (Nursing), FPGEE (Pharmacy)"
    },
    'germany': {
      country: "Germany (Europe)",
      flag: "🇩🇪",
      tagline: "Zero/Low Tuition Fees at Top Public Universities with 18-Month Jobseeker Visa",
      topUnis: "Technical University of Munich (TUM), RWTH Aachen, TU Berlin, Univ of Stuttgart, KIT Karlsruhe",
      targetDegrees: "MS in Automotive Engg, Robotics, Electrical & Computer Engg, Sustainable Energy, Data Science",
      workPermit: "18-Month Post-Study Work / Jobseeker Visa leading directly to EU Blue Card & Permanent Residency",
      avgTuition: "€0 – €1,500 / semester (Near Zero Tuition at all public universities, only ~€300 admin fee)",
      medianSalary: "€58,000 – €78,000 / year (₹52L – ₹70L PA)",
      exams: "APS Certificate (Mandatory for Indians) + IELTS (6.5+) + GRE (select programs like TUM)",
      specialLicenses: "FSP / Kenntnisprüfung (For Indian MBBS to practice as German Arzt/Doctor)"
    },
    'uk': {
      country: "United Kingdom (UK)",
      flag: "🇬🇧",
      tagline: "1-Year Fast-Track Masters with 2-Year Graduate Route Work Visa",
      topUnis: "Imperial College London, UCL, University of Oxford, Cambridge, Manchester, Edinburgh, Warwick",
      targetDegrees: "MSc in Advanced Computing, Artificial Intelligence, Finance & Investment, Biomedical Science, LLM",
      workPermit: "2-Year Post-Study Graduate Route Visa without sponsorship requirement",
      avgTuition: "£18,000 – £36,000 / year (Chevening & Commonwealth 100% Full Scholarships available)",
      medianSalary: "£42,000 – £65,000 / year (₹45L – ₹70L PA)",
      exams: "IELTS Academic (6.5–7.5) + Strong Undergraduate GPA (GRE not mandatory for most UK unis)",
      specialLicenses: "PLAB / UKMLA (For NHS Medical Practice), SQE 1 & 2 (Solicitors Qualifying Exam for Law)"
    },
    'canada': {
      country: "Canada",
      flag: "🇨🇦",
      tagline: "3-Year Post-Graduation Work Permit (PGWP) with Streamlined Express Entry PR",
      topUnis: "University of Toronto (UofT), Univ of British Columbia (UBC), McGill, Univ of Waterloo, Alberta",
      targetDegrees: "M.Eng / M.Sc in Software Engg, Data Analytics, Mechanical, Biotechnology, MBA",
      workPermit: "Up to 3-Year PGWP open work permit + Provincial Nominee Program (PNP) PR pathways",
      avgTuition: "CAD $20,000 – $42,000 / year",
      medianSalary: "CAD $75,000 – $105,000 / year (₹46L – ₹65L PA)",
      exams: "IELTS Academic (6.5–7.0) / PTE + WES Credential Evaluation",
      specialLicenses: "PEBC Exam (For Pharmacy License in Canada), MCCQE Part 1 (Medical Doctor)"
    },
    'australia': {
      country: "Australia",
      flag: "🇦🇺",
      tagline: "Group of Eight World-Ranked Universities with 2-4 Year Post-Study Work Rights",
      topUnis: "University of Melbourne, UNSW Sydney, Univ of Sydney, Australian National Univ (ANU), Monash",
      targetDegrees: "Master of Information Tech, Engineering, Public Health, Nursing Practice, Mining & Resources",
      workPermit: "2 to 4-Year Temporary Graduate Visa (Subclass 485) depending on regional study location",
      avgTuition: "AUD $32,000 – $48,000 / year (Australia Awards & Destination Australia Scholarships)",
      medianSalary: "AUD $80,000 – $110,000 / year (₹44L – ₹60L PA)",
      exams: "IELTS Academic (6.5–7.0) or PTE Academic (65+)",
      specialLicenses: "AMC Clinical (Australian Medical Council), AHPRA Registration (Nursing & Healthcare)"
    },
    'singapore': {
      country: "Singapore",
      flag: "🇸🇬",
      tagline: "Asia's Premier Tech & Finance Capital with World Top-15 Universities",
      topUnis: "National University of Singapore (NUS - World #8), Nanyang Technological University (NTU - World #15)",
      targetDegrees: "M.Sc in Computer Science, Financial Engineering, AI & Automation, Smart City Systems",
      workPermit: "Employment Pass (EP) / S-Pass with MOE Tuition Grant 3-Year Service Obligation",
      avgTuition: "SGD $22,000 – $38,000 / year with MOE Grant Subsidy",
      medianSalary: "SGD $72,000 – $108,000 / year (₹45L – ₹68L PA)",
      exams: "GRE (320+) + IELTS (7.0+) / TOEFL (100+)",
      specialLicenses: "SMC (Singapore Medical Council for recognized medical degrees)"
    },
    'ireland': {
      country: "Ireland",
      flag: "🇮🇪",
      tagline: "European Silicon Valley & Global Pharma Headquarters with 2-Year Stay Back",
      topUnis: "Trinity College Dublin (TCD), University College Dublin (UCD), Univ of Galway, Dublin City Univ (DCU)",
      targetDegrees: "M.Sc in Data Science, Cloud Computing, Pharmaceutical Sciences, International Management",
      workPermit: "2-Year Third Level Graduate Scheme (Stamp 1G) leading to Critical Skills Work Permit",
      avgTuition: "€14,000 – €26,000 / year (Government of Ireland International Education Scholarships)",
      medianSalary: "€45,000 – €68,000 / year (₹40L – ₹62L PA)",
      exams: "IELTS Academic (6.5+) / Duolingo English Test (120+)",
      specialLicenses: "PSI Registration (Pharmaceutical Society of Ireland), IMC (Irish Medical Council)"
    },
    'japan-korea': {
      country: "Japan & South Korea",
      flag: "🇯🇵 🇰🇷",
      tagline: "World Leaders in High-Tech Robotics, Semiconductors & Full Govt Scholarships (MEXT / GKS)",
      topUnis: "University of Tokyo, Tokyo Tech, Kyoto Univ, KAIST, Seoul National Univ (SNU), POSTECH",
      targetDegrees: "MS / Ph.D. in Robotics, Mechatronics, Semiconductor Device Physics, Advanced AI",
      workPermit: "Designated Activities Visa (1 Year Job Hunt) leading to Highly Skilled Professional Visa",
      avgTuition: "100% Tuition Waived under MEXT (Japan) & GKS (Korea) + ₹80,000–₹1,00,000/mo stipend",
      medianSalary: "¥5.5M – ¥8.0M / ₩60M – ₩85M / year (₹35L – ₹55L PA)",
      exams: "GRE / TOEFL + MEXT / GKS Scholarship Exam (No Japanese/Korean required initially)",
      specialLicenses: "High-Tech R&D Direct Corporate Fast-Track (Sony, Toyota, Samsung, LG, Tokyo Electron)"
    }
  };

  function getPGAndGlobalPathwaysForCourse(course) {
    const text = (course.domain + " " + course.cluster + " " + course.course).toLowerCase();
    let pgList = PG_EXAMS_DATA['engg'];
    let countryKeys = ['usa', 'germany', 'uk', 'singapore', 'canada'];

    if (text.includes('medic') || text.includes('mbbs') || text.includes('bds') || text.includes('ayush') || text.includes('nurs') || text.includes('physio')) {
      pgList = PG_EXAMS_DATA['med'];
      countryKeys = ['usa', 'uk', 'australia', 'germany'];
    } else if (text.includes('pharm') || text.includes('d.pharm') || text.includes('b.pharm')) {
      pgList = PG_EXAMS_DATA['med'];
      countryKeys = ['usa', 'ireland', 'germany', 'canada'];
    } else if (text.includes('com') || text.includes('account') || text.includes('bba') || text.includes('manage') || text.includes('financ') || text.includes('market') || text.includes('hotel')) {
      pgList = PG_EXAMS_DATA['mgmt'];
      countryKeys = ['usa', 'uk', 'singapore', 'france', 'canada'];
    } else if (text.includes('law') || text.includes('llb') || text.includes('legal') || text.includes('judic')) {
      pgList = PG_EXAMS_DATA['law'];
      countryKeys = ['uk', 'usa', 'singapore', 'canada'];
    } else if (text.includes('b.sc') || text.includes('physic') || text.includes('chem') || text.includes('math') || text.includes('biotech') || text.includes('agri')) {
      pgList = PG_EXAMS_DATA['sci'];
      countryKeys = ['germany', 'usa', 'japan-korea', 'uk'];
    }

    const countries = countryKeys.map(k => COUNTRY_STUDY_DATA[k]).filter(Boolean);
    return { pgList, countries };
  }

  function renderPGExamCardsHtml(list) {
    if (!list || list.length === 0) return '';
    return list.map(p => `
      <div class="pg-exam-card">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:6px;">
            <span class="exam-pill-badge">🇮🇳 ${p.conducting}</span>
          </div>
          <h4 style="font-size:0.84rem; font-weight:700; color:var(--text-primary); margin-top:6px;">${p.name}</h4>
          <div style="font-size:0.72rem; color:var(--accent-cyan); font-weight:600; margin-top:2px;">
            🎯 ${p.targetDegrees}
          </div>
          <p style="font-size:0.7rem; color:var(--text-secondary); margin-top:4px;">
            <strong>Eligibility:</strong> ${p.eligibility}
          </p>
        </div>
        <div style="margin-top:8px; padding-top:6px; border-top:1px solid var(--border-glass);">
          <div style="font-size:0.67rem; color:var(--text-muted);">
            🏫 <strong>Top Institutes:</strong> ${p.keyInstitutes}
          </div>
          <div style="font-size:0.67rem; color:#34d399; font-weight:700; margin-top:4px;">
            💰 ${p.stipend}
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderCountryStudyCardsHtml(list) {
    if (!list || list.length === 0) return '';
    return list.map(c => `
      <div class="country-study-card">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; gap:6px;">
            <span style="font-size:1.1rem;">${c.flag}</span>
            <span class="visa-chip">🛂 ${c.workPermit.split('(')[0]}</span>
          </div>
          <h4 style="font-size:0.84rem; font-weight:700; color:var(--text-primary); margin-top:4px;">${c.country}</h4>
          <p style="font-size:0.71rem; color:var(--accent-cyan); margin-top:2px;">
            ${c.tagline}
          </p>
        </div>
        <div style="margin-top:6px;">
          <div style="font-size:0.68rem; color:var(--text-muted); line-height:1.3;">
            🎓 <strong>Top Universities:</strong> ${c.topUnis}
          </div>
          <div style="font-size:0.68rem; color:var(--text-secondary); margin-top:3px;">
            📝 <strong>Exams:</strong> ${c.exams}
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:6px; font-size:0.66rem;">
            <span class="country-tuition-chip">💳 ${c.avgTuition.split('(')[0]}</span>
            <span style="color:#34d399; font-weight:700;">💼 ${c.medianSalary.split('(')[0]}</span>
          </div>
          ${c.specialLicenses ? `<div style="font-size:0.64rem; color:#a78bfa; margin-top:4px;">🩺 ${c.specialLicenses}</div>` : ''}
        </div>
      </div>
    `).join('');
  }

  // ==========================================================================
  // MASTER INTERNSHIP PROGRAMMES & TOP RECRUITING COMPANIES RESOLVER
  // ==========================================================================
  function getInternshipsAndRecruitersForCourse(course) {
    const text = ((course.domain || '') + " " + (course.cluster || '') + " " + (course.course || '') + " " + (course.keySubjects || '')).toLowerCase();

    // 1. Computer Science, AI, Cloud, Cyber Security, Data
    if (text.includes('comput') || text.includes('software') || text.includes('data') || text.includes('artificial intelligence') || text.includes('ai &') || text.includes('cyber') || text.includes('cloud') || text.includes('it &') || text.includes('information tech')) {
      return {
        topRecruiters: ["Google", "Microsoft", "Amazon", "NVIDIA", "Apple", "Adobe", "Qualcomm", "Cisco", "Oracle", "Zoho", "TCS Digital", "Infosys", "Freshworks", "Atlassian"],
        roles: ["Software Development Engineer (SDE-1)", "AI / Machine Learning Engineer", "Cloud Solutions Architect", "Cyber Security Analyst", "Full-Stack Web & Mobile Engineer", "Data Scientist"],
        avgStartingCtc: "₹8.5 LPA – ₹24.0 LPA",
        highestCtc: "₹58.0 LPA (Domestic) / ₹1.45 Cr (Intl)",
        stipendRange: "₹30,000 – ₹1,25,000 / month",
        ppoRate: "78% Pre-Placement Offer (PPO) Conversion",
        programs: [
          {
            name: "Google Summer of Code (GSoC)",
            org: "Google Open Source",
            desc: "Prestigious global 12-week open-source software development fellowship working with premier international technology organizations.",
            stipend: "$1,500 – $3,000 Total Grant",
            portalUrl: "https://summerofcode.withgoogle.com"
          },
          {
            name: "Microsoft Engage & Amazon WOW",
            org: "Microsoft & Amazon Global",
            desc: "Exclusive summer mentorship & technical co-op program fast-tracking candidates directly into high-paying SDE full-time hiring pipelines.",
            stipend: "₹80,000 – ₹1,25,000 / month",
            portalUrl: "https://careers.microsoft.com/students"
          },
          {
            name: "AICTE National Technology Internship Portal",
            org: "Govt of India / MoE",
            desc: "Central Government internship scheme partnering with 10,000+ top Indian tech companies, public enterprises, and municipal smart cities.",
            stipend: "₹15,000 – ₹35,000 / month",
            portalUrl: "https://internship.aicte-india.org"
          }
        ]
      };
    }

    // 2. Electronics, VLSI, Embedded, Telecom
    if (text.includes('electron') || text.includes('vlsi') || text.includes('embedded') || text.includes('semiconductor') || text.includes('telecom') || text.includes('ece') || text.includes('microelectron')) {
      return {
        topRecruiters: ["Texas Instruments", "Qualcomm", "Intel", "NVIDIA", "AMD", "Samsung Semiconductor", "MediaTek", "Bharat Electronics (BEL)", "Schneider Electric", "Broadcom"],
        roles: ["VLSI Chip Design Engineer", "Embedded Firmware Developer", "RTL Verification Engineer", "Silicon Validation Engineer", "Hardware Systems Architect"],
        avgStartingCtc: "₹9.5 LPA – ₹26.0 LPA",
        highestCtc: "₹48.0 LPA",
        stipendRange: "₹35,000 – ₹95,000 / month",
        ppoRate: "74% PPO Conversion",
        programs: [
          {
            name: "Texas Instruments Analog & Digital Co-op",
            org: "Texas Instruments India",
            desc: "Live silicon design & board-level validation internship with dedicated mentorship from principal hardware architects.",
            stipend: "₹45,000 – ₹60,000 / month",
            portalUrl: "https://careers.ti.com"
          },
          {
            name: "Qualcomm Wireless & 5G Summer Intern",
            org: "Qualcomm Research",
            desc: "Hands-on engineering on next-generation Snapdragon modems, DSP firmware, and wireless communication protocols.",
            stipend: "₹85,000 – ₹1,00,000 / month",
            portalUrl: "https://qualcomm.com/company/careers"
          },
          {
            name: "C-DAC & ARM VLSI Chip Design Cohort",
            org: "Ministry of Electronics & IT (MeitY)",
            desc: "National semiconductor mission initiative training students on RISC-V processor architecture and EDA tool pipelines.",
            stipend: "₹20,000 – ₹35,000 / month",
            portalUrl: "https://cdac.in"
          }
        ]
      };
    }

    // 3. Mechanical, Automobile, Aerospace, Robotics, Mechatronics, EV
    if (text.includes('mechanic') || text.includes('automob') || text.includes('aerosp') || text.includes('robot') || text.includes('mechatron') || text.includes('electric vehicle') || text.includes('thermal') || text.includes('manufacturing')) {
      return {
        topRecruiters: ["Tata Motors", "Mahindra & Mahindra", "Larsen & Toubro (L&T)", "ISRO", "DRDO", "Bosch", "Boeing", "Airbus", "Rolls-Royce", "Tesla", "Ashok Leyland", "Siemens"],
        roles: ["Automotive Systems Engineer", "Robotics & Automation Lead", "Aerospace Propulsion Engineer", "EV Powertrain Specialist", "CAE / FEA Structural Analyst"],
        avgStartingCtc: "₹6.8 LPA – ₹18.5 LPA",
        highestCtc: "₹32.0 LPA",
        stipendRange: "₹18,000 – ₹45,000 / month",
        ppoRate: "68% PPO Conversion",
        programs: [
          {
            name: "ISRO & DRDO Student Research Projects",
            org: "ISRO / DRDO Labs",
            desc: "Live launch vehicle aerodynamics, payload mechanical structures, and missile propulsion R&D co-op for engineering undergraduates.",
            stipend: "₹20,000 / month + Lab Access",
            portalUrl: "https://isro.gov.in"
          },
          {
            name: "Tata Motors & Mahindra Summer Co-op",
            org: "Tata Motors / M&M",
            desc: "Electric vehicle powertrain prototyping, crash testing analysis, and smart plant manufacturing assembly line rotations.",
            stipend: "₹25,000 – ₹40,000 / month",
            portalUrl: "https://tatamotors.com/careers"
          },
          {
            name: "Bosch Industry 4.0 & Robotics Fellowship",
            org: "Bosch Global Software",
            desc: "Autonomous robotics, industrial IoT sensors, and computer vision deployment in smart automated factories.",
            stipend: "₹30,000 – ₹45,000 / month",
            portalUrl: "https://bosch.in/careers"
          }
        ]
      };
    }

    // 4. Civil, Architecture, Structural, Urban Planning
    if (text.includes('civil') || text.includes('architect') || text.includes('structur') || text.includes('urban') || text.includes('construct') || text.includes('b.arch') || text.includes('b.plan')) {
      return {
        topRecruiters: ["L&T Construction", "Shapoorji Pallonji", "Tata Consulting Engineers (TCE)", "AECOM", "Atkins", "DLF", "NBCC", "Gammon India", "Arcadis", "Hafeez Contractor"],
        roles: ["Structural Design Engineer", "BIM 3D Modeler", "Project Planning Engineer", "Architectural Designer", "Geotechnical & Highway Engineer"],
        avgStartingCtc: "₹5.8 LPA – ₹15.0 LPA",
        highestCtc: "₹24.0 LPA",
        stipendRange: "₹15,000 – ₹35,000 / month",
        ppoRate: "65% PPO Conversion",
        programs: [
          {
            name: "L&T Build India Scholarship Internship",
            org: "Larsen & Toubro Ltd",
            desc: "Metro rail tunnels, smart city airports, and iconic suspension bridge construction engineering site leadership training.",
            stipend: "₹20,000 – ₹35,000 / month",
            portalUrl: "https://lntecc.com"
          },
          {
            name: "NHAI Highway & Expressways Student Field Traineeship",
            org: "National Highways Authority of India",
            desc: "Practical on-site highway quality inspection, geotechnical soil mechanics, and drone GIS topographical surveying.",
            stipend: "₹15,000 – ₹25,000 / month",
            portalUrl: "https://nhai.gov.in"
          },
          {
            name: "CoA Architectural Practical Training (6-Month Mandatory)",
            org: "Council of Architecture (CoA)",
            desc: "Full semester architectural design studio rotation working on client blueprints, 3D renders, and municipal approvals.",
            stipend: "₹15,000 – ₹30,000 / month",
            portalUrl: "https://coa.gov.in"
          }
        ]
      };
    }

    // 5. Medicine, MBBS, BDS, Healthcare
    if (text.includes('medic') || text.includes('mbbs') || text.includes('bds') || text.includes('dental') || text.includes('surge') || text.includes('ayush') || text.includes('clinical') || text.includes('hospital')) {
      return {
        topRecruiters: ["Apollo Hospitals", "Fortis Healthcare", "AIIMS", "Manipal Hospitals", "Max Healthcare", "Aster DM Healthcare", "Narayana Health", "WHO", "Medanta The Medicity"],
        roles: ["Medical Officer", "Junior Resident Doctor", "Emergency Medicine Registrar", "Intensive Care Unit (ICU) Specialist", "Hospital Clinical Administrator"],
        avgStartingCtc: "₹12.0 LPA – ₹32.0 LPA",
        highestCtc: "₹65.0 LPA (Specialist / Super-Specialist)",
        stipendRange: "₹25,000 – ₹45,000 / month",
        ppoRate: "95% Direct Hospital Absorption",
        programs: [
          {
            name: "Compulsory Rotatory Residential Internship (CRRI - 1 Year)",
            org: "National Medical Commission (NMC)",
            desc: "Mandatory 365-day clinical hospital rotation through General Medicine, General Surgery, OBG, Pediatrics, Casualty & Community Health.",
            stipend: "₹25,000 – ₹38,000 / month",
            portalUrl: "https://nmc.org.in"
          },
          {
            name: "ICMR Short Term Studentship (STS Fellowship)",
            org: "Indian Council of Medical Research",
            desc: "Prestigious national biomedical research grant enabling undergraduate doctors to lead independent clinical epidemiology studies.",
            stipend: "₹50,000 Total Research Grant",
            portalUrl: "https://icmr.nic.in"
          },
          {
            name: "AIIMS & JIPMER Clinical Electives Cohort",
            org: "Premier Medical Institutes",
            desc: "Advanced trauma resuscitation, surgical observation, and intensive care patient management in premier tertiary hospitals.",
            stipend: "Subsidized Resident Stipend",
            portalUrl: "https://aiims.edu"
          }
        ]
      };
    }

    // 6. Pharmacy (B.Pharm, Pharm.D, D.Pharm)
    if (text.includes('pharm') || text.includes('d.pharm') || text.includes('b.pharm') || text.includes('drug') || text.includes('medicinal')) {
      return {
        topRecruiters: ["Sun Pharma", "Dr. Reddy's Laboratories", "Cipla", "Pfizer", "Novartis", "AstraZeneca", "Biocon", "Lupin", "GSK", "IQVIA", "Syngene International"],
        roles: ["Clinical Pharmacist", "Drug Regulatory Affairs (DRA) Associate", "Formulation R&D Scientist", "Pharmacovigilance (PV) Safety Specialist", "Quality Control (QC/QA) Lead"],
        avgStartingCtc: "₹5.5 LPA – ₹16.0 LPA",
        highestCtc: "₹28.0 LPA",
        stipendRange: "₹18,000 – ₹40,000 / month",
        ppoRate: "72% PPO Conversion",
        programs: [
          {
            name: "Pharm.D 1-Year Clinical Residency Training",
            org: "Pharmacy Council of India (PCI)",
            desc: "Comprehensive hospital-bedside clinical rotations assisting physicians in therapeutic drug monitoring, adverse drug reactions, and dosage regimens.",
            stipend: "₹18,000 – ₹30,000 / month",
            portalUrl: "https://pci.nic.in"
          },
          {
            name: "Dr. Reddy's & Biocon Industrial Formulation Intern",
            org: "Top Pharma MNCs",
            desc: "Hands-on cGMP sterile manufacturing, tablet dissolution testing, HPLC/GC analysis, and FDA regulatory dossier drafting.",
            stipend: "₹20,000 – ₹35,000 / month",
            portalUrl: "https://drreddys.com/careers"
          },
          {
            name: "CSIR-CDRI Drug Discovery Summer Fellowship",
            org: "Central Drug Research Institute",
            desc: "Advanced training in medicinal chemistry synthesis, molecular docking, and preclinical pharmaceutical toxicity evaluation.",
            stipend: "₹15,000 / month + Lab Housing",
            portalUrl: "https://cdri.res.in"
          }
        ]
      };
    }

    // 7. Biotechnology, Bioinformatics, Life Sciences
    if (text.includes('biotech') || text.includes('bioinform') || text.includes('biomed') || text.includes('genet') || text.includes('microbiol') || text.includes('biochem')) {
      return {
        topRecruiters: ["Biocon", "Serum Institute of India", "Thermo Fisher Scientific", "Illumina", "Bharat Biotech", "Novozymes", "Reliance Life Sciences", "Medtronic", "Agilent"],
        roles: ["Bioprocess Engineer", "Bioinformatics Pipeline Analyst", "Genetic Engineering Researcher", "Clinical Trial Data Coordinator", "Biomedical Instrumentation Lead"],
        avgStartingCtc: "₹6.0 LPA – ₹18.0 LPA",
        highestCtc: "₹30.0 LPA",
        stipendRange: "₹15,000 – ₹38,000 / month",
        ppoRate: "70% PPO Conversion",
        programs: [
          {
            name: "DBT-Biotech Industrial Training Programme (BITP)",
            org: "Department of Biotechnology (Govt of India)",
            desc: "National 6-month hands-on industrial biotechnology training in top Indian biotech and vaccine manufacturing corporations.",
            stipend: "₹15,000 / month Govt Stipend",
            portalUrl: "https://dbtindia.gov.in"
          },
          {
            name: "CSIR-CCMB & NCBS Summer Research Fellowship",
            org: "Centre for Cellular and Molecular Biology",
            desc: "Next-generation genomic sequencing, CRISPR gene editing, and recombinant protein purification research.",
            stipend: "₹12,500 – ₹20,000 / month",
            portalUrl: "https://ccmb.res.in"
          },
          {
            name: "Indian Academy of Sciences (IASc-INSA) Summer Fellowship",
            org: "IASc Bangalore",
            desc: "2-month funded research fellowship paired with premier research scientists across Indian universities.",
            stipend: "₹12,500 / month + Travel Grant",
            portalUrl: "https://web-japps.ias.ac.in"
          }
        ]
      };
    }

    // 8. Commerce, Finance, CA, Banking, FinTech
    if (text.includes('com') || text.includes('account') || text.includes('financ') || text.includes('bank') || text.includes('fintech') || text.includes('tax') || text.includes('audit') || text.includes('invest')) {
      return {
        topRecruiters: ["Deloitte", "PwC", "EY", "KPMG", "Goldman Sachs", "Morgan Stanley", "J.P. Morgan", "HDFC Bank", "ICICI Bank", "Standard Chartered", "Zerodha", "Razorpay"],
        roles: ["Investment Banking Analyst", "Statutory Audit Associate", "Tax & Transfer Pricing Consultant", "Financial Risk Modeling Analyst", "Corporate Treasury & FinTech Lead"],
        avgStartingCtc: "₹7.5 LPA – ₹22.0 LPA",
        highestCtc: "₹38.0 LPA",
        stipendRange: "₹15,000 – ₹65,000 / month",
        ppoRate: "82% PPO Conversion",
        programs: [
          {
            name: "ICAI Mandatory 2-Year Articleship (CA Inter)",
            org: "Institute of Chartered Accountants of India",
            desc: "Rigorous full-time statutory audit, corporate taxation, and internal control assurance with Big 4 and premier chartered accountancy firms.",
            stipend: "₹15,000 – ₹30,000 / month",
            portalUrl: "https://icai.org"
          },
          {
            name: "Goldman Sachs & J.P. Morgan Summer Analyst",
            org: "Global Investment Banks",
            desc: "Front-office equity research, financial valuation modeling, and algorithmic wealth management trading operations.",
            stipend: "₹65,000 – ₹90,000 / month",
            portalUrl: "https://goldmansachs.com/careers"
          },
          {
            name: "Reserve Bank of India (RBI) Summer Internship",
            org: "Reserve Bank of India",
            desc: "Macroeconomic monetary policy research, digital banking security frameworks, and forex market operations.",
            stipend: "₹45,000 / month",
            portalUrl: "https://rbi.org.in"
          }
        ]
      };
    }

    // 9. Management, BBA, Marketing, HR, Hospitality
    if (text.includes('manage') || text.includes('bba') || text.includes('market') || text.includes('human resource') || text.includes('hr') || text.includes('supply chain') || text.includes('logistics') || text.includes('hotel') || text.includes('tourism')) {
      return {
        topRecruiters: ["McKinsey & Company", "BCG", "Bain & Company", "Hindustan Unilever (HUL)", "Procter & Gamble (P&G)", "Amazon Operations", "Marriott International", "Taj Hotels (IHCL)", "ITC Limited"],
        roles: ["Management Trainee", "Brand & Digital Marketing Associate", "Supply Chain Operations Lead", "Human Resources Business Partner (HRBP)", "Hotel & Hospitality Operations Executive"],
        avgStartingCtc: "₹6.5 LPA – ₹20.0 LPA",
        highestCtc: "₹35.0 LPA",
        stipendRange: "₹20,000 – ₹80,000 / month",
        ppoRate: "75% PPO Conversion",
        programs: [
          {
            name: "HUL Changemakers & P&G CEO Challenge",
            org: "Hindustan Unilever / P&G",
            desc: "Fast-track consumer goods market launch strategy, brand growth, and direct Pre-Placement Interview fast-track.",
            stipend: "₹50,000 – ₹80,000 / month",
            portalUrl: "https://hul.co.in/careers"
          },
          {
            name: "Amazon Operations Pathways Internship",
            org: "Amazon Operations",
            desc: "Leading robotics-driven warehouse logistics, last-mile delivery analytics, and supply chain fulfillment teams.",
            stipend: "₹45,000 – ₹65,000 / month",
            portalUrl: "https://amazon.jobs/students"
          },
          {
            name: "NITI Aayog Policy & Strategic Management Internship",
            org: "NITI Aayog (Govt of India)",
            desc: "Working directly with IAS officers and economic advisors on national public policy and state development schemes.",
            stipend: "Certificate + Fellowship Credit",
            portalUrl: "https://niti.gov.in"
          }
        ]
      };
    }

    // 10. Law, Legal Studies, Judiciary
    if (text.includes('law') || text.includes('ll.b') || text.includes('llb') || text.includes('legal') || text.includes('judic') || text.includes('crimin') || text.includes('jurisp')) {
      return {
        topRecruiters: ["Shardul Amarchand Mangaldas", "Cyril Amarchand Mangaldas", "AZB & Partners", "Trilegal", "Khaitan & Co", "L&L Partners", "Tata Sons Legal", "Google Legal", "Reliance Legal"],
        roles: ["Corporate M&A Associate", "Dispute Resolution & Litigation Counsel", "Intellectual Property (IPR) Attorney", "Cyber Law & Data Privacy Advisor", "In-House Corporate Counsel"],
        avgStartingCtc: "₹11.0 LPA – ₹20.0 LPA",
        highestCtc: "₹26.0 LPA",
        stipendRange: "₹15,000 – ₹50,000 / month",
        ppoRate: "76% PPO Conversion",
        programs: [
          {
            name: "Tier-1 Law Firm Summer & Winter Associate Program",
            org: "Consortium of Top Indian Law Firms",
            desc: "High-stakes corporate mergers, cross-border investments, and commercial contract drafting with senior partners.",
            stipend: "₹25,000 – ₹50,000 / month",
            portalUrl: "https://amarchand.com"
          },
          {
            name: "Supreme Court & High Court Judicial Clerkships",
            org: "Supreme Court of India",
            desc: "Legal research, case briefing, and constitutional law precedent analysis assisting Sitting Judges of the Apex Court.",
            stipend: "₹65,000 / month (Law Clerks)",
            portalUrl: "https://main.sci.gov.in"
          },
          {
            name: "Competition Commission of India (CCI) & NHRC Internship",
            org: "Ministry of Corporate Affairs",
            desc: "Antitrust enforcement, market merger regulation, and human rights constitutional protection review.",
            stipend: "₹15,000 / month",
            portalUrl: "https://cci.gov.in"
          }
        ]
      };
    }

    // 11. Design, UI/UX, Product Design, Media
    if (text.includes('design') || text.includes('ui/ux') || text.includes('animat') || text.includes('vfx') || text.includes('fashion') || text.includes('media') || text.includes('journal') || text.includes('film')) {
      return {
        topRecruiters: ["Google UX", "Microsoft Design", "Swiggy", "Zomato", "Adobe", "DreamWorks", "Red Chillies VFX", "Ogilvy & Mather", "Titan Design Studio", "Disney+ Hotstar", "BBC News"],
        roles: ["Product / UI/UX Designer", "3D Character Animator & VFX Artist", "Design Strategist & Ergonomist", "Brand Identity Specialist", "Digital Media Producer"],
        avgStartingCtc: "₹6.5 LPA – ₹19.0 LPA",
        highestCtc: "₹32.0 LPA",
        stipendRange: "₹20,000 – ₹60,000 / month",
        ppoRate: "72% PPO Conversion",
        programs: [
          {
            name: "Adobe Design & Creative Cloud Fellowship",
            org: "Adobe Systems",
            desc: "Designing cutting-edge generative AI user workflows, mobile interfaces, and digital typography systems.",
            stipend: "₹50,000 – ₹75,000 / month",
            portalUrl: "https://adobe.com/careers"
          },
          {
            name: "Swiggy & Zomato Product Design Co-op",
            org: "Consumer Tech Leaders",
            desc: "High-frequency consumer app micro-interactions, accessibility design systems, and rapid prototyping.",
            stipend: "₹35,000 – ₹55,000 / month",
            portalUrl: "https://swiggy.com/careers"
          },
          {
            name: "Red Chillies VFX & MPC Animation Apprenticeship",
            org: "Premier Visual Effects Studios",
            desc: "Feature film CGI rendering, rotoscopy, particle simulation, and Unreal Engine virtual production pipelines.",
            stipend: "₹20,000 – ₹35,000 / month",
            portalUrl: "https://redchillies.com"
          }
        ]
      };
    }

    // 12. Agriculture, Horticulture, Food Tech, Veterinary
    if (text.includes('agri') || text.includes('hortic') || text.includes('food tech') || text.includes('veterin') || text.includes('forest') || text.includes('fisher') || text.includes('soil')) {
      return {
        topRecruiters: ["ITC Agribusiness", "Bayer CropScience", "UPL Limited", "Godrej Agrovet", "Syngenta", "Amul (GCMMF)", "Nestlé", "National Dairy Development Board (NDDB)", "NABARD", "Cargill"],
        roles: ["Agribusiness Development Lead", "Precision Agriculture & Drone Specialist", "Food Quality Assurance Manager", "Farm Operations Supervisor", "Veterinary Surgeon / Dairy Tech Lead"],
        avgStartingCtc: "₹5.5 LPA – ₹14.0 LPA",
        highestCtc: "₹22.0 LPA",
        stipendRange: "₹12,000 – ₹30,000 / month",
        ppoRate: "68% PPO Conversion",
        programs: [
          {
            name: "Rural Agricultural Work Experience (RAWE - 6 Months)",
            org: "ICAR & State Agricultural Universities",
            desc: "Living in farming villages, diagnosing crop diseases, conducting soil health tests, and running agro-clinics.",
            stipend: "₹5,000 – ₹8,000 / month Allowance",
            portalUrl: "https://icar.org.in"
          },
          {
            name: "ICAR Student READY Experiential Learning Programme",
            org: "Indian Council of Agricultural Research",
            desc: "Hands-on commercial seed production, bio-fertilizer manufacturing, and post-harvest food processing plant operation.",
            stipend: "Govt Subsidized Allowance",
            portalUrl: "https://icar.org.in"
          },
          {
            name: "Amul & Nestlé Dairy Food Technology Apprenticeship",
            org: "Dairy & Food Processing Giants",
            desc: "Cold-chain quality control, pasteurization microbiology, and food packaging line compliance.",
            stipend: "₹18,000 – ₹28,000 / month",
            portalUrl: "https://amul.com/m/careers"
          }
        ]
      };
    }

    // 13. Default / Pure Sciences & General
    return {
      topRecruiters: ["TCS", "Infosys", "Wipro", "L&T", "Deloitte", "Tata Motors", "HDFC", "Reliance Industries", "ISRO", "CSIR Laboratories"],
      roles: ["Domain Specialist", "Operations Analyst", "Technical Project Trainee", "Quality Assurance Lead", "Research Associate"],
      avgStartingCtc: "₹5.0 LPA – ₹14.0 LPA",
      highestCtc: "₹22.0 LPA",
      stipendRange: "₹15,000 – ₹35,000 / month",
      ppoRate: "68% PPO Conversion",
      programs: [
        {
          name: "AICTE National Industry Internship Scheme",
          org: "Ministry of Education (Govt of India)",
          desc: "Industry-aligned live projects providing real-world experience, stipend, and corporate mentorship.",
          stipend: "₹15,000 – ₹30,000 / month",
          portalUrl: "https://internship.aicte-india.org"
        },
        {
          name: "National Career Service (NCS) Apprenticeship Drive",
          org: "Ministry of Labour & Employment",
          desc: "Central government initiative connecting students with public and private sector corporate traineeships.",
          stipend: "NAPS Subsidized Stipend",
          portalUrl: "https://ncs.gov.in"
        },
        {
          name: "Indian Academy of Sciences Summer Research Fellowship",
          org: "IASc Bangalore",
          desc: "Funded summer research project working with leading university professors across India.",
          stipend: "₹12,500 / month + Travel",
          portalUrl: "https://web-japps.ias.ac.in"
        }
      ]
    };
  }

  function renderInternshipsAndRecruitersHtml(data) {
    if (!data) return '';

    const recruitersPillsHtml = data.topRecruiters.map((r, i) => `
      <span class="recruiter-pill ${i < 3 ? 'featured' : ''}">
        ${i < 3 ? '⭐' : '🏢'} ${r}
      </span>
    `).join('');

    const rolesHtml = data.roles.map(role => `
      <span class="meta-chip" style="background:rgba(255,255,255,0.04); color:var(--text-secondary); border-color:var(--border-glass);">
        🎯 ${role}
      </span>
    `).join('');

    const programsHtml = data.programs.map(p => `
      <div class="internship-program-card">
        <div class="program-card-top">
          <div>
            <div class="program-card-name">${p.name}</div>
            <div class="program-card-org">🏛️ ${p.org}</div>
          </div>
        </div>
        <p class="program-card-desc">${p.desc}</p>
        <div class="program-card-footer">
          <span class="program-stipend-tag">💰 Stipend: ${p.stipend}</span>
          <a href="${p.portalUrl}" target="_blank" rel="noopener" class="program-link-btn">
            Apply Portal ↗
          </a>
        </div>
      </div>
    `).join('');

    return `
      <div class="internships-section">
        <div class="internships-header">
          <div class="internships-title">
            <span>💼 Industry Internships & Top Corporate Recruiters</span>
          </div>
          <span class="meta-chip" style="background:rgba(52,211,153,0.15); color:#34d399; border-color:rgba(52,211,153,0.3);">
            ${data.ppoRate}
          </span>
        </div>

        <!-- Compensation & Stipend Metrics Ribbon -->
        <div class="metrics-ribbon">
          <div class="metric-card-box">
            <span class="metric-card-lbl">Avg Starting Package</span>
            <span class="metric-card-val">${data.avgStartingCtc}</span>
          </div>
          <div class="metric-card-box">
            <span class="metric-card-lbl">Highest Package Tier</span>
            <span class="metric-card-val" style="color:#38bdf8;">${data.highestCtc}</span>
          </div>
          <div class="metric-card-box">
            <span class="metric-card-lbl">Monthly Internship Stipend</span>
            <span class="metric-card-val" style="color:#fbbf24;">${data.stipendRange}</span>
          </div>
        </div>

        <!-- Top Recruiting Companies -->
        <div style="margin-bottom:14px;">
          <div style="font-size:0.75rem; font-weight:700; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.04em; margin-bottom:4px;">
            🏢 Top Recruiting Companies & Industry Giants:
          </div>
          <div class="recruiter-pills-wrap">${recruitersPillsHtml}</div>
        </div>

        <!-- Primary Career Roles -->
        <div style="margin-bottom:16px;">
          <div style="font-size:0.75rem; font-weight:700; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.04em; margin-bottom:6px;">
            🎯 Primary Job Roles & Designations:
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:6px;">${rolesHtml}</div>
        </div>

        <!-- Flagship Internship Programmes -->
        <div>
          <div style="font-size:0.75rem; font-weight:700; color:var(--accent-cyan); text-transform:uppercase; letter-spacing:0.04em; margin-bottom:8px;">
            🌟 Premier Internship Programmes, Fellowships & Co-Ops:
          </div>
          <div class="internship-programs-grid">${programsHtml}</div>
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // STATE 3: MODAL & DRAWER SYSTEM
  // ==========================================================================
  function openCourseModal(course) {
    const isBookmarked = shortlistedCourseIds.includes(String(course.id));
    const isCompared = compareCourseIds.includes(String(course.id));
    const allIndiaColleges = getCollegesForCourse(course);
    const tnColleges = getTNCollegesForCourse(course);
    const ancillaryCourses = getAncillaryCoursesForCourse(course);
    const { pgList, countries } = getPGAndGlobalPathwaysForCourse(course);
    const internshipData = getInternshipsAndRecruitersForCourse(course);
    
    let currentModalTab = 'recruiters'; // 'recruiters' | 'india' | 'tn' | 'ancillary' | 'pg'
    let currentModalRegion = 'all';
    let currentTNDistrict = 'all';
    let currentTNOwnership = 'all';

    // Unique districts present for this stream in TN
    const tnDistricts = Array.from(new Set(tnColleges.map(c => c.district))).sort();

    modalOverlay.innerHTML = `
      <div class="modal-window">
        <div class="modal-header">
          <div class="modal-header-content">
            <div class="modal-header-badges">
              <span class="course-badge-type">${course.awardType}</span>
              <span class="course-growth-tag" style="background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3);">
                ${ICONS.flame} ${course.growthIndicator}
              </span>
              <span class="meta-chip">ID: #${course.id}</span>
            </div>
            <h2 class="modal-title">${course.course}</h2>
          </div>
          <button class="modal-close-btn" id="modal-close-x">${ICONS.close}</button>
        </div>

        <div class="modal-body">
          <!-- Overview Detail Grid -->
          <div class="detail-grid">
            <div class="detail-box">
              <div class="detail-label"><span class="detail-icon">${ICONS.award}</span> Career Cluster</div>
              <div class="detail-value">${course.cluster}</div>
            </div>
            <div class="detail-box">
              <div class="detail-label"><span class="detail-icon">${ICONS.atom}</span> Domain</div>
              <div class="detail-value">${course.domain}</div>
            </div>
            <div class="detail-box">
              <div class="detail-label"><span class="detail-icon">${ICONS.clock}</span> Typical Duration</div>
              <div class="detail-value">${course.duration}</div>
            </div>
            <div class="detail-box">
              <div class="detail-label"><span class="detail-icon">${ICONS.landmark}</span> Regulator / Reference Body</div>
              <div class="detail-value">${course.regulator}</div>
            </div>
            <div class="detail-box detail-box-full highlight-box">
              <div class="detail-label"><span class="detail-icon">${ICONS.info}</span> Key Subjects / Eligibility</div>
              <div class="detail-value">${course.keySubjects} (Min Entry Level: ${course.minEntry})</div>
            </div>
            <div class="detail-box detail-box-full highlight-box">
              <div class="detail-label"><span class="detail-icon">${ICONS.target}</span> Key Entrance & Eligibility Tests</div>
              <div class="detail-value" style="color: var(--accent-cyan); font-weight:700;">${course.entranceTests}</div>
            </div>
          </div>

          <!-- 5 Primary Interactive Options / Tabs Switcher Bar -->
          <div style="margin-top: 18px;">
            <div style="font-size:0.75rem; font-weight:800; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.05em; margin-bottom:8px;">
              Explore Programme Options & Pathways:
            </div>
            <div class="college-mode-toggle-bar">
              <button class="college-mode-btn active" id="mode-btn-recruiters">
                <span>🏢 Top Recruiters & Internships</span>
              </button>
              <button class="college-mode-btn" id="mode-btn-india">
                <span>🌐 All-India Colleges (${allIndiaColleges.length})</span>
              </button>
              <button class="college-mode-btn" id="mode-btn-tn">
                <span>🌴 Tamil Nadu Colleges (${tnColleges.length})</span>
              </button>
              <button class="college-mode-btn" id="mode-btn-ancillary">
                <span>🚀 Ancillary Skills (${ancillaryCourses.length})</span>
              </button>
              <button class="college-mode-btn" id="mode-btn-pg">
                <span>🎓 Higher Studies & PG</span>
              </button>
            </div>
          </div>

          <!-- OPTION 1: Top Recruiting Companies & Industry Internships Panel -->
          <div id="panel-recruiters" class="tab-content-panel">
            ${renderInternshipsAndRecruitersHtml(internshipData)}
          </div>

          <!-- OPTION 2: All-India Premier Colleges Panel -->
          <div id="panel-india" class="tab-content-panel" style="display: none;">
            <div class="modal-college-section" style="margin-top:0;">
              <div class="modal-college-header">
                <div class="modal-college-title">
                  <span>🏛️ Top National Colleges by Geographical Zone</span>
                </div>
                <div class="region-filter-bar" id="modal-region-bar">
                  <button class="region-filter-btn active" data-region="all">All India</button>
                  <button class="region-filter-btn" data-region="North">🏛️ North</button>
                  <button class="region-filter-btn" data-region="South">🌴 South</button>
                  <button class="region-filter-btn" data-region="West">🌆 West</button>
                  <button class="region-filter-btn" data-region="East">🌄 East</button>
                  <button class="region-filter-btn" data-region="Central">🏰 Central</button>
                </div>
              </div>
              <div class="college-cards-grid" id="modal-college-grid-india">
                ${renderCollegeCardsHtml(allIndiaColleges, 'all')}
              </div>
            </div>
          </div>

          <!-- OPTION 3: Tamil Nadu District Explorer Panel -->
          <div id="panel-tn" class="tab-content-panel" style="display: none;">
            <div class="modal-college-section" style="margin-top:0;">
              <div class="tn-filter-subgroup">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span style="font-size:0.72rem; font-weight:700; color:var(--text-secondary);">Filter by District:</span>
                  <select class="tn-district-select" id="tn-district-dropdown">
                    <option value="all">📍 All Tamil Nadu Districts (${tnColleges.length})</option>
                    ${tnDistricts.map(d => `<option value="${d}">${d} District</option>`).join('')}
                  </select>
                </div>
                <div class="tn-type-pill-group" id="tn-ownership-pills">
                  <button class="tn-type-pill active" data-owner="all">All Types</button>
                  <button class="tn-type-pill" data-owner="govt">🏛️ Govt & Aided</button>
                  <button class="tn-type-pill" data-owner="private">🏢 Private / Deemed</button>
                </div>
              </div>
              <div class="college-cards-grid" id="modal-college-grid-tn">
                ${renderTNCollegeCardsHtml(tnColleges, 'all', 'all')}
              </div>
            </div>
          </div>

          <!-- OPTION 4: Job-Ready Ancillary Courses & Value-Added Certifications Panel -->
          <div id="panel-ancillary" class="tab-content-panel" style="display: none;">
            <div class="ancillary-section" style="margin-top:0;">
              <div class="ancillary-section-header">
                <div class="ancillary-section-title">
                  <span>🚀 Job-Ready Ancillary Courses & Value-Added Certifications</span>
                  <span class="meta-chip" style="background: rgba(245,158,11,0.15); color:#fbbf24; border-color:rgba(245,158,11,0.3);">
                    +35% to +60% CTC Boost
                  </span>
                </div>
              </div>
              <p style="font-size:0.75rem; color:var(--text-secondary); margin-bottom:12px;">
                Industry-recommended add-on micro-credentials to pursue during your graduation for direct campus hiring and elite internship conversions:
              </p>
              <div class="ancillary-cards-grid">
                ${renderAncillaryCardsHtml(ancillaryCourses)}
              </div>
            </div>
          </div>

          <!-- OPTION 5: Postgraduate (PG) Entrance Exams & Global Masters Panel -->
          <div id="panel-pg" class="tab-content-panel" style="display: none;">
            <div class="pg-global-section" style="margin-top:0;">
              <div class="ancillary-section-header">
                <div class="ancillary-section-title">
                  <span>🎓 Higher Studies, PG Entrance & International Study Abroad Pathways</span>
                  <span class="meta-chip" style="background: rgba(139,92,246,0.15); color:#c4b5fd; border-color:rgba(139,92,246,0.3);">
                    M.Tech, MS, MD, MBA & Global Visas
                  </span>
                </div>
              </div>

              <div style="margin-bottom: 14px;">
                <h4 style="font-size:0.78rem; color:var(--accent-indigo); font-weight:700; margin-bottom:6px;">
                  🇮🇳 Key Indian Postgraduate Entrance Exams:
                </h4>
                <div class="pg-cards-grid">
                  ${renderPGExamCardsHtml(pgList)}
                </div>
              </div>

              <div>
                <h4 style="font-size:0.78rem; color:var(--accent-cyan); font-weight:700; margin-bottom:6px;">
                  🌐 International Masters & Study Abroad Destination Guide:
                </h4>
                <div class="pg-cards-grid">
                  ${renderCountryStudyCardsHtml(countries)}
                </div>
              </div>
            </div>
          </div>

          <div class="notice-box detail-box-full" style="margin-top: 18px;">
            <strong>Verification & Advisory Note:</strong><br/>
            ${course.note}
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-secondary" id="modal-copy-btn">
            <span class="btn-icon-svg">${ICONS.copy}</span> Copy Summary
          </button>
          <div style="display: flex; gap: 8px;">
            <button class="btn-secondary" id="modal-compare-btn">
              <span class="btn-icon-svg">${ICONS.compare}</span>
              ${isCompared ? 'Remove from Compare' : 'Add to Compare'}
            </button>
            <button class="btn-primary" id="modal-shortlist-btn">
              <span class="btn-icon-svg">${isBookmarked ? ICONS.bookmarkFilled : ICONS.bookmark}</span>
              ${isBookmarked ? 'Remove Shortlist' : 'Shortlist Course'}
            </button>
          </div>
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');

    // Tab Option Buttons
    const btnRecruiters = modalOverlay.querySelector('#mode-btn-recruiters');
    const btnIndia = modalOverlay.querySelector('#mode-btn-india');
    const btnTN = modalOverlay.querySelector('#mode-btn-tn');
    const btnAncillary = modalOverlay.querySelector('#mode-btn-ancillary');
    const btnPG = modalOverlay.querySelector('#mode-btn-pg');

    // Tab Panels
    const panelRecruiters = modalOverlay.querySelector('#panel-recruiters');
    const panelIndia = modalOverlay.querySelector('#panel-india');
    const panelTN = modalOverlay.querySelector('#panel-tn');
    const panelAncillary = modalOverlay.querySelector('#panel-ancillary');
    const panelPG = modalOverlay.querySelector('#panel-pg');

    const collegeGridIndia = modalOverlay.querySelector('#modal-college-grid-india');
    const collegeGridTN = modalOverlay.querySelector('#modal-college-grid-tn');

    const allTabs = [
      { btn: btnRecruiters, panel: panelRecruiters },
      { btn: btnIndia, panel: panelIndia },
      { btn: btnTN, panel: panelTN },
      { btn: btnAncillary, panel: panelAncillary },
      { btn: btnPG, panel: panelPG }
    ];

    function activateTab(targetBtn, targetPanel) {
      allTabs.forEach(({ btn, panel }) => {
        if (btn) btn.classList.remove('active');
        if (panel) panel.style.display = 'none';
      });
      if (targetBtn) targetBtn.classList.add('active');
      if (targetPanel) targetPanel.style.display = 'block';
      playSound('click');
    }

    if (btnRecruiters) btnRecruiters.addEventListener('click', () => activateTab(btnRecruiters, panelRecruiters));
    if (btnIndia) btnIndia.addEventListener('click', () => activateTab(btnIndia, panelIndia));
    if (btnTN) btnTN.addEventListener('click', () => activateTab(btnTN, panelTN));
    if (btnAncillary) btnAncillary.addEventListener('click', () => activateTab(btnAncillary, panelAncillary));
    if (btnPG) btnPG.addEventListener('click', () => activateTab(btnPG, panelPG));

    // All India Region Filter Buttons
    const regionButtons = modalOverlay.querySelectorAll('.region-filter-btn');
    regionButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        regionButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentModalRegion = btn.getAttribute('data-region');
        playSound('click');
        if (collegeGridIndia) collegeGridIndia.innerHTML = renderCollegeCardsHtml(allIndiaColleges, currentModalRegion);
      });
    });

    // Tamil Nadu District Dropdown
    const districtSelect = modalOverlay.querySelector('#tn-district-dropdown');
    if (districtSelect) {
      districtSelect.addEventListener('change', (e) => {
        currentTNDistrict = e.target.value;
        playSound('click');
        if (collegeGridTN) collegeGridTN.innerHTML = renderTNCollegeCardsHtml(tnColleges, currentTNDistrict, currentTNOwnership);
      });
    }

    // Tamil Nadu Ownership Type Pills
    const ownerPills = modalOverlay.querySelectorAll('.tn-type-pill');
    ownerPills.forEach(pill => {
      pill.addEventListener('click', () => {
        ownerPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentTNOwnership = pill.getAttribute('data-owner');
        playSound('click');
        if (collegeGridTN) collegeGridTN.innerHTML = renderTNCollegeCardsHtml(tnColleges, currentTNDistrict, currentTNOwnership);
      });
    });

    document.getElementById('modal-close-x').addEventListener('click', closeModal);
    
    document.getElementById('modal-copy-btn').addEventListener('click', () => {
      const text = `${course.course} (${course.awardType})
Cluster: ${course.cluster}
Domain: ${course.domain}
Duration: ${course.duration}
Eligibility: ${course.keySubjects}
Entrance Tests: ${course.entranceTests}
Regulator: ${course.regulator}
Top Recruiters: ${internshipData?.topRecruiters?.join(', ')}
Starting CTC: ${internshipData?.avgStartingCtc}
Growth: ${course.growthIndicator}`;
      navigator.clipboard.writeText(text);
      showToast('Course summary copied to clipboard!');
    });

    document.getElementById('modal-shortlist-btn').addEventListener('click', () => {
      toggleShortlist(course.id);
      openCourseModal(course);
      if (currentState === STATES.DOMAIN_EXPANDED) renderExpandedCourses();
    });

    document.getElementById('modal-compare-btn').addEventListener('click', () => {
      toggleCompare(course.id);
      openCourseModal(course);
      if (currentState === STATES.DOMAIN_EXPANDED) renderExpandedCourses();
    });
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
  }

  // ==========================================================================
  // SHORTLISTING / BOOKMARKING
  // ==========================================================================
  function toggleShortlist(id) {
    playSound('click');
    const strId = String(id);
    const idx = shortlistedCourseIds.indexOf(strId);
    if (idx > -1) {
      shortlistedCourseIds.splice(idx, 1);
      showToast('Removed from Shortlist');
    } else {
      shortlistedCourseIds.push(strId);
      showToast('Saved to Shortlist');
    }
    localStorage.setItem('shortlisted_courses', JSON.stringify(shortlistedCourseIds));
    updateShortlistBadge();
  }

  function updateShortlistBadge() {
    const badge = document.getElementById('shortlist-badge');
    if (badge) {
      badge.textContent = shortlistedCourseIds.length;
      badge.style.display = shortlistedCourseIds.length > 0 ? 'flex' : 'none';
    }
  }

  function openShortlistDrawer() {
    playSound('click');
    const listContainer = document.getElementById('shortlist-items-container');
    const courses = RAW_COURSES.filter(c => shortlistedCourseIds.includes(c.id));

    if (courses.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--text-muted);">
          <h3>No bookmarked courses yet.</h3>
          <p style="margin-top: 6px;">Click the Save button on any course card to bookmark it here.</p>
        </div>
      `;
    } else {
      let html = '';
      courses.forEach(c => {
        const recData = getInternshipsAndRecruitersForCourse(c);
        const topRecruitersStr = (recData && recData.topRecruiters) ? recData.topRecruiters.slice(0, 3).join(', ') : '';
        html += `
          <div class="course-card" style="margin-bottom: 12px;">
            <div class="course-card-header">
              <span class="course-badge-type">${c.awardType}</span>
              <span class="meta-chip">${c.domain}</span>
            </div>
            <h3 class="course-title">${c.course}</h3>
            <div class="card-recruiters-badge" style="margin:4px 0;">
              <span style="font-size:0.8rem;">🏢</span>
              <span style="font-size:0.72rem; font-weight:700; color:#38bdf8;">${topRecruitersStr}</span>
            </div>
            <div class="course-meta-tags">
              <span class="meta-chip"><span class="chip-icon">${ICONS.clock}</span> ${c.duration}</span>
              <span class="meta-chip"><span class="chip-icon">${ICONS.target}</span> ${c.entranceTests}</span>
            </div>
            <div class="course-card-footer">
              <button class="btn-card-action" onclick="SimulationEngine.openCourseModalById('${c.id}')">View Details &rsaquo;</button>
              <button class="btn-card-action" onclick="SimulationEngine.toggleShortlist('${c.id}'); SimulationEngine.openShortlistDrawer();">Remove</button>
            </div>
          </div>
        `;
      });
      listContainer.innerHTML = html;
    }

    shortlistDrawerOverlay.classList.add('active');
  }

  // ==========================================================================
  // COURSE COMPARISON MATRIX
  // ==========================================================================
  function toggleCompare(id) {
    playSound('click');
    const strId = String(id);
    const idx = compareCourseIds.indexOf(strId);
    if (idx > -1) {
      compareCourseIds.splice(idx, 1);
      showToast('Removed from comparison');
    } else {
      if (compareCourseIds.length >= 3) {
        showToast('You can compare up to 3 programmes at once.');
        return;
      }
      compareCourseIds.push(strId);
      showToast('Added to comparison');
    }
    updateCompareBadge();
  }

  function updateCompareBadge() {
    const badge = document.getElementById('compare-badge');
    if (badge) {
      badge.textContent = compareCourseIds.length;
      badge.style.display = compareCourseIds.length > 0 ? 'flex' : 'none';
    }
  }

  function openCompareModal() {
    playSound('click');
    const tableContainer = document.getElementById('compare-table-container');
    const courses = RAW_COURSES.filter(c => compareCourseIds.includes(c.id));

    if (courses.length < 2) {
      tableContainer.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--text-muted);">
          <h3>Select at least 2 programmes to compare.</h3>
          <p style="margin-top: 6px;">Click the "Compare" button on course cards to add them here.</p>
        </div>
      `;
    } else {
      let headers = '<th>Attribute</th>' + courses.map(c => `<th>${c.course}</th>`).join('');
      let rows = [
        `<tr><th>Award Type</th>${courses.map(c => `<td><span class="course-badge-type">${c.awardType}</span></td>`).join('')}</tr>`,
        `<tr><th>Domain</th>${courses.map(c => `<td>${c.domain}</td>`).join('')}</tr>`,
        `<tr><th>Career Cluster</th>${courses.map(c => `<td>${c.cluster}</td>`).join('')}</tr>`,
        `<tr><th>Top Recruiters</th>${courses.map(c => {
          const rec = getInternshipsAndRecruitersForCourse(c);
          return `<td><div style="font-size:0.75rem; font-weight:700; color:#38bdf8;">${rec.topRecruiters.slice(0, 4).join(', ')}</div></td>`;
        }).join('')}</tr>`,
        `<tr><th>Internship & Packages</th>${courses.map(c => {
          const rec = getInternshipsAndRecruitersForCourse(c);
          return `<td>
            <div style="color:#34d399; font-weight:700; font-size:0.75rem;">Stipend: ${rec.stipendRange}</div>
            <div style="color:var(--text-secondary); font-size:0.72rem; margin-top:2px;">Starting CTC: ${rec.avgStartingCtc}</div>
            <div style="color:#a78bfa; font-size:0.68rem; margin-top:2px;">${rec.ppoRate}</div>
          </td>`;
        }).join('')}</tr>`,
        `<tr><th>Typical Duration</th>${courses.map(c => `<td><strong>${c.duration}</strong></td>`).join('')}</tr>`,
        `<tr><th>Min Entry Level</th>${courses.map(c => `<td>${c.minEntry}</td>`).join('')}</tr>`,
        `<tr><th>Key Subjects & Eligibility</th>${courses.map(c => `<td>${c.keySubjects}</td>`).join('')}</tr>`,
        `<tr><th>Entrance Exams</th>${courses.map(c => `<td><strong style="color: var(--accent-cyan);">${c.entranceTests}</strong></td>`).join('')}</tr>`,
        `<tr><th>Regulator</th>${courses.map(c => `<td>${c.regulator}</td>`).join('')}</tr>`,
        `<tr><th>Growth Indicator</th>${courses.map(c => `<td>${c.growthIndicator}</td>`).join('')}</tr>`,
        `<tr><th>Actions</th>${courses.map(c => `<td><button class="btn-secondary" onclick="SimulationEngine.toggleCompare('${c.id}'); SimulationEngine.openCompareModal();">Remove</button></td>`).join('')}</tr>`
      ].join('');

      tableContainer.innerHTML = `
        <table class="compare-table">
          <thead><tr>${headers}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      `;
    }

    compareModalOverlay.classList.add('active');
  }

  // ==========================================================================
  // SEARCH ENGINE
  // ==========================================================================
  function handleSearch(query) {
    query = query.trim().toLowerCase();
    searchKeyword = query;

    if (!query) {
      if (currentState === STATES.DOMAIN_EXPANDED) {
        renderExpandedCourses();
      } else {
        transitionToHalfMoon();
      }
      return;
    }

    // 1. Search Courses (Stream-aware)
    const activeStream = typeof getActiveStudentStream === 'function' ? getActiveStudentStream() : '';
    const courseResults = RAW_COURSES.filter(c => {
      const matchText = (
        c.course.toLowerCase().includes(query) ||
        c.domain.toLowerCase().includes(query) ||
        c.entranceTests.toLowerCase().includes(query) ||
        c.keySubjects.toLowerCase().includes(query) ||
        c.cluster.toLowerCase().includes(query) ||
        c.awardType.toLowerCase().includes(query)
      );
      if (!matchText) return false;
      if (activeStream && typeof isCourseEligibleForStream === 'function') {
        return isCourseEligibleForStream(c, activeStream);
      }
      return true;
    });

    // 2. Search Colleges across All-India and Tamil Nadu
    const allCollegesPool = [];
    Object.values(DOMAIN_COLLEGES_MAP).forEach(list => {
      allCollegesPool.push(...list);
    });
    Object.values(TN_COLLEGES_DATA).forEach(list => {
      allCollegesPool.push(...list);
    });

    const matchingColleges = [];
    const seenColleges = new Set();
    allCollegesPool.forEach(c => {
      const matchText = (
        (c.name || '') + ' ' + 
        (c.city || '') + ' ' + 
        (c.district || '') + ' ' + 
        (c.state || '') + ' ' + 
        (c.type || '') + ' ' + 
        (c.nirf || '') + ' ' + 
        (c.naac || '') + ' ' + 
        (c.code || '') + ' ' + 
        (c.exams || '')
      ).toLowerCase();

      if (matchText.includes(query) && !seenColleges.has(c.name)) {
        seenColleges.add(c.name);
        matchingColleges.push(c);
      }
    });

    currentState = STATES.SEARCH_ACTIVE;
    renderBreadcrumbs();

    svgCanvas.innerHTML = '';
    stage.innerHTML = '';

    const hero = document.createElement('div');
    hero.className = 'active-domain-hero';
    hero.innerHTML = `
      <div class="hero-left">
        <div class="hero-icon" style="background: linear-gradient(135deg, #06b6d4, #0e7490)">
          ${ICONS.search}
        </div>
        <div class="hero-info">
          <h2>Search Results for "${query}"</h2>
          <p>Found <strong>${courseResults.length}</strong> programmes and <strong>${matchingColleges.length}</strong> premier colleges & institutes</p>
        </div>
      </div>
    `;
    stage.appendChild(hero);

    // Filter Tabs for Search Results
    let activeSearchTab = 'all'; // 'all', 'colleges', 'courses'
    const tabsBar = document.createElement('div');
    tabsBar.className = 'search-tabs-bar';
    tabsBar.innerHTML = `
      <button class="search-tab-pill active" data-search-tab="all">
        <span>🎓 All Results (${courseResults.length + matchingColleges.length})</span>
      </button>
      <button class="search-tab-pill" data-search-tab="colleges">
        <span>🏛️ Colleges & Universities (${matchingColleges.length})</span>
      </button>
      <button class="search-tab-pill" data-search-tab="courses">
        <span>📘 Career Programmes (${courseResults.length})</span>
      </button>
    `;
    stage.appendChild(tabsBar);

    const mainContainer = document.createElement('div');
    mainContainer.id = 'search-results-main';
    stage.appendChild(mainContainer);

    function renderSearchResultsView() {
      mainContainer.innerHTML = '';

      if (courseResults.length === 0 && matchingColleges.length === 0) {
        mainContainer.innerHTML = `
          <div style="text-align: center; padding: 50px 20px; color: var(--text-muted); background: var(--bg-card); border-radius: 16px; border: 1px solid var(--border-glass);">
            <h3>No matching courses or colleges found for "${query}".</h3>
            <p style="margin-top: 8px; font-size: 0.85rem;">Try searching for terms like "PSG Tech", "CEG", "IIT", "AIIMS", "MBBS", "B.Pharm", "B.Com", "Coimbatore", or "Madurai".</p>
          </div>
        `;
        return;
      }

      // Render Colleges Section
      if ((activeSearchTab === 'all' || activeSearchTab === 'colleges') && matchingColleges.length > 0) {
        const colSec = document.createElement('div');
        colSec.innerHTML = `
          <div class="search-section-title">
            <span>🏛️ Top Colleges & Institutions</span>
            <span class="search-section-badge">${matchingColleges.length} Matches</span>
          </div>
          <div class="college-cards-grid" style="margin-bottom: 24px;">
            ${matchingColleges.map(c => `
              <div class="college-item-card" style="border-left: 3px solid ${c.state === 'Tamil Nadu' ? '#10b981' : '#06b6d4'};">
                <div class="college-item-header">
                  <div>
                    <div class="college-item-name">${c.name}</div>
                    <div class="college-item-location">
                      <span>📍 ${c.city}, ${c.district ? c.district + ' Dt, ' : ''}${c.state || c.region + ' India'}</span>
                      ${c.code ? `<span class="college-metric-tnea">${c.code}</span>` : ''}
                    </div>
                  </div>
                  <span class="college-item-type">${c.type}</span>
                </div>
                <div class="college-item-metrics">
                  ${c.naac ? `<span class="college-metric-naac">⭐ ${c.naac}</span>` : ''}
                  <span class="college-metric-nirf">🏆 ${c.nirf}</span>
                  <span class="college-metric-exam">🎯 ${c.exams}</span>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.66rem; color:var(--text-muted); padding-top:4px;">
                  <span>💼 Median: <strong style="color:var(--text-primary);">${c.medianPackage}</strong></span>
                  <span>💳 Fees: <strong>${c.fees}</strong></span>
                </div>
              </div>
            `).join('')}
          </div>
        `;
        mainContainer.appendChild(colSec);
      }

      // Render Courses Section
      if ((activeSearchTab === 'all' || activeSearchTab === 'courses') && courseResults.length > 0) {
        const courseSec = document.createElement('div');
        courseSec.innerHTML = `
          <div class="search-section-title">
            <span>📘 Career Degrees & Programmes</span>
            <span class="search-section-badge">${courseResults.length} Courses</span>
          </div>
        `;

        const coursesGrid = document.createElement('div');
        coursesGrid.className = 'courses-container';

        courseResults.forEach((c, idx) => {
          const card = document.createElement('div');
          card.className = 'course-card';
          card.style.animationDelay = `${Math.min(idx * 15, 250)}ms`;

          let growthClass = 'growth-established';
          let growthSvg = ICONS.star;
          if (c.growthIndicator === 'Very High Growth') {
            growthClass = 'growth-very-high';
            growthSvg = ICONS.flame;
          } else if (c.growthIndicator === 'High Growth') {
            growthClass = 'growth-high';
            growthSvg = ICONS.rocket;
          }

          const recData = getInternshipsAndRecruitersForCourse(c);
          const topRecruitersStr = (recData && recData.topRecruiters) ? recData.topRecruiters.slice(0, 3).join(', ') : '';

          card.innerHTML = `
            <div>
              <div class="course-card-header">
                <span class="course-badge-type">${c.awardType}</span>
                <span class="course-growth-tag ${growthClass}">
                  <span class="growth-icon-svg">${growthSvg}</span>
                  ${c.growthIndicator}
                </span>
              </div>
              <h3 class="course-title">${c.course}</h3>
              <div style="font-size: 0.75rem; color: var(--accent-cyan); font-weight: 600; margin-top: 2px;">
                ${c.domain} &bull; <span style="color:var(--text-muted);">${c.cluster}</span>
              </div>
            </div>

            <div class="card-recruiters-badge" style="margin:6px 0;">
              <span style="font-size:0.8rem;">🏢</span>
              <span style="font-size:0.72rem; font-weight:700; color:#38bdf8;">Recruiters: ${topRecruitersStr}</span>
            </div>

            <div class="course-meta-tags">
              <span class="meta-chip"><span class="chip-icon">${ICONS.clock}</span> ${c.duration}</span>
              <span class="meta-chip"><span class="chip-icon">${ICONS.target}</span> ${c.entranceTests.split(';')[0].trim()}</span>
            </div>

            <div class="course-card-footer">
              <span style="font-family: var(--font-mono); font-size:0.7rem;">#${c.id}</span>
              <button class="btn-card-action">View Details &rsaquo;</button>
            </div>
          `;

          card.addEventListener('click', () => {
            playSound('card');
            openCourseModal(c);
          });

          coursesGrid.appendChild(card);
        });

        courseSec.appendChild(coursesGrid);
        mainContainer.appendChild(courseSec);
      }
    }

    renderSearchResultsView();

    // Tab switcher events
    const tabButtons = tabsBar.querySelectorAll('.search-tab-pill');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeSearchTab = btn.getAttribute('data-search-tab');
        playSound('click');
        renderSearchResultsView();
      });
    });
  }

  function showToast(msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span style="display:inline-flex;">${ICONS.award}</span> <div>${msg}</div>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  function setupEventListeners() {
    modalContent = document.getElementById('modal-window-content');

    if (searchInput) {
      let debounceTimer;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          handleSearch(e.target.value);
        }, 200);
      });
    }

    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInput.focus();
      } else if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      } else if (e.key === 'Escape') {
        closeModal();
        document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
      }
    });

    const resetBtn = document.getElementById('btn-reset-center');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        playSound('back');
        if (searchInput) searchInput.value = '';
        renderCenterState();
      });
    }

    const openShortlistBtn = document.getElementById('btn-open-shortlist');
    if (openShortlistBtn) openShortlistBtn.addEventListener('click', openShortlistDrawer);

    // Tamil Nadu Colleges Master Hub Modal
    const tnHubBtn = document.getElementById('btn-open-tn-hub');
    const tnHubModal = document.getElementById('tn-directory-modal');
    const hubStreamSelect = document.getElementById('hub-stream-select');
    const hubDistrictSelect = document.getElementById('hub-district-select');
    const hubOwnerPills = document.querySelectorAll('[data-hub-owner]');
    const hubGrid = document.getElementById('hub-college-grid');
    const tnHubCloseBtn = document.getElementById('tn-hub-close-btn');

    let currentHubStream = 'all';
    let currentHubDistrict = 'all';
    let currentHubOwner = 'all';

    function renderTNHubGrid() {
      if (!hubGrid) return;
      let allColleges = [];
      if (currentHubStream === 'all') {
        Object.values(TN_COLLEGES_DATA).forEach(list => {
          allColleges = allColleges.concat(list);
        });
      } else if (TN_COLLEGES_DATA[currentHubStream]) {
        allColleges = TN_COLLEGES_DATA[currentHubStream];
      }

      // Deduplicate by name
      const uniqueColleges = [];
      const seen = new Set();
      allColleges.forEach(c => {
        if (!seen.has(c.name)) {
          seen.add(c.name);
          uniqueColleges.push(c);
        }
      });

      hubGrid.innerHTML = renderTNCollegeCardsHtml(uniqueColleges, currentHubDistrict, currentHubOwner);
    }

    if (tnHubBtn && tnHubModal) {
      tnHubBtn.addEventListener('click', () => {
        playSound('click');
        renderTNHubGrid();
        tnHubModal.classList.add('active');
      });

      if (tnHubCloseBtn) {
        tnHubCloseBtn.addEventListener('click', () => {
          tnHubModal.classList.remove('active');
        });
      }

      if (hubStreamSelect) {
        hubStreamSelect.addEventListener('change', (e) => {
          currentHubStream = e.target.value;
          playSound('click');
          renderTNHubGrid();
        });
      }

      if (hubDistrictSelect) {
        hubDistrictSelect.addEventListener('change', (e) => {
          currentHubDistrict = e.target.value;
          playSound('click');
          renderTNHubGrid();
        });
      }

      if (hubOwnerPills) {
        hubOwnerPills.forEach(pill => {
          pill.addEventListener('click', () => {
            hubOwnerPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentHubOwner = pill.getAttribute('data-hub-owner');
            playSound('click');
            renderTNHubGrid();
          });
        });
      }

      tnHubModal.addEventListener('click', (e) => {
        if (e.target === tnHubModal) tnHubModal.classList.remove('active');
      });
    }

    // Job-Ready Ancillary Courses Master Hub Modal
    const ancillaryHubBtn = document.getElementById('btn-open-ancillary-hub');
    const ancillaryModal = document.getElementById('ancillary-courses-modal');
    const ancillaryClusterSelect = document.getElementById('ancillary-cluster-select');
    const ancillaryHubGrid = document.getElementById('ancillary-hub-grid');
    const ancillaryCloseBtn = document.getElementById('ancillary-modal-close-btn');

    let currentAncillaryCluster = 'all';

    function renderAncillaryHub() {
      if (!ancillaryHubGrid) return;
      let list = [];
      if (currentAncillaryCluster === 'all') {
        Object.values(ANCILLARY_COURSES_DATA).forEach(arr => {
          list.push(...arr);
        });
      } else if (ANCILLARY_COURSES_DATA[currentAncillaryCluster]) {
        list = ANCILLARY_COURSES_DATA[currentAncillaryCluster];
      }

      ancillaryHubGrid.innerHTML = renderAncillaryCardsHtml(list);
    }

    if (ancillaryHubBtn && ancillaryModal) {
      ancillaryHubBtn.addEventListener('click', () => {
        playSound('click');
        renderAncillaryHub();
        ancillaryModal.classList.add('active');
      });

      if (ancillaryCloseBtn) {
        ancillaryCloseBtn.addEventListener('click', () => {
          ancillaryModal.classList.remove('active');
        });
      }

      if (ancillaryClusterSelect) {
        ancillaryClusterSelect.addEventListener('change', (e) => {
          currentAncillaryCluster = e.target.value;
          playSound('click');
          renderAncillaryHub();
        });
      }

      ancillaryModal.addEventListener('click', (e) => {
        if (e.target === ancillaryModal) ancillaryModal.classList.remove('active');
      });
    }

    // 1. Dedicated Indian PG Exams Master Modal
    const pgHubBtn = document.getElementById('btn-open-pg-hub');
    const pgModal = document.getElementById('pg-exams-modal');
    const pgStreamSelect = document.getElementById('pg-stream-select');
    const pgHubGrid = document.getElementById('pg-hub-grid');
    const pgCloseBtn = document.getElementById('pg-modal-close-btn');

    let currentPGStream = 'all';

    function renderPGModalGrid() {
      if (!pgHubGrid) return;
      let list = [];
      if (currentPGStream === 'all') {
        Object.values(PG_EXAMS_DATA).forEach(arr => list.push(...arr));
      } else if (PG_EXAMS_DATA[currentPGStream]) {
        list = PG_EXAMS_DATA[currentPGStream];
      }
      pgHubGrid.innerHTML = renderPGExamCardsHtml(list);
    }

    if (pgHubBtn && pgModal) {
      pgHubBtn.addEventListener('click', () => {
        playSound('click');
        renderPGModalGrid();
        pgModal.classList.add('active');
      });

      if (pgCloseBtn) {
        pgCloseBtn.addEventListener('click', () => {
          pgModal.classList.remove('active');
        });
      }

      if (pgStreamSelect) {
        pgStreamSelect.addEventListener('change', (e) => {
          currentPGStream = e.target.value;
          playSound('click');
          renderPGModalGrid();
        });
      }

      pgModal.addEventListener('click', (e) => {
        if (e.target === pgModal) pgModal.classList.remove('active');
      });
    }

    // 2. Dedicated Country-Wise Study Abroad Master Modal
    const abroadHubBtn = document.getElementById('btn-open-global-hub');
    const abroadModal = document.getElementById('global-abroad-modal');
    const abroadCountrySelect = document.getElementById('abroad-country-select');
    const abroadHubGrid = document.getElementById('abroad-hub-grid');
    const abroadCloseBtn = document.getElementById('abroad-modal-close-btn');

    let currentAbroadCountry = 'all';

    function renderAbroadModalGrid() {
      if (!abroadHubGrid) return;
      let list = [];
      if (currentAbroadCountry === 'all') {
        list = Object.values(COUNTRY_STUDY_DATA);
      } else if (COUNTRY_STUDY_DATA[currentAbroadCountry]) {
        list = [COUNTRY_STUDY_DATA[currentAbroadCountry]];
      }
      abroadHubGrid.innerHTML = renderCountryStudyCardsHtml(list);
    }

    if (abroadHubBtn && abroadModal) {
      abroadHubBtn.addEventListener('click', () => {
        playSound('click');
        renderAbroadModalGrid();
        abroadModal.classList.add('active');
      });

      if (abroadCloseBtn) {
        abroadCloseBtn.addEventListener('click', () => {
          abroadModal.classList.remove('active');
        });
      }

      if (abroadCountrySelect) {
        abroadCountrySelect.addEventListener('change', (e) => {
          currentAbroadCountry = e.target.value;
          playSound('click');
          renderAbroadModalGrid();
        });
      }

      abroadModal.addEventListener('click', (e) => {
        if (e.target === abroadModal) abroadModal.classList.remove('active');
      });
    }

    // 2.5 Header NGOs & Aid Hub Button
    const ngoHubBtn = document.getElementById('btn-open-ngo-hub');
    if (ngoHubBtn) {
      ngoHubBtn.addEventListener('click', () => {
        playSound('click');
        if (typeof window.switchTab === 'function') {
          window.switchTab('scholarships');
        } else {
          document.getElementById('tab-btn-scholarships')?.click();
        }
      });
    }

    // 2.6 Dedicated Special Quotas, Sports, NCC & NSS Master Modal
    const quotaHubBtn = document.getElementById('btn-open-quota-hub');
    const quotaModal = document.getElementById('special-quotas-modal');
    const quotaCategorySelect = document.getElementById('quota-category-select');
    const quotaHubGrid = document.getElementById('quota-hub-grid');
    const quotaCloseBtn = document.getElementById('quota-modal-close-btn');

    let currentQuotaCat = 'all';

    function renderSpecialQuotasCardsHtml(quotas) {
      if (!quotas || quotas.length === 0) {
        return `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted);">No quota information found.</div>`;
      }
      return quotas.map(q => {
        const priorityHtml = q.priorityHierarchy ? `
          <div style="font-size:0.73rem; background:rgba(0,0,0,0.25); border:1px solid var(--border-glass); border-radius:10px; padding:10px; margin-top:8px;">
            <div style="font-weight:700; color:var(--accent-amber); margin-bottom:4px;">🎯 Priority Hierarchy:</div>
            <ul style="margin:0; padding-left:16px; color:var(--text-secondary); line-height:1.45;">
              ${q.priorityHierarchy.map(p => `<li>${p}</li>`).join('')}
            </ul>
          </div>
        ` : '';

        const marksScaleHtml = q.marksScale ? `
          <div style="font-size:0.73rem; background:rgba(0,0,0,0.25); border:1px solid var(--border-glass); border-radius:10px; padding:10px; margin-top:8px;">
            <div style="font-weight:700; color:#f59e0b; margin-bottom:6px;">📊 1000-Point Marks Weightage:</div>
            <div style="display:flex; flex-direction:column; gap:4px;">
              ${q.marksScale.map(m => `
                <div style="display:flex; justify-content:space-between; font-size:0.7rem; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:2px;">
                  <span style="color:var(--text-secondary);">${m.level}</span>
                  <span style="color:var(--accent-cyan); font-weight:700;">🥇 ${m.gold} | 🥈 ${m.silver} | 🥉 ${m.bronze}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : '';

        const feeBenefitHtml = (q.financialSponsorship || q.feeWaiverDetails || q.specialFacilities || q.awardeeBenefits) ? `
          <div style="font-size:0.73rem; background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.25); border-radius:8px; padding:8px 10px; color:#34d399; margin-top:6px;">
            <strong>✨ Key Benefits & Fee Waivers:</strong> ${q.financialSponsorship || q.feeWaiverDetails || q.specialFacilities || q.awardeeBenefits}
          </div>
        ` : '';

        return `
          <div class="pg-exam-card" style="border-top:3px solid ${q.badgeColor};">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="font-size:1.4rem;">${q.icon}</span>
                <div>
                  <h3 style="font-size:0.95rem; font-weight:800; color:var(--text-primary); margin:0;">${q.name}</h3>
                  <div style="font-size:0.7rem; color:var(--text-muted);">${q.targetAdmissions}</div>
                </div>
              </div>
              <span style="font-size:0.68rem; font-weight:700; padding:3px 8px; border-radius:6px; background:${q.badgeBg}; color:${q.badgeColor}; border:1px solid ${q.badgeColor}40; white-space:nowrap;">
                ${q.category.toUpperCase()}
              </span>
            </div>

            <div style="font-size:0.74rem; font-weight:700; color:#fbbf24; background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.2); padding:6px 10px; border-radius:8px; margin-top:8px;">
              🏛️ ${q.seatsHighlight}
            </div>

            ${feeBenefitHtml}
            ${marksScaleHtml}
            ${priorityHtml}

            <div style="font-size:0.72rem; color:var(--text-secondary); line-height:1.4; margin-top:6px;">
              <strong>📋 Required Certificates:</strong> ${q.requiredDocuments}
            </div>

            <div style="font-size:0.7rem; color:var(--text-muted); background:rgba(0,0,0,0.2); padding:6px 8px; border-radius:6px; margin-top:6px;">
              <strong>🔄 Counseling Process:</strong> ${q.counselingProcess}
            </div>

            <div style="margin-top:auto; display:flex; justify-content:space-between; align-items:center; padding-top:10px;">
              <span style="font-size:0.7rem; color:var(--text-muted);">Verified Policy 2026</span>
              <a href="${q.officialPortal}" target="_blank" rel="noopener" class="btn-exam-action btn-exam-primary" style="padding:5px 12px; font-size:0.72rem;">
                Official Portal ↗
              </a>
            </div>
          </div>
        `;
      }).join('');
    }

    function renderQuotaModalGrid() {
      if (!quotaHubGrid) return;
      const allQuotas = window.SPECIAL_QUOTAS_DATA || [];
      let list = allQuotas;
      if (currentQuotaCat !== 'all') {
        list = allQuotas.filter(q => q.category === currentQuotaCat);
      }
      quotaHubGrid.innerHTML = renderSpecialQuotasCardsHtml(list);
    }

    if (quotaHubBtn && quotaModal) {
      quotaHubBtn.addEventListener('click', () => {
        playSound('click');
        renderQuotaModalGrid();
        quotaModal.classList.add('active');
      });

      if (quotaCloseBtn) {
        quotaCloseBtn.addEventListener('click', () => {
          quotaModal.classList.remove('active');
        });
      }

      if (quotaCategorySelect) {
        quotaCategorySelect.addEventListener('change', (e) => {
          currentQuotaCat = e.target.value;
          playSound('click');
          renderQuotaModalGrid();
        });
      }

      quotaModal.addEventListener('click', (e) => {
        if (e.target === quotaModal) quotaModal.classList.remove('active');
      });
    }

    // =========================================================================
    // 3. STREAM-SPECIFIC COURSE ELIGIBILITY FILTER ENGINE
    // =========================================================================
    const STREAM_ALLOWED_CLUSTERS = {
      'Bio-Maths': [
        'engineering-tech', 'computer-digital', 'science-research', 'medicine-health',
        'pharmacy-allied', 'nursing-physio', 'agriculture-environment', 'commerce-finance',
        'management-business', 'law-policy', 'design-media', 'arts-humanities',
        'hospitality-tourism', 'vocational-skills'
      ],
      'CS-Maths': [
        'engineering-tech', 'computer-digital', 'science-research', 'commerce-finance',
        'management-business', 'law-policy', 'design-media', 'arts-humanities',
        'hospitality-tourism', 'vocational-skills'
      ],
      'Pure Science': [
        'medicine-health', 'pharmacy-allied', 'nursing-physio', 'agriculture-environment',
        'science-research', 'commerce-finance', 'management-business', 'law-policy',
        'design-media', 'arts-humanities', 'hospitality-tourism', 'vocational-skills'
      ],
      'Commerce with Maths': [
        'commerce-finance', 'management-business', 'computer-digital', 'law-policy',
        'design-media', 'arts-humanities', 'hospitality-tourism', 'vocational-skills'
      ],
      'Commerce without Maths': [
        'commerce-finance', 'management-business', 'law-policy', 'design-media',
        'arts-humanities', 'hospitality-tourism', 'vocational-skills'
      ],
      'Arts / Humanities': [
        'arts-humanities', 'law-policy', 'design-media', 'hospitality-tourism',
        'management-business', 'vocational-skills'
      ]
    };
    window.STREAM_ALLOWED_CLUSTERS = STREAM_ALLOWED_CLUSTERS;

    function isCourseEligibleForStream(course, stream) {
      if (!stream || stream === 'all' || stream === 'All Streams') return true;
      
      const domain = (course.domain || '').toLowerCase();
      const cluster = (course.clusterId || course.cluster || '').toLowerCase();
      const name = (course.course || course.name || '').toLowerCase();

      // 1. Bio-Maths -> All science, medical, engineering, commerce, arts open
      if (stream === 'Bio-Maths' || stream === 'pcm-b') {
        return true;
      }

      // 2. CS-Maths (Physics, Chemistry, CS, Maths) -> Engineering, Computing, Physical Sci, Defence
      if (stream === 'CS-Maths' || stream === 'pcm') {
        if (domain.includes('medicine') || domain.includes('dental') || domain.includes('nursing') || domain.includes('veterinary') || domain.includes('ayush') || domain.includes('allied medical') || name.includes('m.b.b.s') || name.includes('b.d.s') || name.includes('b.v.sc') || name.includes('b.sc nursing') || name.includes('bams') || name.includes('bhms')) {
          if (!name.includes('b.pharm') && !name.includes('biotechnology') && !name.includes('bioinformatics')) {
            return false;
          }
        }
        return true;
      }

      // 3. Pure Science (Physics, Chemistry, Botany, Zoology without Maths) -> Medical, Allied, Bio Sci, Agri
      if (stream === 'Pure Science' || stream === 'pcb') {
        if (domain.includes('engineering') || domain.includes('architecture') || domain.includes('aviation') || name.includes('b.tech') || name.includes('b.e.') || name.includes('b.arch') || name.includes('mathematics') || name.includes('actuarial')) {
          if (!name.includes('biotechnology') && !name.includes('food') && !name.includes('biomedical')) {
            return false;
          }
        }
        return true;
      }

      // 4. Commerce with Maths -> Commerce, Accounts, Economics, Finance, Law, Mgmt, Design
      if (stream === 'Commerce with Maths' || stream === 'commerce-maths') {
        if (domain.includes('medicine') || domain.includes('engineering') || domain.includes('dental') || domain.includes('nursing') || domain.includes('veterinary') || domain.includes('agriculture') || domain.includes('pure science') || domain.includes('physical science') || domain.includes('life science')) {
          return false;
        }
        return true;
      }

      // 5. Commerce without Maths -> Commerce, Accounts, Business, Law, Design, Mass Comm
      if (stream === 'Commerce without Maths' || stream === 'commerce-no-maths' || stream === 'commerce') {
        if (domain.includes('medicine') || domain.includes('engineering') || domain.includes('architecture') || domain.includes('dental') || domain.includes('nursing') || domain.includes('veterinary') || domain.includes('agriculture') || domain.includes('pure science') || domain.includes('physical science') || domain.includes('life science') || name.includes('actuarial') || name.includes('statistics') || name.includes('data science')) {
          return false;
        }
        return true;
      }

      // 6. Arts / Humanities -> Law, Design, Arts, Media, Hospitality, Civil Services
      if (stream === 'Arts / Humanities' || stream === 'arts') {
        if (domain.includes('medicine') || domain.includes('engineering') || domain.includes('architecture') || domain.includes('dental') || domain.includes('nursing') || domain.includes('veterinary') || domain.includes('agriculture') || domain.includes('science') || domain.includes('pharmacy') || domain.includes('technology') || domain.includes('aviation') || domain.includes('commerce') || domain.includes('banking') || domain.includes('finance')) {
          if (domain.includes('law') || domain.includes('design') || domain.includes('humanities') || domain.includes('arts') || domain.includes('media') || domain.includes('journalism') || domain.includes('hospitality') || domain.includes('tourism') || domain.includes('sports') || domain.includes('education') || domain.includes('social') || domain.includes('vocational')) {
            return true;
          }
          return false;
        }
        return true;
      }

      return true;
    }
    window.isCourseEligibleForStream = isCourseEligibleForStream;

    function getCurrentRole() {
      if (sessionStorage.getItem('active_session') === 'true') {
        return localStorage.getItem('user_role') || 'unlogged';
      }
      return 'unlogged';
    }

    function getActiveStudentStream() {
      const role = getCurrentRole();
      if (role === 'student') {
        const raw = localStorage.getItem('student_session');
        if (raw) {
          try {
            const s = JSON.parse(raw);
            return s.stream || '';
          } catch (e) {}
        }
      }
      return '';
    }
    window.getActiveStudentStream = getActiveStudentStream;

    function getFilteredClustersForCurrentSession() {
      const role = getCurrentRole();
      if (role === 'student') {
        const stream = getActiveStudentStream();
        if (stream && STREAM_ALLOWED_CLUSTERS[stream]) {
          const allowed = STREAM_ALLOWED_CLUSTERS[stream];
          return CAREER_CLUSTERS.filter(c => allowed.includes(c.id));
        }
      }
      return CAREER_CLUSTERS;
    }
    window.getFilteredClustersForCurrentSession = getFilteredClustersForCurrentSession;

    function getFilteredDomainsForCurrentSession() {
      const role = getCurrentRole();
      if (role === 'student') {
        const stream = getActiveStudentStream();
        if (stream) {
          const allowedClusterIds = getFilteredClustersForCurrentSession().map(c => c.id);
          return DOMAINS_CONFIG.filter(d => {
            if (!allowedClusterIds.includes(d.clusterId)) return false;
            return RAW_COURSES.some(c => c.domain.toLowerCase() === d.name.toLowerCase() && isCourseEligibleForStream(c, stream));
          });
        }
      }
      return DOMAINS_CONFIG;
    }
    window.getFilteredDomainsForCurrentSession = getFilteredDomainsForCurrentSession;

    // =========================================================================
    // MULTI-ROLE GATEWAY & DUAL-SYNC SESSION SYSTEM (With Profile Dropdown)
    // =========================================================================
    const roleLoginBtn = document.getElementById('btn-role-login');
    const userProfileWrapper = document.getElementById('user-profile-wrapper');
    const userProfileDropdown = document.getElementById('user-profile-dropdown');
    const profileDropAvatar = document.getElementById('profile-drop-avatar');
    const profileDropName = document.getElementById('profile-drop-name');
    const profileDropRole = document.getElementById('profile-drop-role');
    const profileDropStatus = document.getElementById('profile-drop-status');
    const pmenuStreamDetail = document.getElementById('pmenu-stream-detail');
    const pmenuBtnDetails = document.getElementById('pmenu-btn-details');
    const pmenuBtnSwitchRole = document.getElementById('pmenu-btn-switch-role');
    const pmenuBtnHelp = document.getElementById('pmenu-btn-help');
    const pmenuBtnLogout = document.getElementById('pmenu-btn-logout');

    const gatewayOverlay = document.getElementById('role-gateway-overlay');
    const gatewayCloseBtn = document.getElementById('gateway-close-btn');
    const gatewayActiveSessionBar = document.getElementById('gateway-active-session-bar');
    const gatewayCurrentUserTag = document.getElementById('gateway-current-user-tag');
    const btnGatewayLogout = document.getElementById('btn-gateway-logout');

    const gatewayRoleSelect = document.getElementById('gateway-role-select');
    const placeholderHint = document.getElementById('role-placeholder-hint');
    const formStudentGateway = document.getElementById('form-student-gateway');
    const formTeacherGateway = document.getElementById('form-teacher-gateway');

    const roleIcon = document.getElementById('role-icon');
    const roleBtnLabel = document.getElementById('role-btn-label');
    const teacherBar = document.getElementById('teacher-presentation-bar');
    const teacherNameTag = document.getElementById('teacher-name-tag');
    const teacherLiveCount = document.getElementById('teacher-live-students-count');
    const teacherFullscreenBtn = document.getElementById('btn-teacher-fullscreen');
    const roleLogoutBtn = document.getElementById('btn-role-logout');
    const submitStudentPlanBtn = document.getElementById('btn-submit-student-plan');

    let currentRole = sessionStorage.getItem('active_session') === 'true' ? (localStorage.getItem('user_role') || 'unlogged') : 'unlogged';

    function updateRoleUI() {
      if (!roleLoginBtn) return;
      roleLoginBtn.className = 'role-badge-btn';

      if (currentRole === 'student') {
        const raw = localStorage.getItem('student_session');
        let name = 'Student';
        let fullName = 'Student';
        let stream = '';
        if (raw) {
          try {
            const s = JSON.parse(raw);
            fullName = s.name || 'Student';
            name = `${fullName.split(' ')[0]} (${s.classSection || '12'})`;
            stream = s.stream || '';
          } catch (e) {}
        }
        roleLoginBtn.classList.add('role-btn-student');
        if (roleIcon) roleIcon.textContent = '🎓';
        if (roleBtnLabel) roleBtnLabel.textContent = name;
        if (teacherBar) teacherBar.classList.remove('active');
        
        const eligibleCourses = RAW_COURSES.filter(c => isCourseEligibleForStream(c, stream));

        // Sync User Profile Dropdown
        if (profileDropAvatar) profileDropAvatar.textContent = '🎓';
        if (profileDropName) profileDropName.textContent = fullName;
        if (profileDropRole) profileDropRole.textContent = `Class 12 • ${stream || 'General'} Stream`;
        if (profileDropStatus) profileDropStatus.textContent = `✨ ${eligibleCourses.length} Degrees Available`;
        if (pmenuStreamDetail) pmenuStreamDetail.textContent = `${stream || 'Selected'} Stream (Active)`;

        if (gatewayActiveSessionBar) {
          gatewayActiveSessionBar.style.display = 'flex';
          if (gatewayCurrentUserTag) gatewayCurrentUserTag.textContent = `Logged in as: ${name} · ${stream}`;
        }
        if (gatewayCloseBtn) gatewayCloseBtn.style.display = 'block';

      } else if (currentRole === 'teacher') {
        const raw = localStorage.getItem('teacher_session');
        let name = 'Presenter';
        if (raw) {
          try {
            const t = JSON.parse(raw);
            name = t.name || 'Teacher';
          } catch (e) {}
        }
        roleLoginBtn.classList.add('role-btn-teacher');
        if (roleIcon) roleIcon.textContent = '👩‍🏫';
        if (roleBtnLabel) roleBtnLabel.textContent = `Teacher: ${name.split(' ')[0]}`;
        if (teacherBar) {
          teacherBar.classList.add('active');
          if (teacherNameTag) teacherNameTag.textContent = name;
        }

        // Sync User Profile Dropdown
        if (profileDropAvatar) profileDropAvatar.textContent = '👩‍🏫';
        if (profileDropName) profileDropName.textContent = name;
        if (profileDropRole) profileDropRole.textContent = `Teacher / Counselor Mode`;
        if (profileDropStatus) profileDropStatus.textContent = `📡 Live Classroom Master`;
        if (pmenuStreamDetail) pmenuStreamDetail.textContent = `Full 960 Courses Unlocked`;

        if (gatewayActiveSessionBar) {
          gatewayActiveSessionBar.style.display = 'flex';
          if (gatewayCurrentUserTag) gatewayCurrentUserTag.textContent = `Logged in as: Teacher / Counselor (${name})`;
        }
        if (gatewayCloseBtn) gatewayCloseBtn.style.display = 'block';
        pollTeacherLiveCount();

      } else if (currentRole === 'admin') {
        roleLoginBtn.classList.add('role-btn-admin');
        if (roleIcon) roleIcon.textContent = '🛡️';
        if (roleBtnLabel) roleBtnLabel.textContent = 'Admin / Management';
        if (teacherBar) teacherBar.classList.remove('active');

        // Sync User Profile Dropdown
        if (profileDropAvatar) profileDropAvatar.textContent = '🛡️';
        if (profileDropName) profileDropName.textContent = `School Administrator`;
        if (profileDropRole) profileDropRole.textContent = `Institutional Management`;
        if (profileDropStatus) profileDropStatus.textContent = `⚡ System Administrator`;
        if (pmenuStreamDetail) pmenuStreamDetail.textContent = `Master Analytics & Reports`;

        if (gatewayActiveSessionBar) {
          gatewayActiveSessionBar.style.display = 'flex';
          if (gatewayCurrentUserTag) gatewayCurrentUserTag.textContent = `Logged in as: Admin / Management`;
        }
        if (gatewayCloseBtn) gatewayCloseBtn.style.display = 'block';

      } else {
        roleLoginBtn.classList.add('role-btn-unlogged');
        if (roleIcon) roleIcon.textContent = '🔑';
        if (roleBtnLabel) roleBtnLabel.textContent = 'Login / Select Role';
        if (teacherBar) teacherBar.classList.remove('active');

        // Sync User Profile Dropdown
        if (profileDropAvatar) profileDropAvatar.textContent = '👤';
        if (profileDropName) profileDropName.textContent = `Guest User`;
        if (profileDropRole) profileDropRole.textContent = `Click to Select Role / Stream`;
        if (profileDropStatus) profileDropStatus.textContent = `960 Degrees Catalog`;
        if (pmenuStreamDetail) pmenuStreamDetail.textContent = `Select Stream to Filter`;

        if (gatewayActiveSessionBar) gatewayActiveSessionBar.style.display = 'none';
        if (gatewayCloseBtn) gatewayCloseBtn.style.display = 'none';
      }
    }

    // Toggle User Profile Dropdown (SchoolCanvas Style)
    if (roleLoginBtn && userProfileDropdown) {
      roleLoginBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playSound('click');
        if (currentRole === 'unlogged') {
          // If unlogged, directly open gateway dialog
          if (gatewayOverlay) {
            updateRoleUI();
            gatewayOverlay.classList.add('active');
          }
        } else {
          // If logged in, toggle sleek profile dropdown
          const isOpen = userProfileDropdown.classList.contains('open');
          if (isOpen) {
            userProfileDropdown.classList.remove('open');
            if (userProfileWrapper) userProfileWrapper.classList.remove('active');
          } else {
            updateRoleUI();
            userProfileDropdown.classList.add('open');
            if (userProfileWrapper) userProfileWrapper.classList.add('active');
          }
        }
      });
    }

    // Close Profile Dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (userProfileDropdown && userProfileDropdown.classList.contains('open')) {
        if (!userProfileDropdown.contains(e.target) && e.target !== roleLoginBtn && !roleLoginBtn.contains(e.target)) {
          userProfileDropdown.classList.remove('open');
          if (userProfileWrapper) userProfileWrapper.classList.remove('active');
        }
      }
    });

    // Profile Dropdown Menu Handlers
    if (pmenuBtnDetails) {
      pmenuBtnDetails.addEventListener('click', () => {
        if (userProfileDropdown) userProfileDropdown.classList.remove('open');
        if (userProfileWrapper) userProfileWrapper.classList.remove('active');
        playSound('click');
        if (window.switchTab) window.switchTab('roadmap');
      });
    }

    if (pmenuBtnSwitchRole) {
      pmenuBtnSwitchRole.addEventListener('click', () => {
        if (userProfileDropdown) userProfileDropdown.classList.remove('open');
        if (userProfileWrapper) userProfileWrapper.classList.remove('active');
        playSound('click');
        if (gatewayOverlay) {
          updateRoleUI();
          gatewayOverlay.classList.add('active');
        }
      });
    }

    if (pmenuBtnHelp) {
      pmenuBtnHelp.addEventListener('click', () => {
        if (userProfileDropdown) userProfileDropdown.classList.remove('open');
        if (userProfileWrapper) userProfileWrapper.classList.remove('active');
        playSound('click');
        const tourBtn = document.getElementById('btn-tour-help');
        if (tourBtn) tourBtn.click();
      });
    }

    if (pmenuBtnLogout) {
      pmenuBtnLogout.addEventListener('click', () => {
        if (userProfileDropdown) userProfileDropdown.classList.remove('open');
        if (userProfileWrapper) userProfileWrapper.classList.remove('active');
        performLogout();
      });
    }

    // Show gateway if unlogged on initial load
    if (currentRole === 'unlogged' && gatewayOverlay) {
      gatewayOverlay.classList.add('active');
      if (gatewayRoleSelect) gatewayRoleSelect.value = '';
      if (placeholderHint) placeholderHint.style.display = 'block';
      if (formStudentGateway) formStudentGateway.style.display = 'none';
      if (formTeacherGateway) formTeacherGateway.style.display = 'none';
    } else if (gatewayOverlay) {
      gatewayOverlay.classList.remove('active');
    }

    // Dropdown change handler: Reveal role-specific sequential options
    if (gatewayRoleSelect) {
      gatewayRoleSelect.addEventListener('change', (e) => {
        const role = e.target.value;
        if (placeholderHint) placeholderHint.style.display = 'none';
        if (formStudentGateway) formStudentGateway.style.display = 'none';
        if (formTeacherGateway) formTeacherGateway.style.display = 'none';

        if (role === 'student') {
          if (formStudentGateway) formStudentGateway.style.display = 'flex';
        } else if (role === 'teacher') {
          if (formTeacherGateway) formTeacherGateway.style.display = 'flex';
        }
        playSound('click');
      });
    }

    async function pollTeacherLiveCount() {
      if (currentRole !== 'teacher' || !teacherLiveCount) return;
      try {
        const res = await fetch('/api/admin/stats');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.stats) {
            teacherLiveCount.textContent = `👥 ${data.stats.totalStudents || 0} Lab Students Connected (${data.stats.completedCount || 0} Completed)`;
          }
        }
      } catch (e) {}
    }

    updateRoleUI();

    if (gatewayCloseBtn && gatewayOverlay) {
      gatewayCloseBtn.addEventListener('click', () => {
        playSound('back');
        gatewayOverlay.classList.remove('active');
      });
    }

    // Master Logout Function
    function performLogout() {
      localStorage.removeItem('user_role');
      sessionStorage.removeItem('active_session');
      localStorage.removeItem('student_session');
      localStorage.removeItem('teacher_session');
      localStorage.removeItem('admin_auth');
      currentRole = 'unlogged';
      updateRoleUI();
      playSound('back');
      showToast('Logged out successfully. Please select your role to proceed.');

      if (gatewayOverlay) {
        if (gatewayRoleSelect) gatewayRoleSelect.value = '';
        if (placeholderHint) placeholderHint.style.display = 'block';
        if (formStudentGateway) formStudentGateway.style.display = 'none';
        if (formTeacherGateway) formTeacherGateway.style.display = 'none';
        gatewayOverlay.classList.add('active');
      }

      // Re-render Explorer with all clusters
      activeClusterScope = null;
      activeClusterFilter = 'all';
      renderFilterPills();
      renderBreadcrumbs();
      if (currentState === STATES.FULL_CIRCLE || currentState === STATES.CENTER) {
        renderFullCircleState(false);
      } else if (currentState === STATES.DOMAIN_EXPANDED) {
        transitionToFullCircle();
      }
    }
    window.performLogout = performLogout;

    // Attach master logout to all logout buttons
    if (btnGatewayLogout) btnGatewayLogout.addEventListener('click', performLogout);
    if (roleLogoutBtn) roleLogoutBtn.addEventListener('click', performLogout);

    // 1. Student Gateway Submit -> Sequence: Step 1 Assessment First!
    if (formStudentGateway) {
      formStudentGateway.addEventListener('submit', async (e) => {
        e.preventDefault();
        const payload = {
          name: document.getElementById('gateway-stu-name').value.trim(),
          rollNo: document.getElementById('gateway-stu-roll').value.trim(),
          classSection: document.getElementById('gateway-stu-class').value.trim() || '12-A',
          stream: document.getElementById('gateway-stu-stream').value,
          schoolName: document.getElementById('gateway-stu-school').value.trim() || 'Higher Secondary School',
          phone: document.getElementById('gateway-stu-phone').value.trim(),
          status: 'In Progress',
          registeredAt: new Date().toISOString()
        };

        localStorage.setItem('student_session', JSON.stringify(payload));
        localStorage.setItem('user_role', 'student');
        sessionStorage.setItem('active_session', 'true');
        currentRole = 'student';
        updateRoleUI();

        // Save immediately to local DB so dashboard reflects registration
        try {
          let db = JSON.parse(localStorage.getItem('school_students_db') || '[]');
          let idx = db.findIndex(s => s.rollNo === payload.rollNo);
          if (idx >= 0) db[idx] = { ...db[idx], ...payload };
          else db.push(payload);
          localStorage.setItem('school_students_db', JSON.stringify(db));
        } catch (err) {}

        if (gatewayOverlay) gatewayOverlay.classList.remove('active');
        playSound('celebrate');
        showToast(`Welcome ${payload.name}! Portal customized for ${payload.stream}.`);

        // Re-render Filter Pills & Explorer immediately to reflect student's stream
        activeClusterScope = null;
        activeClusterFilter = 'all';
        renderFilterPills();
        renderBreadcrumbs();
        if (currentState === STATES.FULL_CIRCLE || currentState === STATES.CENTER) {
          renderFullCircleState(false);
        } else if (currentState === STATES.DOMAIN_EXPANDED) {
          transitionToFullCircle();
        }

        // Sync with backend LAN server
        try {
          fetch('/api/students/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        } catch (err) {}

        // Sequential Flow: Switch directly to Aptitude Assessment (Step 1)
        if (typeof window.switchTab === 'function') {
          window.switchTab('aptitude');
        } else {
          document.getElementById('tab-btn-aptitude')?.click();
        }
      });
    }

    // 2. Teacher Gateway Submit -> Classroom Presentation Mode
    if (formTeacherGateway) {
      formTeacherGateway.addEventListener('submit', (e) => {
        e.preventDefault();
        const teacherPayload = {
          name: document.getElementById('gateway-teacher-name').value.trim(),
          department: document.getElementById('gateway-teacher-dept').value.trim(),
          schoolName: document.getElementById('gateway-teacher-school').value.trim()
        };

        localStorage.setItem('teacher_session', JSON.stringify(teacherPayload));
        localStorage.setItem('user_role', 'teacher');
        sessionStorage.setItem('active_session', 'true');
        currentRole = 'teacher';
        updateRoleUI();

        if (gatewayOverlay) gatewayOverlay.classList.remove('active');
        playSound('celebrate');
        showToast(`Teacher Presentation Mode Activated for ${teacherPayload.name}`);

        // Re-render Explorer with full 960+ course catalog
        activeClusterScope = null;
        activeClusterFilter = 'all';
        renderFilterPills();
        renderBreadcrumbs();
        if (currentState === STATES.FULL_CIRCLE || currentState === STATES.CENTER) {
          renderFullCircleState(false);
        }

        if (typeof window.switchTab === 'function') {
          window.switchTab('explore');
        } else {
          document.getElementById('tab-btn-explore')?.click();
        }
      });
    }

    // Teacher Bar Fullscreen Toggle
    if (teacherFullscreenBtn) {
      teacherFullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
          showToast('Projector Fullscreen Mode Active');
        } else {
          document.exitFullscreen();
        }
      });
    }

    // =========================================================================
    // SHAREABLE STUDENT JOIN LINK & PROJECTOR QR CODE SYSTEM
    // =========================================================================
    const shareLinkModal = document.getElementById('share-link-modal');
    const btnHeaderShareLink = document.getElementById('btn-header-share-link');
    const btnTeacherShareQr = document.getElementById('btn-teacher-share-qr');
    const shareModalCloseBtn = document.getElementById('share-modal-close-btn');
    const shareQrCanvas = document.getElementById('share-qr-canvas');
    const shareUrlInput = document.getElementById('share-url-input');
    const btnCopyShareUrl = document.getElementById('btn-copy-share-url');
    const btnCopyBroadcastMsg = document.getElementById('btn-copy-broadcast-msg');
    const broadcastMsgText = document.getElementById('broadcast-msg-text');
    const alternateIpsContainer = document.getElementById('alternate-ips-container');
    const alternateIpSelect = document.getElementById('alternate-ip-select');

    let currentNetworkInfo = null;

    async function openShareLinkModal() {
      if (!shareLinkModal) return;
      playSound('expand');
      shareLinkModal.classList.add('active');

      let targetUrl = window.location.origin;
      if (targetUrl.startsWith('file:') || targetUrl.includes('localhost') || targetUrl.includes('127.0.0.1')) {
        try {
          const res = await fetch('/api/network-info');
          if (res.ok) {
            currentNetworkInfo = await res.json();
            if (currentNetworkInfo.success && currentNetworkInfo.shareableUrl) {
              targetUrl = currentNetworkInfo.shareableUrl;
              
              if (currentNetworkInfo.allLinks && currentNetworkInfo.allLinks.length > 1 && alternateIpsContainer && alternateIpSelect) {
                alternateIpsContainer.style.display = 'block';
                alternateIpSelect.innerHTML = currentNetworkInfo.allLinks.map((link, idx) => `
                  <option value="${link}">🌐 Interface ${idx + 1}: ${link}</option>
                `).join('');
                alternateIpSelect.value = targetUrl;
                alternateIpSelect.onchange = (e) => {
                  updateShareModalContent(e.target.value);
                };
              }
            }
          }
        } catch (err) {
          targetUrl = window.location.origin.startsWith('http') ? window.location.origin : 'http://localhost:3000';
        }
      }

      updateShareModalContent(targetUrl);
    }

    function updateShareModalContent(url) {
      if (shareUrlInput) shareUrlInput.value = url;
      if (broadcastMsgText) {
        broadcastMsgText.textContent = `🎓 Class 12 Career Simulation & Aptitude Assessment is LIVE! Join from your mobile or laptop: ${url}`;
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

    if (btnHeaderShareLink) btnHeaderShareLink.addEventListener('click', openShareLinkModal);
    if (btnTeacherShareQr) btnTeacherShareQr.addEventListener('click', openShareLinkModal);
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
          playSound('celebrate');
          const origText = btnCopyShareUrl.innerHTML;
          btnCopyShareUrl.innerHTML = '✅ Copied!';
          btnCopyShareUrl.style.background = 'linear-gradient(135deg, #10b981, #059669)';
          showToast('Student Join URL copied to clipboard!');
          setTimeout(() => {
            btnCopyShareUrl.innerHTML = origText;
            btnCopyShareUrl.style.background = '';
          }, 2000);
        } catch (e) {
          shareUrlInput.select();
          document.execCommand('copy');
          showToast('Link copied to clipboard!');
        }
      });
    }

    if (btnCopyBroadcastMsg) {
      btnCopyBroadcastMsg.addEventListener('click', async () => {
        if (!broadcastMsgText) return;
        try {
          await navigator.clipboard.writeText(broadcastMsgText.textContent.trim());
          playSound('celebrate');
          showToast('WhatsApp / Broadcast message copied!');
        } catch (e) {
          showToast('Text copied!');
        }
      });
    }

    window.openShareLinkModal = openShareLinkModal;

    if (submitStudentPlanBtn) {
      submitStudentPlanBtn.addEventListener('click', async () => {
        let sessionRaw = localStorage.getItem('student_session');
        if (!sessionRaw) {
          if (gatewayOverlay) {
            gatewayOverlay.classList.add('active');
          }
          showToast('Please enter your Student details first!');
          return;
        }

        const student = JSON.parse(sessionRaw);
        const shortlisted = RAW_COURSES.filter(c => shortlistedCourseIds.includes(String(c.id)));
        
        // Collect colleges & ancillary courses for shortlisted
        let colleges = [];
        let ancillaries = [];
        shortlisted.forEach(c => {
          colleges.push(...getCollegesForCourse(c).slice(0, 2));
          colleges.push(...getTNCollegesForCourse(c).slice(0, 2));
          ancillaries.push(...getAncillaryCoursesForCourse(c).slice(0, 2));
        });

        const syncPayload = {
          rollNo: student.rollNo,
          name: student.name,
          schoolName: student.schoolName,
          classSection: student.classSection,
          stream: student.stream,
          phone: student.phone,
          status: 'Completed',
          shortlistedCourses: shortlisted.map(c => ({ id: c.id, course: c.course, domain: c.domain, cluster: c.cluster })),
          shortlistedColleges: colleges.map(col => ({ name: col.name, location: col.location, naac: col.naac, nirf: col.nirf })),
          ancillaryCourses: ancillaries.map(a => ({ title: a.title, provider: a.provider })),
          topCareerCluster: shortlisted.length > 0 ? shortlisted[0].cluster : student.stream,
          submittedAt: new Date().toISOString()
        };

        // 1. Update localStorage school_students_db
        try {
          let db = JSON.parse(localStorage.getItem('school_students_db') || '[]');
          let idx = db.findIndex(s => s.rollNo === student.rollNo);
          if (idx >= 0) db[idx] = { ...db[idx], ...syncPayload };
          else db.push(syncPayload);
          localStorage.setItem('school_students_db', JSON.stringify(db));
        } catch (err) {}

        // 2. Sync to LAN server
        try {
          const res = await fetch('/api/students/submit-assessment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(syncPayload)
          });
          const data = await res.json();
          if (data && data.success) {
            playSound('celebrate');
            showToast('🎉 Career Action Plan submitted to School Management!');
            setTimeout(() => {
              if (confirm("🎉 Action Plan submitted successfully! Would you like to log out for the next student now?")) {
                if (roleLogoutBtn) roleLogoutBtn.click();
              }
            }, 600);
          } else {
            showToast('Saved to school records!');
            setTimeout(() => {
              if (confirm("🎉 Action Plan saved! Would you like to log out for the next student now?")) {
                if (roleLogoutBtn) roleLogoutBtn.click();
              }
            }, 600);
          }
        } catch (e) {
          showToast('🎉 Saved locally to school records!');
          setTimeout(() => {
            if (confirm("🎉 Action Plan saved! Would you like to log out for the next student now?")) {
              if (roleLogoutBtn) roleLogoutBtn.click();
            }
          }, 600);
        }
      });
    }

    const drawerLogoutBtn = document.getElementById('btn-drawer-logout');
    if (drawerLogoutBtn) {
      drawerLogoutBtn.addEventListener('click', () => {
        if (shortlistDrawerOverlay) shortlistDrawerOverlay.classList.remove('active');
        if (roleLogoutBtn) roleLogoutBtn.click();
      });
    }

    const drawerCloseBtn = document.getElementById('drawer-close-btn');
    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener('click', () => {
        if (shortlistDrawerOverlay) shortlistDrawerOverlay.classList.remove('active');
      });
    }

    const openCompareBtn = document.getElementById('btn-open-compare');
    if (openCompareBtn) openCompareBtn.addEventListener('click', openCompareModal);

    const compareCloseBtn = document.getElementById('compare-close-btn');
    if (compareCloseBtn) {
      compareCloseBtn.addEventListener('click', () => {
        if (compareModalOverlay) compareModalOverlay.classList.remove('active');
      });
    }

    const soundBtn = document.getElementById('btn-toggle-sound');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        isSoundMuted = !isSoundMuted;
        localStorage.setItem('sfx_muted', isSoundMuted ? 'true' : 'false');
        const slot = soundBtn.querySelector('.icon-slot') || soundBtn;
        slot.innerHTML = isSoundMuted ? ICONS.soundOff : ICONS.soundOn;
        showToast(isSoundMuted ? 'Audio muted' : 'Audio enabled');
      });
    }

    const themeBtn = document.getElementById('btn-toggle-theme');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const isLight = document.body.getAttribute('data-theme') === 'light';
        document.body.setAttribute('data-theme', isLight ? 'dark' : 'light');
        localStorage.setItem('theme', isLight ? 'dark' : 'light');
        const slot = themeBtn.querySelector('.icon-slot') || themeBtn;
        slot.innerHTML = isLight ? ICONS.moon : ICONS.sun;
        playSound('click');
      });

      if (localStorage.getItem('theme') === 'light') {
        document.body.setAttribute('data-theme', 'light');
        const slot = themeBtn.querySelector('.icon-slot') || themeBtn;
        slot.innerHTML = ICONS.sun;
      }
    }

    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
      });
    }
    if (compareModalOverlay) {
      compareModalOverlay.addEventListener('click', (e) => {
        if (e.target === compareModalOverlay) compareModalOverlay.classList.remove('active');
      });
    }
    if (shortlistDrawerOverlay) {
      shortlistDrawerOverlay.addEventListener('click', (e) => {
        if (e.target === shortlistDrawerOverlay) shortlistDrawerOverlay.classList.remove('active');
      });
    }
  }

  return {
    init,
    openTNDirectoryModal: (stream = 'all') => {
      currentHubStream = stream;
      renderTNHubGrid();
      const modal = document.getElementById('tn-directory-modal');
      if (modal) modal.classList.add('active');
    },
    openAncillaryHubModal: (cluster = 'all') => {
      currentAncillaryCluster = cluster;
      renderAncillaryHub();
      const modal = document.getElementById('ancillary-courses-modal');
      if (modal) modal.classList.add('active');
    },
    openPGExamsModal: (stream = 'all') => {
      currentPGStream = stream;
      renderPGModalGrid();
      const modal = document.getElementById('pg-exams-modal');
      if (modal) modal.classList.add('active');
    },
    openStudyAbroadModal: (country = 'all') => {
      currentAbroadCountry = country;
      renderAbroadModalGrid();
      const modal = document.getElementById('global-abroad-modal');
      if (modal) modal.classList.add('active');
    },
    setExploreMode: (mode) => {
      exploreViewMode = mode;
      activeClusterScope = null;
      if (currentState !== STATES.FULL_CIRCLE) {
        transitionToFullCircle();
      } else {
        renderFullCircleState();
      }
    },
    transitionToFullCircle,
    transitionToHalfMoon,
    transitionToDomainExpanded,
    openCourseModalById: (id) => {
      const c = RAW_COURSES.find(x => String(x.id) === String(id));
      if (c) openCourseModal(c);
    },
    getInternshipsAndRecruitersForCourse,
    toggleShortlist,
    openShortlistDrawer,
    toggleCompare,
    openCompareModal
  };
})();

window.getInternshipsAndRecruitersForCourse = SimulationEngine.getInternshipsAndRecruitersForCourse;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    SimulationEngine.init();
  });
} else {
  SimulationEngine.init();
}