import { Request, Response, NextFunction, Router } from 'express';

import Paths from '@src/common/constants/Paths';
import PoissonRoutes from './PoissonRoutes';
import UserRoutes from './UserRoutes';
import JetonRoutes from './JetonRoutes';

import AquariumRoutes from './AquariumRoutes';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { Aquarium } from '@src/models/Aquarium';

/* eslint-disable */

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

// ** Add UserRouter ** //
// Init router
const userRouter = Router();

// Get all users
userRouter.get(Paths.Users.Get, UserRoutes.getAll);
userRouter.post(Paths.Users.Add, UserRoutes.add);
userRouter.put(Paths.Users.Update, UserRoutes.update);
userRouter.delete(Paths.Users.Delete, UserRoutes.delete);

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);

// ** Add PoissonRouter ** //
// Init router
const poissonRouter = Router();

poissonRouter.get(Paths.Poissons.Get, PoissonRoutes.getAll);
poissonRouter.get(Paths.Poissons.GetFiltre, PoissonRoutes.getFiltre);

// Add PoissonRouter
apiRouter.use(Paths.Poissons.Base, poissonRouter);

// ** Add AquariumRouter ** //
// ** Validation d'un aquarium ** //
function validateAquarium(req: Request, res: Response, next: NextFunction) {
  if (req.body === null) {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .send({ error: 'Aquarium requis' })
      .end();
    return;
  }

  if (req.body.aquarium === null) {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .send({ error: 'Aquarium requis' })
      .end();
    return;
  }

  const nouvelAquarium = new Aquarium(req.body.aquarium);
  const error = nouvelAquarium.validateSync();
  if (error !== null && error !== undefined) {
    res.status(HttpStatusCodes.BAD_REQUEST).send(error).end();
  } else {
    next();
  }
}

// Init router
const aquariumRouter = Router();

aquariumRouter.get(Paths.Aquariums.GetAll, AquariumRoutes.getAll);
aquariumRouter.get(Paths.Aquariums.GetOne, AquariumRoutes.getOne);
aquariumRouter.post(Paths.Aquariums.Add, validateAquarium, AquariumRoutes.add);
aquariumRouter.put(Paths.Aquariums.Update, AquariumRoutes.update);
aquariumRouter.delete(Paths.Aquariums.Delete, AquariumRoutes.delete);

// Add aquariumRouter
apiRouter.use(Paths.Aquariums.Base, aquariumRouter);

/******************************************************************************
                                Export default
******************************************************************************/

export default apiRouter;
