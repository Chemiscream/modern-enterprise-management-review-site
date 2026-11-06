/* ================= 应用状态与工具 ================= */
const App = {
  chapters: {},      // id -> chapter data
  mcq: [],
  midterm: [],
  tf: [],
  short: [],
  calc: [],
  cases: [],
  exams: [],
  canon: null,
  route: 'home',
  currentChapter: 'ch01',
  progress: {},      // 学习进度
  wrong: [],         // 错题本
  stats: {},         // 答题统计
};

const CHAPTER_META = [
  { id:'ch01', num:1, file:'ch01.json' },
  { id:'ch02', num:2, file:'ch02.json' },
  { id:'ch03', num:3, file:'ch03.json' },
  { id:'ch04', num:4, file:'ch04.json' },
  { id:'ch05', num:5, file:'ch05.json' },
  { id:'ch06', num:6, file:'ch06.json' },
  { id:'ch07', num:7, file:'ch07.json' },
  { id:'ch08', num:8, file:'ch08.json' },
  { id:'ch09', num:9, file:'ch09.json' },
];

/* ---------- 进度存储：服务器档案 + 本地缓存 ---------- */
// 说明：
//  - 每台设备（浏览器）生成一个稳定 ID，存 localStorage，键名不含端口，
//    因此换端口（8080→8081）不会丢进度。
//  - 真正的进度存在服务器的 _progress/<id>.json，手机与电脑各自一份。
//  - localStorage 只是离线缓存，服务器可用时以服务器为准。
const LS_KEY = 'mgt_study_v1';          // 旧版单档键（用于迁移）
const DEVICE_KEY = 'mgt_device_id';     // 设备 ID，跨端口稳定
const PROFILE_KEY = 'mgt_profile_v1';   // 本机缓存的存档
const API = '/api/progress';

const Sync = {
  deviceId: null,
  online: true,        // 服务器是否可用
  lastSync: 0,
  saving: false,
  pending: false,
};

function getDeviceId(){
  if (Sync.deviceId) return Sync.deviceId;
  let id = null;
  try { id = localStorage.getItem(DEVICE_KEY); } catch(e){}
  if (!id || !/^[A-Za-z0-9_-]{4,64}$/.test(id)) {
    // 生成一个稳定 id：时间戳 + 随机
    id = 'u' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    try { localStorage.setItem(DEVICE_KEY, id); } catch(e){}
  }
  Sync.deviceId = id;
  return id;
}

/** 读取本地缓存（作为离线/首屏兜底） */
function loadLocalState(){
  for (const key of [PROFILE_KEY, 'mgt_study_' + getDeviceId(), LS_KEY]) {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const obj = JSON.parse(raw);
        if (obj && (obj.progress || obj.wrong || obj.stats)) return obj;
      }
    } catch(e){}
  }
  return null;
}

function saveLocalState(){
  const payload = {
    progress: App.progress,
    wrong: App.wrong,
    stats: App.stats,
  
    updatedAt: Date.now(),
  };
  try { localStorage.setItem(PROFILE_KEY, JSON.stringify(payload)); } catch(e){}
  return payload;
}

/** 把状态应用到 App */
function applyState(st){
  if (!st) return;
  App.progress = st.progress || {};
  App.wrong = Array.isArray(st.wrong) ? st.wrong : [];
  App.stats = st.stats || {};
  if (st.theme) applyTheme(st.theme);
}

/** 从服务器拉取当前设备档案 */
async function pullFromServer(){
  const id = getDeviceId();
  try {
    const r = await fetch(API + '/' + id, { cache: 'no-store' });
    if (r.status === 404) { Sync.online = true; return null; }
    if (!r.ok) throw new Error('http ' + r.status);
    const j = await r.json();
    Sync.online = true;
    Sync.lastSync = Date.now();
    return j.data || null;
  } catch(e){
    Sync.online = false;
    return null;
  }
}

