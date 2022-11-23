const crypto = require('crypto');

// const dotenv = require('dotenv');
// dotenv.config();

// ----------------------------

// const key = crypto.generateKeySync('aes', { length: 256 });
// const keyString = key.export({ type: 'buffer' }).toString('hex');
// console.log(keyString);
// return;
// ----------------------------


const APP_KEY = process.env.APP_KEY; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

const encrypt = (text) => {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(APP_KEY, 'hex'), iv);
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

const decrypt = (text) => {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');

    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(APP_KEY, 'hex'), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}


module.exports = {
    decrypt,
    encrypt,
};

// // TODO: test
// console.log(encrypt('123456'));
// console.log(decrypt(encrypt('123456')));

