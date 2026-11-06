/* ================= 结构图可视化 ================= */
/* 以 SVG 绘制：组织结构、马斯洛层级、管理幅度、文化洋葱、SWOT、BCG、五力等 */

const VISUALS = {
  'skills': skillPyramid,
  'org-structures': orgStructures,
  'span': spanDiagram,
  'maslow': maslowPyramid,
  'culture-layers': cultureOnion,
  'swot': swotMatrix,
  'bcg': bcgMatrix,
  'five-forces': fiveForces,
  'plan-types': planTypes,
  'mbo': mboChain,
  'breakeven': null,
  'decision-tree': null,
  'uncertainty': null,
  'decision-types': decisionTypes,
};

function showVisual(key){
  const fn = VISUALS[key];
  const html = fn ? fn() : '<p class="muted">暂无图示</p>';
  const existed = document.getElementById('visualModal');
  if(existed) existed.remove();

  const modal = document.createElement('div');
  modal.id = 'visualModal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:300;background:rgba(10,16,24,.6);display:grid;place-items:center;padding:20px;overflow:auto';
  modal.innerHTML = `
    <div style="background:var(--bg-elev);border-radius:20px;max-width:900px;width:100%;padding:26px 28px;box-shadow:var(--shadow-md);max-height:90vh;overflow:auto">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
        <b style="font-size:16px;flex:1">图示理解</b>
        <button class="icon-btn" onclick="document.getElementById('visualModal').remove()">✕</button>
      </div>
      ${html}
    </div>`;
  modal.addEventListener('click', e=>{ if(e.target === modal) modal.remove(); });
  document.body.appendChild(modal);
}

/* ---------- 1. 管理者技能金字塔 ---------- */
function skillPyramid(){
  return `<div class="prose">
    <svg class="diagram" viewBox="0 0 560 320">
      <!-- 金字塔三层 -->
      <polygon points="280,20 400,120 160,120" fill="var(--purple)"/>
      <polygon points="160,124 400,124 460,214 100,214" fill="var(--brand)"/>
      <polygon points="100,218 460,218 510,300 50,300" fill="var(--ok)"/>

      <text x="280" y="88" text-anchor="middle" style="fill:var(--on-fill);font-size:15px;font-weight:800">概念技能</text>
      <text x="280" y="172" text-anchor="middle" style="fill:var(--on-fill);font-size:15px;font-weight:800">人际技能</text>
      <text x="280" y="262" text-anchor="middle" style="fill:var(--on-fill);font-size:15px;font-weight:800">技术技能</text>

      <!-- 左右标注 -->
      <text x="16" y="60" class="lbl" style="font-size:12px">高层</text>
      <line x1="52" y1="60" x2="250" y2="70" stroke="var(--text-3)" stroke-dasharray="3 3"/>

      <text x="16" y="170" class="lbl" style="font-size:12px">中层</text>
      <line x1="52" y1="170" x2="160" y2="172" stroke="var(--text-3)" stroke-dasharray="3 3"/>

      <text x="16" y="264" class="lbl" style="font-size:12px">基层</text>
      <line x1="52" y1="264" x2="100" y2="264" stroke="var(--text-3)" stroke-dasharray="3 3"/>

      <text x="548" y="60" text-anchor="end" class="lbl" style="font-size:12px;fill:var(--purple)">最重要</text>
      <text x="548" y="264" text-anchor="end" class="lbl" style="font-size:12px;fill:var(--ok)">最重要</text>
    </svg>
    <table>
      <thead><tr><th>技能</th><th>含义</th><th>谁最需要</th><th>关键词</th></tr></thead>
      <tbody>
        <tr><td><b>技术技能</b></td><td>运用专业领域的方法、流程、工具</td><td><b>基层</b></td><td>会干活、手把手</td></tr>
        <tr><td><b>人际技能</b></td><td>理解、激励他人并与之共事</td><td><b>所有层次都需要</b></td><td>会处人、协调沟通</td></tr>
        <tr><td><b>概念技能</b></td><td>统观全局、抓住主要矛盾、抽象概括</td><td><b>高层</b></td><td>运筹帷幄、看大局</td></tr>
      </tbody>
    </table>
    <blockquote>一句话：<b>职位越高越靠「想」，职位越低越靠「做」，而「处人」到哪一层都躲不掉。</b></blockquote>
  </div>`;
}