/** 把当前状态推到服务器（自动合并并发） */
async function pushToServer(){
  if (Sync.saving) { Sync.pending = true; return; }
  Sync.saving = true;
  Sync.pending = false;
  const id = getDeviceId();
  const payload = saveLocalState();
  payload.name = payload.name || deviceLabel();
  payload.client = navigator.userAgent.slice(0, 120);
  payload.learnedCount = Object.keys(App.progress.readPoints || {}).length;
  payload.wrongCount = App.wrong.length;
  payload.answeredCount = (App.stats.total || 0);
  try {
    const r = await fetch(API + '/' + id, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    Sync.online = r.ok;
    if (r.ok) Sync.lastSync = Date.now();
  } catch(e){
    Sync.online = false;
  } finally {
    Sync.saving = false;
    if (Sync.pending) setTimeout(pushToServer, 100);
  }
}

/** 设备标签：根据 UA 猜个可读名字 */
function deviceLabel(){
  const ua = navigator.userAgent;
  if (/iPhone/i.test(ua)) return 'iPhone';
  if (/iPad/i.test(ua)) return 'iPad';
  if (/Android/i.test(ua)) return '安卓设备';
  if (/Macintosh/i.test(ua)) return 'Mac 浏览器';
  if (/Windows/i.test(ua)) return 'Windows 浏览器';
  return '浏览器';
}

/** 保存（本地立即写，服务器防抖推送） */
function saveState(){
  saveLocalState();
  clearTimeout(saveState._t);
  saveState._t = setTimeout(() => { pushToServer(); }, 800);
}
function persistSoon(){
  clearTimeout(persistSoon._t);
  persistSoon._t = setTimeout(saveState, 250);
}

/** 切换/接管另一台设备的档案 */
async function adoptProfile(id){
  const r = await fetch(API + '/' + id, { cache: 'no-store' });
  if (!r.ok) { toast('该档案不存在'); return false; }
  const j = await r.json();
  applyState(j.data);
  // 设备 ID 换成对方，实现"接管"
  try { localStorage.setItem(DEVICE_KEY, id); } catch(e){}
  Sync.deviceId = id;
  saveState();
  return true;
}

/** 列出服务器上的全部档案 */
async function listProfiles(){
  try {
    const r = await fetch(API, { cache: 'no-store' });
    if (!r.ok) return [];
    const j = await r.json();
    return j.profiles || [];
  } catch(e){ return []; }
}

/* ---------- 工具函数 ---------- */
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

function esc(s){
  return String(s==null?'':s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

/** 极简 Markdown 渲染：支持表格、代码块、粗体、行内代码、引用、列表 */
function md(text){
  if(!text) return '';
  const blocks = [];
  let s = String(text);

  function inline(t){
    return esc(t)
      .replace(/`([^`]+)`/g,'<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
  }

  // 代码块
  s = s.replace(/```([\s\S]*?)```/g, (m, code) => {
    const i = blocks.length;
    blocks.push('<pre><code>' + esc(code.replace(/^\n/,'')) + '</code></pre>');
    return '\u0000B' + i + '\u0000';
  });

  // 数学块 $$...$$ 原样展示
  s = s.replace(/\$\$([\s\S]*?)\$\$/g, (m, f) => {
    const i = blocks.length;
    blocks.push('<pre class="math">' + esc(f.trim()) + '</pre>');
    return '\u0000B' + i + '\u0000';
  });

  // 表格（逐行扫描，稳健处理前后文）
  {
    const lines0 = s.split('\n');
    const outLines = [];
    let i = 0;
    const isTableRow = l => /^\s*\|.*\|\s*$/.test(l);
    const isSep = l => /^\s*\|[\s:|-]+\|\s*$/.test(l) && l.includes('-');
    while (i < lines0.length) {
      if (isTableRow(lines0[i]) && i + 1 < lines0.length && isSep(lines0[i + 1])) {
        const head = lines0[i].trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
        const body = [];
        let j = i + 2;
        while (j < lines0.length && isTableRow(lines0[j])) {
          body.push(lines0[j].trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim()));
          j++;
        }
        let html = '<table><thead><tr>' + head.map(h => '<th>' + inline(h) + '</th>').join('') + '</tr></thead><tbody>';
        body.forEach(r => {
          html += '<tr>' + r.map(c => '<td>' + inline(c) + '</td>').join('') + '</tr>';
        });
        html += '</tbody></table>';
        const bi = blocks.length;
        blocks.push(html);
        outLines.push('\u0000B' + bi + '\u0000');
        i = j;
      } else {
        outLines.push(lines0[i]);
        i++;
      }
    }
    s = outLines.join('\n');
  }

  // 转义其余内容
  s = esc(s);

  // 行内代码与粗体
  s = s.replace(/`([^`]+)`/g,'<code>$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');

  // 逐行处理块级元素
  const lines = s.split('\n');
  const out = [];
  let inUl = false, inOl = false, inQuote = false;

  const closeLists = () => {
    if(inUl){ out.push('</ul>'); inUl=false; }
    if(inOl){ out.push('</ol>'); inOl=false; }
    if(inQuote){ out.push('</blockquote>'); inQuote=false; }
  };

  for(let raw of lines){
    const line = raw.replace(/\s+$/,'');
    const t = line.trim();

    if(t === ''){
      closeLists();
      continue;
    }
    if(/^\u0000B\d+\u0000$/.test(t)){
      closeLists();
      out.push(t.replace(/\u0000B(\d+)\u0000/,(m,i)=>blocks[+i]));
      continue;
    }
    // 标题
    if(/^#{1,6}\s/.test(t)){
      closeLists();
      const lvl = t.match(/^#+/)[0].length;
      const lv = Math.min(lvl+2, 5);
      out.push('<h'+lv+'>' + t.replace(/^#+\s*/,'') + '</h'+lv+'>');
      continue;
    }
    // 引用
    if(/^&gt;\s?/.test(t) || /^>\s?/.test(t)){
      if(!inQuote){ closeLists(); out.push('<blockquote>'); inQuote = true; }
      out.push('<p>' + t.replace(/^(&gt;|>)\s?/,'') + '</p>');
      continue;
    }
    // 无序列表
    if(/^[-*+]\s+/.test(t)){
      if(inQuote){ out.push('</blockquote>'); inQuote=false; }
      if(inOl){ out.push('</ol>'); inOl=false; }
      if(!inUl){ out.push('<ul>'); inUl = true; }
      out.push('<li>' + t.replace(/^[-*+]\s+/,'') + '</li>');
      continue;
    }
    // 有序列表
    if(/^\d+[.)]\s+/.test(t)){
      if(inQuote){ out.push('</blockquote>'); inQuote=false; }
      if(inUl){ out.push('</ul>'); inUl=false; }
      if(!inOl){ out.push('<ol>'); inOl = true; }
      out.push('<li>' + t.replace(/^\d+[.)]\s+/,'') + '</li>');
      continue;
    }
    // 表格块占位
    if(/^\u0000B/.test(t)){
      closeLists();
      continue;
    }

    closeLists();
    out.push('<p>' + t + '</p>');
  }
  closeLists();

  let html = out.join('\n');
  // 还原占位
  html = html.replace(/\u0000B(\d+)\u0000/g, (m,i)=>blocks[+i]);
  return html;
}

/* ---------- 提示 ---------- */
let toastTimer = null;
function toast(msg){
  let el = $('#toast');
  if(!el){
    el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>el.classList.remove('show'), 1900);
}

/* ---------- 主题（已移除深色模式，仅保留浅色单一主题）---------- */
function applyTheme(theme){
  // 只保留浅色主题；深色模式已按需求移除
  document.documentElement.removeAttribute('data-theme');
}
function toggleTheme(){
  // 无操作：深色模式已移除
}

/* ---------- 进度统计 ---------- */
function pointKey(chId, ptId){ return chId + ':' + ptId; }

function isPointRead(chId, ptId){
  return !!App.progress.readPoints?.[pointKey(chId, ptId)];
}
function markPointRead(chId, ptId){
  App.progress.readPoints = App.progress.readPoints || {};
  App.progress.readPoints[pointKey(chId, ptId)] = 1;
  persistSoon();
}
function unmarkPointRead(chId, ptId){
  if(App.progress.readPoints){
    delete App.progress.readPoints[pointKey(chId, ptId)];
  }
  persistSoon();
}
/** 切换已学状态，返回切换后的状态（true=已学） */
function togglePointRead(chId, ptId){
  if(isPointRead(chId, ptId)){
    unmarkPointRead(chId, ptId);
    return false;
  }
  markPointRead(chId, ptId);
  return true;
}
function clearChapterRead(chId){
  const ch = App.chapters[chId];
  if(!ch || !App.progress.readPoints) return 0;
  let n = 0;
  ch.sections.forEach(s=>s.points.forEach(p=>{
    const k = pointKey(chId, p.id);
    if(App.progress.readPoints[k]){ delete App.progress.readPoints[k]; n++; }
  }));
  persistSoon();
  return n;
}
function chapterProgress(chId){
  const ch = App.chapters[chId];
  if(!ch) return 0;
  const all = ch.sections.flatMap(s=>s.points);
  if(!all.length) return 0;
  const done = all.filter(p=>isPointRead(chId, p.id)).length;
  return { done, total: all.length, pct: Math.round(done/all.length*100) };
}
function overallProgress(){
  let done = 0, total = 0;
  CHAPTER_META.forEach(m=>{
    const p = chapterProgress(m.id);
    if(p && p.total){ done += p.done; total += p.total; }
  });
  return { done, total, pct: total ? Math.round(done/total*100) : 0 };
}

/* ---------- 错题本 ---------- */
function addWrong(q){
  const exist = App.wrong.find(w=>w.id === q.id);
  if(exist){
    exist.times = (exist.times||1) + 1;
    exist.ts = Date.now();
    exist.due = Date.now() + stageDelay(exist.times);
  }else{
    App.wrong.push({
      id: q.id,
      stem: q.stem,
      type: q.type,
      chapter: q.chapter,
      answer: q.answer,
      explain: q.explain,
      options: q.options,
      times: 1,
      ts: Date.now(),
      due: Date.now() + stageDelay(1),
    });
  }
  persistSoon();
}
function removeWrong(id){
  App.wrong = App.wrong.filter(w=>w.id !== id);
  persistSoon();
}
/** 简化版 SM-2 间隔：1次→1天，2次→3天，3次→7天，4次→15天，5次以上→30天 */
function stageDelay(times){
  // 首次答错（times=1）当天即可复习；之后 1/3/7/15/30 天递进
  const table = [0, 0, 1, 3, 7, 15, 30];
  const idx = Math.max(0, Math.min(times, table.length - 1));
  return table[idx] * 86400000;
}
function dueWrongs(){
  const now = Date.now();
  return App.wrong.filter(w=>!w.due || w.due <= now);
}

/* ---------- 答题统计 ---------- */
function recordAnswer(qid, chapter, correct){
  App.stats.byChapter = App.stats.byChapter || {};
  const k = 'ch' + String(chapter).padStart(2,'0');
  const rec = App.stats.byChapter[k] = App.stats.byChapter[k] || { right:0, total:0 };
  rec.total++;
  if(correct) rec.right++;
  App.stats.total = (App.stats.total||0) + 1;
  if(correct) App.stats.right = (App.stats.right||0) + 1;
  persistSoon();
}

/* ---------- 路由 ---------- */
function go(route, param){
  App.route = route;
  if(route === 'chapter' && param) App.currentChapter = param;
  window.scrollTo({top:0, behavior:'instant'});
  render();
  closeMobileNav();
  try{ history.replaceState(null,'', '#' + route + (param?('/'+param):'')); }catch(e){}
}

function openMobileNav(){
  $('.sidebar').classList.add('open');
  $('#backdrop')?.classList.add('show');
}
function closeMobileNav(){
  $('.sidebar').classList.remove('open');
  $('#backdrop')?.classList.remove('show');
}
