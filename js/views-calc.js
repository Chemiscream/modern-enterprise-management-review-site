/* ================= 视图：计算专项 ================= */

const CalcState = { kind: 'decision-tree', input: {} };

function viewCalc(view){
  view.innerHTML = `
    <div class="filters">
      ${[
        ['decision-tree','决策树法','风险型 · 12分'],
        ['breakeven','盈亏平衡','确定型 · 保本点'],
        ['uncertainty','不确定型','五种准则'],
        ['network','网络计划','关键路径 · 13分'],
      ].map(([k,t,d])=>`
        <button class="btn sm ${CalcState.kind===k?'primary':''}" onclick="switchCalc('${k}')">
          ${t} <span class="muted" style="margin-left:4px;font-size:11px">${d}</span>
        </button>`).join('')}
    </div>
    <div id="calcArea"></div>
  `;
  renderCalc();
}

function switchCalc(kind){
  CalcState.kind = kind;
  CalcState.input = {};
  viewCalc($('#view'));
}

function renderCalc(){
  const area = $('#calcArea');
  if(!area) return;
  switch(CalcState.kind){
    case 'decision-tree': area.innerHTML = calcDecisionTree(); break;
    case 'breakeven':     area.innerHTML = calcBreakeven(); break;
    case 'uncertainty':   area.innerHTML = calcUncertainty(); break;
    case 'network':       area.innerHTML = calcNetwork(); break;
  }
}

