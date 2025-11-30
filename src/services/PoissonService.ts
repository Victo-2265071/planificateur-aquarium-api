import PoissonRepo from '@src/repos/PoissonRepo';
import { IPoisson } from '@src/models/Poisson';

/******************************************************************************
                                Constants
******************************************************************************/

export const POISSON_NON_TROUVE = 'Poisson non trouvé';

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Extraire tous les poissons.
 */
function getAll(): Promise<IPoisson[]> {
  return PoissonRepo.getAll();
}

/**
 * Extraire tous les poissons filtrés.
 */
function getFiltre(minVolume: number, eauSalee: boolean) {
  return PoissonRepo.getFiltre(minVolume, eauSalee);
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getAll,
  getFiltre,
} as const;
