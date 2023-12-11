import { context } from 'esbuild';
import buildOptions from "./common.build.mjs";
import fs from "fs";

let startTime;

if (fs.existsSync('dist')) {
    fs.rmSync("dist", { recursive: true });
}

fs.mkdirSync("dist");

let devPlugin = {
    name: 'example',
    setup(build) {
        build.onStart(() => {
            startTime = process.hrtime();
            console.log("Build started");
        });

        build.onEnd(result => {
            let diff = process.hrtime(startTime);
            let diffSeconds = ((diff[0] * 1e9) + diff[1]) / 1e9;

            console.log(`Build finished in ${diffSeconds.toFixed(2)} seconds with ${result.errors.length} errors`);
        });
    },
}

// Set build options as context instead of "build"
let ctx = await context({
    ...buildOptions,
    minify: false,
    sourcemap: true,
    write: true,
    plugins: [...buildOptions.plugins, devPlugin]
});
await ctx.watch();

let { host, port } = await ctx.serve({
    servedir: 'dist',
})

console.log(host,port);