/* ---------------- 1. 决策树 ---------------- */
function calcDecisionTree(){
  const s = CalcState.input;
  const years = s.years ?? 7;
  const pGood = s.pGood ?? 0.7;
  const opts = s.opts ?? [
    { name:'新建大厂', invest:5, good:1.7, bad:-0.3 },
    { name:'技改生产线', invest:1.5, good:0.5, bad:0.3 },
  ];
  CalcState.input = { years, pGood, opts };

  const rows = opts.map((o,i)=>`
    <div class="card" style="padding:12px 14px;margin-bottom:8px">
      <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px">
        <input type="text" value="${esc(o.name)}" oninput="dtSet(${i},'name',this.value)"
          style="flex:1;padding:6px 9px;border-radius:7px;border:1px solid var(--line);background:var(--bg-elev);color:var(--text);font-size:13px">
        <button class="btn sm ghost" onclick="dtDel(${i})" ${opts.length<=2?'disabled':''}>✕</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px">
        <div class="field" style="margin:0"><label>投资(亿)</label>
          <input type="number" step="0.1" value="${o.invest}" oninput="dtSet(${i},'invest',+this.value)"></div>
        <div class="field" style="margin:0"><label>销路好/年</label>
          <input type="number" step="0.1" value="${o.good}" oninput="dtSet(${i},'good',+this.value)"></div>
        <div class="field" style="margin:0"><label>销路差/年</label>
          <input type="number" step="0.1" value="${o.bad}" oninput="dtSet(${i},'bad',+this.value)"></div>
      </div>
    </div>`).join('');

  const pBad = 1 - pGood;
  const results = opts.map(o=>{
    const exp = (pGood*o.good + pBad*o.bad) * years - o.invest;
    return { ...o, exp };
  });
  const best = results.reduce((a,b)=> b.exp > a.exp ? b : a, results[0]);
  const bestIdx = results.indexOf(best);

  // SVG 决策树
  const W = 620, rowH = 92, H = Math.max(180, results.length*rowH + 60);
  const cx = 70, sx = 230, rx = 430, ex = 580;
  let svg = `<svg class="diagram" viewBox="0 0 ${W} ${H}">`;
  svg += `<rect x="${cx-22}" y="${H/2-22}" width="44" height="44" rx="6" class="box-fill"/>`;
  svg += `<text x="${cx}" y="${H/2+4}" text-anchor="middle" class="lbl-b">□</text>`;
  results.forEach((r,i)=>{
    const y = 46 + i*rowH;
    const isBest = i === bestIdx;
    const cls = isBest ? 'line-key' : 'line';
    svg += `<line x1="${cx+22}" y1="${H/2}" x2="${sx-28}" y2="${y}" class="${cls}"/>`;
    svg += `<text x="${(cx+sx)/2}" y="${(H/2+y)/2 - 6}" text-anchor="middle" class="lbl">${esc(r.name)}</text>`;
    svg += `<circle cx="${sx}" cy="${y}" r="16" class="box-fill"/>`;
    svg += `<text x="${sx}" y="${y+4}" text-anchor="middle" class="lbl">○</text>`;
    // 两条概率枝
    const y1 = y - 26, y2 = y + 26;
    svg += `<line x1="${sx+16}" y1="${y}" x2="${rx}" y2="${y1}" class="line"/>`;
    svg += `<line x1="${sx+16}" y1="${y}" x2="${rx}" y2="${y2}" class="line"/>`;
    svg += `<text x="${(sx+rx)/2}" y="${(y+y1)/2-4}" text-anchor="middle" class="lbl">好 ${pGood}</text>`;
    svg += `<text x="${(sx+rx)/2}" y="${(y+y2)/2+12}" text-anchor="middle" class="lbl">差 ${pBad.toFixed(2)}</text>`;
    svg += `<text x="${rx+6}" y="${y1+4}" class="lbl">△ ${r.good}</text>`;
    svg += `<text x="${rx+6}" y="${y2+4}" class="lbl">△ ${r.bad}</text>`;
    svg += `<text x="${ex}" y="${y+4}" text-anchor="end" class="lbl-b" style="fill:${isBest?'var(--ok)':'var(--text-2)'}">${r.exp.toFixed(2)}</text>`;
    if(!isBest){
      svg += `<line x1="${sx+8}" y1="${y-34}" x2="${sx+8}" y2="${y+34}" stroke="var(--bad)" stroke-width="2"/>`;
      svg += `<line x1="${sx+22}" y1="${y-34}" x2="${sx+22}" y2="${y+34}" stroke="var(--bad)" stroke-width="2"/>`;
    }
  });
  svg += `</svg>`;

  const steps = results.map(r=>{
    const gain = (pGood*r.good + pBad*r.bad);
    const nb = v => { const x = Number(v.toFixed(4)); return String(x); };
    return `${esc(r.name)}：\n  E = (${pGood}×${r.good} + ${nb(pBad)}×(${r.bad})) × ${years} − ${r.invest}\n    = (${nb(pGood*r.good)} + ${nb(pBad*r.bad)}) × ${years} − ${r.invest}\n    = ${nb(gain)} × ${years} − ${r.invest}\n    = ${nb(r.exp)} 亿元`;
  }).join('\n\n');

  return `
    <div class="calc-grid">
      <div>
        <div class="card">
          <div style="font-weight:700;margin-bottom:12px">参数设置</div>
          <div class="field"><label>经营年限（年）</label>
            <input type="number" value="${years}" oninput="dtGlobal('years',+this.value)"></div>
          <div class="field"><label>销路好概率（0~1）</label>
            <input type="number" step="0.05" min="0" max="1" value="${pGood}" oninput="dtGlobal('pGood',+this.value)"></div>
          <div class="muted" style="margin-bottom:12px">销路差概率自动为 ${pBad.toFixed(2)}</div>
          <div style="font-weight:700;margin:16px 0 8px">备选方案</div>
          ${rows}
          <button class="btn sm" onclick="dtAdd()" style="width:100%">+ 增加方案</button>
          <button class="btn sm ghost" onclick="dtPreset('2018')" style="width:100%;margin-top:8px">载入 2018 真题数据</button>
        </div>
      </div>
      <div>
        <div class="card" style="margin-bottom:14px">
          <div style="font-weight:700;margin-bottom:10px">决策树</div>
          ${svg}
        </div>
        <div class="card" style="margin-bottom:14px">
          <div style="font-weight:700;margin-bottom:10px">计算过程</div>
          <div class="result-box">${steps}</div>
        </div>
        <div class="card" style="border-color:var(--ok);background:var(--ok-soft)">
          <div style="font-weight:800;font-size:15px;color:var(--ok)">结论：选择「${esc(best.name)}」</div>
          <div class="muted" style="margin-top:6px">期望收益 ${best.exp.toFixed(2)} 亿元，为各方案中最大。</div>
        </div>
      </div>
    </div>
  `;
}
function dtGlobal(k,v){ CalcState.input[k] = v; renderCalc(); }
function dtSet(i,k,v){ CalcState.input.opts[i][k] = v; renderCalc(); }
function dtAdd(){ CalcState.input.opts.push({name:'新方案', invest:1, good:1, bad:0}); renderCalc(); }
function dtDel(i){ CalcState.input.opts.splice(i,1); renderCalc(); }
function dtPreset(k){
  if(k==='2018'){
    CalcState.input = {
      years: 7, pGood: 0.7,
      opts: [
        { name:'新建大厂', invest:5, good:1.7, bad:-0.3 },
        { name:'技改生产线', invest:1.5, good:0.5, bad:0.3 },
      ]
    };
  }
  renderCalc();
}

