import { defineConfig } from 'vite'

export default defineConfig({
    //define: { global: {} },
    base: '/Hydra_VS_Sequencer',
    define: {
        'process.env': {},
        // 'global.window': 'window'
        // global: {}
    },
    optimizeDeps: {
        esbuildOptions: {
            define: {
                global: 'globalThis'
            }
        }
    }
})