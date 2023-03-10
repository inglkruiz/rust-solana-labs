import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  Signer,
} from '@solana/web3.js';

import {
  TOKEN_PROGRAM_ID,
  createAccount as solanaCreateAccount,
  createMint as solanaCreateMint,
  mintTo as solanaMintTo,
} from '@solana/spl-token';
import { getKeypair, getTokenBalance, writePublicKey } from './utils';

const createMint = (
  connection: Connection,
  { publicKey, secretKey }: Signer
) => {
  return solanaCreateMint(
    connection,
    {
      publicKey,
      secretKey,
    },
    publicKey,
    null,
    0,
    undefined,
    undefined,
    TOKEN_PROGRAM_ID
  );
};

const setupMint = async (
  name: string,
  connection: Connection,
  aliceKeypair: Keypair,
  bobKeypair: Keypair,
  clientKeypair: Signer
): Promise<[PublicKey, PublicKey, PublicKey]> => {
  console.log(`Creating Mint ${name}...`);
  const mint = await createMint(connection, clientKeypair);
  writePublicKey(mint, `mint_${name.toLowerCase()}`);

  console.log(`Creating Alice TokenAccount for ${name}...`);
  const aliceTokenAccount = await solanaCreateAccount(
    connection,
    aliceKeypair,
    mint,
    aliceKeypair.publicKey
  );
  writePublicKey(aliceTokenAccount, `alice_${name.toLowerCase()}`);

  console.log(`Creating Bob TokenAccount for ${name}...`);
  const bobTokenAccount = await solanaCreateAccount(
    connection,
    bobKeypair,
    mint,
    bobKeypair.publicKey
  );
  writePublicKey(bobTokenAccount, `bob_${name.toLowerCase()}`);

  return [mint, aliceTokenAccount, bobTokenAccount];
};

const setup = async () => {
  const aliceKeypair = getKeypair('alice');
  const bobKeypair = getKeypair('bob');
  const clientKeypair = getKeypair('id');

  const connection = new Connection('http://localhost:8899', 'confirmed');
  console.log('Requesting SOL for Alice...');
  // some networks like the local network provide an airdrop function (mainnet of course does not)
  await connection.requestAirdrop(
    aliceKeypair.publicKey,
    LAMPORTS_PER_SOL * 10
  );
  console.log('Requesting SOL for Bob...');
  await connection.requestAirdrop(bobKeypair.publicKey, LAMPORTS_PER_SOL * 10);
  console.log('Requesting SOL for Client...');
  await connection.requestAirdrop(
    clientKeypair.publicKey,
    LAMPORTS_PER_SOL * 10
  );

  const [mintX, aliceTokenAccountForX, bobTokenAccountForX] = await setupMint(
    'X',
    connection,
    aliceKeypair,
    bobKeypair,
    clientKeypair
  );
  console.log("Sending 50X to Alice's X TokenAccount...");
  await solanaMintTo(
    connection,
    aliceKeypair,
    mintX,
    aliceTokenAccountForX,
    clientKeypair.publicKey,
    50
  );

  const [mintY, aliceTokenAccountForY, bobTokenAccountForY] = await setupMint(
    'Y',
    connection,
    aliceKeypair,
    bobKeypair,
    clientKeypair
  );
  console.log("Sending 50Y to Bob's Y TokenAccount...");
  await solanaMintTo(
    connection,
    bobKeypair,
    mintY,
    bobTokenAccountForY,
    clientKeypair.publicKey,
    50
  );

  console.log('✨Setup complete✨\n');
  console.table([
    {
      'Alice Token Account X': await getTokenBalance(
        aliceTokenAccountForX,
        connection
      ),
      'Alice Token Account Y': await getTokenBalance(
        aliceTokenAccountForY,
        connection
      ),
      'Bob Token Account X': await getTokenBalance(
        bobTokenAccountForX,
        connection
      ),
      'Bob Token Account Y': await getTokenBalance(
        bobTokenAccountForY,
        connection
      ),
    },
  ]);
  console.log('');
};

setup();