/* ---------------- 2. 盈亏平衡 ---------------- */
function calcBreakeven(){
  const s = CalcState.input;
  const F = s.F ?? 100000;
  const P = s.P ?? 100;
  const V = s.V ?? 60;
  const Q = s.Q ?? 3000;
  CalcState.input = { F, P, V, Q };

  const cm = P - V;
  const qStar = cm > 0 ? F / cm : Infinity;
  const qStarSafe = cm > 0 ? Math.max(0, qStar) : 0;
  const revenue = P * Q;
  const totalCost = F + V * Q;
  const profit = revenue - totalCost;
  const safeMargin = Q - qStarSafe;
  const safeRate = Q > 0 ? (safeMargin / Q) * 100 : 0;
  const safeLabel = safeRate > 30 ? ['安全', 'var(--ok)'] : safeRate > 10 ? ['尚可', 'var(--warn)'] : ['危险', 'var(--bad)'];

  // SVG 盈亏平衡图
  const maxQ = Math.max(Q, qStarSafe * 1.8, 100);
  const maxY = Math.max(P*maxQ, F + V*maxQ) * 1.05;
  const W = 600, H = 340, M = { l:60, r:20, t:20, b:40 };
  const iw = W - M.l - M.r, ih = H - M.t - M.b;
  const X = q => M.l + (q/maxQ)*iw;
  const Y = v => M.t + ih - (v/maxY)*ih;

  let svg = `<svg class="diagram" viewBox="0 0 ${W} ${H}">`;
  // 坐标轴
  svg += `<line x1="${M.l}" y1="${M.t+ih}" x2="${M.l+iw}" y2="${M.t+ih}" class="line"/>`;
  svg += `<line x1="${M.l}" y1="${M.t}" x2="${M.l}" y2="${M.t+ih}" class="line"/>`;
  // 收入线
  svg += `<line x1="${X(0)}" y1="${Y(0)}" x2="${X(maxQ)}" y2="${Y(P*maxQ)}" stroke="var(--brand)" stroke-width="2.4"/>`;
  // 总成本线
  svg += `<line x1="${X(0)}" y1="${Y(F)}" x2="${X(maxQ)}" y2="${Y(F+V*maxQ)}" stroke="var(--warn)" stroke-width="2.4"/>`;
  // 保本点
  if(isFinite(qStar) && qStar <= maxQ){
    svg += `<line x1="${X(qStar)}" y1="${Y(0)}" x2="${X(qStar)}" y2="${Y(P*qStar)}" stroke="var(--bad)" stroke-dasharray="4 4" class="line"/>`;
    svg += `<circle cx="${X(qStar)}" cy="${Y(P*qStar)}" r="5" fill="var(--bad)"/>`;
    svg += `<text x="${X(qStar)+8}" y="${Y(P*qStar)-8}" class="lbl-b" style="fill:var(--bad)">保本点 Q*=${Math.round(qStar)}</text>`;
  }
  // 当前销量
  if(Q <= maxQ){
    svg += `<line x1="${X(Q)}" y1="${M.t+ih}" x2="${X(Q)}" y2="${Y(P*Q)}" stroke="var(--ok)" stroke-dasharray="3 3" class="line"/>`;
    svg += `<circle cx="${X(Q)}" cy="${Y(P*Q)}" r="4" fill="var(--ok)"/>`;
    svg += `<text x="${X(Q)+7}" y="${Y(P*Q)-8}" class="lbl" style="fill:var(--ok)">当前 ${Q}</text>`;
  }
  svg += `<text x="${M.l+iw/2}" y="${H-8}" text-anchor="middle" class="lbl">销售量 Q</text>`;
  svg += `<text x="14" y="${M.t+ih/2}" text-anchor="middle" class="lbl" transform="rotate(-90 14 ${M.t+ih/2})">金额</text>`;
  svg += `<text x="${X(maxQ)}" y="${Y(P*maxQ)-8}" text-anchor="end" class="lbl" style="fill:var(--brand)">收入线</text>`;
  svg += `<text x="${X(maxQ)}" y="${Y(F+V*maxQ)-8}" text-anchor="end" class="lbl" style="fill:var(--warn)">总成本线</text>`;
  svg += `</svg>`;

  const steps = `已知：固定成本 F = ${fmt(F)}，单价 P = ${fmt(P)}，单位变动成本 V = ${fmt(V)}，当前销量 Q = ${fmt(Q)}

① 边际贡献 = P − V = ${P} − ${V} = <span class="hl">${fmt(cm)}</span>

② 盈亏平衡点（保本销量）
   Q* = F ÷ (P − V)
      = ${fmt(F)} ÷ ${fmt(cm)}
      = <span class="hl">${isFinite(qStar)?fmt(qStar):'无法保本'}</span> ${isFinite(qStar)?'件':''}

③ 保本销售额 = Q* × P = ${isFinite(qStar)?fmt(qStarSafe*P):'—'}

④ 当前经营状况
   销售收入 = P × Q = ${fmt(revenue)}
   总成本   = F + V × Q = ${fmt(totalCost)}
   利润     = ${fmt(revenue)} − ${fmt(totalCost)} = <span class="${profit>=0?'good':'bad'}">${fmt(profit)}</span>

⑤ 经营安全率 = (Q − Q*) ÷ Q × 100%
             = (${fmt(Q)} − ${fmt(qStarSafe)}) ÷ ${fmt(Q)} × 100%
             = <span class="${safeRate>30?'good':safeRate>10?'':'bad'}">${safeRate.toFixed(1)}%</span> → ${safeLabel[0]}`;

  return `
    <div class="calc-grid">
      <div>
        <div class="card">
          <div style="font-weight:700;margin-bottom:12px">参数设置</div>
          <div class="field"><label>固定成本 F（元）</label>
            <input type="number" value="${F}" oninput="beSet('F',+this.value)"></div>
          <div class="field"><label>单价 P（元/件）</label>
            <input type="number" value="${P}" oninput="beSet('P',+this.value)"></div>
          <div class="field"><label>单位变动成本 V（元/件）</label>
            <input type="number" value="${V}" oninput="beSet('V',+this.value)"></div>
          <div class="field"><label>当前/计划销量 Q（件）</label>
            <input type="number" value="${Q}" oninput="beSet('Q',+this.value)"></div>
          <div class="muted" style="margin-top:10px;line-height:1.7">
            试试点着改 V（单位变动成本），看保本点怎么移动——这就是「成本控制」的意义。
          </div>
        </div>
      </div>
      <div>
        <div class="card" style="margin-bottom:14px">
          <div style="font-weight:700;margin-bottom:10px">盈亏平衡图</div>
          ${svg}
        </div>
        <div class="card">
          <div style="font-weight:700;margin-bottom:10px">计算过程</div>
          <div class="result-box">${steps}</div>
        </div>
      </div>
    </div>
  `;
}
function beSet(k,v){ CalcState.input[k] = v; renderCalc(); }
function fmt(n){
  if(!isFinite(n)) return '—';
  return Number(n).toLocaleString('zh-CN', {maximumFractionDigits:2});
}