/* ---------- 2. 五种组织结构 ---------- */
function orgStructures(){
  const box = (x,y,w,h,txt,fill='var(--bg-elev)',stroke='var(--line)',color='var(--text)') =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${fill}" stroke="${stroke}" stroke-width="1.3"/>
     <text x="${x+w/2}" y="${y+h/2+4}" text-anchor="middle" style="font-size:11px;fill:${color}">${txt}</text>`;
  const line = (x1,y1,x2,y2,cls='line') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}"/>`;

  // 直线制
  const A = `
    <svg class="diagram" viewBox="0 0 240 180">
      ${box(85,8,70,26,'总经理','var(--brand)','var(--brand)','var(--on-fill)')}
      ${line(120,34,120,52)}${line(60,52,180,52)}
      ${line(60,52,60,72)}${line(120,52,120,72)}${line(180,52,180,72)}
      ${box(32,72,56,24,'车间主任')}${box(92,72,56,24,'车间主任')}${box(152,72,56,24,'车间主任')}
      ${line(60,96,60,116)}${line(120,96,120,116)}${line(180,96,180,116)}
      ${box(36,116,48,22,'班组')}${box(96,116,48,22,'班组')}${box(156,116,48,22,'班组')}
    </svg>`;

  // 职能制
  const B = `
    <svg class="diagram" viewBox="0 0 260 190">
      ${box(95,6,70,24,'厂长','var(--brand)','var(--brand)','var(--on-fill)')}
      ${line(130,30,130,46)}${line(45,46,215,46)}
      ${line(45,46,45,62)}${line(130,46,130,62)}${line(215,46,215,62)}
      ${box(18,62,54,22,'职能科室','var(--warn)','var(--warn)','var(--on-fill)')}
      ${box(103,62,54,22,'职能科室','var(--warn)','var(--warn)','var(--on-fill)')}
      ${box(188,62,54,22,'职能科室','var(--warn)','var(--warn)','var(--on-fill)')}
      <!-- 行政指挥：厂长直接领导三个车间（实线） -->
      <line x1="130" y1="30" x2="130" y2="40" stroke="var(--brand)" stroke-width="1.4"/>
      <line x1="45" y1="40" x2="215" y2="40" stroke="var(--brand)" stroke-width="1.4"/>
      <line x1="45" y1="40" x2="45" y2="128" stroke="var(--brand)" stroke-width="1.4"/>
      <line x1="130" y1="40" x2="130" y2="128" stroke="var(--brand)" stroke-width="1.4"/>
      <line x1="215" y1="40" x2="215" y2="128" stroke="var(--brand)" stroke-width="1.4"/>
      <!-- 职能指挥：三个科室分别向每个车间下达指令（3x3 虚线） -->
      <line x1="45" y1="84" x2="45" y2="128" stroke="var(--bad)" stroke-dasharray="4 3" stroke-width="1.4"/>
      <line x1="45" y1="84" x2="130" y2="128" stroke="var(--bad)" stroke-dasharray="4 3" stroke-width="1.4"/>
      <line x1="45" y1="84" x2="215" y2="128" stroke="var(--bad)" stroke-dasharray="4 3" stroke-width="1.4"/>
      <line x1="130" y1="84" x2="45" y2="128" stroke="var(--bad)" stroke-dasharray="4 3" stroke-width="1.4"/>
      <line x1="130" y1="84" x2="130" y2="128" stroke="var(--bad)" stroke-dasharray="4 3" stroke-width="1.4"/>
      <line x1="130" y1="84" x2="215" y2="128" stroke="var(--bad)" stroke-dasharray="4 3" stroke-width="1.4"/>
      <line x1="215" y1="84" x2="45" y2="128" stroke="var(--bad)" stroke-dasharray="4 3" stroke-width="1.4"/>
      <line x1="215" y1="84" x2="130" y2="128" stroke="var(--bad)" stroke-dasharray="4 3" stroke-width="1.4"/>
      <line x1="215" y1="84" x2="215" y2="128" stroke="var(--bad)" stroke-dasharray="4 3" stroke-width="1.4"/>
      ${box(20,128,50,22,'车间甲')}${box(105,128,50,22,'车间乙')}${box(190,128,50,22,'车间丙')}
      <text x="130" y="166" text-anchor="middle" style="font-size:9px;fill:var(--brand)">实线＝行政指挥（厂长→车间）</text>
      <text x="130" y="179" text-anchor="middle" style="font-size:8.5px;fill:var(--bad)">虚线＝职能指挥（3 科室×3 车间，每个车间头上 4 条线＝多头领导）</text>
    </svg>`;

  // 直线职能制
  // 直线职能制（正确结构：厂长实线直管车间；职能科室仅以虚线挂靠厂长作参谋建议）
  const C = `
    <svg class="diagram" viewBox="0 0 340 240">
      ${box(135,6,70,24,'厂长','var(--brand)','var(--brand)','var(--on-fill)')}
      ${line(170,30,170,50)}${line(60,50,280,50)}
      ${line(60,50,60,86)}${line(170,50,170,86)}${line(280,50,280,86)}
      ${box(32,86,56,22,'车间甲')}${box(142,86,56,22,'车间乙')}${box(252,86,56,22,'车间丙')}
      <text x="170" y="120" text-anchor="middle" style="font-size:8.5px;fill:var(--ink-2)">实线＝厂长对车间的行政命令（直接指挥）</text>
      ${line(205,18,250,18)}
      ${line(250,18,250,158)}
      ${line(60,158,280,158)}
      ${line(60,158,60,168)}${line(170,158,170,168)}${line(280,158,280,168)}
      ${box(32,168,56,22,'职能科室','var(--ok)','var(--ok)','var(--on-fill)')}${box(142,168,56,22,'职能科室','var(--ok)','var(--ok)','var(--on-fill)')}${box(252,168,56,22,'职能科室','var(--ok)','var(--ok)','var(--on-fill)')}
      <text x="170" y="208" text-anchor="middle" style="font-size:8.5px;fill:var(--ok)">虚线＝职能科室只对厂长负责，对车间仅作参谋建议，不能直接下命令</text>
      <text x="170" y="224" text-anchor="middle" style="font-size:8.5px;fill:var(--bad)">（区别于「职能制」：那里职能科室可直接指挥车间，形成多头领导）</text>
    </svg>`;
  // 事业部制
  const D = `
    <svg class="diagram" viewBox="0 0 260 200">
      ${box(95,6,70,24,'总公司','var(--brand)','var(--brand)','var(--on-fill)')}
      ${line(130,30,130,46)}${line(70,46,190,46)}
      ${line(70,46,70,62)}${line(190,46,190,62)}
      ${box(38,62,64,22,'事业部A','var(--purple)','var(--purple)','var(--on-fill)')}
      ${box(158,62,64,22,'事业部B','var(--purple)','var(--purple)','var(--on-fill)')}
      ${line(52,84,52,100)}${line(84,84,84,100)}${line(172,84,172,100)}${line(204,84,204,100)}
      ${box(30,100,44,20,'工厂甲')}${box(76,100,44,20,'工厂乙')}
      ${box(150,100,44,20,'工厂丙')}${box(196,100,44,20,'工厂丁')}
      <text x="130" y="146" text-anchor="middle" style="font-size:10px;fill:var(--text-2)">总公司＝投资中心　事业部＝利润中心</text>
      <text x="130" y="162" text-anchor="middle" style="font-size:10px;fill:var(--text-2)">工厂＝成本中心</text>
    </svg>`;

  // 矩阵制
  const E = `
    <svg class="diagram" viewBox="0 0 260 200">
      ${box(95,6,70,22,'总经理','var(--brand)','var(--brand)','var(--on-fill)')}
      ${line(130,28,130,44)}${line(40,44,220,44)}
      ${line(40,44,40,58)}${line(95,44,95,58)}${line(165,44,165,58)}${line(220,44,220,58)}
      ${box(18,58,46,20,'技术部')}${box(73,58,46,20,'生产部')}
      ${box(143,58,46,20,'财务部')}${box(198,58,46,20,'人事部')}
      <line x1="40" y1="78" x2="40" y2="100" stroke="var(--bad)" stroke-dasharray="3 3"/>
      <line x1="95" y1="78" x2="95" y2="100" stroke="var(--bad)" stroke-dasharray="3 3"/>
      <line x1="165" y1="78" x2="165" y2="100" stroke="var(--bad)" stroke-dasharray="3 3"/>
      <line x1="220" y1="78" x2="220" y2="100" stroke="var(--bad)" stroke-dasharray="3 3"/>
      ${box(4,100,52,20,'项目甲','var(--warn)','var(--warn)','var(--on-fill)')}
      ${line(56,110,242,110)}
      <line x1="40" y1="110" x2="40" y2="128" stroke="var(--bad)" stroke-dasharray="3 3"/>
      <line x1="95" y1="110" x2="95" y2="128" stroke="var(--bad)" stroke-dasharray="3 3"/>
      <line x1="165" y1="110" x2="165" y2="128" stroke="var(--bad)" stroke-dasharray="3 3"/>
      <line x1="220" y1="110" x2="220" y2="128" stroke="var(--bad)" stroke-dasharray="3 3"/>
      ${box(4,128,52,20,'项目乙','var(--warn)','var(--warn)','var(--on-fill)')}
      ${line(56,138,242,138)}
      <text x="130" y="172" text-anchor="middle" style="font-size:10px;fill:var(--bad)">双重领导：行政归部门，业务归项目经理</text>
    </svg>`;

  return `<div class="prose">
    <div class="grid c2">
      <div><div style="text-align:center;font-weight:700;font-size:13px;margin-bottom:6px">直线制</div>${A}
        <div class="muted" style="font-size:11.5px;text-align:center">无参谋 · 一人全管 · 小企业</div></div>
      <div><div style="text-align:center;font-weight:700;font-size:13px;margin-bottom:6px">职能制</div>${B}
        <div class="muted" style="font-size:11.5px;text-align:center">专家可直接指挥 → 多头领导</div></div>
      <div><div style="text-align:center;font-weight:700;font-size:13px;margin-bottom:6px">直线职能制</div>${C}
        <div class="muted" style="font-size:11.5px;text-align:center">专家只建议，老板下命令</div></div>
      <div><div style="text-align:center;font-weight:700;font-size:13px;margin-bottom:6px">事业部制</div>${D}
        <div class="muted" style="font-size:11.5px;text-align:center">分权 · 独立核算 · 大企业</div></div>
    </div>
    <div style="max-width:420px;margin:16px auto 0">
      <div style="text-align:center;font-weight:700;font-size:13px;margin-bottom:6px">矩阵制</div>${E}
      <div class="muted" style="font-size:11.5px;text-align:center">一个员工两个老板</div>
    </div>
  </div>`;
}

