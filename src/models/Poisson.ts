import mongoose, { Schema, model } from 'mongoose';

// Interface pour un poisson
export interface IPoisson {
  id: number;
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
  id: { type: Number, required: true },
  nom: { type: String, required: true, maxlength: 100 },
  nomScientifique: { type: String, required: true, maxlength: 150 },
  minVolume: { type: Number, required: true, min: 0 },
  minTemperature: { type: Number, required: true },
  maxTemperature: { type: Number, required: true },
  gregarite: { type: Number, required: true, min: 1 },
  dureeVie: { type: Number, required: true, min: 0 },
  estAggressif: { type: Boolean, required: true },
  eauSalee: { type: Boolean, required: true },
});

mongoose.pluralize(null);
export const Poisson = model<IPoisson>('Poissons', PoissonSchema);
