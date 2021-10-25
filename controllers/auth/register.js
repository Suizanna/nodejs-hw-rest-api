const { Conflict } = require("http-errors");
const { nanoid } = require('nanoid')
const { sendEmail } = require('../../utils')

const { User } = require("../../models");
// Создавай ссылку на аватарку пользователя с помощью gravatar
const gravatar = require("gravatar");

//функция обработчик асинхронная
const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }); //findOne возвращает объект или null
  if (user) {
    throw new Conflict("Already register");
  }
  const verifyToken = nanoid();
  const newUser = new User({ email, verifyToken }); //создаем объект
  // newUser = {email}
  newUser.setPassword(password); //password и захеширован виде
    // newUser = {email, password}
   // Avatar в базе данных сгенерирован
   const avatar = gravatar.url(email);
  newUser.setAvatar(avatar); 

  await newUser.save(); //сохраняем в базу
  
  const verifyEmail = {
    to: email,
    subject: "Verify your email to finish registration",
    html: `<a href="http://localhost:8080/api/auth/verify/${verifyToken}" target="_blank">Confirm email<a>`,
  };
  await sendEmail(verifyEmail);
  
  res.status(201).json({
     user: {
      email: newUser.email,
      subscription: newUser.subscription
    },
    status: "success",
    code: 201,
    message: "Success register",
  });
};

module.exports = register;
