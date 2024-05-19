import { Schema, model } from 'mongoose';

const pizzaSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    ingredients: {
      type: [String],
      required: true,
    },

    soldOut: {
      type: Boolean,
      default: false,
    },

    image: {
      type: String,
      default: 'default-pizza.jpg',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

pizzaSchema.pre(/^find/, function () {
  this.select('-__v');
});

const Pizza = model('Pizza', pizzaSchema);
export default Pizza;
