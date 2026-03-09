import mongoose from "mongoose";
import channelSchema from "./channelSchema.js";

channelSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.authStrategy;
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

const channelModel = mongoose.model("channels", channelSchema)

export default channelModel;