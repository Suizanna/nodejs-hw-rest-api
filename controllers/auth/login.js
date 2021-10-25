const { BadRequest, NotFound } = require("http-errors");
// const bcrypt = require("bcryptjs"); //хеширование
const jwt = require("jsonwebtoken");

const { User } = require("../../models");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }, '_id email password verify');
  console.log(user)

  if (!user || !user.comparePassword(password)) {
    throw new BadRequest("Invalid email or password");
  }
  
    if(!user.verify){
        throw new BadRequest("Email not verify");
    }
  
  // в payload хранится информация о пользователе
  // payload всегда объект. _id:-это id пользователь в базе данных
  const { _id } = user;
  const payload = {
    _id,
  };
  // вид токена - рандомная строка из 3-х частей
  // const token = "ghsdfsdfsfg.hsgfdhdghdh.dfgdhdhsdsasa";
  // sign создает token
  const token = jwt.sign(payload, SECRET_KEY);
  // const token = user.createToken();
  
  // обновить пользователя которого нашли. обновить базу
  await User.findByIdAndUpdate(_id, { token });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = login;
