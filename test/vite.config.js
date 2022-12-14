import { defineConfig, loadEnv } from 'vite'
import { unpack } from '../lib'

export default defineConfig(params => {
  // process.env = { ...process.env, ...unpack(loadEnv(params.mode, process.cwd(), 'ENV_')) }
  console.dir(unpack(loadEnv(params.mode, process.cwd(), 'ENV_')))
})
