const fs = require('fs');
const forge = require('node-forge');
const pki = forge.pki;
const rsa = forge.pki.rsa;
const colors = require('colors');

const main = async () => {
  const PASSWORD_FOR_PEM = process.env.PASSWORD_FOR_PEM || 'PRIVATE_KEY_PASSWORD';

  if (typeof PASSWORD_FOR_PEM === 'string') {
    console.log(`Using private key password: ${PASSWORD_FOR_PEM}`);
  } else {
    console.log(`Not using private key password. Private key is not encrypted!`);
  }

  rsa.generateKeyPair({bits: 2048, workers: 2}, function(err, keypair) {
    let privatePem;
    if (typeof PASSWORD_FOR_PEM === 'string') {
      privatePem = pki.encryptRsaPrivateKey(keypair.privateKey, PASSWORD_FOR_PEM);
    } else {
      privatePem = pki.privateKeyToPem(keypair.privateKey); // !!! IMPORTANT some services do not support encryption of private key, and that is bad but it is what it is...
    }
    const publicPem = pki.publicKeyToPem(keypair.publicKey);

    const base64Pem = Buffer.from(privatePem).toString('base64');
    const publicBase64Pem = Buffer.from(publicPem).toString('base64');

    const envPem = 
        `JWT_PRIVATE_KEY="${base64Pem}"` + '\n' + 
        `JWT_PRIVATE_KEY_PASSWORD="${PASSWORD_FOR_PEM}"` + '\n' +
        `JWT_PUBLIC_KEY="${publicBase64Pem}"`;

    fs.writeFileSync('./tmp/key.pem', privatePem);
    fs.writeFileSync('./tmp/keyBase64.pem', base64Pem);
    fs.writeFileSync('./tmp/keyDotEnvFile.env', envPem);

    console.log(Array(80 + 1).join('#'));
    console.log(privatePem);
    console.log(Array(80 + 1).join('#'));
    console.log(publicPem);
    console.log(Array(80 + 1).join('#'));
    console.log(envPem);
    console.log(Array(80 + 1).join('#'));
  });
};

main()
  .then(() => {
    console.log('Done.');
  })
  .catch((error) => {
    console.error('ERROR:');
    console.error(error);
  });