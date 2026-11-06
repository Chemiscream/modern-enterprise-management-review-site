/* ================= 图示补充（第十二批）：马斯洛 Z 理论 ================= */
(function(){
  const add = (k, fn) => { if(typeof DIAGRAMS !== 'undefined') DIAGRAMS[k] = fn; };
  if(typeof DIAGRAMS === 'undefined') return;

  add('maslow-z', () => {
    const w=580, h=300;
    let s='';
    s += V.text(290,20,'马斯洛的 Z 理论（1969《Theory z》）',{fs:11,fw:700,color:'var(--ink-3)'});

    // 左侧：X/Y/Z 三层划分
    const layers=[
      ['Z 理论','6. 最高需求（超越灵性需求）','var(--ok)'],
      ['Y 理论','5. 自我实现　4. 受人尊重　3. 爱与隶属','var(--accent)'],
      ['X 理论','2. 安全需求　1. 生理需求','var(--warn)'],
    ];
    layers.forEach((L,i)=>{
      const y=40+i*54;
      s += V.rect(20,y,320,46,'',{fill:'var(--paper-2)',stroke:L[2],sw:1.4});
      s += V.text(34,y+18,L[0],{anchor:'start',fs:10,fw:700,color:L[2]});
      s += `<text x="34" y="${y+36}" style="font-size:8px;fill:var(--ink-3)">${L[1]}</text>`;
    });

    // 右侧：为什么加第6层
    s += V.rect(356,40,204,154,'',{fill:'var(--accent-soft)',stroke:'var(--accent-line)'});
    s += V.text(458,62,'为什么要加第 6 层',{fs:9.5,fw:700,color:'var(--accent-ink)'});
    s += V.text(372,86,'只强调「自我实现」',{fs:8,color:'var(--ink-2)'});
    s += V.text(372,104,'→ 会导向不健康的',{fs:8,color:'var(--ink-2)'});
    s += V.text(372,122,'　个人主义、自我中心',{fs:8,color:'var(--bad)'});
    s += V.text(372,146,'人需要「超越自我」',{fs:8.5,fw:600,color:'var(--ok)'});
    s += V.text(372,168,'→ 第 6 层诞生',{fs:8,color:'var(--ink-3)'});

    // 底部：别名与两种经验
    s += V.rect(20,208,540,54,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(290,226,'第 6 层的别名：超个人 · 超越 · 灵性 · 超人性 · 超越自我 · 神秘的 · 有道的 · 超人本 · 天人合一',
      {fs:8,color:'var(--ink-2)'});
    s += V.text(290,248,'放在这一层的两种经验：高峰经验 · 高原经验',{fs:8.5,fw:600,color:'var(--accent-ink)'});

    s += V.text(290,282,'⚠️ 马斯洛 Z 理论 ≠ 大内 Z 理论：前者讲需求第6层，后者讲美日管理融合',
      {fs:8.5,fw:600,color:'var(--bad)'});
    return V.svg(w,h,s);
  });
})();
