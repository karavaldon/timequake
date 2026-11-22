// Checks every intended foreground/background pairing in BOTH modes against WCAG 2.2.
// Text pairs need 4.5:1, UI/graphic pairs (borders, icons, focus) need 3:1.
import { primitives, semantic } from '../tokens/source.mjs';
const hex = (ref) => { const [f, s] = ref.split('.'); return primitives[f]?.[s]; };
const lum = (h) => { const c=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=0.03928?v/12.92:((v+0.055)/1.055)**2.4); return .2126*c[0]+.7152*c[1]+.0722*c[2]; };
const ratio = (a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
const T=4.5, G=3;
const pairs = [
  ...['text/primary','text/secondary','text/tertiary','text/accent','text/live','text/danger'].flatMap(t=>['bg/canvas','bg/raised','bg/accent-subtle'].map(b=>[t,b,T])),
  ['text/on-action','bg/action',T],['text/on-action','bg/action-pressed',T],['text/on-accent','bg/accent',T],['text/inverse','bg/inverse',T],['text/inverse','bg/danger',T],
  ...['border/strong','border/input','border/focus','border/danger','icon/primary','icon/secondary','icon/accent','icon/live','data/line','data/highlight','map/route','map/route-live'].flatMap(t=>['bg/canvas','bg/raised'].map(b=>[t,b,G])),
  ['data/line','data/band',G],['map/route','map/road',G],['map/route','map/water',G],['map/route-live','map/road',G],['map/label','map/land',T],
  ...[1,2,3,4,5].map(z=>[`data/zone-${z}`,'bg/canvas',G]),
];
let fail=0; const rows=[];
for (const [fg,bg,min] of pairs) for (const m of [0,1]) {
  const a=hex(semantic[fg][m]), b=hex(semantic[bg][m]); const r=ratio(a,b);
  if (r<min) { fail++; rows.push(`FAIL ${m?'dark ':'light'} ${fg} on ${bg}: ${r.toFixed(2)} (need ${min})`); }
}
console.log(rows.join('\n') || 'All pairs pass'); console.log(`${pairs.length*2} checks, ${fail} failures`);
process.exit(fail?1:0);
