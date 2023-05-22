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
import chatRouter from "./routes/chat"
import http from "http"
import cors from "cors"
import { Server, Socket } from "socket.io";
const app: Application = express()
const server = http.createServer(app)
const io = new Server(server);
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

const PORT = process.env.PORT || 5000
const connectionString = process.env.MONGO_URI as string
connection(connectionString)
console.log(connectionString);
app.use("/api/auth", authRoutes)
app.use("/api/deposit", depositRouter)
app.use("/api/investment", investmentRouter)
app.use("/api/withdrawal", withdrawalRouter)
app.use("/api/transaction", transactionRouter)
app.use("/api/chat", chatRouter)

app.use(notFound)
app.use(errorHandler)

// Socket.IO event handling
io.on("connection", (socket: Socket) => {
    console.log("A user connected");

    // Handle chat events
    socket.on("chat message", (msg: string) => {
        console.log("Message received:", msg);
        // Implement logic to handle and broadcast the chat message
        // For example, you can emit the message to all connected sockets
        io.emit("chat message", msg);
    });
    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("user joined room" + room);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});


server.listen(PORT, () => console.log(`listening on port ${PORT}`)
)