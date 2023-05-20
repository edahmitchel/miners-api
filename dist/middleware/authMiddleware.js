"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const secretKey = process.env.JWT_SECRET;
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Get the token from the request header
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    console.log(token);
    try {
        if (!token) {
            return res
                .status(401)
                .json({ message: 'Authentication failed: No token provided' });
        }
        // Verify the token and extract the user id
        const decodedToken = jsonwebtoken_1.default.verify(token, secretKey);
        // async (err: VerifyErrors, decodedToken: object ) => {
        //   if (err) {
        //     return res
        //       .status(401)
        //       .json({ message: 'Authentication failed: Invalid token' });
        //   }
        if (!decodedToken) {
            throw new Error('Invalid token payload');
        }
        const decodedPayload = decodedToken;
        const id = String(decodedPayload._id);
        //     // Find the user associated with the token
        const user = yield user_1.UserModel.findById(id);
        console.log(decodedPayload._id);
        console.log({ middle: 'auth' });
        if (!user) {
            return res
                .status(401)
                .json({ message: 'Authentication failed: User not found' });
        }
        req.user = user;
        // Set the user in the request object
        next();
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
    // }
});
exports.default = authenticateUser;
