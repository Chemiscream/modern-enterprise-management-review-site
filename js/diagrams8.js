/* ================= 图示补充（第八批）：ERG 理论 ================= */
(function(){
  const add = (k, fn) => { if(typeof DIAGRAMS !== 'undefined') DIAGRAMS[k] = fn; };
  if(typeof DIAGRAMS === 'undefined') return;

  /* ERG 三层 vs 马斯洛五层 + 挫折后退 */
  add('erg-theory', () => {
    const w=580, h=290;
    let s='';
    s += V.text(290,20,'ERG 理论：马斯洛五层压成三层 + 挫折—后退',{fs:10,fw:700,color:'var(--ink-3)'});

    // 左：马斯洛五层
    const maslow=[['自我实现','var(--accent)'],['尊重','var(--accent)'],['社交','var(--accent)'],['安全','var(--accent)'],['生理','var(--accent)']];
    maslow.forEach((m,i)=>{
      const y=36+i*34;
      s += V.rect(40,y,90,30,'',{fill:'var(--paper-2)',stroke:'var(--rule-strong)'});
      s += V.text(85,y+20,m[0],{fs:8.5,color:'var(--ink-2)'});
    });
    s += V.text(85,222,'马斯洛 5 层',{fs:9,fw:700,color:'var(--ink-3)'});

    // 中间：ERG 三层
    const erg=[
      ['Growth 成长','自我实现',36,64,'var(--ok)'],
      ['Relatedness 相互关系','交往+自我尊重',100,64,'var(--warn)'],
      ['Existence 生存','生理+安全',164,64,'var(--accent)'],
    ];
    erg.forEach(e=>{
      s += V.rect(180,e[2],150,e[3],'',{fill:'var(--card)',stroke:e[4],sw:1.4});
      s += V.text(255,e[2]+26,e[0],{fs:9,fw:700,color:e[4]});
      s += V.text(255,e[2]+46,e[1],{fs:8,color:'var(--ink-3)'});
    });
    s += V.text(255,228,'ERG 3 类',{fs:9,fw:700,color:'var(--accent-ink)'});

    // 箭头：马斯洛→ERG
    s += `<path d="M134,90 L176,90" stroke="var(--accent)" stroke-width="1.2" marker-end="url(#arrowhead-accent)"/>`;

    // 右侧：挫折后退
    s += V.rect(360,36,196,180,'',{fill:'var(--warn-soft)',stroke:'rgba(138,99,32,.28)'});
    s += V.text(458,58,'核心修正',{fs:10,fw:700,color:'var(--warn)'});
    s += V.text(458,78,'挫折 — 后退',{fs:12,fw:700,color:'var(--warn)'});
    s += V.text(376,104,'高层的需要受挫时，',{fs:8.5,color:'var(--ink-2)'});
    s += V.text(376,122,'人会退回到较低层次',{fs:8.5,color:'var(--ink-2)'});
    // 向下箭头
    s += `<path d="M458,134 L458,164" stroke="var(--bad)" stroke-width="1.6" marker-end="url(#arrowhead-bad)"/>`;
    s += V.text(458,182,'退回去寻求满足',{fs:8.5,color:'var(--bad)'});
    s += V.text(458,202,'（马斯洛没有这条）',{fs:8,color:'var(--ink-3)'});

    s += V.text(290,256,'记忆：「求田问舍」＝高成就受挫后退回生存／相互关系需要',{fs:8.5,color:'var(--accent-ink)'});
    return V.svg(w,h,s);
  });
})();
