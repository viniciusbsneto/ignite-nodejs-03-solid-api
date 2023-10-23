import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().default(3333),
})

const safeParsedEnv = envSchema.safeParse(process.env)

if (safeParsedEnv.success === false) {
  console.log('⚠ Invalid environment variables', safeParsedEnv.error.format())

  throw new Error('Invalid environment variables')
}

export const env = safeParsedEnv.data
