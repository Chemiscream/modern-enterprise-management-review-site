/* ================= 视图：简答背诵 / 错题本 / 统计 ================= */

/* ---------- 简答背诵 ---------- */
const ShortState = { idx:0, revealed:{}, filter:'all', list:[] };

function viewShort(){
  if(!App.short || !App.short.length){
    return `<div class="empty"><div class="ico">${icon("memo",28)}</div>
      <p>简答题库正在生成中</p>
      <div class="muted" style="margin-top:8px">可以先去看讲义或用练习中心刷客观题</div>
      <button class="btn" style="margin-top:14px" onclick="go('practice')">去刷题</button></div>`;
  }
  const types = [...new Set(App.short.map(q=>q.type))];
  let list = App.short;
  if(ShortState.filter !== 'all') list = list.filter(q=>q.type === ShortState.filter);
  ShortState.list = list;
  if(ShortState.idx >= list.length) ShortState.idx = 0;

  const q = list[ShortState.idx];
  const revealed = !!ShortState.revealed[q.id];

  return `
    <div class="filters">
      <button class="btn sm ${ShortState.filter==='all'?'primary':''}" onclick="shortFilter('all')">全部 ${App.short.length}</button>
      ${types.map(t=>`<button class="btn sm ${ShortState.filter===t?'primary':''}" onclick="shortFilter('${esc(t)}')">${esc(t)}</button>`).join('')}
      <button class="btn sm" style="margin-left:auto" onclick="shortShuffle()">${icon("shuffle",14)} 随机抽背</button>
      <span class="muted">${ShortState.idx+1} / ${list.length}</span>
    </div>

    <div class="q-card">
      <div class="q-meta">
        <span class="chip brand">${esc(q.type)}</span>
        <span class="chip">第 ${q.chapter} 章</span>
        <span class="chip">${esc(q.source||'')}</span>
      </div>
      <div class="q-stem">${esc(q.q)}</div>

      ${q.points && q.points.length ? `
        <div style="margin-top:14px">
          <div class="muted" style="font-size:12px;margin-bottom:6px">踩分点（先自己想，再看）</div>
          <div style="display:flex;flex-wrap:wrap;gap:6px">
            ${q.points.map((p,i)=>{
              const hidden = !revealed;
              return `<span class="chip ${hidden?'':'ok'}" style="${hidden?'filter:blur(5px);user-select:none;cursor:pointer':''}"
                onclick="this.style.filter='none';this.classList.add('ok')">${hidden?'???':esc(p)}</span>`;
            }).join('')}
          </div>
        </div>`:''}

      ${revealed ? `
        <div class="explain" style="margin-top:16px">
          <div style="font-weight:700;margin-bottom:8px;color:var(--brand-ink)">参考答案</div>
          <div class="prose">${md(q.answer)}</div>
        </div>`:''}

      <div class="q-actions">
        ${!revealed
          ? `<button class="btn primary sm" onclick="shortReveal('${q.id}')">显示答案</button>`
          : `<button class="btn sm" onclick="shortNext()">下一个 →</button>`}
        <button class="btn sm ghost" onclick="shortPrev()">← 上一个</button>
      </div>
    </div>

    <div class="q-nav">
      ${list.map((x,i)=>`<button class="q-dot ${i===ShortState.idx?'cur':''} ${ShortState.revealed[x.id]?'right':''}"
        onclick="ShortState.idx=${i};render()">${i+1}</button>`).join('')}
    </div>
  `;
}

function shortFilter(t){ ShortState.filter = t; ShortState.idx = 0; render(); }
function shortReveal(id){ ShortState.revealed[id] = true; render(); }
function shortNext(){
  ShortState.idx = (ShortState.idx + 1) % Math.max(1, ShortState.list.length);
  render();
}
function shortPrev(){
  ShortState.idx = (ShortState.idx - 1 + ShortState.list.length) % Math.max(1, ShortState.list.length);
  render();
}
function shortShuffle(){
  ShortState.list = [...ShortState.list];
  for(let i=ShortState.list.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [ShortState.list[i], ShortState.list[j]] = [ShortState.list[j], ShortState.list[i]];
  }
  ShortState.idx = 0;
  render();
  toast('已随机打乱');
}

