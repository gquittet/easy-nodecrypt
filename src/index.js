const NodeCrypt = require('../lib').NodeCrypt;
const NodeCryptIV = require('../lib').NodeCryptIV;

// With IV
console.log('');

// Random mode
console.log('With IV (random mode):');
(() => {
  const nodeCryptIV = new NodeCryptIV({ secret: 'mysecret' });
  const encrypted = nodeCryptIV.encrypt('Pika Pika!').toHex();
  console.log(encrypted); // emlSWvnh7cUwkEvWWeZafcR3Kp8YJafoRoJvJBQ_t38

  const decrypted = nodeCryptIV.decrypt(encrypted);
  console.log(decrypted); // Pika Pika!
})();

console.log('');

// No random mode
console.log('With IV (no random mode):');
(() => {
  const nodeCryptIV = new NodeCryptIV({ secret: 'mysecret', iv: 'totototototototo' });
  const encrypted = nodeCryptIV.encrypt('Pika Pika!').toBase64();
  console.log(encrypted); // dG90b3RvdG90b3RvdG90b8bCKJ7SMuOaSWvijqvujXM

  const decrypted = nodeCryptIV.decrypt(encrypted);
  console.log(decrypted); // Pika Pika!
})();

console.log('');

// Without IV
console.log('Without IV:');
(() => {
  const nodeCrypt = new NodeCrypt('mysecret');
  const encrypted = nodeCrypt.encrypt('Pika Pika!').toBase64();
  console.log(encrypted); // spsAgpAHVSClkOKb0LTT8Q

  const decrypted = nodeCrypt.decrypt(encrypted);
  console.log(decrypted); // Pika Pika!
})();

console.log('');
