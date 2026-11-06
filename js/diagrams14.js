/* ================= 图示修正（第十四批）：纠正确有三处画错的图 ================= */
(function(){
  const add = (k, fn) => { if(typeof DIAGRAMS !== 'undefined') DIAGRAMS[k] = fn; };
  if(typeof DIAGRAMS === 'undefined') return;

  /* ---------- ch06 6.1.1 危机七类型（按课件七类：信息/产品/价格/商誉/财务/资产/人才） ---------- */
  add('crisis-types', () => {
    /* v11：副文本最长 16 字（「品种/质量/包装等与市场需求脱节」），fs=7 时约 112px，
       原方框仅 96px 宽 → 文字两头出框。画布加宽到 660、方框加宽到 128，副文本 fs 提到 7.5。 */
    const w=660, h=300;
    const cx=330, cy=150;
    const items=[
      ['信息危机','商情变幻·信息失误致决策失当'],
      ['产品危机','品种/质量/包装等与市场需求脱节'],
      ['价格危机','价格战·定价偏高'],
      ['商誉危机','信誉受损'],
      ['财务危机','资金链断'],
      ['资产危机','意外/失职/破坏'],
      ['人才危机','核心人员流失'],
    ];
    let s='';
    s += V.text(cx,20,'危机情境的七种类型（课件原文）',{fs:10.5,fw:700,color:'var(--ink-3)'});
    /* 先辐条后中心圆：原版中心圆先画，辐条后画 → 线压在「危机 情境」上。 */
    const spokes = items.map((it,i)=>{
      const a=-Math.PI/2+i*(2*Math.PI/7);
      return {it, x:cx+Math.cos(a)*180, y:cy+Math.sin(a)*105};
    });
    spokes.forEach(p=>{ s += V.line(cx,cy,p.x,p.y,{stroke:'rgba(140,59,51,.62)'}); });
    s += V.circle(cx,cy,44,'危机\n情境',{fill:'var(--bad-soft)',stroke:'var(--bad)',color:'var(--bad)',fs:12});
    spokes.forEach(p=>{
      const it=p.it, x=p.x, y=p.y;
      s += V.rect(x-64,y-17,128,34,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
      s += V.text(x,y-3,it[0],{fs:9,fw:600,color:'var(--ink)'});
      s += V.text(x,y+11,it[1],{fs:7.5,color:'var(--ink-3)'});
    });
    s += V.text(cx,286,'四特点：突发性 · 威胁性 · 紧迫性 · 公开性',{fs:8.5,fw:600,color:'var(--accent-ink)'});
    return V.svg(w,h,s);
  });

  /* ---------- ch04 4.3.2 俄亥俄九维度（课件：亨普希尔和孔斯提出 9 个维度） ---------- */
  add('lead-styles', () => {
    const w=580, h=290;
    let s='';
    s += V.text(290,20,'莱温三风格（亦译勒温） · 俄亥俄九维度 · 中国 CPM 三因素',{fs:10.5,fw:700,color:'var(--ink-3)'});

    // 莱温三风格
    /* 课件第 35 页实验结论缩写：民主＝效率最高＋比较满意｜专制＝较高＋关系很差｜放任＝最低＋不满意 */
    const styles=[['专制型','效率较高，关系很差','var(--bad)'],
                  ['民主型','效率最高，比较满意','var(--ok)'],
                  ['放任型','效率最低，不满意','var(--warn)']];
    styles.forEach((st,i)=>{
      const x=18+i*100;
      s += V.rect(x,34,94,66,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
      s += V.text(x+47,56,st[0],{fs:10,fw:700,color:st[2]});
      s += V.wrap(x+47,74,st[1],6,12,{fs:7.5,color:'var(--ink-3)'});
    });

    // 中国 CPM
    s += V.rect(330,34,110,66,'',{fill:'var(--accent-soft)',stroke:'var(--accent)'});
    s += V.text(385,54,'中国 CPM',{fs:10,fw:700,color:'var(--accent-ink)'});
    s += V.text(385,72,'3 个因素',{fs:8.5,color:'var(--ink-2)'});
    s += V.text(385,88,'P 绩效 M 维系 C 品德',{fs:6.5,color:'var(--ink-3)'});

    // 俄亥俄 9 维度
    s += V.rect(450,34,120,66,'',{fill:'var(--ok-soft)',stroke:'var(--ok)'});
    s += V.text(510,54,'俄亥俄研究',{fs:10,fw:700,color:'var(--ok)'});
    s += V.text(510,72,'9 个维度',{fs:9,fw:700,color:'var(--ok)'});
    s += V.text(510,88,'（不是 2 个）',{fs:7,color:'var(--bad)'});

    // 九维度清单
    s += V.rect(18,112,552,110,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(294,132,'亨普希尔和孔斯提出的领导行为九维度',{fs:9.5,fw:700,color:'var(--ink)'});
    const dims=['①主动','②成员身份','③代表','④整合','⑤组织','⑥管辖','⑦信息沟通','⑧认可','⑨生产'];
    dims.forEach((d,i)=>{
      const col=i%5, row=Math.floor(i/5);
      const x=40+col*106, y=156+row*30;
      s += V.text(x,y,d,{fs:8.5,color:'var(--ink-2)'});
    });

    s += V.text(294,244,'⚠️ 俄亥俄＝9 维度（行为）｜CPM＝3 因素（多了「个人品德」）｜莱温＝3 风格（专制／民主／放任，无「规范型」）',
      {fs:8,fw:600,color:'var(--bad)'});
    s += V.text(294,266,'领导方格理论（布莱克和穆顿）是另一套 5 种典型，别与俄亥俄混淆',{fs:7.5,color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });
})();
