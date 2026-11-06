/* ================= 图示补充（第六批） ================= */
(function(){
  const add = (k, fn) => { if(typeof DIAGRAMS !== 'undefined') DIAGRAMS[k] = fn; };
  if(typeof DIAGRAMS === 'undefined') return;

  /* 电子商务四阶段 + 十特点（课件第 66—67 页，①—⑩） */
  add('ecommerce', () => {
    const w=580, h=270;
    let s='';
    s += V.text(290,22,'电子商务：交易四阶段 + 十个特点',{fs:10.5,fw:700,color:'var(--ink-3)'});

    // 四阶段
    const stages=['搜索','下单和支付','订单履行与配送','售后服务'];
    stages.forEach((t,i)=>{
      const x=26+i*136;
      s += V.rect(x,44,124,52,'',{fill:'var(--accent-soft)',stroke:'var(--accent-line)'});
      s += V.circle(x+20,70,12,String(i+1),{fill:'var(--accent)',stroke:'var(--accent)',color:'var(--on-fill)',fs:9});
      s += V.text(x+70,74,t,{fs:8.5,fw:600,color:'var(--accent-ink)'});
      if(i<3) s += `<path d="M${x+126},70 L${x+136},70" stroke="var(--accent)" stroke-width="1.2" marker-end="url(#arrowhead-accent)"/>`;
    });

    // 十特点
    const feats=['①普遍存在性·全球可达性','②及时性','③交互性','④信息丰富性','⑤标准化','⑥个性化与定制','⑦人性化','⑧整合性','⑨经济性','⑩技术性'];
    feats.forEach((t,i)=>{
      const x=26+(i%5)*110, y=118+Math.floor(i/5)*58;
      s += V.rect(x,y,102,46,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
      s += V.text(x+51,y+28,t,{fs:7.2,color:'var(--ink-2)'});
    });

    s += V.text(290,246,'定义关键词：借助「任何通信网络」——不只是因特网',{fs:8.5,color:'var(--bad)'});
    return V.svg(w,h,s);
  });
})();
