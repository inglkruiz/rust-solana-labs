# RustSolanaLabs

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

### Apps

- [client/hello-world](apps/client/hello-world/README.md): Client application borrowed from the [solana-labs/example-helloworld](https://www.github.com/solana-labs/example-helloworld) repository. It's wrapped in a NestJS standalone application.
- [rust/http-server](apps/rust/http-server/README.md): Rust HTTP server application. Custom minimal HTTP server for understanding the basics of Rust.

### Libs

- [program/hello-world](libs/program/hello-world/README.md): Solana smart contract program. Borrowed from the [solana-labs/example-helloworld](https://www.github.com/solana-labs/example-helloworld) repository. I preferred not to use the repository since I'm building a curated list of examples for myself powered by Nx monorepo.

### Install dependencies

- [Go-task](https://taskfile.dev/installation/) Used for running tasks in some projects.
- [Rust](https://www.rust-lang.org/tools/install) Used for building Rust projects.
- [NodeJs with NVM](https://github.com/nvm-sh/nvm) Install NodeJs with NVM. Then run `nvm use` to use the NodeJs version specified in `.nvmrc` file.
- [PNPM](https://pnpm.io/installation#using-corepack) Since the repository uses NodeJs 18 use corepack to install PNPM. Follow the instructions in the link.
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools) Used for blockchain development.
- Run `pnpm install` to install the dependencies.

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

## Remote caching

Run `npx nx connect-to-nx-cloud` to enable [remote caching](https://nx.app) and make CI faster.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
