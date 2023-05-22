"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = require("./config/db");
const desposit_1 = __importDefault(require("./routes/desposit"));
const investment_1 = __importDefault(require("./routes/investment"));
const withdrawal_1 = __importDefault(require("./routes/withdrawal"));
const transaction_1 = __importDefault(require("./routes/transaction"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const auth_1 = require("./routes/auth");
const chat_1 = __importDefault(require("./routes/chat"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
const PORT = process.env.PORT || 5000;
const connectionString = process.env.MONGO_URI;
(0, db_1.connection)(connectionString);
console.log(connectionString);
app.use("/api/auth", auth_1.authRoutes);
app.use("/api/deposit", desposit_1.default);
app.use("/api/investment", investment_1.default);
app.use("/api/withdrawal", withdrawal_1.default);
app.use("/api/transaction", transaction_1.default);
app.use("/api/chat", chat_1.default);
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
// Socket.IO event handling
io.on("connection", (socket) => {
    console.log("A user connected");
    // Handle chat events
    socket.on("chat message", (msg) => {
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
server.listen(PORT, () => console.log(`listening on port ${PORT}`));
