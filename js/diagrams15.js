/* ================= 图示修正（第十五批）：ch06 按课件原文重画 ================= */
(function(){
  const add = (k, fn) => { if(typeof DIAGRAMS !== 'undefined') DIAGRAMS[k] = fn; };
  if(typeof DIAGRAMS === 'undefined') return;

  /* ---------- ch06 6.4.1 大内 Z 理论：A / J / Z 三型对比 ----------
     课件第 73—76 页要点：
       A 型（美国）：短期雇佣、快速评价与晋升、明确的控制、个人决策、个人负责
       J 型（日本）：终身雇佣、缓慢评价与晋升、**清晰鲜明的控制手段 + 对人的启发诱导**、
                     集体决策、**共同负责**、自我指挥代替等级指挥
       Z 型（融合）：长期雇佣、缓慢评价与晋升、**集体决策 + 由一个人负责** ← 超高频考点
  */
  add('z-theory', () => {
    const w=580, h=280;
    let s='';
    s += V.text(290,20,'大内 Z 理论：A 型 / J 型 / Z 型三型对比',{fs:10.5,fw:700,color:'var(--ink-3)'});

    const cols=[
      {x:16, name:'A 型（美国）', col:'var(--ink)', bg:'var(--paper-2)',
       items:['短期雇佣','快速评价与晋升','明确的控制','个人决策','个人负责']},
      {x:200, name:'J 型（日本）', col:'var(--ink)', bg:'var(--paper-2)',
       items:['终身雇佣','缓慢评价与晋升','清晰鲜明的控制＋对人的启发诱导','集体决策','共同负责','自我指挥代替等级指挥']},
      {x:384, name:'Z 型（美日融合）', col:'var(--ok)', bg:'var(--ok-soft)',
       items:['长期雇佣','缓慢评价与晋升','集体决策','但最终由一个人负责','（核心考点）']},
    ];
    cols.forEach(c=>{
      s += V.rect(c.x,36,180,190,'',{fill:c.bg,stroke: c.col==='var(--ok)'?'rgba(61,107,74,.35)':'var(--rule)'});
      s += V.text(c.x+90,58,c.name,{fs:11,fw:700,color:c.col});
      c.items.forEach((t,i)=>{
        const isKey = t.indexOf('一个人负责')>=0 || t.indexOf('核心考点')>=0;
        s += V.text(c.x+12,84+i*22,'· '+t,{anchor:'start',fs:8,
          fw: isKey?700:400, color: isKey?'var(--bad)':'var(--ink-2)'});
      });
    });

    s += V.text(290,246,'⚠️ 最高频考点：Z 型 = 集体决策 ＋ 最终由「一个人」负责；'
      +'「共同负责」是 J 型（日本）的特征，别记反',{fs:8.5,fw:700,color:'var(--bad)'});
    s += V.text(290,266,'核心：信任 + 微妙的人际关系 → 生产率提升',{fs:8.5,color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });
})();
