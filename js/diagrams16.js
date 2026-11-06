/* ================= 图示修正（第十六批）：ch07 法人治理结构 =================
   课件第 20 页要点 + 标准口径：
     股东大会 = 最高权力机构
     董事会   = 经营决策机构（由股东大会选举）
     监事会   = 监督机构（**同样由股东大会选举**，与董事会平行）
     总经理   = 日常执行（由董事会聘任）
   历史问题：旧图只有「股东大会→董事会→总经理」一条竖线，
   监事会是旁挂方框、没有「由股东大会产生」的连线 → 已重画。
*/
(function(){
  const add = (k, fn) => { if(typeof DIAGRAMS !== 'undefined') DIAGRAMS[k] = fn; };
  if(typeof DIAGRAMS === 'undefined') return;

  add('governance', () => {
    const w=560, h=320;
    let s='';
    s += V.text(280,20,'法人治理结构：四机构与相互制衡',{fs:11,fw:700,color:'var(--ink-3)'});

    // 股东大会（顶部居中）
    s += V.rect(200,40,160,44,'股东大会\n最高权力机构',
      {fill:'var(--accent-soft)',stroke:'var(--accent)',fs:9.5,color:'var(--accent-ink)'});

    // 从股东大会向下分叉：左到董事会，右到监事会（两条「选举」实线）
    s += V.line(280,84,280,104,{stroke:'var(--ink-3)'});
    s += V.line(160,104,400,104,{stroke:'var(--ink-3)'});
    s += V.line(160,104,160,126,{stroke:'var(--ink-3)'});
    s += V.line(400,104,400,126,{stroke:'var(--ink-3)'});
    /* 标签移到竖线右侧并留 6px 间隙：原版 x=160/400 居中压在竖线上，「选举」被线劈成两半。 */
    s += V.text(168,120,'选举',{fs:7.5,color:'var(--ink-3)',anchor:'start'});
    s += V.text(408,120,'选举',{fs:7.5,color:'var(--ink-3)',anchor:'start'});

    // 董事会 / 监事会（平行，同一水平线）
    s += V.rect(80,126,160,44,'董事会\n经营决策机构',
      {fill:'var(--card)',stroke:'var(--rule-strong)',fs:9.5,color:'var(--ink)'});
    s += V.rect(320,126,160,44,'监事会\n监督机构',
      {fill:'var(--warn-soft)',stroke:'var(--warn)',fs:9.5,color:'var(--warn)'});

    // 董事会 → 总经理（聘任）
    s += V.line(160,170,160,200,{stroke:'var(--ink-3)'});
    s += V.text(168,190,'聘任',{fs:7.5,color:'var(--ink-3)',anchor:'start'});
    s += V.rect(80,200,160,44,'总经理\n日常执行',
      {fill:'var(--card)',stroke:'var(--rule-strong)',fs:9.5,color:'var(--ink)'});

    // 监事会 → 监督董事会和总经理（虚线，指向左）
    s += V.line(320,148,242,148,{stroke:'var(--warn)',dash:'4 3'});
    // 先竖向从监事会底边(y=170)下到 y=222，再左折指向总经理（否则起点悬空）
    s += V.line(320,170,320,222,{stroke:'var(--warn)',dash:'4 3'});
    s += V.line(320,222,242,222,{stroke:'var(--warn)',dash:'4 3'});
    s += V.text(281,142,'监督',{fs:7,color:'var(--warn)'});

    // 结论条
    s += V.rect(20,258,520,50,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(280,276,'决策权 · 执行权 · 监督权 三权制衡',{fs:10,fw:600,color:'var(--accent-ink)'});
    s += V.text(280,296,'⚠️ 董事会与监事会平行，都由股东大会选举产生；监事会不是董事会的下级',
      {fs:8,color:'var(--bad)'});

    return V.svg(w,h,s);
  });
})();