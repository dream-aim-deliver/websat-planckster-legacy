import { defineConfig } from 'vitest/config'
import path from 'path'

const sharedConfig = defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    }
  },
  test: {
    clearMocks: true,
    globals: true,
    setupFiles: ['../setupTestEnv.ts'],
    env: {
      type: 'node',
      runner: 'node',
      FLAG_TEST_ENV: 'true',
    }
  },
})

export default sharedConfig