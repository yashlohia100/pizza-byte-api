import { Schema, model } from 'mongoose';

const cartItemSchema = new Schema({
  pizzaId: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  unitPrice: {
    type: Number,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema(
  {
    cart: {
      type: [cartItemSchema],
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    deliveryAddress: {
      type: String,
      required: true,
    },

    deliveryPhoneNo: {
      type: Number,
      required: true,
    },

    isPriority: {
      type: Boolean,
      default: false,
    },

    orderedAt: {
      type: Date,
      default: Date.now,
    },

    totalCartPrice: Number,
    priorityPrice: Number,
    totalOrderPrice: Number,
    estimatedDelivery: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

orderSchema.virtual('status').get(function () {
  if (Date.now() > this.estimatedDelivery.getTime()) {
    return 'Delivered';
  } else {
    return 'Preparing';
  }
});

orderSchema.pre('save', function () {
  this.totalCartPrice = this.cart.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  this.priorityPrice = this.isPriority
    ? Math.floor(0.2 * this.totalCartPrice)
    : 0;

  this.totalOrderPrice = this.totalCartPrice + this.priorityPrice;

  const totalPizzas = this.cart.reduce((sum, item) => sum + item.quantity, 0);
  const minutesPerPizza = this.isPriority ? 3 : 5;
  const estimatedMinutes = 15 + totalPizzas * minutesPerPizza;

  this.estimatedDelivery = Date.now() + estimatedMinutes * 60 * 1000;
});

const Order = model('Order', orderSchema);
export default Order;
