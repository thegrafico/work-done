const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Task = new Schema(
  {
    owner: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    value: {
      type: Number,
      default: 0,
      min: [0, 'Points cannot be negative'],
      max: [100, 'Points cannot be greater than 100'],
    },
    points: {
      type: [
        {
          userId: ObjectId,
          value: {
            type: Number,
            min: [0, 'Points cannot be negative for user'],
            max: [100, 'Points cannot be greater than 100'],
          },
        },
      ],
      default: [],
    }, // [{},{},{}]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', Task);
