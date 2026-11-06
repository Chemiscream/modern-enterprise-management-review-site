/* ================= 图示修正（第二十二批）：ch05 预算种类与不足 =================
   课件第 38 页（预算种类）：
     (1) 收支预算 —— 以货币表示组织收入和经营费用支出的计划
     (2) 时间、空间、原材料和产品产量预算 —— 以实物单位表示
     (3) 资本支出预算 —— 厂房、机器、设备、库存等资本支出
     (4) **现金预算** —— 对现金收支的预测，**从某种意义上来说是组织中最重要的一种控制**
     (5) **总预算** —— 编制预算汇总表，用于公司的**全面业绩控制**
   课件第 39 页（预算的不足）：
     ①容易导致控制过细 ②容易导致本位主义 ③容易导致效能低下
     ④缺乏灵活性 —— **这也许是预算最大的缺陷**
*/
(function(){
  const add = (k, fn) => { if(typeof DIAGRAMS !== 'undefined') DIAGRAMS[k] = fn; };
  if(typeof DIAGRAMS === 'undefined') return;

  add('budget', () => {
    const w=580, h=330;
    let s='';
    s += V.text(290,20,'预算的种类（五类）与不足（四条）· 课件第 38—39 页',{fs:10.5,fw:700,color:'var(--ink-3)'});

    // 五类
    const items=[
      ['①收支预算','以货币表示收入与经营费用支出'],
      ['②时间·空间·原材料和产品产量预算','以实物单位表示'],
      ['③资本支出预算','厂房、机器、设备、库存等'],
      ['④现金预算','对现金收支的预测 —— 最重要的一种控制'],
      ['⑤总预算','预算汇总表 —— 全面业绩控制'],
    ];
    items.forEach((it,i)=>{
      const y=40+i*40;
      const key = i===3 || i===4;
      s += V.rect(20,y,540,34,'',{fill: key?'var(--accent-soft)':'var(--card)',
        stroke: key?'var(--accent)':'var(--rule-strong)'});
      s += V.text(32,y+14,it[0],{anchor:'start',fs:9,fw:700,
        color: key?'var(--accent-ink)':'var(--ink)'});
      s += V.text(32,y+27,it[1],{anchor:'start',fs:7.8,color:'var(--ink-3)'});
    });

    // 四不足
    s += V.rect(20,246,540,62,'',{fill:'var(--bad-soft)',stroke:'var(--bad)'});
    s += V.text(290,264,'预算的四条不足（课件第 39 页）',{fs:9.5,fw:700,color:'var(--bad)'});
    s += V.text(290,282,'①容易导致控制过细　②容易导致本位主义　③容易导致效能低下',
      {fs:8.5,color:'var(--ink-2)'});
    s += V.text(290,298,'④缺乏灵活性 —— 这也许是预算最大的缺陷',{fs:8.5,fw:700,color:'var(--bad)'});

    return V.svg(w,h,s);
  });
})();
