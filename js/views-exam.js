/* ================= 视图：模拟考场 ================= */

const ExamState = {
  running: false,
  paper: null,
  answers: {},
  startTs: 0,
  leftSec: 0,
  timer: null,
  submitted: false,
  result: null,
};

function viewExam(view){
  if(ExamState.submitted && ExamState.result){
    view.innerHTML = renderExamResult();
    return;
  }
  if(ExamState.running && ExamState.paper){
    view.innerHTML = renderExamPaper();
    return;
  }
  view.innerHTML = renderExamIntro();
}

function renderExamIntro(){
  const e = App.exams[0];
  if(!e){
    return `<div class="empty"><div class="ico">📄</div><p>未找到真题数据</p></div>`;
  }
  const singleN = (e.single||[]).length;
  const judgeN = (e.judge||[]).length;

  return `
    <div class="hero" style="background:linear-gradient(135deg,#e05656,#c0392b)">
      <h2>${esc(e.name)}</h2>
      <p>${esc(e.note||'')}　考试日期：${esc(e.date||'—')}</p>
      <div class="stats">
        <div class="stat"><b>${singleN}</b><span>选择题</span></div>
        <div class="stat"><b>${judgeN}</b><span>判断题</span></div>
        <div class="stat"><b>60</b><span>限时（分钟）</span></div>
        <div class="stat"><b>${singleN+judgeN}</b><span>本次题量</span></div>
      </div>
    </div>

    <div class="card" style="margin-top:16px">
      <div style="font-weight:700;margin-bottom:10px">本次模拟说明</div>
      <div class="prose">
        <ul>
          <li>本套卷抽取真题中的<b>选择题与判断题</b>组卷，共 ${singleN+judgeN} 题，限时 60 分钟。</li>
          <li>简答、计算、案例为主观题，请到「简答背诵」「计算专项」单独练习。</li>
          <li>交卷后可查看逐题解析与得分明细。</li>
        </ul>
      </div>
      <div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap">
        <button class="btn primary" onclick="startExam()">开始考试</button>
        <button class="btn" onclick="startExam(true)">练习模式（不计时）</button>
      </div>
    </div>

    <div class="section-title" style="margin-top:26px"><span class="num">?</span>这份卷子从哪来</div>
    <div class="card">
      <div class="prose">
        <p>课程：${esc(App._meta?.course || '现代企业管理')}　教材：${esc(App._meta?.textbook || '杨善林《企业管理学》')}</p>
        <p>以下为真题中的<b>主观题</b>，考前务必过一遍题型：</p>
      </div>
      <div class="grid c2" style="margin-top:12px">
        <div class="card" style="padding:14px 16px">
          <b style="font-size:14px">简答题（5×7=35）</b>
          <div class="muted" style="margin-top:6px">6 选 5，全答按得分最低的 5 题算</div>
          <button class="btn sm" style="margin-top:10px" onclick="go('short')">去背简答</button>
        </div>
        <div class="card" style="padding:14px 16px">
          <b style="font-size:14px">计算题（25 分）</b>
          <div class="muted" style="margin-top:6px">决策树 12 分 + 网络图 13 分</div>
          <button class="btn sm" style="margin-top:10px" onclick="go('calc')">去练计算</button>
        </div>
      </div>
    </div>
  `;
}

function startExam(noTimer){
  const e = App.exams[0];
  const list = [
    ...(e.single||[]).map((q,i)=>({...q, id:'ex-s-'+i, type:'single', source:'2023A卷'})),
    ...(e.judge||[]).map((q,i)=>({...q, id:'ex-j-'+i, type:'judge', source:'2023A卷'})),
  ];
  ExamState.paper = list;
  ExamState.answers = {};
  ExamState.submitted = false;
  ExamState.result = null;
  ExamState.running = true;
  ExamState.noTimer = !!noTimer;
  ExamState.leftSec = 60*60;
  ExamState.startTs = Date.now();

  clearInterval(ExamState.timer);
  if(!noTimer){
    ExamState.timer = setInterval(()=>{
      ExamState.leftSec--;
      const el = $('#examTimer');
      if(el){
        el.textContent = fmtTime(ExamState.leftSec);
        el.classList.toggle('danger', ExamState.leftSec <= 300);
      }
      if(ExamState.leftSec <= 0){
        clearInterval(ExamState.timer);
        toast('时间到，自动交卷');
        submitExam();
      }
    }, 1000);
  }
  render();
}

function fmtTime(sec){
  if(sec < 0) sec = 0;
  const m = Math.floor(sec/60), s = sec%60;
  return String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
}

