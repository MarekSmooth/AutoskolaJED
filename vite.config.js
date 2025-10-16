import { defineConfig } from 'vite';


export default defineConfig({
base: './', // důležité pro GitHub Pages i Bolt
build: {
outDir: 'dist',
assetsDir: 'assets'
}
});
