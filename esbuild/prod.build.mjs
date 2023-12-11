import { build } from 'esbuild'
import buildOptions from "./common.build.mjs";

console.log("Starting production build");
console.time("BUILD TIME");
await build({
    ...buildOptions,
    minify: true,
    sourcemap: false,
});
console.log("Build complete");
console.timeEnd("BUILD TIME");