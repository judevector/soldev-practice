import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

function isValidSolanaAddress(address: string): boolean {
  try {
    new PublicKey(address);
    return true;
  } catch (error) {
    console.error("Error creating PublicKey:", error);
    return false;
  }
}

const suppliedPublicKey = process.argv[2];

if (!suppliedPublicKey) {
  throw new Error("Provide a public key to check the balance of!");
}

const isValid = isValidSolanaAddress(suppliedPublicKey);

if (!isValid) {
  console.log(
    `❌ Failed! The address with ${suppliedPublicKey} is NOT valid! Please provide a valid Solana public key string.`
  );
  // handle the error or return early
}

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const publicKey = new PublicKey(suppliedPublicKey);

const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
  `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL} SOL!`
);
