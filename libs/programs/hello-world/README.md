# Solana hello world example

## Deploy the program

NOTE: The following task are configured to run using `osascript` to open a terminal window (`iTerm2`). If you are not using MacOS, you can run the commands manually. Also, be sure you set up your Solana CLI, basically the URL and the keypair.

- Open a terminal front the root folder of the repository. Run `task programs_hello_world:start-validator` to start the Solana cluster.
- Before deploying the program, you need build it. Run `task programs_hello_world:build` to build the program. Likewise, you can run `pn nx run program-hello-world:build` to build the program.
- When the cluster is ready, run `task programs_hello_world:deploy` to deploy the program. No need to open a new terminal window.

## Scripts/Commands

Read the [Taskfile.yml](./Taskfile.yaml) file to see the available scripts/commands that can be run using `task`. Read the [project.json](project.json) file to see the available scripts/commands that can be run using `pn nx`.
