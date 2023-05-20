"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = require("./config/db");
const auth_1 = require("./routes/auth");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const PORT = process.env.PORT || 5000;
const connectionString = process.env.MONGO_URI;
(0, db_1.connection)(connectionString);
console.log(connectionString);
app.use("/api/auth", auth_1.authRoutes);
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
