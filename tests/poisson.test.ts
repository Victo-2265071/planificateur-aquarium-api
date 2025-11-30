import { customDeepCompare } from 'jet-validators/utils';

import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';

import Paths from './common/Paths';
import { TRes } from './common/util';
import { agent } from './support/setup';
import { IPoisson, Poisson } from '@src/models/Poisson';

/* eslint-disable */

/******************************************************************************
                               Constants
******************************************************************************/

// Données bidon pour les poissons (simulacre de GET)
const DB_POISSONS: IPoisson[] = [
  {
    id: '1',
    nom: 'Poisson rouge',
    minVolume: 60,
    nomScientifique: 'Carassius auratus',
    minTemperature: 18,
    maxTemperature: 24,
    gregarite: 1,
    dureeVie: 15,
    estAggressif: false,
    eauSalee: false,
  },
  {
    id: '2',
    nom: 'Guppy',
    minVolume: 40,
    nomScientifique: 'Poecilia reticulata',
    minTemperature: 22,
    maxTemperature: 28,
    gregarite: 3,
    dureeVie: 2,
    estAggressif: false,
    eauSalee: false,
  },
  {
    id: '3',
    nom: 'Néon bleu',
    minVolume: 60,
    nomScientifique: 'Paracheirodon innesi',
    minTemperature: 20,
    maxTemperature: 26,
    gregarite: 6,
    dureeVie: 5,
    estAggressif: false,
    eauSalee: false,
  },
  {
    id: '4',
    nom: 'Betta splendens',
    minVolume: 20,
    nomScientifique: 'Betta splendens',
    minTemperature: 24,
    maxTemperature: 30,
    gregarite: 1,
    dureeVie: 3,
    estAggressif: true,
    eauSalee: false,
  },
] as const;

// Don't compare 'id' and 'created' cause those are set dynamically by the
// database
const compareUserArrays = customDeepCompare({
  onlyCompareProps: [],
});

const mockify = require('@jazim/mock-mongoose');
/******************************************************************************
                                 Tests
  IMPORTANT: Following TypeScript best practices, we test all scenarios that 
  can be triggered by a user under normal circumstances. Not all theoretically
  scenarios (i.e. a failed database connection). 
******************************************************************************/

describe('poissonRouter', () => {
  // Extraire tous les poissons
  describe(`'GET:${Paths.Poissons.Get}'`, () => {
    // Succès
    it(
      'doit retourner un JSON avec tous les poissons et un code de ' +
        `of '${HttpStatusCodes.OK}' si réussi.`,
      async () => {
        // Préparer le simulacre de Mongoose
        const data = [...DB_POISSONS];
        mockify(Poisson).toReturn(data, 'find');
        const res: TRes<{ poissons: IPoisson[] }> = await agent.get(
          Paths.Poissons.Get,
        );
        expect(res.status).toBe(HttpStatusCodes.OK);
        expect(compareUserArrays(res.body.poissons, DB_POISSONS)).toBeTruthy();
      },
    );
  });
});
