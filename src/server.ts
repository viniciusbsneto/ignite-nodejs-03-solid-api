import { env } from './env'
import { app } from './app'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then((url) => {
    console.log(`HTTP server running at ${url}`)
  })
