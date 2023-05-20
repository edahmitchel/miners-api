import express, { Application } from "express"
import dotenv from 'dotenv'
dotenv.config()
import { json } from "body-parser"
import { connection } from './config/db';

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

app.listen(PORT, () => console.log(`listening on port ${PORT}`)
)