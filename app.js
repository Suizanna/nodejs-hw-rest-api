const express = require("express");
const logger = require("morgan");
const cors = require("cors");
//=====
// app.post("/api/products", uploadMiddleware.single("image"), async(req, res)=> {
//   //tempName- полный путь + имя файла в папке temp
//   const {originalname, path: tempName} = req.file;
//   //fileName- путь где должен быть файл после перемещения. в public/products/имя файла
//   const fileName = path.join(uploadDir, "products", originalname);
//   try {
//     //tempName-старое и fileName-новое имя. чтобы переместить файл в папку public
//       await fs.rename(tempName, fileName);
//       const image = path.join("/products", originalname);
//       const newProduct = {...req.body, id: v4(), image};
//       products.push(newProduct);
//       res.status(201).json({
//           status: "success",
//           code: 201,
//           data: {
//               result: newProduct
//           }
//       });
//   } catch (error) {
//       await fs.unlink(tempName);
//   }

// });
// // ==================

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); // востановить из строки в объект
app.use(express.static("public")); // обработка статичных файлов

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
