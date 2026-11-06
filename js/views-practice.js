/* ================= 视图：练习中心 ================= */

const PracticeState = {
  list: [],
  idx: 0,
  answers: {},      // id -> 所选key
  revealed: {},     // id -> true
  filter: { chapter:'all', type:'all', source:'all' },
};

function allQuestions(){
  const mcq = (App.mcq||[]).map(q=>({...q}));
  const mid = (App.midterm||[]).map(q=>({...q}));
  const tf  = (App.tf||[]).map(q=>({...q}));
  return [...mcq, ...mid, ...tf];
}

function applyFilter(){
  const f = PracticeState.filter;
  let list = allQuestions();
  if(f.chapter !== 'all') list = list.filter(q=>String(q.chapter) === String(f.chapter));
  if(f.type !== 'all') list = list.filter(q=>q.type === f.type);
  if(f.source !== 'all') list = list.filter(q=>q.source === f.source);
  return list;
}

function viewPractice(view){
  // 若从章节跳转进来，带过滤
  let filterFromOutside = false;
  if(App._practiceFilter){
    PracticeState.filter.chapter = String(App._practiceFilter.chapter);
    App._practiceFilter = null;
    filterFromOutside = true;
  }

  const sources = [...new Set(allQuestions().map(q=>q.source).filter(Boolean))];
  const f = PracticeState.filter;

  view.innerHTML = `
    <div class="filters">
      <select onchange="setFilter('chapter', this.value)">
        <option value="all"${f.chapter==='all'?' selected':''}>全部章节</option>
        ${CHAPTER_META.map(m=>{
          const ch = App.chapters[m.id];
          return `<option value="${m.num}"${String(f.chapter)===String(m.num)?' selected':''}>第${m.num}章 ${esc(ch?ch.title:'')}</option>`;
        }).join('')}
      </select>
      <select onchange="setFilter('type', this.value)">
        <option value="all"${f.type==='all'?' selected':''}>全部题型</option>
        <option value="single"${f.type==='single'?' selected':''}>单选题</option>
        <option value="judge"${f.type==='judge'?' selected':''}>判断题</option>
      </select>
      <select onchange="setFilter('source', this.value)">
        <option value="all"${f.source==='all'?' selected':''}>全部来源</option>
        ${sources.map(s=>`<option value="${esc(s)}"${f.source===s?' selected':''}>${esc(s)}</option>`).join('')}
      </select>
      <button class="btn sm" onclick="shufflePractice()">${icon("shuffle",14)} 打乱顺序</button>
      <button class="btn sm" onclick="resetPractice()">${icon("reset",14)} 重新开始</button>
      <span class="muted" style="margin-left:auto" id="pCount"></span>
    </div>
    <div id="practiceArea"></div>
  `;

  if(!PracticeState.list.length || filterFromOutside){
    rebuildPracticeList();
  }
  renderPracticeQuestion();
}

/**
 * 按当前筛选重建题目列表。
 * 已答/已解析记录按题目 id 保存，切换筛选时**只换题目集合，不清空作答记录**，
 * 尽量停留在原来的那道题上；原题不在新集合里时，定位到该筛选下第一道未做的题。
 */
function rebuildPracticeList(keepQid){
  const cur = keepQid || PracticeState.list[PracticeState.idx]?.id;
  PracticeState.list = applyFilter();

  let idx = cur ? PracticeState.list.findIndex(x=>x.id === cur) : -1;
  if(idx < 0){
    idx = PracticeState.list.findIndex(x=>!PracticeState.revealed[x.id] && !PracticeState.answers[x.id]);
  }
  PracticeState.idx = idx < 0 ? 0 : idx;
}

function setFilter(key, val){
  // 选择没变（例如重复选中同一项）就什么都不做
  if(String(PracticeState.filter[key]) === String(val)) return;
  PracticeState.filter[key] = val;
  rebuildPracticeList();
  renderPracticeQuestion();
}

function shufflePractice(){
  rebuildPracticeList();
  for(let i=PracticeState.list.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [PracticeState.list[i], PracticeState.list[j]] = [PracticeState.list[j], PracticeState.list[i]];
  }
  PracticeState.idx = 0;
  renderPracticeQuestion();
  toast('已打乱顺序');
}

function resetPractice(){
  PracticeState.list = applyFilter();
  PracticeState.idx = 0;
  PracticeState.answers = {};
  PracticeState.revealed = {};
  renderPracticeQuestion();
  toast('已重置');
}

