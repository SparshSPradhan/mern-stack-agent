import dotenv from 'dotenv'
dotenv.config()

import { MONGO_URI, PORT } from './constants/index'
import app from './utils/app' // (server)
import mongo from './utils/mongo' // (database)
import authRoutes from './routes/auth'
import agentRoutes from './routes/agent'
import taskRoutes from './routes/tasks'
import uploadRoutes from './routes/upload'


const bootstrap = async () => {

  console.log(process.env.MONGO_URI)

  await mongo.connect()

  app.get('/', (req, res) => {
    res.status(200).send('Hello, world!')
  })

  app.get('/healthz', (req, res) => {
    res.status(204).end()
  })

  app.use('/auth', authRoutes)
  app.use("/agent", agentRoutes);
  app.use("/upload", uploadRoutes);
  app.use("/task", taskRoutes);
  // add rest of routes here...

  app.listen(PORT, () => {
    console.log(`✅ Server is listening on port: ${process.env.PORT}`)
  })
}

bootstrap()
