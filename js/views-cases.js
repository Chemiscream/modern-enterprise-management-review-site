/* ================= 视图：案例分析 ================= */

const CaseState = { idx: 0, revealed: {} };

function viewCases(){
  const cases = App.cases || [];
  if(!cases.length){
    return `<div class="empty"><div class="ico">${icon("folder",28)}</div>
      <p>案例库为空</p>
      <button class="btn" style="margin-top:14px" onclick="go('home')">返回</button></div>`;
  }
  if(CaseState.idx >= cases.length) CaseState.idx = 0;
  const c = cases[CaseState.idx];

  return `
    <div class="filters">
      ${cases.map((x,i)=>`
        <button class="btn sm ${i===CaseState.idx?'primary':''}" onclick="caseSelect(${i})">
          ${esc(x.source)} · 第${x.chapter}章
        </button>`).join('')}
      <span class="muted" style="margin-left:auto">${CaseState.idx+1} / ${cases.length}</span>
    </div>

    <div class="card">
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px">
        <span class="chip brand">第 ${c.chapter} 章</span>
        <span class="chip">${esc(c.source)}</span>
        <span class="chip warn">案例分析 20 分</span>
      </div>
      <h3 style="margin:0 0 14px;font-size:17px">${esc(c.title)}</h3>

      <div style="font-size:12px;color:var(--text-3);font-weight:600;letter-spacing:.5px;margin-bottom:6px">案例材料</div>
      <div class="prose" style="background:var(--bg-soft);border-radius:var(--radius-sm);padding:16px 18px;font-size:13.6px;line-height:1.9">
        ${md(c.material)}
      </div>
    </div>

    ${c.questions.map((qa,i)=>{
      const key = c.id + '-' + i;
      const shown = !!CaseState.revealed[key];
      return `
        <div class="card" style="margin-top:14px">
          <div class="q-stem" style="font-size:14.5px">
            <span class="idx">Q${i+1}</span>${esc(qa.q)}
          </div>
          ${shown
            ? `<div class="explain" style="border-left-color:var(--ok)">
                 <div style="font-weight:700;color:var(--ok);margin-bottom:8px">参考答案</div>
                 <div class="prose">${md(qa.answer)}</div>
               </div>
               <div class="q-actions">
                 <button class="btn sm ghost" onclick="caseHide('${key}')">收起答案</button>
               </div>`
            : `<div class="q-actions">
                 <button class="btn primary sm" onclick="caseReveal('${key}')">先自己想想，再看答案</button>
               </div>`}
        </div>`;
    }).join('')}

    ${c.analysis ? `
      <div class="card" style="margin-top:14px;border-color:var(--purple);background:rgba(124,92,214,.07)">
        <div style="font-weight:700;color:var(--purple);margin-bottom:8px">${icon("bulb",15)} 解题思路</div>
        <div class="prose">${md(c.analysis)}</div>
      </div>`:''}

    <div style="display:flex;justify-content:space-between;gap:12px;margin-top:22px">
      <button class="btn" onclick="caseSelect(${(CaseState.idx-1+cases.length)%cases.length})">← 上一篇</button>
      <button class="btn primary" onclick="caseSelect(${(CaseState.idx+1)%cases.length})">下一篇 →</button>
    </div>
  `;
}

function caseSelect(i){
  CaseState.idx = i;
  CaseState.revealed = {};
  window.scrollTo({top:0});
  render();
}
function caseReveal(key){ CaseState.revealed[key] = true; render(); }
function caseHide(key){ delete CaseState.revealed[key]; render(); }
