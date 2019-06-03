# NodeCrypt

A simple nodejs library that encrypt and decrypt string to base64 string.

This library was written in pure NodeJS with TypeScript.

## How to use

- With IV

  Create a new instance of NodeCryptIV
  ```javascript
  const NodeCryptIV = require('easy-nodecrypt').NodeCryptIV;
  ```
    - Random mode
      ```javascript
      const nodeCryptIV = new NodeCryptIV({ secret: 'mysecret' });
      const encrypted = nodeCryptIV.encrypt('Pika Pika!').toBase64();
      console.log(encrypted); // emlSWvnh7cUwkEvWWeZafcR3Kp8YJafoRoJvJBQ_t38

      const decrypted = nodeCryptIV.decrypt(encrypted);
      console.log(decrypted); // Pika Pika!
      ```

    - No random mode

      You can give the IV with an environment variable (NODECRYPT_IV) or directly in the NodeCryptIV instance. The function use first the IV in parameter and if it's not exist, it use the environment variable.

      The IV must have a length of 16 characters.
      ```javascript
      const nodeCryptIV = new NodeCryptIV({ secret: 'mysecret', iv: 'totototototototo' });
      const encrypted = nodeCryptIV.encrypt('Pika Pika!').toBase64();
      console.log(encrypted); // dG90b3RvdG90b3RvdG90b8bCKJ7SMuOaSWvijqvujXM

      const decrypted = nodeCryptIV.decrypt(encrypted);
      console.log(decrypted); // Pika Pika!
      ```

- Without IV

  Create a new instance of NodeCrypt
  ```javascript
  const NodeCrypt = require('easy-nodecrypt').NodeCrypt;
  ```

  ```javascript
  const nodeCrypt = new NodeCrypt('mysecret');
  const encrypted = nodeCrypt.encrypt('Pika Pika!').toBase64();
  console.log(encrypted); // spsAgpAHVSClkOKb0LTT8Q

  const decrypted = nodeCrypt.decrypt(encrypted);
  console.log(decrypted); // Pika Pika!
  ```

## Tips and trikcs

- If you want to decrypt a value with another instance of the library, don't forget to specify the encoding to use:
  ```javascript
  // Encrypt value.
  const nodeCrypt = new NodeCrypt('mysecret');
  const encrypted = nodeCrypt.encrypt('Pika Pika!').toBase64();

  // Decrypt value with the same instance.
  const decrypted = nodeCrypt.decrypt(encrypted);

  // Decrypt value with another instance.
  const newInstance = new NodeCrypt('mysecret');
  // Specify the encoding of the encrypted text.
  newInstance.encoding = 'base64';
  newInstance.decrypt(encrypted);
  ```

## Environements variables

You can give the above values by environements variables:

| Environement variable | Code variable | Class |
|:----:|:----:|:----:|
|NODECRYPT_SECRET|secret| NodeCrypt, NodeCryptIV |
|NODECRYPT_IV|iv| NodeCryptIV |

## Author

Guillaume Quittet
