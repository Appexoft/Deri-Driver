const crypto = require('node:crypto');

// aes-256-ctr is the mode used, check more about the different modes here
// https://stackoverflow.com/a/42658861/11734350
// MELI_ENCRYPT_SECRET_KEY must be at least 256-bit long or 32 bytes
// One way of generating a new key is by running
// crypto.randomBytes(32).toString('hex')
// This will generate a string that will then be parsed back to a buffer by the secretKey function

function encrypt(content) {
  const initVector = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv('aes-256-ctr', secretKey(), initVector);
  const encrypted = Buffer.concat([cipher.update(content), cipher.final()]);

  const finalIv = initVector.toString('hex');
  const hash = encrypted.toString('hex');

  return `${finalIv}.${hash}`;
}

function decrypt(content) {
  const [initVector, hash] = content.split('.');

  const decipher = crypto.createDecipheriv(
    'aes-256-ctr',
    secretKey(),
    Buffer.from(initVector, 'hex'),
  );

  const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]);

  return decrpyted.toString();
}

function secretKey() {
  return Buffer.from(process.env.MELI_ENCRYPT_SECRET_KEY, 'hex');
}

module.exports = {
  encrypt,
  decrypt,
};
