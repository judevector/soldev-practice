require("dotenv").config();
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import base58 from "bs58";

const keypair = getKeypairFromEnvironment("SECRET_KEY");
const secretKeyBuffer = Buffer.from(keypair.secretKey);
const privatekey = base58.encode(secretKeyBuffer);
const publickey = keypair.publicKey;

console.log(`Public key: ${publickey}`);
console.log(`Private key: ${privatekey}`);

console.log(`✅ Finished! We've loaded our secret key securely, using an env file!`);
