const sgMail = require("@sendgrid/mail");
require("dotenv").config(); //ключ попадает в перемен окружения

const {SENDGRID_KEY} = process.env; // забираем из переменных окружений

sgMail.setApiKey(SENDGRID_KEY);

const sendEmail = async(data)=> {
    const email = {...data, from: "maksimova2021@gmail.com"}
    await sgMail.send(email);
};

module.exports = sendEmail;