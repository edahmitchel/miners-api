import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors, JwtPayload } from 'jsonwebtoken';
import { IUserModel, UserModel } from '../models/user';
import { IUser } from '../types';


interface AuthenticatedRequest extends Request {
  user?: IUser;
}

const secretKey = process.env.JWT_SECRET as string;

const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  // Get the token from the request header
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token);

  try {
    if (!token) {
      return res
        .status(401)
        .json({ message: 'Authentication failed: No token provided' });
    }

    // Verify the token and extract the user id
    const decodedToken = jwt.verify(
      token,
      secretKey)
    // async (err: VerifyErrors, decodedToken: object ) => {
    //   if (err) {
    //     return res
    //       .status(401)
    //       .json({ message: 'Authentication failed: Invalid token' });
    //   }

    if (!decodedToken) {
      throw new Error('Invalid token payload');
    }

    const decodedPayload = decodedToken as JwtPayload;
    const id: string = String(decodedPayload._id);
    //     // Find the user associated with the token
    const user = await UserModel.findById(id);

    console.log(decodedPayload._id);
    console.log({ middle: 'auth' });

    if (!user) {
      return res
        .status(401)
        .json({ message: 'Authentication failed: User not found' });
    }
    (req as AuthenticatedRequest).user = user;

    // Set the user in the request object
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
  // }

};

export default authenticateUser;
