const { Conflict } = require("http-errors");
// const bcrypt = require("bcryptjs");

const { User } = require("../../models");
// Создавай ссылку на аватарку пользователя с помощью gravatar
const gravatar = require("gravatar");

//функция обработчик асинхронная
const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }); //findOne возвращает объект или null
  if (user) {
    throw new Conflict("Already register");
    // res.status(409).json({
    //     status: "error",
    //     code: 409,
    //     message: "Already register"
    // });
    // return;
  }
  
  const avatar = gravatar.url(
    email,
    {
      s: "250",
      d: "robohash",
    },
    true
  );
  //2вар
  const newUser = new User({ email }); //создаем объект
  // newUser = {email}
  newUser.setPassword(password); //password и захеширован виде
  newUser.setAvatar(avatar);
  // newUser = {email, password}
  await newUser.save(); //сохраняем в базу
  //1вар
  // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));//хешируем
  // const newUser = {email, password: hashPassword};
  // await User.create(newUser);
  res.status(201).json({
    status: "success",
    code: 201,
    message: "Success register",
  });
};

module.exports = register;
