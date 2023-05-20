import express, { Application } from "express"
import dotenv from 'dotenv'

dotenv.config()
import { json } from "body-parser"
import { connection } from './config/db';
import depositRouter from "./routes/desposit"
import investmentRouter from "./routes/investment"
import withdrawalRouter from "./routes/withdrawal"
import transactionRouter from "./routes/transaction"
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import { authRoutes } from "./routes/auth";
const app: Application = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const PORT = process.env.PORT || 5000
const connectionString = process.env.MONGO_URI as string
connection(connectionString)
console.log(connectionString);
app.use("/api/auth", authRoutes)
app.use("/api/deposit", depositRouter)
app.use("/api/investment", investmentRouter)
app.use("/api/withdrawal", withdrawalRouter)
app.use("/api/transaction", transactionRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`listening on port ${PORT}`)
)