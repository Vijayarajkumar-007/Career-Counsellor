// =============================================================================
// CLASS 12 CAREER COUNSELING & SIMULATION - LOCAL LAN SERVER
// 100% FREE OF COST & ZERO-EXTERNAL-DEPENDENCIES (Runs on built-in Node.js modules)
// =============================================================================

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'school_sessions_db.json');

// Initialize database if it does not exist
if (!fs.existsSync(DB_FILE)) {
  const initialDb = {
    session: {
      schoolName: "Tamil Nadu Higher Secondary School",
      sessionDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    },
    students: []
  };
  fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf8');
}

function getDatabase() {
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return { session: {}, students: [] };
  }
}

function saveDatabase(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (e) {
    console.error("Error saving database:", e);
    return false;
  }
}

// MIME Types mapping
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8'
};

function getLocalIpAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push(iface.address);
      }
    }
  }
  return addresses.length > 0 ? addresses : ['127.0.0.1'];
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
};

function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>`]/g, '').trim();
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    ...SECURITY_HEADERS
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  // Enable CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // =========================================================================
  // REST API ENDPOINTS
  // =========================================================================

  // 1. Student Login / Registration
  if (pathname === '/api/students/login' && req.method === 'POST') {
    try {
      const payload = await parseJsonBody(req);
      const { name, rollNo, schoolName, classSection, stream, phone } = payload;
      if (!name || !rollNo) {
        return sendJson(res, 400, { success: false, message: "Name and Roll Number are required" });
      }

      const db = getDatabase();
      let student = db.students.find(s => s.rollNo.trim().toLowerCase() === rollNo.trim().toLowerCase());
      
      const now = new Date().toISOString();
      if (student) {
        // Update existing student session info
        student.name = name;
        student.schoolName = schoolName || student.schoolName || db.session.schoolName;
        student.classSection = classSection || student.classSection;
        student.stream = stream || student.stream;
        student.phone = phone || student.phone;
        student.lastLogin = now;
      } else {
        student = {
          id: 'STU-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
          rollNo: rollNo.trim(),
          name: name.trim(),
          schoolName: schoolName || db.session.schoolName,
          classSection: classSection || '12-A',
          stream: stream || 'Bio-Maths',
          phone: phone || '',
          registeredAt: now,
          lastLogin: now,
          status: 'In Progress',
          riasecScores: null,
          topTraits: [],
          topCareerCluster: '',
          recommendedCourses: [],
          shortlistedCourses: [],
          shortlistedColleges: [],
          ancillaryCourses: [],
          pgPathways: [],
          studyAbroad: [],
          submittedAt: null
        };
        db.students.push(student);
      }

      if (schoolName && db.session) {
        db.session.schoolName = schoolName;
      }

      saveDatabase(db);
      return sendJson(res, 200, { success: true, student });
    } catch (e) {
      return sendJson(res, 500, { success: false, message: e.message });
    }
  }

  // 2. Submit / Sync Student Assessment & Action Plan
  if (pathname === '/api/students/submit-assessment' && req.method === 'POST') {
    try {
      const payload = await parseJsonBody(req);
      const { rollNo, riasecScores, topTraits, topCareerCluster, recommendedCourses, shortlistedCourses, shortlistedColleges, ancillaryCourses, pgPathways, studyAbroad } = payload;
      
      if (!rollNo) {
        return sendJson(res, 400, { success: false, message: "Roll Number is required" });
      }

      const db = getDatabase();
      let student = db.students.find(s => s.rollNo.trim().toLowerCase() === rollNo.trim().toLowerCase());
      if (!student) {
        return sendJson(res, 404, { success: false, message: "Student record not found. Please log in first." });
      }

      if (riasecScores) student.riasecScores = riasecScores;
      if (topTraits) student.topTraits = topTraits;
      if (topCareerCluster) student.topCareerCluster = topCareerCluster;
      if (recommendedCourses) student.recommendedCourses = recommendedCourses;
      if (shortlistedCourses) student.shortlistedCourses = shortlistedCourses;
      if (shortlistedColleges) student.shortlistedColleges = shortlistedColleges;
      if (ancillaryCourses) student.ancillaryCourses = ancillaryCourses;
      if (pgPathways) student.pgPathways = pgPathways;
      if (studyAbroad) student.studyAbroad = studyAbroad;

      student.status = 'Completed';
      student.submittedAt = new Date().toISOString();

      saveDatabase(db);
      return sendJson(res, 200, { success: true, message: "Assessment synchronized successfully", student });
    } catch (e) {
      return sendJson(res, 500, { success: false, message: e.message });
    }
  }

  // 3. Admin: Get Session Statistics for Presentation Dashboard
  if (pathname === '/api/admin/stats' && req.method === 'GET') {
    const db = getDatabase();
    const students = db.students || [];

    const totalStudents = students.length;
    const completedCount = students.filter(s => s.status === 'Completed').length;

    // Stream distribution
    const streamCounts = {};
    // Career cluster distribution
    const clusterCounts = {};
    // RIASEC distribution
    const riasecCounts = { Realistic: 0, Investigative: 0, Artistic: 0, Social: 0, Enterprising: 0, Conventional: 0 };
    // Top shortlisted courses
    const coursePopularity = {};
    // Top shortlisted colleges
    const collegePopularity = {};

    students.forEach(s => {
      // Stream
      const st = s.stream || 'Other';
      streamCounts[st] = (streamCounts[st] || 0) + 1;

      // Cluster
      if (s.topCareerCluster) {
        clusterCounts[s.topCareerCluster] = (clusterCounts[s.topCareerCluster] || 0) + 1;
      }

      // RIASEC
      if (s.topTraits && Array.isArray(s.topTraits)) {
        s.topTraits.forEach(trait => {
          if (riasecCounts[trait] !== undefined) riasecCounts[trait]++;
        });
      }

      // Shortlisted courses
      if (s.shortlistedCourses && Array.isArray(s.shortlistedCourses)) {
        s.shortlistedCourses.forEach(c => {
          const name = typeof c === 'string' ? c : (c.course || c.name);
          if (name) coursePopularity[name] = (coursePopularity[name] || 0) + 1;
        });
      }

      // Shortlisted colleges
      if (s.shortlistedColleges && Array.isArray(s.shortlistedColleges)) {
        s.shortlistedColleges.forEach(c => {
          const name = typeof c === 'string' ? c : (c.name || c.college);
          if (name) collegePopularity[name] = (collegePopularity[name] || 0) + 1;
        });
      }
    });

    const topCourses = Object.entries(coursePopularity)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const topColleges = Object.entries(collegePopularity)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return sendJson(res, 200, {
      success: true,
      session: db.session || {},
      stats: {
        totalStudents,
        completedCount,
        streamCounts,
        clusterCounts,
        riasecCounts,
        topCourses,
        topColleges
      }
    });
  }

  // 4. Admin: Get Full Students List
  if (pathname === '/api/admin/students' && req.method === 'GET') {
    const db = getDatabase();
    return sendJson(res, 200, {
      success: true,
      session: db.session,
      students: db.students
    });
  }

  // 5. Network Info & Shareable LAN Link
  if (pathname === '/api/network-info' && req.method === 'GET') {
    const localIps = getLocalIpAddresses();
    const primaryIp = localIps[0] || '127.0.0.1';
    const port = PORT;
    const shareableUrl = `http://${primaryIp}:${port}`;
    const allLinks = localIps.map(ip => `http://${ip}:${port}`);

    return sendJson(res, 200, {
      success: true,
      port,
      primaryIp,
      localIps,
      shareableUrl,
      allLinks
    });
  }

  // 6. Admin: Export All Students to CSV (Excel format)
  if (pathname === '/api/admin/export-csv' && req.method === 'GET') {
    const db = getDatabase();
    const students = db.students || [];

    const headers = [
      "Roll No",
      "Student Name",
      "School Name",
      "Class & Section",
      "12th Stream",
      "Phone",
      "Status",
      "Top Career Cluster",
      "RIASEC Traits",
      "Shortlisted Courses",
      "Shortlisted Colleges",
      "Ancillary Skills",
      "Study Abroad Preference",
      "Submitted Timestamp"
    ];

    function escapeCsv(val) {
      if (val === null || val === undefined) return '""';
      let str = String(val).replace(/"/g, '""');
      if (/^[=+\-@\t\r]/.test(str)) {
        str = "'" + str;
      }
      return `"${str}"`;
    }

    const rows = students.map(s => {
      const coursesStr = (s.shortlistedCourses || []).map(c => typeof c === 'string' ? c : (c.course || c.name)).join('; ');
      const collegesStr = (s.shortlistedColleges || []).map(c => typeof c === 'string' ? c : (c.name || c.college)).join('; ');
      const skillsStr = (s.ancillaryCourses || []).map(c => typeof c === 'string' ? c : (c.title || c.name)).join('; ');
      const abroadStr = (s.studyAbroad || []).map(c => typeof c === 'string' ? c : (c.country || c.name)).join('; ');
      const traitsStr = (s.topTraits || []).join(', ');

      return [
        escapeCsv(s.rollNo),
        escapeCsv(s.name),
        escapeCsv(s.schoolName),
        escapeCsv(s.classSection),
        escapeCsv(s.stream),
        escapeCsv(s.phone),
        escapeCsv(s.status),
        escapeCsv(s.topCareerCluster),
        escapeCsv(traitsStr),
        escapeCsv(coursesStr),
        escapeCsv(collegesStr),
        escapeCsv(skillsStr),
        escapeCsv(abroadStr),
        escapeCsv(s.submittedAt || s.registeredAt)
      ].join(',');
    });

    const csvContent = "\uFEFF" + [headers.join(','), ...rows].join('\r\n');
    res.writeHead(200, {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="Career_Counseling_${(db.session.schoolName || 'School').replace(/\s+/g, '_')}_${Date.now()}.csv"`
    });
    return res.end(csvContent);
  }

  // 6. Admin: Reset / Start New School Session
  if (pathname === '/api/admin/clear-session' && req.method === 'POST') {
    try {
      const payload = await parseJsonBody(req);
      const newSession = {
        schoolName: payload.schoolName || "New School Session",
        sessionDate: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString()
      };
      saveDatabase({ session: newSession, students: [] });
      return sendJson(res, 200, { success: true, message: "New session started successfully", session: newSession });
    } catch (e) {
      return sendJson(res, 500, { success: false, message: e.message });
    }
  }

  // =========================================================================
  // STATIC FILE SERVING
  // =========================================================================
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);

  // Security check: prevent directory traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback for SPA routing to index.html
      if (!path.extname(pathname)) {
        filePath = path.join(__dirname, 'index.html');
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('404 Not Found');
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain', ...SECURITY_HEADERS });
        return res.end('500 Internal Server Error');
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
        ...SECURITY_HEADERS
      });
      res.end(content);
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const ips = getLocalIpAddresses();
  console.log('\n==================================================================');
  console.log(' 🎓 CLASS 12 CAREER COUNSELING & SIMULATION - LAN SERVER ACTIVE');
  console.log(' 100% Free & Self-Contained (Zero Cloud Dependency)');
  console.log('==================================================================');
  console.log(`\n💻 Host Laptop Access:`);
  console.log(`   👉 Student & Teacher Portal: http://localhost:${PORT}
   👉 Dedicated Admin Login:    http://localhost:${PORT}/admin.html
   👉 Management Dashboard:     http://localhost:${PORT}/dashboard.html`);
  console.log(`\n🏫 Student Lab Computers (Same Wi-Fi / LAN Network):`);
  ips.forEach(ip => {
    console.log(`   🔗 Share this link with students:  http://${ip}:${PORT}`);
  });
  console.log('\n==================================================================\n');
});
