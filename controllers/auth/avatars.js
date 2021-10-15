const path = require("path");
const fs = require("fs/promises");
// Обработай аватарку пакетом jimp и задай для нее размеры 250 на 250
const Jimp = require("jimp");

const { User } = require("../../models");
const { sendSuccessResponse } = require("../../utils");

// путь к папке с аватар. все файлы которые будем грузить
const uploadDir = path.join(__dirname, "../../", "public/avatars");
// console.log(uploadDir);

const avatars = async (req, res) => {
  const { path: tempDir, originalname } = req.file
  
  try {
    // originalname полное имя включая расширение. разворачиваем его.
    // [extention] - нулевой элемент массива
    const [extention] = originalname.split(".").reverse();
    // Обработать аватарку пакетом jimp и задай для нее размеры 250 на 250
    const originalAvatar = await Jimp.read(tempDir);
    await originalAvatar.resize(250, 250).writeAsync(tempDir);
  // создаем новое имя
    const newAvatarName = `user_${req.user._id}.${extention}`;
    const newAvatarPath = path.join(uploadDir, newAvatarName); //сохраняем
    // console.log(newAvatarPath);    //это полный путь где должен быть
  
    await fs.rename(tempDir, newAvatarPath); // перемещаем автар с временной папки
    const avatar = path.join("/avatars", newAvatarName);// часть пути. скороченый

    const { avatarURL } = await User.findByIdAndUpdate(
      req.user._id,
      { avatarURL: avatar },
      { new: true }
    );

    sendSuccessResponse(res, { avatarURL }, 201 );
  } catch (error) {
    await fs.unlink(tempDir); // удалить файл
    console.log(error);
  }
};

module.exports = avatars;