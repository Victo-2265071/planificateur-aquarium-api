import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import PoissonService from '@src/services/PoissonService';

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

/**
 * Extraire tous les poissons avec filtres
 */
async function getFiltre(req: IReq, res: IRes) {
  const minVolume = Number(req.query.minVolume);
  const eauSalee = req.query.eauSalee === 'true';

  if (isNaN(minVolume)) {
    return res.status(400).json({ error: 'minVolume doit être un nombre.' });
  }

  const poissons = await PoissonService.getFiltre(minVolume, eauSalee);
  return res.status(HttpStatusCodes.OK).json({ poissons });
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getAll,
  getFiltre,
} as const;
