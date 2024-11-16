import * as esbuild from "https://deno.land/x/esbuild@v0.17.19/mod.js";

const removeNpmImports: esbuild.Plugin = {
  name: "remove-npm-imports",
  setup(build: esbuild.PluginBuild) {
    build.onResolve({ filter: /^npm:/ }, () => ({ external: true }));

    build.onLoad({ filter: /\.ts$/ }, async (args) => {
      const source = await Deno.readTextFile(args.path);
      const transformedSource = source.replace(
        /import[\s\S]*?from\s*["']npm:[^"']+["'];?/g,
        ""
      );
      return {
        contents: transformedSource,
        loader: "ts",
      };
    });
  },
};

await esbuild.build({
  entryPoints: ["src/main.ts"],
  outfile: "dist/bundle.js",
  platform: "browser",
  format: "esm",
  bundle: true,
  minify: true,
  plugins: [removeNpmImports],
});

esbuild.stop();
