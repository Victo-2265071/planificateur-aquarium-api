import mongoose, { Schema, model } from 'mongoose';
/* eslint-disable */

export interface IAquarium {
  _id?: string;
  nom: string;
  volume: number;
  eau_salee: boolean;
  date_creation?: Date;
  poissons: {
    poisson_nom: string;
    quantite: number;
  }[];
}

const AquariumSchema = new Schema<IAquarium>({
  nom: {
    type: String,
    required: [true, 'Le nom est obligatoire.'],
    maxlength: [150, '150 caractères max.'],
  },

  volume: {
    type: Number,
    required: [true, 'Le volume est obligatoire.'],
    min: [1, 'Le volume doit être au moins 1 litre.'],
  },

  eau_salee: {
    type: Boolean,
    required: [true, 'Tu dois préciser si eau salée ou non.'],
  },

  date_creation: {
    type: Date,
    default: Date.now,
    min: [new Date('1900-01-01'), 'La date de création doit être après 1900.'],
  },

  poissons: [
    {
      poisson_nom: {
        type: String,
        maxlength: [150, '150 caractères max.'],
        required: [true, 'Chaque entrée doit avoir un poisson_id.'],
      },

      quantite: {
        type: Number,
        required: [true, 'La quantité est obligatoire.'],
        min: [1, 'La quantité doit être au moins 1.'],
      },
    },
  ],
});

mongoose.pluralize(null);
export const Aquarium = model<IAquarium>('Aquariums', AquariumSchema);
