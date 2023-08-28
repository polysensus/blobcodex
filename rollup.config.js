// derived from: https://github.com/rollup/rollup-starter-lib/blob/master/rollup.config.js
import { nodeResolve } from "@rollup/plugin-node-resolve";
import nodePolyfills from "rollup-plugin-polyfill-node";
import commonjs from "@rollup/plugin-commonjs";
import pkg from "./package.json" assert { type: "json" };

export default [
  {
    // Note: it is faster to generate multiple builds from the same config
    // where possible
    // name: pkg.name,
    input: "src/main.js",
    external: ["crypto"],
    output: [
      {
        // inlineDynamicImports: true,
        file: pkg.module,
        format: "es",
        // sourcemap: true,
        exports: "named",
        interop: "compat",
      },
    ],
    plugins: [
      // json(),
      // nodePolyfils so import fs works in node and in browser, on node it is stubbed to the global
      // This needs preferBuiltins to be false in the nodeResolve plugin
      nodePolyfills(),
      nodeResolve({ preferBuiltins: true }),
      commonjs(),
    ],
    // plugins: [json(), resolve(), nodePolyfills(), commonjs()],
  },
];
