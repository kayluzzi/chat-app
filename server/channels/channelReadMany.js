import channelModel from "./channelModel.js";

const channelReadMany = async (req, res) => {
  try {
    
    const channels = await channelModel.find({});
    console.log("channels", channels);
    res.status(200).json({ success: true, channels: channels });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, channels: {}, message: "There was an error stupid" });
  }
};

export default channelReadMany;
