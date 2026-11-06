/* ================= 视图：首页 ================= */

function ringSvg(pct, size=56){
  const r = (size-8)/2;
  const c = 2*Math.PI*r;
  const off = c * (1 - pct/100);
  return `<div class="progress-ring" style="width:${size}px;height:${size}px">
    <svg width="${size}" height="${size}">
      <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--rule)" stroke-width="2"/>
      <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--accent)" stroke-width="2"
        stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${off}"
        style="transition:stroke-dashoffset .6s ease"/>
    </svg>
    <div class="pct">${pct}%</div>
  </div>`;
}

function viewHome(){
  const ov = overallProgress();
  const mcqN = (App.mcq||[]).length + (App.midterm||[]).length;
  const tfN = (App.tf||[]).length;
  const shortN = App.short.length;
  const wrongN = App.wrong.length;
  const totalStats = App.stats.total || 0;
  const acc = totalStats ? Math.round((App.stats.right||0)/totalStats*100) : 0;

  let nextCh = null;
  for(const m of CHAPTER_META){
    if(!App.chapters[m.id]) continue;
    const p = chapterProgress(m.id);
    if(p.pct < 100){ nextCh = { meta:m, data:App.chapters[m.id], p }; break; }
  }

  const entries = [
    ['bookOpen','章节学习','从第一章开始，逐节讲透','chapter', nextCh?nextCh.meta.id:'ch01'],
    ['pencil','练习中心','单选 '+mcqN+' · 判断 '+tfN,'practice', null],
    ['calculator','计算专项','决策树 · 盈亏平衡 · 不确定型 · 网络图','calc', null],
    ['target','模拟考场','按 2023 真题结构组卷','exam', null],
    ['memo','简答背诵','关键词挖空 + 自评','short', null],
    ['folder','案例分析','4 篇真题 + 参考答案','cases', null],
    ['ruler','口径对照','几职能几资源，一页查清','canon', null],
    ['repeat','错题本','间隔重复，专治不会的','wrong', null],
  ];

  return `
    <div class="hero">
      <h2>现代企业管理 · 期末考试</h2>
      <p class="lede">以 9 章课件为主干，先学后练。每章讲义分「PPT 要点 / 讲明白 / 怎么考」三层，配套真题、四大计算器与案例分析。</p>
      <div class="stats">
        <div class="stat"><b>${ov.done}<span style="font-size:14px;color:var(--ink-3)">/${ov.total}</span></b><span>已学知识点</span></div>
        <div class="stat"><b>${mcqN+tfN}</b><span>客观题</span></div>
        <div class="stat"><b>${shortN}</b><span>简答名词</span></div>
        <div class="stat"><b>${wrongN}</b><span>待复习错题</span></div>
        ${totalStats?`<div class="stat"><b>${acc}<span style="font-size:14px;color:var(--ink-3)">%</span></b><span>总正确率</span></div>`:''}
      </div>
    </div>

    <div style="display:flex;gap:16px;align-items:center;margin:22px 0 6px">
      ${ringSvg(ov.pct)}
      <div style="flex:1">
        <div style="font-weight:600;font-size:14px;letter-spacing:.3px">整体学习进度</div>
        <div class="muted" style="margin-top:2px">已学 ${ov.done} / 共 ${ov.total} 个知识点</div>
      </div>
    </div>

    ${nextCh ? `
      <div class="card" style="cursor:pointer;border-left:3px solid var(--accent)" onclick="go('chapter','${nextCh.meta.id}')">
        <div style="display:flex;align-items:center;gap:14px">
          <div style="color:var(--accent)">${icon('play',18)}</div>
          <div style="flex:1;min-width:0">
            <div style="font-weight:600;font-size:14px">继续学习 · 第 ${nextCh.meta.num} 章 ${esc(nextCh.data.title)}</div>
            <div class="muted" style="margin-top:3px">已完成 ${nextCh.p.done}/${nextCh.p.total} 个知识点</div>
          </div>
          <div style="color:var(--ink-3)">${icon('arrowRight',16)}</div>
        </div>
      </div>
    ` : `
      <div class="card" style="border-left:3px solid var(--ok)">
        <div style="display:flex;align-items:center;gap:14px">
          <div style="color:var(--ok)">${icon('check',18)}</div>
          <div style="flex:1"><div style="font-weight:600;font-size:14px">全部章节已学完</div>
          <div class="muted" style="margin-top:3px">去练习中心刷题，或直接做一套模拟卷检验成果</div></div>
          <button class="btn primary sm" onclick="go('exam')">模拟考</button>
        </div>
      </div>
    `}

    <div class="grid c4" style="margin-top:18px">
      ${entries.map(([ic,t,d,r,p])=>`
        <div class="entry-card" onclick="go('${r}'${p?`,'${p}'`:''})">
          <div class="ico-lg">${icon(ic,20)}</div>
          <b>${t}</b>
          <span>${d}</span>
        </div>`).join('')}
    </div>

    <div class="section-title" style="margin-top:40px"><span class="num">01</span>考试结构</div>
    <div class="card">
      <div class="prose">
        <table>
          <thead><tr><th>题型</th><th>题量</th><th>分值</th><th>拿分要点</th></tr></thead>
          <tbody>
            <tr><td>选择题</td><td>10</td><td>10</td><td>背概念，抓关键词</td></tr>
            <tr><td>判断题</td><td>10</td><td>10</td><td>注意「反过来说」的陷阱</td></tr>
            <tr><td>简答题</td><td>5（6选5）</td><td>35</td><td>踩点给分，分条写</td></tr>
            <tr><td>计算题</td><td>2</td><td>25</td><td>决策树 12 分 + 网络图 13 分，最好拿</td></tr>
            <tr><td>案例分析</td><td>1</td><td>20</td><td>套 SWOT / 五力 / 激励理论</td></tr>
          </tbody>
        </table>
        <p><strong>策略建议</strong>：计算题 25 分几乎是白送，先练熟；简答 35 分靠背踩分点；选择判断各 10 分随缘。</p>
      </div>
    </div>
  `;
}