/* ---------- 错题本 ---------- */
function viewWrong(){
  if(!App.wrong.length){
    return `<div class="empty"><div class="ico">✨</div>
      <p>错题本是空的</p>
      <div class="muted" style="margin-top:8px">去练习中心刷题，答错的会自动收进来</div>
      <button class="btn" style="margin-top:14px" onclick="go('practice')">去刷题</button></div>`;
  }

  const due = dueWrongs();
  const now = Date.now();

  return `
    <div class="score-bar">
      <div class="item">错题总数 <b>${App.wrong.length}</b></div>
      <div class="item">今日待复习 <b style="color:var(--brand)">${due.length}</b></div>
      <div style="margin-left:auto;display:flex;gap:8px">
        <button class="btn sm primary" onclick="reviewWrong()" ${!due.length?'disabled':''}>开始复习（${due.length}）</button>
        <button class="btn sm ghost" onclick="clearWrong()">清空</button>
      </div>
    </div>

    ${App.wrong.map(w=>{
      const days = Math.ceil(((w.due||0) - now)/86400000);
      const ready = !w.due || w.due <= now;
      return `
        <div class="q-card" style="margin-bottom:12px">
          <div class="q-meta">
            <span class="chip brand">第 ${w.chapter} 章</span>
            <span class="chip">${w.type==='judge'?'判断题':'单选题'}</span>
            <span class="chip bad">错 ${w.times||1} 次</span>
            ${ready
              ? `<span class="chip ok">现在可复习</span>`
              : `<span class="chip">${days} 天后复习</span>`}
            <button class="btn sm ghost" style="margin-left:auto" onclick="removeWrong('${w.id}');render()">移除</button>
          </div>
          <div class="q-stem">${esc(w.stem)}</div>
          ${(w.options||[]).map(o=>`
            <div class="opt disabled ${o.key===w.answer?'correct':''}">
              <span class="badge">${o.key}</span><span>${esc(o.text)}</span>
            </div>`).join('')}
          ${w.explain?`<div class="explain">${esc(w.explain)}</div>`:''}
        </div>`;
    }).join('')}
  `;
}

function reviewWrong(){
  const due = dueWrongs();
  if(!due.length) return;
  // 用错题列表构造练习
  PracticeState.list = due.map(w=>({
    id: w.id, type: w.type, stem: w.stem, options: w.options,
    answer: w.answer, explain: w.explain, chapter: w.chapter,
    source: '错题复习', answerSource: 'ai',
  }));
  PracticeState.idx = 0;
  PracticeState.answers = {};
  PracticeState.revealed = {};
  go('practice');
}
function clearWrong(){
  if(confirm('确定清空全部错题？此操作不可恢复。')){
    App.wrong = [];
    saveState();
    render();
    toast('已清空');
  }
}

