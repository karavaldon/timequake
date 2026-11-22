// Sample data shared by stories and screens. One consistent run: Thu Nov 19, Lady Bird Lake, Austin.

/** Route as normalised [x, y] points (0–1). A lake loop with an out-and-back. */
export const sampleRoute: [number, number][] = (() => {
  const pts: [number, number][] = [];
  for (let i = 0; i <= 120; i++) {
    const t = (i / 120) * Math.PI * 2;
    const x = 0.5 + 0.34 * Math.cos(t) + 0.03 * Math.sin(3 * t);
    const y = 0.52 + 0.2 * Math.sin(t) + 0.025 * Math.cos(5 * t);
    pts.push([x, y]);
  }
  return pts;
})();


export const sampleRun = {
  title: 'Morning tempo',
  date: 'Thu · Nov 19',
  place: 'Lady Bird Lake',
  distance: '6.21', time: '47:52', pace: '7:42', avgHr: 152, maxHr: 171, hrv: 71, cadence: 172, elevation: '+184',
  splits: [
    { mile: 1, pace: '7:51', hr: 141, elev: '+12' }, { mile: 2, pace: '7:44', hr: 148, elev: '+4' }, { mile: 3, pace: '7:38', hr: 153, elev: '−6' },
    { mile: 4, pace: '7:29', hr: 157, elev: '+9' }, { mile: 5, pace: '7:37', hr: 155, elev: '−3' }, { mile: 6, pace: '7:24', hr: 160, elev: '−8' },
  ],
  zones: [6, 18, 31, 38, 7] as [number, number, number, number, number],
};

/** HR during the run, one sample per ~30 s. */
export const sampleHr: number[] = Array.from({ length: 96 }, (_, i) => Math.round(128 + 30 * (1 - Math.exp(-i / 18)) + 5 * Math.sin(i / 4) + (i > 80 ? (i - 80) * 0.8 : 0)));

/** Resting HR and HRV, last 12 weeks. */
export const weeks = ['Sep 1', 'Sep 8', 'Sep 15', 'Sep 22', 'Sep 29', 'Oct 6', 'Oct 13', 'Oct 20', 'Oct 27', 'Nov 3', 'Nov 10', 'Nov 17'];
export const restingHr = [58, 57, 58, 56, 55, 55, 54, 55, 53, 53, 52, 52];
export const hrvTrend = [58, 61, 60, 63, 62, 66, 64, 67, 68, 66, 70, 71];
export const weeklyMiles = [18.2, 21.5, 19.8, 24.1, 22.6, 26.3, 12.4, 25.0, 27.8, 29.1, 26.4, 28.4];

export const sampleLog = [
  { id: 'r1', title: 'Morning tempo', date: 'Thu · Nov 19', distance: '6.21', time: '47:52', pace: '7:42', tag: 'New 5K PR' },
  { id: 'r2', title: 'Easy loop', date: 'Tue · Nov 17', distance: '4.02', time: '36:10', pace: '9:00' },
  { id: 'r3', title: 'Long run', date: 'Sun · Nov 15', distance: '10.40', time: '1:31:12', pace: '8:46' },
  { id: 'r4', title: 'Intervals · 6×800', date: 'Fri · Nov 13', distance: '5.10', time: '39:02', pace: '7:39' },
];

/**
 * Approximate GPS track ([lng, lat]) of the Butler Trail loop, Mopac bridge → Congress Ave bridge,
 * Lady Bird Lake, Austin. Hand-traced demo data — swap in a real recorded track for production.
 */
export const sampleGps: [number, number][] = (() => {
  const way: [number, number][] = [
    [-97.7703, 30.2718], [-97.7668, 30.2722], [-97.7625, 30.2712], [-97.7585, 30.2690], [-97.7552, 30.2668],
    [-97.7515, 30.2650], [-97.7480, 30.2632], [-97.7452, 30.2622], [-97.7455, 30.2590], [-97.7490, 30.2605],
    [-97.7530, 30.2620], [-97.7565, 30.2640], [-97.7605, 30.2660], [-97.7655, 30.2672], [-97.7695, 30.2690],
    [-97.7708, 30.2705], [-97.7703, 30.2718],
  ];
  const out: [number, number][] = [];
  for (let i = 0; i < way.length - 1; i++) {
    const [a, b] = [way[i], way[i + 1]];
    for (let k = 0; k < 8; k++) { const t = k / 8; out.push([+(a[0] + (b[0] - a[0]) * t).toFixed(6), +(a[1] + (b[1] - a[1]) * t).toFixed(6)]); }
  }
  out.push(way[way.length - 1]);
  return out;
})();
