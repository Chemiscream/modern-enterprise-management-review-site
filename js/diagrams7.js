/* ================= 图示补充（第七批）：新增知识点 ================= */
(function(){
  const add = (k, fn) => { if(typeof DIAGRAMS !== 'undefined') DIAGRAMS[k] = fn; };
  if(typeof DIAGRAMS === 'undefined') return;

  /* 分工与协调 */
  add('division-balance', () => {
    /* v11：原图底座 (232,130,76,14) 与左右两个说明框 (y=112..164) 竖直方向重叠 14px，
       深灰底座直接压在两张色卡上（截图中底座横条盖住「分工的益处」「分工过细的代价」下沿）。
       改为：立柱下移到 y=118，底座 y=118..130，两张色卡下移到 y=142 起，互不相交。 */
    const w=540, h=264;
    let s='';
    s += V.text(270,22,'分工要有合适的「度」',{fs:11,fw:700,color:'var(--ink-3)'});
    // 天平意象
    s += V.line(150,70,390,70,{stroke:'var(--ink-3)',sw:1.5});
    s += V.rect(262,70,16,48,'',{fill:'var(--ink-3)',stroke:'var(--ink-3)'});
    s += V.rect(232,118,76,12,'',{fill:'var(--ink-3)',stroke:'var(--ink-3)'});
    // 左：分工的益处
    s += V.line(170,84,170,142,{stroke:'var(--accent)'});
    s += V.rect(80,142,180,52,'',{fill:'var(--ok-soft)',stroke:'rgba(61,107,74,.62)'});
    s += V.text(170,164,'分工的益处',{fs:10.5,fw:700,color:'var(--ok)'});
    s += V.text(170,184,'熟练 · 效率高',{fs:8.5,color:'var(--ink-3)'});
    // 右：分工的代价
    s += V.line(370,84,370,142,{stroke:'var(--bad)'});
    s += V.rect(280,142,180,52,'',{fill:'var(--bad-soft)',stroke:'rgba(140,59,51,.62)'});
    s += V.text(370,164,'分工过细的代价',{fs:10.5,fw:700,color:'var(--bad)'});
    s += V.text(370,184,'积极性下降 · 协调成本上升',{fs:8.5,color:'var(--ink-3)'});

    s += V.rect(80,212,380,48,'',{fill:'var(--warn-soft)',stroke:'rgba(138,99,32,.58)'});
    s += V.text(270,230,'判断标准：益处 是否 ≥ 代价？',{fs:10.5,fw:700,color:'var(--warn)'});
    s += V.text(270,250,'三大缺点：本位主义 · 单调乏味 · 程序繁琐协调量大',{fs:8.5,color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });

  /* 领导艺术 */
  add('leadership-art', () => {
    const w=540, h=240;
    let s='';
    s += V.text(270,20,'领导艺术 = 更高层次的领导方法',{fs:10.5,fw:700,color:'var(--ink-3)'});
    // 阶梯
    s += V.rect(60,200,90,30,'',{fill:'var(--paper-2)',stroke:'var(--rule-strong)'});
    s += V.text(105,220,'领导理论（规律）',{fs:8.5,color:'var(--ink-2)'});
    s += V.rect(60,160,90,30,'',{fill:'var(--paper-2)',stroke:'var(--rule-strong)'});
    s += V.text(105,180,'领导方法（应用）',{fs:8.5,color:'var(--ink-2)'});
    s += V.rect(60,120,90,30,'',{fill:'var(--accent-soft)',stroke:'var(--accent)'});
    s += V.text(105,140,'领导艺术',{fs:8.5,fw:700,color:'var(--accent-ink)'});
    s += `<path d="M60,210 L60,160" stroke="var(--ink-3)" stroke-width="1" marker-end="url(#arrowhead)"/>`;
    s += `<path d="M60,160 L60,120" stroke="var(--ink-3)" stroke-width="1" marker-end="url(#arrowhead)"/>`;

    // 定义四要素
    s += V.rect(190,120,300,110,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
    s += V.text(340,142,'定义四要素',{fs:9,fw:700,color:'var(--ink-3)'});
    ['知识 · 经验 · 智慧 · 才能（基础）','特殊 · 巧妙 · 高明的手段','创造性 · 卓有成效地解决问题'].forEach((t,i)=>{
      s += V.text(340,162+i*18,t,{fs:8.5,color:'var(--ink-2)'});
    });

    // 提高三途径
    s += V.rect(60,40,420,60,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(270,56,'提高领导艺术三途径',{fs:9,fw:700,color:'var(--ink-3)'});
    s += V.text(270,80,'做本职工作 → 善于交谈倾听 → 争取信任合作',{fs:9,color:'var(--accent-ink)'});
    return V.svg(w,h,s);
  });
})();
