import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import AquariumService from '@src/services/AquariumService';
import { IAquarium } from '@src/models/Aquarium';

import { IReq, IRes } from './common/types';

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Extraire un aquarium.
 */
async function getOne(req: IReq, res: IRes) {
  const { id } = req.params;
  const aquarium = await AquariumService.getOne(id as string);
  res.status(HttpStatusCodes.OK).json({ aquarium });
}

/**
 * Extraire tous les aquariums.
 */
async function getAll(_: IReq, res: IRes) {
  const aquariums = await AquariumService.getAll();
  res.status(HttpStatusCodes.OK).json({ aquariums });
}

/**
 * Ajouter un aquarium.
 */
async function add(req: IReq, res: IRes) {
  const { aquarium } = req.body;
  await AquariumService.addOne(aquarium as IAquarium);
  res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Mettre à jour un aquarium.
 */
async function update(req: IReq, res: IRes) {
  const { aquarium } = req.body;
  await AquariumService.updateOne(aquarium as IAquarium);
  res.status(HttpStatusCodes.OK).end();
}

/**
 * Supprimer un auteur.
 */
async function delete_(req: IReq, res: IRes) {
  const { id } = req.params;
  await AquariumService.delete(id as string);
  res.status(HttpStatusCodes.OK).end();
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getOne,
  getAll,
  add,
  update,
  delete: delete_,
} as const;
