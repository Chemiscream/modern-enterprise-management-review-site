/* ================= 图示修正（第二十一批）：ch06 组织再造 BPR =================
   课件第 55 页原文：
     「企业再造的要点是，以**信息系统（IS）、信息技术（IT）和全面质量管理（TQM）等手段**，
       以客户中长期需求为目标，通过最大限度地减少对产品增值无实质性作用的环节和过程，
       建立起科学的组织结构和业务流程……」
   课件第 56 页五因素：①持续时间 ②依赖关系 ③流程主体 ④问题区域 ⑤增值影响
*/
(function(){
  const add = (k, fn) => { if(typeof DIAGRAMS !== 'undefined') DIAGRAMS[k] = fn; };
  if(typeof DIAGRAMS === 'undefined') return;

  add('bpr', () => {
    const w=580, h=310;
    let s='';
    s += V.text(290,20,'组织再造（BPR）：以流程为中心重构，而非按职能切分',{fs:10.5,fw:700,color:'var(--ink-3)'});

    // 左：职能式
    s += V.rect(24,38,240,76,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(144,58,'改造前：按职能分段',{fs:10,fw:700,color:'var(--ink)'});
    ['部门A','部门B','部门C'].forEach((t,i)=>{
      s += V.rect(38+i*76,66,66,32,t,{fill:'var(--card)',stroke:'var(--rule-strong)',fs:9});
    });

    // 右：流程式
    s += V.rect(312,38,244,76,'',{fill:'var(--ok-soft)',stroke:'rgba(61,107,74,.62)'});
    s += V.text(434,58,'改造后：一条流程贯到底',{fs:10,fw:700,color:'var(--ok)'});
    s += V.rect(328,66,212,32,'客户需求 → 交付',{fill:'var(--card)',stroke:'var(--ok)',fs:9,color:'var(--ok)'});
    s += '<path d="M266,76 L306,76" stroke="var(--accent)" stroke-width="1.5" marker-end="url(#ah)"/>';

    // 手段（课件第 55 页原文）—— 这是必考枚举
    s += V.rect(24,128,532,58,'',{fill:'var(--accent-soft)',stroke:'var(--accent)'});
    s += V.text(290,148,'再造的手段（课件第 55 页原文）',{fs:9.5,fw:700,color:'var(--accent-ink)'});
    s += V.text(290,168,'信息系统 IS　·　信息技术 IT　·　全面质量管理 TQM',
      {fs:11,fw:700,color:'var(--accent-ink)'});

    // 五因素（课件第 56 页）
    s += V.rect(24,196,532,58,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(290,216,'影响流程功能的五个因素（课件第 56 页）',{fs:9.5,fw:700,color:'var(--ink)'});
    s += V.text(290,236,'①持续时间　②依赖关系　③流程主体　④问题区域　⑤增值影响',
      {fs:9,color:'var(--ink-2)'});

    s += V.text(290,272,'⚠️ 别把「结果」当「手段」：合并岗位、压缩层级、减少审批节点是再造后的结果，',
      {fs:8.5,fw:600,color:'var(--bad)'});
    s += V.text(290,288,'课件明确写的手段只有 IS、IT、TQM 三个。',
      {fs:8.5,fw:600,color:'var(--bad)'});

    // 定义箭头（marker）
    s = '<defs><marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">'
      + '<path d="M0,0 L8,4 L0,8 z" fill="var(--accent)"/></marker></defs>' + s;
    return V.svg(w,h,s);
  });
})();
