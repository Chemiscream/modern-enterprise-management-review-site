/* ================= 图示补充（第四批）：计算类知识点的图解 ================= */
(function(){
  const add = (k, fn) => { if(typeof DIAGRAMS !== 'undefined') DIAGRAMS[k] = fn; };
  if(typeof DIAGRAMS === 'undefined') return;

  /* 盈亏平衡图 */
  add('breakeven', () => {
    const w=520, h=340;
    const L=64, R=24, T=30, B=48;
    const iw=w-L-R, ih=h-T-B;
    // 数据：F=100, P=1, V=0.6, maxQ=300
    const F=100, P=1, Vc=0.6, maxQ=300;
    const maxY = Math.max(P*maxQ, F+Vc*maxQ)*1.08;
    const X = q => L + (q/maxQ)*iw;
    const Y = v => T + ih - (v/maxY)*ih;
    const qStar = F/(P-Vc);
    let s='';
    // 网格
    for(let i=1;i<=4;i++){
      const v = maxY*i/4;
      s += V.line(L, Y(v), L+iw, Y(v), {stroke:'var(--rule)', sw:1});
      s += V.text(L-8, Y(v)+4, Math.round(v), {anchor:'end', fs:8, color:'var(--ink-3)'});
    }
    // 坐标轴
    s += V.line(L, T+ih, L+iw, T+ih, {stroke:'var(--rule-strong)', sw:1.3});
    s += V.line(L, T, L, T+ih, {stroke:'var(--rule-strong)', sw:1.3});
    // 收入线
    s += V.line(X(0), Y(0), X(maxQ), Y(P*maxQ), {stroke:'var(--accent)', sw:2});
    // 总成本线
    s += V.line(X(0), Y(F), X(maxQ), Y(F+Vc*maxQ), {stroke:'var(--warn)', sw:2});
    // 保本点
    s += V.circle(X(qStar), Y(P*qStar), 4.5, '', {fill:'var(--bad)', stroke:'var(--bad)'});
    s += V.line(X(qStar), Y(0), X(qStar), Y(P*qStar), {stroke:'var(--bad)', dash:'3 3', sw:1});
    // 标签落在横轴下方：原位置 (X+8, Y-10) 会压住右上「收入线/总成本线」图例（bbox 交叠 65%）
    s += V.text(X(qStar), Y(0)+16, '保本点 Q*='+qStar, {fs:9, fw:700, color:'var(--bad)'});
    // 盈亏区标注（Q*>250：收入线在成本线之上＝盈利区；Q*<250：成本线在上＝亏损区。
    // v11：盈利区所在楔形只有 8px 高，放不下 10px 文字 → 上移到收入线上方空白区（不再压线）；
    //      亏损区楔形高约 52px，仍居中放置。
    const qPro = maxQ*0.92, qLoss = maxQ*0.30;
    s += `<text x="${X(qPro)}" y="${Y(P*qPro) - 9}" text-anchor="middle" style="font-size:10px;font-weight:700;fill:var(--ok)">盈利区</text>`;
    s += `<text x="${X(qLoss)}" y="${Y((P*qLoss + (F+Vc*qLoss))/2) + 3}" text-anchor="middle" style="font-size:10px;font-weight:700;fill:var(--bad)">亏损区</text>`;
    // 图例（v11：原图例压住收入线/总成本线本身，且被顶部网格线穿过 → 移到图内左上空白区）
    s += V.text(L+12, Y(maxY*0.86), '收入线', {anchor:'start', fs:9, color:'var(--accent)'});
    s += V.text(L+12, Y(maxY*0.86)+14, '总成本线', {anchor:'start', fs:9, color:'var(--warn)'});
    // 轴标签
    s += V.text(L+iw/2, h-16, '销售量 Q →', {fs:9, color:'var(--ink-3)'});
    s += V.text(16, T+ih/2, '金额', {fs:9, color:'var(--ink-3)', anchor:'middle'});
    s += V.text(L+iw/2, T-12, '收入 = P×Q　总成本 = F + V×Q　保本点 Q* = F ÷ (P − V)', {fs:8.5, color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });

  /* 决策树（v10 重画：三条方案枝齐全。方案 3＝先建小厂、三年后销路好再决定是否扩建，
     在第 3 年处有第二个决策方框 □——这才是「二次决策」样本，与例 3「分两期（条件概率）」相反。
     数据与 9.4.3 exam 的 2018A 真题逐一对齐：
     方案1 [0.7×1.7+0.3×(−0.3)]×7−5 = 2.70
     方案2 [0.7×0.5+0.3×0.3]×7−1.5 = 1.58
     方案3 前3年[0.7×0.6+0.3×0.3]×3=1.53 + 0.7×(1.2×4−2.3)=1.75 + 0.3×(0.3×4)=0.36 − 2 = 1.64 */
  add('decision-tree', () => {
    const w=640, h=400;
    let s='';
    const cx=52, sx=205, rx=470, ex=628;
    const rows=[118,200,282];
    s += V.text(w/2,24,'决策树·三方案（2018A 同源）：期望值 = Σ(概率×损益)×年数 − 投资，从右往左算',
      {fs:9, color:'var(--ink-3)'});
    // 决策结点 + 干线
    s += V.rect(cx-16, 200-16, 32, 32, '', {fill:'var(--accent-soft)', stroke:'var(--accent)', sw:1.5});
    s += V.text(cx, 200+5, '□', {fs:13, fw:700, color:'var(--accent-ink)'});
    s += V.text(28, 168, '决策', {fs:8, color:'var(--ink-3)'});
    /* v11：原干线从方框中心 (cx,200) 起画，且画在方框与「□」之后 → 竖线/横线劈穿 □ 符号。
       改为从方框边缘起画（上边 y=184、下边 y=216、右边 x=cx+16）。 */
    s += V.line(cx, 184, cx, rows[0], {stroke:'var(--rule-strong)'});
    s += V.line(cx, 216, cx, rows[2], {stroke:'var(--rule-strong)'});
    s += V.line(cx, rows[0], sx-13, rows[0], {stroke:'var(--rule-strong)'});
    s += V.line(cx+16, rows[1], sx-13, rows[1], {stroke:'var(--rule-strong)'});
    s += V.line(cx, rows[2], sx-13, rows[2], {stroke:'var(--rule-strong)'});
    // 方案枝标签
    s += V.text(80, rows[0]-8, '①新建大厂 投5亿', {anchor:'start', fs:8.5, fw:700, color:'var(--accent)'});
    s += V.text(80, rows[1]-8, '②技改生产线 投1.5亿', {anchor:'start', fs:8.5, color:'var(--ink-3)'});
    s += V.text(80, rows[2]-8, '③先建小厂 投2亿', {anchor:'start', fs:8.5, color:'var(--ink-2)'});
    s += V.text(80, rows[2]+14, '三年后视销路再定扩建', {anchor:'start', fs:7.5, color:'var(--warn)'});
    // 剪枝双线（方案2、3 被剪）
    [rows[1], rows[2]].forEach(function(yy){
      s += V.line(61, yy-11, 61, yy+11, {stroke:'var(--bad)', sw:2.4});
      s += V.line(69, yy-11, 69, yy+11, {stroke:'var(--bad)', sw:2.4});
    });
    // ---- 方案 1（保留） ----
    let y=rows[0];
    s += V.circle(sx, y, 13, '○', {fill:'var(--card)', stroke:'var(--accent)', sw:1.3, fs:11, color:'var(--accent)'});
    s += V.line(sx+13, y, rx, y-30, {stroke:'var(--rule-strong)'});
    s += V.line(sx+13, y, rx, y+30, {stroke:'var(--rule-strong)'});
    s += V.text(340, y-20, '好 0.7', {fs:8.5, color:'var(--ink-2)'});
    s += V.text(340, y+23, '差 0.3', {fs:8.5, color:'var(--ink-2)'});
    s += V.text(rx+10, y-27, '△ 1.7/年', {anchor:'start', fs:8.5, color:'var(--ink-2)'});
    s += V.text(rx+10, y+33, '△ −0.3/年', {anchor:'start', fs:8.5, color:'var(--ink-2)'});
    s += V.text(ex, y+5, '2.70', {anchor:'end', fs:14, fw:700, color:'var(--ok)'});
    // ---- 方案 2（剪枝） ----
    y=rows[1];
    s += V.circle(sx, y, 13, '○', {fill:'var(--card)', stroke:'var(--ink-3)', sw:1.2, fs:11, color:'var(--ink-3)'});
    s += V.line(sx+13, y, rx, y-30, {stroke:'var(--rule-strong)'});
    s += V.line(sx+13, y, rx, y+30, {stroke:'var(--rule-strong)'});
    s += V.text(340, y-20, '好 0.7', {fs:8.5, color:'var(--ink-2)'});
    s += V.text(340, y+23, '差 0.3', {fs:8.5, color:'var(--ink-2)'});
    s += V.text(rx+10, y-27, '△ 0.5/年', {anchor:'start', fs:8.5, color:'var(--ink-3)'});
    s += V.text(rx+10, y+33, '△ 0.3/年', {anchor:'start', fs:8.5, color:'var(--ink-3)'});
    s += V.text(ex, y+5, '1.58', {anchor:'end', fs:12, color:'var(--ink-3)'});
    // ---- 方案 3：好 0.7 → 第二个决策方框 □（扩建 / 不扩建）；差 0.3 → 维持小厂 ----
    y=rows[2];
    s += V.circle(sx, y, 13, '○', {fill:'var(--card)', stroke:'var(--ink-2)', sw:1.2, fs:11, color:'var(--ink-2)'});
    /* v11：原两条斜线从圆心 (sx,y) 起画，穿过 ○ 符号本身；改为从圆周起画。 */
    s += V.line(sx+13, y, 334, y-20, {stroke:'var(--rule-strong)'});
    s += V.text(276, y-15, '好 0.7', {fs:8.5, color:'var(--ink-2)'});
    s += V.line(sx+13, y, rx, y+20, {stroke:'var(--rule-strong)'});
    s += V.text(276, y+25, '差 0.3（维持小厂）', {fs:8, color:'var(--ink-2)'});
    s += V.text(rx+10, y+23, '△ 0.3×4＝1.2', {anchor:'start', fs:8, color:'var(--ink-2)'});
    // 第二个决策方框（3 年后）
    s += V.rect(334, y-36, 32, 32, '', {fill:'var(--warn-soft)', stroke:'var(--warn)', sw:1.4});
    s += V.text(350, y-16, '□', {fs:13, fw:700, color:'var(--warn)'});
    s += V.text(350, y-42, '3 年后再决策', {fs:7.5, color:'var(--warn)'});
    /* v11：原斜线从方框中心 (366,y-20) 起画，穿过 □；改为从方框右边起画。 */
    s += V.line(366, y-20, rx, y-42, {stroke:'var(--rule-strong)'});
    s += V.text(416, y-34, '扩建 投2.3·4年', {fs:7.5, color:'var(--ink-2)'});
    s += V.text(rx+10, y-39, '△ 1.2×4−2.3＝2.5', {anchor:'start', fs:8, color:'var(--ink-2)'});
    s += V.line(366, y-20, rx, y+2, {stroke:'var(--rule-strong)'});
    s += V.text(416, y+4, '不扩建', {fs:7.5, color:'var(--ink-3)'});
    s += V.text(rx+10, y+1, '△ 0.6×4＝2.4', {anchor:'start', fs:8, color:'var(--ink-3)'});
    s += V.text(ex, y+5, '1.64', {anchor:'end', fs:12, color:'var(--ink-2)'});
    // 底注
    s += V.text(w/2, h-28, '双线＝剪枝（否决）｜方案 3 带第二个 □＝真正的二次决策；例 3「分两期」只有一个 □（条件概率），两者别混',
      {fs:8, color:'var(--bad)'});
    s += V.text(w/2, h-12, '方案 3 ＝ 前 3 年 1.53 ＋ 0.7×(1.2×4−2.3)＋ 0.3×(0.3×4) − 2 ＝ 1.64 亿',
      {fs:7.5, color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });

  /* 不确定型决策五准则 */
  add('uncertainty', () => {
    const w=600, h=300;
    // 数据 A1..A4 × Q1..Q4
    const rows=[
      [900,750,450,250],
      [800,600,400,200],
      [700,550,420,300],
      [600,500,380,280],
    ];
    const names=['A1','A2','A3','A4'];
    const colMax=[0,1,2,3].map(j=>Math.max(...rows.map(r=>r[j])));
    const opt = rows.map(r=>Math.max(...r));
    const pes = rows.map(r=>Math.min(...r));
    const eq  = rows.map(r=>r.reduce((a,b)=>a+b,0)/4);
    const a=0.7;
    const coef= rows.map((r,i)=>opt[i]*a + pes[i]*(1-a));
    const regret = rows.map(r=>Math.max(...r.map((v,j)=>colMax[j]-v)));
    const pickMax = arr => arr.indexOf(Math.max(...arr));
    const pickMin = arr => arr.indexOf(Math.min(...arr));

    let s='';
    // 左侧矩阵
    const x0=20, y0=48, cw=62, ch=34;
    s += V.text(x0+130, 26, '收益矩阵（万元）', {fs:10, fw:700, color:'var(--ink-3)'});
    ['Q1','Q2','Q3','Q4'].forEach((q,j)=>{
      s += V.text(x0+40+j*cw+cw/2, y0-6, q, {fs:8.5, color:'var(--ink-3)'});
    });
    rows.forEach((r,i)=>{
      const y=y0+i*ch;
      s += V.text(x0+14, y+21, names[i], {fs:9.5, fw:700, color:'var(--accent-ink)'});
      r.forEach((v,j)=>{
        s += V.text(x0+40+j*cw+cw/2, y+21, v, {fs:9, color:'var(--ink-2)'});
      });
    });
    s += V.line(x0+40, y0+rows.length*ch+2, x0+40+4*cw, y0+rows.length*ch+2,
      {stroke:'var(--rule-strong)'});
    s += V.text(x0+14, y0+rows.length*ch+22, '列最大', {fs:8, color:'var(--ink-3)'});
    colMax.forEach((v,j)=>{
      s += V.text(x0+40+j*cw+cw/2, y0+rows.length*ch+22, v, {fs:8.5, fw:700, color:'var(--accent)'});
    });

    // 右侧五准则
    const rules=[
      ['乐观法（大中取大）', opt, pickMax(opt)],
      ['悲观法（小中取大）', pes, pickMax(pes)],
      ['等可能法', eq, pickMax(eq)],
      ['乐观系数 α=0.7', coef, pickMax(coef)],
      ['最小遗憾法', regret.map(v=>-v), pickMin(regret)],
    ];
    s += V.text(400, 26, '五种准则的结论', {fs:10, fw:700, color:'var(--ink-3)'});
    rules.forEach((r,i)=>{
      const y=44+i*44;
      s += V.rect(310,y,276,36,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
      s += V.text(320,y+23,r[0],{anchor:'start',fs:8.5,color:'var(--ink-2)'});
      s += V.text(572,y+23,'选 '+names[r[2]],{anchor:'end',fs:9,fw:700,color:'var(--ok)'});
    });

    s += V.text(300, 282, '同一组数据，五种方法可能给出不同结论 —— 取决于决策者的态度',
      {fs:9, color:'var(--ink-3)'});
    return V.svg(w,h,s);
  });

  /* 决策类型三分 */
  add('decision-types', () => {
    const w=560, h=250;
    const items=[
      ['确定型','结果唯一','盈亏平衡 · ABC · 线性规划\n经济批量 · 投资效果','var(--ok)'],
      ['风险型','概率已知','决策树 · 收益矩阵\n敏感性分析','var(--accent)'],
      ['不确定型','概率未知','乐观 / 悲观 / 等可能\n系数 / 最小遗憾','var(--warn)'],
    ];
    let s='';
    items.forEach((it,i)=>{
      const x=20+i*180;
      s += V.rect(x,34,166,160,'',{fill:'var(--card)',stroke:'var(--rule-strong)'});
      s += V.rect(x,34,166,5,'',{fill:it[3],stroke:it[3],rx:2});
      s += V.text(x+83,66,it[0],{fs:14,fw:700,color:it[3]});
      s += V.text(x+83,90,it[1],{fs:9,color:'var(--ink-2)'});
      it[2].split('\n').forEach((ln,j)=>{
        s += `<text x="${x+83}" y="${122+j*18}" text-anchor="middle" style="font-size:8.5px;fill:var(--ink-3)">${ln}</text>`;
      });
    });
    s += V.text(280,222,'一句话：确定看结果，风险看概率，不确定看态度',{fs:9.5,fw:600,color:'var(--accent-ink)'});
    return V.svg(w,h,s);
  });

  /* 决策要素（覆盖 diagram-map 里的 decision-elements 已存在，此处跳过） */
})();
