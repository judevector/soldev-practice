require("dotenv").config();
const {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  clusterApiUrl,
} = require("@solana/web3.js");
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const suppliedToPubkey = process.argv[2] || null;
const solAmount = process.argv[3];
const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection(clusterApiUrl("devnet"));

if (!suppliedToPubkey) {
  console.log(`Please provide a public key to send to`);
  process.exit(1);
}

const toPubkey = new PublicKey(suppliedToPubkey);

const transaction = new Transaction();

const SOL_AMOUNT = parseInt(solAmount) * LAMPORTS_PER_SOL;

const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: senderKeypair.publicKey,
  toPubkey,
  lamports: SOL_AMOUNT,
});

transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair]);

console.log(`💸 Finished! Sent ${solAmount} SOL to the address ${toPubkey}. `);
console.log(`Transaction signature is ${signature}`);
