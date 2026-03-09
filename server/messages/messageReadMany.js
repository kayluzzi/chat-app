import channelModel from "../channels/channelModel.js";


const messageReadMany = async (req, res) => {
    const { channelName } = req.params
  try {
    
    const channel = await channelModel.findOne({ name: channelName });
    console.log("channel", channel);
    res.status(200).json({ success: true, channel: { name: channel.name, messages: channel.messages } });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, channel: {}, message: "There was an error stupid" });
  }
};

export default messageReadMany;