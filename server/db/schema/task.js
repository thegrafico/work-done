const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Task = new Schema(
  {
    projectId: { type: Schema.Types.ObjectId, ref: "Projects" },
    owner: { type: String, required: true },
    title: {
      type: String,
      required: [true, 'Task title is required'],
      validate: {
        
        // Check title is greater than 3 and less than 25
        validator: function (v) {
          return v.length > 2 && v.length <= 25;
        },
        message: props => `${props.value} is not a valid title. Title should be less grater than 2 or less than 25`
      },
    },
    description: { type: String, default: "" },
    icon: { type: String, default: null },
    value: {
      type: Number,
      default: 0,
      min: [0, "Points cannot be negative"],
      max: [100, "Points cannot be greater than 100"],
    },
    points: {
      type: [
        {
          userId: ObjectId,
          value: {
            type: Number,
            min: [0, "Points cannot be negative for user"],
            max: [100, "Points cannot be greater than 100"],
          },
        },
      ],
      default: [],
    }, // [{},{},{}]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", Task);
