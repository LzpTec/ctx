import { defineConfig } from 'tsup';

export default defineConfig({
    treeshake: "smallest",
    bundle: true,
    clean: true,
    outDir: 'dist',
    format: ['cjs', 'esm'],
    entry: ['src/index.ts'],
    dts: true,
    minify: true,
    platform: 'node',
    target: 'es2021'
});
