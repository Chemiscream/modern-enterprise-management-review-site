/* ===== 第二十六批（v2）：4.7.3 复合图（归因 + 强化） =====
   v2：复合前剥离第二张图里与第一张重复的 <marker> defs（组 D 登记项）。 */
(function(){
  if (typeof DIAGRAMS === 'undefined') return;
  var a = DIAGRAMS['attribution'], r = DIAGRAMS['reinforcement'];
  DIAGRAMS['attribution-reinforcement'] = function(){
    var A = a ? a() : '';
    var B = r ? r() : '';
    // 收集 A 已定义的 marker id
    var ids = {}, m, re = /<marker[^>]*id="([^"]+)"/g;
    while ((m = re.exec(A))) ids[m[1]] = 1;
    // 从 B 的每个 <defs> 块里删掉同名 marker；块空了连 defs 一起删
    B = B.replace(/<defs>[\s\S]*?<\/defs>/g, function(blk){
      var kept = blk.replace(/<marker[\s\S]*?<\/marker>/g, function(mk){
        var mi = /id="([^"]+)"/.exec(mk);
        return (mi && ids[mi[1]]) ? '' : mk;
      });
      return kept.indexOf('<marker') < 0 ? '' : kept;
    });
    return '<div style="display:flex;flex-direction:column;gap:10px">' + A + B + '</div>';
  };
})();
