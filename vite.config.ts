import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import fs from 'fs';

import { miaodaDevPlugin } from "miaoda-sc-plugin";

// Plugin para servir robots.txt e sitemap.xml corretamente
const staticFilesPlugin = () => {
  return {
    name: 'serve-static-files',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (req.url === '/robots.txt') {
          const robotsPath = path.resolve(__dirname, 'public/robots.txt');
          const content = fs.readFileSync(robotsPath, 'utf-8');
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.setHeader('Cache-Control', 'public, max-age=3600');
          res.end(content);
          return;
        }
        if (req.url === '/sitemap.xml') {
          const sitemapPath = path.resolve(__dirname, 'public/sitemap.xml');
          const content = fs.readFileSync(sitemapPath, 'utf-8');
          res.setHeader('Content-Type', 'application/xml; charset=utf-8');
          res.setHeader('Cache-Control', 'public, max-age=3600');
          res.end(content);
          return;
        }
        if (req.url === '/mapa.xml') {
          const mapaPath = path.resolve(__dirname, 'public/mapa.xml');
          const content = fs.readFileSync(mapaPath, 'utf-8');
          res.setHeader('Content-Type', 'application/xml; charset=utf-8');
          res.setHeader('Cache-Control', 'public, max-age=3600');
          res.end(content);
          return;
        }
        next();
      });
    },
    closeBundle() {
      // Após o build, garantir que os arquivos corretos estejam no dist
      const distPath = path.resolve(__dirname, 'dist');
      const publicPath = path.resolve(__dirname, 'public');

      // Copiar robots.txt
      const robotsSource = path.join(publicPath, 'robots.txt');
      const robotsDest = path.join(distPath, 'robots.txt');
      if (fs.existsSync(robotsSource)) {
        fs.copyFileSync(robotsSource, robotsDest);
        console.log('✅ robots.txt copiado para dist/');
      }

      // Copiar sitemap.xml
      const sitemapSource = path.join(publicPath, 'sitemap.xml');
      const sitemapDest = path.join(distPath, 'sitemap.xml');
      if (fs.existsSync(sitemapSource)) {
        fs.copyFileSync(sitemapSource, sitemapDest);
        console.log('✅ sitemap.xml copiado para dist/');
      }

      // Copiar mapa.xml
      const mapaSource = path.join(publicPath, 'mapa.xml');
      const mapaDest = path.join(distPath, 'mapa.xml');
      if (fs.existsSync(mapaSource)) {
        fs.copyFileSync(mapaSource, mapaDest);
        console.log('✅ mapa.xml copiado para dist/');
      }

      // Criar arquivo .miaoda-static para indicar que estes arquivos não devem ser sobrescritos
      const miaodaStaticPath = path.join(distPath, '.miaoda-static');
      fs.writeFileSync(
        miaodaStaticPath,
        JSON.stringify(
          {
            files: ['robots.txt', 'sitemap.xml', 'mapa.xml'],
            override: false,
            disableInjection: true,
            disablePlatformRobots: true,
            disablePlatformSitemap: true,
            useCustomFiles: true,
            timestamp: new Date().toISOString(),
          },
          null,
          2,
        ),
      );
      console.log('✅ .miaoda-static criado em dist/');

      // Criar arquivo .miaoda-no-inject
      const noInjectSource = path.join(publicPath, '.miaoda-no-inject');
      const noInjectDest = path.join(distPath, '.miaoda-no-inject');
      if (fs.existsSync(noInjectSource)) {
        fs.copyFileSync(noInjectSource, noInjectDest);
        console.log('✅ .miaoda-no-inject copiado para dist/');
      }

      // Criar arquivo .miaoda-config
      const configSource = path.join(publicPath, '.miaoda-config');
      const configDest = path.join(distPath, '.miaoda-config');
      if (fs.existsSync(configSource)) {
        fs.copyFileSync(configSource, configDest);
        console.log('✅ .miaoda-config copiado para dist/');
      }

      // Copiar _redirects
      const redirectsSource = path.join(publicPath, '_redirects');
      const redirectsDest = path.join(distPath, '_redirects');
      if (fs.existsSync(redirectsSource)) {
        fs.copyFileSync(redirectsSource, redirectsDest);
        console.log('✅ _redirects copiado para dist/');
      }
    },
  };
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [staticFilesPlugin(), react(), svgr({
      svgrOptions: {
        icon: true, exportType: 'named', namedExport: 'ReactComponent', }, }), miaodaDevPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'leaflet', 'react-leaflet'],
  },
  build: {
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('react-router')
            ) {
              return 'react-vendor';
            }
            if (id.includes('lucide-react') || id.includes('@radix-ui')) {
              return 'ui-vendor';
            }
            // Other node_modules in separate chunk
            return 'vendor';
          }

          // Data chunks - split by state to enable lazy loading
          if (id.includes('src/data/states.ts')) {
            return 'data-states';
          }
          if (id.includes('src/data/stateDetailedInfo.ts')) {
            return 'data-state-details';
          }
          if (id.includes('src/data/cityDetailedInfo.ts')) {
            return 'data-city-details';
          }
          if (id.includes('src/data/blogPosts.ts')) {
            return 'data-blog';
          }
          if (id.includes('src/data/seoData.ts')) {
            return 'data-seo';
          }
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'], // Remove specific console methods
      },
    },
    // Enable source maps for debugging (can be disabled in production)
    sourcemap: false,
    // Optimize CSS
    cssCodeSplit: true,
    // Optimize assets
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
  },
});
