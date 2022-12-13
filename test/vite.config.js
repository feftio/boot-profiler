import { defineConfig, loadEnv } from 'vite'
import { unpack } from '../boot'

export default defineConfig(params => {
  // process.env = { ...process.env, ...unpack(loadEnv(params.mode, process.cwd(), 'ENV_')) }
  console.dir(loadEnv(params.mode, process.cwd(), 'ENV_'))
})
