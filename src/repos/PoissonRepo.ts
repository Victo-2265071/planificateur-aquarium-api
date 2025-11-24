import { IPoisson, Poisson } from '@src/models/Poisson';

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Extraire un poisson.
 *
 * @param {string} id - ID du poisson à extraire
 *
 * @returns {IPoisson} - Un poisson si trouvé
 */

async function getOne(id: number): Promise<IPoisson | null> {
  const poisson = await Poisson.findOne({
    id: id,
  });
  return poisson;
}

/**
 * Extraire tous les poissons.
 *
 * @returns {IPoisson[]} Un tableau de tous les poissons
 */
async function getAll(): Promise<IPoisson[]> {
  const poissons = await Poisson.find();
  return poissons;
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getOne,
  getAll,
} as const;
