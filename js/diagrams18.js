/* ================= 图示修正（第十八批）：ch04 强化理论定义 =================
   课件第 60 页原文（本课程口径）：
     「在管理上，正强化就是**奖励那些组织上需要的行为，从而加强这种行为**；
       负强化就是**惩罚那些与组织不相容的行为，从而削弱这种行为**。」
   ⚠️ 注意：这是本课程的课件口径，与某些通用教材「负强化=撤销惩罚」的说法不同。
      考试按本课程课件答。
*/
(function(){
  const add = (k, fn) => { if(typeof DIAGRAMS !== 'undefined') DIAGRAMS[k] = fn; };
  if(typeof DIAGRAMS === 'undefined') return;

  add('reinforcement', () => {
    const w=580, h=300;
    let s='';
    s += V.text(290,22,'强化理论：正强化与负强化（课件第 60 页口径）',{fs:10.5,fw:700,color:'var(--ink-3)'});

    // 正强化
    s += V.rect(30,44,250,86,'',{fill:'var(--ok-soft)',stroke:'var(--ok)'});
    s += V.text(155,70,'正强化',{fs:12.5,fw:700,color:'var(--ok)'});
    s += V.text(155,92,'奖励组织上需要的行为',{fs:8.5,color:'var(--ink-2)'});
    s += V.text(155,112,'→ 从而加强这种行为',{fs:8.5,fw:700,color:'var(--ink)'});

    // 负强化
    s += V.rect(300,44,250,86,'',{fill:'var(--bad-soft)',stroke:'var(--bad)'});
    s += V.text(425,70,'负强化',{fs:12.5,fw:700,color:'var(--bad)'});
    s += V.text(425,92,'惩罚与组织不相容的行为',{fs:8.5,color:'var(--ink-2)'});
    s += V.text(425,112,'→ 从而削弱这种行为',{fs:8.5,fw:700,color:'var(--ink)'});

    // 关键提醒
    s += V.rect(30,146,520,60,'',{fill:'var(--paper-2)',stroke:'var(--rule-strong)'});
    s += V.text(290,168,'⚠️ 本课程课件的口径：负强化 = 惩罚（削弱不相容行为）',{fs:9.5,fw:700,color:'var(--bad)'});
    s += V.text(290,188,'有些教材把「负强化」说成「撤销惩罚」，与本课程不同——考试一律按课件答：'
      +'负强化就是惩罚。',{fs:8,color:'var(--ink-2)'});

    // 补充：消退
    s += V.rect(30,218,520,46,'',{fill:'var(--card)',stroke:'var(--rule)'});
    s += V.text(290,238,'补充：忽视（消退）—— 不理会，让行为自然消失（课件未展开，属行为改造理论的常见延伸）',
      {fs:8,color:'var(--ink-3)'});
    s += V.text(290,256,'5 条行为原则：①强化过的行为趋于重复 ②因人施强化 ③小步子分阶段 ④及时反馈 ⑤正强化比负强化更有效',
      {fs:7.8,color:'var(--ink-2)'});
    s += V.text(290,278,'（强化理论只讨论外部刺激，忽略人的内在因素，有机械论色彩）',{fs:7.5,color:'var(--ink-3)'});

    return V.svg(w,h,s);
  });
})();
