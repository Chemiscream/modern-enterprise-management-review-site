/* ================= 图示补充（第二批） ================= */
/* 补充 diagram-map.js 中引用但未实现的 key */

(function(){
  const add = (k, fn) => { if(typeof DIAGRAMS !== 'undefined') DIAGRAMS[k] = fn; };
  if(typeof DIAGRAMS === 'undefined') return;

  /* ---- ch01 ---- */
  add('three-pioneers', () => {
    const w=560, h=230;
    const items=[
      ['亚当·斯密','经济人理论','人干活为私利；劳动是财富源泉','var(--accent)'],
      ['罗伯特·欧文','人事管理创始人','缩短工时、涨工资、盖房，反而更赚钱','var(--ok)'],
      ['查尔斯·巴贝奇','利润分配','工资 = 固定 + 利润分成 + 建议奖','var(--warn)'],
    ];
    let s='';
    items.forEach((it,i)=>{
      const x=24+i*180;
      s += V.rect(x,30,166,132,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
      s += V.rect(x,30,166,5,'',{fill:it[3],stroke:it[3],rx:2});
      s += V.text(x+83,62,it[0],{fs:12.5,fw:700,color:'var(--ink)'});
      s += V.text(x+83,84,it[1],{fs:9.5,fw:600,color:it[3]});
      s += V.wrap(x+83,110,it[2],12,14,{fs:8.5,color:'var(--ink-3)'});
    });
    s += V.text(280,192,'四个「之父」别串：欧文=人事管理，泰罗=科学管理，韦伯=组织理论，法约尔=管理过程',{fs:8.5,color:'var(--bad)'});
    return V.svg(w,h,s);
  });

  add('classical-three', () => {
    const w=580, h=250;
    const items=[
      ['泰罗','看「活」','怎么干得快','科学管理之父\n四原则·差别计件'],
      ['法约尔','看「整」','怎么管得顺','14 项原则\n经营六职能·管理五要素'],
      ['韦伯','看「架子」','怎么组织得稳','组织理论之父\n理想行政组织七特征'],
    ];
    let s='';
    items.forEach((it,i)=>{
      const x=24+i*186;
      s += V.rect(x,26,172,150,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
      s += V.circle(x+86,62,26,it[0],{fill:'var(--accent-soft)',stroke:'var(--accent)',color:'var(--accent-ink)',fs:12});
      s += V.text(x+86,104,it[1],{fs:11,fw:700,color:'var(--ink)'});
      s += V.text(x+86,124,it[2],{fs:9,color:'var(--ink-3)'});
      s += `<text x="${x+86}" y="${148}" text-anchor="middle" style="font-size:8px;fill:var(--ink-3)">${it[3].split('\n')[0]}</text>`;
      s += `<text x="${x+86}" y="${162}" text-anchor="middle" style="font-size:8px;fill:var(--ink-3)">${it[3].split('\n')[1]}</text>`;
    });
    s += V.text(290,206,'同为古典管理理论，都诞生于 19 世纪末—20 世纪初',{fs:9,color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });

  /* ---- ch02 ---- */
  add('plan-purpose', () => {
    const w=540, h=240;
    const items=[
      ['指挥依据','没计划就不知怎么指挥'],
      ['控制标准','没计划就拿什么判断好坏'],
      ['降低不确定性','明天会发生啥全靠猜'],
      ['提高效率','东一榔头西一棒子'],
      ['激励士气','大家不知道为啥拼'],
    ];
    let s='';
    items.forEach((it,i)=>{
      const y=26+i*40;
      s += V.rect(30,y,480,32,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
      s += V.circle(52,y+16,12,String(i+1),{fill:'var(--accent-soft)',stroke:'var(--accent)',color:'var(--accent-ink)',fs:9});
      s += V.text(74,y+21,it[0],{anchor:'start',fs:10.5,fw:700,color:'var(--ink)'});
      s += V.text(200,y+21,it[1],{anchor:'start',fs:9.5,color:'var(--ink-3)'});
    });
    return V.svg(w,h,s);
  });

  add('plan-steps', () => {
    const w=580, h=200;
    const steps=[['明确使命','我们是谁'],['估量机会\n确定目标','含环境预测'],['拟定方案','至少两条路'],['选择方案','挑最合适的'],['制定派生计划','拆到各部门']];
    let s='';
    steps.forEach((st,i)=>{
      const x=16+i*114;
      s += V.rect(x,44,102,88,'',{fill:'var(--card)',stroke: i===1?'var(--accent)':'var(--rule-strong)',sw:i===1?1.6:1.2});
      s += V.circle(x+22,66,11,String(i+1),{fill:i===1?'var(--accent)':'var(--accent-soft)',
        stroke:'var(--accent)',color:i===1?'var(--on-fill)':'var(--accent-ink)',fs:9});
      const lines = st[0].split('\n');
      lines.forEach((ln,j)=> s += V.text(x+51,y=66+j*12,ln,{anchor:'start',fs:9,fw:700,color:'var(--ink)'}));
      s += `<text x="${x+51}" y="${112}" style="font-size:8px;fill:var(--ink-3)">${st[1]}</text>`;
      if(i<4) s += `<path d="M${x+104},88 L${x+112},88" stroke="var(--accent)" stroke-width="1.3" marker-end="url(#arrowhead-accent)"/>`;
    });
    s += V.text(290,160,'第 2 步包含「对经济、政策等外部环境的预测」——常考',{fs:9,color:'var(--accent-ink)'});
    return V.svg(w,h,s);
  });

  /* ---- ch03 ---- */
  add('org-effectiveness', () => {
    const w=540, h=230;
    let s='';
    s += V.circle(150,100,52,'组织\n有效性',{fill:'var(--accent-soft)',stroke:'var(--accent)',color:'var(--accent-ink)',fs:11});
    s += V.rect(240,50,260,50,'',{fill:'var(--card)',stroke:'var(--ok)'});
    s += V.text(262,72,'效率',{anchor:'start',fs:12,fw:700,color:'var(--ok)'});
    s += V.text(262,90,'= 输入与输出比值',{anchor:'start',fs:8.5,color:'var(--ink-3)'});
    s += V.rect(240,116,260,50,'',{fill:'var(--card)',stroke:'var(--accent)'});
    s += V.text(262,138,'效益',{anchor:'start',fs:12,fw:700,color:'var(--accent)'});
    s += V.text(262,156,'= 目标实现程度（方向对不对）',{anchor:'start',fs:8.5,color:'var(--ink-3)'});
    s += V.line(204,86,238,76,{stroke:'var(--accent-line)'});
    s += V.line(204,116,238,140,{stroke:'var(--accent-line)'});
    s += V.text(270,196,'「做正确的事」比「正确地做事」更重要',{fs:9.5,color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });

  add('staffing', () => {
    const w=560, h=250;
    let s='';
    s += V.text(280,20,'人员配备：把对的人放到对的位置',{fs:10.5,fw:700,color:'var(--ink-3)'});
    const steps=[['确定人员需要量',1],['选配人员',2],['制定培养计划',3],['人员考评',4]];
    steps.forEach((st,i)=>{
      const x=26+i*134;
      s += V.rect(x,40,120,54,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
      s += V.text(x+60,62,st[0],{fs:9.5,fw:600,color:'var(--ink)'});
      s += V.text(x+60,80,'第 '+st[1]+' 步',{fs:8,color:'var(--ink-3)'});
      if(i<3) s += `<path d="M${x+122},67 L${x+134},67" stroke="var(--accent)" stroke-width="1.3" marker-end="url(#arrowhead-accent)"/>`;
    });
    // 内部 vs 外部
    s += V.rect(26,118,250,110,'',{fill:'var(--ok-soft)',stroke:'rgba(61,107,74,.25)'});
    s += V.text(151,142,'内部提升',{fs:11.5,fw:700,color:'var(--ok)'});
    ['优点：激励士气、了解充分、上手快','缺点：激化矛盾、近亲繁殖'].forEach((t,i)=>{
      s += V.text(42,166+i*20,'· '+t,{anchor:'start',fs:8.5,color:'var(--ink-2)'});
    });
    s += V.rect(290,118,250,110,'',{fill:'var(--warn-soft)',stroke:'rgba(138,99,32,.62)'});
    s += V.text(415,142,'外部招聘',{fs:11.5,fw:700,color:'var(--warn)'});
    ['优点：带来新鲜空气、缓和内部竞争','缺点：不熟悉内部、打击内部积极性'].forEach((t,i)=>{
      s += V.text(306,166+i*20,'· '+t,{anchor:'start',fs:8.5,color:'var(--ink-2)'});
    });
    return V.svg(w,h,s);
  });

  /* ---- ch04 ---- */
  add('lead-triangle', () => {
    const w=520, h=250;
    let s='';
    // 三角形
    s += `<polygon points="260,40 110,190 410,190" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.4"/>`;
    s += V.text(260,74,'领导者',{fs:12,fw:700,color:'var(--accent-ink)'});
    s += V.text(150,178,'被领导者',{fs:11,fw:600,color:'var(--ink)'});
    s += V.text(370,178,'环境条件',{fs:11,fw:600,color:'var(--ink)'});
    s += V.text(260,148,'领导\n有效性',{fs:10,color:'var(--ink-2)'});
    s += V.text(260,222,'领导有效性 = f（领导者，被领导者，环境）',{fs:10,fw:600,color:'var(--accent-ink)'});
    return V.svg(w,h,s);
  });

  add('expectancy', () => {
    /* 原版 box 宽 126、间距 142（空隙仅 16px），而「关系①」标签宽约 24px，
       标签两端压住左右方框边框。改为 box 118 / 间距 152（空隙 34px），标签完整落在空隙中。 */
    const w=606, h=210;
    let s='';
    const steps=[['努力','肯不肯干'],['绩效','干不干得成'],['奖励','有没有回报'],['需要满足','值不值得']];
    steps.forEach((st,i)=>{
      const x=24+i*152;
      s += V.rect(x,54,118,64,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
      s += V.text(x+59,82,st[0],{fs:12,fw:700,color:'var(--ink)'});
      s += V.text(x+59,102,st[1],{fs:8.5,color:'var(--ink-3)'});
      if(i<3){
        s += `<path d="M${x+120},86 L${x+150},86" stroke="var(--accent)" stroke-width="1.4" marker-end="url(#arrowhead-accent)"/>`;
        s += V.text(x+135,74,'关系'+['①','②','③'][i],{fs:8,color:'var(--accent)'});
      }
    });
    s += V.text(303,150,'激励力 = 效价 × 期望值',{fs:11,fw:700,color:'var(--accent-ink)'});
    s += V.text(303,176,'三个环节任一断裂，激励都会失效',{fs:9,color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });

  /* ---- ch05 ---- */
  add('control-def', () => {
    const w=540, h=220;
    let s='';
    s += V.circle(120,100,48,'控制',{fill:'var(--accent-soft)',stroke:'var(--accent)',color:'var(--accent-ink)',fs:14});
    const outs=[['纠正偏差',280,50],['确保计划实现',280,100],['修订原计划',280,150]];
    outs.forEach(o=>{
      s += V.line(168,100,o[1]-8,o[2],{stroke:'var(--accent-line)'});
      s += V.rect(o[1],o[2]-22,220,44,o[0],{fill:'var(--card)',stroke:'var(--rule-strong)',fs:10.5});
    });
    s += V.text(270,196,'控制产生的原因：环境不确定 · 活动复杂 · 管理失误难免',{fs:9,color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });

/* [已废弃] 旧版 budget 五种预算错两个（缺现金预算与总预算，添费用/投资预算），四不足只剩两条。
   现由后续批次的新版覆盖；此处整段注释，避免加载顺序变化时回退。
  add('budget', () => {
    const w=540, h=240;
    const items=[['收支预算','最常见的现金收支计划'],['时间、空间、产品预算','按维度分解'],['费用预算','部门费用控制'],['投资预算','资本性支出']];
    let s='';
    items.forEach((it,i)=>{
      const y=30+i*50;
      s += V.rect(30,y,480,42,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
      s += V.text(52,y+26,it[0],{anchor:'start',fs:10.5,fw:700,color:'var(--accent-ink)'});
      s += V.text(240,y+26,it[1],{anchor:'start',fs:9,color:'var(--ink-3)'});
    });
    s += V.text(270,222,'预算的不足：易过细、本位主义、突击花钱',{fs:9,color:'var(--bad)'});
    return V.svg(w,h,s);
  });
*/

  /* ---- ch06 ---- */
/* [已废弃] 旧版 z-theory 把 Z 型画成「共同负责」，那是 J 型（日本）的特征。
   现由后续批次的新版覆盖；此处整段注释，避免加载顺序变化时回退。
  add('z-theory', () => {
    const w=560, h=240;
    let s='';
    s += V.text(280,20,'Z 理论（威廉·大内）：强调文化特性与信任',{fs:10.5,fw:700,color:'var(--ink-3)'});
    s += V.rect(26,40,160,150,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(106,64,'A 型（美国）',{fs:11.5,fw:700,color:'var(--ink)'});
    ['短期雇佣','快速评价与晋升','明确控制','个人决策','个人负责'].forEach((t,i)=>{
      s += V.text(40,88+i*20,'· '+t,{anchor:'start',fs:8.5,color:'var(--ink-2)'});
    });
    s += V.rect(200,40,160,150,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(280,64,'J 型（日本）',{fs:11.5,fw:700,color:'var(--ink)'});
    ['终身雇佣','缓慢评价与晋升','含蓄控制','集体决策','集体负责'].forEach((t,i)=>{
      s += V.text(214,88+i*20,'· '+t,{anchor:'start',fs:8.5,color:'var(--ink-2)'});
    });
    s += V.rect(374,40,160,150,'',{fill:'var(--ok-soft)',stroke:'rgba(61,107,74,.62)'});
    s += V.text(454,64,'Z 型（融合）',{fs:11.5,fw:700,color:'var(--ok)'});
    ['长期雇佣','缓慢评价','自我控制','共同决策','共同负责'].forEach((t,i)=>{
      s += V.text(388,88+i*20,'· '+t,{anchor:'start',fs:8.5,color:'var(--ink-2)'});
    });
    s += V.text(280,214,'核心：信任 + 微妙的人际关系 → 生产率提升',{fs:9,color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });

*/

/* [已废弃] 旧版 bpr 把「结果」当成「手段」（合并岗位/压缩层级），课件手段是 IS/IT/TQM。
   现由后续批次的新版覆盖；此处整段注释，避免加载顺序变化时回退。
  add('bpr', () => {
    const w=560, h=220;
    let s='';
    s += V.text(280,22,'组织再造（BPR）：以流程为中心重构，而非按职能切分',{fs:10.5,fw:700,color:'var(--ink-3)'});
    // 左：职能式
    s += V.rect(30,50,220,80,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(140,72,'改造前：按职能分段',{fs:10,fw:700,color:'var(--ink)'});
    ['部门A','部门B','部门C'].forEach((t,i)=>{
      s += V.rect(46+i*70,86,60,30,t,{fill:'var(--card)',stroke:'var(--rule-strong)',fs:9});
    });
    // 右：流程式
    s += V.rect(310,50,220,80,'',{fill:'var(--ok-soft)',stroke:'rgba(61,107,74,.62)'});
    s += V.text(420,72,'改造后：一条流程贯到底',{fs:10,fw:700,color:'var(--ok)'});
    s += V.rect(326,86,188,30,'客户需求 → 交付',{fill:'var(--card)',stroke:'var(--ok)',fs:9,color:'var(--ok)'});
    s += `<path d="M254,90 L306,90" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#arrowhead-accent)"/>`;
    s += V.text(280,158,'再造的典型手段：合并岗位、压缩层级、减少检查与审批节点',{fs:9,color:'var(--ink-3)'});
    s += V.text(280,186,'目的：缩短周期、降低成本、提升质量',{fs:9,color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });
*/

  /* ---- ch07 ---- */
  add('modern-enterprise', () => {
    const w=540, h=260;
    const items=[['产权清晰','这厂子到底是谁的'],['权责明确','谁拍板、谁担责'],['政企分开','政府不插手经营'],['管理科学','本质特点']];
    let s='';
    items.forEach((it,i)=>{
      const x=24+(i%2)*262, y=28+Math.floor(i/2)*92;
      s += V.rect(x,y,248,78,'',{
        fill: i===3?'var(--accent-soft)':'var(--card)',
        stroke: i===3?'var(--accent)':'var(--rule-strong)',
        sw: i===3?1.6:1.2
      });
      s += V.text(x+20,y+30,it[0],{anchor:'start',fs:13,fw:700,color:i===3?'var(--accent-ink)':'var(--ink)'});
      s += V.text(x+20,y+52,it[1],{anchor:'start',fs:9,color:'var(--ink-3)'});
    });
    s += V.text(270,224,'十六字：产权清晰 · 权责明确 · 政企分开 · 管理科学',{fs:10,fw:600,color:'var(--accent-ink)'});
    s += V.text(270,246,'「管理科学」是本质特点——只有它才叫「现代」企业制度',{fs:9,color:'var(--bad)'});
    return V.svg(w,h,s);
  });

/* [已废弃] 旧版 governance 只画了「股东大会→董事会→总经理」一条竖线，
   监事会为旁挂方框、缺「由股东大会产生」的连线。
   现由 diagrams16.js 的新版覆盖；此处整段注释，避免加载顺序变化时回退。
  add('governance', () => {
    const w=560, h=270;
    let s='';
    s += V.rect(190,24,180,48,'股东大会\n最高权力机构',{fill:'var(--accent-soft)',stroke:'var(--accent)',fs:9.5,color:'var(--accent-ink)'});
    s += V.line(280,72,280,96,{stroke:'var(--ink-3)'});
    s += V.rect(190,96,180,48,'董事会\n经营决策机构',{fill:'var(--card)',stroke:'var(--rule-strong)',fs:9.5,color:'var(--ink)'});
    s += V.line(280,144,280,168,{stroke:'var(--ink-3)'});
    s += V.rect(190,168,180,48,'总经理\n日常执行',{fill:'var(--card)',stroke:'var(--rule-strong)',fs:9.5,color:'var(--ink)'});
    // 监事会旁挂
    s += V.rect(410,96,124,120,'监事会\n监督机构',{fill:'var(--warn-soft)',stroke:'var(--warn)',fs:9.5,color:'var(--warn)'});
    s += V.line(370,120,410,120,{stroke:'var(--warn)',dash:'4 3'});
    s += V.line(370,192,410,192,{stroke:'var(--warn)',dash:'4 3'});
    s += V.text(280,244,'决策权 · 执行权 · 监督权 三权制衡',{fs:10,fw:600,color:'var(--accent-ink)'});
    return V.svg(w,h,s);
  });
*/


  add('jsc-ways', () => {
    const w=540, h=220;
    let s='';
    s += V.rect(30,40,220,120,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(140,66,'发起设立',{fs:12.5,fw:700,color:'var(--accent-ink)'});
    s += V.text(140,90,'发起人认购全部股份',{fs:9.5,color:'var(--ink-2)'});
    s += V.text(140,112,'→ 全是自己人',{fs:9,color:'var(--ink-3)'});
    s += V.text(140,142,'不向社会募集',{fs:8.5,color:'var(--ink-3)'});

    s += V.rect(290,40,220,120,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(400,66,'募集设立',{fs:12.5,fw:700,color:'var(--ok)'});
    s += V.text(400,90,'发起人认购一部分',{fs:9.5,color:'var(--ink-2)'});
    s += V.text(400,112,'→ 其余向社会公开募集',{fs:9,color:'var(--ink-3)'});
    s += V.text(400,142,'发行股票后才成立',{fs:8.5,color:'var(--ink-3)'});

    s += V.text(270,190,'判断题陷阱：发起人既可以是自然人，也可以是法人',{fs:9,color:'var(--bad)'});
    return V.svg(w,h,s);
  });

  /* ---- ch08 ---- */
  add('strategy-process', () => {
    const w=580, h=190;
    const steps=[['形势分析','内外环境'],['定使命愿景','我们是谁'],['定目标选战略','去哪、怎么打'],['实施','落地'],['控制','反馈调整']];
    let s='';
    steps.forEach((st,i)=>{
      const x=16+i*114;
      s += V.rect(x,44,102,76,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
      s += V.circle(x+50,64,11,String(i+1),{fill:'var(--accent)',stroke:'var(--accent)',color:'var(--on-fill)',fs:9});
      s += V.text(x+50,92,st[0],{fs:8.5,fw:700,color:'var(--ink)'});
      s += V.text(x+50,108,st[1],{fs:7.5,color:'var(--ink-3)'});
      if(i<4) s += `<path d="M${x+104},82 L${x+112},82" stroke="var(--accent)" stroke-width="1.2" marker-end="url(#arrowhead-accent)"/>`;
    });
    s += `<path d="M540,124 L540,148 L50,148 L50,124" stroke="var(--ink-3)" stroke-width="1" stroke-dasharray="4 3" fill="none" marker-end="url(#arrowhead)"/>`;
    s += V.text(295,168,'动态闭环，不是一次性工作',{fs:9,color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });

  add('strategy-framework', () => {
    const w=540, h=230;
    let s='';
    const stages=[
      ['第一阶段 · 信息输入','EFE 矩阵 · IFE 矩阵 · 竞争态势矩阵','var(--accent)'],
      ['第二阶段 · 匹配','SWOT 矩阵 · 战略选择矩阵 · GS 大战略矩阵','var(--ok)'],
      ['第三阶段 · 决策','定量战略计划矩阵（QSPM）——唯一方法','var(--warn)'],
    ];
    stages.forEach((st,i)=>{
      const y=32+i*66;
      s += V.rect(30,y,480,52,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
      s += V.rect(30,y,5,52,'',{fill:st[2],stroke:st[2],rx:2});
      s += V.text(52,y+22,st[0],{anchor:'start',fs:11,fw:700,color:st[2]});
      s += V.text(52,y+40,st[1],{anchor:'start',fs:8.5,color:'var(--ink-3)'});
    });
    s += V.text(270,222,'注意：SWOT 属于「匹配阶段」，不是分析阶段',{fs:9,color:'var(--bad)'});
    return V.svg(w,h,s);
  });

  /* ---- ch09 ---- */
  add('decision-elements', () => {
    const w=540, h=240;
    const items=[['决策者','谁拍板'],['决策目标','要达成什么'],['决策变量','可选的方案（可控）'],['状态变量','外部环境（不可控）'],['损益值','各方案的结果']];
    let s='';
    /* 先辐条后中心圆：原版中心圆先画，辐条后画 → 线压在「决策 五要素」上。 */
    const spokes = items.map((it,i)=>{
      const a=-Math.PI/2+i*(2*Math.PI/5);
      return {it, x:270+Math.cos(a)*118, y:110+Math.sin(a)*84};
    });
    spokes.forEach(p=>{ s += V.line(270,110,p.x,p.y,{stroke:'var(--accent-line)'}); });
    s += V.circle(270,110,42,'决策\n五要素',{fill:'var(--accent-soft)',stroke:'var(--accent)',color:'var(--accent-ink)',fs:10});
    spokes.forEach(p=>{
      const it=p.it, x=p.x, y=p.y;
      s += V.rect(x-52,y-20,104,40,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
      s += V.text(x,y-2,it[0],{fs:9.5,fw:700,color:'var(--ink)'});
      s += V.text(x,y+13,it[1],{fs:7.5,color:'var(--ink-3)'});
    });
    return V.svg(w,h,s);
  });

  add('decision-methods', () => {
    const w=560, h=250;
    const groups=[
      ['确定型','结果唯一','盈亏平衡 · ABC · 线性规划\n经济批量 · 投资效果','var(--ok)'],
      ['风险型','概率已知','决策树 · 收益矩阵\n敏感性分析','var(--accent)'],
      ['不确定型','概率未知','乐观 · 悲观 · 等可能\n系数 · 最小遗憾','var(--warn)'],
    ];
    let s='';
    groups.forEach((g,i)=>{
      const x=24+i*180;
      s += V.rect(x,30,166,168,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
      s += V.rect(x,30,166,5,'',{fill:g[3],stroke:g[3],rx:2});
      s += V.text(x+83,62,g[0],{fs:13,fw:700,color:g[3]});
      s += V.text(x+83,84,g[1],{fs:9,color:'var(--ink-3)'});
      g[2].split('\n').forEach((ln,j)=>{
        s += `<text x="${x+83}" y="${116+j*18}" text-anchor="middle" style="font-size:8.5px;fill:var(--ink-2)">${ln}</text>`;
      });
    });
    s += V.text(280,222,'判断：给了概率 → 风险型；说「概率无法预测」→ 不确定型',{fs:9,color:'var(--accent-ink)'});
    return V.svg(w,h,s);
  });

  add('brainstorm', () => {
    const w=540, h=230;
    let s='';
    s += V.rect(30,30,220,150,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(140,56,'头脑风暴法',{fs:12.5,fw:700,color:'var(--accent-ink)'});
    ['不许批评、不许争论','自由奔放、保护怪论','联系他人思路多提新案','即席发言、不念稿'].forEach((t,i)=>{
      s += V.text(44,80+i*20,'· '+t,{anchor:'start',fs:8.5,color:'var(--ink-2)'});
    });
    s += V.text(140,168,'10~15 人 · 20~60 分钟 · 领导不参加',{fs:8,color:'var(--ink-3)'});

    s += V.rect(290,30,220,150,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(400,56,'德尔菲法',{fs:12.5,fw:700,color:'var(--ok)'});
    ['专家匿名','多轮反馈','统计收敛','兰德公司 1964 年'].forEach((t,i)=>{
      s += V.text(304,80+i*20,'· '+t,{anchor:'start',fs:8.5,color:'var(--ink-2)'});
    });
    s += V.text(400,168,'10~15 位专家，重大可 100+',{fs:8,color:'var(--ink-3)'});

    s += V.text(270,204,'两者都是定性方法——「下列不属于定量方法」常选德尔菲法',{fs:9,color:'var(--bad)'});
    return V.svg(w,h,s);
  });
})();
