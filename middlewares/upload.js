const multer = require("multer");
const path = require("path");

// join нормализирует пути, заменяет на допустиые символы
// tempDir папка где временно хранятся файлы
const tempDir = path.join(__dirname, "../", "temp");

// настройки для мидлвары
// cb-передаем обработку дальше. аналог next
const uploadConfig = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, tempDir);// 1.ошибка или null и 2.временная папка
    },
    // под каким именем сохранить файл. обычно под оригинальным
    filename: (req, file, cb)=>{
        cb(null, file.originalname);
    },
    // ограничения
    limits: {
        fileSize: 50000,
    }
});
// мидлвара загрузчик
const upload = multer({
    storage: uploadConfig,
});

module.exports = upload;