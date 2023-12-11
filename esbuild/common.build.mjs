import { htmlPlugin } from "@craftamap/esbuild-plugin-html";
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import { sassPlugin } from 'esbuild-sass-plugin';

export default {
    entryPoints: [
        {
            out: "scripts/index",
            in: "./src/App.tsx"
        },
    ],
    metafile: true,
    loader: {
        ".js": "jsx"
    },
    plugins: [
        NodeModulesPolyfillPlugin(),
        sassPlugin(),
        htmlPlugin({
            files: [
                {
                    entryPoints: ["src/App.tsx"],
                    filename: 'index.html',
                    htmlTemplate: `<!DOCTYPE html>
                    <html spellcheck="true">
                        <head>
                            <base href="/" />
                            <title>React</title>
                    
                            <meta content="width=device-width, initial-scale=1" name="viewport" />
                            <meta charset="UTF-8" />
                
                        </head>
                        <body>
                            <div id="root"></div>
                        </body>
                        <script>new EventSource('/esbuild').addEventListener('change', () => location.reload())</script>
                    </html>
                    `,
                },
            ]
        })
    ],
    bundle: true,
    outbase: "assets",
    outdir: "dist",
    allowOverwrite: true
}