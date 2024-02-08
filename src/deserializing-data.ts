import { PublicKey, Connection } from "@solana/web3.js";
import * as borsh from "@coral-xyz/borsh";

const programId = new PublicKey("CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN");

// const [pda, bump] = PublicKey.findProgramAddressSync([Buffer.from("GLOBAL_STATE")], programId);
// console.log(`pda: ${pda}`);
// console.log(` bump: ${bump}`);

const borshAccountSchema = borsh.struct([
  borsh.bool("initialized"),
  borsh.u8("rating"),
  borsh.str("title"),
  borsh.str("description"),
]);

async function main() {
  const connection = new Connection("https://api.devnet.solana.com/");
  const accounts = await connection.getProgramAccounts(programId);
  accounts.forEach(({ pubkey, account }) => {
    console.log("Account:", pubkey.toBase58());
    console.log("Data buffer:", account.data);

    const { initialized, title, description } = borshAccountSchema.decode(account.data);
    //     console.log(`Initialized: ${initialized}`);
    //     // console.log(`Name: ${playerId}`);
    //     console.log(`Title: ${title}`);
    //     console.log(`Description: ${description}`);
  });
}

main();
