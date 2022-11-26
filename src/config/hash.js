const bcrypt = require('bcrypt');
const saltRounds = 10;
// const salt = bcrypt.genSaltSync(saltRounds);

const hashPassword = (myPlaintextPassword) => bcrypt.hashSync(myPlaintextPassword, saltRounds);

const checkPassword = (myPlaintextPassword, hash) => bcrypt.compareSync(myPlaintextPassword, hash);

module.exports = {
  hashPassword,
  checkPassword,
};





///////////////////////////




// // TODO: test
// console.log(hashPassword('123456'));
// console.log(checkPassword('123456', hashPassword('123456')));
