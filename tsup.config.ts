import { defineConfig } from 'tsup';
import alias from 'esbuild-plugin-alias';
import path from 'path';

export default defineConfig({
  entryPoints: ['src/index.ts'],
  splitting: false,
  target: 'esnext',
  format: ['esm', 'cjs'],
  clean: true,
  minify: false,
  dts: true,
  bundle: true,
  skipNodeModulesBundle: true,
  esbuildPlugins: [
    alias({
      '../../infra/use-cases/http-post/node-http-post-client': path.resolve('./src/__patches/http-post-client.ts'),
      './use-cases/http-get/node-http-get': path.resolve('./src/__patches/http-get-client.ts'),
    }),
  ],
});
