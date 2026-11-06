/* ================= 视图：口径对照表 ================= */
/* 把所有「数量型考点」集中成一张权威表，杜绝不同章节说法不一 */

const CanonState = { q: '' };

function viewCanon(){
  const data = App.canon;
  if(!data || !data.items || !data.items.length){
    return `<div class="empty"><div class="ico">${icon("ruler",28)}</div><p>口径表未加载</p></div>`;
  }

  const [q, setQ] = [CanonState.q, null];
  const items = q
    ? data.items.filter(it =>
        (it.topic + it.course + it.caution + it.where).toLowerCase().includes(q.toLowerCase()))
    : data.items;

  return `
    <div class="card" style="border-color:var(--purple);background:rgba(124,92,214,.07)">
      <div style="font-weight:700;color:var(--purple);margin-bottom:6px">${icon("ruler",15)} 这是什么</div>
      <div class="muted" style="line-height:1.9">
        本课程里凡是「几个职能、几类资源、几条原则、几种方法」这类数量型考点，
        都在这一页给定唯一口径。全部依据<b>课件原文</b>整理，
        并标出容易记混的地方（例如第 1 章管理职能是 5 个，第 7 章企业管理职能是 4 个，两者都是课件口径）。
        <br>遇到任何地方说法不一致，以本页为准。
      </div>
    </div>

    <div class="filters" style="margin-top:14px">
      <input type="text" id="canonSearch" placeholder="搜索知识点，如「资源」「职能」「原则」"
             value="${esc(q||'')}" oninput="canonSearch(this.value)" style="flex:1;min-width:200px">
      <span class="muted">共 ${items.length} 条</span>
    </div>

    ${items.map(it=>`
      <div class="card" style="margin-bottom:12px">
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:10px">
          <b style="font-size:15px">${esc(it.topic)}</b>
          <span class="chip ok" style="margin-left:auto">${esc(it.where)}</span>
        </div>

        <div style="background:var(--ok-soft);border-left:3px solid var(--ok);border-radius:0 10px 10px 0;padding:11px 14px;margin-bottom:10px">
          <div style="font-size:11px;color:var(--ok);font-weight:700;margin-bottom:3px">课件口径（按这个答题）</div>
          <div style="font-size:14px;font-weight:600;line-height:1.8">${esc(it.course)}</div>
        </div>

        ${it.caution?`
          <div style="background:var(--warn-soft);border-left:3px solid var(--warn);border-radius:0 10px 10px 0;padding:11px 14px;margin-bottom:10px">
            <div style="font-size:11px;color:var(--warn);font-weight:700;margin-bottom:3px">易混淆 / 易错</div>
            <div style="font-size:13.4px;line-height:1.85">${esc(it.caution)}</div>
          </div>`:''}

        ${it.exam?`
          <div class="muted" style="font-size:12.5px;line-height:1.8">
            <b>怎么考：</b>${esc(it.exam)}
          </div>`:''}
      </div>
    `).join('')}
  `;
}

function canonSearch(v){
  CanonState.q = v;
  // 只重绘列表区，保持输入框焦点
  const view = $('#view');
  const scroll = window.scrollY;
  view.innerHTML = viewCanon();
  const inp = $('#canonSearch');
  if(inp){ inp.focus(); inp.setSelectionRange(v.length, v.length); }
  window.scrollTo({top: scroll});
}
