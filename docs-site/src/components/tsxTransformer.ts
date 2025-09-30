import { initialize, transform } from "esbuild-wasm";
import { version } from "esbuild-wasm/package.json";

let initializeEsBuild: Promise<void> | null = null;

const cleanTranspiledCode = (code: string) => {
  return code
    .replace(/\/\*\s*@__PURE__\s*\*\/\s*/g, "")
    .replace(/\/\*\s*@__INLINE__\s*\*\/\s*/g, "")
    .replace(/\/\*\s*@__NOINLINE__\s*\*\/\s*/g, "")
    .replace(/\/\*\s*@__SIDE_EFFECTS__\s*\*\/\s*/g, "")
    .replace(/\/\*\s*\*\/\s*/g, "")
    .replace(/\n\s*\n\s*\n/g, "\n\n");
};

export const initializeTsxTransformer = async () => {
  if (!initializeEsBuild) {
    try {
      initializeEsBuild = initialize({
        wasmURL: `https://unpkg.com/esbuild-wasm@${version}/esbuild.wasm`,
      });
    } catch (error) {
      console.error(`Initializing tsx transformer failed:`, error);
      initializeEsBuild = null;

      throw error;
    }
  }

  return initializeEsBuild;
};

export const transformTsx = async (code: string) => {
  await initializeTsxTransformer();

  const result = await transform(code, {
    loader: "tsx",
    target: "es2020",
    jsx: "preserve",
    minify: false,
    // Remove special comments
    legalComments: "none",
    // Additional options to clean up output
    treeShaking: true,
  });
  return cleanTranspiledCode(result.code);
};
