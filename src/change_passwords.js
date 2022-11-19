// ejecutar desde el root del proyecto
// node src/change_passwords.js

const dotenv = require('dotenv');
dotenv.config();

const connection = require('./config/db');
const classUser = require('./models/users');

const {
    hashPassword,
    checkPassword,
  } = require('./config/hash');

let newPasswords = [
    {
        id: 1,
        password: 'password1',
    },
    {
        id: 2,
        password: 'password2',
    },
    {
        id: 3,
        password: 'password3',
    },
];

let functionChangePassword = async (id, password) => {
    let user = await classUser.find(id);
    user.password = hashPassword(password);
    await user.save();
};

const promises = newPasswords.map((d) => functionChangePassword(d.id, d.password));

Promise.all(promises).then(() => connection.end());
