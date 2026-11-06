// 零依赖静态服务器 + 进度同步 —— 现代企业管理复习网站
// 用法： node server.js [端口] [--no-open]
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { exec } = require('child_process');

const ROOT = __dirname;
const BASE_PORT = Number(process.argv[2]) || 8080;
let PORT = BASE_PORT;

// 进度存储目录（放在 site 下的 _progress/，不进版本库也不影响静态资源）
const DATA_DIR = path.join(ROOT, '_progress');
const MAX_BODY = 2 * 1024 * 1024; // 单次上传上限 2MB

try { fs.mkdirSync(DATA_DIR, { recursive: true }); } catch (e) {}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

/* ---------------- 进度档案存取 ---------------- */

// 档案 id 只允许安全字符，防止目录穿越
function safeId(id) {
  return typeof id === 'string' && /^[A-Za-z0-9_-]{4,64}$/.test(id);
}
function profilePath(id) {
  return path.join(DATA_DIR, id + '.json');
}
function listProfiles() {
  let files = [];
  try { files = fs.readdirSync(DATA_DIR); } catch (e) { return []; }
  const out = [];
  for (const f of files) {
    if (!f.endsWith('.json')) continue;
    const id = f.slice(0, -5);
    if (!safeId(id)) continue;
    try {
      const st = fs.statSync(path.join(DATA_DIR, f));
      const raw = JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), 'utf8'));
      out.push({
        id,
        name: raw.name || id,
        updatedAt: raw.updatedAt || st.mtimeMs,
        learned: raw.learnedCount || 0,
        wrong: raw.wrongCount || 0,
        answered: raw.answeredCount || 0,
        client: raw.client || '',
      });
    } catch (e) { /* 跳过损坏文件 */ }
  }
  out.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  return out;
}
function readBody(req, cb) {
  let size = 0;
  const chunks = [];
  req.on('data', c => {
    size += c.length;
    if (size > MAX_BODY) { req.destroy(); return; }
    chunks.push(c);
  });
  req.on('end', () => cb(null, Buffer.concat(chunks).toString('utf8')));
  req.on('error', e => cb(e));
}
function sendJson(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  let parsed;
  try {
    parsed = new URL(req.url, 'http://localhost');
  } catch (e) {
    res.writeHead(400); return res.end('Bad Request');
  }
  let urlPath;
  try {
    urlPath = decodeURIComponent(parsed.pathname);
  } catch (e) {
    res.writeHead(400); return res.end('Bad Request');
  }

  // ---------- 进度 API ----------
  if (urlPath.startsWith('/api/progress')) {
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
      });
      return res.end();
    }

    // GET /api/progress          列出全部档案
    if (urlPath === '/api/progress' && req.method === 'GET') {
      return sendJson(res, 200, { ok: true, profiles: listProfiles() });
    }

    // GET /api/progress/:id      读取单个档案
    const m = urlPath.match(/^\/api\/progress\/([^/]+)$/);
    if (m) {
      const id = m[1];
      if (!safeId(id)) return sendJson(res, 400, { ok: false, error: 'bad id' });

      if (req.method === 'GET') {
        try {
          const raw = fs.readFileSync(profilePath(id), 'utf8');
          return sendJson(res, 200, { ok: true, data: JSON.parse(raw) });
        } catch (e) {
          return sendJson(res, 404, { ok: false, error: 'not found' });
        }
      }

      if (req.method === 'POST') {
        return readBody(req, (err, body) => {
          if (err) return sendJson(res, 400, { ok: false, error: 'read error' });
          let obj;
          try { obj = JSON.parse(body); } catch (e) {
            return sendJson(res, 400, { ok: false, error: 'bad json' });
          }
          obj.id = id;
          obj.updatedAt = Date.now();
          try {
            // 先写临时文件再改名，避免写一半损坏
            const tmp = profilePath(id) + '.tmp';
            fs.writeFileSync(tmp, JSON.stringify(obj), 'utf8');
            fs.renameSync(tmp, profilePath(id));
            return sendJson(res, 200, { ok: true, updatedAt: obj.updatedAt });
          } catch (e) {
            return sendJson(res, 500, { ok: false, error: 'write failed' });
          }
        });
      }

      if (req.method === 'DELETE') {
        try { fs.unlinkSync(profilePath(id)); } catch (e) {}
        return sendJson(res, 200, { ok: true });
      }
    }

    return sendJson(res, 404, { ok: false, error: 'unknown api' });
  }

  // ---------- 静态文件 ----------
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.normalize(path.join(ROOT, urlPath));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403); return res.end('Forbidden');
  }
  // 不允许直接访问进度目录
  if (filePath.startsWith(DATA_DIR + path.sep) || filePath === DATA_DIR) {
    res.writeHead(403); return res.end('Forbidden');
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
      return res.end('404 Not Found: ' + urlPath);
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE' && PORT < BASE_PORT + 20) {
    PORT += 1;
    console.log(`  [port busy] retrying on ${PORT} ...`);
    setTimeout(() => server.listen(PORT), 120);
  } else {
    console.error('  [ERROR] failed to start:', err.message);
    process.exit(1);
  }
});

server.listen(PORT, () => {
  const nets = os.networkInterfaces();
  const lan = [];
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family === 'IPv4' && !net.internal) lan.push(net.address);
    }
  }
  // 只输出 ASCII，避免 Windows 控制台代码页问题
  console.log('');
  console.log('  ============================================');
  console.log('   Local   :  http://localhost:' + PORT);
  lan.forEach(ip => console.log('   LAN     :  http://' + ip + ':' + PORT));
  console.log('  ============================================');
  console.log('   progress saved in: _progress/');
  console.log('   Press Ctrl+C to stop');
  console.log('');

  if (!process.argv.includes('--no-open')) {
    const url = `http://localhost:${PORT}`;
    const cmd = process.platform === 'win32' ? `start "" "${url}"`
      : process.platform === 'darwin' ? `open "${url}"` : `xdg-open "${url}"`;
    exec(cmd, () => {});
  }
});
