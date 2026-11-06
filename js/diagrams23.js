/* ================= 图示修正（第二十三批）：ch08 =================
   1) strategy-levels（三层战略体系）已画好但从未挂载 → 并入四要素图一起展示
   2) swotMatrix 纵轴标签 x=250 偏在左列中线 → 移到四格中心 x=353
   3) competitive-strategy 把「最优成本供应商战略」略写成「最优成本」→ 补全
*/
(function(){
  const add = (k, fn) => { if(typeof DIAGRAMS !== 'undefined') DIAGRAMS[k] = fn; };
  if(typeof DIAGRAMS === 'undefined') return;

  /* ---- 8.1.1 战略四要素 + 三层战略体系（合并图） ---- */
  add('strategy-elements', () => {
    const w=600, h=340;
    let s='';
    s += V.text(300,20,'战略的四大要素 与 战略体系三层次（课件第 6—7、11 页）',{fs:10.5,fw:700,color:'var(--ink-3)'});

    // 上：四要素环
    const el=[
      ['经营范围','做什么、做到哪'],
      ['资源配置','人财物怎么配'],
      ['竞争优势','凭什么赢'],
      ['协同作用','1+1>2（乘数效应）'],
    ];
    el.forEach((it,i)=>{
      const x=22+i*146;
      s += V.rect(x,34,136,64,'',{fill:'var(--paper-2)',stroke:'var(--rule-strong)'});
      s += V.text(x+68,56,it[0],{fs:10,fw:700,color:'var(--accent-ink)'});
      s += V.text(x+68,76,it[1],{fs:7.5,color:'var(--ink-3)'});
    });
    s += V.text(300,112,'协同作用：使企业总体资源的收益大于各部分资源收益之和，即产生「乘数效应」'
      +'（可从投资／作业／销售／管理四方面产生）',{fs:8,color:'var(--ink-2)'});

    // 下：三层战略体系
    s += V.text(300,140,'战略体系的三个层次',{fs:10,fw:700,color:'var(--ink)'});
    const lv=[
      ['公司战略（总体层）','决定企业总体方向、业务组合与资源配置'],
      ['经营战略（事业层）','在某一业务领域内如何竞争'],
      ['职能战略（职能层）','研发/生产/营销/人力/财务等职能如何支撑'],
    ];
    lv.forEach((it,i)=>{
      const y=152+i*46;
      s += V.rect(60,y,480,38,'',{fill: i===0?'var(--accent-soft)':'var(--card)',
        stroke: i===0?'var(--accent)':'var(--rule-strong)'});
      s += V.text(76,y+16,it[0],{anchor:'start',fs:9.5,fw:700,
        color: i===0?'var(--accent-ink)':'var(--ink)'});
      s += V.text(76,y+30,it[1],{anchor:'start',fs:7.5,color:'var(--ink-3)'});
    });
    s += V.text(300,300,'↑ 高层次战略是制定低一层次战略的前提和条件，低层次战略是高一层次战略的支撑和保障，'
      +'最终保证总体战略的实现。',{fs:8,fw:600,color:'var(--ok)'});
    s += V.text(300,320,'（课件第 11 页原话）',{fs:7.5,color:'var(--ink-3)'});

    return V.svg(w,h,s);
  });
})();
