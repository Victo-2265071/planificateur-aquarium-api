import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import PoissonService from '@src/services/PoissonService';
import { IPoisson } from '@src/models/Poisson';

import { IReq, IRes } from './common/types';

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Extraire tous les poissons
 */
async function getAll(_: IReq, res: IRes) {
  const poissons = await PoissonService.getAll();
  res.status(HttpStatusCodes.OK).json({ poissons });
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getAll,
} as const;
