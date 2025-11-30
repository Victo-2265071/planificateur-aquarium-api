import { IAquarium, Aquarium } from '@src/models/Aquarium';

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Extraire un aquarium.
 *
 * @param {string} _id - ID de l'aquarium à extraire
 *
 * @returns {IAquarium} - Un aquarium si trouvé
 */

async function getOne(_id: string): Promise<IAquarium | null> {
  const aquarium = await Aquarium.findById(_id);
  return aquarium;
}

/**
 * Extraire tous les aquariums.
 *
 * @returns {IAquarium[]} Un tableau de tous les aquariums.
 */
async function getAll(): Promise<IAquarium[]> {
  const aquariums = await Aquarium.find();
  return aquariums;
}

/**
 * Ajouter un aquarium.
 *
 * @param {IAquarium} aquarium - Aquarium à ajouter
 */

async function add(aquarium: IAquarium): Promise<void> {
  const nouvelAquarium = new Aquarium(aquarium);
  await nouvelAquarium.save();
}

/**
 * Mettre à jour un aquarium.
 *
 * @param {IAquarium} aquarium - Aquarium à modifier
 */
async function update(aquarium: IAquarium): Promise<void> {
  const aquariumAModifier = await Aquarium.findOne({ _id: aquarium._id });
  if (aquariumAModifier === null) {
    throw new Error('Aquarium non trouvé');
  }
  aquariumAModifier.nom = aquarium.nom;
  aquariumAModifier.volume = aquarium.volume;
  aquariumAModifier.eau_salee = aquarium.eau_salee;
  aquariumAModifier.date_creation = aquarium.date_creation;
  aquariumAModifier.poissons = aquarium.poissons;
  await aquariumAModifier.save();
}

/**
 * Supprimer un aquarium.
 *
 * @param {string} _id -  id de l'aquarium à supprimer
 */
async function delete_(_id: string): Promise<void> {
  await Aquarium.deleteOne({ _id: _id });
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
