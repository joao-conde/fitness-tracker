import * as esbuild from "https://deno.land/x/esbuild@v0.17.19/mod.js";

await esbuild.build({
  entryPoints: ["src/main.ts"],
  bundle: true,
  external: ["npm:@types/chartjs"],
  outfile: "bundle.js",
  platform: "browser",
  format: "esm",
  target: ["esnext"],
  minify: false,
  sourcemap: false,
  define: { "process.env.NODE_ENV": '"production"' },
});

esbuild.stop();
