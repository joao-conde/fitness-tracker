import * as esbuild from "https://deno.land/x/esbuild@v0.17.19/mod.js";

const removeNpmImports: esbuild.Plugin = {
  name: "removeNpmImports",
  setup(build: esbuild.PluginBuild) {
    build.onLoad({ filter: /.ts/ }, async (args) => {
      const source = await Deno.readTextFile(args.path);

      const transformedSource = source
        .split("\n")
        .filter((line) => !line.includes("npm:"))
        .join("\n");

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
  bundle: true,
  minify: true,
  plugins: [removeNpmImports],
});

esbuild.stop();
