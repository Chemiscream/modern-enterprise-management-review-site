/* ================= 图示修正（第二十四批）：ch02 网络图基本组成 =================
   课件第 30—31 页：
     网络图又称箭线图，是以图解形式表示一项工程及其构成要素之间的逻辑关系。
     要求「箭头指向由左至右」、「一个完整网络图要有统一始点和统一终点」。
   本图演示「网络图的组成」（实工序/虚工序/结点/线路），必须带箭头。
   示例数据：A(1→2,3) B(1→3,4) C(2→4,2) D(3→4,5) E(4→5,6)
      T_ES：①0 ②3 ③4 ④max{3+2,4+5}=9 ⑤15
      T_LF（逆推取最小）：⑤15 ④15−6=9 ③9−5=4 ②9−2=7 ①min{7−3,4−4}=0
      关键线路：①→③→④→⑤（B、D、E 共 4+5+6=15 天）
      → 三条（B/D/E）都是关键工序，图上都要标红
*/
(function(){
  const add = (k, fn) => { if(typeof DIAGRAMS !== 'undefined') DIAGRAMS[k] = fn; };
  if(typeof DIAGRAMS === 'undefined') return;

  add('network-basic', () => {
    const w=600, h=282;
    let s='';
    s += '<defs>'
      + '<marker id="nbarrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">'
      + '<path d="M0,0 L9,4.5 L0,9 z" fill="var(--ink-3)"/></marker>'
      + '<marker id="nbarrow-crit" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">'
      + '<path d="M0,0 L9,4.5 L0,9 z" fill="var(--bad)"/></marker>'
      + '</defs>';

    s += V.text(300,22,'网络图的组成：实工序 · 结点 · 线路（课件第 30—31 页；本例网络无虚工序——虚箭线见下一知识点例 2-2 图 ④→⑤）',
      {fs:10.5,fw:700,color:'var(--ink-3)'});

    // 结点坐标
    const N={1:[60,140],2:[210,80],3:[210,200],4:[370,140],5:[520,140]};
    // 工序：[from,to,代号,时长,是否关键]
    const A=[
      [1,2,'A',3,false],
      [1,3,'B',4,true],
      [2,4,'C',2,false],
      [3,4,'D',5,true],
      [4,5,'E',6,true],
    ];
    A.forEach(a=>{
      const f=a[0],t=a[1],lb=a[2],d=a[3],crit=a[4];
      const x1=N[f][0],y1=N[f][1],x2=N[t][0],y2=N[t][1];
      const R=26;
      const dx=x2-x1, dy=y2-y1, len=Math.sqrt(dx*dx+dy*dy)||1;
      const ux=dx/len, uy=dy/len;
      const sx=x1+ux*R, sy=y1+uy*R, ex=x2-ux*R, ey=y2-uy*R;
      const col = crit?'var(--bad)':'var(--ink-3)';
      const mk  = crit?'nbarrow-crit':'nbarrow';
      s += '<line x1="'+sx+'" y1="'+sy+'" x2="'+ex+'" y2="'+ey+'" stroke="'+col+
           '" stroke-width="'+(crit?2.4:1.4)+'" marker-end="url(#'+mk+')"/>';
      const mx=(sx+ex)/2, my=(sy+ey)/2;
      s += V.text(mx, my-8, lb, {fs:9.5, fw:crit?700:400, color:crit?'var(--bad)':'var(--ink-2)'});
      s += V.text(mx, my+8, String(d), {fs:8, color:'var(--ink-3)'});
    });

    // 结点
    const PT={1:['0','0'],2:['3','7'],3:['4','4'],4:['9','9'],5:['15','15']};
    Object.keys(N).forEach(k=>{
      const x=N[k][0], y=N[k][1];
      const crit=['1','3','4','5'].indexOf(k)>=0;
      s += V.circle(x,y,24,k,{fill: crit?'var(--bad-soft)':'var(--bg-elev)',
        stroke: crit?'var(--bad)':'var(--line)', sw: crit?1.8:1.4,
        color: crit?'var(--bad)':'var(--ink)', fs:11});
      s += '<text x="'+x+'" y="'+(y-30)+'" text-anchor="middle" style="font-size:7.5px;fill:var(--ok)">'
        + PT[k][0] + '</text>';
      s += '<text x="'+x+'" y="'+(y+37)+'" text-anchor="middle" style="font-size:7.5px;fill:var(--warn)">'
        + PT[k][1] + '</text>';
    });

    // 图例与说明
    s += V.rect(20,248,560,28,'',{fill:'var(--paper-2)',stroke:'var(--rule)'});
    s += V.text(300,266,'结点上方绿字=T_ES　下方橙字=T_LF　红色粗线=关键线路（①→③→④→⑤，B+D+E=4+5+6=15 天）',
      {fs:8,color:'var(--ink-2)'});

    return V.svg(w,h,s);
  });
})();
