/* ================= 图示修正（第二十五批）：ch03 组织结构图彻底重画 =================
   前两次返工的根因：
   1) visuals.js 的 orgStructures() 里 line() 只生成 class="line"，而 app.css 的
      svg.diagram .line 没有 stroke-dasharray —— 注释写「虚线」渲染却是实线。
   2) 职能科室摆在车间行下方同列对齐，视觉上成了「车间管科室」。
   本版：全部内联 stroke/stroke-dasharray；职能科室挂在厂长同侧（右侧竖排），
   与车间行完全分离；车间头上只有厂长一条实线。
   （v10：visuals.js 的 networkBasic() 旧图与 VISUALS 两项注册已整体删除，
     network-basic / network-calc 只由 DIAGRAMS（diagrams24/diagrams13）提供，此处不再转调。）
*/
(function(){
  if (typeof VISUALS === 'undefined') return;

  var box = function(x,y,w,h,txt,stroke,color){
    return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="6" fill="var(--card)" stroke="'+(stroke||'var(--rule-strong)')+'" stroke-width="1.3"/>'+
      '<text x="'+(x+w/2)+'" y="'+(y+h/2+4)+'" text-anchor="middle" style="font-size:10.5px;fill:'+(color||'var(--ink)')+'">'+txt+'</text>';
  };
  var solid = function(x1,y1,x2,y2){
    return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="var(--ink-3)" stroke-width="1.4"/>';
  };
  var dash = function(x1,y1,x2,y2,col){
    return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+(col||'var(--ok)')+'" stroke-width="1.2" stroke-dasharray="4 3"/>';
  };

  /* ---- ① 直线制：总经理→车间主任→班组，全实线 ---- */
  var A = '<svg class="diagram" viewBox="0 0 240 180">'
    + box(85,8,70,26,'总经理','var(--brand)','var(--ink)')
    + solid(120,34,120,52)+solid(60,52,180,52)+solid(60,52,60,72)+solid(120,52,120,72)+solid(180,52,180,72)
    + box(32,72,56,24,'车间主任')+box(92,72,56,24,'车间主任')+box(152,72,56,24,'车间主任')
    + solid(60,96,60,116)+solid(120,96,120,116)+solid(180,96,180,116)
    + box(36,116,48,22,'班组')+box(96,116,48,22,'班组')+box(156,116,48,22,'班组')
    + '</svg>';

  /* ---- ② 职能制（课件图3-8 两种关系并存）：厂长→车间＝直线指挥关系（实线，沿左侧绕行，不穿职能框）；
         职能机构→车间＝职能指挥关系（虚线，直接下达指标和命令）→ 双重关系、多头领导。
         旧版重画时把实线丢了，车间头上只剩虚线，与课件图注「职能指挥关系／直线指挥关系」不符——已补回。 ---- */
  var B = '<svg class="diagram" viewBox="-36 0 352 214">'
    + box(105,6,70,24,'厂长','var(--brand)','var(--ink)')
    // 实线：厂长 → 左侧绕行 → 母线 → 三个车间（直线指挥关系，同 A 段画法；绕开中部职能机构②框）
    + solid(112,30,112,40)+solid(112,40,12,40)+solid(12,40,12,96)+solid(12,96,230,96)
    + solid(50,96,50,126)+solid(140,96,140,126)+solid(230,96,230,126)
    + box(20,44,70,22,'职能机构①','var(--ok)')+box(105,44,70,22,'职能机构②','var(--ok)')+box(190,44,70,22,'职能机构③','var(--ok)');
  [[55,66],[140,66],[225,66]].forEach(function(fr){
    [50,140,230].forEach(function(tx){ B += dash(fr[0]+(tx===140?9:0), fr[1], tx===140?131:tx, 126); });
  });
  B += box(22,126,56,22,'车间甲')+box(112,126,56,22,'车间乙')+box(202,126,56,22,'车间丙')
    + '<text x="140" y="164" text-anchor="middle" style="font-size:9px;fill:var(--bad)">实线＝直线指挥（厂长→车间）、虚线＝职能指挥（职能机构→车间直接下命令）</text>'
    + '<text x="140" y="180" text-anchor="middle" style="font-size:9px;fill:var(--bad)">每个车间头上 1 条实线＋3 条虚线＝双重关系、多头领导</text>'
    + '<text x="140" y="196" text-anchor="middle" style="font-size:9px;fill:var(--bad)">违反统一指挥 → 现实中少用，改用其变形「直线职能制」</text>'
    + '</svg>';

  /* ---- ③ 直线职能制：左侧实线厂长直管车间；右侧职能科室竖排、真虚线挂靠厂长 ---- */
  var C = '<svg class="diagram" viewBox="0 0 370 216">'
    + box(60,8,90,24,'厂长','var(--brand)','var(--ink)')
    // 实线：厂长 → 母线 → 三个车间
    + solid(105,32,105,54)+solid(40,54,170,54)+solid(40,54,40,90)+solid(105,54,105,90)+solid(170,54,170,90)
    + box(14,90,52,22,'车间甲')+box(79,90,52,22,'车间乙')+box(144,90,52,22,'车间丙')
    // 虚线：厂长右缘 → 右侧母线 → 三个职能科室（竖排，与车间行分离）
    + dash(150,20,300,20)+dash(300,20,300,124)
    + dash(300,41,316,41)+box(316,30,50,22,'职能科室','var(--ok)')
    + dash(300,77,316,77)+box(316,66,50,22,'职能科室','var(--ok)')
    + dash(300,113,316,113)+box(316,102,50,22,'职能科室','var(--ok)')
    + '<text x="341" y="140" text-anchor="middle" style="font-size:7.5px;fill:var(--ok)">只挂靠厂长</text>'
    // 说明
    + '<text x="105" y="128" text-anchor="middle" style="font-size:8.5px;fill:var(--ink-2)">实线＝厂长行政命令（车间头上仅此一条线）</text>'
    + '<text x="185" y="152" text-anchor="middle" style="font-size:8.5px;fill:var(--ok)">虚线＝职能科室只做参谋业务指导，对车间无指挥权</text>'
    + '<text x="185" y="170" text-anchor="middle" style="font-size:8.5px;fill:var(--ink-3)">既统一指挥，又借助专业分工（科室当参谋，不代行指挥）</text>'
    + '</svg>';

  /* ---- ④ 事业部制（课件第 58—60 页：总公司＝投资中心；事业部＝利润中心；其下属生产单位＝成本中心。
         旧版只画到「产品/地区」一层，丢了工厂＝成本中心——已按图3-10 补齐） ---- */
  var D = '<svg class="diagram" viewBox="0 0 260 218">'
    + box(95,6,70,24,'总公司','var(--brand)','var(--ink)')
    + solid(130,30,130,46)+solid(70,46,190,46)+solid(70,46,70,62)+solid(190,46,190,62)
    + box(38,62,64,22,'事业部A','var(--purple)')+box(158,62,64,22,'事业部B','var(--purple)')
    + solid(70,84,70,93)+solid(50,93,110,93)+solid(50,93,50,102)+solid(110,93,110,102)
    + solid(190,84,190,102)
    + box(24,102,52,20,'工厂甲')+box(84,102,52,20,'工厂乙')
    + box(144,102,52,20,'工厂丙')
    + '<text x="130" y="140" text-anchor="middle" style="font-size:8px;fill:var(--ink-3)">（图3-10：事业部按产品/地区/渠道等标志分设）</text>'
    + '<text x="130" y="158" text-anchor="middle" style="font-size:9px;fill:var(--ink-3)">集中政策下的分散经营：总公司＝投资中心</text>'
    + '<text x="130" y="176" text-anchor="middle" style="font-size:9px;fill:var(--ink-3)">事业部＝利润中心（独立核算、自负盈亏）</text>'
    + '<text x="130" y="194" text-anchor="middle" style="font-size:9px;fill:var(--bad)">下属生产单位（工厂）＝成本中心</text>'
    + '</svg>';

  /* ---- ⑤ 矩阵制 ---- */
  var E = '<svg class="diagram" viewBox="0 0 260 200">'
    + box(10,10,70,22,'纵向：职能')
    + box(150,10,100,22,'横向：项目/产品')
    + solid(45,32,45,170)+solid(200,32,200,170);
  [60,90,120,150].forEach(function(y){ E += solid(45,y,200,y); });
  E += '<rect x="112" y="90" width="22" height="22" fill="var(--warn)" opacity=".5" rx="4"/>'
    + '<text x="123" y="106" text-anchor="middle" style="font-size:14px;font-weight:700;fill:var(--ink)">◇</text>'
    + '<text x="130" y="130" text-anchor="middle" style="font-size:9px;fill:var(--ink-3)">◇＝双重领导成员</text>'
    + '<text x="130" y="188" text-anchor="middle" style="font-size:9px;fill:var(--bad)">成员同时受职能经理＋项目经理双重领导</text>'
    + '</svg>';

  var orgStructuresNew = function(){
    return '<div class="prose">'
      + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">'
      + '<div><b>① 直线制</b>'+A+'</div>'
      + '<div><b>② 职能制（多头领导）</b>'+B+'</div>'
      + '</div>'
      + '<div style="margin-top:14px"><b>③ 直线职能制（厂长实线直管车间；职能科室虚线挂靠厂长作参谋）</b>'+C+'</div>'
      + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px">'
      + '<div><b>④ 事业部制</b>'+D+'</div>'
      + '<div><b>⑤ 矩阵制</b>'+E+'</div>'
      + '</div>'
      + '<blockquote><b>口诀</b>：直线制＝一条道；职能制＝多头管；直线职能制＝一条道＋参谋团；事业部＝分家单干；矩阵＝交叉双重领导。</blockquote>'
      + '</div>';
  };

  VISUALS['org-structures'] = orgStructuresNew;
  if (typeof orgStructures !== 'undefined') { /* 旧函数保留但不再被引用 */ }

})();