function renderExamPaper(){
  const list = ExamState.paper;
  const answered = Object.keys(ExamState.answers).length;

  let html = `
    <div class="exam-head">
      <div>
        <div class="muted" style="font-size:11px">剩余时间</div>
        <div class="timer" id="examTimer">${ExamState.noTimer?'不限时':fmtTime(ExamState.leftSec)}</div>
      </div>
      <div style="flex:1;min-width:140px">
        <div class="muted" style="font-size:11px;margin-bottom:4px">已答 ${answered}/${list.length}</div>
        <div class="bar-track"><div class="bar-fill" style="width:${answered/list.length*100}%"></div></div>
      </div>
      <button class="btn primary" onclick="submitExam()">交卷</button>
    </div>
  `;

  list.forEach((q, i)=>{
    const chosen = ExamState.answers[q.id];
    html += `
      <div class="q-card" style="margin-bottom:12px">
        <div class="q-meta">
          <span class="chip brand">${i+1}</span>
          <span class="chip">${q.type==='judge'?'判断题':'单选题'}</span>
          <span class="chip">第${q.chapter}章</span>
        </div>
        <div class="q-stem">${esc(q.stem)}</div>
        ${(q.options||[]).map(o=>`
          <div class="opt ${chosen===o.key?'selected':''}" onclick="examPick('${q.id}','${o.key}')">
            <span class="badge">${o.key}</span><span>${esc(o.text)}</span>
          </div>`).join('')}
      </div>
    `;
  });

  html += `<div style="text-align:center;margin-top:20px">
    <button class="btn primary" onclick="submitExam()">交卷并查看成绩</button>
  </div>`;

  return html;
}

function examPick(qid, key){
  ExamState.answers[qid] = key;
  const list = ExamState.paper;
  const answered = Object.keys(ExamState.answers).length;
  const bar = $('.bar-fill');
  if(bar) bar.style.width = (answered/list.length*100) + '%';
  const label = $('.exam-head .muted');
  if(label) label.textContent = `已答 ${answered}/${list.length}`;
  render();
}

function submitExam(){
  clearInterval(ExamState.timer);
  const list = ExamState.paper;
  const detail = list.map(q=>{
    const chosen = ExamState.answers[q.id];
    return { q, chosen, right: chosen === q.answer };
  });
  const right = detail.filter(d=>d.right).length;

  detail.forEach(d=>{
    recordAnswer(d.q.id, d.q.chapter, d.right);
    if(!d.right) addWrong(d.q);
  });

  ExamState.result = { total: list.length, right, detail };
  ExamState.submitted = true;
  ExamState.running = false;
  saveState();
  render();
}

function renderExamResult(){
  const r = ExamState.result;
  const pct = Math.round(r.right / r.total * 100);
  const score = Math.round(pct * 0.2 * 10)/10;
  const color = pct >= 80 ? 'var(--ok)' : pct >= 60 ? 'var(--warn)' : 'var(--bad)';
  const comment = pct >= 85 ? '非常棒！可以重点去看简答和案例了。'
    : pct >= 70 ? '基础扎实，把错题过一遍就更稳了。'
    : pct >= 50 ? '还有明显薄弱环节，建议回看对应章节。'
    : '基础需要加强，先把前 3 章讲义过一遍再回来。';

  const wrongList = r.detail.filter(d=>!d.right);

  return `
    <div class="card">
      <div class="result-hero">
        <div class="big" style="color:${color}">${r.right}<small>/${r.total}</small></div>
        <div style="margin-top:10px;font-size:15px;color:${color};font-weight:700">
          正确率 ${pct}%　折算得分约 ${score} / 20
        </div>
        <div class="muted" style="margin-top:8px">${comment}</div>
      </div>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:10px">
        <button class="btn primary" onclick="startExam()">再考一次</button>
        <button class="btn" onclick="ExamState.submitted=false;ExamState.result=null;render()">返回</button>
        <button class="btn" onclick="go('wrong')">查看错题本</button>
      </div>
    </div>

    ${wrongList.length ? `
      <div class="section-title" style="margin-top:26px"><span class="num">✕</span>错题回顾（${wrongList.length}）</div>
      ${wrongList.map(d=>`
        <div class="q-card" style="margin-bottom:12px">
          <div class="q-meta">
            <span class="chip bad">你选 ${esc(d.chosen||'未答')}</span>
            <span class="chip ok">正确 ${esc(d.q.answer)}</span>
            <span class="chip">第${d.q.chapter}章</span>
          </div>
          <div class="q-stem">${esc(d.q.stem)}</div>
          ${(d.q.options||[]).map(o=>{
            let cls = 'opt disabled';
            if(o.key === d.q.answer) cls += ' correct';
            else if(o.key === d.chosen) cls += ' wrong';
            return `<div class="${cls}"><span class="badge">${o.key}</span><span>${esc(o.text)}</span></div>`;
          }).join('')}
          ${d.q.explain?`<div class="explain">${esc(d.q.explain)}</div>`:''}
        </div>`).join('')}
    ` : `
      <div class="card" style="margin-top:16px;border-color:var(--ok);background:var(--ok-soft);text-align:center;padding:30px">
        <div style="color:var(--ok);display:flex;justify-content:center">${icon("check",30)}</div>
        <div style="font-weight:700;margin-top:8px;color:var(--ok)">全对！这套客观题已经拿下了</div>
      </div>
    `}
  `;
}
