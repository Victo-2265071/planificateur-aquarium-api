import mongoose, { Schema, model } from 'mongoose';

// Interface pour un poisson
export interface IPoisson {
  id: string;
  nom: string;
  nomScientifique: string;
  minVolume: number;
  minTemperature: number;
  maxTemperature: number;
  gregarite: number;
  dureeVie: number;
  estAggressif: boolean;
  eauSalee: boolean;
}

const PoissonSchema = new Schema<IPoisson>({
  id: {
    type: String,
    required: [true, 'ID est obligatoire.'],
    unique: true,
  },
  nom: {
    type: String,
    required: [true, 'Le nom est obligatoire.'],
    maxlength: [100, '100 caractères max pour le nom.'],
  },
  nomScientifique: {
    type: String,
    required: [true, 'Le nom scientifique est obligatoire.'],
    maxlength: [150, '150 caractères max pour le nom scientifique.'],
  },
  minVolume: {
    type: Number,
    required: [true, 'Le volume minimal est obligatoire.'],
    min: [0, 'Le volume minimal doit être ≥ 0.'],
  },
  minTemperature: {
    type: Number,
    required: [true, 'La température minimale est obligatoire.'],
  },
  maxTemperature: {
    type: Number,
    required: [true, 'La température maximale est obligatoire.'],
  },
  gregarite: {
    type: Number,
    required: [true, 'La grégarité est obligatoire.'],
    min: [1, 'La grégarité doit être au moins 1.'],
  },
  dureeVie: {
    type: Number,
    required: [true, 'La durée de vie est obligatoire.'],
    min: [0, 'La durée de vie doit être ≥ 0.'],
  },
  estAggressif: {
    type: Boolean,
    required: [true, 'Tu dois préciser si le poisson est agressif.'],
  },
  eauSalee: {
    type: Boolean,
    required: [true, 'Tu dois préciser si le poisson vit en eau salée.'],
  },
});

mongoose.pluralize(null);
export const Poisson = model<IPoisson>('Poissons', PoissonSchema);