/* ================= 视图：章节学习 ================= */

function viewChapter(view){
  const id = App.currentChapter;
  const ch = App.chapters[id];

  if(!ch){
    view.innerHTML = `<div class="empty"><div class="ico">📭</div>
      <p>该章内容尚未生成</p>
      <button class="btn" onclick="go('chapter','ch01')">回到第一章</button></div>`;
    return;
  }

  const prog = chapterProgress(id);

  let html = `
    <div class="chapter-head">
      <div class="kicker">CHAPTER ${String(ch.num).padStart(2,'0')}</div>
      <h2>${esc(ch.title)}</h2>
      <p>${esc(ch.intro||'')}</p>
      <div style="display:flex;gap:10px;align-items:center;margin-top:14px;flex-wrap:wrap">
        ${ringSvg(prog.pct, 46)}
        <span class="muted">已学 ${prog.done}/${prog.total}</span>
        <button class="btn sm" onclick="markAllRead('${id}')">全部标记已学</button>
        ${prog.done>0?`<button class="btn sm ghost" onclick="clearChapter('${id}')">清空本章已学</button>`:''}
        <button class="btn sm" onclick="startChapterPractice('${id}')">练这一章</button>
        <button class="btn sm ghost" onclick="go('canon')" title="凡涉及「几个职能、几类资源」这类数量考点，以口径表为准">${icon("ruler",13)} 查口径</button>
      </div>
    </div>

    <div class="toc">
      <div class="toc-label">本章目录</div>
      <div class="toc-list">
        ${ch.sections.map(sec=>`
          <div class="toc-sec">
            <button class="toc-sec-name" onclick="jumpTo('sec-${id}-${sec.id}')">
              <span class="toc-num">${esc(sec.id)}</span>${esc(sec.title)}
            </button>
            <div class="toc-points">
              ${sec.points.map(pt=>{
                const r = isPointRead(id, pt.id);
                return `<button class="toc-point ${r?'done':''}"
                  onclick="jumpToPt('${id}','${pt.id}')"
                  title="${esc(pt.title)}">
                  ${r?'<span class="toc-tick">✓</span>':''}${esc(pt.title)}
                </button>`;
              }).join('')}
            </div>
          </div>`).join('')}
      </div>
    </div>
  `;

  ch.sections.forEach(sec=>{
    html += `<div class="section-title" id="sec-${id}-${sec.id}">
      <span class="num">${esc(sec.id)}</span>${esc(sec.title)}</div>`;
    sec.points.forEach(pt=>{
      html += renderPoint(id, pt);
    });
  });

  // 课后练习题
  if(Array.isArray(ch.homework) && ch.homework.length){
    html += `<div class="section-title" id="sec-${id}-hw">
      <span class="num">课后</span>课后练习题（课件原文）</div>
      <div class="hw-note">题目逐字取自本章课件课后页；答案要点按课件正文归纳，并标注依据页码。</div>
      <div class="hw-list">`;
    ch.homework.forEach((it, i)=>{
      html += `<div class="hw-card">
        <div class="hw-q"><span class="hw-no">${esc(String(it.no||i+1))}</span>${esc(it.q)}</div>
        ${it.a ? `<div class="hw-a"><b>答案要点</b><div>${esc(it.a)}</div>${it.src?`<div class="hw-src">依据：${esc(it.src)}</div>`:''}</div>` : ''}
      </div>`;
    });
    html += `</div>`;
  }

  // 上一章 / 下一章
  const idx = CHAPTER_META.findIndex(m=>m.id===id);
  const prev = CHAPTER_META[idx-1], next = CHAPTER_META[idx+1];
  html += `<div style="display:flex;justify-content:space-between;gap:12px;margin-top:34px">
    ${prev?`<button class="btn" onclick="go('chapter','${prev.id}')">${icon('arrowLeft',14)} 第${prev.num}章</button>`:'<span></span>'}
    ${next?`<button class="btn primary" onclick="go('chapter','${next.id}')">第${next.num}章 ${icon('arrowRight',14)}</button>`:'<span></span>'}
  </div>`;

  view.innerHTML = html;
}