/* ---------- 3. 管理幅度 ---------- */
function spanDiagram(){
  /* 节点宽度随层密度自适应：原版同一行相邻方框间距只有 20~36px 而框宽 52px，
     后画的框把前一个框的文字压掉（截图只见「员」的半边）。改为按行密度定框宽 + 定间距。 */
  const node = (x,y,txt,fill='var(--bg-elev)',stroke='var(--line)',color='var(--text)',w=52,fs=10) =>
    `<rect x="${x-w/2}" y="${y-12}" width="${w}" height="24" rx="5" fill="${fill}" stroke="${stroke}" stroke-width="1.2"/>
     <text x="${x}" y="${y+4}" text-anchor="middle" style="font-size:${fs}px;fill:${color}">${txt}</text>`;
  const line = (x1,y1,x2,y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="line"/>`;

  // 锥形：幅度 2，4 层（画布加宽到 420，节点不再重叠，连线也不再交叉）
  let tall = `<svg class="diagram" viewBox="0 0 420 212">`;
  tall += node(210,14,'总经理','var(--brand)','var(--brand)','var(--on-fill)',60);
  const mgr = [130,210,290];
  mgr.forEach(x=>{ tall += line(210,26,x,44); });
  mgr.forEach(x=>{ tall += node(x,56,'经理',undefined,undefined,undefined,56); });
  const sup = [42,105,168,231,294,357];
  mgr.forEach((px,i)=>{
    [0,1].forEach(k=>{ tall += line(px,68,sup[i*2+k],88); });
  });
  sup.forEach(x=>{ tall += node(x,100,'主管',undefined,undefined,undefined,44,9); });
  const emp = [];
  sup.forEach(x=>{ emp.push(x-16, x+16); });
  sup.forEach((px,k)=>{
    [0,1].forEach(d=>{ tall += line(px,112,emp[k*2+d],128); });
  });
  emp.forEach(x=>{ tall += node(x,140,'员工',undefined,undefined,undefined,28,8.5); });
  tall += `<text x="210" y="180" text-anchor="middle" style="font-size:11px;fill:var(--text-2)">锥形式（A型）：层次多、幅度窄</text>`;
  tall += `<text x="210" y="198" text-anchor="middle" style="font-size:10px;fill:var(--text-3)">信息慢 · 成本高 · 晋升机会多</text>`;
  tall += `</svg>`;

  // 扁平：幅度8，2层（画布加宽到 420，14 个员工方框不再互相压盖）
  let flat = `<svg class="diagram" viewBox="0 0 420 212">`;
  flat += node(210,24,'总经理','var(--brand)','var(--brand)','var(--on-fill)',60);
  const xs = [42,98,154,210,266,322,378];
  xs.forEach(x=>{ flat += line(210,36,x,64); });
  xs.forEach(x=>{ flat += node(x,76,'经理',undefined,undefined,undefined,52); });
  const femp = [28,56,84,112,140,168,196,224,252,280,308,336,364,392];
  xs.forEach((px,i)=>{
    [0,1].forEach(k=>{ flat += line(px,88,femp[i*2+k],110); });
  });
  femp.forEach(x=>{ flat += node(x,122,'员工',undefined,undefined,undefined,24,8.5); });
  flat += `<text x="210" y="166" text-anchor="middle" style="font-size:11px;fill:var(--text-2)">扁平式（Z型）：层次少、幅度宽</text>`;
  flat += `<text x="210" y="184" text-anchor="middle" style="font-size:10px;fill:var(--text-3)">信息快 · 成本低 · 主管管不过来</text>`;
  flat += `</svg>`;

  return `<div class="prose">
    <div class="grid c2">
      <div>${tall}</div>
      <div>${flat}</div>
    </div>
    <blockquote><b>组织规模 = 管理层次 × 管理幅度</b>　→　幅度与层次<b>成反比</b></blockquote>
    <p>格拉丘纳斯公式告诉我们为什么幅度不能无限加：下属从 4 人增到 13 人，可能的上下级关系数从 <b>44</b> 暴涨到 <b>53404</b>。</p>
    <table>
      <thead><tr><th>N（下属数）</th><th>1</th><th>2</th><th>3</th><th>4</th><th>…</th><th>13</th></tr></thead>
      <tbody><tr><td><b>可能关系数 C</b></td><td>1</td><td>6</td><td>18</td><td>44</td><td>…</td><td>53404</td></tr></tbody>
    </table>
    <p><b>经验值：一个管理者管辖 6~9 个下属比较适宜。</b></p>
  </div>`;
}

/* ---------- 4. 马斯洛需要层次 ---------- */
function maslowPyramid(){
  const layers = [
    ['自我实现需要','发挥潜能、成为想成为的人','var(--purple)','工作挑战性、自由尝试新想法'],
    ['尊重（尊严）需要','自尊 + 他人尊重','var(--purple-2)','工作形象、认可、工作熟练度'],
    ['归属和爱（社交）需要','爱、感情、与他人交流','var(--brand)','人际关系、融入团队'],
    ['安全需要','人身/职业安全、稳定','var(--ok)','工作安全、员工利益、环境安全'],
    ['生理需要','吃穿住行、空气水','var(--warn)','工作时间、营养、空气质量、温度'],
  ];
  let svg = `<svg class="diagram" viewBox="-26 0 812 340">`;
  layers.forEach((L,i)=>{
    const w = 200 + i*76;
    const x = 310 - w/2 + 60;
    const y = 16 + i*60;
    svg += `<rect x="${x}" y="${y}" width="${w}" height="54" rx="6" fill="${L[2]}"/>`;
    svg += `<text x="${x+w/2}" y="${y+24}" text-anchor="middle" style="fill:var(--on-fill);font-size:13px;font-weight:700">${L[0]}</text>`;
    svg += `<text x="${x+w/2}" y="${y+42}" text-anchor="middle" style="fill:var(--on-fill);opacity:.9;font-size:10px">${L[1]}</text>`;
    svg += `<text x="638" y="${y+32}" text-anchor="start" style="font-size:9.5px;fill:var(--ink-3)">${L[3]}</text>`;
  });
  svg += `<text x="30" y="300" style="font-size:11px;fill:var(--text-2)">低</text>`;
  svg += `<line x1="30" y1="290" x2="30" y2="40" stroke="var(--text-3)" stroke-width="1.5" marker-end="url(#ar)"/>`;
  svg += `<text x="18" y="170" text-anchor="middle" style="font-size:11px;fill:var(--text-2)" transform="rotate(-90 18 170)">需要层次递进</text>`;
  svg += `<defs><marker id="ar" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
    <path d="M0,0 L8,4 L0,8 Z" fill="var(--text-3)"/></marker></defs>`;
  svg += `</svg>`;

  return `<div class="prose">
    ${svg}
    <blockquote><b>只有未满足的需要才具有激励作用。</b>——这是马斯洛理论的核心。</blockquote>
    <table>
      <thead><tr><th>层次</th><th>内容</th><th>对应双因素理论</th></tr></thead>
      <tbody>
        <tr><td>生理、安全</td><td>生存与保障</td><td><b>保健因素</b></td></tr>
        <tr><td>归属和爱（社交）、尊重（尊严）、自我实现</td><td>社会心理与成长</td><td><b>激励因素</b></td></tr>
      </tbody>
    </table>
    <p class="muted">注：这是 2018 期中第 84 题的考点——该题官方答案为 C（生理、社交和安全需要相当于保健因素），与本表教材划分不同：平时按本表答，卷面以答案为准。</p>
  </div>`;
}

/* ---------- 5. 组织文化三层 ---------- */
function cultureOnion(){
  return `<div class="prose">
    <svg class="diagram" viewBox="0 0 560 320">
      <ellipse cx="280" cy="160" rx="240" ry="140" fill="var(--bg-soft)" stroke="var(--line)" stroke-width="1.5"/>
      <ellipse cx="280" cy="160" rx="186" ry="104" fill="var(--warn)" opacity=".28" stroke="var(--warn)" stroke-width="1.5"/>
      <ellipse cx="280" cy="160" rx="152" ry="86" fill="var(--brand)" stroke="var(--brand)" stroke-width="1.5"/>

      <text x="280" y="40" text-anchor="middle" style="font-size:14px;font-weight:800;fill:var(--text)">物质层（表层）</text>
      <text x="280" y="58" text-anchor="middle" style="font-size:11px;fill:var(--text-2)">厂徽 · 建筑 · 产品包装 · 纪念物</text>

      <text x="280" y="100" text-anchor="middle" style="font-size:13px;font-weight:700;fill:var(--on-fill)">制度层（中间）</text>
      <text x="280" y="116" text-anchor="middle" style="font-size:9.5px;fill:var(--on-fill);opacity:.92">规章 · 责任制 · 特殊制度（五必访）</text>
      <text x="280" y="130" text-anchor="middle" style="font-size:9.5px;fill:var(--on-fill);opacity:.92">特殊风俗（厂庆）</text>

      <text x="280" y="160" text-anchor="middle" style="font-size:14px;font-weight:800;fill:var(--on-fill)">精神层</text>
      <text x="280" y="178" text-anchor="middle" style="font-size:11px;fill:var(--on-fill);opacity:.95">价值观 · 精神 · 风气 · 道德</text>
      <text x="280" y="196" text-anchor="middle" style="font-size:10px;fill:var(--on-fill);opacity:.85">← 核心与灵魂</text>
    </svg>
    <blockquote>
      <b>物质层</b>是外在表现、物质基础；<br>
      <b>制度层</b>制约和规范着物质层与精神层；<br>
      <b>精神层</b>是思想基础，是组织文化的<b>核心和灵魂</b>。
    </blockquote>
    <p class="muted">最高频判断题陷阱：「物质决定精神，所以组织文化的核心是物质层」→ <b>错</b>。</p>
  </div>`;
}

/* ---------- 6. SWOT ---------- */
function swotMatrix(){
  return `<div class="prose">
    <svg class="diagram" viewBox="0 0 600 340">
      <rect x="150" y="20" width="200" height="140" fill="var(--ok)" opacity=".2" rx="8"/>
      <rect x="356" y="20" width="200" height="140" fill="var(--warn)" opacity=".2" rx="8"/>
      <rect x="150" y="166" width="200" height="140" fill="var(--brand)" opacity=".2" rx="8"/>
      <rect x="356" y="166" width="200" height="140" fill="var(--bad)" opacity=".16" rx="8"/>

      <text x="250" y="70" text-anchor="middle" style="font-size:19px;font-weight:800;fill:var(--ok)">SO 战略</text>
      <text x="250" y="96" text-anchor="middle" style="font-size:11px;fill:var(--text-2)">增长型</text>
      <text x="250" y="120" text-anchor="middle" style="font-size:11px;fill:var(--text-2)">用优势抓机会</text>

      <text x="456" y="70" text-anchor="middle" style="font-size:19px;font-weight:800;fill:var(--warn)">WO 战略</text>
      <text x="456" y="96" text-anchor="middle" style="font-size:11px;fill:var(--text-2)">扭转型</text>
      <text x="456" y="120" text-anchor="middle" style="font-size:11px;fill:var(--text-2)">用机会补劣势</text>

      <text x="250" y="216" text-anchor="middle" style="font-size:19px;font-weight:800;fill:var(--brand)">ST 战略</text>
      <text x="250" y="242" text-anchor="middle" style="font-size:11px;fill:var(--text-2)">多元化</text>
      <text x="250" y="266" text-anchor="middle" style="font-size:11px;fill:var(--text-2)">用优势躲威胁</text>

      <text x="456" y="216" text-anchor="middle" style="font-size:19px;font-weight:800;fill:var(--bad)">WT 战略</text>
      <text x="456" y="242" text-anchor="middle" style="font-size:11px;fill:var(--text-2)">防御型</text>
      <text x="456" y="266" text-anchor="middle" style="font-size:11px;fill:var(--text-2)">减劣势+躲威胁</text>

      <!-- 轴标签：横轴=内部因素(S/W)，纵轴=外部因素(O/T) -->
      <text x="353" y="14" text-anchor="middle" style="font-size:11px;font-weight:700;fill:var(--text)">机会 O ↑</text>
      <text x="353" y="326" text-anchor="middle" style="font-size:11px;font-weight:700;fill:var(--text)">↓ 威胁 T</text>
      <text x="132" y="170" text-anchor="middle" style="font-size:12px;font-weight:700;fill:var(--ok)" transform="rotate(-90 132 170)">优势 S</text>
      <text x="570" y="170" text-anchor="middle" style="font-size:12px;font-weight:700;fill:var(--bad)" transform="rotate(90 570 170)">劣势 W</text>
    </svg>
    <p><b>做题口诀</b>：题干出现「优势+机会」→ SO；「劣势+机会」→ WO；「优势+威胁」→ ST；「劣势+威胁」→ WT。</p>
    <p class="muted">字母顺序就是配对顺序：前面那个是内部（S/W），后面那个是外部（O/T）。</p>
  </div>`;
}

/* ---------- 7. BCG 矩阵 ---------- */
function bcgMatrix(){
  return `<div class="prose">
    <svg class="diagram" viewBox="0 0 560 360">
      <rect x="90" y="20" width="200" height="150" fill="var(--warn)" opacity=".18" rx="8"/>
      <rect x="296" y="20" width="200" height="150" fill="var(--ok)" opacity=".18" rx="8"/>
      <rect x="90" y="176" width="200" height="150" fill="var(--bad)" opacity=".14" rx="8"/>
      <rect x="296" y="176" width="200" height="150" fill="var(--brand)" opacity=".18" rx="8"/>

      <text x="190" y="82" text-anchor="middle" style="font-size:22px;font-weight:800;fill:var(--warn)">问题 ？</text>
      <text x="190" y="108" text-anchor="middle" style="font-size:11px;fill:var(--text-2)">高增长 · 低份额</text>
      <text x="190" y="130" text-anchor="middle" style="font-size:11px;fill:var(--text-2)">投资培育 或 放弃</text>

      <text x="396" y="82" text-anchor="middle" style="font-size:22px;font-weight:800;fill:var(--ok)">明星 ★</text>
      <text x="396" y="108" text-anchor="middle" style="font-size:11px;fill:var(--text-2)">高增长 · 高份额</text>
      <text x="396" y="130" text-anchor="middle" style="font-size:11px;fill:var(--text-2)">投资保持</text>

      <text x="190" y="238" text-anchor="middle" style="font-size:22px;font-weight:800;fill:var(--bad)">瘦狗 🐕</text>
      <text x="190" y="264" text-anchor="middle" style="font-size:11px;fill:var(--text-2)">低增长 · 低份额</text>
      <text x="190" y="286" text-anchor="middle" style="font-size:11px;fill:var(--text-2)">清算 或 收割</text>

      <text x="396" y="238" text-anchor="middle" style="font-size:22px;font-weight:800;fill:var(--brand)">现金牛 💰</text>
      <text x="396" y="264" text-anchor="middle" style="font-size:11px;fill:var(--text-2)">低增长 · 高份额</text>
      <text x="396" y="286" text-anchor="middle" style="font-size:11px;fill:var(--text-2)">挤奶，供养其他业务</text>

      <text x="60" y="100" text-anchor="middle" style="font-size:11px;fill:var(--text-2)">高</text>
      <text x="60" y="260" text-anchor="middle" style="font-size:11px;fill:var(--text-2)">低</text>
      <text x="48" y="180" text-anchor="middle" style="font-size:11px;fill:var(--text-2)" transform="rotate(-90 48 180)">市场增长率</text>
      <text x="293" y="350" text-anchor="middle" style="font-size:11px;fill:var(--text-2)">相对市场份额（低 ← → 高）</text>
    </svg>
    <blockquote><b>现金牛挤奶 → 喂给明星和问题 → 明星变现金牛 → 瘦狗砍掉</b></blockquote>
  </div>`;
}

/* ---------- 8. 五力模型 ---------- */
function fiveForces(){
  const box=(x,y,w,h,txt,fill='var(--bg-elev)',stroke='var(--line)',color='var(--text)')=>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="1.4"/>
     <text x="${x+w/2}" y="${y+h/2+4}" text-anchor="middle" style="font-size:11.5px;fill:${color};font-weight:600">${txt}</text>`;
  return `<div class="prose">
    <svg class="diagram" viewBox="0 0 580 340">
      ${box(240,20,120,44,'新进入者','var(--warn)','var(--warn)','var(--on-fill)')}
      ${box(240,250,120,44,'替代品','var(--bad)','var(--bad)','var(--on-fill)')}
      ${box(20,140,110,52,'供应商','var(--purple)','var(--purple)','var(--on-fill)')}
      ${box(450,140,110,52,'顾客','var(--purple)','var(--purple)','var(--on-fill)')}
      ${box(215,140,170,56,'现有竞争对手','var(--brand)','var(--brand)','var(--on-fill)')}

      <line x1="300" y1="64" x2="300" y2="140" stroke="var(--text-3)" stroke-width="1.6" marker-end="url(#a2)"/>
      <line x1="300" y1="250" x2="300" y2="196" stroke="var(--text-3)" stroke-width="1.6" marker-end="url(#a2)"/>
      <line x1="130" y1="166" x2="215" y2="166" stroke="var(--text-3)" stroke-width="1.6" marker-end="url(#a2)"/>
      <line x1="450" y1="166" x2="385" y2="166" stroke="var(--text-3)" stroke-width="1.6" marker-end="url(#a2)"/>

      <text x="312" y="106" style="font-size:9.5px;fill:var(--text-3)">威胁</text>
      <text x="312" y="228" style="font-size:9.5px;fill:var(--text-3)">威胁</text>
      <text x="152" y="158" style="font-size:9.5px;fill:var(--text-3)">议价</text>
      <text x="392" y="158" style="font-size:9.5px;fill:var(--text-3)">议价</text>

      <defs><marker id="a2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="var(--text-3)"/></marker></defs>
    </svg>
    <table>
      <thead><tr><th>力量</th><th>什么时候更强</th></tr></thead>
      <tbody>
        <tr><td><b>新进入者</b></td><td>进入壁垒低、行业利润高</td></tr>
        <tr><td><b>替代品</b></td><td>性价比高、技术进步快</td></tr>
        <tr><td><b>供应商</b></td><td>供应商少、无替代、你的采购量小</td></tr>
        <tr><td><b>顾客</b></td><td>客户集中、产品同质、转换成本低</td></tr>
        <tr><td><b>现有对手</b></td><td>对手多、增长慢、退出壁垒高</td></tr>
      </tbody>
    </table>
    <p class="muted">五力由 <b>迈克尔·波特</b> 提出。别和「迈克尔·哈默」（企业再造）搞混。</p>
  </div>`;
}

/* ---------- 9. 计划类型 ---------- */
function planTypes(){
  return `<div class="prose">
    <svg class="diagram" viewBox="0 0 580 220">
      <rect x="20" y="40" width="150" height="70" rx="8" fill="var(--brand)"/>
      <text x="95" y="70" text-anchor="middle" style="fill:var(--on-fill);font-size:14px;font-weight:800">战略计划</text>
      <text x="95" y="92" text-anchor="middle" style="fill:var(--on-fill);font-size:10px">长远 · 单值 · 弹性大</text>

      <rect x="200" y="40" width="150" height="70" rx="8" fill="var(--purple)"/>
      <text x="275" y="70" text-anchor="middle" style="fill:var(--on-fill);font-size:14px;font-weight:800">战术计划</text>
      <text x="275" y="92" text-anchor="middle" style="fill:var(--on-fill);font-size:10px">局部 · 阶段性</text>

      <rect x="380" y="40" width="150" height="70" rx="8" fill="var(--ok)"/>
      <text x="455" y="70" text-anchor="middle" style="fill:var(--on-fill);font-size:14px;font-weight:800">作业计划</text>
      <text x="455" y="92" text-anchor="middle" style="fill:var(--on-fill);font-size:10px">刚性 · 命令性</text>

      <line x1="170" y1="75" x2="200" y2="75" stroke="var(--text-3)" stroke-width="1.6" marker-end="url(#a3)"/>
      <line x1="350" y1="75" x2="380" y2="75" stroke="var(--text-3)" stroke-width="1.6" marker-end="url(#a3)"/>

      <text x="95" y="140" text-anchor="middle" style="font-size:10.5px;fill:var(--text-2)">高层管理者</text>
      <text x="275" y="140" text-anchor="middle" style="font-size:10.5px;fill:var(--text-2)">中层管理者</text>
      <text x="455" y="140" text-anchor="middle" style="font-size:10.5px;fill:var(--text-2)">基层管理者</text>

      <text x="290" y="180" text-anchor="middle" style="font-size:11px;fill:var(--text-2)">时间跨度：长 → 短　　刚性：弱 → 强</text>
      <defs><marker id="a3" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="var(--text-3)"/></marker></defs>
    </svg>
    <table>
      <thead><tr><th>分类依据</th><th>类型</th></tr></thead>
      <tbody>
        <tr><td>时间</td><td>长期（5 年以上，含 5 年整）、中期（5 年以内）、短期（1 年以内）</td></tr>
        <tr><td>范围</td><td>战略、战术、作业</td></tr>
        <tr><td>内容</td><td>综合、专业、项目</td></tr>
        <tr><td>约束力</td><td>指令性（严格约束）、指导性（参考性）</td></tr>
      </tbody>
    </table>
  </div>`;
}

/* ---------- 10. MBO 目标链 ---------- */
function mboChain(){
  return `<div class="prose">
    <svg class="diagram" viewBox="0 0 560 260">
      <rect x="200" y="14" width="160" height="42" rx="8" fill="var(--brand)"/>
      <text x="280" y="41" text-anchor="middle" style="fill:var(--on-fill);font-size:13px;font-weight:700">组织总目标</text>
      <rect x="200" y="76" width="160" height="42" rx="8" fill="var(--purple)"/>
      <text x="280" y="103" text-anchor="middle" style="fill:var(--on-fill);font-size:13px;font-weight:700">事业部目标</text>
      <rect x="200" y="138" width="160" height="42" rx="8" fill="var(--warn)"/>
      <text x="280" y="165" text-anchor="middle" style="fill:var(--on-fill);font-size:13px;font-weight:700">部门目标</text>
      <rect x="200" y="200" width="160" height="42" rx="8" fill="var(--ok)"/>
      <text x="280" y="227" text-anchor="middle" style="fill:var(--on-fill);font-size:13px;font-weight:700">个人目标</text>

      <line x1="280" y1="56" x2="280" y2="76" stroke="var(--text-3)" stroke-width="2" marker-end="url(#a4)"/>
      <line x1="280" y1="118" x2="280" y2="138" stroke="var(--text-3)" stroke-width="2" marker-end="url(#a4)"/>
      <line x1="280" y1="180" x2="280" y2="200" stroke="var(--text-3)" stroke-width="2" marker-end="url(#a4)"/>

      <text x="380" y="100" style="font-size:10.5px;fill:var(--text-2)">逐级分解</text>
      <text x="380" y="162" style="font-size:10.5px;fill:var(--text-2)">权责利对称</text>
      <text x="380" y="224" style="font-size:10.5px;fill:var(--text-2)">环环相扣</text>

      <text x="120" y="100" style="font-size:10.5px;fill:var(--text-2)">MBO</text>
      <text x="120" y="120" style="font-size:10.5px;fill:var(--text-2)">德鲁克 1954</text>

      <defs><marker id="a4" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="var(--text-3)"/></marker></defs>
    </svg>
    <p class="muted">此即课件图2-4「目标的层级结构」（组织的整体目标→事业部目标→部门目标→个人目标）。</p>
    <blockquote>MBO 以 <b>Y 理论</b> 为基础：相信人在目标明确时能自我负责。</blockquote>
    <p><b>三个阶段</b>：目标体系确立 → 目标实施 → 成果评价。</p>
  </div>`;
}

/* ---------- 11. 网络图基础：已删除（v10）---------- */
/* networkBasic() 旧图（无箭头、只标 E 为关键、夹第四份「五条规矩」）为死代码：
   network-basic / network-calc 两键只由 DIAGRAMS（diagrams24.js / diagrams13.js）提供。 */

/* ---------- 12. 决策类型 ---------- */
function decisionTypes(){
  return `<div class="prose">
    <table>
      <thead><tr><th>类型</th><th>概率</th><th>方法</th><th>典型题</th></tr></thead>
      <tbody>
        <tr><td><b>确定型</b></td><td>结果唯一</td><td>盈亏平衡、线性规划、ABC、经济批量、投资效果</td><td>给成本售价求保本点</td></tr>
        <tr><td><b>风险型</b></td><td><b>已知</b></td><td><b>决策树</b>、收益矩阵、敏感性分析</td><td>给「概率 0.7」</td></tr>
        <tr><td><b>不确定型</b></td><td><b>未知</b></td><td>乐观、悲观、等可能、系数、最小遗憾</td><td>只说「有 4 种状态」</td></tr>
      </tbody>
    </table>
    <blockquote>一句话区分：<b>确定型看结果，风险型看概率，不确定型看态度。</b></blockquote>
    <p class="muted">判断技巧：题目给了概率数字 → 风险型；说「概率无法预测」→ 不确定型。</p>
  </div>`;
}
