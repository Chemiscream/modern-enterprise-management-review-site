/* ================= 图示补充（第十一批）：ch01 新增知识点 ================= */
(function(){
  const add = (k, fn) => { if(typeof DIAGRAMS !== 'undefined') DIAGRAMS[k] = fn; };
  if(typeof DIAGRAMS === 'undefined') return;

  /* 决策管理学派（西蒙） */
  add('decision-school', () => {
    const w=560, h=290;
    let s='';
    s += V.text(280,20,'决策管理学派（西蒙）',{fs:11,fw:700,color:'var(--ink-3)'});

    // 四人方框：管理就是决策
    s += V.rect(30,40,500,44,'',{fill:'var(--accent-soft)',stroke:'var(--accent)'});
    s += V.text(280,62,'管理就是决策',{fs:13,fw:700,color:'var(--accent-ink)'});
    s += V.text(280,78,'计划 · 组织 · 领导 · 控制 —— 每一步都在做选择',{fs:8,color:'var(--ink-3)'});

    // 满意 vs 最优
    s += V.rect(30,98,240,50,'',{fill:'var(--paper-2)',stroke:'var(--rule-strong)'});
    s += V.text(150,118,'传统：最优标准',{fs:10,fw:700,color:'var(--ink-3)'});
    s += V.text(150,136,'信息全、算力无限（不现实）',{fs:7.5,color:'var(--ink-3)'});
    s += V.rect(290,98,240,50,'',{fill:'var(--ok-soft)',stroke:'var(--ok)'});
    s += V.text(410,118,'西蒙：满意标准',{fs:10,fw:700,color:'var(--ok)'});
    s += V.text(410,136,'信息不全 → 找到「够好」就出手',{fs:7.5,color:'var(--ink-3)'});

    // 四阶段
    s += V.text(280,168,'决策四阶段（可能交错、反复）',{fs:9,fw:700,color:'var(--ink-3)'});
    const st=[['A 提出理由',40],['B 找方案',170],['C 抉择',300],['D 评价',430]];
    st.forEach((x,i)=>{
      s += V.rect(x[1],178,110,40,x[0],{fill:'var(--card)',stroke:'var(--rule-strong)',fs:8.5,color:'var(--ink)'});
      if(i<3) s += V.arrow(x[1]+112,198,st[i+1][1]-2,198,{stroke:'var(--accent)',sw:1.2});
    });

    // 两类决策
    s += V.rect(30,232,240,42,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(150,250,'程序化：反复出现、例行',{fs:8.5,fw:600,color:'var(--ink)'});
    s += V.text(150,266,'→ 基层按流程办（讲义推断）',{fs:7.5,color:'var(--ink-3)'});
    s += V.rect(290,232,240,42,'',{fill:'var(--warn-soft)',stroke:'var(--warn)'});
    s += V.text(410,250,'非程序化：从未出现、结构不清',{fs:8.5,fw:600,color:'var(--warn)'});
    s += V.text(410,266,'→ 高层拍板（讲义推断）',{fs:7.5,color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });

  /* 现代管理学派六派速览 */
  add('modern-schools6', () => {
    const w=580, h=280;
    const items=[
      ['社会系统','巴纳德','协作系统·效力效率'],
      ['系统管理','卡斯特+罗森茨维奇','四子系统·三层次'],
      ['决策','西蒙+马奇','管理就是决策'],
      ['经验主义','德鲁克+戴尔','案例·目标管理'],
      ['管理科学','伯法','数量学派·建模'],
      ['权变','卢森斯·菲德勒·豪斯','超Y理论·如果就要'],
    ];
    let s='';
    s += V.text(290,20,'现代管理学派（六大流派）',{fs:11,fw:700,color:'var(--ink-3)'});
    items.forEach((it,i)=>{
      const x=20+(i%3)*188, y=38+Math.floor(i/3)*104;
      s += V.rect(x,y,172,88,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
      s += V.text(x+86,y+26,it[0],{fs:11,fw:700,color:'var(--accent-ink)'});
      s += V.text(x+86,y+48,it[1],{fs:9.5,fw:600,color:'var(--ink)'});
      s += `<text x="${x+86}" y="${y+70}" text-anchor="middle" style="font-size:7.5px;fill:var(--ink-3)">${it[2]}</text>`;
    });
    s += V.rect(20,248,540,26,'',{fill:'var(--accent-soft)',stroke:'var(--accent-line)'});
    s += V.text(290,266,'人物配对是选择题高发点：巴纳德→协作；西蒙→决策；德鲁克→目标管理；伯法→数量；卢森斯→权变',
      {fs:8,color:'var(--accent-ink)'});
    return V.svg(w,h,s);
  });
})();