function jumpTo(domId){
  const el = document.getElementById(domId);
  if(el){
    const y = el.getBoundingClientRect().top + window.scrollY - 74;
    window.scrollTo({top:y, behavior:'smooth'});
  }
}

function jumpToPt(chId, ptId){
  const pid = chId + '-' + ptId;
  const card = document.getElementById('pc-' + pid);
  if(!card) return;
  if(!card.classList.contains('open')){
    card.classList.add('open');
    const first = card.querySelector('.tab');
    if(first) first.classList.add('active');
  }
  const y = card.getBoundingClientRect().top + window.scrollY - 74;
  window.scrollTo({top:y, behavior:'smooth'});
  card.style.transition = 'box-shadow .4s';
  card.style.boxShadow = '0 0 0 2px var(--accent-line)';
  setTimeout(()=>{ card.style.boxShadow = ''; }, 900);
}

function renderViz(blocks){
  if(!blocks || !blocks.length) return '';
  return blocks.map(b=>{
    if(b.type === 'defs' && b.items && b.items.length){
      return `<div class="viz">
        <div class="viz-title">${esc(b.title||'要点对照')}</div>
        <div class="viz-defs">
          ${b.items.map(it=>`<div class="viz-def">
            <div class="k">${esc(it.k)}</div>
            <div class="v">${md(it.v)}</div>
          </div>`).join('')}
        </div>
      </div>`;
    }
    if(b.type === 'flow' && b.steps && b.steps.length){
      return `<div class="viz">
        <div class="viz-title">${esc(b.title||'流程')}</div>
        <div class="viz-flow">
          ${b.steps.map((s,i)=>`
            ${i>0?`<div class="viz-arrow">${icon('chevron',13)}</div>`:''}
            <div class="viz-step"><span class="n">${i+1}</span><span>${esc(s)}</span></div>`).join('')}
        </div>
      </div>`;
    }
    return '';
  }).join('');
}