/* ---------------- 3. 不确定型决策 ---------------- */
function calcUncertainty(){
  const s = CalcState.input;
  const alpha = s.alpha ?? 0.7;
  const states = s.states ?? ['Q1 较高','Q2 一般','Q3 较低','Q4 很低'];
  const rows = s.rows ?? [
    { name:'A1', v:[900,750,450,250] },
    { name:'A2', v:[800,600,400,200] },
    { name:'A3', v:[700,550,420,300] },
    { name:'A4', v:[600,500,380,280] },
  ];
  CalcState.input = { alpha, states, rows };

  const n = states.length;
  const colMax = states.map((_,j)=>Math.max(...rows.map(r=>r.v[j])));

  // 五种方法
  const optimistic = rows.map(r=>Math.max(...r.v));
  const pessimistic = rows.map(r=>Math.min(...r.v));
  const equal = rows.map(r=>r.v.reduce((a,b)=>a+b,0)/n);
  const coeff = rows.map((r,i)=>optimistic[i]*alpha + pessimistic[i]*(1-alpha));
  const regret = rows.map(r=>{
    const rg = r.v.map((v,j)=>colMax[j]-v);
    return { max: Math.max(...rg), row: rg };
  });

  const pick = arr => arr.indexOf(Math.max(...arr));
  const pickMin = arr => arr.indexOf(Math.min(...arr));

  const best = {
    optimistic: pick(optimistic),
    pessimistic: pick(pessimistic),
    equal: pick(equal),
    coeff: pick(coeff),
    regret: pickMin(regret.map(x=>x.max)),
  };

  const W = 640;
  const colW = 78;
  const T = W - 160 - 5*colW;
  const methods = [
    ['乐观法（大中取大）', best.optimistic, optimistic.map(v=>fmt(v))],
    ['悲观法（小中取大）', best.pessimistic, pessimistic.map(v=>fmt(v))],
    ['等可能法（求平均）', best.equal, equal.map(v=>v.toFixed(1))],
    [`乐观系数法（α=${alpha}）`, best.coeff, coeff.map(v=>v.toFixed(1))],
    ['最小遗憾法（大中取小）', best.regret, regret.map(x=>'遗憾 '+fmt(x.max))],
  ];

  const methodCards = methods.map(([name, bi, vals])=>`
    <div class="card" style="padding:14px 16px;margin-bottom:10px">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <b style="font-size:14px">${name}</b>
        <span class="chip ok" style="margin-left:auto">选 ${esc(rows[bi].name)}</span>
      </div>
      <div style="display:flex;gap:14px;flex-wrap:wrap">
        ${rows.map((r,i)=>`<span class="muted" style="font-family:var(--mono);font-size:12px;${i===bi?'color:var(--ok);font-weight:700':''}">${esc(r.name)}: ${vals[i]}</span>`).join('')}
      </div>
    </div>`).join('');

  let table = `<table class="matrix-table"><thead><tr><th>方案</th>${states.map(st=>`<th>${esc(st)}</th>`).join('')}
    <th>行最大</th><th>行最小</th></tr></thead><tbody>`;
  rows.forEach((r,i)=>{
    table += `<tr><td><b>${esc(r.name)}</b></td>` +
      r.v.map(v=>`<td>${fmt(v)}</td>`).join('') +
      `<td style="color:var(--ok)">${fmt(optimistic[i])}</td>` +
      `<td style="color:var(--bad)">${fmt(pessimistic[i])}</td></tr>`;
  });
  // 列最大行：标签不换行，数值与上方列对齐
  table += `<tr class="matrix-ideal"><td><b>理想值<br><span style="font-weight:400;font-size:9px;color:var(--ink-3)">列最大</span></b></td>` +
    colMax.map(v=>`<td><b>${fmt(v)}</b></td>`).join('') +
    `<td></td><td></td></tr>`;
  table += `</tbody></table>`;

  const inputs = rows.map((r,i)=>`
    <div class="card" style="padding:10px 12px;margin-bottom:8px">
      <div style="display:flex;gap:6px;align-items:center;margin-bottom:6px">
        <input type="text" value="${esc(r.name)}" oninput="unSetName(${i},this.value)"
          style="width:64px;padding:5px 8px;border-radius:6px;border:1px solid var(--line);background:var(--bg-elev);color:var(--text);font-size:12.5px">
        <button class="btn sm ghost" style="margin-left:auto" onclick="unDel(${i})" ${rows.length<=2?'disabled':''}>✕</button>
      </div>
      <div style="display:grid;grid-template-columns:repeat(${n},minmax(0,1fr));gap:5px">
        ${r.v.map((v,j)=>`<input type="number" value="${v}" oninput="unSet(${i},${j},+this.value)"
          style="min-width:0;width:100%;padding:5px 3px;border-radius:6px;border:1px solid var(--line);background:var(--bg-elev);color:var(--text);font-size:11.5px;font-family:var(--mono);text-align:center">`).join('')}
      </div>
    </div>`).join('');

  return `
    <div class="card" style="margin-bottom:14px">
      <div style="font-weight:700;margin-bottom:10px">收益矩阵</div>
      <div class="prose table-scroll">${table}</div>
    </div>
    <div class="calc-grid">
      <div>
        <div class="card">
          <div style="font-weight:700;margin-bottom:12px">方案 × 状态 收益矩阵（可编辑）</div>
          ${inputs}
          <div class="field" style="margin-top:10px"><label>乐观系数 α（0~1）</label>
            <input type="number" step="0.05" min="0" max="1" value="${alpha}" oninput="unSetAlpha(+this.value)"></div>
          <button class="btn sm ghost" onclick="unPreset()" style="width:100%">载入课件例题数据</button>
        </div>
      </div>
      <div>
        <div style="font-weight:700;margin:18px 0 10px">五种准则的结论</div>
        ${methodCards}
        <div class="card" style="border-color:var(--warn);background:var(--warn-soft)">
          <div style="font-size:13.5px;line-height:1.85">
            <b>注意</b>：同一组数据，五种方法可能给出<b>不同的最优方案</b>——这不是算错了，
            而是因为「不确定型决策主要取决于决策者的经验和态度」。考试时务必看清题目要求用哪种方法。
          </div>
        </div>
      </div>
    </div>
  `;
}
function unSet(i,j,v){ CalcState.input.rows[i].v[j] = v; renderCalc(); }
function unSetName(i,v){ CalcState.input.rows[i].name = v; renderCalc(); }
function unSetAlpha(v){ CalcState.input.alpha = v; renderCalc(); }
function unDel(i){ CalcState.input.rows.splice(i,1); renderCalc(); }
function unPreset(){
  CalcState.input = {
    alpha: 0.7,
    states: ['Q1 较高','Q2 一般','Q3 较低','Q4 很低'],
    rows: [
      { name:'A1', v:[900,750,450,250] },
      { name:'A2', v:[800,600,400,200] },
      { name:'A3', v:[700,550,420,300] },
      { name:'A4', v:[600,500,380,280] },
    ]
  };
  renderCalc();
}

