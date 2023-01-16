const mongoose = require("mongoose");
const {TASK_TITLE_MAX_LENGHT, TASK_TITLE_MIN_LENGHT, TASK_MIN_POINTS, TASK_MAX_POINTS} = require("../../utils/constants");

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
          return v.length >= TASK_TITLE_MIN_LENGHT && v.length <= TASK_TITLE_MAX_LENGHT;
        },
        message: props => `${props.value} is not a valid title. Title should be less grater than 2 or less than 25`
      },
    },
    description: { type: String, default: "" },
    icon: { type: String, default: null },
    value: {
      type: Number,
      required: [true, 'Task Points Value are required'],
      min: [TASK_MIN_POINTS, `Points cannot be less than ${TASK_MIN_POINTS}`],
      max: [TASK_MAX_POINTS, `Points cannot be greater than ${TASK_MAX_POINTS}`],
    },
    points: {
      type: [
        {
          userId: ObjectId,
          value: {
            type: Number,
            min: [0, `Points cannot be less than 0`],
            max: [100, `Points cannot be greater than ${TASK_MAX_POINTS}`],
          },
        },
      ],
      default: [],
    }, // [{},{},{}]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", Task);