function renderPoint(chId, pt){
  const read = isPointRead(chId, pt.id);
  const pid = chId + '-' + pt.id;
  // 图示：优先用映射表，其次用数据里的 visual 字段
  const diaKey = (typeof diagramKeyFor === 'function' ? diagramKeyFor(chId, pt.id) : null) || pt.visual || null;
  const diaHtml = diaKey ? renderDiagram(diaKey) : '';
  return `
    <div class="point-card ${read?'read':''}" id="pc-${pid}">
      <div class="point-head" onclick="togglePoint('${pid}')">
        <span class="caret">▶</span>
        <h3>${esc(pt.title)}</h3>
        ${diaKey?`<span class="chip dia-tag" title="本知识点配有图示">图示</span>`:''}
        ${read?'<span class="chip ok">已学</span>':''}
        <span class="chip">${esc(pt.id)}</span>
      </div>
      <div class="point-body">
        <div class="tabs">
          <button class="tab active" onclick="switchTab(event,'${pid}','ppt')">PPT 要点</button>
          <button class="tab" onclick="switchTab(event,'${pid}','plain')">讲明白</button>
          <button class="tab" onclick="switchTab(event,'${pid}','exam')">怎么考</button>
        </div>
        <div class="pane ppt active" data-pane="ppt">
          ${diaHtml}
          <div class="prose">${md(pt.ppt)}</div>
        </div>
        <div class="pane plain" data-pane="plain">
          ${renderViz(pt.viz)}
          <div class="prose">${md(pt.plain)}</div>
        </div>
        <div class="pane exam" data-pane="exam"><div class="prose">${md(pt.exam)}</div></div>

        ${pt.key && pt.key.length ? `<div class="keywords">
          ${pt.key.map(k=>`<span class="chip purple">${esc(k)}</span>`).join('')}
        </div>`:''}

        <div class="q-actions">
          <button class="btn ${read?'':'primary'} sm" onclick="event.stopPropagation();markRead('${chId}','${pt.id}')"
                  title="${read?'点击可改回未学':'点击标记为已学'}">
            ${read?'✓ 已学（点此改回未学）':'标记为已学'}
          </button>
          ${diaKey?`<button class="btn sm" onclick="event.stopPropagation();zoomDiagram('${diaKey}','${esc(pt.title)}')">${icon('chart',13)} 放大看</button>`:''}
        </div>
      </div>
    </div>
  `;
}

/** 放大查看图示 */
function zoomDiagram(key, title){
  const existing = document.getElementById('diaModal');
  if(existing) existing.remove();
  const body = renderDiagram(key);
  if(!body) return;
  const m = document.createElement('div');
  m.id = 'diaModal';
  m.className = 'dia-modal';
  m.innerHTML = `
    <div class="dia-modal-inner">
      <div class="dia-modal-head">
        <b>${esc(title||'图示')}</b>
        <button class="icon-btn" onclick="document.getElementById('diaModal').remove()">${icon('close',16)}</button>
      </div>
      <div class="dia-modal-body">${body}</div>
    </div>`;
  m.addEventListener('click', e=>{ if(e.target === m) m.remove(); });
  document.body.appendChild(m);
}

