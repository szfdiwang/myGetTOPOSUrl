import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
// import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://47.241.216.139:30025',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/types/auto-imports.d.ts',
      dirs: ['src/stores', 'src/hooks/**'],
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: false // 1、改为true用于生成eslint配置。2、生成后改回false，避免重复生成消耗
      }
    }),
    Components({
      dirs: ['src/components'],
      dts: 'src/types/components.d.ts',
      include: [/\.vue$/, /\.vue\?vue/],
      resolvers: [
        ElementPlusResolver({ importStyle: 'sass' })
        // IconsResolver({
        //   enabledCollections: ['ep'],
        //   customCollections: ['base', 'custom']
        // })
      ]
    }),
    vue(),
    UnoCSS()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
