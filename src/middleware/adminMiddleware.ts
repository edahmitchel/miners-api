// import { NextFunction, Request, Response } from "express";

// const jwt = require("jsonwebtoken");


// const isAdminLevel = (level) => {
//   return async (req:Request, res:Response, next:NextFunction()) => {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).send("Unauthorized in admin");
//     }
//     const token = authHeader.split(" ")[1];
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const admin = await Admin.findById(decoded.adminId);
//       if (!admin) {
//         return res.status(401).send(" Unauthorized user in admin route");
//       }
//       if (admin.adminLevel >= level) {
//         req.admin = admin;
//         req.adminLevel = admin.adminLevel;
//         return next();
//       }
//       return res.status(403).send("Forbidden admin level ot high enoug");
//     } catch (err) {
//       return res.status(401).send("Unauthorized");
//     }
//   };
// };

// module.exports = { isAdminLevel };
