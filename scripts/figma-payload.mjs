// Emits a compact JSON payload used to sync tokens into Figma variables/styles.
import * as t from '../tokens/source.mjs';
const out = { prefix: t.PREFIX, primitives: t.primitives, semantic: t.semantic, spacing: t.spacing, radius: t.radius, borderWidth: t.borderWidth, size: t.size, elevation: t.elevation, fontFamily: Object.fromEntries(Object.entries(t.fontFamily).map(([k,v])=>[k,v.name])), typography: t.typography };
process.stdout.write(JSON.stringify(out));