function renderPracticeQuestion(){
  const area = $('#practiceArea');
  if(!area) return;
  const cnt = $('#pCount');
  if(cnt) cnt.textContent = `共 ${PracticeState.list.length} 题`;

  if(!PracticeState.list.length){
    area.innerHTML = `<div class="empty"><div class="ico">🔍</div><p>该筛选条件下没有题目</p></div>`;
    return;
  }

  const q = PracticeState.list[PracticeState.idx];
  const chosen = PracticeState.answers[q.id];
  const revealed = !!PracticeState.revealed[q.id];
  const isJudge = q.type === 'judge';

  // 统计只算当前筛选出来的题目，避免切到「第1章」后还显示全部章节的已答数
  const answeredCount = PracticeState.list.filter(x=>PracticeState.answers[x.id]).length;
  const rightCount = PracticeState.list.filter(x=>{
    const a = PracticeState.answers[x.id];
    return a && a === x.answer;
  }).length;

  let optsHtml = '';
  (q.options||[]).forEach(o=>{
    let cls = 'opt';
    if(revealed){
      cls += ' disabled';
      if(o.key === q.answer) cls += ' correct';
      else if(o.key === chosen) cls += ' wrong';
    }else if(chosen === o.key){
      cls += ' selected';
    }
    optsHtml += `<div class="${cls}" onclick="pickOption('${q.id}','${o.key}')">
      <span class="badge">${o.key}</span><span>${esc(o.text)}</span></div>`;
  });

  area.innerHTML = `
    <div class="score-bar">
      <div class="item">已答 <b>${answeredCount}</b></div>
      <div class="item">正确 <b style="color:var(--ok)">${rightCount}</b></div>
      <div class="item">进度 <b>${PracticeState.idx+1}</b>/${PracticeState.list.length}</div>
      <div style="margin-left:auto;display:flex;gap:8px">
        <button class="btn sm" onclick="prevQ()" ${PracticeState.idx===0?'disabled':''}>← 上一题</button>
        <button class="btn sm primary" onclick="nextQ()" ${PracticeState.idx>=PracticeState.list.length-1?'disabled':''}>下一题 →</button>
      </div>
    </div>

    <div class="q-card">
      <div class="q-meta">
        <span class="chip brand">第 ${q.chapter} 章</span>
        <span class="chip">${isJudge?'判断题':'单选题'}</span>
        <span class="chip">${esc(q.source||'')}</span>
        ${q.answerSource==='ai'?`<span class="chip ai" title="答案由 AI 依教材补全，可自行订正">AI补全</span>`:''}
        ${PracticeState.list.length>1?`<span class="muted" style="margin-left:auto">${PracticeState.idx+1} / ${PracticeState.list.length}</span>`:''}
      </div>
      <div class="q-stem"><span class="idx">${PracticeState.idx+1}.</span>${esc(q.stem)}</div>
      ${optsHtml}
      ${revealed ? `
        <div class="explain">
          <b>正确答案：${q.answer}</b>${chosen?`　你的选择：${chosen}${chosen===q.answer?' ✓':' ✗'}`:''}
          ${q.explain?'<br>'+esc(q.explain):''}
        </div>`:''}
      <div class="q-actions">
        ${!revealed
          ? `<button class="btn primary sm" onclick="revealQ('${q.id}')" ${!chosen?'disabled':''}>查看答案解析</button>`
          : `<button class="btn sm" onclick="nextQ()">下一题 →</button>
             <button class="btn sm ghost" onclick="removeWrong('${q.id}');toast('已从错题本移除');renderPracticeQuestion()">移出错题本</button>`}
        <button class="btn sm ghost" onclick="markPracticeRead('${q.chapter}')">去学这一章</button>
      </div>
    </div>

    <div class="q-nav">
      ${PracticeState.list.map((x,i)=>{
        let cls = 'q-dot';
        if(i===PracticeState.idx) cls += ' cur';
        else if(PracticeState.revealed[x.id]) cls += (PracticeState.answers[x.id]===x.answer?' right':' wrong');
        return `<button class="${cls}" onclick="jumpQ(${i})">${i+1}</button>`;
      }).join('')}
    </div>
  `;
}

function pickOption(qid, key){
  if(PracticeState.revealed[qid]) return;
  PracticeState.answers[qid] = key;
  renderPracticeQuestion();
}

function revealQ(qid){
  if(PracticeState.revealed[qid]) return;
  PracticeState.revealed[qid] = true;
  const q = PracticeState.list.find(x=>x.id===qid);
  const chosen = PracticeState.answers[qid];
  const correct = chosen === q.answer;
  recordAnswer(qid, q.chapter, correct);
  if(!correct) addWrong(q);
  else removeWrong(qid);
  renderPracticeQuestion();
}

function nextQ(){
  if(PracticeState.idx < PracticeState.list.length-1){
    PracticeState.idx++;
    renderPracticeQuestion();
  }
}
function prevQ(){
  if(PracticeState.idx > 0){
    PracticeState.idx--;
    renderPracticeQuestion();
  }
}
function jumpQ(i){
  PracticeState.idx = i;
  renderPracticeQuestion();
}
function markPracticeRead(chapter){
  go('chapter', 'ch' + String(chapter).padStart(2,'0'));
}

/* 键盘快捷键 */
document.addEventListener('keydown', e=>{
  if(App.route !== 'practice') return;
  if(/input|textarea|select/i.test(e.target.tagName)) return;
  const q = PracticeState.list[PracticeState.idx];
  if(!q) return;
  if(['1','2','3','4'].includes(e.key)){
    const opt = q.options?.[Number(e.key)-1];
    if(opt) pickOption(q.id, opt.key);
    e.preventDefault();
  }
  if(e.key === 'Enter'){
    if(!PracticeState.revealed[q.id] && PracticeState.answers[q.id]) revealQ(q.id);
    else nextQ();
    e.preventDefault();
  }
  if(e.key === 'ArrowRight'){ nextQ(); e.preventDefault(); }
  if(e.key === 'ArrowLeft'){ prevQ(); e.preventDefault(); }
});