function togglePoint(pid){
  const el = document.getElementById('pc-' + pid);
  if(el) el.classList.toggle('open');
}
function switchTab(ev, pid, name){
  ev.stopPropagation();
  const card = document.getElementById('pc-' + pid);
  if(!card) return;
  $$('.tab', card).forEach(t=>t.classList.remove('active'));
  ev.currentTarget.classList.add('active');
  $$('.pane', card).forEach(p=>{
    p.classList.toggle('active', p.dataset.pane === name);
  });
}
function markRead(chId, ptId){
  const nowRead = togglePointRead(chId, ptId);
  rerenderChapterKeepPosition();
  toast(nowRead ? '已标记为已学' : '已改回未学');
}
function markAllRead(chId){
  const ch = App.chapters[chId];
  if(!ch) return;
  ch.sections.forEach(s=>s.points.forEach(p=>markPointRead(chId, p.id)));
  rerenderChapterKeepPosition();
  toast('已全部标记');
}
function clearChapter(chId){
  const n = clearChapterRead(chId);
  rerenderChapterKeepPosition();
  toast(n ? `已清除本章 ${n} 个已学标记` : '本章没有已学标记');
}

/**
 * 重绘当前页面但保持阅读位置。
 * 直接调用 render() 会把所有知识点卡片重新折叠，页面高度骤减，
 * 浏览器的滚动位置随之被夹到新的最大值（表现为「点已学后跳到页面下方」）。
 * 这里先记下滚动位置、视口顶部那张卡片、已展开的卡片和当前标签页，重绘后逐一还原。
 */
const CHAPTER_HEAD_OFFSET = 74;   // 滚动定位时给顶栏留出的高度，与 jumpTo 保持一致

function chapterViewSnapshot(){
  const open = new Set($$('.point-card.open').map(el=>el.id));
  const tabIdx = {};
  let anchor = null;

  $$('.point-card').forEach(card=>{
    const i = $$('.tab', card).findIndex(t=>t.classList.contains('active'));
    if(i > 0) tabIdx[card.id] = i;
    // 记录「视口顶部第一张卡片」及其相对顶栏的偏移，作为还原基准
    if(!card.id) return;
    const rect = card.getBoundingClientRect();
    if(rect.bottom > CHAPTER_HEAD_OFFSET && !anchor){
      anchor = { id: card.id, offset: rect.top - CHAPTER_HEAD_OFFSET };
    }
  });

  return { scrollY: window.scrollY, open, tabIdx, anchor };
}

function restoreChapterView(snapshot){
  if(!snapshot) return;

  // 1) 先还原展开状态与标签页——这决定了页面总高度
  snapshot.open.forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.classList.add('open');
  });
  Object.keys(snapshot.tabIdx).forEach(id=>{
    const card = document.getElementById(id);
    if(!card) return;
    const i = snapshot.tabIdx[id];
    const tabs = $$('.tab', card);
    const panes = $$('.pane', card);
    tabs.forEach(t=>t.classList.remove('active'));
    panes.forEach(p=>p.classList.remove('active'));
    if(tabs[i]) tabs[i].classList.add('active');
    const name = ['ppt','plain','exam'][i];
    const pane = panes.find(p=>p.dataset.pane === name);
    if(pane) pane.classList.add('active');
  });

  // 2) 以锚点卡片为准还原位置；锚点不存在时退回原始 scrollY
  const anchor = snapshot.anchor;
  const anchorEl = anchor ? document.getElementById(anchor.id) : null;
  const targetY = anchorEl
    ? anchorEl.getBoundingClientRect().top + window.scrollY - CHAPTER_HEAD_OFFSET - anchor.offset
    : snapshot.scrollY;

  window.scrollTo({ top: Math.max(0, targetY), behavior: 'instant' });
  // 字体/图示撑开高度后再校准一次（若期间已离开章节页则不再干预）
  requestAnimationFrame(()=>{
    if(App.route !== 'chapter') return;
    window.scrollTo({ top: Math.max(0, targetY), behavior: 'instant' });
  });
}

function rerenderChapterKeepPosition(){
  if(App.route !== 'chapter'){ render(); return; }
  const snapshot = chapterViewSnapshot();
  render();
  restoreChapterView(snapshot);
}
function startChapterPractice(chId){
  const num = parseInt(chId.replace('ch',''),10);
  App._practiceFilter = { chapter: num };
  go('practice');
}
