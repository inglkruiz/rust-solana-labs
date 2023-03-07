import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import assert from 'assert';
import { Basic1 } from './types/basic_1';
const { SystemProgram } = anchor.web3;

describe('basic-1', () => {
  // Use a local provider.
  const provider = anchor.AnchorProvider.local();
  let program: Program<Basic1>;
  let myAccount: anchor.web3.Keypair;

  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  before(async () => {
    program = anchor.workspace.Basic1 as Program<Basic1>;
    myAccount = anchor.web3.Keypair.generate();
  });

  it('Creates and initializes an account in a single atomic transaction (simplified)', async () => {
    // #region code-simplified

    // Create the new account and initialize it with the program.
    // #region code-simplified
    await program.methods
      .initialize(new anchor.BN(1234))
      .accounts({
        myAccount: myAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([myAccount])
      .rpc();
    // #endregion code-simplified

    // Fetch the newly created account from the cluster.
    const account = await program.account.myAccount.fetch(myAccount.publicKey);

    // Check it's state was initialized.
    assert.ok(account.data.eq(new anchor.BN(1234)));
  });

  it('Updates a previously created account', async () => {
    // #region update-test

    // Invoke the update rpc.
    await program.methods
      .update(new anchor.BN(4321))
      .accounts({
        myAccount: myAccount.publicKey,
      })
      .rpc();

    // Fetch the newly updated account.
    const account = await program.account.myAccount.fetch(myAccount.publicKey);

    // Check it's state was mutated.
    assert.ok(account.data.eq(new anchor.BN(4321)));

    // #endregion update-test
  });

  it('Increments a previously created account', async () => {
    // #region increment-test

    // Invoke the update rpc.
    await program.methods
      .increment()
      .accounts({
        myAccount: myAccount.publicKey,
      })
      .rpc();

    // Fetch the newly updated account.
    const account = await program.account.myAccount.fetch(myAccount.publicKey);

    // Check it's state was mutated.
    assert.ok(account.data.eq(new anchor.BN(4322)));

    // #endregion increment-test
  });

  it('Decrements a previously created account', async () => {
    // #region increment-test

    // Invoke the update rpc.
    await program.methods
      .decrement()
      .accounts({
        myAccount: myAccount.publicKey,
      })
      .rpc();

    // Fetch the newly updated account.
    const account = await program.account.myAccount.fetch(myAccount.publicKey);

    // Check it's state was mutated.
    assert.ok(account.data.eq(new anchor.BN(4321)));

    // #endregion increment-test
  });
});
