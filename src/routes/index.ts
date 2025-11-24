import { Request, Response, NextFunction, Router } from 'express';

import Paths from '@src/common/constants/Paths';
import PoissonRoutes from './PoissonRoutes';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import UserRoutes from './UserRoutes';
import JetonRoutes from './JetonRoutes';

/******************************************************************************
                                Setup
******************************************************************************/

const apiRouter = Router();

// Init token router
const tokenRouter = Router();

// Generate Token
tokenRouter.post(Paths.GenerateToken.Post, JetonRoutes.generateToken);

// ** Add tokenRouter ** //
apiRouter.use(Paths.GenerateToken.Base, tokenRouter);

// Init router
const userRouter = Router();

// Get all users
userRouter.get(Paths.Users.Get, UserRoutes.getAll);
userRouter.post(Paths.Users.Add, UserRoutes.add);
userRouter.put(Paths.Users.Update, UserRoutes.update);
userRouter.delete(Paths.Users.Delete, UserRoutes.delete);

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);

// Init router
const poissonRouter = Router();

poissonRouter.get(Paths.Poissons.Get, PoissonRoutes.getAll);

// Add PoissonRouter
apiRouter.use(Paths.Poissons.Base, poissonRouter);

/******************************************************************************
                                Export default
******************************************************************************/

export default apiRouter;
