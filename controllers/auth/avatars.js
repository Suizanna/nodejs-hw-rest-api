const path = require("path");
const fs = require("fs/promises");
// Обработай аватарку пакетом jimp и задай для нее размеры 250 на 250
const Jimp = require("jimp");

const { User } = require("../../models");

const uploadDir = path.join(__dirname, "../../", "public/avatars");
// console.log(uploadDir);

const avatars = async (req, res) => {
  const {_id: id} = req.user;

  const { originalname, path: tempName } = req.file
  console.log("TEMPNAME", tempName);
  
  try {
    const [extention] = originalname.split(".").reverse();
    const newAvatarName = `user_${id}.${extention}`;
    const newAvatarPath = path.join(uploadDir, newAvatarName); 
    console.log("newAvatarPath:", newAvatarPath);
    
     const originalAvatar = await Jimp.read(tempName);
     await originalAvatar.resize(250, 250).write(tempName);
  
    await fs.rename(tempName, newAvatarPath); 
    const avatar = path.join("/avatars", newAvatarName); 
    await User.findByIdAndUpdate(id, { avatarURL: avatar })
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result: avatar,
      },
    })

  } catch (error) {
    await fs.unlink(tempName); 
    // console.log(error);
  }
};

module.exports = avatars;