/* ================= 图示补充（第十批）：控制十原则 ================= */
(function(){
  const add = (k, fn) => { if(typeof DIAGRAMS !== 'undefined') DIAGRAMS[k] = fn; };
  if(typeof DIAGRAMS === 'undefined') return;

  /* 十原则总览：前五条方向与重点 / 后五条操作要求 */
  add('control-ten', () => {
    const w=580, h=290;
    let s='';
    s += V.text(290,20,'控制的基本原则（十条）',{fs:10.5,fw:700,color:'var(--ink-3)'});
    // 第一组
    s += V.text(20,44,'方向与重点（前五条）',{anchor:'start',fs:9,fw:700,color:'var(--accent)'});
    const g1=['未来导向','反映计划要求','组织适应性','关键点','例外'];
    g1.forEach((t,i)=>{
      const x=20+i*110;
      s += V.rect(x,52,100,42,t,{fill:'var(--accent-soft)',stroke:'var(--accent-line)',fs:8.5,color:'var(--accent-ink)'});
    });
    // 第二组
    s += V.text(20,122,'操作要求（后五条）',{anchor:'start',fs:9,fw:700,color:'var(--ok)'});
    const g2=['及时性','客观性','准确性','弹性','经济性'];
    g2.forEach((t,i)=>{
      const x=20+i*110;
      s += V.rect(x,130,100,42,t,{fill:'var(--ok-soft)',stroke:'rgba(61,107,74,.62)',fs:8.5,color:'var(--ok)'});
    });
    // 关系说明
    s += V.rect(20,192,540,54,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(290,214,'前五条解决「控制什么、盯哪里」',{fs:9.5,color:'var(--ink)'});
    s += V.text(290,234,'后五条解决「怎么控制才有效」',{fs:9.5,color:'var(--ink)'});
    s += V.text(290,272,'口诀：未来、计划、组织、关键、例外 / 及时、客观、准确、弹性、经济',
      {fs:8.5,color:'var(--accent-ink)'});
    return V.svg(w,h,s);
  });

  /* 未来导向 */
  add('p-future', () => {
    const w=520, h=210;
    let s='';
    s += V.line(50,130,470,130,{stroke:'var(--rule-strong)',sw:1.4});
    s += V.text(60,152,'现在',{fs:9,color:'var(--ink-3)'});
    s += V.text(440,152,'未来',{fs:9,color:'var(--ink-3)'});
    // 前馈
    s += V.rect(60,52,150,54,'',{fill:'var(--ok-soft)',stroke:'var(--ok)'});
    s += V.text(135,76,'着眼未来',{fs:11,fw:700,color:'var(--ok)'});
    s += V.text(135,95,'偏差发生前就控制',{fs:8,color:'var(--ink-3)'});
    s += V.arrow(135,108,135,128,{stroke:'var(--ok)'});
    // 事后
    s += V.rect(300,52,150,54,'',{fill:'var(--bad-soft)',stroke:'var(--bad)'});
    s += V.text(375,76,'等偏差出现',{fs:11,fw:700,color:'var(--bad)'});
    s += V.text(375,95,'损失已造成',{fs:8,color:'var(--ink-3)'});
    s += V.arrow(375,108,375,128,{stroke:'var(--bad)',dash:'4 3'});
    s += V.text(260,186,'开车看前方路况，而不是盯着后视镜',{fs:9,color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });

  /* 反映计划要求 */
  add('p-plan', () => {
    const w=520, h=200;
    let s='';
    s += V.rect(40,60,150,70,'',{fill:'var(--accent-soft)',stroke:'var(--accent)'});
    s += V.text(115,88,'计划',{fs:14,fw:700,color:'var(--accent-ink)'});
    s += V.text(115,110,'要做什么',{fs:9,color:'var(--ink-3)'});
    s += V.arrow(194,95,246,95,{stroke:'var(--accent)',sw:1.6});
    s += V.text(220,84,'提供标准',{fs:8.5,color:'var(--accent)'});
    s += V.rect(250,60,150,70,'',{fill:'var(--ok-soft)',stroke:'var(--ok)'});
    s += V.text(325,88,'控制',{fs:14,fw:700,color:'var(--ok)'});
    s += V.text(325,110,'做得对不对',{fs:9,color:'var(--ink-3)'});
    s += V.text(260,168,'计划越明确完整 → 控制越有效',{fs:9.5,fw:600,color:'var(--accent-ink)'});
    s += V.text(260,188,'没有计划，控制就没有衡量标准',{fs:9,color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });

  /* 组织适应性 */
  add('p-org', () => {
    const w=520, h=220;
    let s='';
    s += V.circle(120,110,44,'组织结构',{fill:'var(--accent-soft)',stroke:'var(--accent)',color:'var(--accent-ink)',fs:10});
    // 元素为 [主文本, 副文本, x, y]：左箭头指向方框左缘，方框 x 为左边界
    const outs=[
      ['信息上传下达','渠道畅通',300,66,'var(--ok)'],
      ['责权分明','各担其责',300,154,'var(--warn)'],
    ];
    outs.forEach(o=>{
      s += V.arrow(166,110,o[2]-4,o[3],{stroke:'var(--accent-line)'});
      s += V.rect(o[2],o[3]-24,180,48,'',{fill:'var(--card)',stroke:o[4]});
      s += V.text(o[2]+90,o[3]-4,o[0],{fs:10,fw:700,color:o[4]});
      s += V.text(o[2]+90,o[3]+14,o[1],{fs:8.5,color:'var(--ink-3)'});
    });
    s += V.text(260,206,'控制信息必须沿组织结构通道传递',{fs:9,color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });

  /* 关键点 */
  add('p-keypoint', () => {
    const w=520, h=205;
    let s='';
    s += V.text(260,22,'关键点原则：抓20%的关键因素',{fs:10.5,fw:700,color:'var(--ink-3)'});
    const items=[['关键因素A','var(--bad)'],['关键因素B','var(--bad)'],['关键因素C','var(--bad)']];
    items.forEach((it,i)=>{
      const x=60+i*140;
      s += V.rect(x,46,120,54,'',{fill:'var(--bad-soft)',stroke:'var(--bad)',sw:1.4});
      s += V.text(x+60,70,it[0],{fs:9.5,fw:700,color:'var(--bad)'});
      s += V.text(x+60,88,'重点控制',{fs:8,color:'var(--ink-3)'});
    });
    s += V.rect(60,116,400,34,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(260,138,'其余大量次要因素 → 抽查即可，不必事事管控',{fs:9,color:'var(--ink-3)'});
    s += V.text(260,176,'管住关键点，用20%投入控制80%风险',{fs:9.5,fw:600,color:'var(--accent-ink)'});
    return V.svg(w,h,s);
  });

  /* 例外原则 */
  add('p-exception', () => {
    const w=520, h=220;
    let s='';
    s += V.rect(40,44,200,60,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(140,68,'常规偏差',{fs:11.5,fw:700,color:'var(--ink)'});
    s += V.text(140,88,'例行纠偏',{fs:9,color:'var(--ink-3)'});
    s += V.rect(280,44,200,60,'',{fill:'var(--warn-soft)',stroke:'var(--warn)'});
    s += V.text(380,68,'例外偏差（特别好／特别坏）',{fs:11.5,fw:700,color:'var(--warn)'});
    s += V.text(380,88,'管理者亲自过问',{fs:9,color:'var(--ink-3)'});
    s += V.rect(40,124,440,46,'',{fill:'var(--accent-soft)',stroke:'var(--accent-line)'});
    s += V.text(260,144,'例外 = 超出常规的重大偏差',{fs:10,fw:700,color:'var(--accent-ink)'});
    s += V.text(260,162,'既包括「坏得出奇」，也包括「好得出奇」（正偏差）',{fs:8.5,color:'var(--ink-3)'});
    s += V.text(260,196,'好得出奇的经验 → 标准化推广（呼应例外原则要管正偏差）',{fs:8.5,color:'var(--ok)'});
    return V.svg(w,h,s);
  });

  /* 及时性 */
  add('p-timely', () => {
    const w=520, h=205;
    let s='';
    s += V.text(260,22,'及时性：缩短时滞，减少损失',{fs:10.5,fw:700,color:'var(--ink-3)'});
    const steps=[['偏差发生',60,'var(--bad)'],['发现偏差',190,'var(--warn)'],['纠正偏差',320,'var(--ok)'],['损失停止',450,'var(--accent)']];
    steps.forEach((st,i)=>{
      s += V.circle(st[1],90,32,st[0].replace('偏差','\n偏差'),{fill:'var(--card)',stroke:st[2],fs:8});
      if(i<3) s += V.arrow(st[1]+34,90,steps[i+1][1]-34,90,{stroke:'var(--ink-3)'});
    });
    s += V.line(60,142,450,142,{stroke:'var(--bad)',dash:'4 3',sw:1.4});
    s += V.text(255,162,'这段就是「时滞」——每天都在造成损失',{fs:9,color:'var(--bad)'});
    s += V.text(255,188,'所以反馈控制的最大缺点就是时滞（亡羊补牢，羊已丢）',{fs:9,color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });

  /* 客观性 */
  add('p-objective', () => {
    const w=520, h=210;
    let s='';
    s += V.rect(30,44,220,66,'',{fill:'var(--bad-soft)',stroke:'var(--bad)'});
    s += V.text(140,68,'主观印象 ✗',{fs:11.5,fw:700,color:'var(--bad)'});
    s += V.text(140,90,'「我觉得他不太积极」',{fs:9,color:'var(--ink-3)'});
    s += V.rect(270,44,220,66,'',{fill:'var(--ok-soft)',stroke:'var(--ok)'});
    s += V.text(380,68,'客观事实 ✓',{fs:11.5,fw:700,color:'var(--ok)'});
    s += V.text(380,90,'「迟到5次，完成率60%」',{fs:9,color:'var(--ink-3)'});
    s += V.rect(30,128,460,50,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(260,150,'前提：标准可衡量、可核查',{fs:10,fw:600,color:'var(--accent-ink)'});
    s += V.text(260,168,'呼应「反映计划要求」：计划明确，控制才能客观',{fs:8.5,color:'var(--ink-3)'});
    s += V.text(260,196,'控制不是感觉，是拿事实说话',{fs:9,color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });

  /* 准确性 */
  add('p-accurate', () => {
    const w=520, h=215;
    let s='';
    s += V.text(260,22,'准确性：信息失真 → 纠正措施必错',{fs:10.5,fw:700,color:'var(--ink-3)'});
    const chain=[['真实信息',50,'var(--ok)'],['准确判断',190,'var(--accent)'],['正确纠正',330,'var(--accent)']];
    chain.forEach((c,i)=>{
      s += V.rect(c[1],50,120,48,c[0],{fill:'var(--card)',stroke:c[2],fs:9.5,color:c[2]});
      if(i<2) s += V.arrow(c[1]+122,74,chain[i+1][1]-2,74,{stroke:'var(--ink-3)'});
    });
    s += V.rect(40,120,440,76,'',{fill:'var(--bad-soft)',stroke:'rgba(140,59,51,.62)'});
    s += V.text(260,142,'信息失真的三个常见原因',{fs:9.5,fw:700,color:'var(--bad)'});
    s += V.text(260,164,'① 下级怕担责，瞒报或美化',{fs:8.5,color:'var(--ink-2)'});
    s += V.text(260,182,'② 层层传递中逐级衰减、扭曲　③ 统计口径不一致',{fs:8.5,color:'var(--ink-2)'});
    return V.svg(w,h,s);
  });

  /* 弹性（控制原则） */
  add('p-flexible', () => {
    const w=520, h=205;
    let s='';
    s += V.text(260,22,'弹性原则：控制系统本身要能应变',{fs:10.5,fw:700,color:'var(--ink-3)'});
    s += V.rect(40,46,200,70,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(140,70,'标准定得太死',{fs:10.5,fw:700,color:'var(--ink)'});
    s += V.text(140,92,'环境一变就失灵',{fs:8.5,color:'var(--ink-3)'});
    s += V.rect(280,46,200,70,'',{fill:'var(--ok-soft)',stroke:'var(--ok)'});
    s += V.text(380,70,'留有机动余地',{fs:10.5,fw:700,color:'var(--ok)'});
    s += V.text(380,92,'未预见情况仍能控制',{fs:8.5,color:'var(--ink-3)'});
    s += V.rect(40,130,440,56,'',{fill:'var(--accent-soft)',stroke:'var(--accent-line)'});
    s += V.text(260,152,'与第1章「弹性原理」同源，层面不同',{fs:9.5,fw:700,color:'var(--accent-ink)'});
    s += V.text(260,172,'体系弹性=多几手（积极）｜控制弹性=标准/方案/预算留余地：既抗不利变化，也接得住新机会',{fs:8,color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });

  /* 经济性 */
  add('p-economy', () => {
    const w=520, h=210;
    let s='';
    s += V.rect(40,46,200,70,'',{fill:'var(--ok-soft)',stroke:'var(--ok)'});
    s += V.text(140,70,'成本 < 收益',{fs:11.5,fw:700,color:'var(--ok)'});
    s += V.text(140,92,'值得控制',{fs:9,color:'var(--ink-3)'});
    s += V.rect(280,46,200,70,'',{fill:'var(--bad-soft)',stroke:'var(--bad)'});
    s += V.text(380,70,'成本 > 收益',{fs:11.5,fw:700,color:'var(--bad)'});
    s += V.text(380,92,'改用抽查/关键点',{fs:9,color:'var(--ink-3)'});
    s += V.rect(40,132,440,50,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(260,154,'查100元的账花1000元 → 没有经济性',{fs:9.5,color:'var(--ink-2)'});
    s += V.text(260,172,'正因如此，才要讲关键点原则和例外原则',{fs:9,color:'var(--accent-ink)'});
    return V.svg(w,h,s);
  });
})();
