import { defineProject, mergeConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import sharedConfig from '../../vitest.shared'

const config =  mergeConfig(
  sharedConfig,
  defineProject({
    test: {
      name: 'component',
      environment: 'jsdom',
      include: ['**/*.test.tsx', '**/*.test.ts'],
    },
   
    plugins: [react()]
  })
)

console.log(config)
export default config