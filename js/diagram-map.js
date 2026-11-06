/* ================= 图示映射：知识点 → 图示 ================= */
/* 说明：本表（POINT_DIAGRAMS）为图示挂载的**唯一权威**；知识点 JSON 的 visual 字段仅作备份兜底
   （views-learn.js renderPoint 优先 diagramKeyFor() 查本表，未命中才回退 pt.visual）。
   判断「某知识点有无配图」以本表为准，勿按 visual:null 推断无图（v11 移交R/T6 登记）。 */

const POINT_DIAGRAMS = {
  // ---- ch01 管理概论 ----
  'ch01:1.1.1': 'mgmt-3layer',
  'ch01:1.1.3': 'manager-roles',
  'ch01:1.1.4': 'skills',
  'ch01:1.2.1': 'mgmt-func',
  'ch01:1.2.2': 'mgmt-duality',
  'ch01:1.3.2': 'three-pioneers',
  'ch01:1.3.3': 'classical-three',
  'ch01:1.3.4': 'maslow',
  'ch01:1.4.1': 'mgmt-principles7',
  'ch01:1.4.2': 'regularity-principle',
  'ch01:1.4.3': 'system-principle',
  'ch01:1.4.4': 'control-principle',
  'ch01:1.4.5': 'elasticity',
  'ch01:1.4.6': 'motivation-three',
  'ch01:1.4.7': 'benefit-principle',
  'ch01:1.5.1': 'ethics-views',
  'ch01:1.5.2': 'moral-stages',
  'ch01:1.5.3': 'social-responsibility',
  'ch01:1.6.1': 'enterprise-flow',

  // ---- ch02 计划 ----
  'ch02:2.1.1': 'plan-purpose',
  'ch02:2.1.2': 'plan-5w1h',
  'ch02:2.1.3': 'plan-steps',
  'ch02:2.2.1': 'plan-types',
  'ch02:2.2.2': 'plan-factors',
  'ch02:2.3.1': 'target-4req',
  'ch02:2.3.2': 'mbo',
  'ch02:2.4.1': 'rolling-plan',
  'ch02:2.4.2': 'network-basic',
  'ch02:2.4.3': 'network-calc',

  // ---- ch03 组织 ----
  'ch03:3.1.1': 'org-elements',
  'ch03:3.1.2': 'org-effectiveness',
  'ch03:3.1.3': 'org-views',
  'ch03:3.2.1': 'org-design-principles',
  'ch03:3.2.2': 'span',
  'ch03:3.2.3': 'org-structures',
  'ch03:3.3.1': 'staffing',
  'ch03:3.3.2': 'centralize-decentralize',
  'ch03:3.3.3': 'line-vs-staff',
  'ch03:3.3.4': 'formal-informal',
  'ch03:3.3.5': 'division-balance',
  'ch03:3.4.1': 'culture-layers',
  'ch03:3.4.2': 'culture-functions',

  // ---- ch04 领导 ----
  'ch04:4.1.1': 'lead-triangle',
  'ch04:4.2.1': 'human-assumptions',
  'ch04:4.2.2': 'x-y-theory',
  'ch04:4.3.1': 'leadership-trait',
  'ch04:4.3.3': 'leadership-grid',
  'ch04:4.4.1': 'fiedler',
  'ch04:4.6.1': 'maslow',
  'ch04:4.6.2': 'two-factor',
  'ch04:4.7.1': 'expectancy',
  'ch04:4.7.2': 'equity',
  'ch04:4.8.1': 'communication',
  'ch04:4.8.2': 'leadership-art',

  // ---- ch05 控制 ----
  'ch05:5.1.1': 'control-def',
  'ch05:5.2.1': 'p-future',
  'ch05:5.3.2': 'control-process',
  'ch05:5.4.1': 'control-types',
  'ch05:5.5.1': 'budget',
  'ch05:5.6.1': 'mis',

  // ---- ch06 管理理论新进展 ----
  'ch06:6.1.1': 'crisis-types',
  'ch06:6.1.2': 'crisis-lifecycle',
  'ch06:6.2.1': 'flexible-mgmt',
  'ch06:6.3.1': 'knowledge-types',
  'ch06:6.4.1': 'z-theory',
  'ch06:6.4.2': 'learning-org',
  'ch06:6.4.3': 'bpr',
  'ch06:6.4.4': 'virtual-org',
  'ch06:6.4.5': 'ecommerce',
  'ch06:6.4.6': 'maslow-z',

  // ---- ch07 企业概论 ----
  'ch07:7.1.1': 'enterprise-features',
  'ch07:7.1.2': 'enterprise-types',
  'ch07:7.2.1': 'modern-enterprise',
  'ch07:7.2.2': 'governance',
  'ch07:7.3.1': 'llc-conditions',
  'ch07:7.3.2': 'jsc-ways',
  'ch07:7.3.3': 'ma-types',
  'ch07:7.3.4': 'spin-off',
  'ch07:7.4.2': 'basic-work',

  // ---- ch08 战略管理 ----
  'ch08:8.1.1': 'strategy-elements',
  'ch08:8.1.2': 'strategy-process',
  'ch08:8.2.1': 'pestn',
  'ch08:8.2.2': 'five-forces',
  'ch08:8.2.3': 'value-chain',
  'ch08:8.2.4': 'swot',
  'ch08:8.3.1': 'strategy-framework',
  'ch08:8.3.2': 'bcg',
  'ch08:8.3.3': 'competitive-strategy',
  'ch08:8.4.1': 'strategic-control',

  // ---- ch09 经营决策 ----
  'ch09:9.1.1': 'decision-def',
  'ch09:9.1.2': 'decision-elements',
  'ch09:9.1.3': 'decision-types',
  'ch09:9.2.1': 'decision-steps',
  'ch09:9.2.2': 'decision-premises',
  'ch09:9.3.1': 'brainstorm',
  'ch09:9.4.1': 'decision-methods',
  'ch09:9.4.2': 'breakeven',
  'ch09:9.4.3': 'decision-tree',
  'ch09:9.4.4': 'uncertainty',  'ch09:9.5.1': 'decision-risk',

  // ---- 补齐剩余知识点 ----
  'ch01:1.1.2': 'mgmt-science',
  'ch01:1.3.1': 'ancient-mgmt',
  'ch01:1.3.5': 'erg-theory',
  'ch01:1.3.6': 'modern-schools6',
  'ch01:1.3.7': 'decision-school',
  'ch02:2.4.4': 'network-opt',
  'ch03:3.4.3': 'culture-build',
  'ch04:4.1.2': 'leader-qualities',
  'ch04:4.3.2': 'lead-styles',
  'ch04:4.4.2': 'path-goal',
  'ch04:4.5.1': 'transactional-transformational',
  'ch04:4.7.3': 'attribution-reinforcement',
  'ch05:5.1.2': 'control-vs-plan',
  'ch05:5.2.2': 'p-plan',
  'ch05:5.2.3': 'p-org',
  'ch05:5.2.4': 'p-keypoint',
  'ch05:5.2.5': 'p-exception',
  'ch05:5.2.6': 'p-timely',
  'ch05:5.2.7': 'p-objective',
  'ch05:5.2.8': 'p-accurate',
  'ch05:5.2.9': 'p-flexible',
  'ch05:5.2.10': 'p-economy',
  'ch05:5.3.1': 'sci-three',
  'ch05:5.4.2': 'control-by-source',
  'ch05:5.5.2': 'non-budget',
  'ch06:6.3.2': 'km-strategy',
  'ch07:7.4.1': 'enterprise-mgmt',
  'ch08:8.3.4': 'strategy-choice',
};

/** 取某知识点的图示 key */
function diagramKeyFor(chId, ptId){
  return POINT_DIAGRAMS[chId + ':' + ptId] || null;
}

/** 渲染图示（返回 HTML 或空串） */
function renderDiagram(key){
  if(!key) return '';
  // 先查新图示库
  if(typeof DIAGRAMS !== 'undefined' && DIAGRAMS[key]){
    try{
      const svg = DIAGRAMS[key]();
      return `<div class="diagram-box">${svg}</div>`;
    }catch(e){
      console.warn('diagram render failed:', key, e);
      return '';
    }
  }
  // 回退到旧的 VISUALS
  if(typeof VISUALS !== 'undefined' && VISUALS[key]){
    try{ return `<div class="diagram-box">${VISUALS[key]()}</div>`; }
    catch(e){ return ''; }
  }
  return '';
}
