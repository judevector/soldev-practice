import { Connection, PublicKey } from "@solana/web3.js";
import * as borsh from "@coral-xyz/borsh";

async function main() {
  const tokenMint = new PublicKey("FintSP776gGcwTvAtwz5e6U2ohDog667TZCLjAWzTHfM");

  const programId = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

  const seeds = [Buffer.from("metadata"), programId.toBytes(), tokenMint.toBytes()];

  const [metadataPDA, bump] = PublicKey.findProgramAddressSync(seeds, programId);
  const connection = new Connection("https://api.mainnet-beta.solana.com");

  const accountInfo = await connection.getAccountInfo(metadataPDA);

  const borshMetadataLayout = borsh.struct([
    borsh.u8("key"),
    borsh.publicKey("updateAuthority"),
    borsh.publicKey("mint"),
    borsh.str("name"),
  ]);

  accountInfo?.data;
}
