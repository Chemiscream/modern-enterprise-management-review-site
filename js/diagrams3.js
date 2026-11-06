/* ================= 图示补充（第三批）：覆盖剩余知识点 ================= */
(function(){
  const add = (k, fn) => { if(typeof DIAGRAMS !== 'undefined') DIAGRAMS[k] = fn; };
  if(typeof DIAGRAMS === 'undefined') return;

  /* ---- ch01 ---- */
  add('mgmt-science', () => {
    const w=540, h=230;
    const items=[['综合性','自然·技术·工程·人文社会科学的交叉'],['科学性','有体系、有规律，可学可考'],['艺术性','熟练运用、巧妙、灵活'],['应用性','不落地就一文不值']];
    let s='';
    items.forEach((it,i)=>{
      const x=24+(i%2)*262, y=28+Math.floor(i/2)*92;
      s += V.rect(x,y,248,76,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
      s += V.text(x+20,y+30,it[0],{anchor:'start',fs:12.5,fw:700,color:'var(--accent-ink)'});
      s += V.text(x+20,y+52,it[1],{anchor:'start',fs:8.5,color:'var(--ink-3)'});
    });
    s += V.text(270,214,'矛盾点：既是科学，又不是纯科学——因为管的是人',{fs:9,color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });

  add('ancient-mgmt', () => {
    const w=560, h=282;
    const rows=[['田忌赛马','对策论 · 零和对策'],['罗马天主教会','西方最成功最有效的正式管理组织'],
                ['汉谟拉比法典','282 条法规 · 中央集权'],['瑟诺芬','做鞋 → 专业化分工效率更高'],
                ['马基雅维利','管理四原则：群众认可/内聚力/领导方法/生存意志'],
                ['另有三项','万里长城 · 《孙子兵法》 · 大金字塔（课件第43—44页）']];
    let s='';
    rows.forEach((r,i)=>{
      const y=26+i*42;
      s += V.rect(30,y,500,34,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
      s += V.text(48,y+22,r[0],{anchor:'start',fs:10.5,fw:700,color:'var(--ink)'});
      s += V.text(200,y+22,r[1],{anchor:'start',fs:9,color:'var(--ink-3)'});
    });
    s += V.text(280,274,'口诀：群、聚、方、志 —— 马基雅维利四原则',{fs:9,color:'var(--accent-ink)'});
    return V.svg(w,h,s);
  });

  /* [已废弃] modern-schools（管理理论六学派旧图）为死代码：
     diagram-map 挂的是 'ch01:1.3.6': 'modern-schools6'（diagrams11.js），全站无引用指向本 key；
     整段注释保留备查，避免加载顺序变化时旧图回退。
    add('modern-schools', () => {
    const w=560, h=250;
    const rows=[['社会系统学派','巴纳德','权威来自下级认可'],['系统管理学派','卡斯特、罗森茨维奇','开放的社会技术系统'],
                ['决策学派','西蒙、马奇','管理就是决策 · 诺贝尔奖'],['经验主义学派','德鲁克','管理是一种实践'],
                ['管理科学学派','伯法','定量模型'],['权变管理学派','卢桑斯','看情况，无万能方法']];
    let s='';
    rows.forEach((r,i)=>{
      const y=24+i*36;
      s += V.rect(30,y,500,30,'',{fill: i%2?'var(--paper-2)':'var(--card)',stroke:'var(--rule)'});
      s += V.text(46,y+20,r[0],{anchor:'start',fs:9.5,fw:700,color:'var(--accent-ink)'});
      s += V.text(180,y+20,r[1],{anchor:'start',fs:9,color:'var(--ink)'});
      s += V.text(310,y+20,r[2],{anchor:'start',fs:8.5,color:'var(--ink-3)'});
    });
    return V.svg(w,h,s);
  });
*/

  /* ---- ch02 ---- */
  add('network-opt', () => {
    const w=540, h=210;
    let s='';
    s += V.text(270,22,'网络计划优化：往哪儿使劲',{fs:10.5,fw:700,color:'var(--ink-3)'});
    const items=[['省钱','从非关键线路抽资源（有时差）','var(--ok)'],
                 ['赶工','压缩关键线路（省一天就少一天）','var(--bad)'],
                 ['保按期','重点盯关键线路，保证按期完成工程','var(--accent)']];
    items.forEach((it,i)=>{
      const y=44+i*52;
      s += V.rect(30,y,480,42,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
      s += V.rect(30,y,5,42,'',{fill:it[2],stroke:it[2],rx:2});
      s += V.text(54,y+26,it[0],{anchor:'start',fs:11,fw:700,color:it[2]});
      s += V.text(120,y+26,it[1],{anchor:'start',fs:9,color:'var(--ink-2)'});
    });
    return V.svg(w,h,s);
  });

  /* ---- ch03 ---- */
  add('culture-build', () => {
    const w=540, h=220;
    const items=[['结合实际','不能照搬别的公司'],['领导带头','言行就是风向标'],
                 ['自律+制度','光靠自觉不行，光靠罚款也不行'],['动态调整','文化不是刻在石头上']];
    let s='';
    items.forEach((it,i)=>{
      const x=24+(i%2)*262, y=28+Math.floor(i/2)*86;
      s += V.rect(x,y,248,70,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
      s += V.circle(x+26,y+35,15,String(i+1),{fill:'var(--accent-soft)',stroke:'var(--accent)',color:'var(--accent-ink)',fs:10});
      s += V.text(x+52,y+30,it[0],{anchor:'start',fs:11.5,fw:700,color:'var(--ink)'});
      s += V.text(x+52,y+50,it[1],{anchor:'start',fs:8.5,color:'var(--ink-3)'});
    });
    return V.svg(w,h,s);
  });

  /* ---- ch04 ---- */
/* [已废弃] 旧版 leader-qualities 画的是「管理人员选聘五条」，与本节 6C/7C 无关。
   现由后续批次的新版覆盖；此处整段注释，避免加载顺序变化时回退。
  add('leader-qualities', () => {
    const w=540, h=230;
    const items=[['强烈的管理欲望','想管人'],['正直的品质','品行端正'],['冒险的精神','敢担风险'],
                 ['正确决策的能力','能拍对板'],['有效沟通的技能','能说明白']];
    let s='';
    s += V.text(270,22,'管理人员的选聘标准：五条共同特征',{fs:10.5,fw:700,color:'var(--ink-3)'});
    items.forEach((it,i)=>{
      const x=24+(i%3)*172, y=40+Math.floor(i/3)*88;
      s += V.rect(x,y,160,70,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
      s += V.text(x+80,y+28,it[0],{fs:10,fw:700,color:'var(--accent-ink)'});
      s += V.text(x+80,y+48,it[1],{fs:8.5,color:'var(--ink-3)'});
    });
    return V.svg(w,h,s);
  });
*/

/* [已废弃] 旧版 lead-styles 把俄亥俄画成「两个维度」，与课件「9 个维度」矛盾。
   现由 diagrams14.js 的新版覆盖；此处整段注释，避免加载顺序变化时回退。

  add('lead-styles', () => {
    const w=560, h=240;
    let s='';
    s += V.text(280,20,'勒温三风格 + 俄亥俄双维度 + 中国 CPM',{fs:10.5,fw:700,color:'var(--ink-3)'});
    // 三风格
    const styles=[['专制型','权力集中，一人拍板','var(--bad)'],['民主型','共同讨论，效率最高','var(--ok)'],['放任型','放手不管','var(--warn)']];
    styles.forEach((st,i)=>{
      const x=24+i*112;
      s += V.rect(x,40,102,74,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
      s += V.text(x+51,64,st[0],{fs:10.5,fw:700,color:st[2]});
      s += V.wrap(x+51,86,st[1],6,12,{fs:8,color:'var(--ink-3)'});
    });
    // CPM
    s += V.rect(370,40,166,74,'',{fill:'var(--accent-soft)',stroke:'var(--accent)'});
    s += V.text(453,64,'中国 CPM 三因素',{fs:10,fw:700,color:'var(--accent-ink)'});
    s += V.text(453,86,'工作绩效 · 团体维系',{fs:8.5,color:'var(--ink-2)'});
    s += V.text(453,102,'个人品德',{fs:8.5,color:'var(--ink-2)'});

    // 俄亥俄
    s += V.rect(24,130,516,72,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(282,152,'俄亥俄州立大学：两个维度 → 四种组合',{fs:10,fw:700,color:'var(--ink)'});
    s += V.text(282,174,'「结构维度」定规矩 × 「关怀维度」暖人心',{fs:9,color:'var(--ink-3)'});
    s += V.text(282,192,'高结构 + 高关怀 = 理想型（对应方格 9,9）',{fs:8.5,color:'var(--accent-ink)'});
    return V.svg(w,h,s);
  });

*/

  add('path-goal', () => {
    const w=540, h=220;
    let s='';
    s += V.text(270,22,'通路—目标理论：领导者的活是「修路」',{fs:10.5,fw:700,color:'var(--ink-3)'});
    const steps=[['明确目标价值','让下属知道值不值'],['提高期望值','让他相信做得到'],['清除障碍（讲义补充）','帮他解决困难'],['增加满足感','工作中就能获得回报']];
    steps.forEach((st,i)=>{
      const x=24+i*132;
      s += V.rect(x,46,120,80,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
      s += V.circle(x+20,68,11,String(i+1),{fill:'var(--accent)',stroke:'var(--accent)',color:'var(--on-fill)',fs:9});
      s += V.text(x+40,72,st[0],{anchor:'start',fs:8.5,fw:700,color:'var(--ink)'});
      s += V.wrap(x+60,96,st[1],10,12,{fs:7.5,color:'var(--ink-3)'});
      if(i<3) s += `<path d="M${x+122},86 L${x+132},86" stroke="var(--accent)" stroke-width="1.2" marker-end="url(#arrowhead-accent)"/>`;
    });
    s += V.text(270,158,'四种领导方式：指令型 · 支持型 · 参与型 · 成就导向型',{fs:9,color:'var(--ink-3)'});
    s += V.text(270,184,'选哪种，看下属特点与环境状况',{fs:9,color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });

  add('transactional-transformational', () => {
    const w=560, h=240;
    let s='';
    s += V.rect(24,36,246,140,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(147,60,'交易型领导',{fs:12.5,fw:700,color:'var(--accent-ink)'});
    s += V.text(147,82,'＝ 交换',{fs:9.5,color:'var(--ink-3)'});
    ['明确角色与任务要求','用报酬/晋升/荣誉交换服从','按表现给奖励或约束'].forEach((t,i)=>{
      s += V.text(40,106+i*20,'· '+t,{anchor:'start',fs:8.5,color:'var(--ink-2)'});
    });
    s += V.text(147,162,'管的是「行为」',{fs:8,color:'var(--ink-3)'});

    s += V.rect(290,36,246,140,'',{fill:'var(--ok-soft)',stroke:'rgba(61,107,74,.62)'});
    s += V.text(413,60,'转化型（变革型）',{fs:12.5,fw:700,color:'var(--ok)'});
    s += V.text(413,82,'＝ 激发',{fs:9.5,color:'var(--ink-3)'});
    ['激励士气，描绘美好前景','帮助下属以新观念看老问题','让下属超越自身利益'].forEach((t,i)=>{
      s += V.text(306,106+i*20,'· '+t,{anchor:'start',fs:8.5,color:'var(--ink-2)'});
    });
    s += V.text(413,162,'管的是「人心」',{fs:8,color:'var(--ink-3)'});

    s += V.text(280,204,'记忆：交易＝谈条件，转化＝画愿景',{fs:9,color:'var(--accent-ink)'});
    return V.svg(w,h,s);
  });

/* [已废弃] 旧版 reinforcement 把负强化画成「撤销惩罚」，与课件「负强化就是惩罚」相反。
   现由后续批次的新版覆盖；此处整段注释，避免加载顺序变化时回退。
  add('reinforcement', () => {
    const w=540, h=240;
    const items=[['正强化','做了就奖励，增加该行为','var(--ok)'],['负强化','撤销惩罚，增加该行为','var(--ok)'],
                 ['惩罚','做了就罚，减少该行为','var(--bad)'],['忽视（消退）','不理会，让行为自然消失','var(--ink-3)']];
    let s='';
    items.forEach((it,i)=>{
      const x=24+(i%2)*262, y=34+Math.floor(i/2)*92;
      s += V.rect(x,y,248,76,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
      s += V.rect(x,y,5,76,'',{fill:it[2],stroke:it[2],rx:2});
      s += V.text(x+22,y+30,it[0],{anchor:'start',fs:12,fw:700,color:it[2]});
      s += V.text(x+22,y+52,it[1],{anchor:'start',fs:8.5,color:'var(--ink-3)'});
    });
    s += V.text(270,222,'易混：负强化 ≠ 惩罚。负强化是「去掉坏事」，惩罚是「加坏事」',{fs:9,color:'var(--bad)'});
    return V.svg(w,h,s);
  });
*/

  /* ---- ch05 ---- */

  add('control-vs-plan', () => {
    const w=540, h=230;
    let s='';
    s += V.circle(120,100,46,'计划',{fill:'var(--accent-soft)',stroke:'var(--accent)',color:'var(--accent-ink)',fs:14});
    s += V.circle(400,100,46,'控制',{fill:'var(--ok-soft)',stroke:'var(--ok)',color:'var(--ok)',fs:14});
    s += `<path d="M170,86 L350,86" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#arrowhead-accent)"/>`;
    s += V.text(260,76,'计划提供标准',{fs:9.5,color:'var(--accent-ink)'});
    s += `<path d="M350,118 L170,118" stroke="var(--ok)" stroke-width="1.5" marker-end="url(#arrowhead-ok)"/>`;
    s += V.text(260,140,'控制保证计划实现',{fs:9.5,color:'var(--ok)'});
    s += V.text(270,190,'控制以计划、组织、领导为基础；没有控制，前三者都可能流于形式',{fs:9,color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });

  add('control-principles2', () => {
    const w=540, h=220;
    const items=[['及时性','发现要快，纠正要迅速'],['客观性','标准可衡量，别拍脑袋'],
                 ['准确性','信息不准会导致错决策'],['弹性','留有余地，能应变'],
                 ['经济性','控制成本 < 控制收益']];
    let s='';
    items.forEach((it,i)=>{
      const x=24+(i%3)*172, y=40+Math.floor(i/3)*88;
      s += V.rect(x,y,160,70,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
      s += V.text(x+80,y+28,it[0],{fs:11.5,fw:700,color:'var(--accent-ink)'});
      s += V.wrap(x+80,y+50,it[1],8,12,{fs:8,color:'var(--ink-3)'});
    });
    return V.svg(w,h,s);
  });

  add('sci-three', () => {
    const w=540, h=220;
    let s='';
    const items=[['系统论','整体大于部分之和','var(--accent)'],['信息论','控制依赖信息流','var(--ok)'],['控制论','反馈与调节','var(--warn)']];
    items.forEach((it,i)=>{
      const x=24+i*176;
      s += V.circle(x+78,84,44,it[0],{fill:'var(--paper-2)',stroke:it[2],color:it[2],fs:11.5});
      s += V.text(x+78,152,it[1],{fs:9,color:'var(--ink-3)'});
    });
    s += V.text(270,196,'SCI 三论是管理控制的理论基础',{fs:9,color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });

  add('control-by-source', () => {
    const w=560, h=230;
    let s='';
    s += V.text(280,20,'两种划分维度（易与「按信息性质」混）',{fs:10.5,fw:700,color:'var(--ink-3)'});
    s += V.rect(24,38,246,140,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(147,62,'按控制来源',{fs:11.5,fw:700,color:'var(--accent-ink)'});
    ['正式组织控制','群体控制','自我控制'].forEach((t,i)=>{
      s += V.text(40,90+i*22,'· '+t,{anchor:'start',fs:9,color:'var(--ink-2)'});
    });
    s += V.text(147,166,'群体控制基于非正式组织',{fs:8,color:'var(--bad)'});

    s += V.rect(290,38,246,140,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(413,62,'按控制手段',{fs:11.5,fw:700,color:'var(--ok)'});
    ['直接控制','间接控制'].forEach((t,i)=>{
      s += V.text(306,90+i*22,'· '+t,{anchor:'start',fs:9,color:'var(--ink-2)'});
    });
    s += V.text(413,166,'注意：另一种划分是「按信息性质」',{fs:8,color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });

  add('non-budget', () => {
    const w=540, h=220;
    const items=[['审计','查账、查流程'],['损益平衡分析','找保本点'],['财务报表分析','看经营状况'],['目标管理','以目标为控制标准']];
    let s='';
    items.forEach((it,i)=>{
      const x=24+(i%2)*262, y=34+Math.floor(i/2)*88;
      s += V.rect(x,y,248,72,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
      s += V.text(x+20,y+28,it[0],{anchor:'start',fs:12,fw:700,color:'var(--accent-ink)'});
      s += V.text(x+20,y+50,it[1],{anchor:'start',fs:8.5,color:'var(--ink-3)'});
    });
    return V.svg(w,h,s);
  });

  /* ---- ch06 ---- */
  add('km-strategy', () => {
    const w=560, h=230;
    let s='';
    s += V.text(280,20,'知识管理的两种策略（80:20 常考）',{fs:10.5,fw:700,color:'var(--ink-3)'});
    s += V.rect(24,38,246,150,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(147,64,'显性化策略',{fs:12,fw:700,color:'var(--accent-ink)'});
    ['知识与人分离','存入数据库反复复用','适合成熟、标准化的知识'].forEach((t,i)=>{
      s += V.text(40,90+i*22,'· '+t,{anchor:'start',fs:8.5,color:'var(--ink-2)'});
    });
    s += V.text(147,164,'例：应用软件开发公司（表6-1）',{fs:8,color:'var(--ink-3)'});

    s += V.rect(290,38,246,150,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(413,64,'隐性化策略',{fs:12,fw:700,color:'var(--ok)'});
    ['知识依附于个人','靠人际交流传递','适合隐性、创新的知识'].forEach((t,i)=>{
      s += V.text(306,90+i*22,'· '+t,{anchor:'start',fs:8.5,color:'var(--ink-2)'});
    });
    s += V.text(413,164,'例：企业战略咨询公司（表6-1）',{fs:8,color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });

  /* ---- ch07 ---- */
  add('enterprise-mgmt', () => {
    const w=540, h=220;
    const items=[['目的性','一切为赚钱'],['组织性','靠组织力量'],['人本性','以人为本'],['创新性','不创新就死'],['艺术性','同样的事效果不同']];
    let s='';
    s += V.text(270,22,'企业管理的五大特征',{fs:10.5,fw:700,color:'var(--ink-3)'});
    items.forEach((it,i)=>{
      const x=20+i*104;
      s += V.rect(x,44,92,82,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
      s += V.text(x+46,72,it[0],{fs:10.5,fw:700,color:'var(--accent-ink)'});
      s += V.wrap(x+46,96,it[1],5,12,{fs:7.5,color:'var(--ink-3)'});
    });
    s += V.text(270,158,'四职能：计划（首要）→ 组织 → 领导 → 控制',{fs:9.5,color:'var(--accent-ink)'});
    s += V.text(270,184,'注意区分：第1章「管理」五职能 vs 第7章「企业管理」四职能',{fs:8.5,color:'var(--bad)'});
    return V.svg(w,h,s);
  });

  /* ---- ch08 ---- */
  add('strategy-choice', () => {
    const w=540, h=230;
    const items=[['依赖环境程度','命脉在别人手里就不敢冒险'],['管理者风险态度','保守还是激进'],['企业过去的战略','路径依赖'],
                 ['权力关系','谁说话算数'],['中层管理人员和职能人员的影响','不配合就执行不下去']];
    let s='';
    items.forEach((it,i)=>{
      const y=26+i*40;
      s += V.rect(30,y,480,32,'',{fill:i%2?'var(--paper-2)':'var(--card)',stroke:'var(--rule)'});
      s += V.circle(52,y+16,12,String(i+1),{fill:'var(--accent-soft)',stroke:'var(--accent)',color:'var(--accent-ink)',fs:9});
      s += V.text(74,y+16,it[0],{anchor:'start',fs:9.5,fw:700,color:'var(--ink)'});
      s += V.text(212,y+16,it[1],{anchor:'start',fs:8.5,color:'var(--ink-3)'});
    });
    return V.svg(w,h,s);
  });

  /* ---- ch09 ---- */
  add('decision-def', () => {
    const w=540, h=230;
    let s='';
    s += V.rect(150,40,240,60,'',{fill:'var(--accent-soft)',stroke:'var(--accent)'});
    s += V.text(270,66,'决策',{fs:16,fw:700,color:'var(--accent-ink)'});
    s += V.text(270,86,'选一个「满意」方案，不是「最优」',{fs:8.5,color:'var(--ink-2)'});
    const outs=[['明确目的',60,150],['若干可行方案',200,150],['分析评价',360,150],['分析判断过程',480,150]];
    outs.forEach((o,i)=>{
      const x=20+i*130;
      s += V.rect(x,146,116,44,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
      s += V.text(x+58,172,o[0],{fs:9,fw:600,color:'var(--ink)'});
      s += V.line(270,100,x+58,146,{stroke:'var(--accent-line)',dash:'3 3'});
    });
    s += V.text(270,212,'西蒙：管理就是决策（强调重要性，不是等同）',{fs:9,color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });

  add('decision-steps', () => {
    const w=580, h=200;
    const steps=[['问题识别','已解决一半'],['确定标准','列因素'],['赋权重','排优先级'],['提出方案','列备选'],['评价选择','挑满意'],['执行检查','看是否解决']];
    let s='';
    steps.forEach((st,i)=>{
      const x=10+i*96;
      s += V.rect(x,44,84,76,'',{fill: i===0?'var(--accent-soft)':'var(--card)',
        stroke: i===0?'var(--accent)':'var(--rule-strong)'});
      s += V.circle(x+18,64,10,String(i+1),{fill: i===0?'var(--accent)':'var(--accent-soft)',
        stroke:'var(--accent)',color: i===0?'var(--on-fill)':'var(--accent-ink)',fs:8});
      s += V.text(x+42,68,st[0],{anchor:'start',fs:8,fw:700,color:'var(--ink)'});
      s += V.text(x+42,96,st[1],{fs:7,color:'var(--ink-3)'});
      if(i<5) s += `<path d="M${x+86},82 L${x+96},82" stroke="var(--accent)" stroke-width="1.1" marker-end="url(#arrowhead-accent)"/>`;
    });
    s += V.text(290,152,'第一步是「问题的识别」，不是「确定目标」',{fs:9,color:'var(--bad)'});
    return V.svg(w,h,s);
  });

  add('decision-premises', () => {
    const w=540, h=210;
    let s='';
    s += V.rect(24,36,246,80,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(147,62,'价值前提',{fs:12.5,fw:700,color:'var(--accent-ink)'});
    s += V.text(147,84,'你觉得什么重要（主观）',{fs:9,color:'var(--ink-3)'});

    s += V.rect(290,36,246,80,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(413,62,'事实前提',{fs:12.5,fw:700,color:'var(--ok)'});
    s += V.text(413,84,'客观情况是什么（可检验）',{fs:9,color:'var(--ink-3)'});

    s += V.rect(24,134,512,56,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
    s += V.text(280,158,'低层次、技术性决策 → 事实前提为主',{fs:9.5,color:'var(--ink)'});
    s += V.text(280,178,'高层次、战略性决策 → 价值前提为主',{fs:9.5,color:'var(--ink)'});
    return V.svg(w,h,s);
  });

  add('decision-risk', () => {
    const w=540, h=230;
    const items=[['市场风险','需求变化'],['投资风险','投入收不回'],['技术风险','技术路线失败'],['政治风险','政策变动']];
    let s='';
    s += V.text(270,22,'决策风险的类型与回避',{fs:10.5,fw:700,color:'var(--ink-3)'});
    items.forEach((it,i)=>{
      const x=24+i*128;
      s += V.rect(x,42,116,64,'',{fill:'var(--bad-soft)',stroke:'rgba(140,59,51,.25)'});
      s += V.text(x+58,68,it[0],{fs:10,fw:700,color:'var(--bad)'});
      s += V.text(x+58,88,it[1],{fs:8,color:'var(--ink-3)'});
    });
    s += V.text(270,132,'回避四条：列清单 · 用信息做好预测 · 增强灵活性 · 强化风险意识',{fs:9,color:'var(--ink-2)'});
    s += V.text(270,164,'「正是风险的存在，决策才有价值」',{fs:10,fw:600,color:'var(--accent-ink)'});
    s += V.text(270,192,'若结果全确定，就不需要决策了',{fs:8.5,color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });
})();
