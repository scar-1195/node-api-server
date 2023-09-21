const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is obligatory'],
    unique: true,
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
});

categorySchema.methods.toJSON = function () {
  const { __v, state, ...category } = this.toObject();
  return category;
};

module.exports = model('Category', categorySchema);
