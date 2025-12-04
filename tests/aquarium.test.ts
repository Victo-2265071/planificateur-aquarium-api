import insertUrlParams from 'inserturlparams';
import { customDeepCompare } from 'jet-validators/utils';

import { AQUARIUM_NON_TROUVE } from '@src/services/AquariumService';

import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { TRes } from './common/util';

import Paths from './common/Paths';
import { agent } from './support/setup';
import { IAquarium, Aquarium } from '@src/models/Aquarium';

/* eslint-disable */

/******************************************************************************
                               Constants
******************************************************************************/

const DB_AQUARIUMS: IAquarium[] = [
  {
    nom: 'Amazonie Tropical',
    volume: 120,
    eau_salee: false,
    date_creation: new Date('2021-06-15'),
    poissons: [
      { poisson_nom: 'Guppy', quantite: 5 },
      { poisson_nom: 'Néon tetra', quantite: 3 },
    ],
  },
  {
    nom: 'Corail Pacifique',
    volume: 250,
    eau_salee: true,
    date_creation: new Date('2022-01-20'),
    poissons: [
      { poisson_nom: 'Guppy', quantite: 5 },
      { poisson_nom: 'Néon tetra', quantite: 3 },
    ],
  },
  {
    nom: 'Jungle Verte',
    volume: 80,
    eau_salee: false,
    date_creation: new Date('2020-09-10'),
    poissons: [
      { poisson_nom: 'Guppy', quantite: 5 },
      { poisson_nom: 'Néon tetra', quantite: 3 },
    ],
  },
] as const;

// Don't compare 'id' and 'created' cause those are set dynamically by the
// database
const compareUserArrays = customDeepCompare({
  onlyCompareProps: ['nom', 'volume', 'eau_salee', 'date_creation', 'poissons'],
});

const mockify = require('@jazim/mock-mongoose');
/******************************************************************************
                                 Tests
  IMPORTANT: Following TypeScript best practices, we test all scenarios that 
  can be triggered by a user under normal circumstances. Not all theoretically
  scenarios (i.e. a failed database connection). 
******************************************************************************/

describe('aquariumRouter', () => {
  let dbAquariums: IAquarium[] = [];

  // Extraire tous les aquariums
  describe(`'GET:${Paths.Aquariums.GetAll}'`, () => {
    // Succès
    it(
      'doit retourner un JSON avec tous les aquariums et un code de ' +
        `of '${HttpStatusCodes.OK}' si réussi.`,
      async () => {
        // Préparer le simulacre de Mongoose
        const data = [...DB_AQUARIUMS];
        mockify(Aquarium).toReturn(data, 'find');
        const res: TRes<{ aquarium: IAquarium[] }> = await agent.get(
          Paths.Aquariums.GetAll,
        );
        expect(res.status).toBe(HttpStatusCodes.OK);
        expect(compareUserArrays(res.body.aquarium, DB_AQUARIUMS)).toBeTruthy();
      },
    );
  });

  // Tester l'ajout d'un aquarium
  describe(`'POST:${Paths.Aquariums.Add}'`, () => {
    // Ajout réussi
    it(
      `doit retourner le code '${HttpStatusCodes.CREATED}' si la ` +
        'transaction est réussie',
      async () => {
        const aquarium: IAquarium = {
          nom: 'Aquarium Test',
          volume: 80,
          eau_salee: false,
          date_creation: new Date('2020-09-10'),
          poissons: [
            { poisson_nom: 'Guppy', quantite: 5 },
            { poisson_nom: 'Néon tetra', quantite: 3 },
          ],
        };
        // Préparer le simulacre de Mongoose
        mockify(Aquarium).toReturn(aquarium, 'save');
        const res = await agent.post(Paths.Aquariums.Add).send({ aquarium });
        expect(res.status).toBe(HttpStatusCodes.CREATED);
      },
    );

    // Paramètre manquant
    it(
      'doit retourner un JSON avec les erreurs et un code de ' +
        `'${HttpStatusCodes.BAD_REQUEST}' si un paramètre est ` +
        'manquant.',
      async () => {
        const res: TRes = await agent
          .post(Paths.Aquariums.Add)
          .send({ Aquarium: null });
        expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
        expect(res.body.error).toBe('Aquarium requis');
      },
    );
  });

  // Mise à jour d'un aquarium
  describe(`'PUT:${Paths.Aquariums.Update}'`, () => {
    // Succès
    it(
      `doit retourner un code de '${HttpStatusCodes.OK}' si la mise à jour ` +
        'est réussie.',
      async () => {
        const aquarium = DB_AQUARIUMS[0];
        aquarium.nom = 'Nom Modifié';

        // Préparer le simulacre de Mongoose
        mockify(Aquarium)
          .toReturn(aquarium, 'findOne')
          .toReturn(aquarium, 'save');

        const res = await agent.put(Paths.Aquariums.Update).send({ aquarium });
        expect(res.status).toBe(HttpStatusCodes.OK);
      },
    );

    // Aquarium non trouvée
    it(
      'doit retourner un JSON avec erreur  ' +
        `'${AQUARIUM_NON_TROUVE}' et un code de ` +
        `'${HttpStatusCodes.NOT_FOUND}' si l'id n'est pas trouvé.`,
      async () => {
        // Préparer le simulacre de Mongoose
        mockify(Aquarium).toReturn(null, 'findOne');
        const aquarium = {
            id: 4,
            nom: 'Aquarium Test Modifie',
            volume: 80,
            eau_salee: false,
            date_creation: new Date('2020-09-10'),
            poissons: [
              { poisson_id: 2, quantite: 4 },
              { poisson_id: 5, quantite: 1 },
            ],
          },
          res: TRes = await agent
            .put(Paths.Aquariums.Update)
            .send({ aquarium });

        expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
        expect(res.body.error).toBe(AQUARIUM_NON_TROUVE);
      },
    );
  });

  // Supprimer l'aquarium
  describe(`'DELETE:${Paths.Aquariums.Delete}'`, () => {
    const getPath = (id: string) =>
      insertUrlParams(Paths.Aquariums.Delete, { id });

    // Succès
    it(
      `doit retourner un code de '${HttpStatusCodes.OK}' si la ` +
        'suppression est réussie.',
      async () => {
        // Préparer le simulacre de Mongoose
        mockify(Aquarium)
          .toReturn(DB_AQUARIUMS[0], 'findOne')
          .toReturn(DB_AQUARIUMS[0], 'findOneAndRemove');
        if (DB_AQUARIUMS[0]._id) {
          const _id = DB_AQUARIUMS[0]._id,
            res = await agent.delete(getPath(_id));
          expect(res.status).toBe(HttpStatusCodes.OK);
        }
      },
    );

    // Aquarium non trouvée
    it(
      'doit retourner un JSON avec erreur ' +
        `'${AQUARIUM_NON_TROUVE}' et un code de  ` +
        `'${HttpStatusCodes.NOT_FOUND}' si la réservation est introuvable.`,
      async () => {
        // Préparer le simulacre de Mongoose
        mockify(Aquarium).toReturn(null, 'findOne');

        const res: TRes = await agent.delete(getPath('-1'));
        expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
        expect(res.body.error).toBe(AQUARIUM_NON_TROUVE);
      },
    );
  });
});
