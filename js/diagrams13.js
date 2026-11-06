/* ================= 图示补充（第十三批）：网络计划时间参数图 ================= */
(function(){
  const add = (k, fn) => { if(typeof DIAGRAMS !== 'undefined') DIAGRAMS[k] = fn; };
  if(typeof DIAGRAMS === 'undefined') return;

  /* 例 2-2 七结点网络图 + T_ES/T_LF/时差 */
  add('network-calc', () => {
    const w=600, h=374;
    let s='';
    s += V.text(300,20,'例 2-2 网络图与时间参数（关键线路 ①→③→⑥→⑦，19 天）',
      {fs:10, fw:700, color:'var(--ink-3)'});

    // 结点坐标
    const N={1:[50,170],2:[170,80],3:[170,170],4:[170,260],5:[330,80],6:[330,200],7:[490,140]};
    // 活动：[from, to, 代号, 作业时间, 是否虚工序]
    const A=[
      [1,2,'A',3,false],[1,3,'C',4.5,false],[1,4,'B',2,false],
      [2,5,'D',5,false],[4,5,'虚',0,true],
      [3,6,'E',8,false],[4,6,'F',7,false],
      [5,7,'G',8,false],[6,7,'H',6.5,false]
    ];
    A.forEach(function(a){
      const f=a[0], t=a[1], lb=a[2], d=a[3], virt=a[4];
      const x1=N[f][0], y1=N[f][1], x2=N[t][0], y2=N[t][1];
      const isCrit = (f===1&&t===3)||(f===3&&t===6)||(f===6&&t===7);
      const col = isCrit ? 'var(--bad)' : (virt ? 'var(--ink-3)' : 'var(--rule-strong)');
      const mk = isCrit ? 'arrowhead-bad' : 'arrowhead';
      const dash = virt ? ' stroke-dasharray="4 3"' : '';
      // 线条起止点从结点边缘算起，避免被结点圆覆盖
      const R=21;
      const dx=x2-x1, dy=y2-y1, len=Math.sqrt(dx*dx+dy*dy)||1;
      const ux=dx/len, uy=dy/len;
      const sx=x1+ux*R, sy=y1+uy*R, ex=x2-ux*R, ey=y2-uy*R;
      if(virt){
        // 课件第 38 页「② 图中箭线少交叉或用「　」表示交叉工序」：
        // 虚工序 ④→⑤ 与 E（③→⑥）约交于 (238.6,182.9)，此处断口 4—5px 加半圆「过桥」。
        const CX=238.6, CY=182.9, G=6;
        const b1x=CX-ux*G, b1y=CY-uy*G, b2x=CX+ux*G, b2y=CY+uy*G;
        s += '<path d="M'+sx+','+sy+' L'+b1x+','+b1y+' A'+G+','+G+' 0 0,1 '+b2x+','+b2y+' L'+ex+','+ey+'"'
           + ' stroke="'+col+'" stroke-width="1.3" stroke-dasharray="4 3" fill="none" marker-end="url(#'+mk+')"/>';
        const lx=x1+dx*0.28, ly=y1+dy*0.28;
        s += V.text(lx-16, ly+2, lb, {fs:8.5, color:'var(--ink-2)'});   // 「虚」标签沿线下移，避开交点
      } else {
        s += '<line x1="'+sx+'" y1="'+sy+'" x2="'+ex+'" y2="'+ey+'" stroke="'+col+
             '" stroke-width="'+(isCrit?2.2:1.3)+'" marker-end="url(#'+mk+')"/>';
        let mx=(x1+x2)/2, my=(y1+y2)/2;
        if(f===3&&t===6){ mx=x1+dx*0.70; my=y1+dy*0.70; }   // E 的「E／8」标签让开与虚工序的交点
        s += V.text(mx, my-7, lb, {fs:8.5, fw:isCrit?700:400,
          color:isCrit?'var(--bad)':'var(--ink-2)'});
        s += V.text(mx, my+8, String(d), {fs:7.5, color:'var(--ink-3)'});
      }
    });

    // 结点：上方 T_ES，下方 T_LF
    const PT={1:['0','0'],2:['3','6'],3:['4.5','4.5'],4:['2','5.5'],
              5:['8','11'],6:['12.5','12.5'],7:['19','19']};
    Object.keys(N).forEach(function(k){
      const x=N[k][0], y=N[k][1];
      const isCrit = ['1','3','6','7'].indexOf(k)>=0;
      s += V.circle(x, y, 19, k, {
        fill: isCrit ? 'var(--bad-soft)' : 'var(--card)',
        stroke: isCrit ? 'var(--bad)' : 'var(--rule-strong)',
        sw: isCrit ? 1.8 : 1.2,
        color: isCrit ? 'var(--bad)' : 'var(--ink)', fs:10
      });
      s += '<text x="'+x+'" y="'+(y-24)+'" text-anchor="middle" style="font-size:7px;fill:var(--ok)">'
           + PT[k][0] + '</text>';
      s += '<text x="'+x+'" y="'+(y+31)+'" text-anchor="middle" style="font-size:7px;fill:var(--warn)">'
           + PT[k][1] + '</text>';
    });

    // 图例
    s += V.rect(20, 334, 560, 34, '', {fill:'var(--paper-2)', stroke:'var(--rule)'});
    s += V.text(300, 348, '结点上方绿字 = T_ES（最早开始）　下方橙字 = T_LF（最迟结束）',
      {fs:7.5, color:'var(--ink-3)'});
    s += V.text(300, 362, '红色粗线 = 关键线路　虚线 = 虚工序（4→5，仅供逻辑衔接，作业时间为 0）',
      {fs:7.5, color:'var(--ink-3)'});
    /* 箭头 marker 全部用 V.svg() 自带的 defs（arrowhead / arrowhead-accent / arrowhead-bad）；
       旧版在此自建同名 defs，导致一份 SVG 里两个 id="arrowhead"，红色关键线挂灰箭头。已删。 */
    return V.svg(w,h,s);
  });
})();
