import { Model, Schema, model } from 'mongoose'
import { CowBreed, CowCategory, CowLocation, Cowlabel } from './cow.constant'
import { ICow } from './cow.interface'
type cowModel = Model<ICow, Record<string, unknown>>

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
    price: {
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
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const Cow = model<ICow, cowModel>('Cow', cowSchema)
