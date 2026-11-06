/* ================= 课程图示库（SVG） =================
   设计原则：
   1. 只用线条与色块，纸质风格（低饱和、细线）
   2. 每张图聚焦一个「结构关系」，不做装饰
   3. 全部自适应宽度，深色模式跟随 CSS 变量
   ==================================================== */

/* ---------- 基础绘图助手 ---------- */
const V = {
  esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); },
  // 圆角矩形
  rect(x,y,w,h,txt,opt={}){
    const fill = opt.fill || 'var(--card)';
    const stroke = opt.stroke || 'var(--rule-strong)';
    const color = opt.color || 'var(--ink)';
    const fs = opt.fs || 12;
    const fw = opt.fw || 600;
    const rx = opt.rx == null ? 3 : opt.rx;
    const dash = opt.dash ? ` stroke-dasharray="${opt.dash}"` : '';
    let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"
      fill="${fill}" stroke="${stroke}" stroke-width="${opt.sw||1.2}"${dash}/>`;
    if(txt){
      const lines = String(txt).split('\n');
      const lh = fs + 4;
      const startY = y + h/2 - (lines.length-1)*lh/2 + fs*0.35;
      lines.forEach((ln,i)=>{
        s += `<text x="${x+w/2}" y="${startY+i*lh}" text-anchor="middle"
          style="font-size:${fs}px;font-weight:${fw};fill:${color}">${this.esc(ln)}</text>`;
      });
    }
    return s;
  },
  // 圆
  circle(cx,cy,r,txt,opt={}){
    const fill = opt.fill || 'var(--card)';
    const stroke = opt.stroke || 'var(--rule-strong)';
    const color = opt.color || 'var(--ink)';
    const fs = opt.fs || 11;
    let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${opt.sw||1.2}"/>`;
    if(txt !== undefined && txt !== null && txt !== ''){
      const lines = String(txt).split('\n');
      const lh = fs + 3;
      const startY = cy - (lines.length-1)*lh/2 + fs*0.35;
      lines.forEach((ln,i)=>{
        s += `<text x="${cx}" y="${startY+i*lh}" text-anchor="middle"
          style="font-size:${fs}px;font-weight:${opt.fw||700};fill:${color}">${this.esc(ln)}</text>`;
      });
    }
    return s;
  },
  // 线
  line(x1,y1,x2,y2,opt={}){
    const stroke = opt.stroke || 'var(--ink-3)';
    const sw = opt.sw || 1.2;
    const dash = opt.dash ? ` stroke-dasharray="${opt.dash}"` : '';
    const arrow = opt.arrow ? ' marker-end="url(#arrowhead)"' : '';
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
      stroke="${stroke}" stroke-width="${sw}"${dash}${arrow} fill="none"/>`;
  },
  // 箭头（带 marker）
  arrow(x1,y1,x2,y2,opt={}){
    return this.line(x1,y1,x2,y2, Object.assign({arrow:true}, opt));
  },
  // 文本
  text(x,y,txt,opt={}){
    const anchor = opt.anchor || 'middle';
    const color = opt.color || 'var(--ink-2)';
    const fs = opt.fs || 11;
    const fw = opt.fw || 400;
    return `<text x="${x}" y="${y}" text-anchor="${anchor}"
      style="font-size:${fs}px;font-weight:${fw};fill:${color}">${this.esc(txt)}</text>`;
  },
  // 多层文本（自动换行按给定宽度）
  wrap(x,y,txt,maxChars,lineH,opt={}){
    const lines = [];
    let cur = '';
    for(const ch of txt){
      cur += ch;
      if(cur.length >= maxChars){ lines.push(cur); cur=''; }
    }
    if(cur) lines.push(cur);
    return lines.map((ln,i)=>this.text(x, y+i*lineH, ln, opt)).join('');
  },
  // 定义器（箭头、渐变等）
  defs(){
    return `<defs>
      <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill="var(--ink-3)"/>
      </marker>
      <marker id="arrowhead-accent" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent)"/>
      </marker>
      <marker id="arrowhead-bad" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill="var(--bad)"/>
      </marker>
      <marker id="arrowhead-ok" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill="var(--ok)"/>
      </marker>
    </defs>`;
  },
  // 包裹 svg
  svg(w,h,inner,opt={}){
    const cls = opt.cls || 'cd';
    return `<svg class="${cls}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet"
      style="width:100%;height:auto;display:block;max-width:${opt.maxw||'100%'}">
      ${this.defs()}${inner}</svg>`;
  }
};

/* ================= 各知识点的图示 ================= */
const DIAGRAMS = {};

/* ---------- ch01 ---------- */
DIAGRAMS['mgmt-3layer'] = () => {
  // 管理定义三层
  const w=560, h=250;
  let s='';
  // 三个横条，自下而上
  const rows = [
    ['第一层 · 手段','计划 · 组织 · 控制 · 激励 · 领导','var(--accent)'],
    ['第二层 · 过程','协调人力 / 物力 / 财力 / 信息资源','var(--accent-line)'],
    ['第三层 · 目的','达成组织目标','var(--ok)'],
  ];
  rows.forEach((r,i)=>{
    const y = 24 + i*74;
    s += V.rect(40, y, 480, 58, '', {fill:'var(--paper-2)', stroke:'var(--rule)'});
    s += V.rect(40, y, 6, 58, '', {fill:r[2], stroke:r[2], rx:2});
    s += V.text(66, y+23, r[0], {anchor:'start', fs:11, fw:700, color:'var(--ink-3)'});
    s += V.text(66, y+44, r[1], {anchor:'start', fs:13, fw:600, color:'var(--ink)'});
  });
  s += V.arrow(284, 14, 284, 24, {stroke:'var(--ink-3)'});
  s += V.text(300, 12, '层层递进', {anchor:'start', fs:10, color:'var(--ink-3)'});
  return V.svg(w,h,s);
};

DIAGRAMS['mgmt-func'] = () => {
  // 五职能循环
  const w=520, h=280, cx=260, cy=145, R=92;
  const items=['计划','组织','领导','控制','协调'];
  let s='';
  /* 先画辐条再画中心圆：原版中心圆先画，辐条后画 → 5 条线直接压在「5 项 职能」字上。 */
  const spokes = items.map((t,i)=>{
    const a = -Math.PI/2 + i*(2*Math.PI/5);
    return {t, x: cx + Math.cos(a)*R, y: cy + Math.sin(a)*R};
  });
  spokes.forEach(p=>{ s += V.line(cx,cy,p.x,p.y,{stroke:'var(--accent-line)',sw:1}); });
  s += V.circle(cx,cy,44,'5 项\n职能',{fill:'var(--accent-soft)',stroke:'var(--accent)',color:'var(--accent-ink)',fs:11});
  spokes.forEach(p=>{ s += V.circle(p.x,p.y,30,p.t,{fill:'var(--card)',stroke:'var(--accent-line)',fs:12}); });
  s += V.text(cx, h-12, '计划是首要职能，协调贯穿全过程', {fs:11, color:'var(--ink-3)'});
  return V.svg(w,h,s);
};

DIAGRAMS['mgmt-duality'] = () => {
  const w=560, h=230;
  let s='';
  s += V.rect(30,30,240,80,'',{fill:'var(--accent-soft)',stroke:'var(--accent-line)'});
  s += V.text(150,58,'自然属性',{fs:14,fw:700,color:'var(--accent-ink)'});
  s += V.text(150,80,'＝ 生产力属性',{fs:11,color:'var(--ink-2)'});
  s += V.text(150,98,'与生产方式、制度无关',{fs:10,color:'var(--ink-3)'});

  s += V.rect(290,30,240,80,'',{fill:'var(--warn-soft)',stroke:'rgba(138,99,32,.62)'});
  s += V.text(410,58,'社会属性',{fs:14,fw:700,color:'var(--warn)'});
  s += V.text(410,80,'＝ 生产关系属性',{fs:11,color:'var(--ink-2)'});
  s += V.text(410,98,'受政治制度、意识形态制约',{fs:10,color:'var(--ink-3)'});

  s += V.text(280,150,'管理的二重性',{fs:12,fw:700,color:'var(--ink)'});
  s += V.line(280,158,280,168,{stroke:'var(--ink-3)'});
  s += V.line(150,168,410,168,{stroke:'var(--ink-3)'});
  s += V.line(150,168,150,110,{stroke:'var(--ink-3)'});
  s += V.line(410,168,410,110,{stroke:'var(--ink-3)'});
  s += V.text(280,196,'例：同一套流水线管理（自然），美国裁员易、法国难（社会）',{fs:10,color:'var(--ink-3)'});
  return V.svg(w,h,s);
};

DIAGRAMS['manager-roles'] = () => {
  // 明茨伯格三角：三层角色
  const w=580, h=290;
  let s='';
  const groups=[
    ['人际角色','代表人 · 领导者 · 联络者','var(--accent)'],
    ['信息角色','监督者 · 传播者 · 发言人','var(--ok)'],
    ['决策角色','企业家 · 干扰应对者 · 资源分配者 · 谈判者','var(--warn)'],
  ];
  groups.forEach((g,i)=>{
    const y=28+i*84;
    s += V.rect(30,y,520,66,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(56,y+26,g[0],{anchor:'start',fs:13,fw:700,color:g[2]});
    s += V.text(56,y+48,g[1],{anchor:'start',fs:11.5,color:'var(--ink-2)'});
  });
  s += V.text(290,270,'明茨伯格：管理者的十种角色（三类）',{fs:10.5,color:'var(--ink-3)'});
  return V.svg(w,h,s);
};

/* [已废弃] 四原理旧版，已由 mgmt-principles7 取代（diagram-map 仅挂 mgmt-principles7，无任何引用）。
   整段注释，避免加载顺序变化时回退。
DIAGRAMS['mgmt-principles'] = () => {
  const w=520, h=250;
  const items=[
    ['人本','以人为中心，别把人当工具'],
    ['规律性','按客观规律办事，别拍脑袋'],
    ['系统性','算总账，别只看局部'],
    ['控制性','能反馈、能纠偏'],
  ];
  let s='';
  items.forEach((it,i)=>{
    const x=30+(i%2)*250, y=34+Math.floor(i/2)*100;
    s += V.rect(x,y,230,80,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
    s += V.circle(x+30,y+40,17,String(i+1),{fill:'var(--accent)',stroke:'var(--accent)',color:'var(--on-fill)',fs:12});
    s += V.text(x+58,y+34,it[0],{anchor:'start',fs:13.5,fw:700,color:'var(--ink)'});
    s += V.text(x+58,y+56,it[1],{anchor:'start',fs:10.5,color:'var(--ink-3)'});
  });
  return V.svg(w,h,s);
};

*/

/* ---------- ch02 ---------- */
DIAGRAMS['plan-5w1h'] = () => {
  const w=560, h=230;
  const rows=[
    ['What','做什么','任务、要求、重点'],
    ['Why','为什么','宗旨、目标、战略'],
    ['When','何时','时间表、进度'],
    ['Where','何地','地点、场所'],
    ['Who','谁来做','责任人、协作'],
    ['How','怎么做','措施、政策、资源'],
  ];
  let s='';
  rows.forEach((r,i)=>{
    const x=30+(i%3)*180, y=30+Math.floor(i/3)*92;
    s += V.rect(x,y,166,76,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(x+83,y+24,r[0],{fs:15,fw:700,color:'var(--accent)'});
    s += V.text(x+83,y+44,r[1],{fs:12,fw:600,color:'var(--ink)'});
    s += V.text(x+83,y+62,r[2],{fs:9.5,color:'var(--ink-3)'});
  });
  return V.svg(w,h,s);
};

DIAGRAMS['rolling-plan'] = () => {
  // 滚动计划：近细远粗
  const w=580, h=230;
  let s='';
  const years=['2024','2025','2026','2027','2028'];
  years.forEach((y,i)=>{
    const x=40+i*106;
    const detailed = i===0;
    s += V.rect(x,50,96,54,'',{
      fill: detailed?'var(--accent-soft)':'var(--paper-2)',
      stroke: detailed?'var(--accent-line)':'var(--rule)'
    });
    s += V.text(x+48,74,y,{fs:12,fw:700,color:detailed?'var(--accent-ink)':'var(--ink-3)'});
    s += V.text(x+48,92,i===0?'具体到月':(i===1?'写到季度':'只写方向'),{fs:9.5,color:'var(--ink-3)'});
  });
  s += V.text(40,36,'近细远粗',{anchor:'start',fs:11,fw:700,color:'var(--accent)'});
  // 滚动箭头
  s += V.arrow(300,130,540,130,{stroke:'var(--accent)',sw:1.6});
  s += V.text(300,148,'执行一年后整体后移',{anchor:'start',fs:10,color:'var(--ink-3)'});
  s += V.text(290,186,'定期调整 · 按期顺延 · 适用于品种稳定的产/销计划',{fs:10,color:'var(--ink-3)'});
  return V.svg(w,h,s);
};

DIAGRAMS['plan-factors'] = () => {
  const w=520, h=230;
  const items=[['组织','层次与发展阶段'],['业务','性质与范围'],['环境','确定性程度'],['制定者','授权或自定'],['管理','管理水平']];
  let s='';
  /* 先辐条后中心圆（原版辐条压住「影响 因素」四字）。 */
  const spokes = items.map((it,i)=>{
    const a=-Math.PI/2+i*(2*Math.PI/5);
    return {it, x:260+Math.cos(a)*95, y:115+Math.sin(a)*82};
  });
  spokes.forEach(p=>{ s += V.line(260,115,p.x,p.y,{stroke:'var(--accent-line)'}); });
  s += V.circle(260,115,34,'影响\n因素',{fill:'var(--accent-soft)',stroke:'var(--accent)',color:'var(--accent-ink)',fs:10});
  spokes.forEach(p=>{
    const it=p.it, x=p.x, y=p.y;
    s += V.rect(x-46,y-20,92,40,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
    s += V.text(x,y-2,it[0],{fs:11.5,fw:700,color:'var(--ink)'});
    s += V.text(x,y+14,it[1],{fs:8.5,color:'var(--ink-3)'});
  });
  return V.svg(w,h,s);
};

DIAGRAMS['target-4req'] = () => {
  const w=540, h=200;
  const items=[['先进','跳一跳够得着'],['可实现','不能是天方夜谭'],['具体','能说清做什么'],['有时限','有截止日期']];
  let s='';
  items.forEach((it,i)=>{
    const x=24+i*132;
    s += V.rect(x,44,120,90,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
    s += V.circle(x+60,74,20,String(i+1),{fill:'var(--accent-soft)',stroke:'var(--accent)',color:'var(--accent-ink)',fs:12});
    s += V.text(x+60,112,it[0],{fs:12,fw:700,color:'var(--ink)'});
    s += V.text(x+60,128,it[1],{fs:8.5,color:'var(--ink-3)'});
  });
  s += V.text(270,24,'目标的四项要求（课件只有这四条中文要求；SMART 系课外助记）',{fs:10.5,fw:700,color:'var(--ink-3)'});
  s += V.text(270,172,'课外助记：可借 SMART（Specific·Measurable·Attainable·Relevant·Time-bound）辅助记忆，课件四条并不一一对应',{fs:8.5,color:'var(--ink-3)'});
  return V.svg(w,h,s);
};

/* ---------- ch03 ---------- */
DIAGRAMS['org-elements'] = () => {
  const w=520, h=220;
  const items=[['职责','该完成什么任务'],['职权','有多大权力'],['负责关系','上下级义务'],['结构图','关系体系']];
  let s='';
  /* 先辐条后中心圆：原版中心圆先画，辐条后画 → 线压在「组织 实体」上。 */
  const spokes = items.map((it,i)=>{
    const a=-Math.PI/2+i*(2*Math.PI/4);
    return {it, x:260+Math.cos(a)*105, y:110+Math.sin(a)*80};
  });
  spokes.forEach(p=>{ s += V.line(260,110,p.x,p.y,{stroke:'var(--accent-line)'}); });
  s += V.circle(260,110,38,'组织\n实体',{fill:'var(--accent-soft)',stroke:'var(--accent)',color:'var(--accent-ink)',fs:11});
  spokes.forEach(p=>{
    const it=p.it, x=p.x, y=p.y;
    s += V.rect(x-55,y-24,110,48,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
    s += V.text(x,y-4,it[0],{fs:11.5,fw:700,color:'var(--ink)'});
    s += V.text(x,y+13,it[1],{fs:8.5,color:'var(--ink-3)'});
  });
  return V.svg(w,h,s);
};

DIAGRAMS['org-views'] = () => {
  const w=560, h=240;
  const items=[
    ['理性模式','一台机器','分工·指挥链·照章办事','韦伯、泰罗'],
    ['开放系统','一个生物体','与环境交换物质能量','系统学派'],
    ['生态系统','一个群落','维生体系 + 创生体系','现代理论'],
  ];
  let s='';
  items.forEach((it,i)=>{
    const x=28+i*178;
    s += V.rect(x,40,166,120,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(x+83,66,it[0],{fs:13,fw:700,color:'var(--ink)'});
    s += V.text(x+83,90,it[1],{fs:11,color:'var(--accent-ink)'});
    s += V.wrap(x+83,112,it[2],11,14,{fs:9,color:'var(--ink-3)'});
    s += V.text(x+83,150,it[3],{fs:8.5,color:'var(--ink-3)'});
  });
  s += V.arrow(200,200,360,200,{stroke:'var(--accent)',sw:1.4});
  s += V.text(280,218,'机器 → 生物 → 群落，越来越「活」',{fs:10,color:'var(--ink-3)'});
  return V.svg(w,h,s);
};

DIAGRAMS['org-design-principles'] = () => {
  const w=560, h=270;
  const items=[
    ['专业化分工协作','分工提效，协作保整体'],
    ['目标至上、职能领先','结构服从目标'],
    ['有效管理幅度','管得过来的宽度'],
    ['责权利对等','有责必有权，有权必有利'],
    ['统一指挥','一人只能有一个直接上级'],
    ['因事设职结合因人设职','按事设岗，也顾及人'],
  ];
  let s='';
  items.forEach((it,i)=>{
    const x=24+(i%2)*272, y=26+Math.floor(i/2)*76;
    s += V.rect(x,y,256,62,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
    s += V.circle(x+26,y+31,15,String(i+1),{fill:'var(--accent-soft)',stroke:'var(--accent)',color:'var(--accent-ink)',fs:10});
    s += V.text(x+52,y+26,it[0],{anchor:'start',fs:11.5,fw:700,color:'var(--ink)'});
    s += V.text(x+52,y+44,it[1],{anchor:'start',fs:9,color:'var(--ink-3)'});
  });
  return V.svg(w,h,s);
};

DIAGRAMS['centralize-decentralize'] = () => {
  const w=560, h=250;
  let s='';
  // 左：集权
  s += V.rect(30,40,220,110,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
  s += V.circle(140,68,16,'决策',{fill:'var(--accent)',stroke:'var(--accent)',color:'var(--on-fill)',fs:9});
  [[90,120],[140,130],[190,120]].forEach(p=>{
    s += V.line(140,84,p[0],p[1]-12,{stroke:'var(--accent-line)'});
    s += V.circle(p[0],p[1],12,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
  });
  s += V.text(140,168,'集权：环境稳、规模小、危机时',{fs:9.5,color:'var(--ink-3)'});

  // 右：分权
  s += V.rect(310,40,220,110,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
  [[360,72],[420,72],[480,72],[360,120],[420,120],[480,120]].forEach((p,i)=>{
    s += V.circle(p[0],p[1],13,'',{fill: i<3?'var(--ok-soft)':'var(--accent-soft)',
      stroke: i<3?'var(--ok)':'var(--accent-line)'});
  });
  s += V.text(420,168,'分权：环境乱、规模大、下属强',{fs:9.5,color:'var(--ink-3)'});
  s += V.text(280,208,'过分集权的弊端：决策慢、适应差、高层陷入琐事、下属没干劲',{fs:9.5,color:'var(--bad)'});
  return V.svg(w,h,s);
};

DIAGRAMS['line-vs-staff'] = () => {
  const w=560, h=280;
  let s='';
  s += V.text(280,22,'直线职权 vs 参谋职权的四档权力',{fs:11,fw:700,color:'var(--ink-3)'});
  const levels=[
    ['建议权','我提我的，你听不听随你','var(--rule-strong)'],
    ['强制协商权','你必须先问我，但最后你定','var(--accent-line)'],
    ['共同决定权','我不点头，你签不了字','var(--accent)'],
    ['职能职权','我可以直接命令你的人','var(--bad)'],
  ];
  levels.forEach((L,i)=>{
    const y=44+i*54;
    const wBar=200+i*80;
    s += V.rect(40,y,wBar,40,'',{fill:'var(--paper-2)',stroke:L[2],sw:1.4});
    s += V.text(52,y+25,L[0],{anchor:'start',fs:11.5,fw:700,color:'var(--ink)'});
    s += V.text(52+wBar-12,y+25,L[1],{anchor:'end',fs:9,color:'var(--ink-3)'});
  });
  s += V.arrow(40,268,540,268,{stroke:'var(--ink-3)'});
  s += V.text(540,258,'权力递增',{anchor:'end',fs:9.5,color:'var(--ink-3)'});
  return V.svg(w,h,s);
};

DIAGRAMS['formal-informal'] = () => {
  const w=560, h=230;
  let s='';
  s += V.rect(30,30,240,140,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
  s += V.text(150,54,'正式组织',{fs:13,fw:700,color:'var(--ink)'});
  ['目的性','正规性','稳定性'].forEach((t,i)=>{
    s += V.text(150,80+i*24,'· '+t,{fs:10.5,color:'var(--ink-2)'});
  });
  s += V.text(150,158,'设计与文件明确规定',{fs:8.5,color:'var(--ink-3)'});

  s += V.rect(290,30,240,140,'',{fill:'var(--card)',stroke:'var(--rule-strong)',dash:'4 3'});
  s += V.text(410,54,'非正式组织',{fs:13,fw:700,color:'var(--ink)'});
  ['自发性','内聚性','不稳定性'].forEach((t,i)=>{
    s += V.text(410,80+i*24,'· '+t,{fs:10.5,color:'var(--ink-2)'});
  });
  s += V.text(410,158,'自发形成的人际网络',{fs:8.5,color:'var(--ink-3)'});

  s += V.text(280,200,'管理者的态度：因势利导（不取缔、不放任）',{fs:10,fw:600,color:'var(--accent-ink)'});
  return V.svg(w,h,s);
};

DIAGRAMS['culture-functions'] = () => {
  const w=580, h=250;
  // 五个作用（课件第 129—135 页，跨 7 页：规范后附「作用机理」页、凝聚跨两页）
  const items=[
    ['导向','指方向','把价值取向引导到组织目标上来'],
    ['规范','管行为','软约束，弥补规章制度不足'],
    ['凝聚','聚人心','情感纽带与思想纽带'],
    ['激励','给荣誉','人人受重视受尊重，贡献得赞赏'],
    ['辐射','树形象','内部形象 + 外部形象，影响社会'],
  ];
  let s='';
  s += V.text(290,20,'组织文化的作用（五个，不是三个）',{fs:11,fw:700,color:'var(--ink-3)'});
  items.forEach((it,i)=>{
    const x=20+i*112;
    s += V.rect(x,36,104,120,'',{fill:'var(--paper-2)',stroke:'var(--rule-strong)'});
    s += V.circle(x+52,72,26,it[0],{fill:'var(--accent-soft)',stroke:'var(--accent)',color:'var(--accent-ink)',fs:13});
    s += V.text(x+52,118,it[1],{fs:9.5,fw:600,color:'var(--ink)'});
    s += V.wrap(x+52,136,it[2],11,9,{fs:7.5,color:'var(--ink-3)'});
  });
  s += V.text(290,182,'制度管底线，文化管上限',{fs:10,color:'var(--ink-2)'});
  s += V.text(290,208,'⚠️ 后两个（激励、辐射）最容易被漏——有资料只列三个',{fs:9,fw:600,color:'var(--bad)'});
  return V.svg(w,h,s);
};

/* ---------- ch04 ---------- */
/* [已废弃] 旧版 human-assumptions 只画 4 种人性假设，漏理性人与主观理性人。
   现由后续批次的新版覆盖；此处整段注释，避免加载顺序变化时回退。
DIAGRAMS['human-assumptions'] = () => {
  const w=560, h=240;
  const items=[
    ['经济人','泰罗/X理论','天生懒惰，靠奖惩'],
    ['社会人','梅奥','要归属，重视人际关系'],
    ['自我实现人','麦格雷戈/Y理论','天生勤奋，给自主权'],
    ['复杂人','薛恩','因人因时因事而异'],
  ];
  let s='';
  s += V.text(280,22,'人性假设的演进（选择题高频）',{fs:11,fw:700,color:'var(--ink-3)'});
  items.forEach((it,i)=>{
    const x=26+i*134;
    s += V.rect(x,42,120,140,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
    s += V.text(x+60,68,it[0],{fs:12,fw:700,color:'var(--accent-ink)'});
    s += V.text(x+60,90,it[1],{fs:9,color:'var(--ink-3)'});
    s += V.wrap(x+60,116,it[2],10,13,{fs:9,color:'var(--ink-2)'});
  });
  s += V.text(280,212,'口诀：经济人怕罚、社会人怕孤、自我实现人要权',{fs:9.5,color:'var(--ink-3)'});
  return V.svg(w,h,s);
};

*/

DIAGRAMS['x-y-theory'] = () => {
  /* v11：原两张色卡高 180（y=36..216），而「管理方式」白卡 y=196..230 压住色卡底部 20px，
     色卡下边框被白卡盖掉、看上去像两张卡叠在一起。改为色卡收到 y=36..190，白卡从 196 起，留 6px 缝。 */
  const w=560, h=284;
  let s='';
  // X
  s += V.rect(30,36,236,154,'',{fill:'var(--bad-soft)',stroke:'rgba(140,59,51,.45)'});
  s += V.text(148,58,'X 理论',{fs:12.5,fw:700,color:'var(--bad)'});
  s += V.text(148,72,'课件第 26 页：把人的行为视为机器，需要外力作用才能产生',{fs:7.5,color:'var(--bad)'});
  s += V.text(148,83,'（性恶论·通用教材类比，非课件用语）',{fs:6.5,color:'var(--ink-3)'});
  ['人天生懒惰、不愿负责','工作为追求物质利益','个人目标与组织目标矛盾','多数人只能是被管理者'].forEach((t,i)=>{
    s += V.text(46,104+i*22,'· '+t,{anchor:'start',fs:9.5,color:'var(--ink-2)'});
  });
  s += V.rect(30,196,236,34,'管理方式：严格制度 · 权威督导 · 胡萝卜加大棒',
    {fill:'var(--card)',stroke:'var(--bad)',fs:8.5,color:'var(--bad)'});

  // Y
  s += V.rect(294,36,236,154,'',{fill:'var(--ok-soft)',stroke:'rgba(61,107,74,.45)'});
  s += V.text(412,58,'Y 理论',{fs:12.5,fw:700,color:'var(--ok)'});
  s += V.text(412,72,'课件第 26 页：把人视为一个有机的系统',{fs:7.5,color:'var(--ok)'});
  s += V.text(412,83,'（受外力＋内力影响＝讲义概括；性善论系通用教材类比）',{fs:6.5,color:'var(--ink-3)'});
  ['人天生勤奋、有责任心','有自我实现的愿望','追求自我实现时主动、有创造性'].forEach((t,i)=>{
    s += V.text(310,104+i*22,'· '+t,{anchor:'start',fs:9.5,color:'var(--ink-2)'});
  });
  s += V.rect(294,196,236,34,'管理方式：创造环境 · 目标管理 · 内在激励',
    {fill:'var(--card)',stroke:'var(--ok)',fs:8.5,color:'var(--ok)'});

  s += V.text(280,250,'「行为视为机器」→ X、「有机的系统」→ Y（均为课件第 26 页原话）',
    {fs:8,color:'var(--ink-3)'});
  s += V.text(280,266,'「胡萝卜加大棒」「自我实现/自主管理」→ 分别判 X/Y（第4章讲义概括用语；此二语见第1章课件p89—92，第4章无）',
    {fs:8,color:'var(--ink-3)'});
  return V.svg(w,h,s);
};

DIAGRAMS['leadership-grid'] = () => {
  // 管理方格（1,1)(9,1)(1,9)(5,5)(9,9)
  const w=480, h=440;
  let s='';
  const X0=90, Y0=40, SZ=300;
  s += V.rect(X0,Y0,SZ,SZ,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
  // 中线
  s += V.line(X0+SZ/2,Y0,X0+SZ/2,Y0+SZ,{stroke:'var(--rule)',dash:'3 3'});
  s += V.line(X0,Y0+SZ/2,X0+SZ,Y0+SZ/2,{stroke:'var(--rule)',dash:'3 3'});
  const pts=[
    [1,1,'1,1\n放任式'], [9,1,'9,1\n任务型'],
    [1,9,'1,9\n俱乐部式'], [5,5,'5,5\n中庸型'], [9,9,'9,9\n团队式'],
  ];
  pts.forEach(p=>{
    const x = X0 + (p[0]/10)*SZ;
    const y = Y0 + SZ - (p[1]/10)*SZ;
    const isBest = p[0]===9 && p[1]===9;
    s += V.circle(x,y,26,'',{
      fill: isBest?'var(--ok-soft)':'var(--card)',
      stroke: isBest?'var(--ok)':'var(--rule-strong)',
      sw: isBest?2:1.2
    });
    s += `<text x="${x}" y="${y+2}" text-anchor="middle" style="font-size:10px;font-weight:700;fill:${isBest?'var(--ok)':'var(--ink)'}">${p[0]},${p[1]}</text>`;
    /* v11：四角标签原按 y±24/-30 放，正好压在方格边框上（「俱乐部式/团队式」骑上边线、
       「放任式/任务型」骑下边线）。四角标签一律移到框外，中间点仍放圆上方。 */
    const labelY = p[1]===9 ? Y0-10 : (p[1]===1 ? Y0+SZ+18 : y-30);
    s += V.text(x,labelY,p[2].split('\n')[1],{fs:9,color:isBest?'var(--ok)':'var(--ink-3)'});
  });
  s += V.text(X0+SZ/2, Y0+SZ+42,'关心生产（任务） →',{fs:10,color:'var(--ink-3)'});
  s += `<text x="${X0-26}" y="${Y0+SZ/2}" text-anchor="middle" transform="rotate(-90 ${X0-26} ${Y0+SZ/2})" style="font-size:10px;fill:var(--ink-3)">关心人 →</text>`;
  s += V.text(240,20,'管理方格理论：5 种典型领导方式',{fs:10.5,fw:700,color:'var(--ink-3)'});
  return V.svg(w,h,s);
};

DIAGRAMS['fiedler'] = () => {
  const w=580, h=250;
  let s='';
  s += V.text(290,20,'菲德勒权变模型：情境有利 → 任务导向；情境中等 → 关系导向',{fs:10.5,fw:700,color:'var(--ink-3)'});
  const seg=[
    ['有利','关系好 · 任务明确 · 职位权力强','任务导向','var(--ok)'],
    ['中等','三者部分具备','关系导向','var(--warn)'],
    ['不利','关系差 · 任务模糊 · 权力弱','任务导向','var(--bad)'],
  ];
  seg.forEach((g,i)=>{
    const x=30+i*180;
    s += V.rect(x,42,166,150,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(x+83,68,g[0]+'情境',{fs:12.5,fw:700,color:g[3]});
    s += V.wrap(x+83,92,g[1],11,14,{fs:9,color:'var(--ink-3)'});
    s += V.rect(x+22,140,122,34,'适合：'+g[2],{fill:'var(--card)',stroke:g[3],fs:9.5,color:g[3]});
  });
  s += V.text(290,222,'情境因素三个：上下级关系 · 任务结构 · 职位权力',{fs:9.5,color:'var(--ink-3)'});
  return V.svg(w,h,s);
};

DIAGRAMS['two-factor'] = () => {
  const w=560, h=280;
  let s='';
  // 左右两条
  s += V.rect(30,40,236,90,'',{fill:'var(--warn-soft)',stroke:'rgba(138,99,32,.62)'});
  s += V.text(148,66,'保健因素',{fs:13,fw:700,color:'var(--warn)'});
  s += V.text(148,88,'工资 · 政策 · 环境 · 安全',{fs:9.5,color:'var(--ink-2)'});
  s += V.text(148,108,'→ 消除不满，但不产生满意',{fs:9,color:'var(--ink-3)'});

  s += V.rect(294,40,236,90,'',{fill:'var(--ok-soft)',stroke:'rgba(61,107,74,.62)'});
  s += V.text(412,66,'激励因素',{fs:13,fw:700,color:'var(--ok)'});
  s += V.text(412,88,'成就 · 认可 · 成长 · 责任',{fs:9.5,color:'var(--ink-2)'});
  s += V.text(412,108,'→ 才产生满意',{fs:9,color:'var(--ink-3)'});

  // 坐标轴关系
  s += V.line(60,180,500,180,{stroke:'var(--rule-strong)'});
  s += V.line(60,150,60,210,{stroke:'var(--rule-strong)'});
  s += V.text(30,182,'不满',{fs:9,color:'var(--bad)'});
  s += V.text(520,182,'满意',{fs:9,color:'var(--ok)'});
  s += V.text(150,166,'不满意',{fs:9.5,color:'var(--bad)'});
  s += V.text(280,166,'没有不满意',{fs:9.5,color:'var(--ink-3)'});
  s += V.text(410,166,'满意',{fs:9.5,color:'var(--ok)'});
  s += V.text(280,222,'「满意」的反面是「没有满意」，不是「不满意」',{fs:10,fw:600,color:'var(--accent-ink)'});
  s += V.text(280,248,'钱只能让人不抱怨，不能让人拼命',{fs:9.5,color:'var(--ink-3)'});
  return V.svg(w,h,s);
};

DIAGRAMS['equity'] = () => {
  const w=560, h=260;
  let s='';
  s += V.text(280,22,'公平理论：不只比绝对值，更比相对值',{fs:11,fw:700,color:'var(--ink-3)'});
  // 三个结果
  const res=[
    ['公平','继续原努力','var(--ok)'],
    ['报酬偏低','减少投入 / 要求加薪','var(--bad)'],
    ['报酬偏高','增加投入（较罕见）','var(--warn)'],
  ];
  res.forEach((r,i)=>{
    const y=50+i*58;
    s += V.rect(40,y,150,44,r[0],{fill:'var(--paper-2)',stroke:'var(--rule-strong)',fs:11,color:'var(--ink)'});
    s += V.arrow(196,y+22,236,y+22,{stroke:'var(--ink-3)'});
    s += V.rect(244,y,290,44,r[1],{fill:'var(--card)',stroke:r[2],fs:10,color:r[2]});
  });
  s += V.text(280,236,'比较对象：横向（与他人）、纵向（与自己的过去）',{fs:9.5,color:'var(--ink-3)'});
  return V.svg(w,h,s);
};

DIAGRAMS['communication'] = () => {
  const w=580, h=202;
  let s='';
  const nodes=[
    ['发送者',40],['编码',140],['信息',250],['通道',350],['解码',450],['接收者',540]
  ];
  nodes.forEach((n,i)=>{
    s += V.circle(n[1],86,32,'',{
      fill: i===0||i===5?'var(--accent-soft)':'var(--card)',
      stroke: i===0||i===5?'var(--accent)':'var(--rule-strong)'
    });
    s += V.text(n[1],90,n[0],{fs:9.5,fw:600,color:'var(--ink)'});
    if(i<nodes.length-1){
      s += V.arrow(n[1]+34,86,nodes[i+1][1]-34,86,{stroke:'var(--accent-line)',sw:1.3});
    }
  });
  // 反馈
  s += V.arrow(540,124,40,124,{stroke:'var(--ink-3)',dash:'4 3'});
  s += V.text(290,142,'反馈',{fs:9.5,color:'var(--ink-3)'});
  s += V.text(290,170,'沟通障碍：语言歧义 · 层级过滤 · 情绪 · 选择性知觉',{fs:9,color:'var(--ink-3)'});
  s += V.text(290,192,'⚠️ 通用框架示意，非第 4 章课件正文',{fs:8.5,color:'var(--ink-3)'});
  return V.svg(w,h,s);
};

DIAGRAMS['leadership-trait'] = () => {
  const w=540, h=230;
  const items=[['特质理论','领导者天生具备某些特质','解释力弱'],['行为理论','研究领导者做什么','俄亥俄/莱温/CPM'],['权变理论','看情境，没有万能风格','菲德勒/通路-目标']];
  let s='';
  items.forEach((it,i)=>{
    const x=26+i*172;
    s += V.rect(x,36,160,130,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.circle(x+80,66,18,String(i+1),{fill:'var(--accent-soft)',stroke:'var(--accent)',color:'var(--accent-ink)',fs:11});
    s += V.text(x+80,98,it[0],{fs:12,fw:700,color:'var(--ink)'});
    s += V.wrap(x+80,120,it[1],11,14,{fs:9,color:'var(--ink-2)'});
    s += V.text(x+80,156,it[2],{fs:8.5,color:'var(--ink-3)'});
    if(i<2) s += V.arrow(x+162,100,x+172,100,{stroke:'var(--accent)',sw:1.3});
  });
  s += V.text(270,196,'演进：看「人」→ 看「行为」→ 看「情境」',{fs:10,color:'var(--ink-3)'});
  return V.svg(w,h,s);
};

/* ---------- ch05 ---------- */
DIAGRAMS['control-types'] = () => {
  const w=580, h=260;
  let s='';
  // 时间轴
  s += V.line(40,120,540,120,{stroke:'var(--rule-strong)',sw:1.4});
  const marks=[['投入 开始',40],['过程进行中',290],['产出/结果',540]];
  marks.forEach(m=>{
    s += V.line(m[1],112,m[1],128,{stroke:'var(--rule-strong)'});
    s += V.text(m[1],146,m[0],{fs:9,color:'var(--ink-3)'});
  });
  const types=[
    ['前馈控制','事前防 —— 防患于未然',100,'var(--ok)'],
    ['同期控制','事中管 —— 监督 + 指导',290,'var(--accent)'],
    ['反馈控制','事后算 —— 亡羊补牢',480,'var(--bad)'],
  ];
  types.forEach((t,i)=>{
    const y = i===1 ? 60 : 196;
    s += V.rect(t[2]-90,y-46,180,58,'',{fill:'var(--paper-2)',stroke:t[3],sw:1.4});
    s += V.text(t[2],y-24,t[0],{fs:11.5,fw:700,color:t[3]});
    s += V.text(t[2],y-6,t[1],{fs:8.5,color:'var(--ink-3)'});
    s += V.line(t[2],i===1?y+12:y-46, t[2], i===1?120:112, {stroke:t[3],dash:'3 3'});
  });
  return V.svg(w,h,s);
};

DIAGRAMS['control-process'] = () => {
  const w=560, h=200;
  let s='';
  const steps=[['确定标准','依据计划方案'],['衡量绩效','及时发现偏差'],['采取措施','纠偏/改标准/正强化']];
  steps.forEach((st,i)=>{
    const x=36+i*176;
    s += V.rect(x,50,150,74,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
    s += V.circle(x+24,74,14,String(i+1),{fill:'var(--accent)',stroke:'var(--accent)',color:'var(--on-fill)',fs:11});
    s += V.text(x+48,78,st[0],{anchor:'start',fs:11.5,fw:700,color:'var(--ink)'});
    s += V.text(x+75,108,st[1],{fs:9,color:'var(--ink-3)'});
    if(i<2) s += V.arrow(x+152,87,x+176,87,{stroke:'var(--accent)',sw:1.4});
  });
  s += V.arrow(480,128,110,128,{stroke:'var(--ink-3)',dash:'4 3'});
  s += V.text(295,152,'反馈循环',{fs:9,color:'var(--ink-3)'});
  return V.svg(w,h,s);
};

DIAGRAMS['control-principles'] = () => {
  const w=560, h=280;
  const groups=[
    ['方向与重点（前五条）',['未来导向','反映计划要求','组织适应性','关键点','例外'],'var(--accent)'],
    ['操作要求（后五条）',['及时性','客观性','准确性','弹性','经济性'],'var(--ok)'],
  ];
  let s='';
  groups.forEach((g,gi)=>{
    const y=30+gi*124;
    s += V.text(30,y,'',{});
    s += V.text(30,y,'',{});
    s += `<text x="30" y="${y}" style="font-size:11px;font-weight:700;fill:${g[2]}">${g[0]}</text>`;
    g[1].forEach((t,i)=>{
      const x=30+i*104;
      s += V.rect(x,y+14,96,52,t,{fill:'var(--paper-2)',stroke:'var(--rule-strong)',fs:10.5});
    });
  });
  return V.svg(w,h,s);
};

DIAGRAMS['mis'] = () => {
  const w=580, h=230;
  let s='';
  const steps=[['确定信息需求','先搞清要什么'],['收集加工','采集与处理'],['提供服务','给管理者用'],['系统管理','全局维护']];
  steps.forEach((st,i)=>{
    const x=26+i*140;
    s += V.rect(x,50,126,86,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
    s += V.circle(x+20,74,12,String(i+1),{fill:'var(--accent)',stroke:'var(--accent)',color:'var(--on-fill)',fs:10});
    s += V.text(x+63,74,st[0],{fs:9.5,fw:700,color:'var(--ink)'});
    s += V.text(x+63,108,st[1],{fs:8.5,color:'var(--ink-3)'});
    if(i<3) s += V.arrow(x+128,93,x+140,93,{stroke:'var(--accent)',sw:1.3});
  });
  s += V.text(290,166,'四项职能串行：后一项必须以前一项完成为基础',{fs:9.5,color:'var(--ink-3)'});
  return V.svg(w,h,s);
};

/* ---------- ch06 ---------- */
DIAGRAMS['crisis-lifecycle'] = () => {
  const w=600, h=330;
  let s='';
  s += V.text(300,18,'危机管理两大块（课件第 11 页：按危机发展过程分为两部分；前者比后者更为重要）',
    {fs:9,fw:700,color:'var(--ink-3)'});

  // 左块：爆发前 预测防范管理（第 12—13 页）
  s += V.rect(16,34,286,208,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
  s += V.text(159,54,'一、危机爆发前：预测防范管理',{fs:9.5,fw:700,color:'var(--accent-ink)'});
  s += V.text(28,76,'① 居安思危，分析预测可能发生的危机情境',{anchor:'start',fs:7.4,color:'var(--ink-2)'});
  s += V.text(28,92,'② 超前决策，精心策划全面的危机反应计划',{anchor:'start',fs:7.4,color:'var(--ink-2)'});
  s += V.text(36,106,'· 制定各种危机预案·组建危机管理小组·培训并「模拟危机」演习',{anchor:'start',fs:6.6,color:'var(--ink-3)'});
  s += V.text(28,124,'③ 采取灵活多样的避险经营策略',{anchor:'start',fs:7.4,color:'var(--ink-2)'});
  s += V.text(36,138,'① 多角化经营——多元化分散市场风险',{anchor:'start',fs:6.6,color:'var(--ink-3)'});
  s += V.text(36,152,'② 联合经营——农工商/产供销/内外贸一体化、风险共担',{anchor:'start',fs:6.6,color:'var(--ink-3)'});
  s += V.text(36,166,'③ 市场多域化',{anchor:'start',fs:6.6,color:'var(--ink-3)'});
  s += V.text(36,180,'④ 多渠道经营',{anchor:'start',fs:6.6,color:'var(--ink-3)'});
  s += V.text(36,194,'⑤ 研制新产品、开发市场——防原产品淘汰断档',{anchor:'start',fs:6.6,color:'var(--ink-3)'});
  s += V.text(159,222,'（避险策略共 5 条，课件第 13 页）',{fs:6.8,color:'var(--ink-3)'});

  // 右块：爆发后 应急善后管理（第 14—17 页）
  s += V.rect(314,34,270,208,'',{fill:'var(--ok-soft)',stroke:'rgba(61,107,74,.35)'});
  s += V.text(449,54,'二、危机爆发后：应急善后管理',{fs:9.5,fw:700,color:'var(--ok)'});
  s += V.text(326,74,'（1）一般规则（第 14 页）',{anchor:'start',fs:7.4,fw:600,color:'var(--ink)'});
  s += V.text(332,88,'① 将公众利益置于首位，以企业长远发展为出发点',{anchor:'start',fs:6.6,color:'var(--ink-2)'});
  s += V.text(332,102,'② 迅速成立危机控制中心',{anchor:'start',fs:6.6,color:'var(--ink-2)'});
  s += V.text(332,116,'③ 加强与公众沟通，争取谅解与支持（基本对策）',{anchor:'start',fs:6.6,color:'var(--ink-2)'});
  s += V.text(332,130,'④ 总结经验教训，改善企业体系（重要内容）',{anchor:'start',fs:6.6,color:'var(--ink-2)'});
  s += V.text(326,150,'（2）六种策略方法（第 15—17 页）',{anchor:'start',fs:7.4,fw:600,color:'var(--ink)'});
  const strat=['①中止：审时度势主动中止损失（关厂/停产品）','②隔离：切断涟漪效应、防危机扩散',
               '③利用：综合权衡后取得有利结果','④排除：工程物理法 + 员工行为法',
               '⑤分担：合资/合作/股票，多方共担','⑥避强就弱：选损害小的策略'];
  strat.forEach((x,i)=>{ s += V.text(332,164+i*13,x,{anchor:'start',fs:6.4,color:'var(--ink-2)'}); });

  s += V.text(300,258,'选用标准（课件第 17 页）：「以最少的费用，获得最好的危机管理效果」',{fs:8,fw:600,color:'var(--accent-ink)'});
  s += V.text(300,280,'（注：本课件未讲 5S；但题库已收 6 章简答「危机公关 5S 原则」——承担责任/真诚沟通/速度第一/系统运行/权威证实，须另行掌握）',{fs:7.2,color:'var(--bad)'});
  return V.svg(w,h,s);
};

/* [已废弃] 旧版 crisis-types 七类几乎全错（含公害安全/法律纠纷/政治风险），四特点也错。
   现由后续批次的新版覆盖；此处整段注释，避免加载顺序变化时回退。
DIAGRAMS['crisis-types'] = () => {
  const w=560, h=250;
  const items=['人才流失','产品/服务危机','财务危机','品牌信誉危机','公害与安全','法律纠纷','政治/政策风险'];
  let s='';
  s += V.circle(280,120,46,'危机\n情境',{fill:'var(--bad-soft)',stroke:'var(--bad)',color:'var(--bad)',fs:12});
  items.forEach((t,i)=>{
    const a=-Math.PI/2+i*(2*Math.PI/7);
    const x=280+Math.cos(a)*128, y=120+Math.sin(a)*88;
    s += V.line(280,120,x,y,{stroke:'rgba(140,59,51,.35)'});
    s += V.rect(x-44,y-14,88,28,t,{fill:'var(--card)',stroke:'var(--rule-strong)',fs:8.5});
  });
  return V.svg(w,h,s);
};

*/

DIAGRAMS['flexible-mgmt'] = () => {
  const w=560, h=250;
  // 严格按课件 6.2.2 的五个编号标题（第 22—25 页）
  const items=[
    ['1. 按订单定产量','根据订单而非库存来决定产量'],
    ['2. 建立弹性生产体系','只在必要的时间生产必要数量的必要产品'],
    ['3. 人员素质要求很高','工人要懂电脑、管理人员要有市场反应能力'],
    ['4. 生产区位趋于集中','零配件供应商靠近装配厂，实现零库存'],
    ['5. 组织机构增强柔性','少层次、网络型代替多层次、垂直型'],
  ];
  let s='';
  items.forEach((it,i)=>{
    const x=24+(i%3)*180, y=34+Math.floor(i/3)*96;
    s += V.rect(x,y,166,76,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
    s += V.text(x+83,y+28,it[0],{fs:11.5,fw:700,color:'var(--accent-ink)'});
    s += V.wrap(x+83,y+50,it[1],12,13,{fs:9,color:'var(--ink-3)'});
  });
  s += V.text(280,220,'注意：生产区位是「趋于集中」，不是分散（常设陷阱）',{fs:9,color:'var(--bad)'});
  return V.svg(w,h,s);
};

DIAGRAMS['knowledge-types'] = () => {
  const w=520, h=210;
  let s='';
  s += V.rect(30,40,210,100,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
  s += V.text(135,68,'显性知识',{fs:13,fw:700,color:'var(--accent-ink)'});
  s += V.text(135,92,'可编码、可记录',{fs:9.5,color:'var(--ink-2)'});
  s += V.text(135,110,'手册、文档、数据库',{fs:9,color:'var(--ink-3)'});

  s += V.rect(280,40,210,100,'',{fill:'var(--paper-2)',stroke:'var(--rule)',dash:'4 3'});
  s += V.text(385,68,'隐性知识',{fs:13,fw:700,color:'var(--warn)'});
  s += V.text(385,92,'经验、直觉、诀窍',{fs:9.5,color:'var(--ink-2)'});
  s += V.text(385,110,'难表达、难传递',{fs:9,color:'var(--ink-3)'});

  s += V.text(260,78,'两类知识',{fs:8,color:'var(--ink-3)'});
  s += V.text(260,170,'课件按两种策略分别处理：显性化＝人到文档；隐性化＝人到人（非相互转化）',
    {fs:8.5,color:'var(--ink-3)'});
  return V.svg(w,h,s);
};

DIAGRAMS['learning-org'] = () => {
  const w=540, h=250;
  const items=[['系统思考','第五项修炼 · 核心'],['自我超越','个人愿景'],['改善心智模式','反思假设'],['建立共同愿景','共同图景'],['团队学习','集体智慧']];
  let s='';
  items.forEach((it,i)=>{
    const x=24+(i%3)*172, y=34+Math.floor(i/3)*96;
    const core = i===0;
    s += V.rect(x,y,160,76,'',{
      fill: core?'var(--accent-soft)':'var(--card)',
      stroke: core?'var(--accent)':'var(--rule-strong)'
    });
    s += V.text(x+80,y+30,it[0],{fs:11,fw:700,color:core?'var(--accent-ink)':'var(--ink)'});
    s += V.text(x+80,y+52,it[1],{fs:9,color:'var(--ink-3)'});
  });
  s += V.text(270,222,'彼得·圣吉《第五项修炼》：系统思考统合其余四项',{fs:9.5,color:'var(--ink-3)'});
  return V.svg(w,h,s);
};

DIAGRAMS['virtual-org'] = () => {
  /* v11：原「物流公司」框 y=210、高 36 → 底边 246 出画布（h=240），且压住 y=232 的图注。
     画布加高到 268，底部伙伴上移到 y=196，图注下移到 y=258。 */
  const w=560, h=268;
  let s='';
  const partners=[['独立制造商',80,50],['研发机构',80,186],['物流公司',280,196],['销售代理',480,186],['广告代理',480,50]];
  /* 先画连线再画中心圆：原版中心圆先画，虚线后画 → 线穿过「经理 公司」。 */
  partners.forEach(p=>{ s += V.line(280,120,p[1],p[2]-18,{stroke:'var(--accent-line)',dash:'4 3'}); });
  s += V.circle(280,120,40,'经理\n公司',{fill:'var(--accent-soft)',stroke:'var(--accent)',color:'var(--accent-ink)',fs:10});
  partners.forEach(p=>{
    s += V.rect(p[1]-54,p[2]-18,108,36,'',{fill:'var(--card)',stroke:'var(--rule-strong)',fs:9});
    s += V.text(p[1],p[2]+2,p[0],{fs:9,color:'var(--ink)'});
  });
  s += V.text(280,258,'以契约关系联结，无行政隶属、无产权关系',{fs:9,color:'var(--ink-3)'});
  return V.svg(w,h,s);
};

/* ---------- ch07 ---------- */
DIAGRAMS['enterprise-features'] = () => {
  const w=540, h=220;
  const items=[['市场化 · 营利','基本职能是提供商品服务，盈利是最终追求'],['自主经营 · 自负盈亏','产权独立、经营独立、独立核算'],['依法设立 · 依法经营','依法设立经营，能独立享有权利承担义务']];
  let s='';
  items.forEach((it,i)=>{
    const y=30+i*62;
    s += V.rect(30,y,480,52,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.circle(56,y+26,16,String(i+1),{fill:'var(--accent)',stroke:'var(--accent)',color:'var(--on-fill)',fs:11});
    s += V.text(84,y+22,it[0],{anchor:'start',fs:12,fw:700,color:'var(--ink)'});
    s += V.text(84,y+40,it[1],{anchor:'start',fs:9,color:'var(--ink-3)'});
  });
  s += V.text(270,214,'注意：盈利是主要目的，社会责任是必须承担的义务（非主要目的）',{fs:8.5,color:'var(--bad)'});
  return V.svg(w,h,s);
};

DIAGRAMS['enterprise-types'] = () => {
  const w=560, h=270;
  const groups=[
    ['按所有制','国有 · 集体 · 混合 · 私营'],
    ['按行业','工业 · 农业 · 商业 · 运输 · 建筑 · 金融'],
    ['按生产要素','资金密集 · 劳动密集 · 知识密集'],
    ['按责任性质','无限责任（合伙） · 有限责任（公司）'],
  ];
  let s='';
  groups.forEach((g,i)=>{
    const y=26+i*62;
    s += V.rect(30,y,500,52,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
    s += V.text(52,y+31,g[0],{anchor:'start',fs:11,fw:700,color:'var(--accent-ink)'});
    s += V.text(200,y+31,g[1],{anchor:'start',fs:10,color:'var(--ink-2)'});
  });
  return V.svg(w,h,s);
};

DIAGRAMS['llc-conditions'] = () => {
  const w=540, h=250;
  const items=[['人','股东 2~50 人'],['钱','出资达最低限额'],['章','全体股东共同制定章程'],['名','有名称与组织机构'],['地','固定场所与生产条件']];
  let s='';
  items.forEach((it,i)=>{
    const x=24+i*100;
    s += V.rect(x,50,90,96,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
    s += V.circle(x+45,80,20,it[0],{fill:'var(--accent-soft)',stroke:'var(--accent)',color:'var(--accent-ink)',fs:14});
    s += V.wrap(x+45,114,it[1],5,13,{fs:8.5,color:'var(--ink-3)'});
  });
  s += V.text(270,26,'有限责任公司设立五条件：人 · 钱 · 章 · 名 · 地',{fs:10.5,fw:700,color:'var(--ink-3)'});
  s += V.text(270,180,'关键数字：股东 2 个以上、50 个以下（必背）',{fs:10,fw:600,color:'var(--accent-ink)'});
  s += V.text(270,208,'对比：股份有限公司有发起设立与募集设立两种方式（第27页）',{fs:9,color:'var(--ink-3)'});
  return V.svg(w,h,s);
};

DIAGRAMS['ma-types'] = () => {
  const w=560, h=260;
  let s='';
  s += V.text(280,20,'并购三词，看「谁还活着」',{fs:10.5,fw:700,color:'var(--ink-3)'});
  // 兼并
  s += V.circle(80,70,26,'A',{fill:'var(--accent)',stroke:'var(--accent)',color:'var(--on-fill)',fs:13});
  s += V.arrow(110,70,150,70,{stroke:'var(--accent)',sw:1.5});
  s += V.circle(186,70,20,'B',{fill:'var(--paper-3)',stroke:'var(--rule-strong)',color:'var(--ink-3)',fs:11});
  s += V.text(133,44,'兼并',{fs:10,fw:700,color:'var(--accent-ink)'});
  s += V.text(133,110,'B 失去法人资格',{fs:8.5,color:'var(--ink-3)'});

  // 吸收合并
  s += V.circle(80,160,24,'A',{fill:'var(--accent)',stroke:'var(--accent)',color:'var(--on-fill)',fs:12});
  s += V.circle(130,160,20,'B',{fill:'var(--paper-3)',stroke:'var(--rule-strong)',color:'var(--ink-3)',fs:11});
  s += V.arrow(158,160,190,160,{stroke:'var(--accent)',sw:1.5});
  s += V.circle(218,160,24,'A',{fill:'var(--accent)',stroke:'var(--accent)',color:'var(--on-fill)',fs:12});
  s += V.text(150,206,'吸收合并：A + B → A（B 解散）',{fs:8.5,color:'var(--ink-3)'});
  s += V.text(150,134,'吸收合并',{fs:9.5,fw:700,color:'var(--accent-ink)'});

  // 新设合并
  s += V.circle(330,70,22,'A',{fill:'var(--accent)',stroke:'var(--accent)',color:'var(--on-fill)',fs:12});
  s += V.circle(380,70,22,'B',{fill:'var(--accent)',stroke:'var(--accent)',color:'var(--on-fill)',fs:12});
  s += V.arrow(406,70,440,70,{stroke:'var(--ok)',sw:1.5});
  s += V.circle(470,70,24,'C',{fill:'var(--ok)',stroke:'var(--ok)',color:'var(--on-fill)',fs:12});
  s += V.text(380,32,'新设合并',{fs:10,fw:700,color:'var(--ok)'});
  s += V.text(380,110,'A + B → C（原各方解散）',{fs:8.5,color:'var(--ink-3)'});

  // 收购
  s += V.circle(370,160,24,'A',{fill:'var(--accent)',stroke:'var(--accent)',color:'var(--on-fill)',fs:12});
  s += V.arrow(400,160,440,160,{stroke:'var(--warn)',sw:1.5});
  s += V.circle(476,160,24,'B',{fill:'var(--warn-soft)',stroke:'var(--warn)',color:'var(--warn)',fs:12});
  s += V.text(423,134,'收购（控股）',{fs:9.5,fw:700,color:'var(--warn)'});
  s += V.text(423,206,'B 可能仍存续，只是被控制',{fs:8.5,color:'var(--ink-3)'});

  return V.svg(w,h,s);
};

DIAGRAMS['spin-off'] = () => {
  const w=540, h=240;
  let s='';
  // 派生分立
  s += V.circle(80,80,30,'母\n公司',{fill:'var(--accent-soft)',stroke:'var(--accent)',color:'var(--accent-ink)',fs:10});
  s += V.arrow(114,80,160,80,{stroke:'var(--accent)',sw:1.4});
  s += V.circle(200,80,26,'新\n公司',{fill:'var(--card)',stroke:'var(--rule-strong)',fs:10});
  s += V.text(140,36,'派生分立',{fs:10,fw:700,color:'var(--accent-ink)'});
  s += V.text(140,134,'母公司存续，但需减资',{fs:8.5,color:'var(--ink-3)'});

  // 新设分立
  s += V.circle(360,80,30,'母\n公司',{fill:'var(--paper-3)',stroke:'var(--rule-strong)',color:'var(--ink-3)',fs:10});
  s += V.arrow(394,72,430,50,{stroke:'var(--ok)',sw:1.4});
  s += V.arrow(394,88,430,110,{stroke:'var(--ok)',sw:1.4});
  s += V.circle(462,44,22,'A',{fill:'var(--ok-soft)',stroke:'var(--ok)',color:'var(--ok)',fs:11});
  s += V.circle(462,116,22,'B',{fill:'var(--ok-soft)',stroke:'var(--ok)',color:'var(--ok)',fs:11});
  s += V.text(400,166,'新设分立',{fs:10,fw:700,color:'var(--ok)'});
  s += V.text(400,186,'原公司解散，分成几家新公司',{fs:8.5,color:'var(--ink-3)'});

  s += V.text(270,218,'剥离 = 卖掉拿现金；分立 = 股份分给股东（不拿现金）',{fs:9.5,color:'var(--accent-ink)'});
  return V.svg(w,h,s);
};

DIAGRAMS['basic-work'] = () => {
  const w=560, h=250;
  const items=['标准化','定额','信息','计量','规章制度','职业培训'];
  let s='';
  items.forEach((t,i)=>{
    const x=24+(i%3)*180, y=36+Math.floor(i/3)*96;
    s += V.rect(x,y,166,74,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
    s += V.circle(x+24,y+26,14,String(i+1),{fill:'var(--accent-soft)',stroke:'var(--accent)',color:'var(--accent-ink)',fs:10});
    s += V.text(x+46,y+30,t,{anchor:'start',fs:12.5,fw:700,color:'var(--ink)'});
  });
  s += V.text(280,226,'六项基础工作：给别人提供资料、准则、手段、前提条件',{fs:9,color:'var(--ink-3)'});
  return V.svg(w,h,s);
};

/* ---------- ch08 ---------- */
/* [已废弃] 旧版 strategy-elements 只有四要素，缺三层战略体系。
   现由后续批次的新版覆盖；此处整段注释，避免加载顺序变化时回退。
DIAGRAMS['strategy-elements'] = () => {
  const w=540, h=230;
  const items=[['经营范围','干哪一行'],['资源配置','钱和人怎么摆'],['竞争优势','凭什么比人强'],['协同作用','1+1 > 2（乘数效应）']];
  let s='';
  s += V.circle(270,110,40,'战略\n四要素',{fill:'var(--accent-soft)',stroke:'var(--accent)',color:'var(--accent-ink)',fs:10});
  items.forEach((it,i)=>{
    const a=-Math.PI/2+i*(2*Math.PI/4);
    const x=270+Math.cos(a)*112, y=110+Math.sin(a)*82;
    s += V.line(270,110,x,y,{stroke:'var(--accent-line)'});
    s += V.rect(x-62,y-24,124,48,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
    s += V.text(x,y-4,it[0],{fs:11,fw:700,color:'var(--ink)'});
    s += V.text(x,y+13,it[1],{fs:8,color:'var(--ink-3)'});
  });
  return V.svg(w,h,s);
};

*/

DIAGRAMS['pestn'] = () => {
  const w=560, h=250;
  const items=[
    ['P 政治','政策 · 法律 · 政局','var(--accent)'],
    ['E 经济','增长率 · 利率 · 汇率','var(--ok)'],
    ['S 社会文化','人口 · 价值观 · 风俗','var(--warn)'],
    ['T 科技','技术趋势 · 新材料','var(--accent-ink)'],
    ['N 自然','资源 · 环境 · 生态','var(--ok)'],
  ];
  let s='';
  items.forEach((it,i)=>{
    const x=24+(i%3)*180, y=36+Math.floor(i/3)*96;
    s += V.rect(x,y,166,76,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(x+83,y+28,it[0],{fs:12.5,fw:700,color:it[2]});
    s += V.wrap(x+83,y+50,it[1],11,13,{fs:9,color:'var(--ink-3)'});
  });
  s += V.text(280,226,'利率→E　老龄化→S　新技术→T　政策法规→P　环保→N',{fs:9,color:'var(--ink-3)'});
  return V.svg(w,h,s);
};

DIAGRAMS['value-chain'] = () => {
  const w=580, h=240;
  let s='';
  s += V.text(290,20,'波特价值链：基本活动 + 支持性活动',{fs:10.5,fw:700,color:'var(--ink-3)'});
  const basic=['进货物流','生产','发货物流','市场营销','售后'];
  basic.forEach((t,i)=>{
    const x=24+i*110;
    s += V.rect(x,148,100,44,t,{fill:'var(--accent-soft)',stroke:'var(--accent-line)',fs:9.5,color:'var(--accent-ink)'});
    if(i<4) s += V.arrow(x+102,170,x+110,170,{stroke:'var(--accent-line)'});
  });
  const support=['企业基础设施','人力资源管理','技术开发','采购'];
  support.forEach((t,i)=>{
    const x=24+i*138;
    s += V.rect(x,70,128,40,t,{fill:'var(--paper-2)',stroke:'var(--rule-strong)',fs:9.5,color:'var(--ink-2)'});
  });
  s += V.text(290,54,'支持性活动（贯穿全程）',{fs:9.5,color:'var(--ink-3)'});
  s += V.text(290,212,'拆开才知道哪环赚钱、哪环费钱 → 强化或外包',{fs:9.5,color:'var(--ink-3)'});
  return V.svg(w,h,s);
};

DIAGRAMS['strategy-levels'] = () => {
  const w=540, h=240;
  let s='';
  s += V.rect(140,32,260,52,'公司战略（总体层）\n干哪个行业、进不进新领域',
    {fill:'var(--accent-soft)',stroke:'var(--accent)',fs:10.5,color:'var(--accent-ink)'});
  s += V.rect(180,104,180,52,'经营战略（事业部层）\n在这个行业怎么赢',
    {fill:'var(--paper-2)',stroke:'var(--rule-strong)',fs:9.5,color:'var(--ink)'});
  s += V.rect(210,176,120,46,'职能战略\n生产/营销/人资',
    {fill:'var(--card)',stroke:'var(--rule-strong)',fs:9,color:'var(--ink-2)'});
  s += V.line(270,84,270,104,{stroke:'var(--ink-3)'});
  s += V.line(270,156,270,176,{stroke:'var(--ink-3)'});
  s += V.text(430,62,'高层',{fs:9,color:'var(--ink-3)'});
  s += V.text(430,134,'中层',{fs:9,color:'var(--ink-3)'});
  s += V.text(430,203,'基层',{fs:9,color:'var(--ink-3)'});
  return V.svg(w,h,s);
};

DIAGRAMS['competitive-strategy'] = () => {
  const w=560, h=250;
  const items=[
    ['低成本','成本比谁都低','沃尔玛、拼多多','var(--accent)'],
    ['差异化','产品独特','苹果、戴森','var(--ok)'],
    ['最优成本供应商战略','质量不差但更便宜','小米','var(--warn)'],
    ['集中化','只做细分市场','左撇子用品','var(--accent-ink)'],
    ['竞合','又打又合','苹果与三星（既竞争又合作）','var(--ink-2)'],
  ];
  let s='';
  items.forEach((it,i)=>{
    const x=24+(i%3)*180, y=34+Math.floor(i/3)*96;
    s += V.rect(x,y,166,74,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
    s += V.text(x+83,y+26,it[0],{fs:11.5,fw:700,color:it[3]});
    s += V.text(x+83,y+46,it[1],{fs:8.5,color:'var(--ink-2)'});
    s += V.text(x+83,y+62,it[2],{fs:8,color:'var(--ink-3)'});
  });
  s += V.text(280,224,'注意：低成本 ≠ 低价格；成本是能力，定价是策略',{fs:9,color:'var(--bad)'});
  return V.svg(w,h,s);
};

DIAGRAMS['strategic-control'] = () => {
  const w=560, h=210;
  let s='';
  // 课件图8-2（第 89 页）流程起点是「企业战略目标」框，效益标准依据它制定；接入框①（制定效益标准，x 20..144）
  s += V.rect(18,6,128,28,'企业战略目标',{fill:'var(--paper-2)',stroke:'var(--rule-strong)',fs:9.5,color:'var(--ink-2)'});
  s += V.arrow(82,34,82,50,{stroke:'var(--ink-3)',sw:1.2});
  s += V.text(356,22,'课件图 8-2：起点＝企业战略目标',{fs:9,color:'var(--ink-3)'});
  const steps=[['制定效益标准','依据战略目标'],['衡量实际效益','收集实施情况'],['评价实际效益','对比与判断'],['纠正措施','含权变计划']];
  steps.forEach((st,i)=>{
    const x=20+i*136;
    s += V.rect(x,50,124,76,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
    s += V.circle(x+20,74,13,String(i+1),{fill:'var(--accent)',stroke:'var(--accent)',color:'var(--on-fill)',fs:10});
    s += V.text(x+62,74,st[0],{fs:9,fw:700,color:'var(--ink)'});
    s += V.text(x+62,106,st[1],{fs:8,color:'var(--ink-3)'});
    if(i<3) s += V.arrow(x+126,88,x+136,88,{stroke:'var(--accent)',sw:1.3});
  });
  s += V.arrow(476,132,74,132,{stroke:'var(--ink-3)',dash:'4 3'});
  s += V.text(275,154,'反馈',{fs:9,color:'var(--ink-3)'});
  s += V.text(275,182,'按时间分：事前控制 · 事后控制 · 随时控制',{fs:9,color:'var(--ink-3)'});
  return V.svg(w,h,s);
};
