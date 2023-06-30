import { Model, Schema, model } from 'mongoose'
import { CowBreed, CowCategory, CowLocation, Cowlabel } from './cow.constant'
import { ICow } from './cow.interface'
type cowModel = Model<ICow, object>

const cowSchema = new Schema<ICow>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
      enum: CowLocation,
    },
    breed: {
      type: String,
      required: true,
      enum: CowBreed,
    },
    weight: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
      enum: Cowlabel,
    },
    category: {
      type: String,
      required: true,
      enum: CowCategory,
    },
    seller: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const Cow = model<ICow, cowModel>('Cow', cowSchema)
