const mongoose = require("mongoose");
const { invitationStatus } = require("../../utils/constants");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProjectInvitation = new Schema(
  {
    from: { type: Schema.Types.ObjectId, ref: "User", required: true },
    to: { type: Schema.Types.ObjectId, ref: "User", required: true },
    projectId: { type: Schema.Types.ObjectId, ref: "Projects", required: true },
    status: {
      type: String,
      enum: Object.keys(invitationStatus),
      default: invitationStatus.pending,
    },
  },
  { timestamps: true }
);

// Create index so to and project id are unique
ProjectInvitation.index({ to: 1, projectId: 1 }, { unique: true });

module.exports = mongoose.model("ProjectInvitation", ProjectInvitation);
