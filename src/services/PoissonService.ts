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

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getAll,
} as const;
