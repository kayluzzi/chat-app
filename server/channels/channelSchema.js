import mongoose from "mongoose";
import messageSchema from "../messages/messageSchema.js"

const Schema = mongoose.Schema;

const channelSchema = new Schema({
  name: { type: String, default: "" },
  icon: {type: { type: String }, name: { type: String }, svg: { type: String } },
  description: { type: String, default: "" },
  messages: [ messageSchema ]
});

export default channelSchema;