const path = require("path");
const fs = require("fs/promises");
// Обработай аватарку пакетом jimp и задай для нее размеры 250 на 250
const Jimp = require("jimp");

const { User } = require("../../models");
// const { sendSuccessResponse } = require("../../utils");

// join нормализирует пути, заменяет на допустиые символы
// папка загрузки файлов после временной
// путь к папке с аватар где все файлы которые будем грузить
const uploadDir = path.join(__dirname, "../../", "public/avatars");
// console.log(uploadDir);

//tempName - полный путь + имя файла в папке temp
const avatars = async (req, res) => {
  const {_id: id} = req.user;

  const { originalname, path: tempName } = req.file
  console.log(tempName);
  
  try {
    // originalname полное имя включая расширение. разворачиваем его.
    // [extention] - нулевой элемент массива
    const [extention] = originalname.split(".").reverse();
  // создаем новое имя
    const newAvatarName = `user_${id}.${extention}`;
    const newAvatarPath = path.join(uploadDir, newAvatarName); //сохраняем
    // console.log(newAvatarPath); //это полный путь где должен быть
    
     // Обработать аватарку пакетом jimp и задай для нее размеры 250 на 250
     const originalAvatar = await Jimp.read(tempName);
     await originalAvatar.resize(250, 250).write(tempName);
  
    await fs.rename(tempName, newAvatarPath); // перемещаем автар с временной папки
    const avatar = path.join("/avatars", newAvatarName); // часть пути. скороченый
    await User.findByIdAndUpdate(id, { avatarURL: avatar }, { new: true })
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result: avatar,
      },
    })
    // const { avatarURL } = await User.findByIdAndUpdate(
    //   req.user._id,
    //   { avatarURL: avatar },
    //   { new: true }
    // );

    // sendSuccessResponse(res, { avatarURL }, 201 );
  } catch (error) {
    await fs.unlink(tempName); // удалить файл
    console.log(error);
  }
};

module.exports = avatars;