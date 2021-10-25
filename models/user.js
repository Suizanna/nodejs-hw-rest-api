// того кого добавляем в базу

const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs"); // хеширование
const jwt = require("jsonwebtoken");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }// versionKey:-чтобы не было версий
);

// добавляем пароль
// setPassword - метод объекта, хеширует
userSchema.methods.setPassword = function (password) {
  // this.password - дописал в свойство объекта
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
// Password проверка пароля
userSchema.methods.comparePassword = function (password) {
  // password-предпологаемый пароль. this.password-который взяли из базы
  return bcrypt.compareSync(password, this.password);
};

// Avatar в базе
userSchema.methods.setAvatar = function (avatar) {
  this.avatarURL = avatar;
};

// Token
const { SECRET_KEY } = process.env;

userSchema.methods.createToken = function () {
  const payload = {
    _id: this._id,
  };
  
  return jwt.sign(payload, SECRET_KEY);
};

// joiSchema 
// проверяем тело запроса присланого с фронтенда
const joiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
  owner: Joi.string().min(1),
  avatarURL: Joi.string(),
});

// Model
// 1аргумент-это коллекция в единственном числе "user"
const User = model("user", userSchema);

module.exports = {
  User,
  joiSchema,
};