/* ---------- 学习统计 ---------- */
function viewStats(){
  const ov = overallProgress();
  const byCh = App.stats.byChapter || {};
  const total = App.stats.total || 0;
  const right = App.stats.right || 0;
  const acc = total ? Math.round(right/total*100) : 0;

  // 章节掌握度
  const chRows = CHAPTER_META.map(m=>{
    const k = 'ch' + String(m.num).padStart(2,'0');
    const rec = byCh[k] || { right:0, total:0 };
    const ch = App.chapters[m.id];
    const learned = chapterProgress(m.id);
    return {
      num: m.num,
      title: ch ? ch.title : '未加载',
      acc: rec.total ? Math.round(rec.right/rec.total*100) : null,
      answered: rec.total,
      learned: learned.pct,
    };
  });

  // 薄弱章节排序
  const weak = chRows.filter(r=>r.acc !== null && r.answered >= 3)
    .sort((a,b)=>a.acc-b.acc).slice(0,5);

  return `
    <div class="grid c3">
      <div class="card" style="text-align:center">
        <div style="font-size:26px;font-weight:800;color:var(--brand)">${ov.pct}%</div>
        <div class="muted" style="margin-top:4px">章节学习进度</div>
      </div>
      <div class="card" style="text-align:center">
        <div style="font-size:26px;font-weight:800;color:${acc>=70?'var(--ok)':acc>=50?'var(--warn)':'var(--bad)'}">${acc}%</div>
        <div class="muted" style="margin-top:4px">答题正确率（${right}/${total}）</div>
      </div>
      <div class="card" style="text-align:center">
        <div style="font-size:26px;font-weight:800;color:var(--bad)">${App.wrong.length}</div>
        <div class="muted" style="margin-top:4px">错题待复习</div>
      </div>
    </div>

    <div class="section-title" style="margin-top:26px"><span class="num">1</span>各章掌握度</div>
    <div class="card">
      ${chRows.map(r=>`
        <div class="bar-row">
          <span class="name" title="${esc(r.title)}">${r.num}. ${esc(r.title)}</span>
          <div class="bar-track">
            <div class="bar-fill" style="width:${r.acc===null?0:r.acc}%;background:${r.acc===null?'var(--line)':r.acc>=70?'var(--ok)':r.acc>=50?'var(--warn)':'var(--bad)'}"></div>
          </div>
          <span class="val">${r.acc===null?`<span class="muted">未做</span>`:r.acc+'%'}</span>
        </div>`).join('')}
      <div class="muted" style="margin-top:12px;font-size:12px">进度条表示该章答题正确率；「未做」表示还没练过。</div>
    </div>

    ${weak.length ? `
      <div class="section-title" style="margin-top:26px"><span class="num">2</span>薄弱环节（优先补）</div>
      <div class="card">
        <div class="prose">
          <table>
            <thead><tr><th>章节</th><th>正确率</th><th>已做</th><th>操作</th></tr></thead>
            <tbody>
              ${weak.map(r=>`<tr>
                <td>${r.num}. ${esc(r.title)}</td>
                <td style="color:${r.acc>=70?'var(--ok)':r.acc>=50?'var(--warn)':'var(--bad)'};font-weight:700">${r.acc}%</td>
                <td>${r.answered} 题</td>
                <td><button class="btn sm" onclick="go('chapter','ch${String(r.num).padStart(2,'0')}')">去复习</button></td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `:''}

    <div class="section-title" style="margin-top:26px"><span class="num">3</span>进度同步与数据管理</div>
    <div class="card">
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:10px">
        <span class="chip ${Sync.online?'ok':'bad'}">${Sync.online?'已连接服务器':'离线（仅本地保存）'}</span>
        <span class="chip">档案 ${esc(deviceLabel())}</span>
        <span class="chip brand" style="font-family:var(--mono);font-size:10px">${esc(getDeviceId())}</span>
      </div>
      <div class="muted" style="line-height:1.9">
        进度会保存在<b>运行本网站的这台电脑</b>上（服务器目录 <code>_progress/</code>），
        每台设备各有一份独立档案。所以换个浏览器或换台手机打开，看到的是它自己那份进度，互不干扰。<br>
        想让手机沿用电脑的进度：在手机打开网站后，点下面的「切换档案」，选电脑那一份即可。
      </div>
      <div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap">
        <button class="btn sm" onclick="showProfiles()">切换档案</button>
        <button class="btn sm" onclick="exportData()">导出学习数据</button>
        <button class="btn sm ghost" onclick="resetAll()">清空本档记录</button>
      </div>
      <div id="profileList" style="margin-top:14px"></div>
    </div>
  `;
}

async function showProfiles(){
  const box = $('#profileList');
  if(!box) return;
  box.innerHTML = '<div class="muted">正在读取服务器档案…</div>';
  const list = await listProfiles();
  if(!list.length){
    box.innerHTML = '<div class="muted">服务器上还没有任何档案（服务器未连接，或还没开始学习）。</div>';
    return;
  }
  const me = getDeviceId();
  box.innerHTML = `
    <div style="font-size:13px;font-weight:700;margin-bottom:8px">服务器上的档案（${list.length}）</div>
    ${list.map(p=>{
      const isMe = p.id === me;
      const t = new Date(p.updatedAt || Date.now());
      const ts = `${t.getMonth()+1}-${t.getDate()} ${String(t.getHours()).padStart(2,'0')}:${String(t.getMinutes()).padStart(2,'0')}`;
      return `
        <div style="display:flex;gap:10px;align-items:center;padding:9px 12px;border:1px solid var(--line);border-radius:10px;margin-bottom:7px;${isMe?'border-color:var(--brand);background:var(--brand-soft)':''}">
          <div style="flex:1;min-width:0">
            <div style="font-weight:600;font-size:13px">${esc(p.name||p.id)} ${isMe?'<span class="chip brand" style="font-size:10px">当前</span>':''}</div>
            <div class="muted" style="font-size:11.5px;margin-top:2px">
              ${esc(ts)} · 已学 ${p.learned||0} · 错题 ${p.wrong||0} · 答题 ${p.answered||0}
            </div>
          </div>
          ${isMe?'':`<button class="btn sm" onclick="doAdopt('${esc(p.id)}')">接管</button>`}
        </div>`;
    }).join('')}
    <div class="muted" style="margin-top:6px;font-size:11.5px">
      「接管」= 本浏览器改用那份档案继续记录（原档案会被覆盖式更新）。
    </div>
  `;
}

async function doAdopt(id){
  if(!confirm('切换后本浏览器将使用该档案的进度，确定吗？')){
    return;
  }
  const ok = await adoptProfile(id);
  if(ok){ toast('已切换档案'); render(); }
}

function exportData(){
  const data = {
    exportedAt: new Date().toISOString(),
    deviceId: getDeviceId(),
    progress: App.progress,
    wrong: App.wrong,
    stats: App.stats,
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = '现代企业管理-学习数据.json';
  a.click();
  URL.revokeObjectURL(a.href);
  toast('已导出');
}

function resetAll(){
  if(!confirm('确定清空全部学习记录？包括进度、错题、统计。')) return;
  App.progress = {};
  App.wrong = [];
  App.stats = {};
  saveState();
  render();
  toast('已清空');
}
