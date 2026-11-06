/* ================= 启动与导航 ================= */

const ROUTE_TITLES = {
  home: ['总览', '从这里开始'],
  chapter: ['章节学习', '先学后练'],
  practice: ['练习中心', '刷题与错题'],
  calc: ['计算专项', '四大题型'],
  exam: ['模拟考场', '按真题结构组卷'],
  wrong: ['错题本', '间隔重复复习'],
  short: ['简答背诵', '关键词挖空'],
  cases: ['案例分析', '真题材料 + 参考答案'],
  canon: ['口径对照表', '数字型考点唯一口径'],
  stats: ['学习统计', '看进步'],
};

async function boot(){
  // 1) 先用本地缓存渲染（保证首屏快、断网也能用）
  const local = loadLocalState();
  // 单一浅色主题（深色模式已移除）

  // 2) 同时尝试从服务器拉取本设备的进度档案
  const remote = await pullFromServer();
  if(remote){
    // 服务器档案比本地新则采用（updatedAt 比较）
    const localTs = local?.updatedAt || 0;
    const remoteTs = remote.updatedAt || 0;
    if(remoteTs >= localTs){
      applyState(remote);
    } else {
      // 本地更新，反向推送
      pushToServer();
    }
  }

  // 加载数据
  const results = await Promise.allSettled([
    ...CHAPTER_META.map(m => fetch('data/chapters/' + m.file).then(r=>{
      if(!r.ok) throw new Error(m.file);
      return r.json();
    }).then(d=>['chapter', m.id, d])),
    fetch('data/questions_mcq.json').then(r=>r.json()).then(d=>['mcq', null, d]),
    fetch('data/questions_midterm.json').then(r=>r.ok?r.json():[]).then(d=>['midterm', null, d]).catch(()=>['midterm',null,[]]),
    fetch('data/questions_tf.json').then(r=>r.json()).then(d=>['tf', null, d]),
    fetch('data/short.json').then(r=>r.ok?r.json():[]).then(d=>['short', null, d]).catch(()=>['short',null,[]]),
    fetch('data/calc.json').then(r=>r.ok?r.json():[]).then(d=>['calc', null, d]).catch(()=>['calc',null,[]]),
    fetch('data/cases.json').then(r=>r.ok?r.json():[]).then(d=>['cases', null, d]).catch(()=>['cases',null,[]]),
    fetch('data/exams.json').then(r=>r.ok?r.json():[]).then(d=>['exams', null, d]).catch(()=>['exams',null,[]]),
    fetch('data/canon.json').then(r=>r.ok?r.json():null).then(d=>['canon', null, d]).catch(()=>['canon',null,null]),
  ]);

  const missing = [];
  results.forEach(res=>{
    if(res.status === 'rejected'){ missing.push(String(res.reason)); return; }
    const [kind, id, data] = res.value;
    if(kind === 'chapter'){ if(data && data.id) App.chapters[id] = data; else missing.push(id); }
    else if(kind === 'mcq') App.mcq = Array.isArray(data) ? data : [];
    else if(kind === 'midterm') App.midterm = Array.isArray(data) ? data : [];
    else if(kind === 'tf') App.tf = Array.isArray(data) ? data : [];
    else if(kind === 'short') App.short = Array.isArray(data) ? data : [];
    else if(kind === 'calc') App.calc = Array.isArray(data) ? data : [];
    else if(kind === 'cases') App.cases = Array.isArray(data) ? data : [];
    else if(kind === 'exams') App.exams = (data && data.exams) || (Array.isArray(data)?data:[]);
    else if(kind === 'canon') App.canon = data || null;
  });

  if(missing.length) console.warn('未加载：', missing);

  // 恢复路由
  const hash = location.hash.replace(/^#/,'');
  if(hash){
    const [r, p] = hash.split('/');
    if(ROUTE_TITLES[r]){ App.route = r; if(p) App.currentChapter = p; }
  }

  buildShell();
  render();
}

function buildShell(){
  document.body.innerHTML = `
    <div class="backdrop" id="backdrop" onclick="closeMobileNav()"></div>
    <div class="app">
      <aside class="sidebar" id="sidebar"></aside>
      <main class="main">
        <header class="topbar">
          <button class="icon-btn menu-btn" onclick="openMobileNav()" aria-label="菜单">${icon('menu',18)}</button>
          <h1 id="pageTitle"></h1>
          
        </header>
        <div class="content" id="view"></div>
      </main>
    </div>
    <div class="toast" id="toast"></div>
  `;
  renderSidebar();
}

function renderSidebar(){
  const overall = overallProgress();
  const navItems = [
    ['home', 'home', '总览'],
    ['chapter', 'bookOpen', '章节学习'],
    ['practice', 'pencil', '练习中心'],
    ['calc', 'calculator', '计算专项'],
    ['exam', 'target', '模拟考场'],
    ['short', 'memo', '简答背诵'],
    ['cases', 'folder', '案例分析'],
    ['canon', 'ruler', '口径对照'],
    ['wrong', 'repeat', '错题本'],
    ['stats', 'chart', '学习统计'],
  ];

  const sidebar = $('#sidebar');
  if(!sidebar) return;

  sidebar.innerHTML = `
    <div class="brand">
      <div class="brand-mark">现代企业管理<span class="seal">复习</span></div>
    </div>

    <div class="nav">
      ${navItems.slice(0,5).map(([r,ic,txt])=>`
        <button class="nav-item ${App.route===r?'active':''}" onclick="go('${r}')">
          <span class="ico">${icon(ic)}</span><span>${txt}</span>
        </button>`).join('')}
    </div>

    <div class="nav-group-label">章节目录 · ${overall.done}/${overall.total}</div>
    <div class="chapter-list">
      ${CHAPTER_META.map(m=>{
        const ch = App.chapters[m.id];
        const p = chapterProgress(m.id);
        const active = App.route==='chapter' && App.currentChapter===m.id;
        if(!ch) return `<button class="chapter-link" style="opacity:.4;cursor:default">
            <span class="dot"></span><span class="ch-num">${m.num}</span>
            <span class="ch-name">加载中…</span></button>`;
        return `<button class="chapter-link ${active?'active':''} ${p.pct===100?'done':''}"
                 onclick="go('chapter','${m.id}')">
          <span class="dot"></span>
          <span class="ch-num">${String(m.num).padStart(2,'0')}</span>
          <span class="ch-name">${esc(ch.title)}</span>
        </button>`;
      }).join('')}
    </div>

    <div class="nav-group-label">更多</div>
    <div class="nav">
      ${navItems.slice(5).map(([r,ic,txt])=>{
        const badge = r==='wrong' && App.wrong.length
          ? `<span class="cnt">${App.wrong.length}</span>` : '';
        return `<button class="nav-item ${App.route===r?'active':''}" onclick="go('${r}')">
          <span class="ico">${icon(ic)}</span><span>${txt}</span>${badge}
        </button>`;
      }).join('')}
    </div>
  `;
}

function render(){
  renderSidebar();
  const view = $('#view');
  if(!view) return;

  const [title, sub] = ROUTE_TITLES[App.route] || ['', ''];
  const pt = $('#pageTitle');
  if(pt) pt.innerHTML = esc(title) + (sub ? `<span class="sub">${esc(sub)}</span>` : '');

  switch(App.route){
    case 'home':     view.innerHTML = viewHome(); break;
    case 'chapter':  viewChapter(view); break;
    case 'practice': viewPractice(view); break;
    case 'calc':     viewCalc(view); break;
    case 'exam':     viewExam(view); break;
    case 'short':    view.innerHTML = viewShort(); break;
    case 'cases':    view.innerHTML = viewCases(); break;
    case 'canon':    view.innerHTML = viewCanon(); break;
    case 'wrong':    view.innerHTML = viewWrong(); break;
    case 'stats':    view.innerHTML = viewStats(); break;
    default:         view.innerHTML = viewHome();
  }
}
