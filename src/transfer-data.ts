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
const suppliedToPubkey2 = process.argv[3] || null;
const solAmount = process.argv[4];
const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection(clusterApiUrl("devnet"));
const toPubkey = new PublicKey(suppliedToPubkey);
const toPubkey2 = new PublicKey(suppliedToPubkey2);
const transaction = new Transaction();
const SOL_AMOUNT = parseInt(solAmount) * LAMPORTS_PER_SOL;

if (!suppliedToPubkey) {
  console.log(`Please provide a public key to send to`);
  process.exit(1);
}

const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: senderKeypair.publicKey,
  toPubkey,
  lamports: SOL_AMOUNT,
});

const sendSolInstruction2 = SystemProgram.transfer({
  fromPubkey: senderKeypair.publicKey,
  toPubkey: toPubkey2,
  lamports: SOL_AMOUNT,
});

transaction.add(sendSolInstruction);
transaction.add(sendSolInstruction2);

const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair]);

console.log(`💸 Finished! Sent ${solAmount} SOL to the address ${toPubkey} and ${toPubkey2}. `);
console.log(`Transaction signature is ${signature}`);
