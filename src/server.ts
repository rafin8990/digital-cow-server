import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { logger } from './shared/logger'

process.on('uncaughtException', error => {
  console.log(error)
  process.exit(1)
})

let server: Server

async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log(`🛢   Database is connected successfully`)

    app.listen(config.port, () => {
      console.log(`Application  listening on port ${config.port}`)
    })
  } catch (err) {
    logger.error('Failed to connect database', err)
  }
}

process.on('unhandledRejection', error => {
  if (server) {
    server.close(() => {
      console.log(error)
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
})

boostrap()

process.on('SIGTERM', () => {
  console.log('SIGTERM is received')
  if (server) {
    server.close()
  }
})
