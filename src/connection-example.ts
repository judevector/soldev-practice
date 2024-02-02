// import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

// const connection = new Connection(clusterApiUrl("devnet"));
// const address = new PublicKey("2P5aq29Ux9Dkb5SFVGRp6u8vkmzRteN2YGn2SRhnekdL");
// const balance = await connection.getBalance(address);

// console.log(`The balance of the account at ${address} is ${balance} lamports`);
// console.log(`✅ Finished!`);

import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
const address = new PublicKey("2P5aq29Ux9Dkb5SFVGRp6u8vkmzRteN2YGn2SRhnekdL");
const balance = await connection.getBalance(address);
const balanceInSol = balance / LAMPORTS_PER_SOL;

console.log(`The balance of the account at ${address} is ${balanceInSol} SOL`);
console.log(`✅ Finished!`);
