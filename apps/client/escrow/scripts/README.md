# Solana escrow client scripts

This applications contains scripts to interact with the Solana escrow program located at [libs/programs/escrow](../../libs/programs/escrow). It is a TypeScript application with muiltiple entrypoints.

1. `main.js` (AKA setup)
    1. Airdrops SOL tokens to a Client account we use for creating mints `mint_X` and `mint_Y`.
    2. Creates the Associated Token Accounts (ATA) for Alice and Bob for `mint_X` and `mint_Y`.
    3. Sends/Mints `mint_X`'s tokens to Alice and `mint_Y`'s tokens to Bob.
2. `alice.js` Executes the following instructions in a single transaction:
    1. Creates the escrow contract's Associated Token Account (ATA) for `mint_X`.
    2. Initializes the previously created escrow contract's ATA for `mint_X` assigning Alice as the owner.
    3. Transfers `mint_X`'s tokens from Alice's `mint_X` ATA to the escrow contract's `mint_X` ATA.
    4. Creates the escrow contract's Account.
    5. Initializes the escrow contract setting the expected `mint_Y` tokens Alice will receive in exchange for `mint_X` tokens.
3. `bob.js` Executes the following instructions in a single transaction:
    1. Sends the amount of `mint_Y` tokens Bob wants to exchange for `mint_X` tokens to the escrow contract. Here Bob is authorizing the escrow contract to transfer `mint_Y` tokens from his `mint_Y` ATA to Alice's `mint_Y` ATA, and the contract will transfer `mint_X` tokens from the previously created escrow contract's `mint_X` ATA to Bob's `mint_X` ATA.

This application was built based on the following post: <https://paulx.dev/blog/2021/01/14/programming-on-solana-an-introduction/#bonus-bugfixing>

## Run the application

1. Run `task programs_escrow:build` to build the escrow program, the program will be available at `dist/libs/programs/escrow/escrow.so`.
2. Run `task client_escrow_scripts:build` to build the client application, the application will be available at `dist/apps/client/escrow/scripts`.
3. Run `task client_escrow_scripts:start-validator` to start a local Solana validator and deploy the escrow program at genesis block.
4. Run `task client_escrow_scripts:run` to run the application.

Refer to the [`Taskfile.yml`](./Taskfile.yaml) file to see what each task does.

## Scripts/Commands

Read the [project.json](project.json) file to see the available scripts/commands that can be run using `pn nx run`.
