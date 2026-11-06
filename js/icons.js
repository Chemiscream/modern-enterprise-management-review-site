/* ================= 线性图标（stroke 风格，跟随 currentColor） ================= */
/* 统一 24×24 viewBox，stroke-width 1.6，圆头端点，无填充 */

const ICON_PATHS = {
  home:     '<path d="M3 10.5 12 3l9 7.5"/><path d="M5.5 9.5V20h13V9.5"/>',
  book:     '<path d="M4 4.5h6.5a2.5 2.5 0 0 1 2.5 2.5v13a2 2 0 0 0-2-2H4z"/><path d="M20 4.5h-6.5A2.5 2.5 0 0 0 11 7v13a2 2 0 0 1 2-2h7z"/>',
  pencil:   '<path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17z"/><path d="M14.5 5.5 18.5 9.5"/>',
  calculator:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8"/><path d="M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01"/>',
  target:   '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
  memo:     '<path d="M5 3.5h11l3.5 3.5V20a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5z"/><path d="M15.5 3.5V7H19"/><path d="M8 11h8M8 14.5h8M8 18h5"/>',
  folder:   '<path d="M3.5 6.5h6l2 2.5h9v9a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 18z"/>',
  ruler:    '<rect x="3" y="8" width="18" height="8" rx="1"/><path d="M7 8v3M11 8v4M15 8v3M19 8v4"/>',
  repeat:   '<path d="M4 11a7 7 0 0 1 7-7 7 7 0 0 1 6 3.5"/><path d="M17 4v4h-4"/><path d="M20 13a7 7 0 0 1-7 7 7 7 0 0 1-6-3.5"/><path d="M7 20v-4h4"/>',
  chart:    '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  sun:      '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon:     '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/>',
  menu:     '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close:    '<path d="M6 6l12 12M18 6L6 18"/>',
  check:    '<path d="M4 12.5 9 17.5 20 6.5"/>',
  arrowRight:'<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>',
  arrowLeft: '<path d="M19 12H5"/><path d="M11 18l-6-6 6-6"/>',
  play:     '<path d="M7 4.5v15l13-7.5z"/>',
  clock:    '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5.5l3.5 2"/>',
  bulb:     '<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 1 3.5 10.9V16h-7v-2.1A6 6 0 0 1 12 3z"/>',
  list:     '<path d="M8 6h13M8 12h13M8 18h13"/><path d="M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>',
  bookOpen: '<path d="M12 6.5C10.5 5 8 4.5 4 4.5v13c4 0 6.5.5 8 2 1.5-1.5 4-2 8-2v-13c-4 0-6.5.5-8 2z"/><path d="M12 6.5v13"/>',
  reset:    '<path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1"/><path d="M3.5 4.5V10H9"/>',
  shuffle:  '<path d="M4 7h4l8 10h4"/><path d="M4 17h4l2.5-3"/><path d="M14 7h6"/><path d="M17 4l3 3-3 3"/><path d="M17 14l3 3-3 3"/>',
  download: '<path d="M12 4v11"/><path d="M7.5 10.5 12 15l4.5-4.5"/><path d="M5 19h14"/>',
  users:    '<circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16.5 5.5a3 3 0 0 1 0 5.6"/><path d="M17.5 14.5A5.5 5.5 0 0 1 21 19.5"/>',
  cloud:    '<path d="M7 18h9.5a3.5 3.5 0 0 0 .4-7A5 5 0 0 0 7.2 10 3.9 3.9 0 0 0 7 18z"/>',
  cloudOff: '<path d="M7 18h9.5a3.5 3.5 0 0 0 .4-7A5 5 0 0 0 7.2 10 3.9 3.9 0 0 0 7 18z"/><path d="M3 3l18 18"/>',
  scale:    '<path d="M12 4v16"/><path d="M6 20h12"/><path d="M4 9h6l-3 6a3 3 0 0 0 6 0z" transform="translate(0 -1)"/>',
  search:   '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
  chevron:  '<path d="M9 6l6 6-6 6"/>',
};

function icon(name, size){
  const p = ICON_PATHS[name];
  if(!p) return '';
  const s = size || 18;
  return `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none"
    stroke="currentColor" stroke-width="1.6"
    stroke-linecap="round" stroke-linejoin="round"
    style="display:block">${p}</svg>`;
}
