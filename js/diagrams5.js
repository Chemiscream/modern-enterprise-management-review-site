/* ================= 图示补充（第五批）：ch01 新增知识点 ================= */
(function(){
  const add = (k, fn) => { if(typeof DIAGRAMS !== 'undefined') DIAGRAMS[k] = fn; };
  if(typeof DIAGRAMS === 'undefined') return;

  /* 弹性原理：消极 vs 积极 */
  add('elasticity', () => {
    const w=540, h=230;
    let s='';
    s += V.text(270,22,'弹性原理：留余地 ≠ 留一手',{fs:10.5,fw:700,color:'var(--ink-3)'});
    s += V.rect(24,40,246,140,'',{fill:'var(--bad-soft)',stroke:'rgba(140,59,51,.62)'});
    s += V.text(147,66,'消极弹性',{fs:13,fw:700,color:'var(--bad)'});
    s += V.text(147,86,'把留余地当作「留一手」',{fs:9,color:'var(--ink-2)'});
    ['计划松些','指标低些','人员多些','预算高些'].forEach((t,i)=>{
      s += V.text(40,110+i*17,'· '+t,{anchor:'start',fs:8.5,color:'var(--ink-3)'});
    });
    s += V.text(147,172,'课件：不提倡',{fs:8.5,fw:600,color:'var(--bad)'});

    s += V.rect(290,40,246,140,'',{fill:'var(--ok-soft)',stroke:'rgba(61,107,74,.62)'});
    s += V.text(413,66,'积极弹性',{fs:13,fw:700,color:'var(--ok)'});
    s += V.text(413,86,'不是「留一手」而是「多几手」',{fs:9,color:'var(--ink-2)'});
    ['科学预测','准备多套调节方案','给系统更大灵活性'].forEach((t,i)=>{
      s += V.text(306,110+i*17,'· '+t,{anchor:'start',fs:8.5,color:'var(--ink-3)'});
    });
    s += V.text(413,172,'课件：现代管理应着眼于此',{fs:8.5,fw:600,color:'var(--ok)'});
    return V.svg(w,h,s);
  });

  /* 激励原理：三种动力 */
  add('motivation-three', () => {
    const w=560, h=240;
    let s='';
    s += V.text(280,22,'激励原理：三种动力',{fs:10.5,fw:700,color:'var(--ink-3)'});
    const items=[
      ['物质动力','钱、奖金、待遇','直接（「会递减」系讲义补充）','var(--accent)'],
      ['精神动力','认可、荣誉、成就','巨大且无止境','var(--ok)'],
      ['信息动力','知道得越多越有劲','相对独立、超越物质精神','var(--warn)'],
    ];
    items.forEach((it,i)=>{
      const x=24+i*180;
      s += V.rect(x,42,166,140,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
      s += V.rect(x,42,166,5,'',{fill:it[3],stroke:it[3],rx:2});
      s += V.text(x+83,74,it[0],{fs:12.5,fw:700,color:it[3]});
      s += V.text(x+83,98,it[1],{fs:8.5,color:'var(--ink-2)'});
      s += V.wrap(x+83,126,it[2],11,13,{fs:8,color:'var(--ink-3)'});
    });
    s += V.text(280,208,'口诀：物质靠给 · 精神靠认 · 信息靠知',{fs:9.5,fw:600,color:'var(--accent-ink)'});
    s += V.text(280,228,'注意：精神动力必须依赖一定物质基础（判断题陷阱）',{fs:8.5,color:'var(--bad)'});
    return V.svg(w,h,s);
  });

  /* 效益原理 */
  add('benefit-principle', () => {
    const w=540, h=220;
    let s='';
    s += V.rect(24,40,150,54,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(99,62,'尽量少的',{fs:9,color:'var(--ink-3)'});
    s += V.text(99,80,'活劳动+物化劳动+资金占用',{fs:8,fw:600,color:'var(--ink)'});

    s += V.arrow(180,67,212,67,{stroke:'var(--accent)',sw:1.4});

    s += V.rect(218,40,150,54,'',{fill:'var(--accent-soft)',stroke:'var(--accent)'});
    s += V.text(293,62,'生产过程',{fs:10,fw:700,color:'var(--accent-ink)'});
    s += V.text(293,80,'投入 → 转换',{fs:8.5,color:'var(--ink-3)'});

    s += V.arrow(374,67,406,67,{stroke:'var(--accent)',sw:1.4});

    s += V.rect(412,40,110,54,'',{fill:'var(--ok-soft)',stroke:'var(--ok)'});
    s += V.text(467,62,'尽量多的',{fs:9,color:'var(--ink-3)'});
    s += V.text(467,80,'符合社会需要',{fs:9,fw:700,color:'var(--ok)'});

    s += V.rect(24,116,498,58,'',{fill:'var(--warn-soft)',stroke:'rgba(138,99,32,.28)'});
    s += V.text(273,140,'题眼：「符合社会需要」',{fs:10.5,fw:700,color:'var(--warn)'});
    s += V.text(273,160,'生产出来卖不掉 → 不算效益；还要兼顾社会效益与资源利用',{fs:8.5,color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });

  /* 管理道德四观 */
  add('ethics-views', () => {
    const w=560, h=250;
    const items=[
      ['功利主义','看结果：多数人最大利益','「总体上划算就干」','var(--accent)'],
      ['权利至上','看是否侵犯个人权利','「不能踩人的底线」','var(--ok)'],
      ['公平原则','看是否一视同仁','「凭什么他能我不能」','var(--warn)'],
      ['综合社会契约','看社会普遍共识','「大家都认可的规矩」','var(--ink-2)'],
    ];
    let s='';
    s += V.text(280,22,'管理道德的四种道德观',{fs:10.5,fw:700,color:'var(--ink-3)'});
    items.forEach((it,i)=>{
      const x=24+(i%2)*262, y=40+Math.floor(i/2)*80;
      s += V.rect(x,y,248,66,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
      s += V.rect(x,y,5,66,'',{fill:it[3],stroke:it[3],rx:2});
      s += V.text(x+20,y+26,it[0],{anchor:'start',fs:11.5,fw:700,color:it[3]});
      s += V.text(x+20,y+45,it[1],{anchor:'start',fs:8.5,color:'var(--ink-2)'});
      s += V.text(x+20,y+60,it[2],{anchor:'start',fs:8,color:'var(--ink-3)'});
    });
    s += V.text(280,214,'课件结论：大多数组织对道德行为持「功利主义」态度',{fs:9.5,fw:600,color:'var(--accent-ink)'});
    return V.svg(w,h,s);
  });

  /* 道德发展阶段三层六级 */
  add('moral-stages', () => {
    const w=560, h=270;
    let s='';
    s += V.text(280,22,'个人道德发展的三个层次、六个阶段',{fs:10.5,fw:700,color:'var(--ink-3)'});
    const levels=[
      ['前惯例层次','阶段1-2','只看后果与自身利益','var(--bad)'],
      ['惯例层次','阶段3-4','看他人期望与社会规范','var(--warn)'],
      ['规范与原则层次','阶段5-6','看内在原则（可超越法律）','var(--ok)'],
    ];
    levels.forEach((L,i)=>{
      const y=42+i*68;
      s += V.rect(30,y,500,58,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
      s += V.rect(30,y,5,58,'',{fill:L[3],stroke:L[3],rx:2});
      s += V.text(56,y+24,L[0],{anchor:'start',fs:12,fw:700,color:L[3]});
      s += V.text(56,y+43,L[1],{anchor:'start',fs:8.5,color:'var(--ink-3)'});
      s += V.text(210,y+34,L[2],{anchor:'start',fs:9.5,color:'var(--ink-2)'});
    });
    s += V.text(280,258,'道德水平由低到高递进（并非人人事事都到第六阶段）',{fs:8.5,color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });

  /* 责任与绿色化 */
  add('social-responsibility', () => {
    const w=560, h=280;
    let s='';
    s += V.text(280,20,'社会责任的七个方面 + 绿色化四方式',{fs:10.5,fw:700,color:'var(--ink-3)'});
    const seven=['环境','员工','股东','顾客','供应商','竞争者','社区'];
    /* 先辐条后中心圆：原版中心圆先画，7 条辐条后画 → 线穿过「社会责任」四字。 */
    const spokes = seven.map((t,i)=>{
      const a=-Math.PI/2+i*(2*Math.PI/7);
      return {t, x:150+Math.cos(a)*82, y:150+Math.sin(a)*72};
    });
    spokes.forEach(p=>{ s += V.line(150,150,p.x,p.y,{stroke:'var(--accent-line)'}); });
    s += V.circle(150,150,42,'社会责任',{fill:'var(--accent-soft)',stroke:'var(--accent)',color:'var(--accent-ink)',fs:10});
    spokes.forEach(p=>{
      const t=p.t, x=p.x, y=p.y;
      const isKey = t==='竞争者';
      s += V.circle(x,y,15,t,{
        fill: isKey?'var(--bad-soft)':'var(--card)',
        stroke: isKey?'var(--bad)':'var(--rule-strong)',
        color: isKey?'var(--bad)':'var(--ink)',
        fs:8
      });
    });
    // 右侧绿色化阶梯
    const steps=['法律','市场','利益相关者','活动家'];
    steps.forEach((t,i)=>{
      const x=330+i*52, hh=84;
      s += V.rect(x, 210-hh, 44, hh, '', {
        fill: i===3?'var(--ok-soft)':'var(--paper-2)',
        stroke: i===3?'var(--ok)':'var(--rule-strong)'
      });
      s += V.text(x+22, 224-hh+12, t, {fs:7.5, fw:600, color:i===3?'var(--ok)':'var(--ink-2)'});
    });
    s += V.text(456,232,'四种方式·课件第139页并列（非排序）',{fs:7.5,color:'var(--ink-3)'});
    s += V.text(410,264,'活动家方式环境敏感度最高（讲义通说·课件第139页未排序·题据见 mcq-ch1-36）',{fs:7.8,color:'var(--ok)'});
    return V.svg(w,h,s);
  });

  /* 企业管理三阶段 */
  add('enterprise-flow', () => {
    const w=560, h=220;
    let s='';
    s += V.text(280,22,'企业生产经营活动的三个阶段',{fs:10.5,fw:700,color:'var(--ink-3)'});
    const stages=[
      ['投入','市场调研·销售预测\n经营决策·产品开发\n资金筹措','var(--accent)'],
      ['转换','生产与运作管理\n技术准备·基本生产\n辅助生产过程','var(--warn)'],
      ['产出','产品销售·售后服务\n信息反馈','var(--ok)'],
    ];
    stages.forEach((st,i)=>{
      const x=24+i*176;
      s += V.rect(x,44,160,120,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
      s += V.rect(x,44,160,5,'',{fill:st[2],stroke:st[2],rx:2});
      s += V.text(x+80,76,st[0],{fs:14,fw:700,color:st[2]});
      st[1].split('\n').forEach((ln,j)=>{
        s += `<text x="${x+80}" y="${104+j*17}" text-anchor="middle" style="font-size:8px;fill:var(--ink-3)">${ln}</text>`;
      });
      if(i<2) s += V.arrow(x+162,104,x+176,104,{stroke:'var(--accent)',sw:1.3});
    });
    s += `<path d="M440,176 L440,192 L104,192 L104,168" stroke="var(--ink-3)" stroke-width="1"
      stroke-dasharray="4 3" fill="none" marker-end="url(#arrowhead)"/>`;
    s += V.text(272,208,'信息反馈回到起点 → 形成循环（名目系讲义归纳、非课件字样）',{fs:8.5,color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });
})();
