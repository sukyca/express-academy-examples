const fs = require('fs');
const crypto = require('crypto');
const colors = require('colors');

const main = async () => {
  
  const result = crypto.randomBytes(32).toString('hex');

  const envPem = 
  `JWT_SECRET="${result}"`;

  fs.writeFileSync('./tmp/secret.txt', result);
  fs.writeFileSync('./tmp/passwordDotEnvFile.env', envPem);

  console.log(Array(80 + 1).join('#'));
  console.log(result);
  console.log(Array(80 + 1).join('#'));
  console.log(envPem);
  console.log(Array(80 + 1).join('#'));
};

main()
  .then(() => {
    console.log('Done.');
  })
  .catch((error) => {
    console.error('ERROR:');
    console.error(error);
  });