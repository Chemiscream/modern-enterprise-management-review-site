/* ================= 图示补充（第九批）：管理七原理 ================= */
(function(){
  const add = (k, fn) => { if(typeof DIAGRAMS !== 'undefined') DIAGRAMS[k] = fn; };
  if(typeof DIAGRAMS === 'undefined') return;

  /* 七原理总览 */
  add('mgmt-principles7', () => {
    const w=580, h=280;
    const items=[
      ['1 人本','以人为中心','尊重·依靠·发展·为了','var(--accent)'],
      ['2 规律性','按客观规律','生产力·生产关系·上层建筑','var(--ok)'],
      ['3 系统性','追求整体最优','结构合理才1+1>2','var(--warn)'],
      ['4 控制性','调节控制','信息反馈是重要条件','var(--bad)'],
      ['5 弹性','应变能力','积极弹性=多几手','var(--accent)'],
      ['6 激励','激发内在潜力','物质·精神·信息','var(--ok)'],
      ['7 效益','少消耗多产出','必须符合社会需要','var(--warn)'],
    ];
    let s='';
    s += V.text(290,20,'管理的基本原理（七个）',{fs:10.5,fw:700,color:'var(--ink-3)'});
    items.forEach((it,i)=>{
      const x=20+(i%4)*140, y=38+Math.floor(i/4)*104;
      s += V.rect(x,y,130,88,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
      s += V.rect(x,y,130,4,'',{fill:it[3],stroke:it[3],rx:2});
      s += V.text(x+65,y+28,it[0],{fs:11,fw:700,color:it[3]});
      s += V.text(x+65,y+50,it[1],{fs:8.5,color:'var(--ink)'});
      s += `<text x="${x+65}" y="${y+70}" text-anchor="middle" style="font-size:7.5px;fill:var(--ink-3)">${it[2]}</text>`;
    });
    s += V.rect(20,246,540,26,'',{fill:'var(--accent-soft)',stroke:'var(--accent-line)'});
    s += V.text(290,264,'口诀：人、规、系、控、弹、激、效',{fs:9.5,fw:700,color:'var(--accent-ink)'});
    return V.svg(w,h,s);
  });

  /* 规律性原理 */
  add('regularity-principle', () => {
    const w=540, h=230;
    let s='';
    s += V.text(270,20,'规律性原理：按三层客观规律管理企业',{fs:10.5,fw:700,color:'var(--ink-3)'});
    const layers=[
      ['上层建筑','制度·政策·意识形态','var(--bad)'],
      ['生产关系','人与人在生产中的关系','var(--warn)'],
      ['生产力','技术·工艺·效率','var(--ok)'],
    ];
    layers.forEach((L,i)=>{
      const y=46+i*52;
      s += V.rect(60,y,300,44,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
      s += V.rect(60,y,5,44,'',{fill:L[2],stroke:L[2],rx:2});
      s += V.text(82,y+20,L[0],{anchor:'start',fs:11.5,fw:700,color:L[2]});
      s += V.text(82,y+37,L[1],{anchor:'start',fs:8.5,color:'var(--ink-3)'});
    });
    s += V.rect(380,46,130,144,'',{fill:'var(--accent-soft)',stroke:'var(--accent)'});
    s += V.text(445,86,'要用',{fs:9,color:'var(--ink-2)'});
    s += V.text(445,110,'辩证',{fs:12,fw:700,color:'var(--accent-ink)'});
    s += V.text(445,132,'唯物主义',{fs:12,fw:700,color:'var(--accent-ink)'});
    s += V.text(445,158,'去认识',{fs:9,color:'var(--ink-2)'});
    s += V.text(270,214,'违背客观规律 → 受规律惩罚',{fs:9,fw:600,color:'var(--bad)'});
    return V.svg(w,h,s);
  });

  /* 系统性原理 */
  add('system-principle', () => {
    const w=540, h=240;
    let s='';
    s += V.text(270,20,'系统性原理：结构合理，才有 1+1>2',{fs:10.5,fw:700,color:'var(--ink-3)'});
    // 左：结构合理
    s += V.rect(30,42,220,90,'',{fill:'var(--ok-soft)',stroke:'rgba(61,107,74,.62)'});
    s += V.text(140,64,'结构合理',{fs:11,fw:700,color:'var(--ok)'});
    [[90,92],[140,92],[190,92]].forEach(p=>{
      s += V.circle(p[0],p[1],14,'',{fill:'var(--card)',stroke:'var(--ok)'});
    });
    s += V.text(140,122,'整体功能 > 部分之和',{fs:9,color:'var(--ok)'});
    s += V.text(140,150,'例：分工协作顺畅的团队',{fs:8,color:'var(--ink-3)'});

    // 右：结构不合理
    s += V.rect(290,42,220,90,'',{fill:'var(--bad-soft)',stroke:'rgba(140,59,51,.62)'});
    s += V.text(400,64,'结构不合理',{fs:11,fw:700,color:'var(--bad)'});
    [[350,92],[400,92],[450,92]].forEach(p=>{
      s += V.circle(p[0],p[1],14,'',{fill:'var(--card)',stroke:'var(--bad)'});
    });
    s += V.text(400,122,'整体功能 < 部分之和',{fs:9,color:'var(--bad)'});
    s += V.text(400,150,'例：三个和尚没水吃',{fs:8,color:'var(--ink-3)'});

    s += V.rect(30,164,480,52,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(270,186,'企业必须与环境交换「物质 · 能量 · 信息」',{fs:9.5,color:'var(--ink)'});
    s += V.text(270,204,'并适应外部环境变化（开放性）',{fs:8.5,color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });

  /* 控制性原理 */
  add('control-principle', () => {
    const w=540, h=220;
    let s='';
    s += V.text(270,20,'控制性原理：靠信息反馈实现有效控制',{fs:10.5,fw:700,color:'var(--ink-3)'});
    s += V.rect(60,48,140,64,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
    s += V.text(130,74,'计划目标',{fs:11,fw:700,color:'var(--ink)'});
    s += V.text(130,94,'两个前提之一',{fs:8,color:'var(--ink-3)'});

    s += V.rect(340,48,140,64,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
    s += V.text(410,74,'实际执行',{fs:11,fw:700,color:'var(--ink)'});
    s += V.text(410,94,'组织活动',{fs:8,color:'var(--ink-3)'});

    s += `<path d="M202,80 L338,80" stroke="var(--accent)" stroke-width="1.4" marker-end="url(#arrowhead-accent)"/>`;
    s += V.text(270,70,'控制',{fs:9,color:'var(--accent)'});

    s += `<path d="M410,116 L410,150 L130,150 L130,116" stroke="var(--accent)" stroke-width="1.4" fill="none" marker-end="url(#arrowhead-accent)"/>`;
    s += V.text(270,168,'信息反馈（有效控制的重要条件）',{fs:9.5,fw:600,color:'var(--accent-ink)'});

    s += V.rect(60,184,420,28,'',{fill:'var(--warn-soft)',stroke:'rgba(138,99,32,.62)'});
    s += V.text(270,203,'组织机构须明确信息收集、整理、传送的分工与职责',{fs:8.5,color:'var(--warn)'});
    return V.svg(w,h,s);
  });
})();