/* ---------------- 4. 网络计划 ---------------- */
function calcNetwork(){
  const s = CalcState.input;
  // 活动：{code, dur, preds:[codes]}
  const acts = s.acts ?? [
    { code:'A', dur:3, preds:[] },
    { code:'B', dur:4.5, preds:[] },
    { code:'C', dur:2, preds:[] },
    { code:'D', dur:5, preds:['A'] },
    { code:'E', dur:4, preds:['B'] },
    { code:'F', dur:8, preds:['B'] },
    { code:'G', dur:3.5, preds:['C'] },
    { code:'H', dur:8, preds:['D','E'] },
    { code:'I', dur:6.5, preds:['F','G'] },
  ];
  CalcState.input = { acts };

  // CPM 计算
  const byCode = {};
  acts.forEach(a=>byCode[a.code] = a);
  const ES = {}, EF = {}, LS = {}, LF = {}, TF = {}, FF = {};

  // 拓扑序 + 正推
  const visited = {}, order = [];
  function visit(code, stack){
    if(visited[code]) return;
    if(stack.includes(code)) { visited[code] = true; order.push(code); return; }
    const a = byCode[code];
    if(!a) return;
    (a.preds||[]).forEach(p=>{ if(byCode[p]) visit(p, [...stack, code]); });
    visited[code] = true;
    order.push(code);
  }
  acts.forEach(a=>visit(a.code, []));

  order.forEach(code=>{
    const a = byCode[code];
    const preds = (a.preds||[]).filter(p=>byCode[p]);
    ES[code] = preds.length ? Math.max(...preds.map(p=>EF[p] ?? 0)) : 0;
    EF[code] = ES[code] + a.dur;
  });

  const projectEnd = Math.max(...acts.map(a=>EF[a.code] ?? 0), 0);

  // 逆推
  [...order].reverse().forEach(code=>{
    const succs = acts.filter(a=>(a.preds||[]).includes(code));
    LF[code] = succs.length ? Math.min(...succs.map(s2=>LS[s2.code] ?? projectEnd)) : projectEnd;
    LS[code] = LF[code] - byCode[code].dur;
    TF[code] = LS[code] - ES[code];
  });

  // 关键路径（TF=0）
  const critical = acts.filter(a=>Math.abs(TF[a.code]) < 1e-9).map(a=>a.code);

  // 找出一条完整关键路径（按依赖链）
  function findPath(){
    const ends = critical.filter(c=>!acts.some(a=>(a.preds||[]).includes(c)));
    if(!ends.length) return [];
    let cur = ends.reduce((best,c)=> (EF[c] > EF[best] ? c : best), ends[0]);
    const path = [cur];
    while(true){
      const a = byCode[cur];
      const preds = (a.preds||[]).filter(p=>critical.includes(p));
      if(!preds.length) break;
      cur = preds.reduce((best,p)=> (EF[p] > EF[best] ? p : best), preds[0]);
      path.unshift(cur);
    }
    return path;
  }
  const path = findPath();

  // 表格
  let table = `<table><thead><tr>
    <th>活动</th><th>紧前</th><th>工期</th><th>ES</th><th>EF</th><th>LS</th><th>LF</th><th>总时差</th><th>关键</th>
  </tr></thead><tbody>`;
  acts.forEach(a=>{
    const isC = critical.includes(a.code);
    table += `<tr>
      <td><b>${esc(a.code)}</b></td>
      <td>${(a.preds||[]).join(',')||'—'}</td>
      <td>${a.dur}</td>
      <td>${fmt(ES[a.code])}</td><td>${fmt(EF[a.code])}</td>
      <td>${fmt(LS[a.code])}</td><td>${fmt(LF[a.code])}</td>
      <td style="color:${Math.abs(TF[a.code])<1e-9?'var(--bad)':'var(--text-2)'}">${fmt(TF[a.code])}</td>
      <td>${isC?'<span class="chip bad">是</span>':''}</td>
    </tr>`;
  });
  table += `</tbody></table>`;

  // 简易甘特/网络示意图
  const rowsN = acts.length;
  const rowH = 30, W = 640, H = rowsN*rowH + 50, L = 70, R = 40;
  const span = Math.max(projectEnd, 1);
  const X = t => L + (t/span)*(W-L-R);
  let svg = `<svg class="diagram" viewBox="0 0 ${W} ${H}">`;
  // 时间轴
  for(let t=0; t<=span; t++){
    svg += `<line x1="${X(t)}" y1="24" x2="${X(t)}" y2="${H-16}" stroke="var(--line)" stroke-width="1"/>`;
    svg += `<text x="${X(t)}" y="16" text-anchor="middle" class="lbl">${t}</text>`;
  }
  acts.forEach((a,i)=>{
    const y = 40 + i*rowH;
    const isC = critical.includes(a.code);
    svg += `<text x="${L-10}" y="${y+5}" text-anchor="end" class="lbl-b">${esc(a.code)}</text>`;
    // 时差区
    if(TF[a.code] > 1e-9){
      svg += `<rect x="${X(EF[a.code])}" y="${y-8}" width="${X(EF[a.code]+TF[a.code])-X(EF[a.code])}" height="16"
        fill="var(--warn)" opacity=".25" rx="3"/>`;
    }
    // 工期条
    svg += `<rect x="${X(ES[a.code])}" y="${y-9}" width="${Math.max(4, X(EF[a.code])-X(ES[a.code]))}" height="18"
      fill="${isC?'var(--bad)':'var(--brand)'}" opacity="${isC?'0.9':'0.62'}" rx="4"/>`;
    svg += `<text x="${(X(ES[a.code])+X(EF[a.code]))/2}" y="${y+4}" text-anchor="middle"
      class="lbl" style="fill:#fff;font-size:10px">${a.dur}</text>`;
  });
  svg += `<text x="${X(projectEnd)}" y="${H-4}" text-anchor="middle" class="lbl-b" style="fill:var(--bad)">总工期 ${fmt(projectEnd)}</text>`;
  svg += `</svg>`;

  const inputs = acts.map((a,i)=>`
    <div style="display:grid;grid-template-columns:44px 54px 1fr 24px;gap:5px;margin-bottom:5px;align-items:center">
      <input type="text" value="${esc(a.code)}" oninput="nwSet(${i},'code',this.value)"
        style="padding:4px 6px;border-radius:6px;border:1px solid var(--line);background:var(--bg-elev);color:var(--text);font-size:12px;text-align:center">
      <input type="number" step="0.5" value="${a.dur}" oninput="nwSet(${i},'dur',+this.value)"
        style="padding:4px 6px;border-radius:6px;border:1px solid var(--line);background:var(--bg-elev);color:var(--text);font-size:12px;font-family:var(--mono)">
      <input type="text" value="${(a.preds||[]).join(',')}" placeholder="紧前"
        oninput="nwSet(${i},'preds',this.value.split(',').map(s=>s.trim()).filter(Boolean))"
        style="padding:4px 6px;border-radius:6px;border:1px solid var(--line);background:var(--bg-elev);color:var(--text);font-size:12px">
      <button class="btn sm ghost" style="padding:2px 4px" onclick="nwDel(${i})" ${acts.length<=2?'disabled':''}>✕</button>
    </div>`).join('');

  return `
    <div class="calc-grid">
      <div>
        <div class="card">
          <div style="font-weight:700;margin-bottom:10px">活动清单</div>
          <div style="display:grid;grid-template-columns:44px 54px 1fr 24px;gap:5px;margin-bottom:6px">
            <span class="muted" style="font-size:11px">代号</span>
            <span class="muted" style="font-size:11px">工期</span>
            <span class="muted" style="font-size:11px">紧前活动(逗号分隔)</span>
            <span></span>
          </div>
          ${inputs}
          <button class="btn sm" onclick="nwAdd()" style="width:100%;margin-top:6px">+ 增加活动</button>
          <button class="btn sm ghost" onclick="nwPreset()" style="width:100%;margin-top:6px">载入课件例题</button>
          <div class="muted" style="margin-top:10px;line-height:1.7;font-size:12px">
            表内红条=关键活动，浅黄块=该活动的总时差（可机动时间）。
          </div>
        </div>
      </div>
      <div>
        <div class="card" style="margin-bottom:14px">
          <div style="font-weight:700;margin-bottom:10px">时间参数表</div>
          <div class="prose">${table}</div>
        </div>
        <div class="card" style="margin-bottom:14px">
          <div style="font-weight:700;margin-bottom:10px">进度示意（红色=关键线路）</div>
          ${svg}
        </div>
        <div class="card" style="border-color:var(--bad);background:var(--bad-soft)">
          <div style="font-weight:800;font-size:15px;color:var(--bad)">
            关键线路：${path.join(' → ') || '（无）'}
          </div>
          <div class="muted" style="margin-top:6px">
            总工期 ${fmt(projectEnd)} 天。关键活动总时差为 0，任何延误都会直接推迟工期。
          </div>
        </div>
      </div>
    </div>
  `;
}
function nwSet(i,k,v){ CalcState.input.acts[i][k] = v; renderCalc(); }
function nwAdd(){
  const acts = CalcState.input.acts;
  const code = String.fromCharCode(65 + acts.length);
  acts.push({ code, dur:1, preds:[] });
  renderCalc();
}
function nwDel(i){ CalcState.input.acts.splice(i,1); renderCalc(); }
function nwPreset(){
  CalcState.input = {};
  renderCalc();
}
