import { RouteError } from '@src/common/util/route-errors';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';

import AquariumRepo from '@src/repos/AquariumRepo';
import { IAquarium } from '@src/models/Aquarium';

/******************************************************************************
                                Constants
******************************************************************************/

export const AQUARIUM_NON_TROUVE = 'Aquarium non trouvé';

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Extraine un aquarium par son id.
 */
function getOne(_id: string): Promise<IAquarium | null> {
  return AquariumRepo.getOne(_id);
}

/**
 * Extraire tous les aquariums.
 */
function getAll(): Promise<IAquarium[]> {
  return AquariumRepo.getAll();
}

/**
 * Ajouter un aquarium.
 */
function addOne(aquarium: IAquarium): Promise<void> {
  return AquariumRepo.add(aquarium);
}

/**
 * Mets à jour un aquarium.
 */
async function updateOne(aquarium: IAquarium): Promise<void> {
  if (aquarium._id) {
    const persists = await AquariumRepo.getOne(aquarium._id);
    if (!persists) {
      throw new RouteError(HttpStatusCodes.NOT_FOUND, AQUARIUM_NON_TROUVE);
    }
    // Return aquarium
    return AquariumRepo.update(aquarium);
  }
}

/**
 * Supprimer un aquarium par son id
 */
async function _delete(_id: string): Promise<void> {
  const persists = await AquariumRepo.getOne(_id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, AQUARIUM_NON_TROUVE);
  }
  // Delete aquarium
  return AquariumRepo.delete(_id);
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getOne,
  getAll,
  addOne,
  updateOne,
  delete: _delete,
} as const;
