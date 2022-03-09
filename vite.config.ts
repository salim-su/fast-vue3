import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';
import { ConfigEnv, UserConfigExport } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import styleImport, { NutuiResolve, VantResolve } from 'vite-plugin-style-import';
import { viteMockServe } from 'vite-plugin-mock';
import eruda from 'vite-plugin-eruda';

function resolve(dir: string) {
  return path.join(__dirname, dir);
}

function resovePath(paths: string) {
  // 如何 __dirname 找不到 需要 yarn add @types/node --save-dev
  return path.resolve(__dirname, paths);
}

// https://vitejs.dev/config/
export default function ({ command }: ConfigEnv): UserConfigExport {
  const isProduction = command === 'build';
  return {
    server: {
      host: '0.0.0.0',
      port: 3000,
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8866/',
          // target: 'http://localhost:8080/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      eslintPlugin({
        fix: true
      }),
      styleImport({
        libs: [NutuiResolve(), VantResolve()]
      }),
      legacy({
        targets: ['defaults', 'not IE 11']
      }),
      // eruda(),移动端调试工具
      viteMockServe({
        mockPath: './src/mock',
        localEnabled: command === 'serve',
        logger: true
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          // 配置 nutui 全局 scss 变量
          additionalData: `@import "@nutui/nutui/dist/styles/variables.scss";`
          // additionalData: '@import "@/assets/css/index.scss";'
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve('./src'),
        '@config': resovePath('./config'),
        '@components': resovePath('./components'),
        '@views': resovePath('./views'),
        '@assets': resovePath('./assets')
        // '@config': resovePath('./src./config'),
        // '@utils': resovePath('./src/utils'),
        // '@api': resovePath('./src/api'),
      }
    }
  };
}
