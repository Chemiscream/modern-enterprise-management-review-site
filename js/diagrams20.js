/* ================= 图示修正（第二十批）：ch04 领导者素质 6C / 7C =================
   课件第 27 页：
     6C：可信 conviction、品质 character、关心 care、勇气 courage、沉着 composer、能力 competence
     7C：沟通 communication、信心 confidence、品质 character、综合 comprehensive、
         可信 conviction、勇气 courage、能力 competence
   ⚠️ 7C **不是**「6C 加三项」：两者只有 4 项重合（品质、可信、勇气、能力）；
      7C 没有 care、composer，多了 communication、confidence、comprehensive。
*/
(function(){
  const add = (k, fn) => { if(typeof DIAGRAMS !== 'undefined') DIAGRAMS[k] = fn; };
  if(typeof DIAGRAMS === 'undefined') return;

  add('leader-qualities', () => {
    const w=600, h=340;
    let s='';
    s += V.text(300,22,'领导者的素质要求：6C 与 7C（课件第 27 页）',{fs:11,fw:700,color:'var(--ink-3)'});

    const six=[
      ['可信','conviction'],['品质','character'],['关心','care'],
      ['勇气','courage'],['沉着','composer'],['能力','competence']
    ];
    const seven=[
      ['沟通','communication'],['信心','confidence'],['品质','character'],
      ['综合','comprehensive'],['可信','conviction'],['勇气','courage'],['能力','competence']
    ];

    // 6C
    s += V.rect(16,42,270,160,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(151,64,'6C 标准',{fs:11,fw:700,color:'var(--accent-ink)'});
    six.forEach((it,i)=>{
      const x=28+(i%2)*134, y=80+Math.floor(i/2)*38;
      s += V.text(x,y,it[0]+'  '+it[1],{anchor:'start',fs:8,color:'var(--ink-2)'});
    });

    // 7C
    s += V.rect(302,42,282,160,'',{fill:'var(--ok-soft)',stroke:'rgba(61,107,74,.35)'});
    s += V.text(443,64,'7C 标准',{fs:11,fw:700,color:'var(--ok)'});
    seven.forEach((it,i)=>{
      const x=314+(i%2)*140, y=80+Math.floor(i/2)*34;
      s += V.text(x,y,it[0]+'  '+it[1],{anchor:'start',fs:8,color:'var(--ink-2)'});
    });

    // 重合与差异
    s += V.rect(16,214,568,52,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
    s += V.text(300,236,'⚠️ 7C 不是「6C 加三项」：两者只重合 4 项（品质、可信、勇气、能力）',
      {fs:9,fw:700,color:'var(--bad)'});
    s += V.text(300,254,'7C 没有「关心 care」「沉着 composer」；多了「沟通」「信心」「综合」三项',
      {fs:8.5,color:'var(--ink-2)'});

    // 三项素质
    s += V.rect(16,276,568,48,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(300,296,'课件另按「三项素质」表述（第 28 页）：思想素质 · 业务素质 · 能力素质',
      {fs:8.5,color:'var(--ink-2)'});
    s += V.text(300,314,'（与 6C/7C 是两种不同的归纳方式，不是互相取代）',{fs:7.5,color:'var(--ink-3)'});

    return V.svg(w,h,s);
  });
})();
