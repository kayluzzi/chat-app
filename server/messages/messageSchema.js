import mongoose from "mongoose";

const Schema = mongoose.Schema;

const channelSchema = new Schema({
  message: { type: String, default: "" },
  user: {
    username: { type: String, default: "" },
    avatar: { type: String, default: "" }
  }
},
{ timestamps: true }
);

export default channelSchema;