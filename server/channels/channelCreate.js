import channelModel from "./channelModel.js";

const channelCreate = async (req, res) => {
  const { name, icon, description } = req.body;

  try {
    

    const newChannel = await channelModel.create({
      name,
      icon,
      description
    });
    console.log("newChannel", newChannel);
    res.status(200).json({ success: true, channel: newChannel });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, channel: {}, message: "There was an error stupid" });
  }
};

export default channelCreate;
