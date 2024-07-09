import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { globalErrorHandler } from './app/middlewares/globalErrorHnadler'
import router from './app/router'

const app: Application = express()

app.use(express.json())
app.use(cors())

app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello ABS-SPORTS!')
})

app.use(globalErrorHandler)

export default app
